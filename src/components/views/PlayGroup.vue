<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>游戏竞猜/玩法组</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="彩种:">
            <el-select :style="styleObject" v-model="formInline.lotteryPlayedTplId" placeholder="">
              <el-option v-for="(item,index) in lotteryPlayed" :key="index" :label="item.name" :value="item.lotteryPlayedTplId"></el-option>
            </el-select>
          </el-form-item>
          <el-button @click="search()">查询</el-button>
          <el-button @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>

            <el-table-column  prop="lotteryName" label="彩种玩法模板">
            </el-table-column>

            <el-table-column width="120px" prop="name"  label="名称">
            </el-table-column>

            <el-table-column width="250px" prop="parentName" label="父类名称">
            </el-table-column>

            <el-table-column width="150px" prop="hasChild" label="是否有子类">
            </el-table-column>
            <el-table-column width="150px" prop="isDelete" label="是否删除">
            </el-table-column>
            <el-table-column width="150px" prop="isEnable" label="是否可用">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini" @click="Delete(scope.row.id)" v-if="del && scope.row.isDelete=='未删除'">删除</el-button>
                <el-button @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
                <el-button @click="getOne(scope.row.id)" size="mini">详情</el-button>
              </template>
            </el-table-column>

          </el-table>
        </template>
        <el-dialog title="添加玩法组" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种玩法模版:" prop="lotteryPlayedTplId"  :label-width="formLabelWidth">
                  <el-select @change="GroupTap" :style="styleObject" v-model="form.lotteryPlayedTplId" placeholder="">
                  <el-option  v-for="(item,index) in lotteryPlayed" :key="index" :label="item.name" :value="item.lotteryPlayedTplId"></el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="名称:" :label-width="formLabelWidth" prop="name">
                  <el-input :style="styleObject"  v-model="form.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item v-if="form.lotteryPlayedTplId" label="App父类:"  prop="appParentId" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.appParentId" placeholder="">
                    <el-option  label="顶级" value="0"></el-option>
                    <el-option  v-for="(item,index) in PlayedGroup" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否有子类:" prop="hasChild" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.hasChild" placeholder="">
                    <el-option label="有" value="1"></el-option>
                    <el-option label="没有" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
                  <el-col :span="12">
                    <el-form-item label="等级:" :label-width="formLabelWidth" prop="level">
                      <el-input :style="styleObject" type="number" min="0" v-model="form.level" auto-complete="off"  clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="排序:" :label-width="formLabelWidth" prop="displaysort">
                      <el-input :style="styleObject" type="number" min="0" v-model="form.displaysort" auto-complete="off"  clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
              <el-col :span="12">
                <el-form-item label="单项最高*1000:" :label-width="formLabelWidth"  prop="maxAmount">
                  <el-input :style="styleObject"  v-model="form.maxAmount" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否删除:" prop="isDelete" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.isDelete" placeholder="">
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="不可用" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否可用:" prop="isEnable" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.isEnable" placeholder="">
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="不可用" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改玩法组" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种玩法模版:" prop="lotteryPlayedTplId"  :label-width="formLabelWidth">
                  <el-select @change="GroupTap" :style="styleObject" v-model="formtwo.lotteryPlayedTplId" placeholder="">
                    <el-option  v-for="(item,index) in lotteryPlayed" :key="index" :label="item.name" :value="item.lotteryPlayedTplId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="名称:" :label-width="formLabelWidth" prop="name">
                  <el-input :style="styleObject"  v-model="formtwo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="App父类:"  prop="appParentId" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.appParentId" placeholder="">
                    <el-option  label="顶级" :value="0"></el-option>
                    <el-option  v-for="(item,index) in PlayedGroup" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否有子类:" prop="hasChild" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.hasChild" placeholder="">
                    <el-option label="有" :value="1"></el-option>
                    <el-option label="没有" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="等级:" :label-width="formLabelWidth" prop="level">
                  <el-input :style="styleObject" type="number" min="0" v-model="formtwo.level" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="排序:" :label-width="formLabelWidth" prop="displaysort">
                  <el-input :style="styleObject" type="number" min="0" v-model="formtwo.displaysort" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="单项最高*1000:" :label-width="formLabelWidth"  prop="maxAmount">
                  <el-input :style="styleObject"  v-model="formtwo.maxAmount" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否删除:" prop="isDelete" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isDelete" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否可用:" prop="isEnable" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isEnable" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="玩法组详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种玩法模版:" prop="lotteryPlayedTplId"  :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.lotteryPlayedTplId" placeholder="">
                    <el-option  v-for="(item,index) in lotteryPlayed" :key="index" :label="item.name" :value="item.lotteryPlayedTplId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="名称:" :label-width="formLabelWidth" prop="name">
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="App父类:"  prop="appParentId" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.appParentId" placeholder="">
                    <el-option  label="顶级" :value="0"></el-option>
                    <el-option  v-for="(item,index) in PlayedGroup" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否有子类:" prop="hasChild" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.hasChild" placeholder="">
                    <el-option label="有" :value="1"></el-option>
                    <el-option label="没有" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="等级:" :label-width="formLabelWidth" prop="level">
                  <el-input :disabled="true" :style="styleObject" type="number" min="0" v-model="formtwoInfo.level" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="排序:" :label-width="formLabelWidth" prop="displaysort">
                  <el-input :disabled="true" :style="styleObject" type="number" min="0" v-model="formtwoInfo.displaysort" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="单项最高*1000:" :label-width="formLabelWidth"  prop="maxAmount">
                  <el-input :disabled="true" :style="styleObject"  v-model="formtwoInfo.maxAmount" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="是否删除:" prop="isDelete" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.isDelete" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否可用:" prop="isEnable" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.isEnable" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableDetail = false">取 消</el-button>
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
  import { formatDate } from '../../utils/date.js'

  export default {
    name: 'PlayGroup',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        w_input:'200px',
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {},
        roles: {
          id: '',
          realname: ''
        },
        rules: {
          lotteryPlayedTplId: [{
            required: true,
            message: '请选择彩种玩法模版id',
            trigger: 'change'
          }],
            parentId: [{
            required: true,
            message: '请选择父类id',
            trigger: 'change'
          }],
          appParentId: [{
            required: true,
            message: '请输入App父类id',
            trigger: 'blur'
          }],
          maxAmount: [{
            required: true,
            message: '请输入单项最高*1000',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          hasChild: [{
            required: true,
            message: '请选择是否有子类',
            trigger: 'change'
          }],
          level: [{
            required: true,
            message: '请选择等级',
            trigger: 'change'
          }],
          displaysort: [{
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }],
          isEnable: [{
            required: true,
            message: '请选择是否可用',
            trigger: 'change'
          }],
          isDelete: [{
            required: true,
            message: '请选择是否删除',
            trigger: 'change'
          }],
          parentName: [{
            required: true,
            message: '请输入parentName',
            trigger: 'blur'
          }],
    },
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {
          lotteryPlayedTplId:1
        },
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        lotteryPlayed:[],
        PlayedGroup:[],
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.playedList();
      this.queryBtns();
      this.accountList();
    },
    methods: {
      //选择彩种玩法组id
      GroupTap(){
        //修改前查询基本信息
        let idLottery = ''
        if (this.dialogTableVisible == true){
          idLottery = this.formtwo.lotteryPlayedTplId
        }
        //添加
        if (this.dialogFormVisible == true){
          idLottery = this.form.lotteryPlayedTplId
        }
        this.PlayedGroup=[]
        let parameterData = {
          lotteryPlayedTplId: idLottery
        }
        this.$fetch('/guess/lotteryPlayedGroup/queryParentGroup',parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.PlayedGroup = res.data;
          }
        })
      },
      //获取彩种玩法模版id
      playedList(){
        this.$fetch('/guess/lottery/page').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.lotteryPlayed = res.data;
          }
        })
      },

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
                this.optionW = '150px'
              }
              if(res.data[i].btnCode == 'del') {
                this.del=true;
                this.powerTrue =true;
                this.optionW = '150px'
              }

              if (this.upd && this.del) {
                this.powerTrue =true;
                this.optionW = '225px'
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
          lotteryPlayedTplId: this.formInline.lotteryPlayedTplId
        }
        this.$fetch('/guess/lotteryPlayedGroup/queryList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].hasChild == '1') {
                res.data.list[i].hasChild = '有'
              } else {
                res.data.list[i].hasChild = '没有'
              }
              if(res.data.list[i].isEnable == '1') {
                res.data.list[i].isEnable = '可用'
              } else {
                res.data.list[i].isEnable = '不可用'
              }

              if(res.data.list[i].isDelete == '1') {
                res.data.list[i].isDelete = '删除'
              } else {
                res.data.list[i].isDelete = '未删除'
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
        this.formInline ={};
        this.dialogFormVisible = true;
      },
      addBtn(form) {
        this.form.parentId = 0;
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/guess/lotteryPlayedGroup/save', this.form).then(res => {
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
          id: id
        }
        this.$fetch('/guess/lotteryPlayedGroup/delete', parameterData).then(res => {
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
        //修改前查询基本信息
        this.dialogTableVisible = true
        this.$fetch('/guess/lotteryPlayedGroup/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
            this.GroupTap();
          }
        })
      },
      update(formtwo) {
        this.$put('/guess/lotteryPlayedGroup/update', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.dialogTableVisible = false
            this.accountList()
          }
        })
      },
      getOne(id){
        this.dialogTableDetail = true
        this.$fetch('/guess/lotteryPlayedGroup/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            // res.data.createrTime =  formatDate(new Date(res.data.createrTime), 'yyyy-MM-dd hh:mm:sss')
            this.formtwoInfo = res.data
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
