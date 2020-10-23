module.exports = {
    devServer: {
        proxy: 'http://openapi.molit.go.kr:8081/'
        /* '/api/': {
            target: 'http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptRent?',
            changeOrigin: true,
            pathRewrite: {
                '^/api/': ''
            }
        } */
    },
}