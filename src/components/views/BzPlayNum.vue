<template>
  <div class="bz-play-num-wrap">
    <div class="bz-play-num-inner">
      <div class="bz-play-num-header">
        <h3>宝猪28/玩法个数</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="">
            <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="bz-play-num-table">
        <template>
          <el-table :data="tableData" max-height="556">
            <el-table-column label="序号" type="index" fixed="left" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column prop="playTypeStart"  label="玩法最少个数">
            </el-table-column>
            <el-table-column prop="playTypeEnd"  label="玩法最多个数">
            </el-table-column>
            <el-table-column  prop="probability"  label="概率(%)">
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="powerTrue"  :width="optionW">
              <template slot-scope="scope">
                <el-button type="success" plain size="mini" v-if="del" @click="getInfo(scope.row.id)" >修改</el-button>
                <el-button type="warning" plain size="mini" v-if="upd" @click="Delete(scope.row.id)" >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加" :visible.sync="dialogFormVisible" width="700px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="18">
                <el-form-item label="玩法最少个数" :label-width="formLabelWidth" prop="playTypeStart">
                  <el-input v-model="form.playTypeStart" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="玩法最多个数" :label-width="formLabelWidth" prop="playTypeEnd">
                  <el-input v-model="form.playTypeEnd" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="概率" :label-width="formLabelWidth" prop="probability">
                  <el-input  v-model="form.probability" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo">
            <el-row>
              <el-col :span="18">
                <el-form-item label="玩法最少个数" :label-width="formLabelWidth" prop="playTypeStart">
                  <el-input v-model="formtwo.playTypeStart" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="玩法最多个数" :label-width="formLabelWidth" prop="playTypeEnd">
                  <el-input v-model="formtwo.playTypeEnd" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="概率" :label-width="formLabelWidth" prop="probability">
                  <el-input  v-model="formtwo.probability" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update('formtwo')">确 定</el-button>
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
    name: 'BzPlayNum',
    data() {
      return {
        powerTrue:false,
        optionW:'0',
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
        imageUrl:'',
        rules: {
          probability: [
            {required: true, message: '请输入概率', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;
                if (!pattern.test(value)) {
                  callback(new Error("请输入正整数"));
                }else{
                  callback();
                }
              }, trigger:'blur'}],
            playTypeStart: [
              {required: true, message: '请输入玩法最少个数', trigger: 'blur'},
              {validator:(rule,value,callback)=>{
                  var pattern = /^[0-9]*$/;
                  if (!pattern.test(value)) {
                    callback(new Error("请输入正整数"));
                  }else{
                    callback();
                  }
                }, trigger:'blur'}],
            playTypeEnd: [
              {required: true, message: '请输入玩法最多个数', trigger: 'blur'},
              {validator:(rule,value,callback)=>{
                  var pattern = /^[0-9]*$/;
                  if (!pattern.test(value)) {
                    callback(new Error("请输入正整数"));
                  }else{
                    callback();
                  }
                }, trigger:'blur'}],
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        uploadData:{},
        isSubmit:false,
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();

    },
    filters: {
      dateFont: function (date){
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss');
      },
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
              if(res.data[i].btnCode == 'del') {
                this.powerTrue = true;
                this.del=true;
                this.optionW = '75'
              }
              if(res.data[i].btnCode == 'upd') {
                this.powerTrue = true;
                this.upd=true;
                this.optionW = '75'
              }

              if (this.upd && this.del) {
                this.optionW = '150'
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
          pageSize: this.pageSize
        }
        this.$fetch('/bz28/lotteryRobotPlayed/queryList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
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
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      load() {
        this.form={};
        this.dialogFormVisible = true;
        this.isSubmit=false;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            if (parseInt(this.form.playTypeEnd) <= parseInt(this.form.playTypeStart)){
              this.$message({type: 'warning', message: '玩法最少个数不得大于等于玩法最多个数！'})
              return false
            }
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/bz28/lotteryRobotPlayed/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false;
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                })
                this.accountList();
              } else {
                this.$message({
                  type: 'error',
                  message: res.message
                })
                this.isSubmit=false;
              }
            })
          } else {}
        })
      },
      update(formtwo){
        this.$refs[formtwo].validate(valid => {
          if(valid) {
            if (parseInt(this.formtwo.playTypeEnd) <= parseInt(this.formtwo.playTypeStart)){
              this.$message({type: 'warning', message: '玩法最少个数不得大于等于玩法最多个数！'})
              return false
            }
            this.$post('/bz28/lotteryRobotPlayed/modify', this.formtwo).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogTableVisible = false;
                this.$message({
                  type: 'success',
                  message: '修改成功！'
                })
                this.accountList();
              } else {
                this.$message({type: 'error', message: res.message})
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
        this.$post('/bz28/lotteryRobotPlayed/remove', parameterData).then(res => {
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
        this.dialogTableVisible = true;
        this.$fetch('/bz28/lotteryRobotPlayed/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
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
    },
  }
</script>
<style type="text/css">
  .yichu{
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .red{
    color: #ff4d51;
  }
  .green{
    color: #13ce66;
  }
  .blue{
    color: #409EFF;
  }
  .bz-play-num-wrap {
    width: 100%;
  }

  .bz-play-num-inner {
    margin: auto;
    padding: 0 20px;
  }

  .bz-play-num-header {
    margin-bottom: 20px;
  }

  .bz-play-num-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .bz-play-num-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
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

  .img_loadBox{
    width: 148px;
    height: 148px;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;

  }

  .avatar {
    max-width: 148px;
    max-height: 148px;
    display: block;
  }
  .form {
    /*overflow-y: scroll;*/
    /*height: auto;*/
  }
  .el-icon-plus{
    line-height:0;
  }
  .bannerAvatar-uploader-icon{
    line-height: 148px !important;
  }

  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 33%;
  }
</style>
