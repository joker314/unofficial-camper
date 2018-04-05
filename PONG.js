module.exports = [
	{
		"on": "message",
		"wantsArgs": true,
    "prefix": true,
		"cmd": "ping",
		"then": (msg, command, data, args) => {
			msg.reply("PONG!! " + args.join(" and a pong "))
		}
	}
]
