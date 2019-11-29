webpackJsonp([44],{"2Bje":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("xT6B"),o={name:"RankConfig",data:function(){return{powerTrue:!1,optionW:"75",menuId:"",upd:!1,showT:!1,add:!1,del:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{},formLabelWidth:"140px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],rules:{rankName:[{required:!0,message:"请输入排行榜名称",trigger:"blur"}],status:[{required:!0,message:"请选择状态",trigger:"change"}],dataLogic:[{required:!0,message:"请选择数据筛选逻辑",trigger:"change"}],rankType:[{required:!0,message:"请选择排行榜类型",trigger:"change"}],rangeMin:[{required:!0,message:"请输入随机范围(min)",trigger:"blur"},{validator:function(t,e,a){/^(0|[1-9][0-9]*)(\.\d+)?$/.test(e)?a():a(new Error("请输入正数"))},trigger:"blur"}],rangeMax:[{required:!0,message:"请输入随机范围(max)",trigger:"blur"},{validator:function(t,e,a){/^(0|[1-9][0-9]*)(\.\d+)?$/.test(e)?a():a(new Error("请输入正数"))},trigger:"blur"}],upNum:[{required:!0,message:"真实用户上榜数",trigger:"blur"},{validator:function(t,e,a){/^[0-9]*$/.test(e)?a():a(new Error("请输入正整数"))},trigger:"blur"}]},styleObject:{width:"200px"},isSubmit:!1}},filters:{datetime:function(t){return Object(l.a)(new Date(t),"yyyy-MM-dd hh:mm:sss")}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList()},methods:{queryBtns:function(){var t=this,e={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",e).then(function(e){if((e.statusCode+"").startsWith("2"))for(var a=e.data.length-1;a>=0;a--)"add"==e.data[a].btnCode&&(t.add=!0),"del"==e.data[a].btnCode&&(t.del=!0,t.optionW="150"),"upd"==e.data[a].btnCode&&(t.upd=!0,t.showT=!0,t.optionW="150"),t.del&&t.upd?t.optionW="220":t.showT=!1})},indexMethod:function(t){return 1*t+1},dateFormat:function(t,e){var a=t[e.property];return void 0==a?"":Object(l.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var t=this,e={pageNum:this.currentPage,pageSize:this.pageSize,rankType:this.formInline.rankType,status:this.formInline.status};this.$fetch("/api/rankConfig/list",e).then(function(e){(e.statusCode+"").startsWith("2")?(t.tableData=e.data.list,t.totalCount=e.data.total):t.$message({type:"error",message:e.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0,this.isSubmit=!1},addBtn:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.$nextTick(function(){this.isSubmit=!0}),e.$post("/api/rankConfig/add",e.form).then(function(t){(t.statusCode+"").startsWith("2")?(e.dialogFormVisible=!1,e.$message({type:"success",message:"添加成功！"}),e.accountList()):(e.$message({type:"error",message:t.message}),e.isSubmit=!1)}))})},getInfo:function(t){var e=this;this.dialogTableVisible=!0,this.$fetch("/api/rankConfig/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(e.formtwo=t.data)})},getOne:function(t){var e=this;this.dialogTableDetail=!0,this.$fetch("/api/rankConfig/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(e.formtwoInfo=t.data)})},Delete:function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.delData(t)}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},delData:function(t){var e=this,a={id:t};this.$fetch("/api/rankConfig/remove",a).then(function(t){(t.statusCode+"").startsWith("2")?(e.$message({type:"success",message:"删除成功！"}),e.accountList()):e.$message({type:"error",message:"删除失败！"})})},update:function(t){var e=this;this.$refs[t].validate(function(t){t&&e.$put("/api/rankConfig/modify",e.formtwo).then(function(t){(t.statusCode+"").startsWith("2")?(e.$message({type:"success",message:"修改成功！"}),e.dialogTableVisible=!1,e.accountList()):e.$message({type:"error",message:t.message})})})},handleSizeChange:function(t){this.pageSize=t,this.accountList()},handleCurrentChange:function(t){this.currentPage=t,this.accountList()}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"rank-config-wrap"},[a("div",{staticClass:"rank-config-inner"},[t._m(0),t._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:t.formInline.status,callback:function(e){t.$set(t.formInline,"status",e)},expression:"formInline.status"}},[a("el-option",{attrs:{label:"启用",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"停用",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"排行榜类型:"}},[a("el-select",{attrs:{placeholder:"请选择排行榜类型"},model:{value:t.formInline.rankType,callback:function(e){t.$set(t.formInline,"rankType",e)},expression:"formInline.rankType"}},[a("el-option",{attrs:{label:"金猪排行榜",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"金币排行榜",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"好友排行榜",value:"3"}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.search()}}},[t._v("查询")]),t._v(" "),t.add?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){t.load()}}},[t._v("添加")]):t._e()],1)],1),t._v(" "),a("div",{staticClass:"rank-config-table"},[[a("el-table",{attrs:{data:t.tableData,"max-height":"556"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:t.indexMethod,width:"80"}}),t._v(" "),a("el-table-column",{attrs:{width:"170",prop:"rankName",label:"排行榜名称"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"rankType",label:"排行榜类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.rankType?a("span",[t._v("金猪排行榜")]):t._e(),t._v(" "),2==e.row.rankType?a("span",[t._v("金币排行榜")]):t._e(),t._v(" "),3==e.row.rankType?a("span",[t._v("好友排行榜")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"dataLogic",label:"数据筛选逻辑"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.dataLogic?a("span",[t._v("月榜")]):t._e(),t._v(" "),2==e.row.dataLogic?a("span",[t._v("日榜")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"170",prop:"rangeMin",label:"随机范围(min)"}}),t._v(" "),a("el-table-column",{attrs:{width:"170",prop:"rangeMax",label:"随机范围(max)"}}),t._v(" "),a("el-table-column",{attrs:{width:"170",prop:"upNum",label:"真实用户上榜数"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",width:"170",formatter:t.dateFormat,label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"updateTime",width:"170",formatter:t.dateFormat,label:"修改时间"}}),t._v(" "),a("el-table-column",{attrs:{width:"120",prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?a("span",{staticClass:"green"},[t._v("已启用")]):t._e(),t._v(" "),2==e.row.status?a("span",{staticClass:"red"},[t._v("已停用")]):t._e()]}}])}),t._v(" "),t.showT?a("el-table-column",{attrs:{fixed:"right",label:"操作",width:t.optionW},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(a){t.getOne(e.row.id)}}},[t._v("详情")]),t._v(" "),t.del?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){t.Delete(e.row.id)}}},[t._v("删除")]):t._e(),t._v(" "),t.upd?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){t.getInfo(e.row.id)}}},[t._v("修改")]):t._e()]}}])}):t._e()],1)],t._v(" "),a("el-dialog",{attrs:{title:"添加排行榜",visible:t.dialogFormVisible,width:"800px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{prop:"rankName",label:"排行榜名称:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.rankName,callback:function(e){t.$set(t.form,"rankName",e)},expression:"form.rankName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"排行榜类型:","label-width":t.formLabelWidth,prop:"rankType"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.form.rankType,callback:function(e){t.$set(t.form,"rankType",e)},expression:"form.rankType"}},[a("el-option",{attrs:{label:"金猪排行榜",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"金币排行榜",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"好友排行榜",value:"3"}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"数据筛选逻辑:","label-width":t.formLabelWidth,prop:"dataLogic"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.form.dataLogic,callback:function(e){t.$set(t.form,"dataLogic",e)},expression:"form.dataLogic"}},[a("el-option",{attrs:{label:"月榜",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"日榜",value:"2"}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"rangeMin",label:"随机范围(min):","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.rangeMin,callback:function(e){t.$set(t.form,"rangeMin",e)},expression:"form.rangeMin"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"rangeMax",label:"随机范围(max):","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.rangeMax,callback:function(e){t.$set(t.form,"rangeMax",e)},expression:"form.rangeMax"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"真实用户上榜数:",prop:"upNum","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.upNum,callback:function(e){t.$set(t.form,"upNum",e)},expression:"form.upNum"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"状态:","label-width":t.formLabelWidth,prop:"status"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[a("el-option",{attrs:{label:"启用",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"停用",value:"2"}})],1)],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",disabled:t.isSubmit},on:{click:function(e){t.addBtn("form")}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改排行榜",visible:t.dialogTableVisible,width:"800px"},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("el-form",{ref:"formtwo",attrs:{model:t.formtwo,rules:t.rules}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{prop:"rankName",label:"排行榜名称:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.rankName,callback:function(e){t.$set(t.formtwo,"rankName",e)},expression:"formtwo.rankName"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"排行榜类型:","label-width":t.formLabelWidth,prop:"rankType"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.formtwo.rankType,callback:function(e){t.$set(t.formtwo,"rankType",e)},expression:"formtwo.rankType"}},[a("el-option",{attrs:{label:"金猪排行榜",value:1}}),t._v(" "),a("el-option",{attrs:{label:"金币排行榜",value:2}}),t._v(" "),a("el-option",{attrs:{label:"好友排行榜",value:3}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"数据筛选逻辑:","label-width":t.formLabelWidth,prop:"dataLogic"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.formtwo.dataLogic,callback:function(e){t.$set(t.formtwo,"dataLogic",e)},expression:"formtwo.dataLogic"}},[a("el-option",{attrs:{label:"月榜",value:1}}),t._v(" "),a("el-option",{attrs:{label:"日榜",value:2}})],1)],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"rangeMin",label:"随机范围(min):","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.rangeMin,callback:function(e){t.$set(t.formtwo,"rangeMin",t._n(e))},expression:"formtwo.rangeMin"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"rangeMax",label:"随机范围(max):","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.rangeMax,callback:function(e){t.$set(t.formtwo,"rangeMax",t._n(e))},expression:"formtwo.rangeMax"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"真实用户上榜数:",prop:"upNum","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.upNum,callback:function(e){t.$set(t.formtwo,"upNum",t._n(e))},expression:"formtwo.upNum"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"状态:","label-width":t.formLabelWidth,prop:"status"}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.formtwo.status,callback:function(e){t.$set(t.formtwo,"status",e)},expression:"formtwo.status"}},[a("el-option",{attrs:{label:"启用",value:1}}),t._v(" "),a("el-option",{attrs:{label:"停用",value:2}})],1)],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.update("formtwo")}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"排行榜详情",visible:t.dialogTableDetail,width:"800px"},on:{"update:visible":function(e){t.dialogTableDetail=e}}},[a("el-form",{attrs:{model:t.formtwoInfo}},[a("div",{staticClass:"box_xinxi"},[a("div",{staticClass:"wrap_da"},[a("div",{staticClass:"header"},[a("span",[t._v("详情信息")]),t._v(" "),a("span")]),t._v(" "),a("div",{staticClass:"body_list",staticStyle:{width:"100%"}},[a("div",{staticClass:"title"},[t._v("排行榜名称:")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                  "+t._s(t.formtwoInfo.rankName)+"\n                ")])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("排行榜类型:")]),t._v(" "),a("div",{staticClass:"name"},[1==t.formtwoInfo.rankType?a("span",[t._v("金猪排行榜")]):t._e(),t._v(" "),2==t.formtwoInfo.rankType?a("span",[t._v("金币排行榜")]):t._e(),t._v(" "),3==t.formtwoInfo.rankType?a("span",[t._v("好友排行榜")]):t._e()])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("数据筛选逻辑:")]),t._v(" "),a("div",{staticClass:"name"},[1==t.formtwoInfo.dataLogic?a("span",[t._v("月榜")]):t._e(),t._v(" "),2==t.formtwoInfo.dataLogic?a("span",[t._v("日榜")]):t._e()])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("随机范围(min):")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                  "+t._s(t.formtwoInfo.rangeMin)+"\n                ")])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("随机范围(max):")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                  "+t._s(t.formtwoInfo.rangeMax)+"\n                ")])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("真实用户上榜数:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t.formtwoInfo.upNum))])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("状态:")]),t._v(" "),a("div",{staticClass:"name"},[1==t.formtwoInfo.status?a("span",[t._v("已启用")]):t._e(),t._v(" "),2==t.formtwoInfo.status?a("span",[t._v("已停用")]):t._e()])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("创建时间:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t._f("datetime")(t.formtwoInfo.createTime)))])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("修改时间:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t._f("datetime")(t.formtwoInfo.updateTime)))])])])])]),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogTableDetail=!1}}},[t._v("取 消")])],1)],1)],2),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,70],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"rank-config-header"},[e("h3",[this._v("排行榜/排行榜配置")]),this._v(" "),e("hr")])}]};var i=a("VU/8")(o,s,!1,function(t){a("nClY")},null,null);e.default=i.exports},nClY:function(t,e){}});