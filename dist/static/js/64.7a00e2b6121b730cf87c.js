webpackJsonp([64],{"7zpL":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a("xT6B"),l={name:"RankRewardConfig",data:function(){var t=this;return{powerTrue:!1,optionW:"75",menuId:"",upd:!1,showT:!1,add:!1,del:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{},formLabelWidth:"140px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],rankNameList:[],rules:{configId:[{required:!0,message:"请输入排行配置id",trigger:"blur"},{validator:function(e,a,r){t.$patternNum1.test(a)?r():r(new Error("请输入正整数"))},trigger:"blur"}],rewardType:[{required:!0,message:"请选择奖励类型",trigger:"change"}],rewardAmount:[{required:!0,message:"请输入奖励金额",trigger:"blur"},{validator:function(e,a,r){t.$patternNum1.test(a)?r():r(new Error("请输入正整数"))},trigger:"blur"}],rewardOrder:[{required:!0,message:"请输入奖励排行",trigger:"blur"},{validator:function(e,a,r){t.$patternNum1.test(a)?r():r(new Error("请输入正整数"))},trigger:"blur"}],status:[{required:!0,message:"请选择状态",trigger:"change"}],rewardRemark:[{required:!0,message:"请输入奖励排行描述",trigger:"blur"}],rankName:[{required:!0,message:"请选择所属排行名称",trigger:"change"}]},styleObject:{width:"200px"},isSubmit:!1}},filters:{datetime:function(t){return Object(r.a)(new Date(t),"yyyy-MM-dd hh:mm:sss")}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList(),this.getName()},methods:{queryBtns:function(){var t=this,e={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",e).then(function(e){if((e.statusCode+"").startsWith("2"))for(var a=e.data.length-1;a>=0;a--)"add"==e.data[a].btnCode&&(t.add=!0),"del"==e.data[a].btnCode&&(t.del=!0,t.optionW="150"),"upd"==e.data[a].btnCode&&(t.upd=!0,t.showT=!0,t.optionW="150"),t.del&&t.upd?t.optionW="220":t.showT=!1})},indexMethod:function(t){return 1*t+1},dateFormat:function(t,e){var a=t[e.property];return void 0==a?"":Object(r.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var t=this,e={pageNum:this.currentPage,pageSize:this.pageSize,rewardType:this.formInline.rewardType,configId:this.formInline.configId};this.$fetch("/api/rankConfigReward/list",e).then(function(e){(e.statusCode+"").startsWith("2")?(t.tableData=e.data.list,t.totalCount=e.data.total):t.$message({type:"error",message:e.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0,this.isSubmit=!1,this.getName()},addBtn:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.$nextTick(function(){this.isSubmit=!0}),e.$post("/api/rankConfigReward/add",e.form).then(function(t){(t.statusCode+"").startsWith("2")?(e.dialogFormVisible=!1,e.$message({type:"success",message:"添加成功！"}),e.accountList()):(e.$message({type:"error",message:t.message}),e.isSubmit=!1)}))})},getInfo:function(t){var e=this;this.getName(),this.dialogTableVisible=!0,this.$fetch("/api/rankConfigReward/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(e.formtwo=t.data)})},getOne:function(t){var e=this;this.dialogTableDetail=!0,this.$fetch("/api/rankConfigReward/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(e.formtwoInfo=t.data)})},Delete:function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.delData(t)}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},delData:function(t){var e=this,a={id:t};this.$fetch("/api/rankConfigReward/remove",a).then(function(t){(t.statusCode+"").startsWith("2")?(e.$message({type:"success",message:"删除成功！"}),e.accountList()):e.$message({type:"error",message:"删除失败！"})})},update:function(t){var e=this;this.$refs[t].validate(function(t){t&&e.$put("/api/rankConfigReward/modify",e.formtwo).then(function(t){(t.statusCode+"").startsWith("2")?(e.$message({type:"success",message:"修改成功！"}),e.dialogTableVisible=!1,e.accountList()):e.$message({type:"error",message:t.message})})})},getName:function(){var t=this;this.$fetch("/api/rankConfig/querySelect").then(function(e){(e.statusCode+"").startsWith("2")?t.rankNameList=e.data:t.$message({type:"error",message:e.message,duration:3e3})})},handleSizeChange:function(t){this.pageSize=t,this.accountList()},handleCurrentChange:function(t){this.currentPage=t,this.accountList()}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rank-config-wrap"},[a("div",{staticClass:"rank-config-inner"},[t._m(0),t._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[a("el-form-item",{attrs:{label:"奖励类型:"}},[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:t.formInline.rewardType,callback:function(e){t.$set(t.formInline,"rewardType",e)},expression:"formInline.rewardType"}},[a("el-option",{attrs:{label:"金币",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"金猪",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"所属排行名称:","label-width":t.formLabelWidth,prop:"configId"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.formInline.configId,callback:function(e){t.$set(t.formInline,"configId",e)},expression:"formInline.configId"}},t._l(t.rankNameList,function(t,e){return a("el-option",{key:t,attrs:{label:t.rankName,value:t.id}})}))],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.search()}}},[t._v("查询")])],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[t.add?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){t.load()}}},[t._v("添加")]):t._e()],1)],1)],1),t._v(" "),a("div",{staticClass:"rank-config-table"},[[a("el-table",{attrs:{data:t.tableData,"max-height":"556"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:t.indexMethod,width:"80"}}),t._v(" "),a("el-table-column",{attrs:{width:"170",prop:"rankName",label:"所属排行名称"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"rewardType",label:"奖励类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.rewardType?a("span",[t._v("金币")]):t._e(),t._v(" "),2==e.row.rewardType?a("span",[t._v("金猪")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"rewardAmount",label:"奖励金额"}}),t._v(" "),a("el-table-column",{attrs:{width:"170",prop:"rewardOrder",label:"奖励排行"}}),t._v(" "),a("el-table-column",{attrs:{width:"170",prop:"rewardRemark",label:"奖励排行描述"}}),t._v(" "),a("el-table-column",{attrs:{width:"170",prop:"createTime",formatter:t.dateFormat,label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{width:"120",prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?a("span",{staticClass:"green"},[t._v("已启用")]):t._e(),t._v(" "),2==e.row.status?a("span",{staticClass:"red"},[t._v("已停用")]):t._e()]}}])}),t._v(" "),t.showT?a("el-table-column",{attrs:{fixed:"right",label:"操作",width:t.optionW},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(a){t.getOne(e.row.id)}}},[t._v("详情")]),t._v(" "),t.del?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){t.Delete(e.row.id)}}},[t._v("删除")]):t._e(),t._v(" "),t.upd?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){t.getInfo(e.row.id)}}},[t._v("修改")]):t._e()]}}])}):t._e()],1)],t._v(" "),a("el-dialog",{attrs:{title:"添加",visible:t.dialogFormVisible,width:"800px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"所属排行名称:","label-width":t.formLabelWidth,prop:"configId"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.form.configId,callback:function(e){t.$set(t.form,"configId",e)},expression:"form.configId"}},t._l(t.rankNameList,function(t,e){return a("el-option",{key:t,attrs:{label:t.rankName,value:t.id}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"奖励类型:","label-width":t.formLabelWidth,prop:"rewardType"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.form.rewardType,callback:function(e){t.$set(t.form,"rewardType",e)},expression:"form.rewardType"}},[a("el-option",{attrs:{label:"金币",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"金猪",value:"2"}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"rewardAmount",label:"奖励金额:","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.rewardAmount,callback:function(e){t.$set(t.form,"rewardAmount",e)},expression:"form.rewardAmount"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"rewardOrder",label:"奖励排行","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.rewardOrder,callback:function(e){t.$set(t.form,"rewardOrder",e)},expression:"form.rewardOrder"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"状态:","label-width":t.formLabelWidth,prop:"status"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[a("el-option",{attrs:{label:"启用",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"停用",value:"2"}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{prop:"rewardRemark",label:"奖励排行描述","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:t.form.rewardRemark,callback:function(e){t.$set(t.form,"rewardRemark",e)},expression:"form.rewardRemark"}})],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",disabled:t.isSubmit},on:{click:function(e){t.addBtn("form")}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改",visible:t.dialogTableVisible,width:"800px"},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("el-form",{ref:"formtwo",attrs:{model:t.formtwo,rules:t.rules}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"所属排行名称:","label-width":t.formLabelWidth,prop:"configId"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.formtwo.configId,callback:function(e){t.$set(t.formtwo,"configId",e)},expression:"formtwo.configId"}},t._l(t.rankNameList,function(t,e){return a("el-option",{key:t,attrs:{label:t.rankName,value:t.id}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"奖励类型:","label-width":t.formLabelWidth,prop:"rewardType"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.formtwo.rewardType,callback:function(e){t.$set(t.formtwo,"rewardType",e)},expression:"formtwo.rewardType"}},[a("el-option",{attrs:{label:"金币",value:1}}),t._v(" "),a("el-option",{attrs:{label:"金猪",value:2}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"rewardAmount",label:"奖励金额:","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.rewardAmount,callback:function(e){t.$set(t.formtwo,"rewardAmount",e)},expression:"formtwo.rewardAmount"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"rewardOrder",label:"奖励排行","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.rewardOrder,callback:function(e){t.$set(t.formtwo,"rewardOrder",e)},expression:"formtwo.rewardOrder"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"状态:","label-width":t.formLabelWidth,prop:"status"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.formtwo.status,callback:function(e){t.$set(t.formtwo,"status",e)},expression:"formtwo.status"}},[a("el-option",{attrs:{label:"启用",value:1}}),t._v(" "),a("el-option",{attrs:{label:"停用",value:2}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{prop:"rewardRemark",label:"奖励排行描述","label-width":t.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:t.formtwo.rewardRemark,callback:function(e){t.$set(t.formtwo,"rewardRemark",e)},expression:"formtwo.rewardRemark"}})],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.update("formtwo")}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"详情",visible:t.dialogTableDetail,width:"800px"},on:{"update:visible":function(e){t.dialogTableDetail=e}}},[a("el-form",{attrs:{model:t.formtwoInfo}},[a("div",{staticClass:"box_xinxi"},[a("div",{staticClass:"wrap_da"},[a("div",{staticClass:"header"},[a("span",[t._v("详情信息")]),t._v(" "),a("span")]),t._v(" "),a("div",{staticClass:"body_list",staticStyle:{width:"100%"}},[a("div",{staticClass:"title"},[t._v("所属排行名称:")]),t._v(" "),a("div",{staticClass:"name"},[a("el-select",{style:t.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:t.formtwoInfo.configId,callback:function(e){t.$set(t.formtwoInfo,"configId",e)},expression:"formtwoInfo.configId"}},t._l(t.rankNameList,function(t,e){return a("el-option",{key:t,attrs:{label:t.rankName,value:t.id}})}))],1)]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("奖励类型:")]),t._v(" "),a("div",{staticClass:"name"},[1==t.formtwoInfo.rewardType?a("span",[t._v("金币")]):t._e(),t._v(" "),2==t.formtwoInfo.rewardType?a("span",[t._v("金猪")]):t._e()])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("奖励金额:")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                   "+t._s(t.formtwoInfo.rewardAmount)+"\n                ")])]),t._v(" "),a("div",{staticClass:"body_list",staticStyle:{width:"100%"}},[a("div",{staticClass:"title"},[t._v("奖励排行:")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                  "+t._s(t.formtwoInfo.rewardOrder)+"\n                ")])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("状态:")]),t._v(" "),a("div",{staticClass:"name"},[1==t.formtwoInfo.status?a("span",[t._v("已启用")]):t._e(),t._v(" "),2==t.formtwoInfo.status?a("span",[t._v("已停用")]):t._e()])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("创建时间:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t._f("datetime")(t.formtwoInfo.createTime)))])]),t._v(" "),a("div",{staticClass:"body_list dec"},[a("div",{staticClass:"title"},[t._v("奖励排行描述:")]),t._v(" "),a("div",{staticClass:"name",staticStyle:{width:"560px"}},[t._v("\n                  "+t._s(t.formtwoInfo.rewardRemark)+"\n                ")])])])])]),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogTableDetail=!1}}},[t._v("取 消")])],1)],1)],2),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,70],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"rank-config-header"},[e("h3",[this._v("排行榜/排行榜奖励配置")]),this._v(" "),e("hr")])}]};var s=a("VU/8")(l,o,!1,function(t){a("tZZM")},null,null);e.default=s.exports},tZZM:function(t,e){}});