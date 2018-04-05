module.exports = [
	{
		"on": "message",
		"wantsArgs": true,
		"cmd": "warn",
		"prefix": true,
		"then": (msg, command, data, args) => {
			// As this is a moderator command,
			// The user must either be of "modRoles" or 
			if(!msg.member) {
				msg.reply("Please do this in the admin chat, **on the server**.")
				return;
			}
			
			if(msg.member.hasPermission("BAN_MEMBERS", false, true, true)) {
				let modChannel = data.client.storage.get("MOD CHANNEL")
				console.log(modChannel)
				if(!modChannel) {
					msg.reply({
						embed: {
							color: 0xff0000,
							title: "Could not give warning",
							description: "I could not warn the user because there is no moderator log channel. This channel should be public. Use `!modchannel #channel`."
						}
					})
				} else {
					if(!msg.mentions.users.size) {
						msg.reply({
							embed: {
								color: 0xff0000,
								title: "Could not give warning",
								description: "I could not warn the user because you didn't mention one!"
							}
						})
					} else {
						data.client.channels.get(modChannel).send(msg.mentions.users.array().join(" ") + " have been officially **warned** by an admin.", {
							embed: {
								color: 0x000000,
								title: "Official Warning",
								description: "This is an official warning. Stop doing what you're doing please",
								fields: [{
									name: "Users being warned",
									value: msg.mentions.users.array().join(", "),
									inline: true
								}, {
									name: "Moderator making warning",
									value: msg.author + "",
									inline: true
								}, {
									name: "Reason",
									value: args.join(" ")
								}]
							}
						})
					}
				}
			}
		}
	},
	{
		"on": "message",
		"wantsArgs": true,
		"cmd": "modchannel",
		"prefix": true,
		"then": (msg, command, data, args) => {
			if(msg.member.hasPermission("BAN_MEMBERS", false, true, true)) {
				let channels = (msg.content.match(/<#\d+>/g) || []).map(x => x.replace(/[<>#]/g, ""));
				if(channels.length) {
					data.client.storage.set("MOD CHANNEL", channels[0])
					msg.reply({
						embed: {
							color: 0x00ff00,
							title: "Set channel",
							description: "I managed to set the channel!"
						}
					})
				} else {
					msg.reply({
						embed: {
							color:0xff0000,
							title: "Failed to set channel",
							description: "You didn't #mention the channel"
						}
					})
				}
			}
		}
	},
	{
		"on": "guildBanAdd",
		"then": (data, guild, user) => {
			guild.fetchAuditLogs()
			.then(audit => {
				if(data.client.storage.get("MOD CHANNEL")) {
					data.client.channels.get(data.client.storage.get("MOD CHANNEL")).send({
						embed: {
							title: "User banned",
							color: 0xffaa00,
							description: audit.entries.first().target + " was banned by " + audit.entries.first().executor,
							fields: [{
								name: "Reason",
								value: audit.entries.first().reason || "<no reason was given>"
							}]
						}
					})
				}
			})
		}
	},
	{
		"on": "guildBanAdd",
		"then": (data, guild, user) => {
			guild.fetchAuditLogs()
			.then(audit => {
				if(data.client.storage.get("MOD CHANNEL")) {
					data.client.channels.get(data.client.storage.get("MOD CHANNEL")).send({
						embed: {
							title: "User banned",
							color: 0xffaa00,
							description: audit.entries.first().target + " was banned by " + audit.entries.first().executor,
							fields: [{
								name: "Reason",
								value: audit.entries.first().reason || "<no reason was given>"
							}]
						}
					})
				}
			})
		}
	}
	
]
