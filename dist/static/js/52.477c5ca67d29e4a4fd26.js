webpackJsonp([52],{Eosm:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("xT6B"),s={name:"BzGameManage",data:function(){return{powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{},rules:{lotteryId:[{required:!0,message:"请选择所属竞猜",trigger:"change"}],name:[{required:!0,message:"请输入玩法名称",trigger:"blur"}],baseOdds:[{required:!0,message:"请输入基本赔率",trigger:"blur"},{validator:function(t,e,a){/^(0|[1-9][0-9]*)(\.\d+)?$/.test(e)?a():a(new Error("请输入正数"))},trigger:"blur"}],probability:[{required:!0,message:"请输入中奖概率",trigger:"blur"},{validator:function(t,e,a){var l=e,s=0;"string"!=typeof l&&(l=l.toString()),l.includes(".")&&(s=l.split(".")[1].length),e>1||e<0||s>3?a(new Error("请输入0至1之间的数(只保留小数点后3位)")):a()},trigger:"blur"}],openProbability:[{required:!0,message:"请输入开奖概率",trigger:"blur"},{validator:function(t,e,a){var l=e,s=0;"string"!=typeof l&&(l=l.toString()),l.includes(".")&&(s=l.split(".")[1].length),e>1||e<0||s>3?a(new Error("请输入0至1之间的数(只保留小数点后3位)")):a()},trigger:"blur"}],basePig:[{required:!0,message:"请输入基准金猪",trigger:"blur"},{validator:function(t,e,a){/^[0-9]*$/.test(e)?a():a(new Error("请输入正整数"))},trigger:"blur"}],pigMin:[{required:!0,message:"请输入最小投注",trigger:"blur"},{validator:function(t,e,a){/^[0-9]*$/.test(e)?a():a(new Error("请输入正整数"))},trigger:"blur"}],pigMax:[{required:!0,message:"请输入最大投注",trigger:"blur"},{validator:function(t,e,a){/^[0-9]*$/.test(e)?a():a(new Error("请输入正整数"))},trigger:"blur"}],status:[{required:!0,message:"请选择状态",trigger:"change"}]},formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],styleObject:{width:"200px"},isSubmit:!1,jcIdList:[]}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList(),this.getJcId()},filters:{dateFont:function(t){return Object(l.a)(new Date(t),"yyyy-MM-dd hh:mm:sss")},currencyNum:function(t){return parseInt(t).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")}},methods:{getJcId:function(){var t=this;this.$fetch("/bz28/lotteryInfo/querySelect").then(function(e){(e.statusCode+"").startsWith("2")&&(t.jcIdList=e.data)})},queryBtns:function(){var t=this,e={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",e).then(function(e){if((e.statusCode+"").startsWith("2"))for(var a=e.data.length-1;a>=0;a--)"add"==e.data[a].btnCode&&(t.add=!0),"upd"==e.data[a].btnCode&&(t.upd=!0,t.powerTrue=!0,t.optionW="150px"),"del"==e.data[a].btnCode&&(t.del=!0,t.powerTrue=!0,t.optionW="150px"),t.upd&&t.del&&(t.powerTrue=!0,t.optionW="220px")})},indexMethod:function(t){return 1*t+1},dateFormat:function(t,e){var a=t[e.property];return void 0==a?"":Object(l.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var t=this,e={pageNum:this.currentPage,pageSize:this.pageSize,lotteryId:this.formInline.lotteryId,status:this.formInline.status};this.$fetch("/bz28/lotteryType/queryList",e).then(function(e){(e.statusCode+"").startsWith("2")?(t.tableData=e.data.list,t.totalCount=e.data.total):t.$message({type:"error",message:e.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.formInline={},this.form={},this.dialogFormVisible=!0,this.isSubmit=!1},addBtn:function(t){var e=this;this.$refs[t].validate(function(t){t&&(e.$nextTick(function(){this.isSubmit=!0}),e.$post("/bz28/lotteryType/add",e.form).then(function(t){(t.statusCode+"").startsWith("2")?(e.dialogFormVisible=!1,e.$message({type:"success",message:"添加成功！"}),e.accountList()):(e.$message({type:"error",message:t.message}),e.isSubmit=!1)}))})},Delete:function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.delData(t)}).catch(function(){e.$message({type:"info",message:"已取消删除"})})},delData:function(t){var e=this,a={id:t};this.$fetch("/bz28/lotteryType/remove",a).then(function(t){(t.statusCode+"").startsWith("2")?(e.$message({type:"success",message:"删除成功！"}),e.accountList()):e.$message({type:"error",message:"删除失败！"})})},getInfo:function(t){var e=this;this.dialogTableVisible=!0,this.$fetch("/bz28/lotteryType/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(e.formtwo=t.data)})},update:function(t){var e=this;this.$refs[t].validate(function(t){t&&e.$put("/bz28/lotteryType/modify",e.formtwo).then(function(t){(t.statusCode+"").startsWith("2")?(e.dialogTableVisible=!1,e.$message({type:"success",message:"修改成功！"}),e.accountList()):e.$message({type:"error",message:"修改失败！"})})})},getOne:function(t){var e=this;this.dialogTableDetail=!0,this.$fetch("/bz28/lotteryType/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(t.data.createTime=Object(l.a)(new Date(t.data.createTime),"yyyy-MM-dd hh:mm:sss"),e.formtwoInfo=t.data)})},handleSizeChange:function(t){this.pageSize=t,this.accountList()},handleCurrentChange:function(t){this.currentPage=t,this.accountList()}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bz-game-manage-wrap"},[a("div",{staticClass:"bz-game-manage-inner"},[t._m(0),t._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[a("el-form-item",{attrs:{label:"所属竞猜:",prop:"lotteryId"}},[a("el-select",{attrs:{placeholder:"请输入所属竞猜"},model:{value:t.formInline.lotteryId,callback:function(e){t.$set(t.formInline,"lotteryId",e)},expression:"formInline.lotteryId"}},[t._l(t.jcIdList,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.id}})}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],2)],1),t._v(" "),a("el-form-item",{attrs:{label:"状态:",prop:"status"}},[a("el-select",{attrs:{placeholder:"请输入状态"},model:{value:t.formInline.status,callback:function(e){t.$set(t.formInline,"status",e)},expression:"formInline.status"}},[a("el-option",{attrs:{label:"启用",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"停用",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.search()}}},[t._v("查询")])],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[t.add?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){t.load()}}},[t._v("添加")]):t._e()],1)],1)],1),t._v(" "),a("div",{staticClass:"bz-game-manage-table"},[[a("el-table",{attrs:{data:t.tableData,"max-height":"556"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:t.indexMethod,width:"80"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"left",width:"120px",prop:"lotteryName",label:"所属竞猜"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"150px",prop:"name",label:"玩法名称"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"baseOdds",label:"基本赔率"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"probability",label:"中奖概率"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120px",prop:"openProbability",label:"开奖概率"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"170px",prop:"basePig",label:"基准金猪"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("currencyNum")(e.row.basePig)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"170px",prop:"pigMin",label:"最小投注"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("currencyNum")(e.row.pigMin)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"170px",prop:"pigMax",label:"最大投注"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(t._f("currencyNum")(e.row.pigMax)))])]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"120px",prop:"status",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?a("span",{staticClass:"green"},[t._v("已启用")]):t._e(),t._v(" "),2==e.row.status?a("span",{staticClass:"blue"},[t._v("已停用")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{width:"170px",prop:"createTime",formatter:t.dateFormat,label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:t.optionW},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(a){t.getOne(e.row.id)}}},[t._v("详情")]),t._v(" "),t.del?a("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:function(a){t.Delete(e.row.id)}}},[t._v("删除")]):t._e(),t._v(" "),t.upd?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){t.getInfo(e.row.id)}}},[t._v("修改")]):t._e()]}}])})],1)],t._v(" "),a("el-dialog",{attrs:{title:"添加游戏",visible:t.dialogFormVisible,width:"800px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"所属竞猜:",prop:"lotteryId","label-width":t.formLabelWidth}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.form.lotteryId,callback:function(e){t.$set(t.form,"lotteryId",e)},expression:"form.lotteryId"}},t._l(t.jcIdList,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.id}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"玩法名称:","label-width":t.formLabelWidth,prop:"name"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"基本赔率:","label-width":t.formLabelWidth,prop:"baseOdds"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.baseOdds,callback:function(e){t.$set(t.form,"baseOdds",e)},expression:"form.baseOdds"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"基准金猪:",prop:"basePig","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.basePig,callback:function(e){t.$set(t.form,"basePig",e)},expression:"form.basePig"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"最小投注:","label-width":t.formLabelWidth,prop:"pigMin"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.pigMin,callback:function(e){t.$set(t.form,"pigMin",e)},expression:"form.pigMin"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"最大投注:","label-width":t.formLabelWidth,prop:"pigMax"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.pigMax,callback:function(e){t.$set(t.form,"pigMax",e)},expression:"form.pigMax"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"中奖概率:","label-width":t.formLabelWidth,prop:"probability"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.probability,callback:function(e){t.$set(t.form,"probability",e)},expression:"form.probability"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"开奖概率:","label-width":t.formLabelWidth,prop:"openProbability"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.openProbability,callback:function(e){t.$set(t.form,"openProbability",e)},expression:"form.openProbability"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"状态:",prop:"status","label-width":t.formLabelWidth}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},[a("el-option",{attrs:{label:"启用",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"停用",value:"2"}})],1)],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary",disabled:t.isSubmit},on:{click:function(e){t.addBtn("form")}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"修改抽奖类型",visible:t.dialogTableVisible,width:"800px"},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("el-form",{ref:"formtwo",attrs:{model:t.formtwo,rules:t.rules}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"所属竞猜:",prop:"lotteryId","label-width":t.formLabelWidth}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.formtwo.lotteryId,callback:function(e){t.$set(t.formtwo,"lotteryId",e)},expression:"formtwo.lotteryId"}},t._l(t.jcIdList,function(t,e){return a("el-option",{key:e,attrs:{label:t.name,value:t.id}})}))],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"玩法名称:","label-width":t.formLabelWidth,prop:"name"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.name,callback:function(e){t.$set(t.formtwo,"name",e)},expression:"formtwo.name"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"基本赔率:","label-width":t.formLabelWidth,prop:"baseOdds"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.baseOdds,callback:function(e){t.$set(t.formtwo,"baseOdds",e)},expression:"formtwo.baseOdds"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"基准金猪:",prop:"basePig","label-width":t.formLabelWidth}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.basePig,callback:function(e){t.$set(t.formtwo,"basePig",e)},expression:"formtwo.basePig"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"最小投注:","label-width":t.formLabelWidth,prop:"pigMin"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.pigMin,callback:function(e){t.$set(t.formtwo,"pigMin",e)},expression:"formtwo.pigMin"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"最大投注:","label-width":t.formLabelWidth,prop:"pigMax"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.pigMax,callback:function(e){t.$set(t.formtwo,"pigMax",e)},expression:"formtwo.pigMax"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"中奖概率:","label-width":t.formLabelWidth,prop:"probability"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.probability,callback:function(e){t.$set(t.formtwo,"probability",e)},expression:"formtwo.probability"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"开奖概率:","label-width":t.formLabelWidth,prop:"openProbability"}},[a("el-input",{style:t.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.openProbability,callback:function(e){t.$set(t.formtwo,"openProbability",e)},expression:"formtwo.openProbability"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"状态:",prop:"status","label-width":t.formLabelWidth}},[a("el-select",{style:t.styleObject,attrs:{placeholder:""},model:{value:t.formtwo.status,callback:function(e){t.$set(t.formtwo,"status",e)},expression:"formtwo.status"}},[a("el-option",{attrs:{label:"启用",value:1}}),t._v(" "),a("el-option",{attrs:{label:"停用",value:2}})],1)],1)],1)],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.update("formtwo")}}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"抽奖类型详情",visible:t.dialogTableDetail,width:"800px"},on:{"update:visible":function(e){t.dialogTableDetail=e}}},[a("el-form",{attrs:{model:t.formtwoInfo}},[a("div",{staticClass:"box_xinxi"},[a("div",{staticClass:"wrap_da"},[a("div",{staticClass:"header"},[a("span",[t._v("详情信息")]),t._v(" "),a("span")]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("所属竞猜:")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                  "+t._s(t.formtwoInfo.lotteryId)+"\n                ")])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("玩法名称:")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                  "+t._s(t.formtwoInfo.name)+"\n                ")])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("基本赔率:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t.formtwoInfo.baseOdds))])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("基准金猪:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t._f("currencyNum")(t.formtwoInfo.basePig)))])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("最小投注:")]),t._v(" "),a("div",{staticClass:"name"},[a("div",{staticClass:"name"},[t._v(t._s(t._f("currencyNum")(t.formtwoInfo.pigMin)))])])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("最大投注:")]),t._v(" "),a("div",{staticClass:"name"},[a("div",{staticClass:"name"},[t._v(t._s(t._f("currencyNum")(t.formtwoInfo.pigMax)))])])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("中奖概率:")]),t._v(" "),a("div",{staticClass:"name"},[a("div",{staticClass:"name"},[t._v(t._s(t.formtwoInfo.probability))])])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("开奖概率:")]),t._v(" "),a("div",{staticClass:"name"},[a("div",{staticClass:"name"},[t._v(t._s(t.formtwoInfo.openProbability))])])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("创建时间:")]),t._v(" "),a("div",{staticClass:"name"},[t._v(t._s(t._f("dateFormat")(t.formtwoInfo.createTime)))])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("状态:")]),t._v(" "),a("div",{staticClass:"name"},[1==t.formtwoInfo.status?a("span",[t._v("已启用")]):t._e(),t._v(" "),2==t.formtwoInfo.status?a("span",[t._v("已停用")]):t._e()])])])])]),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogTableDetail=!1}}},[t._v("取 消")])],1)],1)],2),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,70],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bz-game-manage-header"},[e("h3",[this._v("宝猪28/游戏管理")]),this._v(" "),e("hr")])}]};var i=a("VU/8")(s,o,!1,function(t){a("lb6T")},null,null);e.default=i.exports},lb6T:function(t,e){}});