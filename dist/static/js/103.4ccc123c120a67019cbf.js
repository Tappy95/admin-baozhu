webpackJsonp([103],{"6UN3":function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l("bOdI"),o=l.n(a),r=l("xT6B"),s={name:"ResourceCollect",data:function(){var t;return{styleObject:{width:"200px"},w_input:"200px",powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{},roles:{id:"",realname:""},rules:(t={lotteryGrabId:[{required:!0,message:"请输入采集id",trigger:"blur"}],lotteryGroupName:[{required:!0,message:"请选择彩种名称",trigger:"change"}],name:[{required:!0,message:"请输入名称",trigger:"blur"}],grabFunName:[{required:!0,message:"请输入采集方法名",trigger:"blur"}],displaysort:[{required:!0,message:"请输入排序",trigger:"blur"}],url:[{required:!0,message:"请输入采集地址",trigger:"blur"}],postParam:[{required:!0,message:"请输入提交参数",trigger:"blur"}]},o()(t,"displaysort",[{required:!0,message:"请输入排序",trigger:"blur"}]),o()(t,"isEnable",[{required:!0,message:"请选择是否可用",trigger:"change"}]),o()(t,"type",[{required:!0,message:"请选择类型",trigger:"change"}]),t),formLabelWidth:"150px",currentPage:1,pageSize:10,totalCount:0,formInline:{lotteryPlayedTplId:1},tableData:[],isShow:!1,selectDept:[],selectData:[],staff:1,company:2,lotteryPlayed:[],PlayedGroup:[]}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList()},methods:{queryBtns:function(){var t=this,e={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",e).then(function(e){if((e.statusCode+"").startsWith("2"))for(var l=e.data.length-1;l>=0;l--)"add"==e.data[l].btnCode&&(t.add=!0),"upd"==e.data[l].btnCode&&(t.upd=!0,t.powerTrue=!0,t.optionW="150px"),"del"==e.data[l].btnCode&&(t.del=!0,t.powerTrue=!0,t.optionW="150px"),t.upd&&t.del&&(t.powerTrue=!0,t.optionW="225px")})},indexMethod:function(t){return 1*t+1},dateFormat:function(t,e){var l=t[e.property];return void 0==l?"":Object(r.a)(new Date(l),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var t=this,e={pageNum:this.currentPage,pageSize:this.pageSize,lotteryGroupName:this.formInline.lotteryGroupName};this.$fetch("/guess/lotteryGrab/queryList",e).then(function(e){if((e.statusCode+"").startsWith("2")){for(var l=e.data.list.length-1;l>=0;l--)"1"==e.data.list[l].isEnable?e.data.list[l].isEnable="可用":e.data.list[l].isEnable="不可用","1"==e.data.list[l].type?e.data.list[l].type="日期":e.data.list[l].type="备用";t.tableData=e.data.list,t.totalCount=e.data.total}else t.$message({type:"error",message:e.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0},addBtn:function(t){var e=this;this.$refs[t].validate(function(t){t&&e.$post("/guess/lotteryGrab/save",e.form).then(function(t){(t.statusCode+"").startsWith("2")?(e.dialogFormVisible=!1,e.$message({type:"success",message:"添加成功！"}),e.accountList()):e.$message({type:"error",message:t.message})})})},Delete:function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.delData(t)}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},delData:function(t){var e=this,l={id:t};this.$fetch("/guess/lotteryGrab/delete",l).then(function(t){(t.statusCode+"").startsWith("2")?(e.$message({type:"success",message:"删除成功！"}),e.accountList()):e.$message({type:"error",message:"删除失败！"})})},getInfo:function(t){var e=this;this.dialogTableVisible=!0,this.$fetch("/guess/lotteryGrab/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(e.formtwo=t.data,e.formtwo.grabName=e.formtwo.name)})},update:function(t){var e=this;this.$put("/guess/lotteryGrab/update",this.formtwo).then(function(t){(t.statusCode+"").startsWith("2")&&(e.$message({type:"success",message:"修改成功！"}),e.dialogTableVisible=!1,e.accountList())})},getOne:function(t){var e=this;this.dialogTableDetail=!0,this.$fetch("/guess/lotteryGrab/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(e.formtwoInfo=t.data)})},handleSizeChange:function(t){this.pageSize=t,this.accountList()},handleCurrentChange:function(t){this.currentPage=t,this.accountList()},toggle:function(t){this.isShow=!this.isShow}}},i={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"administratormanage-wrap"},[l("div",{staticClass:"administratormanage-inner"},[t._m(0),t._v(" "),l("div",[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[l("el-form-item",{attrs:{label:"彩种名称:"}},[l("el-input",{attrs:{placeholder:"请输入彩种名称","auto-complete":"off",clearable:""},model:{value:t.formInline.lotteryGroupName,callback:function(e){t.$set(t.formInline,"lotteryGroupName",e)},expression:"formInline.lotteryGroupName"}})],1),t._v(" "),l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.search()}}},[t._v("查询")]),t._v(" "),t.add?l("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){t.load()}}},[t._v("添加")]):t._e()],1)],1),t._v(" "),l("div",{staticClass:"administratormanage-table"},[[l("el-table",{attrs:{data:t.tableData,height:"580"}},[l("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:t.indexMethod,width:"50"}}),t._v(" "),l("el-table-column",{attrs:{fixed:"left","min-width":"150px",prop:"lotteryGroupName",label:"彩种名称"}}),t._v(" "),l("el-table-column",{attrs:{"min-width":"150px",prop:"name",label:"名称"}}),t._v(" "),l("el-table-column",{attrs:{"min-width":"250px",prop:"grabFunName",label:"采集方法名"}}),t._v(" "),l("el-table-column",{attrs:{"min-width":"150px",prop:"lotteryGrabId",label:"采集id"}}),t._v(" "),l("el-table-column",{attrs:{"min-width":"250px",prop:"url",label:"采集地址"}}),t._v(" "),l("el-table-column",{attrs:{"min-width":"150px",prop:"postParam",label:"提交参数"}}),t._v(" "),l("el-table-column",{attrs:{"min-width":"150px",prop:"displaysort",label:"排序"}}),t._v(" "),l("el-table-column",{attrs:{"min-width":"150px",prop:"isEnable",label:"是否可用"}}),t._v(" "),l("el-table-column",{attrs:{"min-width":"150px",prop:"type",label:"类型"}}),t._v(" "),l("el-table-column",{attrs:{fixed:"right",label:"操作",width:t.optionW},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(l){t.getOne(e.row.id)}}},[t._v("详情")]),t._v(" "),t.del?l("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(l){t.Delete(e.row.id)}}},[t._v("删除")]):t._e(),t._v(" "),t.upd?l("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(l){t.getInfo(e.row.id)}}},[t._v("修改")]):t._e()]}}])})],1)],t._v(" "),l("el-dialog",{attrs:{title:"添加资源采集",visible:t.dialogFormVisible,width:"800px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[l("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种名称:",prop:"lotteryGroupName","label-width":t.formLabelWidth}},[l("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.lotteryGroupName,callback:function(e){t.$set(t.form,"lotteryGroupName",e)},expression:"form.lotteryGroupName"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"类型:",prop:"type","label-width":t.formLabelWidth}},[l("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},[l("el-option",{attrs:{label:"日期",value:"1"}}),t._v(" "),l("el-option",{attrs:{label:"备用",value:"2"}})],1)],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"排序:","label-width":t.formLabelWidth,prop:"displaysort"}},[l("el-input",{style:t.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:t.form.displaysort,callback:function(e){t.$set(t.form,"displaysort",e)},expression:"form.displaysort"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"名称:","label-width":t.formLabelWidth,prop:"name"}},[l("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.grabName,callback:function(e){t.$set(t.form,"grabName",e)},expression:"form.grabName"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"采集方法名:",prop:"grabFunName","label-width":t.formLabelWidth}},[l("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.grabFunName,callback:function(e){t.$set(t.form,"grabFunName",e)},expression:"form.grabFunName"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否可用:",prop:"isEnable","label-width":t.formLabelWidth}},[l("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.form.isEnable,callback:function(e){t.$set(t.form,"isEnable",e)},expression:"form.isEnable"}},[l("el-option",{attrs:{label:"可用",value:"1"}}),t._v(" "),l("el-option",{attrs:{label:"不可用",value:"0"}})],1)],1)],1),t._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"采集id:","label-width":t.formLabelWidth,prop:"lotteryGrabId"}},[l("el-input",{attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:t.form.lotteryGrabId,callback:function(e){t.$set(t.form,"lotteryGrabId",e)},expression:"form.lotteryGrabId"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"提交参数:","label-width":t.formLabelWidth,prop:"postParam"}},[l("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.postParam,callback:function(e){t.$set(t.form,"postParam",e)},expression:"form.postParam"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"采集地址:","label-width":t.formLabelWidth,prop:"url"}},[l("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.url,callback:function(e){t.$set(t.form,"url",e)},expression:"form.url"}})],1)],1)],1)],1),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addBtn("form")}}},[t._v("确 定")])],1)],1),t._v(" "),l("el-dialog",{attrs:{title:"修改资源采集",visible:t.dialogTableVisible,width:"800px"},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[l("el-form",{attrs:{model:t.formtwo,rules:t.rules}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种名称:",prop:"lotteryGroupName","label-width":t.formLabelWidth}},[l("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.lotteryGroupName,callback:function(e){t.$set(t.formtwo,"lotteryGroupName",e)},expression:"formtwo.lotteryGroupName"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"类型:",prop:"type","label-width":t.formLabelWidth}},[l("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.formtwo.type,callback:function(e){t.$set(t.formtwo,"type",e)},expression:"formtwo.type"}},[l("el-option",{attrs:{label:"日期",value:1}}),t._v(" "),l("el-option",{attrs:{label:"备用",value:2}})],1)],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"排序:","label-width":t.formLabelWidth,prop:"displaysort"}},[l("el-input",{style:t.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:t.formtwo.displaysort,callback:function(e){t.$set(t.formtwo,"displaysort",e)},expression:"formtwo.displaysort"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"名称:","label-width":t.formLabelWidth,prop:"name"}},[l("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.grabName,callback:function(e){t.$set(t.formtwo,"grabName",e)},expression:"formtwo.grabName"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"采集方法名:",prop:"grabFunName","label-width":t.formLabelWidth}},[l("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.grabFunName,callback:function(e){t.$set(t.formtwo,"grabFunName",e)},expression:"formtwo.grabFunName"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否可用:",prop:"isEnable","label-width":t.formLabelWidth}},[l("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.formtwo.isEnable,callback:function(e){t.$set(t.formtwo,"isEnable",e)},expression:"formtwo.isEnable"}},[l("el-option",{attrs:{label:"可用",value:1}}),t._v(" "),l("el-option",{attrs:{label:"不可用",value:0}})],1)],1)],1),t._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"采集id:","label-width":t.formLabelWidth,prop:"lotteryGrabId"}},[l("el-input",{attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:t.formtwo.lotteryGrabId,callback:function(e){t.$set(t.formtwo,"lotteryGrabId",e)},expression:"formtwo.lotteryGrabId"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"提交参数:","label-width":t.formLabelWidth,prop:"postParam"}},[l("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.postParam,callback:function(e){t.$set(t.formtwo,"postParam",e)},expression:"formtwo.postParam"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"采集地址:","label-width":t.formLabelWidth,prop:"url"}},[l("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.url,callback:function(e){t.$set(t.formtwo,"url",e)},expression:"formtwo.url"}})],1)],1)],1)],1),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("取 消")]),t._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(e){t.update(t.formtwo)}}},[t._v("确 定")])],1)],1),t._v(" "),l("el-dialog",{attrs:{title:"资源采集详情",visible:t.dialogTableDetail,width:"800px"},on:{"update:visible":function(e){t.dialogTableDetail=e}}},[l("el-form",{attrs:{model:t.formtwoInfo}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种名称:","label-width":t.formLabelWidth}},[l("el-input",{style:t.styleObject,attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:t.formtwoInfo.lotteryGroupName,callback:function(e){t.$set(t.formtwoInfo,"lotteryGroupName",e)},expression:"formtwoInfo.lotteryGroupName"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"类型:","label-width":t.formLabelWidth}},[l("el-select",{style:t.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:t.formtwoInfo.type,callback:function(e){t.$set(t.formtwoInfo,"type",e)},expression:"formtwoInfo.type"}},[l("el-option",{attrs:{label:"日期",value:1}}),t._v(" "),l("el-option",{attrs:{label:"备用",value:2}})],1)],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"排序:","label-width":t.formLabelWidth}},[l("el-input",{style:t.styleObject,attrs:{disabled:!0,type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:t.formtwoInfo.displaysort,callback:function(e){t.$set(t.formtwoInfo,"displaysort",e)},expression:"formtwoInfo.displaysort"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"名称:","label-width":t.formLabelWidth}},[l("el-input",{style:t.styleObject,attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:t.formtwoInfo.name,callback:function(e){t.$set(t.formtwoInfo,"name",e)},expression:"formtwoInfo.name"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"采集方法名:","label-width":t.formLabelWidth}},[l("el-input",{style:t.styleObject,attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:t.formtwoInfo.grabFunName,callback:function(e){t.$set(t.formtwoInfo,"grabFunName",e)},expression:"formtwoInfo.grabFunName"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否可用:","label-width":t.formLabelWidth}},[l("el-select",{style:t.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:t.formtwoInfo.isEnable,callback:function(e){t.$set(t.formtwoInfo,"isEnable",e)},expression:"formtwoInfo.isEnable"}},[l("el-option",{attrs:{label:"可用",value:1}}),t._v(" "),l("el-option",{attrs:{label:"不可用",value:0}})],1)],1)],1),t._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"采集id:","label-width":t.formLabelWidth}},[l("el-input",{attrs:{type:"number",min:"0",disabled:!0,"auto-complete":"off",clearable:""},model:{value:t.formtwoInfo.lotteryGrabId,callback:function(e){t.$set(t.formtwoInfo,"lotteryGrabId",e)},expression:"formtwoInfo.lotteryGrabId"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"提交参数:","label-width":t.formLabelWidth}},[l("el-input",{attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:t.formtwoInfo.postParam,callback:function(e){t.$set(t.formtwoInfo,"postParam",e)},expression:"formtwoInfo.postParam"}})],1)],1),t._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"采集地址:","label-width":t.formLabelWidth}},[l("el-input",{attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:t.formtwoInfo.url,callback:function(e){t.$set(t.formtwoInfo,"url",e)},expression:"formtwoInfo.url"}})],1)],1)],1)],1),t._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(e){t.dialogTableDetail=!1}}},[t._v("取 消")])],1)],1)],2),t._v(" "),l("div",{staticClass:"block"},[l("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,70],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"administratormanage-header"},[e("h3",[this._v("游戏竞猜/资源采集")]),this._v(" "),e("hr")])}]};var n=l("VU/8")(s,i,!1,function(t){l("J6Up")},null,null);e.default=n.exports},J6Up:function(t,e){}});