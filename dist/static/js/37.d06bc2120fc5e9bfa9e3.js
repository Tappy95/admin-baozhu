webpackJsonp([37],{"0j56":function(e,t){},"N+kr":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("xT6B"),i={name:"NewsRemind",data:function(){return{currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[]}},created:function(){this.menuId=this.$route.query.id,this.accountList()},methods:{indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(n.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,accountId:this.formInline.accountId};this.$fetch("/api/noticeReady/list",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total):e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"news-remind-wrap"},[a("div",{staticClass:"news-remind-inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"用户Id:"}},[a("el-input",{attrs:{placeholder:"请输入用户Id",clearable:""},model:{value:e.formInline.accountId,callback:function(t){e.$set(e.formInline,"accountId",t)},expression:"formInline.accountId"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"news-remind-table"},[[a("el-table",{attrs:{data:e.tableData,"max-height":"556"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"120"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"left",prop:"accountId",label:"用户Id"}}),e._v(" "),a("el-table-column",{attrs:{label:"提醒类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.noticeType?a("span",[e._v("每日红包提醒")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"createTime",formatter:e.dateFormat,label:"创建时间"}})],1)]],2),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"news-remind-header"},[t("h3",[this._v("消息管理/消息提醒")]),this._v(" "),t("hr")])}]};var s=a("VU/8")(i,r,!1,function(e){a("0j56")},null,null);t.default=s.exports}});