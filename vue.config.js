module.exports = {
	chainWebpack: config => {
		config.plugin('html').tap(args => {
			args[0].title = '수지구,기흥구 아파트 월별 실거래가 검색';
			return args;
		});
	},
};

/*
module.exports = {
	devServer: {
		proxy: 'http://openapi.molit.go.kr:8081/',
		/!* '/api/': {
            target: 'http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptRent?',
            changeOrigin: true,
            pathRewrite: {
                '^/api/': ''
            }
        } *!/
	},
};
*/
