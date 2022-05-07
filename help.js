const { getParam } = tom.tools;
const pageSize = 20;
async function helpCmd (cmd) {
	let _msg = `====TOM====\n`;
		_msg += `Lệnh: ${(cmd.command.length > 1) ? cmd.command.join(', ') : cmd.command[0]}\n`;
		_msg += `Tác giả: ${cmd.author}\n`;
		_msg += `Mô tả: ${cmd.description}\n`;
		_msg += `Sử dụng: ${tom.config.prefix}${cmd.command[0]} ${cmd.guide}\n`;
		_msg += `====CITNUT====`;
	return _msg
};
async function checkHelp (body, index) {
	let cache = [];
	let cmd = "";
	for (const i of index.data) {
		if (i.item.command.includes(body)) {
			cache.push(true); cmd = i.item
		} else { cache.push(false) }
	};
	let result = cache.includes(true) ? true : false;
	return { 
		result,
		cmd
	}
};

module.exports = {
	command: ["help", "h"],
	author: "Tom",
	description: "hiển thị hướng dẫn",
	guide: "",
	allowListening: true,
	async listen (data) {
		let { content } = data;
		if (content == "prefix") {
			return tom.send("`"+`Prefix là ${tom.config.prefix}`+"`", data)
		}
	},
	async call (data) {
		//citnut.send("`hihihi`", data);
		let { content } = data;
		let body = await getParam(content);
		let index = await tom.plugin();

		if (body) {
			let check = await checkHelp(body, index);
			let helpMsg = await helpCmd(check.cmd);

			if (check.result) {
				return tom.send("```"+helpMsg+"```", data)
			}
		} else {
			let msg = `====TOM====\nDanh sách lệnh:\n`;
			let i = 0;
			for (const command of index.allcommand) {
				msg += `${i+1}. ${command}\n`;
				i++
			};
			return tom.send("```"+msg+`====CITNUT====`+"```", data)
		}
		//tom.send(msg, data)
	}
}
