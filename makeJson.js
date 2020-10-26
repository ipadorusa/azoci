const axios = require('axios');
const fs = require('fs');

const log = console.log;
const serviceKey = 'Chpjh51ytkero7fneUW01Kxbk%2BMK0iBXuaAOrT4tPAh%2BkIwoQ7tqrkuyOzTd0O0pVM%2BL%2F3DSebLxqfMX5UcDKg%3D%3D';
const LAWD_CD = '41465';

const getLoad = async day => {
	try {
		let res = await axios.get(
			`http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?serviceKey=${serviceKey}&LAWD_CD=${LAWD_CD}&DEAL_YMD=${day}&`,
		);
		let data = JSON.stringify(res.data.response.body.items.item);
		fs.writeFileSync(`./public/data/${day}.json`, data);
	} catch (e) {
		console.log('e', e);
	}
};
const mon = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

for (let i = 0, max = 12; i < max; i++) {
	getLoad(`2019${mon[i]}`);
}

/*
getLoad().then(e => {
    let data = JSON.stringify(e.data.response.body.items.item);

    fs.writeFileSync(`${DEAL_YMD}.json`, data);
}) */

/*
const dataBuffer = fs.readFileSync('202010.json')
const dataJSON = dataBuffer.toString();
console.log(dataJSON) */
