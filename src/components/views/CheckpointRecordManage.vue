<template>
  <div class="vip-manage-wrap">
    <div class="vip-manage-inner">
      <div class="vip-manage-header">
        <h3>运营管理/闯关记录</h3>
        <hr/>
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户id:">
            <el-input v-model="formInline.user_id" placeholder="请输入用户id" clearable></el-input>
          </el-form-item>
          <!-- <el-form-item label="用户姓名:">
            <el-input v-model="formInline.realName" placeholder="请输入用户姓名" clearable></el-input>
          </el-form-item> -->
          <el-form-item label="关卡数:">
            <el-input v-model="formInline.checkpoint_number" placeholder="请输入关卡数" clearable></el-input>
          </el-form-item>
          <el-form-item label="关卡状态" prop="state">
            <el-select v-model="formInline.status" style="width:90%;">
              <el-option label="请选择" value=""></el-option>
              <el-option label="未接取" value="0"></el-option>
              <el-option label="闯关中" value="1"></el-option>
              <el-option label="已过关" value="2"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="闯关时间:">
            <el-date-picker
              v-model="selectCreateTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="闯关时间"
              end-placeholder="闯关时间"
              align="left">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="闯关完成时间:">
            <el-date-picker
              v-model="selectEndTime"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="闯关完成时间"
              end-placeholder="闯关完成时间"
              align="left">
            </el-date-picker>
          </el-form-item>


          <el-button type="primary" plain @click="search()">查询</el-button>
        </el-form>
      </div>
      <div class="vip-manage-table">
        <template>
          <el-table :data="tableData" style="width: 100%" max-height="600">
            <el-table-column fixed="left" label="用户id" prop="account_id" width='120'>
            </el-table-column>

            <el-table-column label="关卡数" prop="checkpoint_number" width='120'>
            </el-table-column>
            <el-table-column label="当前关已获得金币数" prop="current_coin" width='120'>
            </el-table-column>
            <el-table-column label="当前关已完成游戏数" prop="current_games" width='120'>
            </el-table-column>
            <el-table-column label="当前关已邀请过关人数" prop="current_invite" width='120'>
            </el-table-column>
            <el-table-column label="当前关邀请人总过关数" prop="current_points" width='120'>
            </el-table-column>
            <el-table-column label="当前关已完成视频数" prop="current_videos" width='120'>
            </el-table-column>
            <el-table-column label="过关奖励" prop="reward_amount" width='120'>
            </el-table-column>
            <el-table-column min-width="170" label="状态">
              <template slot-scope="scope">
                <span class="red" v-if="scope.row.state==0">未接取</span>
                <span class="yellow" v-if="scope.row.state==1">闯关中</span>
                <span class="green" v-if="scope.row.state==2">已过关</span>
              </template>
            </el-table-column>
            <el-table-column :formatter="dateFormat" fixed="right" label="闯关开始时间" prop="create_time" width='120'>
            </el-table-column>
            <el-table-column :formatter="dateFormat" label="闯关完成时间" prop="end_time" width='120'>
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getDetail(scope.row.id)" size="mini">详情</el-button>
              </template>
            </el-table-column>

          </el-table>
        </template>


        <el-dialog title="过关详情" :visible.sync="dialogTableDetail" width="900px">
          <el-form :model="formtwoInfo">
            <el-row>
              <div class="box_xinxi">
                <div class="wrap_da">
                  <div class="header">
                    <span>邀请好友过关详情</span>
                    <span></span>
                  </div>
                  <div v-for="(item,index) in detailInfo" :key="index" :value="item.id" class="body_list"
                       style="width: 100%">
                    <div class="title">好友{{index}}</div>
                    <div class="name">
                      过关时间{{index}}
                    </div>
                  </div>
                  <div class="header">
                    <span>获取金币过关详情</span>
                    <span></span>
                  </div>
                  <div v-for="(item,index) in detailInfo" :key="index" :value="item.id" class="body_list"
                       style="width: 100%">
                    <div class="title">平台{{index}}</div>
                    <div class="name">
                      过关时间{{index}}
                    </div>
                  </div>
                </div>
              </div>
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
    import {formatDate} from '../../utils/date.js'
    import {delSession, getSession} from '../../utils/cookie'
    import BigImg from './BigImg'

    export default {
        name: 'CheckpointRecordManage',
        data() {
            return {
                selectCreateTime: '',
                selectEndTime: '',
                dialogTableDetail: false,
                /* 分页*/
                currentPage: 1,
                pageSize: 10,
                totalCount: 0,
                formInline: {},
                tableData: [],
                isSubmit: false,
                detailInfo: [1, 2, 3],
            }
        },
        components: {
            'big-img': BigImg
        },
        created() {
            this.menuId = this.$route.query.id;
            this.dataList();
        },
        methods: {
            dateFormat(row, column) {
                var date = row[column.property]
                if (date == undefined) {
                    return ''
                }
                return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
            },
            dataList() {
                console.log(this.selectCreateTime)
                let parameterData = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    name: this.formInline.name,
                    status: this.formInline.status,
                    user_id: this.formInline.user_id,
                    checkpoint_number: this.formInline.checkpoint_number,
                    start_create_time: new Date(this.selectCreateTime[0]).getTime()||null,
                    end_create_time: new Date(this.selectCreateTime[1]).getTime()||null,
                    start_end_time: new Date(this.selectEndTime[0]).getTime()||null,
                    end_end_time: new Date(this.selectEndTime[1]).getTime()||null,
                };
                console.log(parameterData);
                this.$fetch('/py/checkpointrecord/list', parameterData).then(res => {
                    if (res) {
                        this.tableData = res.data;
                        this.totalCount = res.total;
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


            addBtn(form) {
                this.form.imageUrl = this.imageUrl;
                this.form.overdueImg = this.overdueImg;
                this.form.logo = this.imageUrl;
                this.form.backgroundImg = this.backgroundImg;
                this.$refs[form].validate(valid => {
                    if (valid) {
                        if (!this.form.logo) {
                            this.$message({type: 'error', message: '请上传logo！'})
                            return
                        }
                        if (!this.form.backgroundImg) {
                            this.$message({type: 'error', message: '请上传背景图！'})
                            return
                        }
                        if (!this.form.overdueImg) {
                            this.$message({type: 'error', message: '请上传过期logo！'})
                            return
                        }
                        this.$nextTick(function () {
                            this.isSubmit = true;
                        })
                        this.$post('/api/mVipInfo/add', this.form).then(res => {
                            if ((res.statusCode + "").startsWith("2")) {
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
                this.$fetch('/api/mVipInfo/remove', parameterData).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        this.$message({
                            type: 'success',
                            message: '删除成功！'
                        })
                        this.dataList()
                    } else {
                        this.$message({
                            type: 'error',
                            message: '删除失败！'
                        })
                    }
                })
            },
            getInfo(id) {
                this.imageUrl = '';
                this.backgroundImg = '';
                this.overdueImg = '';
                this.dialogTableVisible = true
                this.$fetch('/api/mVipInfo/queryOne', {
                    id: id
                }).then(res => {
                    if ((res.statusCode + "").startsWith("2")) {
                        this.formtwo = res.data;
                        this.imageUrl = res.data.logo;
                        this.backgroundImg = res.data.backgroundImg;
                        this.overdueImg = res.data.overdueImg;
                    }
                })
            },
            update(formtwo) {
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
            //该关过关详情
            getDetail(id) {
                this.dialogTableDetail = true;
                this.$message({
                    type: 'error',
                    message: '接口暂未接通',
                    duration: 3000
                })
                // this.$fetch('/api/mVipInfo/queryOne', {
                //   id: id
                // }).then(res => {
                //     if ((res.statusCode+"").startsWith("2")) {
                //       res.data.createTime = formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss');
                //       this.formtwoInfo = res.data;
                //     }
                //  })
            },
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
