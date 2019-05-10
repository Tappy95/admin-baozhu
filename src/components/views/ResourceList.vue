<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>游戏竞猜/资源列表</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="名称:">
              <el-input  v-model="formInline.name" auto-complete="off"  clearable>
              </el-input>
          </el-form-item>
          <el-button @click="search()">查询</el-button>
          <el-button @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>
            <el-table-column fixed="left" min-width="150px"  prop="lotteryTypeName" label="彩种分类">
            </el-table-column>

            <el-table-column min-width="150px" width="120px" prop="lotteryGrabName"  label="彩种组">
            </el-table-column>

            <el-table-column min-width="150px" prop="lotteryPlayedName" label="彩种模版">
            </el-table-column>

            <el-table-column min-width="150px" prop="lotteryGroupName" label="彩种采集">
            </el-table-column>

            <el-table-column min-width="150px" prop="name" label="名称">
            </el-table-column>
            <el-table-column min-width="100px" prop="isEnable" label="是否可用">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
                <el-button @click="getOne(scope.row.id)" size="mini">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加资源" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种分类:" prop="lotteryTypeId"  :label-width="formLabelWidth">
                  <el-select  :style="styleObject" v-model="form.lotteryTypeId" placeholder="">
                    <el-option  v-for="(item,index) in lotteryTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="彩种组:" prop="lotteryGroupId"  :label-width="formLabelWidth">
                  <el-select  :style="styleObject" v-model="form.lotteryGroupId" placeholder="">
                    <el-option  v-for="(item,index) in lotterygroupList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="彩种采集:" prop="lotteryGrabId"  :label-width="formLabelWidth">
                  <el-select @change="GroupTap" :style="styleObject" v-model="form.lotteryGrabId" placeholder="">
                  <el-option  v-for="(item,index) in lotteryGrabList" :key="index" :label="item.lotteryGroupName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
              <el-form-item label="彩种模版:" prop="lotteryPlayedTplId"  :label-width="formLabelWidth">
                  <el-input :style="styleObject"  type="number" min="0" v-model="form.lotteryPlayedTplId" auto-complete="off"  clearable>
                  </el-input>
              </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="kjFunName:" :label-width="formLabelWidth" prop="kjFunName">
                  <el-input :style="styleObject"  v-model="form.kjFunName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序:" :label-width="formLabelWidth" prop="displaysort">
                  <el-input :style="styleObject"  type="number" min="0" v-model="form.displaysort" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否官方:" prop="isOfficial" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.isOfficial" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="不是" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否停售:" prop="isStopSales" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.isStopSales" placeholder="">
                    <el-option label="正常" value="0"></el-option>
                    <el-option label="已停售" value="1"></el-option>
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
              <el-col :span="12">
                <el-form-item label="是否删除:" prop="isDelete" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.isDelete" placeholder="">
                    <el-option label="删除" value="1"></el-option>
                    <el-option label="不删除" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item  label="名称:" prop="name" :label-width="formLabelWidth">
                  <el-input  v-model="form.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item  label="开奖表后缀:" prop="kjName" :label-width="formLabelWidth">
                  <el-input aria-placeholder="该彩种所对应的开奖表后缀，仅适用信用玩法"  v-model="form.kjName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="介绍:" :label-width="formLabelWidth" prop="intro">
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.intro" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改资源" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种分类:" prop="lotteryTypeId"  :label-width="formLabelWidth">
                  <el-select  :style="styleObject" v-model="formtwo.lotteryTypeId" placeholder="">
                    <el-option  v-for="(item,index) in lotteryTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="彩种组:" prop="lotteryGroupId"  :label-width="formLabelWidth">
                  <el-select  :style="styleObject" v-model="formtwo.lotteryGroupId" placeholder="">
                    <el-option  v-for="(item,index) in lotterygroupList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="彩种采集:" prop="lotteryGrabId"  :label-width="formLabelWidth">
                  <el-select @change="GroupTap" :style="styleObject" v-model="formtwo.lotteryGrabId" placeholder="">
                    <el-option  v-for="(item,index) in lotteryGrabList" :key="index" :label="item.lotteryGroupName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="彩种模版:" prop="lotteryPlayedTplId"  :label-width="formLabelWidth">
                  <el-input :style="styleObject"  type="number" min="0" v-model="formtwo.lotteryPlayedTplId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="kjFunName:" :label-width="formLabelWidth" prop="kjFunName">
                  <el-input :style="styleObject"  v-model="formtwo.kjFunName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序:" :label-width="formLabelWidth" prop="displaysort">
                  <el-input :style="styleObject"  type="number" min="0" v-model="formtwo.displaysort" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否官方:" prop="isOfficial" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isOfficial" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="不是" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否停售:" prop="isStopSales" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isStopSales" placeholder="">
                    <el-option label="正常" :value="0"></el-option>
                    <el-option label="已停售" :value="1"></el-option>
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
              <el-col :span="12">
                <el-form-item label="是否删除:" prop="isDelete" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isDelete" placeholder="">
                    <el-option label="删除" :value="1"></el-option>
                    <el-option label="不删除" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item  label="名称:" prop="name" :label-width="formLabelWidth">
                  <el-input  v-model="formtwo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item  label="开奖表后缀:" prop="kjName" :label-width="formLabelWidth">
                  <el-input aria-placeholder="该彩种所对应的开奖表后缀，仅适用信用玩法"  v-model="formtwo.kjName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="介绍:" :label-width="formLabelWidth" prop="intro">
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.intro" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="资源详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种分类:"  :label-width="formLabelWidth">
                  <el-select :disabled="true"  :style="styleObject" v-model="formtwoInfo.lotteryTypeId" placeholder="">
                    <el-option  v-for="(item,index) in lotteryTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="彩种组:"   :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.lotteryGroupId" placeholder="">
                    <el-option  v-for="(item,index) in lotterygroupList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="彩种采集:"   :label-width="formLabelWidth">
                  <el-select :disabled="true" @change="GroupTap" :style="styleObject" v-model="formtwoInfo.lotteryGrabId" placeholder="">
                    <el-option  v-for="(item,index) in lotteryGrabList" :key="index" :label="item.lotteryGroupName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="彩种模版:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true" type="number" min="0" v-model="formtwoInfo.lotteryPlayedTplId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="kjFunName:" :label-width="formLabelWidth" >
                  <el-input :style="styleObject" :disabled="true"  v-model="formtwoInfo.kjFunName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="排序:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true"  type="number" min="0" v-model="formtwoInfo.displaysort" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否官方:"  :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="formtwoInfo.isOfficial" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="不是" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否停售:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="formtwoInfo.isStopSales" placeholder="">
                    <el-option label="正常" :value="0"></el-option>
                    <el-option label="已停售" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否可用:"  :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="formtwoInfo.isEnable" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否删除:"  :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="formtwoInfo.isDelete" placeholder="">
                    <el-option label="删除" :value="1"></el-option>
                    <el-option label="不删除" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item  label="名称:"  :label-width="formLabelWidth">
                  <el-input :disabled="true"  v-model="formtwoInfo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item  label="开奖表后缀:" :label-width="formLabelWidth">
                  <el-input :disabled="true" aria-placeholder="该彩种所对应的开奖表后缀，仅适用信用玩法"  v-model="formtwoInfo.kjName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="介绍:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.intro" auto-complete="off"  clearable>
                  </el-input>
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
    name: 'ResourceList',
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
        rules: {
          lotteryTypeId: [{
            required: true,
            message: '请选择彩种分类',
            trigger: 'change'
          }],
          lotteryGroupId: [{
            required: true,
            message: '请选择彩种组',
            trigger: 'change'
          }],
          lotteryGrabId: [{
            required: true,
            message: '请选择彩种采集',
            trigger: 'change'
          }],
          lotteryPlayedTplId: [{
            required: true,
            message: '请输入彩种模板',
            trigger: 'blur'
          }],
          isOfficial: [{
            required: true,
            message: '请选择是否官方',
            trigger: 'change'
          }],
          isStopSales: [{
            required: true,
            message: '请选择是否停售',
            trigger: 'change'
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
          name: [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          }],
          intro: [{
            required: true,
            message: '请输入介绍',
            trigger: 'blur'
          }],
          kjName: [{
            required: true,
            message: '请输入开奖表后缀',
            trigger: 'blur'
          }],
          displaysort: [{
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }],
          kjFunName: [{
            required: true,
            message: '请输入kjFunName',
            trigger: 'blur'
          }],
        },
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        lotteryTypeList:[],
        lotterygroupList:[],
        lotteryGrabList:[],
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
      //彩种分类
      this.lotteryType();
      //彩种组
      this.lotteryGroup();
      //彩种采集
      this.lotteryGrab();
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

  //获取彩种分类
      lotteryType(){
        this.$fetch('/guess/lotteryType/selectDownList').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.lotteryTypeList = res.data;
          }
        })
      },
      //获取彩种组
      lotteryGroup(){
        this.$fetch('/guess/lotteryGroup/selectDownList').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.lotterygroupList = res.data;
          }
        })
      },
      //获取彩种采集
      lotteryGrab(){
        this.$fetch('/guess/lotteryGrab/selectDownList').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.lotteryGrabList = res.data;
          }
        })
      },
      //

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
                this.optionW = '220px'
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
          name: this.formInline.name
        }
        this.$fetch('/guess/lottery/queryList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {

              if(res.data.list[i].isEnable == '1') {
                res.data.list[i].isEnable = '可用'
              } else {
                res.data.list[i].isEnable = '不可用'
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
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList();
      },
      load() {
        this.form={};
        this.formInline ={};
        this.dialogFormVisible = true;
        // //彩种分类
        // this.lotteryType();
        // //彩种组
        // this.lotteryGroup();
        // //彩种采集
        // this.lotteryGrab();
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/guess/lottery/save', this.form).then(res => {
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
        this.$fetch('/guess/lottery/delete', parameterData).then(res => {
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
        this.$fetch('/guess/lottery/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
          }
        })
      },
      update(formtwo) {
        this.$put('/guess/lottery/update', this.formtwo).then(res => {
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
        this.$fetch('/guess/lottery/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
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
