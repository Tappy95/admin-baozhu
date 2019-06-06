<template>
  <div class="rolemanagement-wrap">
    <div class="rolemanagement-inner">
      <div class="rolemanagement-header">
        <h3>系统管理/角色管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
          :model="formInline"
          class="demo-form-inline">
          <el-form-item label="角色名称">
            <el-input v-model="formInline.name"
              placeholder="请输入角色名称"
              clearable=""></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="search()">查询</el-button>
            <el-button type="success" plain @click="loadAdd()" v-if="add">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="rolemanagement-table">
        <template>
          <el-table :data="tableData"
            style="width: 100%"
            height="528">
            <el-table-column prop="id"
              label="序号"
              type="index"
              :index="indexMethod"
              width='100'>
            </el-table-column>
            <el-table-column prop="roleName"
              label="角色名称">
            </el-table-column>
            <el-table-column prop="remark"
              label="角色说明">
            </el-table-column>
            <el-table-column prop="createTime"
              label="创建时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column prop="status"
              label="状态">
            </el-table-column>
            <el-table-column fixed="right"
              label="操作" v-if="powerTrue" :width="optionW">
              <template slot-scope="scope" >
                <el-button size="mini"
                  @click="Delete(scope.row.id)" type="warning" plain v-if="del">删除</el-button>
                <el-button type="success" plain @click="getInfo(scope.row.id)" v-if="upd"
                  size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog width="700px" title="修改权限管理"
          :visible.sync="dialogTableVisible">
          <el-form :inline="true"
            :model="updateForm"
            :rules="rules"
            ref="formtwo"
            class="demo-form-inline">
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="角色名称"
                              prop="roleName">
                  <el-input v-model="updateForm.roleName"
                            auto-complete="off"
                            clearable
                            style="width: 180px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="角色说明"
                              prop="remark">
                  <el-input v-model="updateForm.remark"
                            auto-complete="off"
                            clearable
                            style="width: 180px">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="状态"
                              style=""
                              prop="status">
                  <el-select v-model="updateForm.status"
                             placeholder=""
                             style="width: 180px;margin-left: 30px"">
                    <el-option label="删除"
                               :value="0">
                    </el-option>
                    <el-option label="正常"
                               :value="1">
                    </el-option>
                    <el-option label="冻结"
                               :value="2">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="权限"
              style=""
              prop="status">
              <el-input v-model="updateForm.rights"
                auto-complete="off"
                style="display: none;	">
              </el-input>
              <div class="tree">
                <el-tree :data="treeData"
                  show-checkbox
                  default-expand-all
                  node-key="id"
                  ref="updateTree"
                  highlight-current
                  :check-strictly="true"
                  :props="defaultProps" style="width: 300px;margin-top: 50px" >
                </el-tree>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer"
            class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary"
              @click="update('formtwo')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加角色管理"
                   :visible.sync="dialogFormVisible" width="700px">
          <el-form :model="form"
                   :rules="rules"
                   ref="form" label-position="left">
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="角色名称"
                              prop="roleName">
                  <el-input v-model="form.roleName"
                            auto-complete="off"
                            clearable
                            style="width: 180px"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" style="margin-bottom: 10px">
                <el-form-item label="角色说明"
                              prop="remark">
                  <el-input v-model="form.remark"
                            auto-complete="off"
                            clearable
                            style="width: 180px"></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="状态"
                              style=""
                              prop="status">
                  <el-select  v-model="form.status"
                             placeholder=""
                             style="width: 180px;margin-left: 30px">
                    <el-option label="正常"
                               value="1"></el-option>
                    <el-option label="禁用"
                               value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="权限"
                          style="margin-top:20px"
                          prop="status">
              <el-input v-model="form.rights"
                        auto-complete="off"
                        style="display: none;	">
              </el-input>
              <div class="tree">
                <el-tree :data="treeData"
                         show-checkbox
                         default-expand-all
                         node-key="id"
                         ref="tree"
                         highlight-current
                         :check-strictly="true"
                         :props="defaultProps" style="width: 300px;margin-top: 50px">
                </el-tree>
              </div>
            </el-form-item>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="addBtn('form')">确 定</el-button>
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
  import { formatDate } from '../../utils/date.js'
