const fs = require('fs');
const filter = require('lodash/filter');

/*function readFromFile(file) {
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
}*/
const url = './public/year/20202019.json';

let list = fs.readFileSync(url);
let d = JSON.parse(list);
let c = filter(d.flat(), { 아파트: '버들치마을경남아너스빌1차' });
let b = [];
d.forEach(el => {
	b.push(el.filter(word => word['아파트'] === '버들치마을경남아너스빌1차'));
});
console.log(b);
