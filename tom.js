const axios = require("axios");
const fetch = require("node-fetch");

module.exports = {
	command: ["tom chill", "tom"],
	author: "Tom",
	description: "chill",
	guide: "",
	allowListening: false,
	async listen (data) {
	},
	async call (data) {
		const { send } = citnut;
		const res = await axios.get(`https://www.google.com/image?type=ảnh tom chill`);
		try {
			let r = await fetch(res.data.data);
			let attachment = await r.buffer();

			return send({
				files: [{
					name: "tom.jpg",
					attachment
				}]
			}, data)
		} catch (e) {			
			send("`"+`đã xảy ra lỗi`+"`", data);
			console.error(e)
		}
	}
}
