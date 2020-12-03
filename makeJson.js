const axios = require('axios');
const fs = require('fs');
const serviceKey = 'Chpjh51ytkero7fneUW01Kxbk%2BMK0iBXuaAOrT4tPAh%2BkIwoQ7tqrkuyOzTd0O0pVM%2BL%2F3DSebLxqfMX5UcDKg%3D%3D';

const getLoad = async (day, local) => {
	try {
		let res = await axios.get(
			`http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?serviceKey=${serviceKey}&LAWD_CD=${local}&DEAL_YMD=${day}&`,
		);
		let data = JSON.stringify(res.data.response.body.items.item).replace(/(\s*)/g, '');
		fs.writeFileSync(`./public/data/${local}/${day}.json`, data);
	} catch (e) {
		console.log('e', e);
	}
};
const locCode = ['41465', '41463'],
	years = ['2019', '2020'],
	month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

for (let i = 0, max = locCode.length; i < max; i++) {
	for (let y = 0, ymax = years.length; y < ymax; y++) {
		for (let m = 0, mmax = month.length; m < mmax; m++) {
			getLoad(`${years[y]}${month[m]}`, `${locCode[i]}`);
		}
	}
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

let promises = [];
let promises2 = [];
let files = fs.readdirSync(`./public/data/${locCode[0]}`);
let files2 = fs.readdirSync(`./public/data/${locCode[1]}`);

files.forEach(file => {
	promises.push(readFromFile(`./public/data/${locCode[0]}/${file}`));
});
files2.forEach(file => {
	promises2.push(readFromFile(`./public/data/${locCode[1]}/${file}`));
});

Promise.all(promises).then(values => {
	let data = JSON.stringify(values).replace(/(\s*)/g, '');
	fs.writeFileSync(`./public/year/${locCode[0]}/20202019.json`, data);
});

Promise.all(promises2).then(values => {
	let data = JSON.stringify(values).replace(/(\s*)/g, '');
	fs.writeFileSync(`./public/year/${locCode[1]}/20202019.json`, data);
});
