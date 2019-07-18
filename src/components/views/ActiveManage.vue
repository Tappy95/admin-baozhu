<template>
  <div class="userloanInformation-wrap">
    <div class="userloanInformation-inner">
      <div class="userloanInformation-header">
        <h3>系统配置/活动管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="活动名称">
            <el-input v-model="formInline.activityName"
                      placeholder="请输入活动名称"
                      clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="search()">查询</el-button>
            <el-button type="success" plain @click="load()" v-if="add">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="userloanInformation-table">
        <template>
          <el-table :data="tableData"
                    style="width: 100%"
                    height="528">
            <el-table-column fixed="left" label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80'>
            </el-table-column>
            <el-table-column width="150" prop="activityName" fixed="left"
                             label="活动名称">
            </el-table-column>

            <el-table-column prop="activityType"
                             label="活动类型">
            </el-table-column>

            <el-table-column prop="startTime"
                             label="打卡开始时间"
                             width="150px"
            >
            </el-table-column>

            <el-table-column prop="stopTime"
                             label="打卡结束时间"
                             width="150px"
                            >
            </el-table-column>

            <el-table-column prop="isCycle"
                             label="是否循环"
                             >
            </el-table-column>

            <el-table-column prop="periodic"
                             label="循环周期值"
                             width="100px"
                             >
            </el-table-column>

            <el-table-column :formatter="dateFormat" prop="begainTime"
                             label="活动开始时间"
                             width="170px">
            </el-table-column>

            <el-table-column :formatter="dateFormat" prop="endTime"
                             label="活动结束时间"
                             width="170px">
            </el-table-column>

            <el-table-column  prop="settlementTime"
                              label="结算时间"
                              width="150px">
          </el-table-column>

            <el-table-column  prop="baseAllocationTmount"
                              label="瓜分金额初始值"
                              width="150px">
            </el-table-column>

            <el-table-column fixed="right"
                             label="操作"
                             :width="optionW">
              <template slot-scope="scope">
                <el-button  type="info" plain
                           size="mini"
                           @click="getInfo(scope.row.actId,1)">详情</el-button>
                <el-button  type="warning" plain
                           size="mini"
                           @click="Delete(scope.row.actId)" v-if="del">删除</el-button>
                <el-button  type="success" plain
                           size="mini"
                           @click="getInfo(scope.row.actId,2)" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="活动详情" :visible.sync="dialogTableVisible" width="800px">
          <el-form>
            <el-row>
              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="活动名称:" :label-width="formLabelWidth">
                  <el-input :value="message.activityName" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="活动类型:"  :label-width="formLabelWidth">
                  <el-select v-model="message.activityType" :disabled="true" placeholder="" >
                    <el-option label="打卡" :value="1"></el-option>
                    <el-option label="其他" :value="2"></el-option>
                  </el-select>

                </el-form-item>
              </el-col>

              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="打卡开始时间:"  :label-width="formLabelWidth">
                  <el-input :value="message.startTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="打卡结束时间:" :label-width="formLabelWidth">
                  <el-input :value="message.stopTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="是否循环:" :label-width="formLabelWidth">
                  <el-select v-model="message.isCycle":disabled="true" placeholder=""   style="width: 170px">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col v-if="loopChangeshow" :span="10" style="margin-bottom: 10px">
                <el-form-item label="循环周期:" :label-width="formLabelWidth">
                  <el-input :value="message.periodicUnit" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="活动开始时间:" :label-width="formLabelWidth">
                  <el-input :value="message.begainTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="活动结束时间:" :label-width="formLabelWidth">
                  <el-input :value="message.endTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="结算时间:" :label-width="formLabelWidth">
                  <el-input :value="message.settlementTime" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="10" style="margin-bottom: 10px">
                <el-form-item label="瓜分金额初始值(￥):" label-width="150px">
                  <el-input :value="message.baseAllocationTmount" :disabled="true" auto-complete="off" style="" clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="24" style="margin-bottom: 10px">
                <el-form-item  label="活动规则描述" prop="memo" :label-width="formLabelWidth">
                  <el-input style="width: 500px" type="textarea" :span="18" :disabled="true"  :autosize="{ minRows: 4, maxRows: 12}" v-model="message.memo" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>

            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改活动" :visible.sync="dialogTableEdit" width="800px">
          <el-form :model="formtwo" :rules="rules" ref="formtwo" :label-position="labelPosition" label-width="140px">
            <el-row>
              <el-col :span="11" style="margin-bottom: 10px">
                <el-form-item label="活动名称" :label-width="formLabelWidth" prop="activityName">
                  <el-input  v-model="formtwo.activityName" auto-complete="off" style="width: 220px"  clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="11" style="margin-bottom: 10px">
                <el-form-item label="活动类型" :label-width="formLabelWidth" prop="activityType">
                  <el-select v-model="formtwo.activityType" placeholder="" style="width: 220px">
                    <el-option label="打卡" :value="1"></el-option>
                    <el-option label="其他" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="11" style="margin-bottom: 10px">
                <el-form-item label="打卡开始时间" :label-width="formLabelWidth" prop="startTime">
                  <el-time-picker
                    v-model="formtwo.startTime"
                    :picker-options="{
                          selectableRange: '00:00:00 - 23:59:59'
                        }"
                    placeholder="请选择打卡开始时间" value-format="HH:mm:ss">
                  </el-time-picker>
                </el-form-item>
              </el-col>

              <el-col :span="11" style="margin-bottom: 10px">
                <el-form-item label="打卡结束时间" :label-width="formLabelWidth" prop="stopTime">
                  <el-time-picker
                    v-model="formtwo.stopTime"
                    ::picker-options="{
                          selectableRange: '00:00:00 - 23:59:59'
                        }"
                    placeholder="请选择打卡结束时间" value-format="HH:mm:ss">
                  </el-time-picker>
                </el-form-item>
              </el-col>

              <div style="width: 100%;float: left">
                <el-col :span="10" style="margin-bottom: 10px">
                  <el-form-item label="是否循环" :label-width="formLabelWidth" prop="isCycle">
                    <el-select v-model="formtwo.isCycle" placeholder=""  @change="loopChange(formtwo.isCycle)" style="width: 220px">
                      <el-option label="是" :value="1"></el-option>
                      <el-option label="否" :value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>

              <div v-if="loopChangeTrue">
                <el-col :span="11" style="margin-bottom: 10px">
                  <el-form-item label="循环周期值" :label-width="formLabelWidth" prop="periodic">
                    <el-input min="0" type="number" v-model="formtwo.periodic" auto-complete="off" style="width: 220px" clearable>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="11" style="margin-bottom: 10px">
                  <el-form-item label="循环周期单位" :label-width="formLabelWidth" prop="periodicUnit">
                    <el-select v-model="formtwo.periodicUnit" placeholder="" style="width: 220px">
                      <el-option label="天" :value="1"></el-option>
                      <el-option label="周" :value="2"></el-option>
                      <el-option label="月" :value="3"></el-option>
                      <el-option label="年" :value="4"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>

              <el-col :span="11" style="margin-bottom: 10px">
                <el-form-item label="活动开始时间" :label-width="formLabelWidth" prop="begainTime">
                  <el-date-picker
                    v-model="formtwo.begainTime"
                    type="datetime"
                    placeholder="选择活动开始时间" >
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="11" style="margin-bottom: 10px">
                <el-form-item label="活动结束时间" :label-width="formLabelWidth" prop="endTime">
                  <el-date-picker
                    v-model="formtwo.endTime"
                    type="datetime"
                    placeholder="选择活动结束时间" >
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="11" style="margin-bottom: 10px">
                <el-form-item label="结算时间" :label-width="formLabelWidth" prop="settlementTime">
                  <el-time-picker
                    v-model="formtwo.settlementTime"
                    :picker-options="{
                              selectableRange: '00:00:00 - 23:59:59'
                            }"
                    placeholder="请选择结算时间" value-format="HH:mm:ss">
                  </el-time-picker>
                </el-form-item>
              </el-col>

              <div style="width: 100%;float: left">
                <el-col :span="11" style="margin-bottom: 10px">
                  <el-form-item label="瓜分金额初始值(￥)" label-width="150px" prop="baseAllocationTmount">
                    <el-input min="0" type="number" v-model="formtwo.baseAllocationTmount" auto-complete="off" style="width: 220px" clearable>
                    </el-input>
                  </el-form-item>
                </el-col>
              </div>

              <el-col :span="11" style="margin-bottom: 10px">
                <el-form-item label="是否启用" :label-width="formLabelWidth" prop="isDisable">
                  <el-select v-model="formtwo.isDisable" placeholder=""  style="width: 220px">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="禁用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24" style="margin-bottom: 10px">
                <el-form-item  label="活动规则描述" prop="memo" :label-width="formLabelWidth">
                  <el-input style="width: 500px" type="textarea" :span="18" :autosize="{ minRows: 4, maxRows: 12}" v-model="formtwo.memo" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableEdit = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="添加活动" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form" :label-position="labelPosition" label-width="140px">
            <el-row>
                  <el-col :span="11" style="margin-bottom: 10px">
                     <el-form-item label="活动名称" :label-width="formLabelWidth" prop="activityName">
                        <el-input  v-model="form.activityName" auto-complete="off" style="width: 220px"  clearable></el-input>
                   </el-form-item>
                  </el-col>

                   <el-col :span="11" style="margin-bottom: 10px">
                     <el-form-item label="活动类型" :label-width="formLabelWidth" prop="activityType">
                       <el-select v-model="form.activityType" placeholder="" style="width: 220px">
                         <el-option label="打卡" value="1"></el-option>
                         <el-option label="其他" value="2"></el-option>
                       </el-select>
                     </el-form-item>
                   </el-col>

                    <el-col :span="11" style="margin-bottom: 10px">
                      <el-form-item label="打卡开始时间" :label-width="formLabelWidth" prop="startTime">
                        <el-time-picker
                          v-model="form.startTime"
                          :picker-options="{
                          selectableRange: '00:00:00 - 23:59:59'
                        }"
                          placeholder="请选择打卡开始时间" value-format="HH:mm:ss">
                        </el-time-picker>
                      </el-form-item>
                    </el-col>

                    <el-col :span="11" style="margin-bottom: 10px">
                      <el-form-item label="打卡结束时间" :label-width="formLabelWidth" prop="stopTime">
                        <el-time-picker
                          v-model="form.stopTime"
                          ::picker-options="{
                          selectableRange: '00:00:00 - 23:59:59'
                        }"
                          placeholder="请选择打卡结束时间" value-format="HH:mm:ss">
                        </el-time-picker>
                      </el-form-item>
                    </el-col>

                    <div style="width: 100%;float: left">
                        <el-col :span="10" style="margin-bottom: 10px">
                          <el-form-item label="是否循环" :label-width="formLabelWidth" prop="isCycle">

                            <el-select v-model="form.isCycle" placeholder=""  @change="loopChange(form.isCycle)" style="width: 220px">
                              <el-option label="是" value="1"></el-option>
                              <el-option label="否" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                    </div>

              <div v-if="loopChangeTrue">
                    <el-col :span="11" style="margin-bottom: 10px">
                      <el-form-item label="循环周期值" :label-width="formLabelWidth" prop="periodic">
                        <el-input min="0" type="number" v-model="form.periodic" auto-complete="off" style="width: 220px" clearable>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11" style="margin-bottom: 10px">
                      <!--1-天 2-周 3-月  4-年)-->
                      <el-form-item label="循环周期单位" :label-width="formLabelWidth" prop="periodicUnit">
                        <el-select v-model="form.periodicUnit" placeholder="" style="width: 220px">
                          <el-option label="天" value="1"></el-option>
                          <el-option label="周" value="2"></el-option>
                          <el-option label="月" value="3"></el-option>
                          <el-option label="年" value="4"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
              </div>

                    <el-col :span="11" style="margin-bottom: 10px">
                      <el-form-item label="活动开始时间" :label-width="formLabelWidth" prop="begainTime">
                        <el-date-picker
                          v-model="form.begainTime"
                          type="datetime"
                          placeholder="选择活动开始时间" >
                        </el-date-picker>
                      </el-form-item>
                    </el-col>

                  <el-col :span="11" style="margin-bottom: 10px">
                    <el-form-item label="活动结束时间" :label-width="formLabelWidth" prop="endTime">
                      <el-date-picker
                        v-model="form.endTime"
                        type="datetime"
                        placeholder="选择活动结束时间" >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>

                  <el-col :span="11" style="margin-bottom: 10px">
                    <el-form-item label="结算时间" :label-width="formLabelWidth" prop="settlementTime">
                      <el-time-picker
                        v-model="form.settlementTime"
                        :picker-options="{
                              selectableRange: '00:00:00 - 23:59:59'
                            }"
                        placeholder="请选择结算时间" value-format="HH:mm:ss">
                      </el-time-picker>
                    </el-form-item>
                  </el-col>

              <div style="width: 100%;float: left">
                  <el-col :span="11" style="margin-bottom: 10px">
                    <el-form-item label="瓜分金额初始值(￥)" label-width="150px" prop="baseAllocationTmount">
                      <el-input min="0" type="number" v-model="form.baseAllocationTmount" auto-complete="off" style="width: 220px" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
              </div>

              <el-col :span="11" style="margin-bottom: 10px">
                <el-form-item label="是否启用" :label-width="formLabelWidth" prop="isDisable">
                  <el-select v-model="form.isDisable" placeholder=""  style="width: 220px">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24" style="margin-bottom: 10px">
                <el-form-item  label="活动规则描述" prop="memo" :label-width="formLabelWidth">
                  <el-input style="width: 500px" type="textarea" :span="18" :autosize="{ minRows: 4, maxRows: 12}" v-model="form.memo" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        </el-dialog>
      </div>
      <!--分页-->
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
    name: 'ActiveManage',
    data() {
      return {
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        loopChangeshow:false,
        loopChangeTrue:false,
        labelPosition: 'right',
        dialogFormVisible: false,
        dialogTableVisible:false,
        dialogFormEdit:false,
        dialogTableEdit:false,
        formtwo: {},
        rules: {
          activityName: [{
            required: true,
            message: '请输入活动名称',
            trigger: 'blur'
          }],
          activityType: [{
            required: true,
            message: '请选择活动类型',
            trigger: 'change'
          }],
          startTime: [{
            required: true,
            message: '请选择打卡开始时间',
            trigger: 'change'
          }],
          stopTime: [{
            required: true,
            message: '请选择打卡结束时间',
            trigger: 'change'
          }],
          isCycle: [{
            required: true,
            message: '请选择是否循环',
            trigger: 'change'
          }],
          periodic: [{
            required: true,
            message: '请输入循环周期值',
            trigger: 'blur'
          }],
          periodicUnit: [{
            required: true,
            message: '请选择循环周期单位',
            trigger: 'change'
          }],
          memo: [{
            required: true,
            message: '请选择活动规则描述',
            trigger: 'blur'
          }],
          begainTime: [{
            required: true,
            message: '请选择活动开始时间',
            trigger: 'change'
          }],
          endTime: [{
            required: true,
            message: '请选择活动结束时间',
            trigger: 'change'
          }],
          settlementTime: [{
            required: true,
            message: '请选择结算时间',
            trigger: 'change'
          }],
          isDisable: [{
            required: true,
            message: '请选择是否启用',
            trigger: 'change'
          }],
          baseAllocationTmount: [{
            required: true,
            message: '请输入瓜分金额初始值',
            trigger: 'blur'
          }],
        },
        form: {
          isAuditing: '',
        },
        isShow: false,
        radio: '',
        list: [],
        imgElements:[
        ],
        message: {},
        requestText: '',
        formLabelWidth: '140px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData:[],
        isInfo: true
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
            if(res.data[i].btnCode == 'upd') {
              this.upd=true;
              this.powerTrue =true;
              this.optionW = '160px'
            }
            if(res.data[i].btnCode == 'del') {
              this.del=true;
              this.powerTrue =true;
              this.optionW = '160px'
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

      search() {
        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
      },
      load() {
        this.form={};
        this.dialogFormVisible = true;
        this.formInline={};
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
      toggle: function() {
        this.isShow = !this.isShow
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
        this.$fetch('/api/mActivityInfo/remove',{
          actId: id
        } ).then(res => {
          if (res.statusCode == 2000) {
          this.$message({ type: 'success', message: '删除成功！' })
          this.accountList()
        } else {
        }
      })
      },
      getInfo(id,types) {
        if(types==1){
          this.isInfo = true
          this.dialogTableVisible = true
        }else {
          this.dialogTableEdit = true
        }
        this.$fetch('/api/mActivityInfo/queryOne', {
          actId: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          if(res.data.isCycle == 1){
            this.loopChangeTrue = true
            this.loopChangeshow = true
            if(this.dialogTableVisible){
              if (res.data.periodicUnit==1){
                res.data.periodicUnit = "天"
              } else if (res.data.periodicUnit ==2) {
                res.data.periodicUnit = "周"
              }else if (res.data.periodicUnit ==3) {
                res.data.periodicUnit = "月"
              }else {
                res.data.periodicUnit = "年"
              }
              res.data.periodicUnit = res.data.periodic + res.data.periodicUnit
            }
          }else {
            this.loopChangeTrue = false
            this.loopChangeshow = false
          }
          res.data.begainTime = formatDate(new Date(res.data.begainTime), 'yyyy-MM-dd hh:mm:sss')
          res.data.endTime = formatDate(new Date(res.data.endTime), 'yyyy-MM-dd hh:mm:sss')
          this.message = res.data
          this.formtwo = res.data
        }
      })
      },

      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.form.begainTime = new Date(this.form.begainTime).getTime();
            this.form.endTime = new Date(this.form.endTime).getTime();
            this.$post('/api/mActivityInfo/add', this.form).then(res => {
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
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          activityName:this.formInline.activityName
        }
        this.$fetch('/api/mActivityInfo/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].activityType == 1) {
              res.data.list[i].activityType = "打卡"
            } else {
              res.data.list[i].activityType = "其他"
            }
            if(res.data.list[i].periodicUnit == 1) {
              res.data.list[i].periodicUnit = "天"
            } else if(res.data.list[i].periodicUnit == 2) {
              res.data.list[i].periodicUnit = "周"
            }else if(res.data.list[i].periodicUnit == 3) {
              res.data.list[i].periodicUnit = "月"
            }else {
              res.data.list[i].periodicUnit = "年"
            }
            res.data.list[i].periodic = res.data.list[i].periodic + res.data.list[i].periodicUnit
            if(res.data.list[i].isDisable == 1) {
              res.data.list[i].isDisable = "已启用"
            } else {
              res.data.list[i].isDisable = "已禁用"
            }
            if(res.data.list[i].isCycle == 1) {
              res.data.list[i].isCycle = "是"
            } else {
              res.data.list[i].isCycle = "否"
            }
          }
          this.tableData = res.data.list
          this.totalCount = res.data.total
        }
      })
      },
      update(formtwo) {
        this.formtwo.begainTime = new Date(this.formtwo.begainTime).getTime();
        this.formtwo.endTime = new Date(this.formtwo.endTime).getTime();
        this.$put('/api/mActivityInfo/modify', this.formtwo).then(res => {
        if ((res.statusCode+"").startsWith("2")) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.dialogTableEdit = false
          this.accountList()
        }
      })
      },
      loopChange(types){
        if ((types == 1)){
          this.loopChangeTrue =true
        }else {
          this.loopChangeTrue =false
        }
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

  .el-input--suffix .el-input__inner{
    padding-right: 0;
  }
  .el-form-item .el-form-item {
    margin-bottom: 10px;
  }
  .userloanInformation-wrap {
    width: 100%;
  }
  .userloanInformation-inner {
    margin: auto;
    padding: 0 20px;
  }
  .userloanInformation-header {
    margin-bottom: 20px;
  }
  .userloanInformation-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .userloanInformation-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }
  .el-table th {
    background-color: #e6e6e6;
  }
  .information-wrap {
    margin-top: -30px;
    margin-bottom: 20px;
  }
  .information {
    display: flex;
  }
  .information div,
  .information-two div {
    margin-right: 20px;
  }
  .information div span,
  .information-two div span {
    color: red;
  }
  .information-two {
    display: flex;
    flex-wrap: wrap;
    width: 680px;
    line-height: 25px;
  }
  .informationImg{
    width: 148px;
    height: 148px;
  }
  .information-three div{
    display: inline-grid;
    margin: 5px 30px;
  }
</style>
