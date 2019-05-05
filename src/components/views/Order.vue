<template>
	<div class="message_wrap">
		<div class="message_inner">
			<div class="message_header">
				<h3>订单管理</h3>
				<hr />
			</div>
			<div>
				<el-form :inline="true" :model="searchFrom" class="demo-form-inline">
					<el-form-item label="订单编号：" prop="orderNo">
						<el-input placeholder="订单编号" v-model="searchFrom.orderNo" clearable></el-input>
					</el-form-item>
          <el-form-item label="订单状态：" prop="status" >
            <el-select v-model="messageFrom.status" style="width:90%;">
              <el-option label="待发货" value="1"></el-option>
              <el-option label="已发货" value="2"></el-option>
              <el-option label="已签收" value="3"></el-option>
              <el-option label="已取消" value="4"></el-option>
            </el-select>
          </el-form-item>
					<el-button @click="search()">查询</el-button>
				</el-form>
			</div>
			<el-dialog title="修改订单" :visible.sync="dialogEdit">
				<el-form :model="form1" ref="catalogForm">
					<el-form-item label="快递单号：" prop="expressNo" :label-width="formLabelWidth">
						<el-input v-model="form1.expressNo" auto-complete="off" clearable :disabled="disabled" style="width:90%;">
						</el-input>
					</el-form-item>
          <el-form-item label="订单状态：" prop="status" :label-width="formLabelWidth">
            <el-select v-model="form1.status" style="width:90%;">
              <el-option label="待发货" :value="1"></el-option>
              <el-option label="已发货" :value="2"></el-option>
              <el-option label="已签收" :value="3"></el-option>
              <el-option label="已取消" :value="4"></el-option>
            </el-select>
          </el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogEdit = false">取 消</el-button>
					<el-button type="primary" @click="updateClick">确 定</el-button>
				</div>
			</el-dialog>
			<div class="message-table">
				<template>
					<el-table :data="tableData" style="width: 100%" height="580">
						<el-table-column label="序号" type="index" :index="indexMethod" width='80'>
						</el-table-column>
						<el-table-column prop="orderNo" label="订单编号">
						</el-table-column>
						<el-table-column prop="goodsName" label="商品名称">
						</el-table-column>
						<el-table-column prop="mobile" label="用户手机号">
						</el-table-column>
            <el-table-column prop="realname" label="用户姓名">
            </el-table-column>
						<el-table-column prop="orderCount" label="订单数量">
						</el-table-column>
						<el-table-column prop="address" label="配送地址">
						</el-table-column>
            <el-table-column prop="expressNo" label="快递单号">
            </el-table-column>
            <el-table-column prop="createDate" label="创建时间">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
						<el-table-column prop="appointStatus" label="操作">
							<template slot-scope="scope">
								<el-button @click="updateDate(scope.row.id)" type="text" size="small">修改</el-button>
								<el-button @click="Delete(scope.row.id)" type="text" size="small">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 70]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import { formatDate } from '../../utils/date.js'
	export default {
		name: 'Order',
		data() {
			return {
				searchFrom: {},
				form1: {
					id: 0
				},
				messageFrom: {

				},
				loading: false,
				disabled: false,
				desactivar: 0,
				start: 1,
				option: '',
				imageUrl: '',
				formLabelWidth: '100px',
				currentPage: 1,
				pageSize: 10,
				totalCount: 0,
				tableData: [],
				selectData: [],
				showImg: false,
				imgSrc: '',
				dialogEdit: false,
			}
		},
		created() {
			this.accountList()
		},
		methods: {
			accountList() {
				let parameterData = {
					pageNum: this.currentPage,
					pageSize: this.pageSize,
          orderNo: this.searchFrom.orderNo,
          status:this.searchFrom.status
				}
				this.$fetch('/api/mOrder/page', parameterData).then(res => {
					if(res.statusCode == 2000) {
						for(let i = res.data.list.length - 1; i >= 0; i--) {
							if(res.data.list[i].status == 1) {
								res.data.list[i].status = '待发货'
							}else if(res.data.list[i].status == 2){
                res.data.list[i].status = '已发货'
              }else if(res.data.list[i].status == 3){
                res.data.list[i].status = '已签收'
              } else {
								res.data.list[i].status = '已取消'
							}
						}
						this.tableData = res.data.list
						this.totalCount = res.data.total
					} else {
						this.$message({
							type: 'error',
							message: res.message,
							duration: 3000
						})
					}
				})
			},
			search() {
				this.currentPage = 1
				this.pageSize = 10
				this.accountList()
			},
			updateDate(id) {
				this.dialogEdit = true
				let parameterData = {
					id: id
				}
				this.$fetch('/api/mOrder/info', parameterData).then(res => {
					if(res.statusCode == 2000) {
						this.form1 = res.data
					} else {
						this.$message({
							type: 'error',
							message: res.message,
							duration: 3000
						})
					}
				})
			},
			updateClick() {
				let parameterData = {
					id: this.form1.id,
          expressNo: this.form1.expressNo,
          status: this.form1.status
				}
				this.$post('/api/mOrder/edit', parameterData).then(res => {
					if(res.statusCode == 2000) {
						this.dialogEdit = false
						this.$message({
							type: 'success',
							message: '修改成功！'
						})
						this.accountList()
					} else {
					}
				})
			},
			Delete(id) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning',
						center: true
					})
					.then(() => {
						this.delData(id)
					})
					.catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						})
					})
			},
			delData(id) {
				let parameterData = {
					id: id
				}
				this.$post('/api/mOrder/del', parameterData).then(res => {
					if(res.statusCode == 2000) {
						this.$message({
							type: 'success',
							message: '删除成功！'
						})
						this.accountList()
					} else {
					}
				})
			},
			dateFormat(row, column) {
				var date = row[column.property]
				if(date == undefined) {
					return ''
				}
				return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
			},
			indexMethod(index) {
				return index * 1 + 1
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.accountList()
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.accountList()
			}
		}
	}
</script>
<style>
	.message_wrap {
		width: 100%;
	}
	
	.message_inner {
		margin: auto;
		padding: 0 20px;
	}
	
	.message_header {
		margin-bottom: 20px;
	}
	
	.message_header h3 {
		text-align: left;
	}
	
	.message_header hr {
		color: #e6e6e6;
		opacity: 0.5;
	}
	
	.message-table {
		border: 1px solid #e6e6e6;
		margin-bottom: 20px;
		margin-top: 20px;
	}
	
	.el-table th {
		background-color: #e6e6e6;
	}
</style>
