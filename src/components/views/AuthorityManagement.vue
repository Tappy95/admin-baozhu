<template>
	<div class="authoritymanagement-wrap">
		<div class="authoritymanagement-inner">
			<div class="authoritymanagement-header">
				<h3>系统管理/权限管理</h3>
				<hr />
			</div>
			<div>
				<el-form :inline="true"
				  :model="formInline"
				  class="demo-form-inline">
					<el-form-item label="权限名称">
						<el-input v-model="formInline.name"
						  placeholder=""
						  clearable></el-input>
					</el-form-item>
					<el-button @click="search()">查询</el-button>
					<el-button @click="load()">添加</el-button>
					<el-dialog title="添加权限管理"
					  :visible.sync="dialogFormVisible">
						<el-form :model="form"
						  :rules="rules"
						  ref="form">
							<el-form-item label="权限名称"
							  prop="rightName">
								<el-input v-model="form.rightName"
								  auto-complete="off"
								  clearable></el-input>
							</el-form-item>
							<el-form-item label="权限url"
							  prop="rightUrl">
								<el-input v-model="form.rightUrl"
								  auto-complete="off"
								  clearable></el-input>
							</el-form-item>
							<el-form-item label="权限代码"
							  prop="rightCode">
								<el-input v-model="form.rightCode"
								  auto-complete="off"
								  clearable></el-input>
							</el-form-item><br />
							<el-form-item label="请求方式"
							  prop="methodType">
								<el-select v-model="form.methodType"
								  placeholder="">
									<el-option label="get"
									  value="get"></el-option>
									<el-option label="post"
									  value="post"></el-option>
									<el-option label="put"
									  value="put"></el-option>
									<el-option label="delete"
									  value="delete"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="描述"
							  style="margin-left: 18px;"
							  prop="remark">
								<el-input v-model="form.remark"
								  auto-complete="off"
								  clearable></el-input>
							</el-form-item>
							<el-form-item label="状态"
							  style="margin-left: 28px;"
							  prop="status">
								<el-select v-model="form.status"
								  placeholder="">
									<el-option label="删除"
									  value="0"></el-option>
									<el-option label="正常"
									  value="1"></el-option>
									<el-option label="冻结"
									  value="2"></el-option>
								</el-select>
							</el-form-item>
						</el-form>
						<div slot="footer"
						  class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary"
							  @click="addBtn(form)">确 定</el-button>
						</div>
					</el-dialog>
				</el-form>
			</div>
			<div class="authoritymanagement-table">
				<template>
					<el-table :data="tableData"
					  height="580">
						<el-table-column label="序号"
						  type="index"
						  :index="indexMethod"
						  width='80'>
						</el-table-column>
						<el-table-column prop="rightName"
						  label="权限名称">
						</el-table-column>
						<el-table-column prop="rightUrl"
						  label="权限url">
						</el-table-column>
						<el-table-column prop="rightCode"
						  label="权限代码">
						</el-table-column>
						<el-table-column prop="methodType"
						  label="请求方式">
						</el-table-column>
						<el-table-column prop="remark"
						  label="描述">
						</el-table-column>
						<el-table-column prop="createUser"
						  label="创建人">
						</el-table-column>
						<el-table-column prop="lastModifyUser"
						  label="创建时间">
						</el-table-column>
						<el-table-column fixed="right"
						  label="操作"
						  width="200">
							<template slot-scope="scope">
								<el-button size="mini"
								  @click="Delete(scope.row.id)">删除</el-button>
								<el-button @click="getInfo(scope.row.id)"
								  size="mini">修改</el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
				<el-dialog title="修改权限管理"
				  :visible.sync="dialogTableVisible">
					<el-form :model="formtwo">
						<el-form-item label="权限名称"
						  :label-width="formLabelWidth">
							<el-input v-model="formtwo.rightName"
							  auto-complete="off"
							  style=""
							  clearable></el-input>
						</el-form-item>
						<el-form-item label="权限url"
						  :label-width="formLabelWidth">
							<el-input v-model="formtwo.rightUrl"
							  auto-complete="off"
							  style=""
							  clearable></el-input>
						</el-form-item>
						<el-form-item label="权限代码"
						  :label-width="formLabelWidth">
							<el-input v-model="formtwo.rightCode"
							  auto-complete="off"
							  style=""
							  clearable></el-input>
						</el-form-item>
						<el-form-item label="请求方式"
						  prop="methodType"
						  :label-width="formLabelWidth">
							<el-select v-model="formtwo.methodType"
							  placeholder="">
								<el-option label="get"
								  value="get"></el-option>
								<el-option label="post"
								  value="post"></el-option>
								<el-option label="put"
								  value="put"></el-option>
								<el-option label="delete"
								  value="delete"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="描述"
						  :label-width="formLabelWidth">
							<el-input v-model="formtwo.remark"
							  auto-complete="off"
							  style=""
							  clearable></el-input>
						</el-form-item>
						<el-form-item label="状态"
						  :label-width="formLabelWidth">
							<el-select v-model="formtwo.status"
							  placeholder="">
								<el-option label="删除"
								  value="0"></el-option>
								<el-option label="正常"
								  value="1"></el-option>
								<el-option label="冻结"
								  value="2"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div slot="footer"
					  class="dialog-footer">
						<el-button @click="dialogTableVisible = false">取 消</el-button>
						<el-button type="primary"
						  @click="update(formtwo)">确 定</el-button>
					</div>
				</el-dialog>
			</div>
			<div class="block">
				<el-pagination @size-change="handleSizeChange"
				  @current-change="handleCurrentChange"
				  :current-page="currentPage"
				  :page-sizes="[10, 20, 50, 70]"
				  :page-size="pageSize"
				  layout="total, sizes, prev, pager, next, jumper"
				  :total="totalCount">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
