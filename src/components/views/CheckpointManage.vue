<template>
  <div class="vip-manage-wrap">
    <div class="vip-manage-inner">
      <div class="vip-manage-header">
        <h3>运营管理/闯关管理</h3>
        <hr/>
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="关卡数:">
            <el-input v-model="formInline.name" placeholder="请输入关卡数" clearable></el-input>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
<!--          <el-button type="success" plain v-if="add" @click="load()">添加</el-button>-->
        </el-form>
      </div>
      <div class="vip-manage-table">
        <template>
          <el-table :data="tableData" style="width: 100%" max-height="600">
            <el-table-column fixed="left" label="关卡数" type="index" :index="indexMethod" prop="checkpoint_number"
                             width='120'>
            </el-table-column>
            <el-table-column fixed="left" label="过关奖励" prop="reward_amount" width='120'>
            </el-table-column>
            <el-table-column label="过关条件" min-width="120px">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.clearance_conditions==0">指定金币</span>
                <span class="yellow" v-if="scope.row.clearance_conditions==1">邀请好友</span>
              </template>
            </el-table-column>
            <el-table-column min-width="170px" prop="gold_number" label="金币数">
            </el-table-column>
            <el-table-column min-width="170px" prop="friends_number" label="好友数">
            </el-table-column>
            <el-table-column min-width="170px" prop="friends_checkpoint_number" label="好友须完成关数">
            </el-table-column>
            <el-table-column min-width="170px" prop="game_number" label="游戏任务数">
            </el-table-column>
            <el-table-column min-width="170px" prop="video_number" label="视频数">
            </el-table-column>
            <el-table-column min-width="170px" prop="task_info" label="任务说明">
            </el-table-column>
            <el-table-column min-width="170px" prop="friends_checkpoint_number" label="好友须完成关数">
            </el-table-column>
            <el-table-column :formatter="dateFormat" prop="create_time" min-width="170" label="创建时间">
            </el-table-column>
            <el-table-column min-width="170" label="状态">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.state==0">关闭</span>
                <span class="yellow" v-if="scope.row.state==1">开启</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <!-- <el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button> -->
                <el-button type="warning" plain size="mini" v-if="del" @click="Delete(scope.row.id)">删除</el-button>
                <el-button type="success" plain v-if="upd" @click="getInfo(scope.row.id)" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>

        <el-dialog title="添加关卡" :close-on-click-modal="$close" :visible.sync="dialogFormVisible" width="900px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="关卡数:" :label-width="formLabelWidth" prop="checkpointNumber">
                  <el-input v-model="form.checkpointNumber" auto-complete="off" style="width: 187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="过关奖励:" :label-width="formLabelWidth" prop="rewardAmount">
                  <el-input v-model="form.rewardAmount" auto-complete="off" style="width: 187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="过关条件:" :label-width="formLabelWidth" prop="clearanceConditions">
                  <el-select style="width: 187px" v-model="form.clearanceConditions" @change="selectAddFn"
                             placeholder="">
                    <el-option label="指定金币" value="0"></el-option>
                    <el-option label="邀请好友" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="金币数:" :label-width="formLabelWidth" prop="goldNumber">
                  <el-input v-model="form.goldNumber" v-bind:disabled="form.clearanceConditions == 1"
                            auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="好友数:" label-width="190px" prop="friendsNumber">
                  <el-input v-model="form.friendsNumber" v-bind:disabled="form.clearanceConditions == 0"
                            auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="好友须完成关数:" :label-width="formLabelWidth" prop="friendsCheckpointNumber">
                  <el-input v-model="form.friendsCheckpointNumber" v-bind:disabled="form.clearanceConditions == 0"
                            auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="状态:" :label-width="formLabelWidth" prop="state">
                  <el-select style="width: 187px" v-model="form.state" placeholder="">
                    <el-option label="关闭" value="0"></el-option>
                    <el-option label="开启" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" :disabled="isSubmit" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 70]" :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
    import {formatDate} from '../../utils/date.js'
    import {delSession, getSession} from '../../utils/cookie'
    import BigImg from './BigImg'

    export default {
        name: 'CheckpointManage',
        data() {
            return {
                showImg: false,
                imgSrc: '',
                uploadData: {},
                optionW: '75px',
                menuId: '',
                add: false,
                del: false,
                upd: false,

                dialogTableVisible: false,
                formtwo: {},
                dialogFormVisible: false,
                dialogTableDetail: false,
                formtwoInfo: {},
                form: {
                    logo: '',
                    backgroundImg: '',
                    overdueImg: '',
                    clearanceConditions: 0
                },
                rules: {
                    // vipType vip类型 1.普通vip 2.中青赚点
                    // cashMoney 可提现金额 单位元，-1无限制
                    checkpointNumber: [{required: true, message: '请输入关卡数', trigger: 'blur'}, {
                        validator: (rule, value, callback) => {
                            var pattern = /^-?[1-9]\d*$/;
                            if (!pattern.test(value)) {
                                callback(new Error("请输入正整数"));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }],
                    rewardAmount: [{required: true, message: '请输入过关奖励', trigger: 'blur'}, {
                        validator: (rule, value, callback) => {
                            var pattern = /^-?[1-9]\d*$/;
                            if (!pattern.test(value)) {
                                callback(new Error("请输入正整数"));
                            } else {
                                callback();
                            }
                        }, trigger: 'blur'
                    }],
                    clearanceConditions: [{required: true, message: '请选择过关条件', trigger: 'change'}],
                    state: [{required: true, message: '请选择状态', trigger: 'change'}],
                },
                formLabelWidth: '190px',
                /* 分页*/
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                formInline: {},
                tableData: [],
                isSubmit: false,
            }
        },
        components: {
            'big-img': BigImg
        },
        filters: {
            //每隔三位数字以逗号隔开，保留小数点后两位
            currenNum: function (num) {
                var dataval = parseInt(num);
                return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
            },
        },
        created() {
            this.menuId = this.$route.query.id;
            this.dataList();
            this.queryBtns();
            this.uploadData = {
                token: getSession("token")
            }
        },
        methods: {
            selectAddFn() {
                if (this.form.clearanceConditions == 1) {
                    this.form.goldNumber = 0
                } else {
                    this.form.friendsNumber = 0
                    this.form.friendsCheckpointNumber = 0
                }
            },
            queryBtns() {
                let parameterData = {
                    menuId: this.menuId
                }
                this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        for (let i = res.data.length - 1; i >= 0; i--) {
                            if (res.data[i].btnCode == 'add') {
                                this.add = true;
                            }
                            if (res.data[i].btnCode == 'upd') {
                                this.upd = true;
                                this.optionW = '160px';
                            }
                            if (res.data[i].btnCode == 'del') {
                                this.del = true;
                                this.optionW = '220px';
                            }
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: res.message,
                            duration: 3000
                        })
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
            dataList() {
                let parameterData = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize
                };
                // this.$message({
                // 	type: 'error',
                // 	message: '接口暂未接通',
                // 	duration: 3000
                // })
                this.$fetch('/py/checkpoint/list', parameterData).then(res => {
                    if (res) {
                        this.tableData = res.data;
                        console.log('sssssssssss', res.data);
                        // for(let i = res.data.list.length - 1; i >= 0; i--) {
                        //   if(res.data.list[i].status == '1') {
                        //     res.data.list[i].status = '是'
                        //   } else {
                        //     res.data.list[i].status = '否'
                        //   }
                        //   if(res.data.list[i].highVip == '1') {
                        //     res.data.list[i].highVip = '不是'
                        //   } else {
                        //     res.data.list[i].highVip = '是'
                        //   }
                        // }
                        // this.tableData = res.data.list
                        // this.totalCount = res.data.total
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
                this.dataList();
            },
            load() {
                this.form = {};
                this.dialogFormVisible = true;
            },

            addBtn(form) {

                this.$refs[form].validate(valid => {
                    if (valid) {

                        if (this.form.clearanceConditions == 1) {
                            if (!this.form.friendsNumber) {
                                this.$message({type: 'error', message: '请输入好友数！'})
                                return
                            }
                            if (!this.form.friendsCheckpointNumber) {
                                this.$message({type: 'error', message: '请输入好友须完成关数！'})
                                return
                            }
                        }
                        if (this.form.clearanceConditions == 0) {
                            if (!this.form.goldNumber) {
                                this.$message({type: 'error', message: '请输入金币数！'})
                                return
                            }
                        }

                        this.$nextTick(function () {
                            this.isSubmit = true;
                        })
                        this.$postlocal('/py/checkpoint/add', this.form).then(res => {
                            if (res.success == 1) {
                                this.dialogFormVisible = false
                                this.$message({
                                    type: 'success',
                                    message: '添加成功！'
                                })
                                this.dataList()
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: res.message
                                })
                                this.isSubmit = false;
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
                this.$message({
                    type: 'error',
                    message: '接口未接'
                })
                //     this.$fetch('/api/mVipInfo/remove', parameterData).then(res => {
                //       if ((res.statusCode+"").startsWith("2")) {
                //       this.$message({
                //         type: 'success',
                //         message: '删除成功！'
                //       })
                //       this.dataList()
                //     } else {
                //       this.$message({
                //         type: 'error',
                //         message: '删除失败！'
                //       })
                //     }
                //   })
            },
            //编辑
            getInfo(id) {
                this.$message({
                    type: 'error',
                    message: '接口未接'
                })
                // this.$fetch('/api/mVipInfo/queryOne', {
                //   id: id
                // }).then(res => {
                //     if ((res.statusCode + "").startsWith("2")) {
                //       this.formtwo = res.data;
                //       this.imageUrl=res.data.logo;
                //       this.backgroundImg = res.data.backgroundImg;
                //       this.overdueImg = res.data.overdueImg;
                //     }
                // })
            },
            //添加
            update(formtwo) {
                console.log(this.formtwo)
                this.$message({
                    type: 'error',
                    message: '接口暂未接通',
                    duration: 3000
                })
                return false;
                this.formtwo.logo = this.imageUrl;
                this.formtwo.backgroundImg = this.backgroundImg;
                this.formtwo.overdueImg = this.overdueImg;
                this.$refs[formtwo].validate(valid => {
                    if (valid) {
                        if (!this.formtwo.logo) {
                            this.$message({type: 'error', message: '请上传logo！'})
                            return
                        }
                        if (!this.formtwo.backgroundImg) {
                            this.$message({type: 'error', message: '请上传背景图！'})
                            return
                        }

                        if (!this.formtwo.overdueImg) {
                            this.$message({type: 'error', message: '请上传过期logo！'})
                            return
                        }

                        this.$post('/api/mVipInfo/modify', this.formtwo).then(res => {
                            if ((res.statusCode + "").startsWith("2")) {
                                this.$message({type: 'success', message: '修改成功！'})
                                this.dialogTableVisible = false;
                                this.dataList()
                            } else {
                                this.$message({type: 'error', message: res.message})
                            }
                        })
                    }
                })
            },
            //   getOne(id){
            //     this.dialogTableDetail = true;
            //     this.$fetch('/api/mVipInfo/queryOne', {
            //       id: id
            //     }).then(res => {
            //         if ((res.statusCode+"").startsWith("2")) {
            //           res.data.createTime = formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss');
            //           this.formtwoInfo = res.data;
            //         }
            //      })
            //   },
            handleSizeChange(val) {
                this.pageSize = val;
                this.dataList();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.dataList();
            },
        },

    }
</script>
<style type="text/css">

  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }

  .el-input--suffix .el-input__inner {
    padding-right: 0;
  }

  .vip-manage-wrap {
    width: 100%;
  }

  .vip-manage-inner {
    margin: auto;
    padding: 0 20px;
  }

  .vip-manage-header {
    margin-bottom: 20px;
  }

  .vip-manage-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .vip-manage-table {
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
</style>
