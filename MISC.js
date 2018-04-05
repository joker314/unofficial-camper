// This is the misc module. It should contain random features that don't fit into other modules.

const request = require("request")
const he = require("he")

module.exports = [
	{
		"on": "message",
		"wantsArgs": true,
		"cmd": "lmgtfy",
		"prefix": true,
		"then": (msg, command, data, args) => {
			msg.reply("http://lmgtfy.com/?q=" + args.join("+"))
		}
	},
	{
		"on": "message",
		"then": (data, msg) => {
			let challenge = msg.content.match(/https:\/\/www.freecodecamp.org\/challenges\/([a-zA-Z_-]+)/i)
			if(challenge && challenge.length > 1) {
				challenge = challenge[1]
				request("https://www.freecodecamp.org/challenges/" + challenge, (err, res, body) => {
					if(err) {
						msg.reply({
							embed: {
								color: 0xff0000,
								title: "Could not load challenge",
								description: "An error occured so I couldn't load the challenge titled '" + challenge + "'. See console for more information."
							}
						})
						console.error(err)
						return;
					}
					const main = he.decode(body).match(/<h4 class="text-center challenge-instructions-title">(.+)<p class="wrappable">/)[1]
									.replace(/<(div|p).+?>/g, "\n")
									.replace(/<.+?>/g, "")
									.replace(/\n+/g, "\n")
					msg.reply({
						embed: {
							color: 0xffffff,
							title: body.match(/common.challengeName = "(.+)";/)[1],
							description: main,
							url: "https://www.freecodecamp.org/challenges/" + challenge,
							fields: [{
								name: "Helpful Links",
								value: body.substring(body.indexOf("helpful links")).replace(/<a href="([^"]+)" target="_blank">(.+?)<\/a>/g, "%%%[$2]($1)&&&")
													.match(/%%%.+?&&&/g).map(k => k.toString().replace("%%%", "").replace("&&&", "")).join(", and ")
							}, {
								name: "Code",
								value: "```javascript\n" + JSON.parse(body.match(/^common\.challengeSeed = (.+);$/m)[1]).join("\n") + "\n```"
							}, {
								name: "Licence",
								value: "The above work was by [freeCodeCamp](https://www.freecodecamp.org) and is licenced under a [CC-BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) licence"
							}],
						}
					})
				})
			}
		}
	}
]
