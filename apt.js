const axios = require('axios');
const fs = require('fs');
const serviceKey = 'Chpjh51ytkero7fneUW01Kxbk%2BMK0iBXuaAOrT4tPAh%2BkIwoQ7tqrkuyOzTd0O0pVM%2BL%2F3DSebLxqfMX5UcDKg%3D%3D';
const LAWD_CD = '41465';
const LAWD_CD2 = '41463';

const mon = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const fecthApi = (day, local) =>
	axios.get(
		`http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?serviceKey=${serviceKey}&LAWD_CD=${local}&DEAL_YMD=${day}&`,
	);

const getLoad = async (day, local) => {
	try {
		let res = await fecthApi(day, local);
		let data = JSON.stringify(res.data.response.body.items.item).replace(/(\s*)/g, '');
		fs.writeFileSync(`./public/data/${local}/${day}.json`, data);
	} catch (e) {
		console.log('e', e);
	}
};
getLoad(`202011`, LAWD_CD);
