<template>
	<div>
		<el-table :key="1" :data="list" style="width: 100%">
			<el-table-column v-for="(head, idx) in headList" :key="idx" :prop="head" :label="head"></el-table-column>
		</el-table>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: 'DashBoard',
	created() {
		this.loadData();
	},
	data() {
		return {
			list: [],
			headList: ['아파트', '거래금액'],
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
				this.list = this.list.concat(d);
			}
			console.log(this.list);
		},
	},
};
</script>

<style scoped></style>
