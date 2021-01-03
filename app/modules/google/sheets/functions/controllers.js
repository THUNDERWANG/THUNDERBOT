module.exports = class Sheets {
	constructor(sheetsClient, spreadsheetId, sheetName) {
		this.spreadsheetId = spreadsheetId;
		this.sheetName = sheetName;
		this.sheetsClient = sheetsClient;
	}
	async clearSheet() {
		try {
			const request = {
				spreadsheetId: this.spreadsheetId,
				range: `${this.sheetName}!A:Z` };
			await this.sheetsClient.spreadsheets.values.clear(request);
		} catch (error) { console.error(error); }
	}
	// payload = array of arrays [[thunder, 5, 10], [appleboy, 1, 6]]
	async updateSheets(payload) {
		try {
			const request = {
				spreadsheetId: this.spreadsheetId,
				range: `${this.sheetName}!A:Z`,
				valueInputOption: 'USER_ENTERED',
				resource: {
					range: `${this.sheetName}!A:Z`,
					majorDimension: 'ROWS',
					values: payload,
				},
			};
			await this.sheetsClient.spreadsheets.values.update(request);
		} catch (error) {console.log(error);}
	}
};