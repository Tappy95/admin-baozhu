<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>第三方/游戏列表</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item  label="游戏id:">
            <el-input v-model="formInline.gameId" placeholder="请输入游戏id" clearable></el-input>
          </el-form-item>
          <el-form-item label="游戏标题:">
            <el-input v-model="formInline.gameTitle" placeholder="请输入游戏标题" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态:" >
            <el-select v-model="formInline.status"   placeholder="请选择状态">
              <el-option label="正常" value="1"></el-option>
              <el-option label="下架" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏方名称:" >
            <el-select v-model="formInline.interfaceId"   placeholder="请选择游戏方名称">
              <el-option :key="item.id" v-for="item in gameList" :label="item.name" :value="item.id"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item> <el-button type="primary" plain @click="search()">查询</el-button></el-form-item>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="556">
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='80'>
            </el-table-column>
            <el-table-column width="170px" fixed="left" prop="gameId" label="游戏id">
            </el-table-column>
            <el-table-column prop="gameTitle"   label="游戏标题">
            </el-table-column>
            <el-table-column width="200px" prop="gameGold" label="奖励金额(￥)">
            </el-table-column>
            <el-table-column prop="packageName" label="游戏包名">
            </el-table-column>
            <el-table-column width="150" prop="orderId" label="排序">
            </el-table-column>
            <el-table-column  width="150px" label="状态">
              <template slot-scope="scope">
                <span class="onCZ" v-if="scope.row.status==1">正常</span>
                <span class="onCX" v-if="scope.row.status==2">下架</span>
              </template>
            </el-table-column>
            <el-table-column fixed="right" prop="status"  label="操作" v-if="showW" :width="optionW">
            <template slot-scope="scope">
              <el-button type="warning" plain size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
              <el-button type="danger" plain size="mini" @click="getStatus(scope.row.id,2)" v-if="scope.row.status==1 && UpperShelf">下架</el-button>
              <el-button type="success" plain size="mini" @click="getStatus(scope.row.id,1)" v-if="scope.row.status==2 && UpperShelf">上架</el-button>
              <el-button type="success" plain size="mini" @click="getInfo(scope.row.id)" v-if="upd">修改</el-button>
              <el-button type="primary" plain size="mini" @click="tagsTap(scope.row.id)" v-if="tags">标签</el-button>
            </template>
          </el-table-column>
          </el-table>
        </template>
      </div>
      <el-dialog title="设置标签" :visible.sync="dialogTableTags" width="700px">
        <el-row>
          <el-checkbox-group text-color="#1fa67a" fill="#1fa67a" v-model="checkList">
            <el-checkbox v-for="item in lableList" :key="item.index" :label="item.id">{{item.typeName}}</el-checkbox>
          </el-checkbox-group>
        </el-row>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="tagSet()">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="修改" :visible.sync="dialogTableVisible" width="600px">
        <el-form :model="formtwo" ref="formtwo" :rules="rules">
          <el-row>
            <el-col :span="18">
              <el-form-item label="游戏标题:"  :label-width="formLabelWidth">
                <el-input :disabled="true" v-model.number="formtwo.gameTitle" auto-complete="off" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="排序:" prop="orderId" :label-width="formLabelWidth">
                <el-input  v-model="formtwo.orderId" auto-complete="off" clearable></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item >
                <span  class="xu-tip">排序值越大,游戏越靠前</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="update('formtwo')">确 定</el-button>
        </div>
      </el-dialog>
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
    name: 'SignList',
    data() {
      return {
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        message:{},
        menuId:'',
        del:false,
        UpperShelf:false,
        optionW:'0',
        showW:false,
        upd:false,
        tags:false,
        gameList:[],
        lableList:[],
        dialogTableVisible:false,
        dialogTableTags:false,
        formtwo:{},
        currentId:'',
        checkList:'',
        rules: {
      // { type: 'number', message: '请输入数字值'}
          orderId:[{required: true, message: '请输入排序', trigger: 'blur'}],
        },
      }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.gameData();
      this.accountList();
      this.gameTags();
    },
    methods: {
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              this.showW = true;
              if(res.data[i].btnCode == 'del') {
                this.del=true;
              }
              if(res.data[i].btnCode == 'tags') {
                this.tags=true;
              }
              if(res.data[i].btnCode == 'UpperShelf') {
                this.UpperShelf=true;
              }
              if(res.data[i].btnCode == 'upd') {
                this.upd=true;
              }
              if (res.data.length==1){
                this.optionW = '75';
              } else if (res.data.length==2){
                this.optionW = '150';
              }else if (res.data.length==3){
                this.optionW = '225';
              }else if (res.data.length==4){
                this.optionW = '295';
              }
            }
          } else {
            this.showW = false;
            // this.optionW = '1px';
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
      //游戏方名称
      gameData(){
        this.$fetch('/api/tpInterface/listDown').then(res => {
          if ((res.statusCode + "").startsWith("2")) {
               this.gameList = res.data;
          }
        })
      },

      //游戏标签
      gameTags(){
        this.$fetch('/api/tpGameType/optionList', {
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.lableList= res.data;
          }
        })
      },
      tagsTap(id) {
        this.currentId = id;
        this.dialogTableTags = true;
        // /infoLabel/gameInfoList 参数 gameId
        this.$fetch('/api/gameRelationType/listType', {
          gameId:id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.checkList= res.data;
          }
        })
      },

      //设置标签
      tagSet(){
        let labels = '';
        if (this.checkList){
          labels = this.checkList.join(',');
        }
        let parameterData = {
          gameId:this.currentId,
          labelIds: labels
        }
        this.$post('/api/gameRelationType/update', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.dialogTableTags = false;
            this.accountList();
            this.$message({type: 'success', message: '设置标签成功'})
          }else {
            this.$message({type: 'error', message: res.message})
          }
        })
      },

      //列表
      accountList() {
        let parameterData = {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            gameId:this.formInline.gameId,
            gameTitle:this.formInline.gameTitle,
            status:this.formInline.status,
            interfaceId:this.formInline.interfaceId
          }

          this.$fetch('/api/tpGame/queryBList', parameterData).then(res => {
            if ((res.statusCode+"").startsWith("2")) {
              this.tableData = res.data.list;
              this.totalCount = res.data.total;
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
        }
      })
      },
      getStatus(id,status){
        let parameterData = {
          id:id,
          status:status
        }
        this.$post('/api/tpGame/modify', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({ type: 'success', message: res.message });
            this.accountList();
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },
      //点修改获取信息
      getInfo(id){
        this.currentId = id;
        this.$fetch('/api/tpGame/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            this.dialogTableVisible = true;
            this.formtwo = res.data;
          } else {
          }
        })
      },

      update(formtwo){
        var pattern = /^[0-9]*$/;
        if (!pattern.test(this.formtwo.orderId)) {
          this.$message({ type: 'warning', message: '排序值为正整数'});
          return false
        }
        this.$refs[formtwo].validate(valid => {
          if (valid) {
            let parDate = {
              id:this.currentId,
              orderId:this.formtwo.orderId
            }
            this.$post('/api/tpGame/modify',parDate).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogTableVisible = false;
                this.$message({ type: 'success', message: '修改成功！' });
                this.accountList();
              }else {
                this.$message({ type: 'error', message: res.message });
              }
            })
          } else {
          }
        })
      },

      Delete(id) {
        this.$confirm('此操作将永久删除游戏, 是否继续?', '提示', {
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
        this.$fetch('/api/tpGame/remove', {
          id: id
        }).then(res => {
          if ((res.statusCode + "").startsWith("2")) {
            this.$message({type: 'success', message: '删除成功！'})
            this.accountList()
          } else {
          }
        })
      },
      search(){
        this.currentPage = 1;
        this.pageSize = 10;
        this.accountList()
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
  .onCZ{
    color: #67c23a;
  }

  .onCX{
    color: #f56c6c;
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

  .xu-tip{
    font-size: 12px;
    color: #F56C6C;
    margin-left: 10px;
  }
</style>
