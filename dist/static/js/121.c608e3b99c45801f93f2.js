webpackJsonp([121],{"7bdW":function(t,e){},NMrE:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("xT6B"),s={name:"SysTaskLog",data:function(){return{formInline:{accountId:""},menuId:"",tableData:[],loading:!1}},created:function(){this.menuId=this.$route.query.id},methods:{dateFormat:function(t,e){var a=t[e.property];return void 0==a?"":Object(n.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},search:function(){this.formInline.accountId?this.accountList():this.$message({type:"warning",message:"请输入用户Id进行查询",duration:3e3})},indexMethod:function(t){return 1*t+1},accountList:function(){var t=this;this.loading=!0;var e={accountId:this.formInline.accountId};this.$fetch("/api/lUserTask/list",e).then(function(e){(e.statusCode+"").startsWith("2")?(t.tableData=e.data.list,e.data.list&&(t.loading=!1)):(t.$message({type:"error",message:e.message,duration:3e3}),t.loading=!1)})}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sys-task-log-wrap"},[a("div",{staticClass:"sys-task-log-inner"},[t._m(0),t._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[a("el-form-item",{attrs:{label:"用户Id:"}},[a("el-input",{attrs:{placeholder:"请输入用户Id",clearable:""},model:{value:t.formInline.accountId,callback:function(e){t.$set(t.formInline,"accountId",e)},expression:"formInline.accountId"}})],1),t._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.search()}}},[t._v("查询")])],1)],1),t._v(" "),a("div",{staticClass:"no-tip"},[t._v("默认初始无数据，请输入用户Id查询即可！")])],1),t._v(" "),a("div",{staticClass:"sys-task-log-table"},[[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"table-th",staticStyle:{width:"100%"},attrs:{data:t.tableData,"max-height":"560"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:t.indexMethod,width:"80"}}),t._v(" "),a("el-table-column",{attrs:{width:"200px",fixed:"left",prop:"accountId",label:"用户Id"}}),t._v(" "),a("el-table-column",{attrs:{width:"200px",prop:"taskId",label:"任务Id"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"240px",prop:"taskName",label:"任务名称"}}),t._v(" "),a("el-table-column",{attrs:{width:"170px",formatter:t.dateFormat,prop:"createTime",label:"创建时间"}})],1)]],2)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"sys-task-log-header"},[e("h3",[this._v("系统任务/系统任务记录")]),this._v(" "),e("hr")])}]};var l=a("VU/8")(s,i,!1,function(t){a("7bdW")},null,null);e.default=l.exports}});