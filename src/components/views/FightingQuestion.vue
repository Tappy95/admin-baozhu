<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>答题对战/题目管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="题目名称">
            <el-input v-model="formInline.question" placeholder="" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.questionState" placeholder="">
              <el-option label="全部" value=""></el-option>
              <el-option label="正常" value="-1"></el-option>
              <el-option label="提交" value="1"></el-option>
              <el-option label="通过" value="2"></el-option>
              <el-option label="拒绝" value="3"></el-option>
            </el-select>
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

            <el-table-column fixed="left" prop="questionTypeName" width="200px" label="问题类型">
            </el-table-column>

            <el-table-column prop="question" width="300px" label="题目">
            </el-table-column>

            <el-table-column prop="createTime" width="170px" :formatter="dateFormat" label="创建时间">
            </el-table-column>

            <el-table-column prop="score" width="150px" label="题目总分">
            </el-table-column>

            <el-table-column prop="questionState" width="100px" label="问题状态">
            </el-table-column>

            <el-table-column prop="countTime" width="180px" label="答题时间(秒)">
            </el-table-column>

            <el-table-column prop="coin" width="150px" label="出题者的金币数">
            </el-table-column>
            <el-table-column fixed="right" label="操作"  :width="optionW">
              <template slot-scope="scope">
                <el-button v-if="scope.row.questionState=='提交' && exa" @click="getInfo(scope.row.qId)" size="mini"><span v-if="optionW='300px'"></span>审核</el-button>
                <el-button @click="getOne(scope.row.qId)" size="mini">详情</el-button>
                <el-button size="mini" @click="updateInfo(scope.row.qId)" v-if="upd">修改</el-button>
                <el-button size="mini" @click="Delete(scope.row.qId)" v-if="del">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加题目" :visible.sync="dialogFormVisible" width="600px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-form-item label="问题类型" :label-width="formLabelWidth" prop="questionType">
              <el-select v-model="form.questionType" placeholder="">
                <el-option v-for="(item,index) in answerType" :key="index" :label="item.dicValue" :value="item.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="题目" :label-width="formLabelWidth" prop="question">
              <el-input  v-model="form.question" auto-complete="off" style="" clearable>
              </el-input>
            </el-form-item>

            <el-form-item label="题目总分" prop="score" :label-width="formLabelWidth">
              <el-input style="width: 217px;" min="0" type="number"   v-model="form.score" auto-complete="off" clearable></el-input>
            </el-form-item>

            <el-form-item label="答题时间(秒)" prop="countTime" :label-width="formLabelWidth">
              <el-input style="width: 217px;" min="0" type="number"   v-model="form.countTime" auto-complete="off" clearable></el-input>
            </el-form-item>


            <el-form-item label="正确答案" prop="answer1" :label-width="formLabelWidth">
            <el-input  type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.answer1" auto-complete="off" clearable></el-input>
          </el-form-item>

            <el-form-item label="错误答案" prop="answer2" :label-width="formLabelWidth">
              <el-input  type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.answer2" auto-complete="off" clearable></el-input>
            </el-form-item>

            <el-form-item label="错误答案" prop="answer3" :label-width="formLabelWidth">
              <el-input  type="textarea" :autosize="{ minRows: 2, maxRows: 6}" v-model="form.answer3" auto-complete="off" clearable></el-input>
            </el-form-item>

            <el-form-item label="错误答案" prop="answer4" :label-width="formLabelWidth">
              <el-input  type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="form.answer4" auto-complete="off" clearable></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="题目审核" :visible.sync="dialogTableVisible" width="600px">
          <el-form :model="formtwo">
            <el-form-item label="出题人:" :label-width="formLabelWidth" prop="question">
              <el-input :disabled="true" v-model="formtwo.question.creatorName"  auto-complete="off" style="" clearable></el-input>
            </el-form-item>

            <el-form-item label="题目:" :label-width="formLabelWidth" prop="question">
              <el-input :disabled="true" v-model="formtwo.question.question"  auto-complete="off" style="" clearable></el-input>
            </el-form-item>

            <div v-for="(item,index) in formtwo.answer" :key="index">
              <el-form-item v-if="item.isCorrect==1" label="正确答案:" prop="answers" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="item.answer" :disabled="true" :autosize="{ minRows: 4, maxRows: 6}"  auto-complete="off" clearable></el-input>
              </el-form-item>

              <el-form-item v-if="item.isCorrect!=1" label="错误答案:" prop="answer" :label-width="formLabelWidth">
                <el-input type="textarea" v-model="item.answer" :disabled="true" :autosize="{ minRows: 4, maxRows: 6}"  auto-complete="off" clearable></el-input>
              </el-form-item>
            </div>
              <el-form-item label="审核:" :label-width="formLabelWidth" prop="questionState">
                <el-select v-model="formtwo.question.questionState" @change="isAuditingChange(formtwo.question.questionState)"  placeholder="">
                  <el-option label="提交" :value="1"></el-option>
                  <el-option label="拒绝" :value="3"></el-option>
                  <el-option label="通过" :value="2"></el-option>
                </el-select>
              </el-form-item>

            <el-form-item v-if="getCoin"  label="获得金币数" :label-width="formLabelWidth" prop="coin">
              <el-input v-model="formtwo.coin" min="0" type="number"  auto-complete="off" style="width: 187px" clearable></el-input>
            </el-form-item>

              <el-form-item v-if="reasonMess" label="拒绝原因:" prop="rejectReason" :label-width="formLabelWidth">
                <el-input :rows="4"  type="textarea" v-model="formtwo.rejectReason"  auto-complete="off" style="" clearable></el-input>
              </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="题目详情" :visible.sync="dialogTableVisibleInfo" width="800px">
          <el-form>
            <el-row>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="问题类型:" :label-width="formLabelWidth">
                  <el-input :value="formtwoInfo.questionTypeName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9" style="margin-bottom: 10px">
                <el-form-item label="创建时间:" :label-width="formLabelWidth">
                  <el-input :value="formtwoInfo.createTime" :disabled="true" auto-complete="off" style="width: 170px" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="10" style="margin-bottom: 10px;">
                <el-form-item label="题目总分:" :label-width="formLabelWidth">
                  <el-input :value="formtwoInfo.score" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="出题者获得金币数:" :label-width="formLabelWidth">
                  <el-input :value="formtwoInfo.coin" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="状态:" :label-width="formLabelWidth">
                  <el-select :disabled="true" v-model="formtwoInfo.questionState" placeholder="">
                    <el-option label="正常" :value="0"></el-option>
                    <el-option label="提交" :value="1"></el-option>
                    <el-option label="通过" :value="2"></el-option>
                    <el-option label="拒绝" :value="3"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>


              <el-col :span="18" style="margin-bottom: 10px">
                <el-form-item v-if="isRejectReason" label="拒绝原因:" :label-width="formLabelWidth">
                  <el-input :autosize="{ minRows: 2, maxRows: 4}" :value="formtwoInfo.rejectReason" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="margin-bottom: 10px">
                <el-form-item label="出题者:"  :label-width="formLabelWidth">
                  <el-input :value="formtwoInfo.creatorName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="18" style="margin-bottom: 10px">
                <el-form-item label="题目:" :label-width="formLabelWidth">
                  <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" :value="formtwoInfo.question" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <div v-for="(item,index) in formtwoanswer" :key="index">
                  <el-col :span="18"  style="margin-bottom: 10px">
                    <el-form-item v-if="item.isCorrect==1"  label="正确答案:" :label-width="formLabelWidth">
                      <el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" :value="item.answer" :disabled="true" auto-complete="off" clearable></el-input>
                    </el-form-item>

                    <el-form-item v-if="item.isCorrect!=1" label="错误答案:"  :label-width="formLabelWidth">
                      <el-input type="textarea"  :value="item.answer" :disabled="true" :autosize="{ minRows: 2, maxRows: 4}"  auto-complete="off" clearable></el-input>
                    </el-form-item>
                  </el-col>
              </div>
              </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisibleInfo = false">取 消</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改题目" :visible.sync="dialogTableVisibleUpdate" width="600px">
          <el-form :model="formtwoUpdateInfo" :rules="rules" ref="form">
            <el-row>
                <el-form-item label="问题类型:" :label-width="formLabelWidth" prop="questionType">
                  <el-select v-model="formtwoUpdateInfo.questionType" placeholder="">
                    <el-option v-for="(item,index) in answerType" :key="index" :label="item.dicValue" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="题目总分:" :label-width="formLabelWidth" prop="score">
                  <el-input v-model="formtwoUpdateInfo.score" auto-complete="off" style="width: 187px" clearable></el-input>
                </el-form-item>
                <el-form-item label="答题时间(秒):" prop="countTime" :label-width="formLabelWidth">
                  <el-input v-model="formtwoUpdateInfo.countTime" auto-complete="off" style="width: 187px" clearable></el-input>
                </el-form-item>


              <el-form-item label="题目:" :label-width="formLabelWidth" prop="question">
                <el-input v-model="formtwoUpdateInfo.question" auto-complete="off" style="" clearable></el-input>
              </el-form-item>

              <div v-for="(item,index) in formtwoUpdateanswer" :key="index">
                  <el-form-item v-if="item.isCorrect==1"  label="正确答案:" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="item.answer"  :autosize="{ minRows: 2, maxRows: 4}" auto-complete="off" clearable></el-input>
                  </el-form-item>
                  <el-form-item v-if="item.isCorrect!=1" label="错误答案:"  :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="item.answer" :autosize="{ minRows: 2, maxRows: 4}"  auto-complete="off" clearable></el-input>
                  </el-form-item>
              </div>

              <el-form-item v-if="isUpdateRejectReason" label="拒绝原因:" :label-width="formLabelWidth" prop="rejectReason">
                <el-input :autosize="{ minRows: 2, maxRows: 4}" :value="formtwoUpdateInfo.rejectReason" auto-complete="off" style="" clearable></el-input>
              </el-form-item>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisibleUpdate = false">取 消</el-button>
            <el-button type="primary" @click="updateCilc(formtwoUpdateInfo)">确 定</el-button>
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
    name: 'FightingQuestion',
    data() {
      return {
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        exa:false,
        dialogTableVisibleUpdate:false,
        dialogTableVisibleInfo:false,
        formtwoanswer:[],
        formtwoInfo: {},
        formtwoUpdateInfo:{},
        formtwoUpdateanswer:[],
        isRejectReason:false,
        isUpdateRejectReason:false,
        dialogTableVisible: false,
        formtwo: {
          question:{},
          rejectReason:''
        },
        answerType:[],
        dialogFormVisible: false,
        reasonMess:false,
        getCoin:false,
        form: {
        },
        rules: {
          questionType: [{
            required: true,
            message: '请输入问题类型',
            trigger: 'blur'
          }],
          question: [{
            required: true,
            message: '请输入题目',
            trigger: 'blur'
          }],
          creator: [{
            required: true,
            message: '请输入出题者',
            trigger: 'blur'
          }],
          score: [{
            required: true, message: '请输入题目总分', trigger: 'blur'},
            {
            type: 'number',
            message: '请输入仅数字格式',
            trigger: 'blur',
            transform(value) {
              return Number(value)
            }
          }],
          questionState: [{
            required: true,
            message: '请输入问题状态',
            trigger: 'change'
          }],
          rejectReason: [{
            required: true,
            message: '请输入拒绝原因',
            trigger: 'blur'
          }],
          countTime: [{
            required: true,
            message: '请输入答题时间',
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
          coin: [{
            required: true,
            message: '请输入出题者的金币数',
            trigger: 'blur'
          }],
          answers: [{
            required: true,
            message: '请输入答案',
            trigger: 'blur'
          }],
          answer1: [{
            required: true,
            message: '请输入答案',
            trigger: 'blur'
          }],
          answer2: [{
            required: true,
            message: '请输入答案',
            trigger: 'blur'
          }],
          answer3: [{
            required: true,
            message: '请输入答案',
            trigger: 'blur'
          }],
          answer4: [{
            required: true,
            message: '请输入答案',
            trigger: 'blur'
          }],
          questionTypeName: [{
            required: true,
            message: '请输入题目类型名称',
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
            }
          ],
        },
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {

        },
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        audit:''

      }
    },
    created() {
      this.menuId=this.$route.query.id
      this.queryBtns()
      this.accountList()
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
            if(res.data[i].btnCode == 'exa') {
              this.exa=true;
              this.powerTrue =true;
              this.optionW = '150px';
            }

            if(res.data[i].btnCode == 'upd') {
              this.upd=true;
              this.powerTrue =true;
              this.optionW = '150px';
            }
            if(res.data[i].btnCode == 'del') {
              this.del=true;
              this.powerTrue =true;
              this.optionW = '150px';
            }

            if (this.upd && this.del || this.upd && this.exa || this.upd && this.exa) {
              this.powerTrue =true;
              this.optionW = '230px';
            }

            if (this.upd && this.del && this.exa) {
              this.powerTrue =true;
            }

          }
        } else {
        }
      })
      },
      indexMethod(index) {
        return index * 1 + 1
      },
      questionType(){
        this.$fetch('/api/mFightingQuestion/typeList').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.answerType = res.data
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
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
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          question:this.formInline.question,
          questionState: this.formInline.questionState
        }
        this.$fetch('/api/mFightingQuestion/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].questionState == 0) {
              res.data.list[i].questionState = '正常'
            } else if (res.data.list[i].questionState == 1) {
              res.data.list[i].questionState = '提交'
            }else if (res.data.list[i].questionState == 2) {
              res.data.list[i].questionState = '通过'
            }else {
              res.data.list[i].questionState = '拒绝'
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
        this.questionType();
      },
      addBtn(form) {
        let answers='[{"answer":'+'"'+this.form.answer1+'"'+',"isCorrect":1},{"answer":'+'"'+this.form.answer2+'"'+',"isCorrect":2},{"answer":'+'"'+this.form.answer3+'"'+',"isCorrect":2},{"answer":'+'"'+this.form.answer4+'"'+',"isCorrect":2}]'

        this.form.answers=answers
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/api/mFightingQuestion/add',this.form).then(res => {
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
          qId: id
        }
        this.$fetch('/api/mFightingQuestion/delete', parameterData).then(res => {
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
        this.reasonMess=false
        this.getCoin=false
        this.dialogTableVisible = true
        this.audit = id
        this.$fetch('/api/mFightingQuestion/info', {
          qId: id
        }).then(res => {
          if(res.data != null ){
          if (res.data.staffType == '2') {
            this.isShow = false
          } else {
            this.isShow = true
          }
          this.formtwo = res.data
        }
      })
      },
      isAuditingChange(questionState){
        if(questionState==3){
          this.getCoin=false
          this.reasonMess=true
        }else{
          this.reasonMess=false
        }

        if(questionState==2){
          this.reasonMess=false
          this.getCoin=true
        }else{
          this.getCoin=false
        }
      },

      update(formtwo) {
        let parameterData = {
          qId: this.audit,
          questionState:this.formtwo.question.questionState,
          coin:this.formtwo.coin,
          rejectReason:this.formtwo.rejectReason,
          creator:this.formtwo.question.creator
        }
        this.$put('/api/mFightingQuestion/audit', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({
            type: 'success',
            message: '提交成功！'
          })
          this.dialogTableVisible = false
          this.accountList()
        }
      })
      },
      getOne(id){
        this.isRejectReason=false
        this.dialogTableVisibleInfo = true
        this.$fetch('/api/mFightingQuestion/info', {
          qId: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          res.data.question.createTime =  formatDate(new Date(res.data.question.createTime), 'yyyy-MM-dd hh:mm:sss')
          this.formtwoInfo = res.data.question
          this.formtwoanswer=res.data.answer
          if(res.data.question.questionState==3){
            this.isRejectReason=true
          }
        }
      })
      },
      updateInfo(id){
        this.dialogTableVisibleUpdate = true
        this.$fetch('/api/mFightingQuestion/info', {
          qId: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.formtwoUpdateInfo = res.data.question;
          this.formtwoUpdateanswer=res.data.answer;
          this.isUpdateRejectReason=false;
          if(res.data.question.questionState==3){
            this.isUpdateRejectReason=true
          }
          this.questionType()
        }

      })
      },
      updateCilc(id){
        let answers="["
        for(let i=0;i<this.formtwoUpdateanswer.length;i++){
          if(i<this.formtwoUpdateanswer.length-1){
            answers=answers+'{"answer":'+'"'+this.formtwoUpdateanswer[i].answer+'"'+',"ansId":'+this.formtwoUpdateanswer[i].ansId+'},'
          }else{
            answers=answers+'{"answer":'+'"'+this.formtwoUpdateanswer[i].answer+'"'+',"ansId":'+this.formtwoUpdateanswer[i].ansId+'}'
          }
        }
        answers=answers+"]"
        let parameterData = {
          qId: this.formtwoUpdateInfo.qId,
          questionType:this.formtwoUpdateInfo.questionType,
          question:this.formtwoUpdateInfo.question,
          rejectReason:this.formtwoUpdateInfo.rejectReason,
          score:this.formtwoUpdateInfo.score,
          countTime:this.formtwoUpdateInfo.countTime,
          answers:answers
        }
        this.$put('/api/mFightingQuestion/update', parameterData).then(res => {

          if ((res.statusCode+"").startsWith("2")){
            this.$message({
              type: 'success',
              message: '提交成功！'
            })
            this.dialogTableVisibleUpdate = false
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
