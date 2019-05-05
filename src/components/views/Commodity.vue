<template>
	<div class="message_wrap">
		<div class="message_inner">
			<div class="message_header">
				<h3>商品管理</h3>
				<hr />
			</div>
			<div>
				<el-form :inline="true" :model="searchFrom" class="demo-form-inline">
					<el-form-item label="商品名称：" prop="goodsName">
						<el-input placeholder="请输入商品名称" v-model="searchFrom.goodsName" clearable></el-input>
					</el-form-item>
					<el-button @click="search()">查询</el-button>
					<el-button @click="load(0)">添加</el-button>
				</el-form>
			</div>
			<el-dialog :title="option" :visible.sync="dialogForm">
				<el-form :model="messageFrom" :rules="rules" ref="catalogForm">

          <el-form-item label="商品类型" :label-width="formLabelWidth" prop="typeName">
          <el-select v-model="messageFrom.typeName" placeholder="类型名称" clearable="">
            <el-option v-for="(item,index) in goodsType" :key="index" :label="item.typeName" :value="item.id"></el-option>
          </el-select><br />
        </el-form-item>

					<el-form-item label="商品名称：" prop="goodsName" :label-width="formLabelWidth">
						<el-input v-model="messageFrom.goodsName" auto-complete="off" clearable :disabled="disabled" style="width:90%;">
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

          <el-form-item label="商品总量：" prop="totalCount" :label-width="formLabelWidth">
            <el-input v-model="messageFrom.totalCount" auto-complete="off" clearable :disabled="disabled" style="width:90%;">
            </el-input>
          </el-form-item>

          <el-form-item label="所需积分：" prop="needIntegral" :label-width="formLabelWidth">
            <el-input v-model="messageFrom.needIntegral" auto-complete="off" clearable :disabled="disabled" style="width:90%;">
            </el-input>
          </el-form-item>

          <el-form-item label="简介：" prop="simpleRemark" :label-width="formLabelWidth">
            <el-input v-model="messageFrom.simpleRemark" auto-complete="off" clearable :disabled="disabled" style="width:90%;">
            </el-input>
          </el-form-item>

					<el-form-item label="商品描述：" prop="goodsRemark" :label-width="formLabelWidth">
						<el-input :rows="7" type="textarea" v-model="messageFrom.goodsRemark" auto-complete="off" clearable :disabled="disabled" style="width:90%;">
						</el-input>
					</el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogForm = false">取 消</el-button>
					<el-button type="primary" @click="optionBtn('catalogForm')">确 定</el-button>
				</div>
			</el-dialog>

			<el-dialog title="修改商品" :visible.sync="dialogEdit">
				<el-form :model="form1" :rules="rules" ref="catalogForm">
          <el-form-item label="商品类型" :label-width="formLabelWidth" prop="typeId">
            <el-select v-model="form1.typeId" placeholder="类型名称" clearable="">
              <el-option v-for="(item,index) in goodsType" :key="index" :label="item.typeName" :value="item.id"></el-option>
            </el-select><br />
          </el-form-item>

          <el-form-item label="商品名称：" :label-width="formLabelWidth" prop="goodsName">
            <el-input  v-model="form1.goodsName" auto-complete="off"></el-input>
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

          <el-form-item label="商品总量：" :label-width="formLabelWidth" prop="totalCount">
            <el-input v-model="form1.totalCount" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="剩余总量：" :label-width="formLabelWidth" prop="surplusCount">
            <el-input v-model="form1.surplusCount" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所需积分：" :label-width="formLabelWidth" prop="needIntegral">
            <el-input v-model="form1.needIntegral" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品简介：" :label-width="formLabelWidth" prop="simpleRemark">
            <el-input v-model="form1.simpleRemark" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述：" :label-width="formLabelWidth" prop="goodsRemark">
            <el-input :rows="10" type="textarea" auto-complete="off" v-model="form1.goodsRemark"></el-input>
          </el-form-item>
				</el-form>
				<div slot="footer" class="dialog-footer">
					<el-button @click="dialogEdit = false">取 消</el-button>
					<el-button type="primary" @click="updateClick">确 定</el-button>
				</div>
			</el-dialog>

			<el-dialog title="商品详情" :visible.sync="dialogDetail">
				<el-form :model="form2">

          <el-form-item label="商品类型" :label-width="formLabelWidth" prop="typeId">
            <el-select disabled="disabled" v-model="form2.typeId" placeholder="类型名称" clearable="">
              <el-option v-for="(item,index) in goodsType" :key="index" :label="item.typeName" :value="item.id"></el-option>
            </el-select><br />
          </el-form-item>

					<el-form-item label="商品名称：" :label-width="formLabelWidth">
						<el-input disabled="disabled" v-model="form2.goodsName" auto-complete="off"></el-input>
					</el-form-item>

          <el-form-item label="商品图片"
                        prop="imgUrl"
                        :label-width="formLabelWidth">
              <img v-if="form2.imgUrl"
                   :src="form2.imgUrl"
                   class="avatar">
          </el-form-item>

					<el-form-item label="商品总量：" :label-width="formLabelWidth">
						<el-input disabled="disabled" v-model="form2.totalCount" auto-complete="off"></el-input>
					</el-form-item>
          <el-form-item label="剩余总量：" :label-width="formLabelWidth">
            <el-input disabled="disabled" v-model="form2.surplusCount" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="所需积分：" :label-width="formLabelWidth">
            <el-input disabled="disabled" v-model="form2.needIntegral" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品简介：" :label-width="formLabelWidth">
            <el-input disabled="disabled" v-model="form2.simpleRemark" auto-complete="off"></el-input>
          </el-form-item>

					<el-form-item label="描述：" :label-width="formLabelWidth">
						<el-input disabled="disabled" :rows="10" type="textarea" auto-complete="off" v-model="form2.goodsRemark"></el-input>
					</el-form-item>

					<el-form-item label="上架时间：" :label-width="formLabelWidth">
						<el-input disabled="disabled" auto-complete="off" v-model="form2.shelfDate"></el-input>
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
						<el-table-column prop="typeName" label="所属分类">
						</el-table-column>
						<el-table-column prop="goodsName" label="商品名称">
						</el-table-column>
            <el-table-column label="商品图片">
              <template slot-scope="scope">
                <img :src='scope.row.imgUrl'
                     style="width: 100px;height: 50px"
                     @click="clickImg($event)">
              </template>
            </el-table-column>
						<el-table-column prop="totalCount" label="商品总量">
						</el-table-column>
						<el-table-column prop="surplusCount" label="剩余总量">
						</el-table-column>
						<el-table-column prop="needIntegral" label="所需积分">
						</el-table-column>
            <el-table-column prop="simpleRemark" label="简介">
            </el-table-column>
            <el-table-column prop="shelfDate" label="上架时间">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
						<el-table-column prop="appointStatus" label="操作" width="200px">
							<template slot-scope="scope">
                <el-button v-if="scope.row.status=='待上架'" @click="updateGrounding(scope.row.id)" type="text" size="small">上架</el-button>
                <el-button v-if="scope.row.status=='已上架'" @click="updateUndercarriage(scope.row.id)" type="text" size="small">下架</el-button>
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
		name: 'Commodity',
		data() {
			return {
				searchFrom: {},
        goodsType:[],
        imageUrl:'',
				form1: {
					id: 0,

				},
				form2: {

				},
				messageFrom: {

				},

				rules: {
          typeName: [{
            required: true,
            message: '请选择商品类型',
            trigger: 'change'
          }],
          goodsName: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}],
          totalCount: [{
						required: true,
						message: '请输入商品总量',
						trigger: 'blur'
					},
          {
            type: 'number',
            message: '请输入仅数字格式',
            trigger: 'blur',
            transform(value) {
              return Number(value)
            }
          }
					],
          surplusCount:[{
            required: true,
            message: '请输入商品剩余总量',
            trigger: 'blur'
          },
            {
              type: 'number',
              message: '请输入仅数字格式',
              trigger: 'blur',
              transform(value) {
                return Number(value)
              }
            }
          ],
          needIntegral: [{
						required: true,
						message: '请输入所属积分',
						trigger: 'blur'
					},
            {
              type: 'number',
              message: '请输入仅数字格式',
              trigger: 'blur',
              transform(value) {
                return Number(value)
              }
            }],
          simpleRemark: [{
						required: true,
						message: '请输入商品简介',
						trigger: 'blur'
					}],
          goodsRemark: [{
            required: true,
            message: '请输入商品描述',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择商品状态',
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
      this.getDictionary()
		},
		methods: {
      getDictionary(){
        this.$fetch('/api/mGoodsType/typeList').then(res => {
          if (res.statusCode == 2000){
          this.goodsType = res.data
        }
        })
      },

      updateGrounding(id){
        let parameterData = {
          id:id,
          status: 2,
        }
        this.$post('/api/mGoodsInfo/editStatus', parameterData).then(res => {
          if(res.statusCode == 2000) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.accountList()
        } else {
          this.$message({ type: 'info', message: '已取消修改' })
        }
      })
      },
      updateUndercarriage(id){
        let parameterData = {
          id:id,
          status: 1,
        }
        this.$post('/api/mGoodsInfo/editStatus', parameterData).then(res => {
          if(res.statusCode == 2000) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.accountList()
        } else {
          this.$message({ type: 'info', message: '已取消修改' })
        }
      })
      },

			accountList() {
				let parameterData = {
					pageNum: this.currentPage,
					pageSize: this.pageSize,
          goodsName: this.searchFrom.goodsName

				}
				this.$fetch('/api/mGoodsInfo/page', parameterData).then(res => {
					if(res.statusCode == 2000) {
						for(let i = res.data.list.length - 1; i >= 0; i--) {
							if(res.data.list[i].status == 1) {
								res.data.list[i].status = '待上架'
							} else {
								res.data.list[i].status = '已上架'
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
        this.imageUrl=''
				this.dialogForm = true
				this.messageFrom.title = ''
				this.messageFrom.id = null
				this.messageFrom.content = ''
				this.option = '添加'
			},
			//修改
			updateDate(id) {
				this.dialogEdit = true
        this.imageUrl=''
				let parameterData = {
					id: id
				}
				this.$fetch('/api/mGoodsInfo/info', parameterData).then(res => {
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
				  id:this.form1.id,
          typeId: this.form1.typeId,
          goodsName:this.form1.goodsName,
          imgUrl: this.imageUrl,
          totalCount: this.form1.totalCount,
          surplusCount:this.form1.surplusCount,
          simpleRemark: this.form1.simpleRemark,
          goodsRemark: this.form1.goodsRemark
				}
        this.$post('/api/mGoodsInfo/edit', parameterData).then(res => {
					if(res.statusCode == 2000) {
						this.dialogEdit = false
						this.$message({
							type: 'success',
							message: '修改成功！'
						})
						this.accountList()
					} else {
						this.$message({ type: 'info', message: '已取消修改' })
					}
				})
			},
			getClick(id) {
				this.dialogDetail = true
        this.imageUrl=''
				let parameterData = {
					id: id
				}
				this.$fetch('/api/mGoodsInfo/info', parameterData).then(res => {
					if(res.statusCode == 2000) {
						if(res.data.status == 1) {
							res.data.status = '待上架'
						} else {
							res.data.status = '已上架'
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
				this.$fetch('/api/mGoodsInfo/del', parameterData).then(res => {
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
            typeId: this.messageFrom.typeName,
            goodsName:this.messageFrom.goodsName,
            imgUrl: this.imageUrl,
            totalCount: this.messageFrom.totalCount,
            simpleRemark: this.messageFrom.simpleRemark,
            needIntegral: this.messageFrom.needIntegral,
            goodsRemark: this.messageFrom.goodsRemark,
            status:1
					}
						this.$post('/api/mGoodsInfo/insert', parameterData).then(res => {
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
