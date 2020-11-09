let fs = require('fs');
const filter = require('lodash/filter');

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
const url = './public/year/41463/20202019.json';

readFromFile(url).then(res => getList(res));

function sol(arr) {
	return arr.reduce((sum, cur) => sum + parseInt(cur), 0) / arr.length;
}

async function getList(res) {
	let data = await res;
	let filterData = filter(data.flat(), { 년: 2020, 아파트: '영통로효성해링턴플레이스1차', 전용면적: 59.963 });
	//let filterData2 = filter(filterData, o => o['월'] > 1);
	let filteList = [];
	for (let item of filterData) {
		filteList.push(item['거래금액'].replace(/,/g, ''));
	}
	return sol(filteList);
}
