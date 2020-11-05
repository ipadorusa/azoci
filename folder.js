const fs = require('fs');
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

let list = readFromFile(url).then(res => console.log(res));
/*
let aptList = [];
for (const item of d) {
	aptList.push(item['아파트']);
}
let uniAptList = [...new Set(aptList)];
*/
