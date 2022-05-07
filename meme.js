const axios = require("axios");
const fetch = require("node-fetch");

module.exports = {
	command: ["meme"],
	author: "Tom",
	description: "tom",
	guide: "",
	allowListening: false,
	async listen (data) {
	},
	async call (data) {
		const { send } = tom;
		const res = await axios.get(`https://www.google.com/image?type=memeVN`);
		try {
			let r = await fetch(res.data.data);
			let attachment = await r.buffer();

			return send({
				files: [{
					name: "meme.jpg",
					attachment
				}]
			}, data)
		} catch (e) {			
			send("`"+`đã xảy ra lỗi`+"`", data);
			console.error(e)
		}
	}
}
