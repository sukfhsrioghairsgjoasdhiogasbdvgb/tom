const { getParam } = tom.tools;
const fetch = require("node-fetch");

module.exports = {
	command: ["say", "voice"],
	author: "Tom",
	description: "giọng nói google",
	guide: "<param>",
	allowListening: true,
	async listen (data) {
	},
	async call (data) {
		let { content } = data;

		try {
			let text = await getParam(content);
			let url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=vi_VN&client=tw-ob`;
			let r = await fetch(url);
			let attachment = await r.buffer();
			return tom.send({
				files: [{
					name: "tts.mp3",
					attachment
				}]
			}, data)
		} catch (e) { console.error(e); return tom.send(`đã xảy ra lỗi`, data) }
	}
}
