<template>
	<div class="administratormanage-wrap">
		<div class="administratormanage-inner">
			<div class="administratormanage-header">
				<h3>系统配置/管理员管理</h3>
				<hr />
			</div>
			<div>
				<el-form :inline="true" :model="formInline" class="demo-form-inline">
					<el-form-item label="手机号">
						<el-input v-model="formInline.mobile" placeholder="" clearable></el-input>
					</el-form-item>
					<el-button @click="search()">查询</el-button>
					<el-button @click="load()" v-if="add">添加</el-button>
				</el-form>
			</div>
			<div class="administratormanage-table">
				<template>
					<el-table :data="tableData" height="580">
						<el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
						</el-table-column>
						<el-table-column fixed="left" min-width="150px" prop="realname" label="管理员名称">
						</el-table-column>
						<el-table-column prop="mobile" min-width="150px" label="手机号">
						</el-table-column>
            <el-table-column min-width="170px" prop="roleName"  label="角色名称">
            </el-table-column>
						<el-table-column min-width="170px" prop="createTime" :formatter="dateFormat" label="创建时间">
						</el-table-column>
						<el-table-column prop="status" label="状态">
						</el-table-column>
						<el-table-column fixed="right" label="操作" v-if="powerTrue" :width="optionW">
							<template slot-scope="scope">
								<el-button size="mini" @click="Delete(scope.row.adminId)" v-if="del">删除</el-button>
								<el-button @click="getInfo(scope.row.adminId)" v-if="upd" size="mini">修改</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
				<el-dialog title="修改管理员管理" :visible.sync="dialogTableVisible" width="600px">
					<el-form :model="formtwo" :rules="rules">
						<el-form-item label="管理员名称:" :label-width="formLabelWidth" prop="realname">
							<el-input v-model="formtwo.realname" auto-complete="off" style="" clearable></el-input>
						</el-form-item>
						<el-form-item label="手机号:" :label-width="formLabelWidth" prop="mobile">
							<el-input v-model="formtwo.mobile" auto-complete="off"  clearable></el-input>
						</el-form-item>

            <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
              <el-input style="width:187px;" v-model="formtwo.password" type="password" auto-complete="off"  clearable></el-input>
            </el-form-item>

            <el-form-item label="角色名称:" :label-width="formLabelWidth" prop="roleName">
              <el-select v-model="formtwo.roleId" placeholder="" >
                <el-option :key="index" v-for="(item,index) in role" :label="item.roleName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>


						<el-form-item label="状态:" :label-width="formLabelWidth">
							<el-select v-model="formtwo.status" placeholder="">
								<el-option label="正常" :value="1"></el-option>
								<el-option label="冻结" :value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="dialogTableVisible = false">取 消</el-button>
						<el-button type="primary" @click="update(formtwo)">确 定</el-button>
					</div>
				</el-dialog>

        <el-dialog title="添加管理员" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="管理员名称:" :label-width="formLabelWidth" prop="realname">
              <el-input v-model="form.realname" auto-complete="off" style="" clearable>
              </el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="mobile" :label-width="formLabelWidth">
              <el-input  v-model="form.mobile" auto-complete="off" clearable></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password" :label-width="formLabelWidth">
              <el-input style="width: 187px"  v-model="form.password" auto-complete="off" clearable></el-input>
            </el-form-item>

            <el-form-item label="角色名称:" :label-width="formLabelWidth" prop="roleName">
              <el-select v-model="form.roleId" placeholder="" >
                <el-option :key="index" v-for="(item,index) in role" :label="item.roleName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="状态:" :label-width="formLabelWidth" prop="status">
              <el-select v-model="form.status" placeholder="" >
                <el-option label="删除" value="0"></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="冻结" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 70]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
  import md5 from 'js-md5'
  import { formatDate } from '../../utils/date.js'

  export default {
		name: 'AdministratorManage',
		data() {
			return {
        powerTrue:false,
        optionW:'0px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
				dialogTableVisible: false,
				formtwo: {},
				dialogFormVisible: false,
				form: {
          realname: '',
					mobile: '',
					password: '',
					status: '1'
				},
        role:[],
				roles: {
					id: '',
          realname: ''
				},
				rules: {
          realname: [{
						required: true,
						message: '请输入管理员名称',
						trigger: 'blur'
					}],
					mobile: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							min: 11,
							max: 11,
							message: '请输入11位手机号',
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
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
					status: [{
						required: true,
						message: '请选择状态',
						trigger: 'change'
					}],
          roleId: [{
            required: true,
            message: '请选择角色名称',
            trigger: 'change'
          }]
				},
				formLabelWidth: '120px',
				/* 分页*/
				currentPage: 1,
				pageSize: 10,
				totalCount: 0,
				formInline: {},
				tableData: [],
				isShow: false,
				selectDept: [],
				selectData: [],
				staff: 1,
         company: 2,
        tempPassword:'',
			}
		},
		created() {
      this.menuId=this.$route.query.id
      this.queryBtns()
			this.accountList()
      this.roleList()
		},
		methods: {

      //权限按钮
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.length - 1; i >= 0; i--) {
            if(res.data[i].btnCode == 'add') {
              this.add=true
            }
            if(res.data[i].btnCode == 'upd') {
              this.upd=true;
              this.powerTrue =true;
              this.optionW = '75px'
            }
            if(res.data[i].btnCode == 'del') {
              this.del=true;
              this.powerTrue =true;
              this.optionW = '75px'
            }

            if (this.upd && this.del) {
              this.powerTrue =true;
              this.optionW = '150px'
            }
          }
        } else {
        }
      })
      },
			indexMethod(index) {
				return index * 1 + 1
			},
      dateFormat(row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ''
        }
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
      },
			accountList() {
				let parameterData = {
					pageNum: this.currentPage,
					pageSize: this.pageSize,
					mobile: this.formInline.mobile
				}
				this.$fetch('/api/pAdmin/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
						for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].status == '0') {
              res.data.list[i].status = '已删除'
            }else if(res.data.list[i].status == '1') {
              res.data.list[i].status = '正常'
            } else {
              res.data.list[i].status = '冻结'
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
			load() {
				this.form={};
        this.formInline = {};
        this.dialogFormVisible = true;
			},
			addBtn(form) {
        // let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        let regs = /0?(13|14|15|18|17|19|16)[0-9]{9}/;
        if(!regs.test(this.form.mobile)){
            this.$message({
              type: 'error',
              message: '手机号格式错误'
            })
            return
        }

        this.form.password = md5(this.form.password)
				this.$refs[form].validate(valid => {
          if(valid) {
						this.$post('/api/pAdmin/add', this.form).then(res => {
            if ((res.statusCode+"").startsWith("2")) {
								this.dialogFormVisible = false
								this.$message({
									type: 'success',
									message: '添加成功！'
								})
								this.accountList()
							} else {
								this.$message({
									type: 'error',
									message: res.message
								})
							}
						})
					} else {}
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
          adminId: id
				}
				this.$fetch('/api/pAdmin/remove', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
						this.$message({
							type: 'success',
							message: '删除成功！'
						})
						this.accountList()
					} else {
						this.$message({
							type: 'error',
							message: '删除失败！'
						})
					}
				})
			},
			getInfo(id) {
        this.tempPassword ='';
				this.dialogTableVisible = true;
				this.$fetch('/api/pAdmin/queryOne', {
					adminId: id
				}).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
								this.tempPassword = res.data.password;
                this.formtwo = res.data;
							}
				})
			},
      roleList() {
        this.$fetch('/api/pRole/queryOption').then(res => {
        if ((res.statusCode+"").startsWith("2")) {
          this.role = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
        }
      })
      },
			update(formtwo) {
        // let regs = /^((13[0-9])|(17[0-1,6-8])|(15[^4,\\D])|(18[0-9]))\d{8}$/;
        let regs = /0?(13|14|15|18|17|19|16)[0-9]{9}/;
        if(!regs.test(this.formtwo.mobile)){
          this.$message({
            type: 'error',
            message: '手机号格式错误'
          })
          return
        }

        if (this.tempPassword !== this.formtwo.password){
          this.formtwo.password = md5(this.formtwo.password)
        }

				this.$put('/api/pAdmin/modify', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
						this.$message({
							type: 'success',
							message: '修改成功'
						})
						this.dialogTableVisible = false
						this.accountList()
					}
				})
			},
			handleSizeChange(val) {
				this.pageSize = val
				this.accountList()
			},
			handleCurrentChange(val) {
				this.currentPage = val
				this.accountList()
			},
			toggle: function(value) {
         this.isShow = !this.isShow;
      }
			},
	}
</script>
<style type="text/css">
  .el-input--suffix .el-input__inner{
    padding-right: 0;
  }
  .addInput{
    width: 217px;
  }
	.administratormanage-wrap {
		width: 100%;
	}
	.administratormanage-inner {
		margin: auto;
		padding: 0 20px;
	}

	.administratormanage-header {
		margin-bottom: 20px;
	}

	.administratormanage-header hr {
		color: #e6e6e6;
		opacity: 0.5;
	}

	.administratormanage-table {
		border: 1px solid #e6e6e6;
		margin-bottom: 20px;
	}

	.el-table th {
		background-color: #e6e6e6;
	}
</style>
