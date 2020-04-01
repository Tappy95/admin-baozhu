webpackJsonp([69],{"7RiT":function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("xT6B"),a={name:"GoldEggsType",data:function(){return{powerTrue:!1,optionW:"1",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{},imageUrl:"",rules:{name:[{required:!0,message:"请输入名称",trigger:"blur"}],pigCoin:[{required:!0,message:"请输入消耗金猪",trigger:"blur"},{validator:function(e,t,o){/^[0-9]*$/.test(t)?o():o(new Error("请输入正整数"))},trigger:"blur"}],orders:[{required:!0,message:"请输入排序",trigger:"blur"},{validator:function(e,t,o){/^[0-9]*$/.test(t)?o():o(new Error("请输入正整数"))},trigger:"blur"}],cardSign:[{required:!0,message:"请输入卡号标记",trigger:"blur"}],servicePigCoin:[{required:!0,message:"请输入手续费",trigger:"blur"},{validator:function(e,t,o){/^[0-9]*$/.test(t)?o():o(new Error("请输入正整数"))},trigger:"blur"}]},formLabelWidth:"120px",formInline:{},tableData:[],uploadData:{},selectTime:[],showImg:!1,isSubmit:!1}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList()},filters:{dateFont:function(e){return Object(i.a)(new Date(e),"yyyy-MM-dd hh:mm:sss")},currenNum:function(e){return parseInt(e).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")}},methods:{queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var o=t.data.length-1;o>=0;o--)"add"==t.data[o].btnCode&&(e.add=!0),"upd"==t.data[o].btnCode&&(e.upd=!0,e.powerTrue=!0,e.optionW="75"),"del"==t.data[o].btnCode&&(e.del=!0,e.powerTrue=!0,e.optionW="75"),e.upd&&e.del&&(e.powerTrue=!0,e.optionW="150")})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var o=e[t.property];return void 0==o?"":Object(i.a)(new Date(o),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this;this.$fetch("/api/goldEggType/list").then(function(t){(t.statusCode+"").startsWith("2")?e.tableData=t.data.list:e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0,this.imageUrl="",this.selectTime=[],this.isSubmit=!1},addBtn:function(e){var t=this;this.$refs[e].validate(function(e){e&&(t.$nextTick(function(){this.isSubmit=!0}),t.$post("/api/goldEggType/add",t.form).then(function(e){(e.statusCode+"").startsWith("2")?(t.dialogFormVisible=!1,t.$message({type:"success",message:"添加成功！"}),t.accountList()):(t.$message({type:"error",message:e.message}),t.isSubmit=!1)}))})},Delete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.delData(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},delData:function(e){var t=this,o={id:e};this.$fetch("/api/goldEggType/delete",o).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"删除成功！"}),t.accountList()):t.$message({type:"error",message:"删除失败！"})})},getInfo:function(e){var t=this;this.dialogTableVisible=!0,this.$fetch("/api/goldEggType/info",{id:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(t.formtwo=e.data)})},update:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.$put("/api/goldEggType/update",t.formtwo).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"修改成功！"}),t.dialogTableVisible=!1,t.accountList()):t.$message({type:"danger",message:e.message})})})},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()}}},r={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"gold-eggs-type-wrap"},[o("div",{staticClass:"gold-eggs-type-inner"},[e._m(0),e._v(" "),o("div",[o("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[o("el-form-item",[e.add?o("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.load()}}},[e._v("添加")]):e._e()],1)],1)],1),e._v(" "),o("div",{staticClass:"gold-eggs-type-table"},[[o("el-table",{attrs:{data:e.tableData,"max-height":"556"}},[o("el-table-column",{attrs:{label:"序号",type:"index",fixed:"left",index:e.indexMethod,width:"80"}}),e._v(" "),o("el-table-column",{attrs:{prop:"name","min-width":"150",fixed:"left",label:"名称"}}),e._v(" "),o("el-table-column",{attrs:{fixed:"left",width:"170",prop:"pigCoin",label:"消耗金猪数"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                "+e._s(e._f("currenNum")(t.row.pigCoin))+"\n            ")]}}])}),e._v(" "),o("el-table-column",{attrs:{"min-width":"200",prop:"servicePigCoin",label:"手续费"}}),e._v(" "),o("el-table-column",{attrs:{"min-width":"200",prop:"cardSign",label:"卡号标记"}}),e._v(" "),o("el-table-column",{attrs:{width:"120",prop:"orders",label:"排序"}}),e._v(" "),o("el-table-column",{attrs:{width:"170",prop:"creatorTime",formatter:e.dateFormat,label:"创建时间"}}),e._v(" "),o("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[e.del?o("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(o){e.Delete(t.row.id)}}},[e._v("删除")]):e._e(),e._v(" "),e.upd?o("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(o){e.getInfo(t.row.id)}}},[e._v("修改")]):e._e()]}}])})],1)],e._v(" "),o("el-dialog",{attrs:{title:"添加",visible:e.dialogFormVisible,width:"600px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[o("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[o("el-row",[o("el-col",{attrs:{span:22}},[o("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth,prop:"name"}},[o("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:22}},[o("el-form-item",{attrs:{label:"消耗金猪","label-width":e.formLabelWidth,prop:"pigCoin"}},[o("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.pigCoin,callback:function(t){e.$set(e.form,"pigCoin",t)},expression:"form.pigCoin"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:22}},[o("el-form-item",{attrs:{label:"手续费","label-width":e.formLabelWidth,prop:"servicePigCoin"}},[o("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.servicePigCoin,callback:function(t){e.$set(e.form,"servicePigCoin",t)},expression:"form.servicePigCoin"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:22}},[o("el-form-item",{attrs:{label:"卡号标记","label-width":e.formLabelWidth,prop:"cardSign"}},[o("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.cardSign,callback:function(t){e.$set(e.form,"cardSign",t)},expression:"form.cardSign"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"排序","label-width":e.formLabelWidth,prop:"orders"}},[o("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.orders,callback:function(t){e.$set(e.form,"orders",t)},expression:"form.orders"}})],1)],1)],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary",disabled:e.isSubmit},on:{click:function(t){e.addBtn("form")}}},[e._v("确 定")])],1)],1),e._v(" "),o("el-dialog",{attrs:{title:"修改",visible:e.dialogTableVisible,width:"600px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[o("el-form",{ref:"formtwo",attrs:{model:e.formtwo,rules:e.rules}},[o("el-row",[o("el-col",{attrs:{span:22}},[o("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth,prop:"name"}},[o("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.name,callback:function(t){e.$set(e.formtwo,"name",t)},expression:"formtwo.name"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:22}},[o("el-form-item",{attrs:{label:"消耗金猪","label-width":e.formLabelWidth,prop:"pigCoin"}},[o("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.pigCoin,callback:function(t){e.$set(e.formtwo,"pigCoin",t)},expression:"formtwo.pigCoin"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:22}},[o("el-form-item",{attrs:{label:"手续费","label-width":e.formLabelWidth,prop:"servicePigCoin"}},[o("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.servicePigCoin,callback:function(t){e.$set(e.formtwo,"servicePigCoin",t)},expression:"formtwo.servicePigCoin"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:22}},[o("el-form-item",{attrs:{label:"卡号标记","label-width":e.formLabelWidth,prop:"cardSign"}},[o("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.cardSign,callback:function(t){e.$set(e.formtwo,"cardSign",t)},expression:"formtwo.cardSign"}})],1)],1),e._v(" "),o("el-col",{attrs:{span:12}},[o("el-form-item",{attrs:{label:"排序","label-width":e.formLabelWidth,prop:"orders"}},[o("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.orders,callback:function(t){e.$set(e.formtwo,"orders",t)},expression:"formtwo.orders"}})],1)],1)],1)],1),e._v(" "),o("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[o("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),o("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update("formtwo")}}},[e._v("确 定")])],1)],1)],2)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"gold-eggs-type-header"},[t("h3",[this._v("砸金蛋/金蛋类型")]),this._v(" "),t("hr")])}]};var l=o("VU/8")(a,r,!1,function(e){o("nVYs")},null,null);t.default=l.exports},nVYs:function(e,t){}});