export default {
  name: 'AuthorityManagement',
  data() {
    return {
      dialogTableVisible: false,
      formtwo: {},
      dialogFormVisible: false,
      form: {
        rightName: '',
        rightUrl: '',
        rightCode: '',
        remark: '',
        status: '1'
      },
      rules: {
        rightName: [
          { required: true, message: '请输入权限名称', trigger: 'blur' }
        ],
        rightUrl: [
          { required: true, message: '请输入权限url', trigger: 'blur' }
        ],
        rightCode: [
          { required: true, message: '请输入权限代码', trigger: 'blur' }
        ],
        remark: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
        methodType: [
          { required: true, message: '请选择请求方式', trigger: 'change' }
        ]
      },
      formLabelWidth: '120px',
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      formInline: {},
      tableData: []
    }
  },
  created() {
    this.accountList()
  },
  methods: {
    indexMethod(index) {
      return index * 1 + 1
    },
    accountList() {
      let parameterData = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        rightName: this.formInline.name
      }
      this.$fetch('/api/sysright/list', parameterData).then(res => {
        if (res.statusCode == 2000) {
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
      this.dialogFormVisible = true;
      this.form.rightName = '';
      this.form.rightUrl = '';
      this.form.rightCode = '';
      this.form.remark = '';
      this.form.id = null;
      this.formInline = {};
    },
    addBtn(form) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$post('/api/sysright/add', this.form).then(res => {
            if (res.statusCode == 2000) {
              this.dialogFormVisible = false
              this.$message({ type: 'success', message: '添加成功！' })
              this.accountList()
            }
          })
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
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    delData(id) {
      let parameterData = {
        id: id
      }
      this.$post('/api/sysright/remove', parameterData).then(res => {
        if (res.statusCode == 2000) {
          this.$message({ type: 'success', message: '删除成功！' })
          this.accountList()
        } else {
        }
      })
    },
    getInfo(id) {
      this.dialogTableVisible = true
      this.$fetch('/api/sysright/queryRightOne', {
        id: id
      }).then(res => {
        this.formtwo = res.data
      })
    },
    update(formtwo) {
      this.$put('/api/sysright/modify', this.formtwo).then(res => {
        if (res.statusCode == 2000) {
          this.$message({ type: 'success', message: '修改成功！' })
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
    }
  }
}
</script>
<style type="text/css">
.authoritymanagement-wrap {
  width: 100%;
}
.authoritymanagement-inner {
  margin: auto;
  padding: 0 20px;
}
.authoritymanagement-header {
  margin-bottom: 20px;
}
.authoritymanagement-header h3 {
  text-align: left;
}
.authoritymanagement-header hr {
  color: #e6e6e6;
  opacity: 0.5;
}
.authoritymanagement-table {
  border: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.el-table th {
  background-color: #e6e6e6;
}
</style>
