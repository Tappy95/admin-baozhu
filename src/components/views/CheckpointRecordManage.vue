<template>
  <div class="vip-manage-wrap">
    <div class="vip-manage-inner">
      <div class="vip-manage-header">
        <h3>运营管理/闯关记录</h3>
        <hr />
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
		  <el-form-item label="关卡状态" prop="state" >
            <el-select v-model="formInline.status" style="width:90%;">
              <el-option label="请选择" value=""></el-option>
              <el-option label="闯关中" value="0"></el-option>
              <el-option label="已过关" value="1"></el-option>
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
          <el-table :data="tableData" style="width: 100%" max-height="600"  >
            <el-table-column fixed="left" label="用户id" type="index" prop="user_id" width='120'>
            </el-table-column>
            <el-table-column fixed="left" label="闯关开始时间" type="index" prop="create_time" width='120'>
            </el-table-column>
            <el-table-column fixed="left" label="闯关完成时间" type="index" prop="end_time" width='120'>
            </el-table-column>
            <el-table-column fixed="left" label="关卡数" type="index" prop="checkpointNumber" width='120'>
            </el-table-column>
            <el-table-column fixed="left" label="过关奖励" prop="rewardAmount" width='120'>
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
            <el-row >
              <div class="box_xinxi">
                <div class="wrap_da">
					<div class="header">
						<span>邀请好友过关详情</span>
						<span></span>
					</div>
				<div v-for="(item,index) in detailInfo" :key="index" :value="item.id" class="body_list" style="width: 100%">
					<div class="title">好友{{index}}</div>
					<div class="name">
						过关时间{{index}}
					</div>
				</div>
				<div class="header">
					<span>获取金币过关详情</span>
					<span></span>
				</div>
				<div v-for="(item,index) in detailInfo" :key="index" :value="item.id" class="body_list" style="width: 100%">
					<div class="title">平台{{index}}</div>
					<div class="name">
						过关时间{{index}}
					</div>
				</div>




                  <!-- <div class="header">
                    <span>过关详情</span>
                    <span></span>
                  </div>
                  <div class="body_list" style="width: 100%">
                    <div class="title">vip名称:</div>
                    <div class="name">
                      {{formtwoInfo.name}}
                    </div>
                  </div>
                  <div class="body_list">
                    <div class="title">vip类型:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.vipType==1">普通vip</span>
                      <span v-if="formtwoInfo.vipType==2">中青赚点</span>
                    </div>
                  </div>

                  <div class="body_list" >
                    <div class="title">售价:</div>
                    <div class="name">
                      {{formtwoInfo.price}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">游戏加成(%):</div>
                    <div class="name">
                      {{formtwoInfo.gameAddition}}
                    </div>
                  </div>
                  <div class="body_list">
                    <div class="title">有效期(单位/天):</div>
                    <div class="name">
                      {{formtwoInfo.useDay}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">等级排序(值越大等级越高):</div>
                    <div class="name">
                      {{formtwoInfo.orderId}}
                    </div>
                  </div>
                  <div class="header">
                    <span>充值奖励</span>
                    <span></span>
                  </div>
                  <div class="body_list" >
                    <div class="title">首充奖励:</div>
                    <div class="name">
                      {{formtwoInfo.firstReward | currenNum}}
                    </div>
                  </div>
                  <div class="body_list">
                    <div class="title">首充奖励类型:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.firstRewardUnit==1">金币</span>
                      <span v-if="formtwoInfo.firstRewardUnit==2">金猪</span>
                    </div>
                  </div>
                  <div class="body_list">
                    <div class="title">续充奖励:</div>
                    <div class="name">
                      {{formtwoInfo.continueReward | currenNum}}
                    </div>
                  </div>
                  <div class="body_list">
                    <div class="title">续充奖励类型:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.continueRewardUnit==1">金币</span>
                      <span v-if="formtwoInfo.continueRewardUnit==2">金猪</span>
                    </div>
                  </div>
                  <div class="header">
                    <span>每日</span>
                    <span></span>
                  </div>
                  <div class="body_list" >
                    <div class="title">每日活跃奖励金猪:</div>
                    <div class="name">
                      {{formtwoInfo.everydayActivePig | currenNum}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">每日活跃奖励金币:</div>
                    <div class="name">
                      {{formtwoInfo.everydayActiveCoin | currenNum}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">每日救济金猪:</div>
                    <div class="name">
                      {{formtwoInfo.everydayReliefPig | currenNum}}
                    </div>
                  </div>

                  <div class="body_list" >
                    <div class="title">救济金猪每日领取次数:</div>
                    <div class="name">
                      {{formtwoInfo.everydayReliefPigTimes}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">奖励天数:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.rewardDay==-1">无限制</span>
                      <span v-else>{{formtwoInfo.rewardDay}}</span>
                    </div>
                  </div>
                  <div class="header">
                    <span>其他信息</span>
                    <span></span>
                  </div>
                  <div class="body_list" >
                    <div class="title">单笔限额(金猪):</div>
                    <div class="name">
                      {{formtwoInfo.onetimeLimit | currenNum}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">兑换是否优先审核:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.auditFirst==1">是</span>
                      <span v-if="formtwoInfo.auditFirst==2">否</span>
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">兑换是否短信提醒:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.auditFirst==1">是</span>
                      <span v-if="formtwoInfo.auditFirst==2">否</span>
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">是否一元提现:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.oneWithdrawals==1">是</span>
                      <span v-if="formtwoInfo.oneWithdrawals==2">否</span>
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">是否可用:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.status==1">是</span>
                      <span v-if="formtwoInfo.status==2">否</span>
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">是否为高额赚VIP:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.highVip==1">不是</span>
                      <span v-if="formtwoInfo.highVip==2">是</span>
                    </div>
                  </div>

                  <div class="body_list" >
                    <div class="title">可提现金额(元):</div>
                    <div class="name">
                      <span v-if="formtwoInfo.cashMoney==-1">无限制</span>
                      <span v-else>{{formtwoInfo.cashMoney}}</span>
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">金币兑换金猪加成(%):</div>
                    <div class="name">
                      {{formtwoInfo.coinToPigAddition}}
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">是否需要完成任务:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.isTask==1">是</span>
                      <span v-if="formtwoInfo.isTask==2">否</span>
                    </div>
                  </div>
                  <div class="body_list" >
                    <div class="title">是否可以续费:</div>
                    <div class="name">
                      <span v-if="formtwoInfo.isRenew==1">是</span>
                      <span v-if="formtwoInfo.isRenew==2">否</span>
                    </div>
                  </div>

                  <div class="body_list" >
                    <div class="title">退款vipId:</div>
                    <div class="name">
                      <el-select :disabled="true" v-model="formtwoInfo.returnVip" placeholder="">
                        <el-option label="不需要" :value="-1"></el-option>
                        <el-option v-for="(item,index) in zqVipList" :key="index" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </div>
                  </div>

                  <div class="header">
                    <span>图片</span>
                    <span></span>
                  </div>

                  <div  class="body_list img" style="width: 100%;height:140px;border: none" >
                    <div class="title" style="float: left;">logo:</div>
                    <div class="img_box" style="width: 600px;float: left;">
                      <div @click="clickImg(formtwoInfo.logo)" v-if="formtwoInfo.logo"   class="more_img">
                        <img  :src="formtwoInfo.logo"  />
                      </div>
                    </div>
                  </div>

                  <div  class="body_list img" style="width: 100%;height:140px;border: none" >
                    <div class="title" style="float: left;">过期logo:</div>
                    <div class="img_box" v-if="formtwoInfo.overdueImg " style="width: 600px;float: left;">
                      <div @click="clickImg(formtwoInfo.overdueImg )"    class="more_img">
                        <img  :src="formtwoInfo.overdueImg "  />
                      </div>
                    </div>
                  </div>

                  <div  class="body_list img" style="width: 100%;height:140px;border: none" >
                    <div class="title" style="float: left;">背景图:</div>
                    <div class="img_box" style="width: 600px;float: left;">
                      <div @click="clickImg(formtwoInfo.backgroundImg)" v-if="formtwoInfo.backgroundImg"   class="more_img">
                        <img  :src="formtwoInfo.backgroundImg"  />
                      </div>
                    </div>
                  </div> -->










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
  import { formatDate } from '../../utils/date.js'
  import { delSession, getSession } from '../../utils/cookie'
  import BigImg from './BigImg'
  export default {
    name: 'CheckpointRecordManage',
    data() {
      return {
		selectCreateTime:'',
		selectEndTime:'',
		dialogTableDetail:true,
        /* 分页*/
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
		isSubmit:false,
		detailInfo:[1,2,3],
      }
    },
    components: {
      'big-img': BigImg
    },
    created() {
      this.menuId=this.$route.query.id;
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
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          name: this.formInline.name,
          status: this.formInline.status
		}
		this.$message({
			type: 'error',
			message: '接口暂未接通',
			duration: 3000
		})
		return false;
    //     this.$fetch('/api/mVipInfo/list', parameterData).then(res => {
    //       if ((res.statusCode+"").startsWith("2")) {
    //       for(let i = res.data.list.length - 1; i >= 0; i--) {
    //         if(res.data.list[i].status == '1') {
    //           res.data.list[i].status = '是'
    //         } else {
    //           res.data.list[i].status = '否'
    //         }
    //         if(res.data.list[i].highVip == '1') {
    //           res.data.list[i].highVip = '不是'
    //         } else {
    //           res.data.list[i].highVip = '是'
    //         }
    //       }
    //       this.tableData = res.data.list
    //       this.totalCount = res.data.total
    //     } else {
    //       this.$message({
    //         type: 'error',
    //         message: res.message,
    //         duration: 3000
    //       })
    //     }
    //   })
      },
      search() {
        this.currentPage = 1;
        this.pageSize = 10;
        this.dataList();
      },


      addBtn(form) {
        this.form.imageUrl=this.imageUrl;
        this.form.overdueImg=this.overdueImg;
        this.form.logo=this.imageUrl;
        this.form.backgroundImg=this.backgroundImg;
        this.$refs[form].validate(valid => {
          if(valid) {
            if (!this.form.logo){
              this.$message({type: 'error', message: '请上传logo！'})
              return
            }
            if (!this.form.backgroundImg){
              this.$message({type: 'error', message: '请上传背景图！'})
              return
            }
            if (!this.form.overdueImg){
              this.$message({type: 'error', message: '请上传过期logo！'})
              return
            }
            this.$nextTick(function () {
              this.isSubmit=true;
            })
            this.$post('/api/mVipInfo/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
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
                this.isSubmit=false;
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
        this.$fetch('/api/mVipInfo/remove', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
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
        this.imageUrl='';
        this.backgroundImg='';
        this.overdueImg ='';
        this.dialogTableVisible = true
        this.$fetch('/api/mVipInfo/queryOne', {
          id: id
        }).then(res => {
            if ((res.statusCode + "").startsWith("2")) {
              this.formtwo = res.data;
              this.imageUrl=res.data.logo;
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
        this.formtwo.logo=this.imageUrl;
        this.formtwo.backgroundImg = this.backgroundImg;
        this.formtwo.overdueImg = this.overdueImg;
        this.$refs[formtwo].validate(valid => {
          if (valid) {
            if (!this.formtwo.logo){
              this.$message({type: 'error', message: '请上传logo！'})
              return
            }
            if (!this.formtwo.backgroundImg){
              this.$message({type: 'error', message: '请上传背景图！'})
              return
            }

            if (!this.formtwo.overdueImg){
              this.$message({type: 'error', message: '请上传过期logo！'})
              return
            }

            this.$post('/api/mVipInfo/modify', this.formtwo).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.$message({type: 'success', message: '修改成功！'})
              this.dialogTableVisible = false;
              this.dataList()
            }else {
                this.$message({type: 'error', message: res.message})
              }
            })
          }
        })
	  },
	  //该关过关详情
      getDetail(id){
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
  .avatar{
     width: 148px;
    height: 148px;
    display: block;
  }
  .el-input--suffix .el-input__inner{
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
