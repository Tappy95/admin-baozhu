<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>游戏竞猜/开奖结果</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="彩种:">
            <el-select :style="styleObject" v-model="formInline.lotteryGroupId" placeholder="">
              <el-option v-for="(item,index) in lotteryPlayed" :key="index" :label="item.name" :value="item.lotteryGroupId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开奖期号:" >
            <el-input :style="styleObject" v-model="formInline.number" auto-complete="off"  clearable>
            </el-input>
          </el-form-item>

          <el-button @click="search()">查询</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>

            <el-table-column fixed="left" min-width="120px"  prop="lotteryGroupName" label="彩种名称">
            </el-table-column>

            <el-table-column min-width="150px" prop="number" label="开奖期号">
            </el-table-column>

            <el-table-column min-width="150px" prop="data" label="开奖号码">
            </el-table-column>

            <el-table-column min-width="150px" prop="createStr" label="创建时间">
            </el-table-column>

            <el-table-column width="100px"  prop="status" label="状态">
            </el-table-column>

            <el-table-column min-width="150px"  prop="startStr" label="当期开奖时间">
            </el-table-column>

            <el-table-column min-width="150px" prop="endStr" label="结束时间">
            </el-table-column>

            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button @click="getOne(scope.row.number)" size="mini">详情</el-button>
                <el-button @click="getInfo(scope.row.number)"  v-if="upd && scope.row.status=='未开奖'" size="mini">修改</el-button>
                <el-button @click="Delete(scope.row.number)" v-if="del" size="mini">删除</el-button>
                <!--this.dialogTableVisible = true-->
                <el-button @click="getPrize(scope.row.number)" v-if="rePrize && scope.row.status=='未开奖' && scope.row.isRetreat==2" size="mini">退奖</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="开奖详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种组id:" :label-width="formLabelWidth" >
                  <el-input :style="styleObject" :disabled="true" min="0" v-model="formtwoInfo.lotteryGroupId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="彩种名称:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true"  v-model="formtwoInfo.lotteryGroupName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="采集id:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true"  v-model="formtwoInfo.lotteryGrabId" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="code:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true" v-model="formtwoInfo.code" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开奖期号:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true" v-model="formtwoInfo.number" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="开奖号码:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true" v-model="formtwoInfo.data" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="当期开奖时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true" v-model="formtwoInfo.startStr" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="结束时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true" v-model="formtwoInfo.endStr" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否异常:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="formtwoInfo.isException" placeholder="">
                    <el-option label="否" :value="0"></el-option>
                    <el-option label="是" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="检查异常:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="formtwoInfo.notCheckException" placeholder="">
                    <el-option label="否" :value="0"></el-option>
                    <el-option label="是" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="状态:" :label-width="formLabelWidth">
                  <el-select  :style="styleObject" :disabled="true" v-model="formtwoInfo.status" placeholder="">
                    <el-option label="未开奖" :value="false"></el-option>
                    <el-option label="已开奖" :value="true"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="退奖:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" :disabled="true" v-model="formtwoInfo.isRetreat" placeholder="">
                    <el-option label="已退奖" :value="1"></el-option>
                    <el-option label="未退奖" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="创建时间:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true" v-model="formtwoInfo.createStr" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableDetail = false">取 消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改开奖" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="12">
                <el-form-item label="开奖期号:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true" v-model="formtwo.number" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态:" :label-width="formLabelWidth">
                  <el-select :style="styleObject"  v-model="formtwo.status" placeholder="">
                    <el-option label="未开奖" :value="false"></el-option>
                    <el-option label="已开奖" :value="true"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="开奖号码:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" v-model="formtwo.data" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="code:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" v-model="formtwo.code" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="退奖:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isRetreat" placeholder="">
                    <el-option label="已退奖" :value="1"></el-option>
                    <el-option label="未退奖" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="是否异常:" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isException" placeholder="">
                    <el-option label="否" :value="0"></el-option>
                    <el-option label="是" :value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="检查异常:" :label-width="formLabelWidth">
                  <el-select :style="styleObject"  v-model="formtwo.notCheckException" placeholder="">
                    <el-option label="否" :value="0"></el-option>
                    <el-option label="是" :value="1"></el-option>
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
    name: 'LotteryResult',
    data() {
      return {
        formInline:{
          lotteryGroupId:1
        },
        lotteryPlayed:[],
        styleObject: {
          width: '200px',
        },
        w_input:'200px',
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        dialogTableVisible: false,
        dialogFormVisible: false,
        dialogTableDetail:false,
        rePrize:false,//退奖
        upd:false,//修改
        del:false,//删除
        formtwo: {},
        formtwoInfo:{},
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        tableData: [],
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.playedList();
      this.accountList();
      this.queryBtns();
    },
    //过滤器
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:sss');
      }
    },
    methods: {
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
              if(res.data[i].btnCode == 'rePrize') {
                this.rePrize=true;
              }
              if(res.data[i].btnCode == 'del') {
                this.del=true;
              }
              if(res.data[i].btnCode == 'upd') {
                this.upd=true;
              }
            }
            if (res.data.length==1){
              this.optionW = '150px';
            }else  if (res.data.length==2) {
              this.optionW = '220px';
            }else  if (res.data.length==3) {
              this.optionW = '295px';
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
          lotteryGroupId: this.formInline.lotteryGroupId,
          number:this.formInline.number
        }
        this.$fetch('/guess/lotteryDataTodayRead/page', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].status == true) {
                res.data.list[i].status = '已开奖'
              } else if (res.data.list[i].status == false) {
                res.data.list[i].status = '未开奖'
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
      getOne(number){
        this.formtwoInfo = {};
        this.dialogTableDetail = true;
        this.$fetch('/guess/lotteryDataTodayRead/selectOne', {
          number: number
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            // res.data.createTime = formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss');
            this.formtwoInfo = res.data
          }
        })
      },

      getInfo(number) {
        this.formtwo = {};
        //修改前查询基本信息
        this.dialogTableVisible = true;
        this.$fetch('/guess/lotteryDataTodayRead/selectOne', {
          number: number
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
          }
        })
      },
      update(formtwo) {
        let parameterData = {
          number: this.formtwo.number,
          status:this.formtwo.status,
          code:this.formtwo.code,
          isRetreat:this.formtwo.isRetreat,
          isException:this.formtwo.isException,
          notCheckException:this.formtwo.notCheckException,
          data:this.formtwo.data
        }
        this.$put('/guess/lotteryDataTodayRead/update', parameterData).then(res => {
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

      Delete(number) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.delData(number)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      delData(number) {
        let parameterData = {
          number: number
      }
        this.$fetch('/guess/lotteryDataTodayRead/delete', parameterData).then(res => {
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
            }
            )
          }
        })
      },



      getPrize(number) {
        this.$confirm('此操作将退还购买金额, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            this.PrizeData(number)
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      PrizeData(number) {
        let parameterData = {
          number: number
        }
        this.$fetch('/guess/lotteryDataTodayRead/returnPig', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '退奖成功！'
            })
            this.accountList()
          } else {
            this.$message({
              type: 'error',
              message: '退奖失败！'
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
      },

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
