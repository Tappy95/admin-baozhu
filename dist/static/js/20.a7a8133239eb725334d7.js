webpackJsonp([20],{AC6Q:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"authoritymanagement-wrap"},[a("div",{staticClass:"authoritymanagement-inner"},[t._m(0),t._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[a("el-form-item",{attrs:{label:"权限名称"}},[a("el-input",{attrs:{placeholder:"",clearable:""},model:{value:t.formInline.name,callback:function(e){t.$set(t.formInline,"name",e)},expression:"formInline.name"}})],1),t._v(" "),a("el-button",{on:{click:function(e){t.search()}}},[t._v("查询")]),t._v(" "),a("el-button",{on:{click:function(e){t.load()}}},[t._v("添加")]),t._v(" "),a("el-dialog",{attrs:{title:"添加权限管理",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules}},[a("el-form-item",{attrs:{label:"权限名称",prop:"rightName"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.rightName,callback:function(e){t.$set(t.form,"rightName",e)},expression:"form.rightName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"权限url",prop:"rightUrl"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.rightUrl,callback:function(e){t.$set(t.form,"rightUrl",e)},expression:"form.rightUrl"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"权限代码",prop:"rightCode"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.rightCode,callback:function(e){t.$set(t.form,"rightCode",e)},expression:"form.rightCode"}})],1),a("br"),t._v(" "),a("el-form-item",{attrs:{label:"请求方式",prop:"methodType"}},[a("el-select",{attrs:{placeholder:""},model:{value:t.form.methodType,callback:function(e){t.$set(t.form,"methodType",e)},expression:"form.methodType"}},[a("el-option",{attrs:{label:"get",value:"get"}}),t._v(" "),a("el-option",{attrs:{label:"post",value:"post"}}),t._v(" "),a("el-option",{attrs:{label:"put",value:"put"}}),t._v(" "),a("el-option",{attrs:{label:"delete",value:"delete"}})],1)],1),t._v(" "),a("el-form-item",{staticStyle:{"margin-left":"18px"},attrs:{label:"描述",prop:"remark"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1),t._v(" "),a("el-form-item",{staticStyle:{"margin-left":"28px"},attrs:{label:"状态",prop:"status"}},[a("el-select",{attrs:{placeholder:""},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[a("el-option",{attrs:{label:"删除",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"正常",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"冻结",value:"2"}})],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addBtn(t.form)}}},[t._v("确 定")])],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"authoritymanagement-table"},[[a("el-table",{attrs:{data:t.tableData,height:"580"}},[a("el-table-column",{attrs:{label:"序号",type:"index",index:t.indexMethod,width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"rightName",label:"权限名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"rightUrl",label:"权限url"}}),t._v(" "),a("el-table-column",{attrs:{prop:"rightCode",label:"权限代码"}}),t._v(" "),a("el-table-column",{attrs:{prop:"methodType",label:"请求方式"}}),t._v(" "),a("el-table-column",{attrs:{prop:"remark",label:"描述"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createUser",label:"创建人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"lastModifyUser",label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.Delete(e.row.id)}}},[t._v("删除")]),t._v(" "),a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.getInfo(e.row.id)}}},[t._v("修改")])]}}])})],1)],t._v(" "),a("el-dialog",{attrs:{title:"修改权限管理",visible:t.dialogTableVisible},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("el-form",{attrs:{model:t.formtwo}},[a("el-form-item",{attrs:{label:"权限名称","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.rightName,callback:function(e){t.$set(t.formtwo,"rightName",e)},expression:"formtwo.rightName"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"权限url","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.rightUrl,callback:function(e){t.$set(t.formtwo,"rightUrl",e)},expression:"formtwo.rightUrl"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"权限代码","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.rightCode,callback:function(e){t.$set(t.formtwo,"rightCode",e)},expression:"formtwo.rightCode"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"请求方式",prop:"methodType","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:""},model:{value:t.formtwo.methodType,callback:function(e){t.$set(t.formtwo,"methodType",e)},expression:"formtwo.methodType"}},[a("el-option",{attrs:{label:"get",value:"get"}}),t._v(" "),a("el-option",{attrs:{label:"post",value:"post"}}),t._v(" "),a("el-option",{attrs:{label:"put",value:"put"}}),t._v(" "),a("el-option",{attrs:{label:"delete",value:"delete"}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"描述","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.remark,callback:function(e){t.$set(t.formtwo,"remark",e)},expression:"formtwo.remark"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态","label-width":t.formLabelWidth}},[a("el-select",{attrs:{placeholder:""},model:{value:t.formtwo.status,callback:function(e){t.$set(t.formtwo,"status",e)},expression:"formtwo.status"}},[a("el-option",{attrs:{label:"删除",value:"0"}}),t._v(" "),a("el-option",{attrs:{label:"正常",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"冻结",value:"2"}})],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.update(t.formtwo)}}},[t._v("确 定")])],1)],1)],2),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,70],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"authoritymanagement-header"},[e("h3",[this._v("系统管理/权限管理")]),this._v(" "),e("hr")])}]};var o=a("VU/8")({name:"AuthorityManagement",data:function(){return{dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,form:{rightName:"",rightUrl:"",rightCode:"",remark:"",status:"1"},rules:{rightName:[{required:!0,message:"请输入权限名称",trigger:"blur"}],rightUrl:[{required:!0,message:"请输入权限url",trigger:"blur"}],rightCode:[{required:!0,message:"请输入权限代码",trigger:"blur"}],remark:[{required:!0,message:"请输入描述",trigger:"blur"}],status:[{required:!0,message:"请选择状态",trigger:"change"}],methodType:[{required:!0,message:"请选择请求方式",trigger:"change"}]},formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[]}},created:function(){this.accountList()},methods:{indexMethod:function(t){return 1*t+1},accountList:function(){var t=this,e={pageNum:this.currentPage,pageSize:this.pageSize,rightName:this.formInline.name};this.$fetch("/api/sysright/list",e).then(function(e){2e3==e.statusCode?(t.tableData=e.data.list,t.totalCount=e.data.total):t.$message({type:"error",message:e.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.dialogFormVisible=!0,this.form.rightName="",this.form.rightUrl="",this.form.rightCode="",this.form.remark="",this.form.id=null,this.formInline={}},addBtn:function(t){var e=this;this.$refs.form.validate(function(t){t&&e.$post("/api/sysright/add",e.form).then(function(t){2e3==t.statusCode&&(e.dialogFormVisible=!1,e.$message({type:"success",message:"添加成功！"}),e.accountList())})})},Delete:function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.delData(t)}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},delData:function(t){var e=this,a={id:t};this.$post("/api/sysright/remove",a).then(function(t){2e3==t.statusCode&&(e.$message({type:"success",message:"删除成功！"}),e.accountList())})},getInfo:function(t){var e=this;this.dialogTableVisible=!0,this.$fetch("/api/sysright/queryRightOne",{id:t}).then(function(t){e.formtwo=t.data})},update:function(t){var e=this;this.$put("/api/sysright/modify",this.formtwo).then(function(t){2e3==t.statusCode&&(e.$message({type:"success",message:"修改成功！"}),e.dialogTableVisible=!1,e.accountList())})},handleSizeChange:function(t){this.pageSize=t,this.accountList()},handleCurrentChange:function(t){this.currentPage=t,this.accountList()}}},l,!1,function(t){a("u7t9")},null,null);e.default=o.exports},u7t9:function(t,e){}});