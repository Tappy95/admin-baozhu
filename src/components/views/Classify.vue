<template>
	<div class="message_wrap">
		<div class="message_inner">
			<div class="message_header">
				<h3>运营管理/新闻公告</h3>
				<hr />
			</div>
			<div>
				<el-form :inline="true" :model="searchFrom" class="demo-form-inline">
					<el-form-item label="分类名称：" prop="typeName">
						<el-input placeholder="分类名称" v-model="searchFrom.typeName" clearable></el-input>
					</el-form-item>
					<el-button @click="search()">查询</el-button>
					<el-button @click="load(0)">添加</el-button>
				</el-form>
			</div>
			<el-dialog :title="option" :visible.sync="dialogForm">
				<el-form :model="messageFrom" :rules="rules" ref="catalogForm">
					<el-form-item label="分类名称：" prop="typeName" :label-width="formLabelWidth">
						<el-input v-model="messageFrom.typeName" auto-complete="off" clearable :disabled="disabled" style="width:90%;">
						</el-input>
					</el-form-item>
					<el-form-item label="分类描述：" prop="remark" :label-width="formLabelWidth">
						<el-input :rows="7" type="textarea" v-model="messageFrom.remark" auto-complete="off" clearable :disabled="disabled" style="width:90%;">
						</el-input>
					</el-form-item>
          <el-form-item label="图片:"
                        prop="imgUrl"
                        :label-width="formLabelWidth">
            <el-upload class="bannerAvatar-uploader"
                       action="/api/upload"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl"
                   :src="imageUrl"
                   class="avatar">
              <i v-else
                 class="el-icon-plus bannerAvatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
					<el-form-item label="状态：" prop="status" :label-width="formLabelWidth">
						<el-select v-model="messageFrom.status" style="width:90%;">
              <el-option label="启用" :value="1"></el-option>
              <el-option label="停用" :value="2"></el-option>
						</el-select>
					</el-form-item>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogForm = false">取 消</el-button>
					<el-button type="primary" @click="optionBtn('catalogForm')">确 定</el-button>
				</div>
			</el-dialog>
			<el-dialog title="修改新闻" :visible.sync="dialogEdit">
				<el-form :model="form1" ref="catalogForm">
					<el-form-item label="分类名称：" prop="typeName" :label-width="formLabelWidth">
						<el-input v-model="form1.typeName" auto-complete="off" clearable :disabled="disabled" style="width:90%;">
						</el-input>
					</el-form-item>

					<el-form-item label="内容：" prop="remark" :label-width="formLabelWidth">
						<el-input :rows="7" type="textarea" v-model="form1.remark" auto-complete="off" clearable :disabled="disabled" style="width:90%;">
						</el-input>
					</el-form-item>
          <el-form-item label="图片:"
                        prop="imgUrl"
                        :label-width="formLabelWidth">
            <el-upload class="bannerAvatar-uploader"
                       action="/api/upload"
                       :show-file-list="false"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl"
                   :src="imageUrl"
                   class="avatar">
              <i v-else
                 class="el-icon-plus bannerAvatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
					<el-form-item label="状态："  prop="status" :label-width="formLabelWidth">
						<el-select v-model="form1.status" :disabled="disabled" placeholder="" style="width:90%;">
							<el-option label="启用" :value="1"></el-option>
							<el-option label="停用" :value="2"></el-option>
						</el-select>
					</el-form-item>

				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogEdit = false">取 消</el-button>
					<el-button type="primary" @click="updateClick">确 定</el-button>
				</div>
			</el-dialog>

			<el-dialog title="新闻详情" :visible.sync="dialogDetail">
				<el-form :model="form2">
					<el-form-item label="分类名称：" :label-width="formLabelWidth">
						<el-input disabled="disabled" v-model="form2.typeName" auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="分类描述：" :label-width="formLabelWidth">
						<el-input disabled="disabled" :rows="10" type="textarea" auto-complete="off" v-model="form2.remark"></el-input>
					</el-form-item>
          <el-form-item label="图片:"
                        :label-width="formLabelWidth">
              <img :src="form2.imgUrl" class="avatar">
          </el-form-item>
					<el-form-item label="状态：" :label-width="formLabelWidth">
						<el-select disabled="disabled" v-model="form2.status" placeholder="" style="width:90%;">
						</el-select>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button type="primary" @click="dialogDetail = false">确 定</el-button>
				</div>
			</el-dialog>
			<div class="message-table">
				<template>
					<el-table :data="tableData" style="width: 100%" height="580">
						<el-table-column label="序号" type="index" :index="indexMethod" width='80'>
						</el-table-column>
						<el-table-column prop="typeName" label="分类名称">
						</el-table-column>
						<el-table-column prop="remark" label="描述">
						</el-table-column>
            <el-table-column label="图片地址">
              <template slot-scope="scope">
                <img :src='scope.row.imgUrl'
                     style="width: 100px;height: 50px">
              </template>
            </el-table-column>
						<el-table-column prop="createDate" label="创建时间">
						</el-table-column>
						<el-table-column prop="status" label="状态">
						</el-table-column>
						<el-table-column prop="appointStatus" label="操作">
							<template slot-scope="scope">
								<el-button @click="updateDate(scope.row.id)" type="text" size="small">修改</el-button>
								<el-button @click="Delete(scope.row.id)" type="text" size="small">删除</el-button>
								<el-button @click="getClick(scope.row.id)" type="text" size="small">详情</el-button>
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
		name: 'Classify',
		data() {
			return {
				searchFrom: {},
				form1: {
					id: 0,
					newsTitle: '',
					newsContent: '',
					newsSource: '',
					newsState: 1,
				},
				form2: {

				},
				messageFrom: {
          typeName: '',
          remark: '',
          status: ''
				},

				rules: {
          typeName: [{
						required: true,
						message: '请输入分类名称',
						trigger: 'blur'
					}],
          remark: [{
						required: true,
						message: '请输入分类描述',
						trigger: 'change'
					}],
          status: [{
						required: true,
						message: '请选择状态',
						trigger: 'change'
					}],
				},
				loading: false,
				disabled: false,
				desactivar: 0,
				start: 1,
				option: '',
				imageUrl: '',
				formLabelWidth: '100px',
				dialogForm: false,
				currentPage: 1,
				pageSize: 10,
				totalCount: 0,
				tableData: [],
				selectData: [],
				showImg: false,
				imgSrc: '',
				dialogEdit: false,
				dialogDetail: false
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
          typeName: this.searchFrom.typeName
				}
				this.$fetch('/api/mGoodsType/page', parameterData).then(res => {
					if(res.statusCode == 2000) {
						for(let i = res.data.list.length - 1; i >= 0; i--) {
							if(res.data.list[i].status == 1) {
								res.data.list[i].status = '启用'
							} else {
								res.data.list[i].status = '停用'
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
			load(id) {
				this.dialogForm = true
				this.messageFrom.title = ''
				this.messageFrom.id = null
				this.messageFrom.content = ''
        this.imageUrl=''
				this.option = '添加'
			},
			//修改
			updateDate(id) {
				this.dialogEdit = true
        this.imageUrl=''
				let parameterData = {
					id: id
				}
				this.$fetch('/api/mGoodsType/info', parameterData).then(res => {
					if(res.statusCode == 2000) {
						this.form1 = res.data
            this.imageUrl=res.data.imgUrl
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
          typeName: this.form1.typeName,
          remark: this.form1.remark,
          status: this.form1.status,
          imgUrl:this.imageUrl
				}
				this.$post('/api/mGoodsType/edit', parameterData).then(res => {
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
			getClick(id) {
				this.dialogDetail = true
				let parameterData = {
					id: id
				}
				this.$fetch('/api/mGoodsType/info', parameterData).then(res => {
					if(res.statusCode == 2000) {
						if(res.data.newsState == 1) {
							res.data.newsState = '启用'
						} else {
							res.data.newsState = '停用'
						}
						this.form2 = res.data
					} else {
						this.$message({
							type: 'error',
							message: res.message,
							duration: 3000
						})
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
				this.$fetch('/api/mGoodsType/del', parameterData).then(res => {
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
			optionBtn(form) {
				this.$refs[form].validate(valid => {
					let parameterData = {
            typeName: this.messageFrom.typeName,
            remark: this.messageFrom.remark,
            status: this.messageFrom.status,
            imgUrl:this.imageUrl
					}
					if(valid) {
						this.$post('/api/mGoodsType/insert', parameterData).then(res => {
							if(res.statusCode == 2000) {

								this.$message({
									type: 'success',
									message: res.message
								})
								this.dialogForm = false
								this.accountList()

							} else {
								this.$message({
									type: 'error',
									message: res.message
								})
							}
						})
					}
				})
			},
			remoteMethod(query) {
				let parameterData = {
					mobile: query
				}
				this.$fetch('/api/user/info/search', parameterData).then(res => {
					if(res.statusCode == 2000) {
						this.selectData = res.data
					} else {
						this.$message({
							type: 'error',
							message: res.message,
							duration: 3000
						})
					}
				})
			},
      handleAvatarSuccess(res, file) {
        this.imageUrl=res.data
      },
      beforeAvatarUpload(file) {

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
  .bannerAvatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .bannerAvatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .bannerAvatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
</style>
