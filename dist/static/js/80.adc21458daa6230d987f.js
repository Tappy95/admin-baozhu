webpackJsonp([80],{EsJg:function(e,t){},m8SK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={name:"DarenReward",data:function(){return{powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,form:{},rules:{darenLevel:[{required:!0,message:"请输入奖励等级",trigger:"blur"},{validator:function(e,t,a){/^[0-9]*$/.test(t)?a():a(new Error("请输入正整数"))},trigger:"blur"}],needNum:[{required:!0,message:"请输入人数要求",trigger:"blur"},{validator:function(e,t,a){/^[0-9]*$/.test(t)?a():a(new Error("请输入正整数"))},trigger:"blur"}],reward:[{required:!0,message:"请输入奖池金币",trigger:"blur"},{validator:function(e,t,a){/^[0-9]*$/.test(t)?a():a(new Error("请输入正整数"))},trigger:"blur"}]},formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],styleObject:{width:"350px"},isSubmit:!1}},filters:{currencyNum:function(e){return parseInt(e).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList()},methods:{queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var a=t.data.length-1;a>=0;a--)"add"==t.data[a].btnCode&&(e.add=!0),"upd"==t.data[a].btnCode&&(e.upd=!0,e.powerTrue=!0,e.optionW="75px"),"del"==t.data[a].btnCode&&(e.del=!0,e.powerTrue=!0,e.optionW="75px"),e.upd&&e.del&&(e.powerTrue=!0,e.optionW="160px")})},indexMethod:function(e){return 1*e+1},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize};this.$fetch("/api/rankDarenConfig/list",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total):e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0,this.isSubmit=!1},addBtn:function(e){var t=this;this.$refs[e].validate(function(e){e&&(t.$nextTick(function(){this.isSubmit=!0}),t.$post("/api/rankDarenConfig/add",t.form).then(function(e){(e.statusCode+"").startsWith("2")?(t.dialogFormVisible=!1,t.$message({type:"success",message:"添加成功！"}),t.accountList()):(t.$message({type:"error",message:e.message}),t.isSubmit=!1)}))})},Delete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.delData(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},delData:function(e){var t=this,a={id:e};this.$fetch("/api/rankDarenConfig/delete",a).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"删除成功！"}),t.accountList()):t.$message({type:"error",message:"删除失败！"})})},getInfo:function(e){var t=this;this.dialogTableVisible=!0,this.$fetch("/api/rankDarenConfig/info",{id:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(t.formtwo=e.data)})},update:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.$put("/api/rankDarenConfig/update",t.formtwo).then(function(e){(e.statusCode+"").startsWith("2")&&(t.$message({type:"success",message:"修改成功！"}),t.dialogTableVisible=!1,t.accountList())})})},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"da-ren-rank-config-wrap"},[a("div",{staticClass:"da-ren-rank-config-inner"},[e._m(0),e._v(" "),a("div",{staticStyle:{"margin-bottom":"20px"}},[a("el-row",[e.add?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.load()}}},[e._v("添加")]):e._e()],1)],1),e._v(" "),a("div",{staticClass:"da-ren-rank-config-table"},[[a("el-table",{attrs:{data:e.tableData,"max-height":"551"}},[a("el-table-column",{attrs:{label:"序号",type:"index",index:e.indexMethod,width:"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"darenLevel",label:"奖励等级"}}),e._v(" "),a("el-table-column",{attrs:{prop:"needNum",label:"人数要求"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("currencyNum")(t.row.needNum)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"reward",label:"奖池金币"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("currencyNum")(t.row.reward)))])]}}])}),e._v(" "),e.powerTrue?a("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[e.del?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){e.Delete(t.row.id)}}},[e._v("删除")]):e._e(),e._v(" "),e.upd?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){e.getInfo(t.row.id)}}},[e._v("修改")]):e._e()]}}])}):e._e()],1)],e._v(" "),a("el-dialog",{attrs:{title:"添加配置",visible:e.dialogFormVisible,width:"700px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"奖励等级","label-width":e.formLabelWidth,prop:"darenLevel"}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.darenLevel,callback:function(t){e.$set(e.form,"darenLevel",t)},expression:"form.darenLevel"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"人数要求","label-width":e.formLabelWidth,prop:"needNum"}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.needNum,callback:function(t){e.$set(e.form,"needNum",t)},expression:"form.needNum"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"奖池金币","label-width":e.formLabelWidth,prop:"reward"}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.reward,callback:function(t){e.$set(e.form,"reward",t)},expression:"form.reward"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:e.isSubmit},on:{click:function(t){e.addBtn("form")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改配置",visible:e.dialogTableVisible,width:"700px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-form",{ref:"formtwo",attrs:{model:e.formtwo,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"奖励等级","label-width":e.formLabelWidth,prop:"darenLevel"}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.darenLevel,callback:function(t){e.$set(e.formtwo,"darenLevel",t)},expression:"formtwo.darenLevel"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"人数要求","label-width":e.formLabelWidth,prop:"needNum"}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.needNum,callback:function(t){e.$set(e.formtwo,"needNum",t)},expression:"formtwo.needNum"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"奖池金币","label-width":e.formLabelWidth,prop:"reward"}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.reward,callback:function(t){e.$set(e.formtwo,"reward",t)},expression:"formtwo.reward"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update("formtwo")}}},[e._v("确 定")])],1)],1)],2),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"da-ren-rank-config-header"},[t("h3",[this._v("达人管理/奖金池配置")]),this._v(" "),t("hr")])}]};var i=a("VU/8")(r,o,!1,function(e){a("EsJg")},null,null);t.default=i.exports}});