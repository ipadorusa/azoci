<template>
	<div>
		<el-table :key="1" :data="list" :default-sort="{ prop: '건축년도', order: 'descending' }" style="width: 100%">
			<el-table-column v-for="(head, idx) in headList" :key="idx" :prop="head" :label="head"></el-table-column>
		</el-table>
	</div>
</template>

<script>
import axios from 'axios';
import { filter } from 'lodash';

export default {
	name: 'DashBoard',
	created() {
		this.loadData(this.$route.params.localCode);
		this.filterVal = sessionStorage.getItem('DashBoard');
	},
	data() {
		return {
			list: [],
			headList: ['건축년도', '법정동', '아파트', '년', '월', '일', '전용면적', '층', '거래금액'],
			filterVal: '',
			loading: true,
		};
	},
	methods: {
		async loadData(localCode) {
			try {
				console.time('response in');
				let res = await axios.get(`/year/${localCode}/20202019.json`).then(res => res.data);
				this.renderTable(res.flat());
				console.timeEnd('response in');
			} catch (e) {
				alert(e);
			}
		},
		renderTable(data) {
			this.list = filter(data, { 아파트: decodeURIComponent(this.filterVal) });
		},
	},
};
</script>

<style scoped></style>
