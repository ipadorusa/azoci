const readFromFile = file => {
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
};

export { readFromFile };
