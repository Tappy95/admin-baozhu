webpackJsonp([86],{"0s4y":function(e,t){},yQHa:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("xT6B"),o={name:"FightingRules",data:function(){return{styleObject:{width:"200px"},powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{},rules:{typeName:[{required:!0,message:"请输入类型名称",trigger:"blur"}],fightingRule:[{required:!0,message:"请输入对战规则",trigger:"blur"}],questionNum:[{required:!0,message:"请输入需完成问题数",trigger:"blur"},{validator:function(e,t,a){/^[0-9]*$/.test(t)?a():a(new Error("请输入正整数"))},trigger:"blur"}],isDisable:[{required:!0,message:"请选择是否废弃",trigger:"change"}],rewardType:[{required:!0,message:"请选择奖励类型",trigger:"change"}]},formLabelWidth:"150px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],isSubmit:!1}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList()},methods:{queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var a=t.data.length-1;a>=0;a--)"add"==t.data[a].btnCode&&(e.add=!0),"upd"==t.data[a].btnCode&&(e.upd=!0,e.powerTrue=!0,e.optionW="75px"),"del"==t.data[a].btnCode&&(e.del=!0,e.powerTrue=!0,e.optionW="75px"),e.upd&&e.del&&(e.powerTrue=!0,e.optionW="150px")})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(l.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,typeName:this.formInline.typeName};this.$fetch("/api/mFightingType/list",t).then(function(t){if((t.statusCode+"").startsWith("2")){for(var a=t.data.list.length-1;a>=0;a--)"1"==t.data.list[a].isDisable?t.data.list[a].isDisable="正常":t.data.list[a].isDisable="废弃","0"==t.data.list[a].rewardType?t.data.list[a].rewardType="人民币":t.data.list[a].rewardType="金币";e.tableData=t.data.list,e.totalCount=t.data.total}else e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0,this.isSubmit=!1},addBtn:function(e){var t=this;this.$refs[e].validate(function(e){e&&(t.$nextTick(function(){this.isSubmit=!0}),t.$post("/api/mFightingType/add",t.form).then(function(e){(e.statusCode+"").startsWith("2")?(t.dialogFormVisible=!1,t.$message({type:"success",message:"添加成功！"}),t.accountList()):(t.$message({type:"error",message:e.message}),t.isSubmit=!1)}))})},Delete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.delData(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},delData:function(e){var t=this,a={typeId:e};this.$fetch("/api/mFightingType/delete",a).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"删除成功！"}),t.accountList()):t.$message({type:"error",message:"删除失败！"})})},getInfo:function(e){var t=this;this.dialogTableVisible=!0,this.$fetch("/api/mFightingType/info",{typeId:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(t.formtwo=e.data)})},update:function(e){var t=this;this.$put("/api/mFightingType/update",this.formtwo).then(function(e){(e.statusCode+"").startsWith("2")&&(t.$message({type:"success",message:"修改成功！"}),t.dialogTableVisible=!1,t.accountList())})},getOne:function(e){var t=this;this.dialogTableDetail=!0,this.$fetch("/api/mFightingType/info",{typeId:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(e.data.createTime=Object(l.a)(new Date(e.data.createTime),"yyyy-MM-dd hh:mm:sss"),e.data.updateTime=Object(l.a)(new Date(e.data.updateTime),"yyyy-MM-dd hh:mm:sss"),t.formtwoInfo=e.data)})},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fighting-rules-wrap"},[a("div",{staticClass:"fighting-rules-inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"类型名称"}},[a("el-input",{attrs:{placeholder:"请输入类型名称",clearable:""},model:{value:e.formInline.typeName,callback:function(t){e.$set(e.formInline,"typeName",t)},expression:"formInline.typeName"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")]),e._v(" "),e.add?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.load()}}},[e._v("添加")]):e._e()],1)],1),e._v(" "),a("div",{staticClass:"fighting-rules-table"},[[a("el-table",{attrs:{data:e.tableData,height:"556"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"80"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"left","min-width":"150",prop:"typeName",label:"类型名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"isDisable","min-width":"100",label:"是否废弃"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170",prop:"createTime",formatter:e.dateFormat,label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170",prop:"updateTime",formatter:e.dateFormat,label:"修改时间"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"400",prop:"fightingRule",label:"对战规则"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"questionNum",label:"需完成问题数"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100",prop:"rewardType",label:"奖励类型"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(a){e.getOne(t.row.typeId)}}},[e._v("详情")]),e._v(" "),e.upd?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){e.getInfo(t.row.typeId)}}},[e._v("修改")]):e._e()]}}])})],1)],e._v(" "),a("el-dialog",{attrs:{title:"添加答题规则",visible:e.dialogFormVisible,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"类型名称","label-width":e.formLabelWidth,prop:"typeName"}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.typeName,callback:function(t){e.$set(e.form,"typeName",t)},expression:"form.typeName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"奖励类型","label-width":e.formLabelWidth,prop:"rewardType"}},[a("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.form.rewardType,callback:function(t){e.$set(e.form,"rewardType",t)},expression:"form.rewardType"}},[a("el-option",{attrs:{label:"人民币",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"金币",value:"1"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"是否废弃","label-width":e.formLabelWidth,prop:"isDisable"}},[a("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.form.isDisable,callback:function(t){e.$set(e.form,"isDisable",t)},expression:"form.isDisable"}},[a("el-option",{attrs:{label:"正常",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"废弃",value:"2"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"需完成问题数","label-width":e.formLabelWidth,prop:"questionNum"}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.questionNum,callback:function(t){e.$set(e.form,"questionNum",t)},expression:"form.questionNum"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-form-item",{attrs:{label:"对战规则",prop:"fightingRule","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.form.fightingRule,callback:function(t){e.$set(e.form,"fightingRule",t)},expression:"form.fightingRule"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:e.isSubmit},on:{click:function(t){e.addBtn("form")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改规则",visible:e.dialogTableVisible,width:"800px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-form",{attrs:{model:e.formtwo}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"类型名称","label-width":e.formLabelWidth,prop:"typeName"}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.typeName,callback:function(t){e.$set(e.formtwo,"typeName",t)},expression:"formtwo.typeName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"奖励类型","label-width":e.formLabelWidth}},[a("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.formtwo.rewardType,callback:function(t){e.$set(e.formtwo,"rewardType",t)},expression:"formtwo.rewardType"}},[a("el-option",{attrs:{label:"人民币",value:0}}),e._v(" "),a("el-option",{attrs:{label:"金币",value:1}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"是否废弃","label-width":e.formLabelWidth,prop:"isDisable"}},[a("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.formtwo.isDisable,callback:function(t){e.$set(e.formtwo,"isDisable",t)},expression:"formtwo.isDisable"}},[a("el-option",{attrs:{label:"正常",value:1}}),e._v(" "),a("el-option",{attrs:{label:"废弃",value:2}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"需完成问题数","label-width":e.formLabelWidth,prop:"questionNum"}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.questionNum,callback:function(t){e.$set(e.formtwo,"questionNum",t)},expression:"formtwo.questionNum"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-form-item",{attrs:{label:"对战规则",prop:"fightingRule","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwo.fightingRule,callback:function(t){e.$set(e.formtwo,"fightingRule",t)},expression:"formtwo.fightingRule"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update(e.formtwo)}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"规则详情",visible:e.dialogTableDetail,width:"800px"},on:{"update:visible":function(t){e.dialogTableDetail=t}}},[a("el-form",{attrs:{model:e.formtwoInfo}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"类型名称","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.typeName,callback:function(t){e.$set(e.formtwoInfo,"typeName",t)},expression:"formtwoInfo.typeName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"奖励类型","label-width":e.formLabelWidth}},[a("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.rewardType,callback:function(t){e.$set(e.formtwoInfo,"rewardType",t)},expression:"formtwoInfo.rewardType"}},[a("el-option",{attrs:{label:"人民币",value:0}}),e._v(" "),a("el-option",{attrs:{label:"金币",value:1}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"是否废弃","label-width":e.formLabelWidth}},[a("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.isDisable,callback:function(t){e.$set(e.formtwoInfo,"isDisable",t)},expression:"formtwoInfo.isDisable"}},[a("el-option",{attrs:{label:"正常",value:1}}),e._v(" "),a("el-option",{attrs:{label:"废弃",value:2}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"需完成问题数","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{disabled:!0,min:"0",type:"number","auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.questionNum,callback:function(t){e.$set(e.formtwoInfo,"questionNum",t)},expression:"formtwoInfo.questionNum"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"创建时间","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.createTime,callback:function(t){e.$set(e.formtwoInfo,"createTime",t)},expression:"formtwoInfo.createTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"修改时间","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.updateTime,callback:function(t){e.$set(e.formtwoInfo,"updateTime",t)},expression:"formtwoInfo.updateTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-form-item",{attrs:{label:"对战规则","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:!0,type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.fightingRule,callback:function(t){e.$set(e.formtwoInfo,"fightingRule",t)},expression:"formtwoInfo.fightingRule"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableDetail=!1}}},[e._v("取 消")])],1)],1)],2),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"fighting-rules-header"},[t("h3",[this._v("答题对战/答题规则")]),this._v(" "),t("hr")])}]};var s=a("VU/8")(o,i,!1,function(e){a("0s4y")},null,null);t.default=s.exports}});