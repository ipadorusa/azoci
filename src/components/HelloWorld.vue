<template>
	<div>
		<el-row>
			<el-col :span="12">
				<el-card class="box-card">
					<el-input placeholder="Please input" v-model="input"></el-input>
				</el-card>
			</el-col>
			<el-col :span="12">
				<el-card class="box-card">
					<el-select v-model="value" placeholder="Select" size="large">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					</el-select>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<el-table v-if="list.length > 0" :data="list.filter(x => !input || x['아파트'].includes(input))" style="width: 100%">
						<el-table-column v-for="(item, idx) in theadFilters" :key="idx" :prop="item" :label="item" :class-name="`thead + ${idx}`"> </el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'HelloWorld',
	created() {
		this.value = this.defaultYearMonth;
		this.loadData();
	},
	data() {
		return {
			url: `http://localhost:8080/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?serviceKey=`,
			LAWD_CD: '41465',
			list: '',
			theadFilters: ['건축년도', '법정동', '아파트', '년', '월', '일', '전용면적', '층', '거래금액'],
			input: '',
			options: [
				{
					value: '202010',
					label: '202010',
				},
				{
					value: '202009',
					label: '202009',
				},
				{
					value: '202008',
					label: '202008',
				},
				{
					value: '202007',
					label: '202007',
				},
				{
					value: '202006',
					label: '202006',
				},
			],
			value: '',
		};
	},
	methods: {
		async loadData() {
			try {
				let res = await axios.get(`${this.url}${process.env['VUE_APP_KEY']}&LAWD_CD=${this.LAWD_CD}&DEAL_YMD=${this.value}&`);
				this.list = res.data.response.body.items.item;
			} catch (e) {
				console.log(e);
			}
		},
	},
	computed: {
		defaultYearMonth() {
			const year = new Date().getFullYear();
			const month = new Date().getMonth() + 1 < 10 ? '0' + new Date().getMonth() + 1 : new Date().getMonth() + 1;
			return year + '' + month;
		},
	},
	watch: {
		value(newVal, oldVal) {
			if (oldVal !== '') {
				this.loadData();
			}
		},
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
.box-card {
	margin-bottom: 20px;
}
</style>
