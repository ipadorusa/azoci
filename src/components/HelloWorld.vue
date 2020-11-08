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
						<el-option v-for="item in optionsList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
					</el-select>
					<el-button-group>
						<el-button type="primary" @click="changeLocal('수지구')">수지구</el-button>
						<el-button type="primary" @click="changeLocal('기흥구')">기흥구</el-button>
					</el-button-group>
				</el-card>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<el-card class="box-card">
					<el-table
						v-if="list.length > 0"
						:default-sort="{ prop: '건축년도', order: 'descending' }"
						:data="list.filter(x => !input || x['아파트'].includes(input))"
						style="width: 100%"
						@cell-click="clickMove"
					>
						<el-table-column v-for="(item, idx) in theadFilters" :key="idx" :prop="item" :label="item"></el-table-column>
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
		let years = ['2019', '2020'];
		let month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

		for (let i = 0, max = years.length; i < max; i++) {
			for (let j = 0, max = month.length; j < max; j++) {
				if (i === 1 && j === 11) break;
				this.optionsList.push({ value: `${years[i]}${month[j]}`, label: `${years[i]}${month[j]}` });
			}
		}
		this.loadData();
	},
	data() {
		return {
			url: 'http://localhost:8080/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?serviceKey=',
			LAWD_CD: '41465',
			list: '',
			theadFilters: ['건축년도', '법정동', '아파트', '년', '월', '일', '전용면적', '층', '거래금액'],
			input: '',
			options: [],
			optionsList: [],
			value: '',
		};
	},
	methods: {
		async loadData() {
			try {
				let url = [`/data/${this.LAWD_CD}/${this.value}.json`];
				let res = await axios.get(url).then(res => res.data);
				this.renderTable(res);
			} catch (e) {
				console.log(e, 'eeeeeeeeeeee');
			}
		},
		renderTable(data) {
			this.list = data;
		},
		clickMove(a, b) {
			if (b.label === '아파트') {
				sessionStorage.setItem('DashBoard', encodeURIComponent(a['아파트']));
				this.$router.push({ name: 'DashBoard', params: { localCode: `${this.LAWD_CD}` } });
			}
		},
		changeLocal(localCode) {
			switch (localCode) {
				case '수지구':
					this.LAWD_CD = '41465';
					this.loadData();
					break;
				default:
					this.LAWD_CD = '41463';
					this.loadData();
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
