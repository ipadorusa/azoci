<template>
	<div>
		<el-table :key="1" :data="list" style="width: 100%">
			<el-table-column v-for="(head, idx) in headList" :key="idx" :prop="head" :label="head"></el-table-column>
		</el-table>
	</div>
</template>

<script>
import axios from 'axios';
import { concat, filter } from 'lodash';

export default {
	name: 'DashBoard',
	created() {
		this.loadData();
		this.filterVal = sessionStorage.getItem('DashBoard');
	},
	data() {
		return {
			list: [],
			headList: ['아파트', '거래금액', '년', '월', '일', '전용면적'],
			filterVal: '',
		};
	},
	methods: {
		async loadData() {
			try {
				let res = await axios.get(`/data/20202019.json`).then(res => res.data);
				this.renderTable(res);
			} catch (e) {
				console.log(e, 'eeeeeeeeeeee');
			}
		},
		renderTable(data) {
			for (let d of data) {
				this.list = concat(this.list, d);
			}
			this.filterTable(this.list);
		},
		filterTable(data) {
			this.list = filter(data, { 아파트: decodeURIComponent(this.filterVal) });
		},
	},
};
</script>

<style scoped></style>
