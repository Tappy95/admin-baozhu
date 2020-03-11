webpackJsonp([48],{"8bCL":function(t,e){},I2fW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=a("bOdI"),s=a.n(o),l=a("xT6B"),r={name:"BzTaskJob",data:function(){var t;return{powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{},rules:(t={jobName:[{required:!0,message:"请输入job名称",trigger:"blur"}],jobGroup:[{required:!0,message:"请输入job组",trigger:"blur"}],triggerName:[{required:!0,message:"请输入trigger名称",trigger:"blur"}],triggerGroupName:[{required:!0,message:"请输入trigger组名称",trigger:"blur"}],processClass:[{required:!0,message:"请输入处理类",trigger:"blur"}]},s()(t,"triggerName",[{required:!0,message:"请输入trigger名称",trigger:"blur"}]),s()(t,"cronExpression",[{required:!0,message:"请输入cron表达式",trigger:"blur"}]),s()(t,"remark",[{required:!0,message:"请输入描述",trigger:"blur"}]),s()(t,"status",[{required:!0,message:"请选择状态",trigger:"change"}]),t),formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],isSubmit:!1}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList()},methods:{queryBtns:function(){var t=this,e={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",e).then(function(e){if((e.statusCode+"").startsWith("2"))for(var a=e.data.length-1;a>=0;a--)"add"==e.data[a].btnCode&&(t.add=!0),"upd"==e.data[a].btnCode&&(t.upd=!0,t.powerTrue=!0,t.optionW="160px"),"del"==e.data[a].btnCode&&(t.del=!0,t.powerTrue=!0,t.optionW="160px"),t.upd&&t.del&&(t.upd=!0,t.del=!0,t.powerTrue=!0,t.optionW="225px")})},indexMethod:function(t){return 1*t+1},dateFormat:function(t,e){var a=t[e.property];return void 0==a?"":Object(l.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var t=this,e={pageNum:this.currentPage,pageSize:this.pageSize,status:this.formInline.status};this.$fetch("/bz28/lotteryTaskJob/list",e).then(function(e){if((e.statusCode+"").startsWith("2")){for(var a=e.data.list.length-1;a>=0;a--)1==e.data.list[a].status?e.data.list[a].status="启动":e.data.list[a].status="停止";t.tableData=e.data.list,t.totalCount=e.data.total}else t.$message({type:"error",message:e.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0,this.isSubmit=!1},addBtn:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.$nextTick(function(){this.isSubmit=!0}),e.$post("/bz28/lotteryTaskJob/add",e.form).then(function(t){(t.statusCode+"").startsWith("2")?(e.dialogFormVisible=!1,e.$message({type:"success",message:"添加成功！"}),e.accountList()):(e.isSubmit=!1,e.$message({type:"error",message:t.message}))}))})},Delete:function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.delData(t)}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},delData:function(t){var e=this,a={id:t};this.$fetch("/bz28/lotteryTaskJob/remove",a).then(function(t){(t.statusCode+"").startsWith("2")?(e.$message({type:"success",message:"删除成功！"}),e.accountList()):e.$message({type:"error",message:"删除失败！"})})},getInfo:function(t){var e=this;this.dialogTableVisible=!0,this.$fetch("/bz28/lotteryTaskJob/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(e.formtwo=t.data)})},update:function(t){var e=this;this.$put("/bz28/lotteryTaskJob/modify",this.formtwo).then(function(t){(t.statusCode+"").startsWith("2")&&(e.$message({type:"success",message:"修改成功！"}),e.dialogTableVisible=!1,e.accountList())})},getOne:function(t){var e=this;this.dialogTableDetail=!0,this.$fetch("/bz28/lotteryTaskJob/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(t.data.createDate=Object(l.a)(new Date(t.data.createDate),"yyyy-MM-dd hh:mm:sss"),t.data.modifiedDate=Object(l.a)(new Date(t.data.modifiedDate),"yyyy-MM-dd hh:mm:sss"),e.formtwoInfo=t.data)})},handleSizeChange:function(t){this.pageSize=t,this.accountList()},handleCurrentChange:function(t){this.currentPage=t,this.accountList()},toggle:function(t){this.isShow=!this.isShow}}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bz-task-job-wrap"},[a("div",{staticClass:"bz-task-job-inner"},[t._m(0),t._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:t.formInline.status,callback:function(e){t.$set(t.formInline,"status",e)},expression:"formInline.status"}},[a("el-option",{attrs:{label:"启动",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"停止",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.search()}}},[t._v("查询")]),t._v(" "),t.add?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){t.load()}}},[t._v("添加")]):t._e()],1)],1),t._v(" "),a("div",{staticClass:"bz-task-job-table"},[[a("el-table",{attrs:{data:t.tableData,"max-height":"560"}},[a("el-table-column",{attrs:{label:"序号",fixed:"left",type:"index",index:t.indexMethod,width:"80"}}),t._v(" "),a("el-table-column",{attrs:{width:"150px",prop:"jobName",label:"job名称"}}),t._v(" "),a("el-table-column",{attrs:{width:"150px",prop:"jobGroup",label:"job组"}}),t._v(" "),a("el-table-column",{attrs:{width:"200px",prop:"triggerName",label:"trigger名称"}}),t._v(" "),a("el-table-column",{attrs:{width:"200px",prop:"triggerGroupName",label:"trigger组名称"}}),t._v(" "),a("el-table-column",{attrs:{width:"250px",prop:"processClass",label:"处理类"}}),t._v(" "),a("el-table-column",{attrs:{width:"250px",prop:"cronExpression",label:"cron表达式"}}),t._v(" "),a("el-table-column",{attrs:{width:"80px",prop:"status",label:"状态"}}),t._v(" "),a("el-table-column",{attrs:{width:"300px",prop:"remark",label:"备注"}}),t._v(" "),a("el-table-column",{attrs:{width:"160px",formatter:t.dateFormat,prop:"createDate",label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{width:"160px",formatter:t.dateFormat,prop:"modifiedDate",label:"修改时间"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:t.optionW},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(a){t.getOne(e.row.id)}}},[t._v("详情")]),t._v(" "),t.del?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){t.Delete(e.row.id)}}},[t._v("删除")]):t._e(),t._v(" "),t.upd?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){t.getInfo(e.row.id)}}},[t._v("修改")]):t._e()]}}])})],1)],t._v(" "),a("el-dialog",{attrs:{title:"添加任务调度",visible:t.dialogFormVisible,width:"800px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules}},[a("el-row",[a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"job名称","label-width":t.formLabelWidth,prop:"jobName"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.jobName,callback:function(e){t.$set(t.form,"jobName",e)},expression:"form.jobName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"trigger名称",prop:"triggerName","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.triggerName,callback:function(e){t.$set(t.form,"triggerName",e)},expression:"form.triggerName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"job组",prop:"jobGroup","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.jobGroup,callback:function(e){t.$set(t.form,"jobGroup",e)},expression:"form.jobGroup"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"trigger组名称",prop:"triggerGroupName","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.triggerGroupName,callback:function(e){t.$set(t.form,"triggerGroupName",e)},expression:"form.triggerGroupName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"处理类",prop:"processClass","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.processClass,callback:function(e){t.$set(t.form,"processClass",e)},expression:"form.processClass"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"cron表达式",prop:"cronExpression","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.cronExpression,callback:function(e){t.$set(t.form,"cronExpression",e)},expression:"form.cronExpression"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"描述",prop:"remark","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:8},"auto-complete":"off",clearable:""},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"状态",prop:"status","label-width":t.formLabelWidth}},[a("el-select",{staticStyle:{width:"210px"},attrs:{placeholder:""},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[a("el-option",{attrs:{label:"启动",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"停止",value:"2"}})],1)],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",disabled:t.isSubmit},on:{click:function(e){t.addBtn("form")}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改任务",visible:t.dialogTableVisible,width:"800px"},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("el-form",{attrs:{model:t.formtwo}},[a("el-row",[a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"job名称","label-width":t.formLabelWidth,prop:"jobName"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.jobName,callback:function(e){t.$set(t.formtwo,"jobName",e)},expression:"formtwo.jobName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"trigger名称",prop:"triggerName","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.triggerName,callback:function(e){t.$set(t.formtwo,"triggerName",e)},expression:"formtwo.triggerName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"job组",prop:"jobGroup","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.jobGroup,callback:function(e){t.$set(t.formtwo,"jobGroup",e)},expression:"formtwo.jobGroup"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"trigger组名称",prop:"triggerGroupName","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.triggerGroupName,callback:function(e){t.$set(t.formtwo,"triggerGroupName",e)},expression:"formtwo.triggerGroupName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"处理类",prop:"processClass","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.processClass,callback:function(e){t.$set(t.formtwo,"processClass",e)},expression:"formtwo.processClass"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"cron表达式",prop:"cronExpression","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.cronExpression,callback:function(e){t.$set(t.formtwo,"cronExpression",e)},expression:"formtwo.cronExpression"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"描述",prop:"remark","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:8},"auto-complete":"off",clearable:""},model:{value:t.formtwo.remark,callback:function(e){t.$set(t.formtwo,"remark",e)},expression:"formtwo.remark"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"状态",prop:"status","label-width":t.formLabelWidth}},[a("el-select",{staticStyle:{width:"210px"},attrs:{placeholder:""},model:{value:t.formtwo.status,callback:function(e){t.$set(t.formtwo,"status",e)},expression:"formtwo.status"}},[a("el-option",{attrs:{label:"启动",value:1}}),t._v(" "),a("el-option",{attrs:{label:"停止",value:2}})],1)],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.update(t.formtwo)}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"任务详情",visible:t.dialogTableDetail,width:"800px"},on:{"update:visible":function(e){t.dialogTableDetail=e}}},[a("el-form",{attrs:{model:t.formtwoInfo}},[a("div",{staticClass:"box_xinxi"},[a("div",{staticClass:"wrap_da"},[a("div",{staticClass:"header"},[a("span",[t._v("详情信息")]),t._v(" "),a("span")]),t._v(" "),a("div",{staticClass:"body_list dec1"},[a("div",{staticClass:"title"},[t._v("job名称:")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                  "+t._s(t.formtwoInfo.jobName)+"\n                ")])]),t._v(" "),a("div",{staticClass:"body_list dec1"},[a("div",{staticClass:"title"},[t._v("trigger名称:")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                  "+t._s(t.formtwoInfo.triggerName)+"\n                ")])]),t._v(" "),a("div",{staticClass:"body_list dec1"},[a("div",{staticClass:"title"},[t._v("job组:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t.formtwoInfo.jobGroup))])]),t._v(" "),a("div",{staticClass:"body_list dec1"},[a("div",{staticClass:"title"},[t._v("trigger组名称:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t.formtwoInfo.triggerGroupName))])]),t._v(" "),a("div",{staticClass:"body_list dec1"},[a("div",{staticClass:"title"},[t._v("处理类:")]),t._v(" "),a("div",{staticClass:"name"},[a("div",{staticClass:"name"},[t._v(t._s(t.formtwoInfo.processClass))])])]),t._v(" "),a("div",{staticClass:"body_list dec1"},[a("div",{staticClass:"title"},[t._v("cron表达式:")]),t._v(" "),a("div",{staticClass:"name"},[a("div",{staticClass:"name"},[t._v(t._s(t.formtwoInfo.cronExpression))])])]),t._v(" "),a("div",{staticClass:"body_list dec1"},[a("div",{staticClass:"title"},[t._v("描述:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t.formtwoInfo.remark))])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("创建时间:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t.formtwoInfo.createDate))])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("修改时间:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t.formtwoInfo.modifiedDate))])]),t._v(" "),a("div",{staticClass:"body_list dec1"},[a("div",{staticClass:"title"},[t._v("状态:")]),t._v(" "),a("div",{staticClass:"name"},[1==t.formtwoInfo.status?a("span",[t._v("已启用")]):t._e(),t._v(" "),2==t.formtwoInfo.status?a("span",[t._v("已停用")]):t._e()])])])])]),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogTableDetail=!1}}},[t._v("取 消")])],1)],1)],2),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,70],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bz-task-job-header"},[e("h3",[this._v("定时任务/任务调度")]),this._v(" "),e("hr")])}]};var n=a("VU/8")(r,i,!1,function(t){a("8bCL")},null,null);e.default=n.exports}});