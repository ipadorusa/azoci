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
const url = './public/year/41465/20202019.json';

readFromFile(url).then(res => getList(res));

function sol(arr) {
	return arr.reduce((sum, cur) => sum + parseInt(cur), 0) / arr.length;
}

async function getList(res) {
	let data = await res;
	let filterData = filter(data.flat(), { 년: 2020, 아파트: '동성1차', 전용면적: 84.97 });
	let filterData2 = filter(filterData, o => o['월'] > 1);
	let filteList = [];
	let count = {};
	for (let item of filterData2) {
		filteList.push(item['층']);
	}
	filteList.forEach(x => {
		count[x] = (count[x] || 0) + 1;
	});

	console.log(sol(filteList), count);
	return sol(filteList);
}