export default {
  name: 'RoleManagement',
  data() {
    return {
      powerTrue:false,
      optionW:'0px',
      menuId:'',
      add:false,
      del:false,
      upd:false,
      dialogFormVisible: false,
      dialogTableVisible: false,
      form: {
        roleName: '',
        remark: '',
        status: '1',
        rights: ''
      },
      updateForm: {
        roleName: '',
        remark: '',
        status: '1',
        rights: ''
      },
      treeData: [
        {
          rightName: '',
          rightUrl: '',
          rightCode: '',
          id: '',
          type:'',
          rightCollections: [
            {
              name: '',
              sonCount: '',
              id: '',
              type:'',
              rightCollections: [
                {
                  name: '',
                  sonCount: '',
                  id: '',
                  type:'',
                  rightCollections: []
                }
              ]
            }
          ]
        }
      ],
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入角色说明', trigger: 'blur' }
        ],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      formLabelWidth: '120px',
      currentPage: 1,
      pageSize: 10,
      totalCount: 0,
      formInline: {},
      tableData:[],
      props: {
        label: 'name',
        children: 'rightCollections'
      },
      defaultProps: {
        children: 'rightCollections',
        label: 'name'
      },
      count: 1
    }
  },
  created() {
    this.menuId=this.$route.query.id
    this.queryBtns()
    this.accountList()
    this.queryRightCollection()
  },
  methods: {
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
            this.optionW = '160px'
          }
        }
      } else {
      }
    })
    },
    dateFormat(row, column) {
      var date = row[column.property]
      if (date == undefined) {
        return ''
      }
      return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
    },
    loadAdd() {
      this.dialogFormVisible = true;
      this.form.roleName = '';
      this.form.remark = '';
      this.form.id = null;
      this.formInline = {};
    },
    indexMethod(index) {
      return index * 1 + 1
    },
    accountList() {
      let parameterData = {
        pageNum: this.currentPage,
        pageSize:this.pageSize,
        roleName: this.formInline.name
      }
      this.$fetch('/api/pRole/list', parameterData).then(res => {
        if ((res.statusCode+"").startsWith("2")) {
        for(let i = res.data.list.length - 1; i >= 0; i--) {
          if(res.data.list[i].status == '1') {
            res.data.list[i].status = '启用'
          } else {
            res.data.list[i].status = '禁用'
          }
        }
          this.tableData = res.data.list
          this.totalCount = res.data.total
        } else {
          this.message({
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
    queryRightCollection() {
      this.$fetch('/api/pMenu/queryRightCollection', this.form).then(res => {
        if (res.statusCode == 2000) {
          this.treeData = res.data
        }
      })
    },
    addBtn(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          let menuIds=''
          let btnIds=''
          this.$refs.tree.getCheckedNodes().forEach(element => {
            if(element.type==1){
              if(menuIds!=''){
                menuIds+= ','
              }
              menuIds+= element.id
            }else{
              if(btnIds!=''){
                btnIds+= ','
              }
              btnIds+= element.id
            }
          })
          this.form.menuIds = menuIds
          this.form.btnIds = btnIds
          this.$post('/api/pRole/add', this.form).then(res => {
            if (res.statusCode == 2000) {
              this.$message({ type: 'success', message: res.message })
              this.dialogFormVisible = false
              this.accountList()
            } else {
              this.$message({ type: 'success', message: res.message })
            }
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
          this.$message({ type: 'info', message: '已取消删除' })
        })
    },
    delData(id) {
      let parameterData = {
        id: id
      }
      this.$fetch('/api/pRole/remove', parameterData, {}).then(res => {
        if (res.statusCode == '2000') {
          this.$message({ type: 'success', message: '删除成功！' })
          this.accountList()
        } else {
          this.$message({ type: 'error', message: '删除失败！' })
        }
      })
    },
    getInfo(id) {
      this.dialogTableVisible = true
      this.$fetch('/api/pRole/queryOne', {
        id: id
      }).then(res => {
        if (res.data != null) {
          this.updateForm = res.data.role
        this.$refs.updateTree.setCheckedNodes(res.data.menus)
        }
      })
    },
    update(formtwo) {
      this.$refs[formtwo].validate(valid => {
        if (valid) {
          let menuIds=''
          let btnIds=''
          this.$refs.updateTree.getCheckedNodes().forEach(element => {
            if(element.type==1){
              if(menuIds!=''){
                menuIds+= ','
              }
              menuIds+= element.id
            }else{
              if(btnIds!=''){
                btnIds+= ','
              }
              btnIds+= element.id
            }
          })
          this.updateForm.menuIds = menuIds
          this.updateForm.btnIds = btnIds
          this.$post('/api/pRole/modify', this.updateForm).then(res => {
            if (res.statusCode == 2000) {
              this.$message({ type: 'success', message: res.message })
              this.dialogTableVisible = false
              this.accountList()
            } else {
              this.$message({ type: 'error', message: res.message })
            }
          })
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
.rolemanagement-wrap {
  width: 100%;
}
.rolemanagement-inner {
  margin: auto;
  padding: 0 20px;
}
.rolemanagement-header {
  margin-bottom: 20px;
}
.rolemanagement-header h3 {
  text-align: left;
}
.rolemanagement-header hr {
  color: #e6e6e6;
  opacity: 0.5;
}
.rolemanagement-table {
  border: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.el-table th {
  background-color: #e6e6e6;
}
.tree {
  height: 25rem;
  overflow-y: scroll;
}
</style>
