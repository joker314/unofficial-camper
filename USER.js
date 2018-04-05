// This is the user module. It interacts with user profiles.

/*
 * Colour coding for embeds
 *   GREEN = OKAY (e.g. brownie points sent)
 *   MAGENTA = WARN (e.g. deleted non-existant data)
 *   RED = ERR (e.g. invalid param)
 */

module.exports = [
	{
		"on": "message",
		"then": (data, msg) => {
			console.log("msg", msg.content)
			if(/\bt(h|hn|hnk)?(y|q|x)(sm)?\b|thank\s(yo)?u/g.test(msg.content)) {
				console.log`checkpoint + 0`
				if(msg.mentions.users.size) {
					console.log`checkpoint + 1`
					msg.mentions.members.forEach(member => {
						console.log`checkpoint + 2`
						if(data.client.storage.get(member.user.id) === null) {
							member.user.send("Hi! I'm a bot over at the freeCodeCamp unofficial server. I've now remembered that your user account has **1** unofficial brownie point. If you want this data removed, please respond somewhere with `" + data.prefix + "dataclear` and leave the server. I won't ever remember **new** information about someone who leaves the server, but you must remember to use the `" + data.prefix + "dataclear` command. **I won't message you about this issue again until you clear the data**")
						}
						console.log`checkpoint + 3`
						console.log(data.client.storage.get(member.user.id) + " => " + ((data.client.storage.get(member.user.id) || 0) + 1))
						data.client.storage.set(member.user.id, (data.client.storage.get(member.user.id) || 0) + 1)
						msg.channel.send("Send 1 brownie point to " + member + " TOTAL = " + data.client.storage.get(member.user.id))
					})
				}
			}
		}
	},
	{
		"on": "message",
		"cmd": "dataclear",
		"prefix": true,
		"then": (data, msg) => {
			console.log("Clearing data...")
			const existed = data.client.storage.get(msg.author.id) !== null
			data.client.storage.delete(msg.author.id)
			msg.reply({
				embed: {
					color: existed ? 0x00ff00 : 0xff00ff,
					title: "All data removed",
					description: "I removed all the data I had about you in my memory." + (existed ? "" : " However, I wasn't storing any data about you anyway!")
				}
			})
		}
	}
	
]
