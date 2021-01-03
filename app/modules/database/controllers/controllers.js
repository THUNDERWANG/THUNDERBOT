// const configs = require('../../../../config/configs');
// const googleClient = require('../../google/index.js');

// module.exports = {
// 	// payload = { tag: tagName, [wins: 0] }
// 	async create(table, payload) {
// 		const user = await table.create(payload);
// 		return user;
// 	},
// 	// payload = { tag: tagName, [wins: 10] } or {} to delete all
// 	async deleteUsers(table, payload) {
// 		const rowCount = await table.destroy({ where: payload });
// 		return rowCount;
// 	},
// 	// payload = { tag: tagName }
// 	async findOne(table, payload) {
// 		const tag = await table.findOne({ where: payload });
// 		return tag;
// 	},
// 	// payload = { wins: 10 }
// 	async update(table, primaryKey, payload) {
// 		const affectedRows = await table.update(payload, { where: { tag: primaryKey } });
// 		return affectedRows;
// 	},
// 	// payload = { attributes: ['tag'] } or {} to find all
// 	async findAll(table, payload = {}) {
// 		const users = await table.findAll({ where: payload });
// 		return users;
// 	},

// 	async toArrays(table) {
// 		const rows = await this.findAll(table);
// 		const results = rows.map(user => {
// 			const { tag, wins, ccLinks, ctLinks } = user;
// 			return [tag, wins, ccLinks, ctLinks];
// 		});
// 		return results;
// 	},

// 	async printToSheets(table) {
// 		try {
// 			const users = await this.findAll(table);
// 			const values = users.map(user=>Array.from(Object.values(user.dataValues)));
// 			const payload = [ [...Object.keys(table.tableAttributes)], ...values ];
// 			const Sheets = googleClient.sheetsControllers;
// 			const sheetsControllers = new Sheets(googleClient.sheets, configs.Sheets.spreadsheetId, configs.Sheets.sheetName);
// 			sheetsControllers.updateSheets(payload);
// 		} catch (error) {console.error(error);}
// 	},
// };