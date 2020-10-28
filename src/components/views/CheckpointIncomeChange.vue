<template>
  <div class="vip-manage-wrap">
    <div class="vip-manage-inner">
      <div class="vip-manage-header">
        <h3>运营管理/闯关收益转余额记录</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户id:">
            <el-input v-model="formInline.user_id" placeholder="请输入用户id" clearable></el-input>
          </el-form-item>
          <el-form-item label="用户姓名:">
            <el-input v-model="formInline.realName" placeholder="请输入用户姓名" clearable></el-input>
          </el-form-item>

          <el-button type="primary" plain @click="search()">查询</el-button>
        </el-form>
      </div>
      <div class="vip-manage-table">
        <template>
          <el-table :data="tableData" style="width: 100%" max-height="600"  >
            <el-table-column fixed="left" label="用户id" type="index" prop="user_id" width='250'>
            </el-table-column>
            <el-table-column fixed="left" label="用户姓名" type="index" prop="userName" width='250'>
            </el-table-column>
            <el-table-column fixed="left" label="转换金额" type="index" prop="amount" width='250'>
            </el-table-column>
			 <el-table-column fixed="left" label="转换时间" type="index" prop="createTime" width='250'>
            </el-table-column>
          </el-table>
        </template>

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
    name: 'CheckpointIncomeChange',
    data() {
      return {
		selectCreateTime:'',
		dialogTableDetail:false,
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
