// This is the help module. It lists commands and helps you with Discord formatting

const responses = {
	"format": data => [
		"To put code on Discord, just type three backticks (\\`\\`\\`) and then hit enter. Paste your code, hit enter again, and type another three backticks.",
		"For example, if I were to type...",
		"**\\`\\`\\`",
		"return 42;",
		"\\`\\`\\`**",
		"Then the output I would get would be",
		"```",
		"return 42;",
		"```",
		"If I want to specify a language, such as JavaScript, I can put that just after the backticks, like so",
		"**\\`\\`\\`javascript",
		"return 42;",
		"\\`\\`\\`**",
		"Which will give you the output of",
		"```javascript",
		"return 42;",
		"```",
		"If you don't want your code to take up a whole line, you can put just one backtick around it. For example, if I were to type",
		"**I like \\`cheese\\` pal!**",
		"Then you would see",
		"I like `cheese` pal!",
		"Here is a list of other stuff you can do to format",
		"```",
		"*text* - italics",
		"**text** - bold",
		"***text*** - bold & italic (woah cool)",
		"`text` - code",
		"```"
	],
	"commands": data => [
		"This bot has many commands",
		[
			["help commands", "get a list of commands"],
			["help format", "learn how to use discord's markdown"],
			["ping", "get a 'pong' reply, with your arguments echoed back"],
			["dataclear", "clears your brownie point record"],
			["lmgtfy <query>", "links to a 'let me google that for you' search for the query"],
			["warn @<user> <reason>", "generates an official warning in the modlog channel"],
			["modchannel #<channel>", "sets the modlog channel"],
		].map(pair => `- \`${data.prefix}${pair[0]}\` - ${pair[1]}`).join("\n")
	]
}

module.exports = [
	{
		"on": "message",
		"wantsArgs": true,
		"cmd": "help",
		"prefix": true,
		"then": (msg, command, data, args) => {
			let arg = args.length ? args[0].toLowerCase() : "commands"
			if(!Object.keys(responses).includes(arg)) {
				arg = "commands"
			}
			msg.reply({
				embed: {
					title: "Help with " + arg.toLowerCase(),
					description: responses[arg.toLowerCase()](data).join("\n")
				}
			})
		}
	}
]
