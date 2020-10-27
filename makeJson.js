const axios = require('axios');
const fs = require('fs');
const serviceKey = 'Chpjh51ytkero7fneUW01Kxbk%2BMK0iBXuaAOrT4tPAh%2BkIwoQ7tqrkuyOzTd0O0pVM%2BL%2F3DSebLxqfMX5UcDKg%3D%3D';
const LAWD_CD = '41465';

const getLoad = async day => {
	try {
		let res = await axios.get(
			`http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?serviceKey=${serviceKey}&LAWD_CD=${LAWD_CD}&DEAL_YMD=${day}&`,
		);
		let data = JSON.stringify(res.data.response.body.items.item).replace(/(\s*)/g, '');
		fs.writeFileSync(`./public/data/${day}.json`, data);
	} catch (e) {
		console.log('e', e);
	}
};
const mon = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

for (let i = 0, max = 12; i < max; i++) {
	getLoad(`2019${mon[i]}`);
}
for (let i = 0, max = 10; i < max; i++) {
	getLoad(`2020${mon[i]}`);
}

function readFromFile(file) {
	return new Promise((resolve, reject) => {
		fs.readFile(file, function(err, data) {
			if (err) {
				console.log(err);
				reject(err);
			} else {
				resolve(JSON.parse(data));
			}
		});
	});
}

const promises = [
	readFromFile('./public/data/201901.json'),
	readFromFile('./public/data/201902.json'),
	readFromFile('./public/data/201903.json'),
	readFromFile('./public/data/201904.json'),
	readFromFile('./public/data/201905.json'),
	readFromFile('./public/data/201906.json'),
	readFromFile('./public/data/201907.json'),
	readFromFile('./public/data/201908.json'),
	readFromFile('./public/data/201909.json'),
	readFromFile('./public/data/201910.json'),
	readFromFile('./public/data/201911.json'),
	readFromFile('./public/data/201912.json'),
	readFromFile('./public/data/202001.json'),
	readFromFile('./public/data/202002.json'),
	readFromFile('./public/data/202003.json'),
	readFromFile('./public/data/202004.json'),
	readFromFile('./public/data/202005.json'),
	readFromFile('./public/data/202006.json'),
	readFromFile('./public/data/202007.json'),
	readFromFile('./public/data/202008.json'),
	readFromFile('./public/data/202009.json'),
	readFromFile('./public/data/202010.json'),
];
Promise.all(promises).then(values => {
	let data = JSON.stringify(values).replace(/(\s*)/g, '');
	fs.writeFileSync(`./public/data/20202019.json`, data);
});
