webpackJsonp([45],{"4WkG":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("xT6B"),i={name:"ResourceType",data:function(){return{powerTrue:!1,optionW:"",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{noticeTitle:"",noticeContent:"",password:"",isRelease:"1"},roles:{id:"",realname:""},rules:{rewardType:[{required:!0,message:"请选择奖品类型",trigger:"change"}],rewardNum:[{required:!0,message:"请输入奖励数量",trigger:"blur"}],rate:[{required:!0,message:"请输入概率",trigger:"blur"}]},formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],isShow:!1,selectDept:[],selectData:[],staff:1,company:2}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList()},methods:{queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var a=t.data.length-1;a>=0;a--)"add"==t.data[a].btnCode&&(e.add=!0),"upd"==t.data[a].btnCode&&(e.upd=!0,e.powerTrue=!0,e.optionW="75px"),"del"==t.data[a].btnCode&&(e.del=!0,e.powerTrue=!0,e.optionW="75px"),e.upd&&e.del&&(e.powerTrue=!0,e.optionW="150px")})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(r.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,rewardType:this.formInline.rewardType};this.$fetch("/wish/gameRewardRate/list",t).then(function(t){if((t.statusCode+"").startsWith("2")){e.tableData=t.data.list,e.totalCount=t.data.total;for(var a=0;a<t.data.list.length;a++)1==t.data.list[a].rewardType?t.data.list[a].rewardType="现金":t.data.list[a].rewardType="分红心"}else e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0},addBtn:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.$post("/wish/gameRewardRate/add",t.form).then(function(e){(e.statusCode+"").startsWith("2")?(t.dialogFormVisible=!1,t.$message({type:"success",message:"添加成功！"}),t.accountList()):t.$message({type:"error",message:e.message})})})},Delete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.delData(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},delData:function(e){var t=this,a={id:e};this.$post("/wish/gameRewardRate/remove",a).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"删除成功！"}),t.formInline={},t.accountList()):t.$message({type:"error",message:"删除失败！"})})},getInfo:function(e){var t=this;this.dialogTableVisible=!0,this.$fetch("/wish/gameRewardRate/info",{id:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(t.formtwo=e.data)})},update:function(e){var t=this;this.$put("/wish/gameRewardRate/modify",this.formtwo).then(function(e){(e.statusCode+"").startsWith("2")&&(t.$message({type:"success",message:"修改成功！"}),t.dialogTableVisible=!1,t.accountList())})},getOne:function(e){var t=this;this.dialogTableDetail=!0,this.$fetch("/api/appNotice/info",{id:e}).then(function(e){null!=e.data&&("2"==e.data.staffType?t.isShow=!1:t.isShow=!0,e.data.createrTime=Object(r.a)(new Date(e.data.createrTime),"yyyy-MM-dd hh:mm:sss"),t.formtwoInfo=e.data)})},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()},toggle:function(e){this.isShow=!this.isShow}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"administratormanage-wrap"},[a("div",{staticClass:"administratormanage-inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"奖品类型:"}},[a("el-select",{attrs:{placeholder:"请选择状态",clearable:""},model:{value:e.formInline.rewardType,callback:function(t){e.$set(e.formInline,"rewardType",t)},expression:"formInline.rewardType"}},[a("el-option",{attrs:{label:"现金",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"分红心",value:"2"}})],1)],1),e._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")]),e._v(" "),e.add?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.load()}}},[e._v("添加")]):e._e()],1)],1),e._v(" "),a("div",{staticClass:"administratormanage-table"},[[a("el-table",{attrs:{data:e.tableData,height:"580"}},[a("el-table-column",{attrs:{label:"序号",type:"index",index:e.indexMethod,width:"120"}}),e._v(" "),a("el-table-column",{attrs:{prop:"rewardType",label:"奖品类型"}}),e._v(" "),a("el-table-column",{attrs:{prop:"rewardNum",label:"奖励数量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"rate",label:"概率"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间",formatter:e.dateFormat}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[e.del?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){e.Delete(t.row.id)}}},[e._v("删除")]):e._e(),e._v(" "),e.upd?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){e.getInfo(t.row.id)}}},[e._v("修改")]):e._e()]}}])})],1)],e._v(" "),a("el-dialog",{attrs:{title:"添加",visible:e.dialogFormVisible,width:"600px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-form-item",{attrs:{label:"奖品类型","label-width":e.formLabelWidth,prop:"rewardType"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.form.rewardType,callback:function(t){e.$set(e.form,"rewardType",t)},expression:"form.rewardType"}},[a("el-option",{attrs:{label:"现金",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"分红心",value:"2"}})],1)],1),e._v(" "),a("div",[a("p",{staticStyle:{margin:"-20px auto 2px 120px",color:"red","font-size":"12px"}},[e._v("如奖品类型为现金，则奖励数量请兑换成金币数")])]),e._v(" "),a("el-form-item",{attrs:{label:"奖励数量","label-width":e.formLabelWidth,prop:"rewardNum"}},[a("el-input",{staticStyle:{width:"340px"},attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.rewardNum,callback:function(t){e.$set(e.form,"rewardNum",t)},expression:"form.rewardNum"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"概率","label-width":e.formLabelWidth,prop:"rate"}},[a("el-input",{staticStyle:{width:"340px"},attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.rate,callback:function(t){e.$set(e.form,"rate",t)},expression:"form.rate"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addBtn("form")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改",visible:e.dialogTableVisible,width:"600px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-form",{attrs:{model:e.formtwo}},[a("el-form-item",{attrs:{label:"奖品类型:",prop:"rewardType","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formtwo.rewardType,callback:function(t){e.$set(e.formtwo,"rewardType",t)},expression:"formtwo.rewardType"}},[a("el-option",{attrs:{label:"现金",value:1}}),e._v(" "),a("el-option",{attrs:{label:"分红心",value:2}})],1)],1),e._v(" "),a("div",[a("p",{staticStyle:{margin:"-20px auto 2px 120px",color:"red","font-size":"12px"}},[e._v("如奖品类型为现金，则奖励数量请兑换成金币数")])]),e._v(" "),a("el-form-item",{attrs:{label:"奖励数量","label-width":e.formLabelWidth,prop:"rewardNum"}},[a("el-input",{staticStyle:{width:"340px"},attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.rewardNum,callback:function(t){e.$set(e.formtwo,"rewardNum",t)},expression:"formtwo.rewardNum"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"概率","label-width":e.formLabelWidth,prop:"rate"}},[a("el-input",{staticStyle:{width:"340px"},attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.rate,callback:function(t){e.$set(e.formtwo,"rate",t)},expression:"formtwo.rate"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update(e.formtwo)}}},[e._v("确 定")])],1)],1)],2),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"administratormanage-header"},[t("h3",[this._v("心愿猪/试玩奖品概率设置")]),this._v(" "),t("hr")])}]};var l=a("VU/8")(i,o,!1,function(e){a("5oy8")},null,null);t.default=l.exports},"5oy8":function(e,t){}});