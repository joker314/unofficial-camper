// A Discord bot to interact with freeCodeCamp; and to moderate freeCodeCamp-oriented chatrooms.

const Discord = require("discord.js")
const client = new Discord.Client()

// First, let's get our "database" up and running

const Enmap = require("enmap")
const EnmapLevel = require("enmap-level")

const provider = new EnmapLevel({name: "fcc"})
client.storage = new Enmap({provider})


// Here, we pull in all modules. When adding or removing a module, you'll need to do so here,
// as well as actually removing the file itself.

const modules = [
	require("./PONG.js"),
	require("./HELP.js"),
	require("./USER.js"),
	require("./MISC.js"),
	require("./ADMIN.js"),
];

const prefix = "!";

// Here, we pluck out each module, and then from each one of those modules, we register event
// listeners for their commands.

modules.forEach(module => {
	module.forEach(command => {
		client.on(command.on, (...args) => {
			if(command.on === "message") {
				if(args[0].author.bot) return; // isn't a bot
				if(command.prefix && !args[0].content.startsWith(prefix)) return; // starts with prefix
				if(command.cmd && !args[0].content.startsWith((command.prefix ? prefix : "") + command.cmd)) return; // starts with command
				console.log("REACHED HERE")
				if(command.wantsArgs) {
					let split = args[0].content.split(" ")
					command.then(args[0], split[0], {prefix, client}, split.slice(1))
				} else {
					command.then({prefix, client}, args[0])
				}
			} else {
				command.then({prefix, client}, ...args)
			}
		})
	})
})

// And once everything is hooked up, we can log in.

client.login("CLIENT TOKEN GOES HERE")
