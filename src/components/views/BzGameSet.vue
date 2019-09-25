<template>
  <div class="bz-play-set-wrap">
    <div class="bz-play-set-inner">
      <div class="bz-play-set-header">
        <h3>宝猪28/游戏设置</h3>
        <hr />
      </div>
      <div class="bz-play-set-table">
        <el-row>
          <el-col :span="20">
            <div class="data-list">
              <el-row>
                <el-col><div class="name">宝猪28</div></el-col>
              </el-row>

                <el-row>
                  <el-col :span="2">
                    <div class="logo">
                      <img src="../../assets/statistics/login_num.png"/>
                    </div>
                  </el-col>
                  <el-col :span="17">
                    <div class="d-box">
                      <div class="list">
                        <div class="title">名称</div>
                        <div class="dec">大幅度发</div>
                      </div>
                      <div class="list">
                        <div class="title">来源</div>
                        <div class="dec">大幅度发</div>
                      </div>
                      <div class="list">
                        <div class="title">每期时间(s)</div>
                        <div class="dec">大幅度发</div>
                      </div>
                      <div class="list">
                        <div class="title">暂停时间(s)</div>
                        <div class="dec">大幅度发</div>
                      </div>
                      <div class="list">
                        <div class="title">是否显示</div>
                        <div class="dec">大幅度发</div>
                      </div>
                      <div class="list">
                        <div class="title">状态</div>
                        <div class="dec">大幅度发</div>
                      </div>
                      <div class="list">
                        <div class="title">是否启用机器人</div>
                        <div class="dec">大幅度发</div>
                      </div>
                      <div class="list">
                        <div class="title">排序</div>
                        <div class="dec">大幅度发</div>
                      </div>
                      <div class="list">
                        <div class="title">门槛(￥)</div>
                        <div class="dec">大幅度发</div>
                      </div>
                      <div class="list">
                        <div class="title">权限</div>
                        <div class="dec">大幅度发</div>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="5">
                    <div class="d-option">
                      <el-button type="success" size="small">规则</el-button>
                      <el-button type="warning" size="small">编辑</el-button>
                      <el-button type="danger" @click="robot" size="small">设置机器人</el-button>
                    </div>
                  </el-col>
                </el-row>
            </div>
          </el-col>
        </el-row>

        <el-dialog title="设置机器人" :visible.sync="dialogFormVisible" width="1000px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="24">
                <el-form-item label="机器人进入时间间隔(s)" label-width="180px" prop="playType">
                  <el-input :style="styleW" v-model="form.playType" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>

                <div class="play_type">
                   <div class="list1 list">
                     <div class="item">玩法</div>
                     <div class="item">0</div>
                     <div class="item">1</div>
                     <div class="item">2</div>
                     <div class="item">3</div>
                     <div class="item">4</div>
                     <div class="item">5</div>
                     <div class="item">6</div>
                     <div class="item">7</div>
                     <div class="item">8</div>
                     <div class="item">9</div>
                     <div class="item">10</div>
                     <div class="item">11</div>
                     <div class="item">12</div>
                     <div class="item">13</div>
                   </div>
                    <div class="list">
                      <div class="item">概率(%)</div>
                      <div class="item"><input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                      <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    </div>
                </div>

                <div class="play_type">
                  <div class="list1 list">
                    <div class="item">玩法</div>
                    <div class="item">27</div>
                    <div class="item">26</div>
                    <div class="item">25</div>
                    <div class="item">24</div>
                    <div class="item">23</div>
                    <div class="item">22</div>
                    <div class="item">21</div>
                    <div class="item">20</div>
                    <div class="item">19</div>
                    <div class="item">18</div>
                    <div class="item">17</div>
                    <div class="item">16</div>
                    <div class="item">15</div>
                    <div class="item">14</div>
                  </div>
                  <div class="list">
                    <div class="item">概率(%)</div>
                    <div class="item"><input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                    <div class="item"> <input class="sel-input"  v-model="form.playType"/></div>
                  </div>
                </div>

              </el-col>
            </el-row>

          </el-form>
        </el-dialog>

      </div>
      <div class="block" style="display: none;">
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
        styleW:{
          width:'200px'
        },
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {},
        imageUrl:'',
        rules: {
          playType: [{required: true, message: '请输入玩法个数', trigger: 'blur'}],
          probability: [
            {required: true, message: '请输入概率', trigger: 'blur'},
            {validator:(rule,value,callback)=>{
                var pattern = /^[0-9]*$/;;
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
    components: {
      'big-img': BigImg
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
                this.del=true;
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
      getInfo(id) {
        this.dialogTableVisible = true
        this.$fetch('/bz28/lotteryRobotPlayed/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
          }
        })
      },

      //设置机器人
      robot(){
        this.dialogFormVisible = true;
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
  .bz-play-set-wrap{
    background-color: #fafafa;
    height:100vh;
    position: initial;
    /*padding: 20px;*/
    border: 1px solid blue;
  }
  .data-list{
    width: 100%;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(150,150,150,0.3);
    padding: 30px 0px 20px 40px;
    margin: 0 auto;
  }

  .data-list .name{
    font-size: 16px;
    color: #606266;
    margin-bottom: 10px;
  }
  .data-list .logo{
    width: 50px;
    height: 50px;
    margin: 10px 0;
    border-radius: 50%;
  }
  .data-list .logo img{
    display: block;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  .data-list .d-box{
    width: 100%;
    height: auto;
  }

  .data-list .d-box .list{
    width: 50%;
    float: left;
    padding-top: 12px;
    display: flex;
    justify-content: flex-start;
    align-content: flex-start;
    align-items: flex-start;
    font-size: 14px;
  }

  .data-list .d-box .list .title{
    width: 120px;
    color: #9a9a9a;
    margin-right: 20px;
  }

  .data-list .d-box .list .dec{
    color: #353535;
  }

  .data-list .d-option{
    width: 100%;
    height: auto;
  }

  .play_type_one{
    /*margin-bottom: 10px;*/
  }
  .play_type{
    width: 100%;
    height: auto;
    border: 1px solid #e7e7eb;
    border-radius: 4px;
    margin-bottom: 10px;
  }

  .play_type .list.list1{
    background-color: #f2f8f9;
  }

  .play_type .list{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    align-self: center;
    height: 30px;
    color: #353535;
    box-sizing: border-box;
  }

  .play_type .list .item{
    width: 64px;
    height: 30px;
    text-align: center;
    /*padding: 5px 10px;*/
    text-align: center;
    line-height: 30px;
  }
  .play_type .list .item:not(:last-child){
    border-right: 1px solid #e7e7eb;
  }

  .play_type .list.list1 .item{
    border-bottom: 1px solid #e7e7eb;
  }

  .sel-input{
    width: 50px;
    border: none;
    height: initial;
    text-align: center;
    padding-left: 5px;
    outline: none;
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
  .bz-play-set-wrap {
    width: 100%;
  }

  .bz-play-set-inner {
    margin: auto;
    padding: 0 20px;
  }

  .bz-play-set-header {
    margin-bottom: 20px;
  }

  .bz-play-set-header hr {
    color: #e6e6e6;
    opacity: 0.5;
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
