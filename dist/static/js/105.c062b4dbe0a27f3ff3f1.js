webpackJsonp([105],{"0LM5":function(e,t){},BOaC:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("xT6B"),o={name:"OddsManage",data:function(){return{styleObject:{width:"200px"},w_input:"200px",powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{},roles:{id:"",realname:""},rules:{lotteryPlayedTplId:[{required:!0,message:"请选择彩种玩法模版id",trigger:"change"}],lotteryPlayedGroupId:[{required:!0,message:"请选择彩种玩法组id",trigger:"change"}],name:[{required:!0,message:"请输入玩法名称",trigger:"blur"}],code:[{required:!0,message:"请输入code",trigger:"blur"}],odds:[{required:!0,message:"请输入赔率*1000",trigger:"blur"}],oddsBase:[{required:!0,message:"请输入最低赔率*1000",trigger:"blur"}],rule:[{required:!0,message:"请输入规则",trigger:"blur"}],refundRule:[{required:!0,message:"请输入返现规则",trigger:"blur"}],info:[{required:!0,message:"请输入玩法说明",trigger:"blur"}],example:[{required:!0,message:"请输入中奖举例",trigger:"blur"}],minCharge:[{required:!0,message:"请输入最低消费金额",trigger:"blur"}],maxCharge:[{required:!0,message:"请输入单注最高",trigger:"blur"}],maxCount:[{required:!0,message:"请输入最高投注注数",trigger:"blur"}],allCount:[{required:!0,message:"请输入总注数",trigger:"blur"}],isOfficial:[{required:!0,message:"请选择是否官方",trigger:"change"}],displaysort:[{required:!0,message:"请输入排序",trigger:"blur"}],isEnable:[{required:!0,message:"请选择是否可用",trigger:"change"}],isDelete:[{required:!0,message:"请选择是否删除",trigger:"change"}],zjMax:[{required:!0,message:"请输入最大中奖号码计算函数",trigger:"blur"}],playedTpl:[{required:!0,message:"请输入玩法页面模板",trigger:"blur"}],selectNum:[{required:!0,message:"请输入每注选几个号码",trigger:"blur"}],betCountFun:[{required:!0,message:"请输入中奖规则函数",trigger:"blur"}],simpleInfo:[{required:!0,message:"请输入玩法简单说明",trigger:"blur"}]},formLabelWidth:"150px",currentPage:1,pageSize:10,totalCount:0,formInline:{lotteryPlayedTplId:1},tableData:[],isShow:!1,selectDept:[],selectData:[],staff:1,company:2,lotteryPlayed:[],PlayedGroup:[]}},created:function(){this.menuId=this.$route.query.id,this.playedList(),this.queryBtns(),this.accountList()},methods:{GroupTap:function(){var e=this,t="";1==this.dialogTableVisible&&(t=this.formtwo.lotteryPlayedTplId),1==this.dialogFormVisible&&(t=this.form.lotteryPlayedTplId),this.PlayedGroup=[];var l={lotteryPlayedTplId:t};this.$fetch("/guess/lotteryPlayedGroup/playGroup",l).then(function(t){(t.statusCode+"").startsWith("2")&&(e.PlayedGroup=t.data)})},playedList:function(){var e=this;this.$fetch("/guess/lottery/page").then(function(t){(t.statusCode+"").startsWith("2")&&(e.lotteryPlayed=t.data)})},queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var l=t.data.length-1;l>=0;l--)"add"==t.data[l].btnCode&&(e.add=!0),"upd"==t.data[l].btnCode&&(e.upd=!0,e.powerTrue=!0,e.optionW="150px"),"del"==t.data[l].btnCode&&(e.del=!0,e.powerTrue=!0,e.optionW="150px"),e.upd&&e.del&&(e.powerTrue=!0,e.optionW="220px")})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var l=e[t.property];return void 0==l?"":Object(a.a)(new Date(l),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,lotteryPlayedTplId:this.formInline.lotteryPlayedTplId};this.$fetch("/guess/lotteryPlayed/queryList",t).then(function(t){if((t.statusCode+"").startsWith("2")){for(var l=t.data.list.length-1;l>=0;l--)"1"==t.data.list[l].isOfficial?t.data.list[l].isOfficial="是":t.data.list[l].isOfficial="否","1"==t.data.list[l].isEnable?t.data.list[l].isEnable="可用":t.data.list[l].isEnable="不可用","1"==t.data.list[l].isDelete?t.data.list[l].isDelete="删除":t.data.list[l].isDelete="未删除";e.tableData=t.data.list,e.totalCount=t.data.total}else e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.dialogFormVisible=!0},addBtn:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.$post("/guess/lotteryPlayed/save",t.form).then(function(e){(e.statusCode+"").startsWith("2")?(t.dialogFormVisible=!1,t.$message({type:"success",message:"添加成功！"}),t.accountList()):t.$message({type:"error",message:e.message})})})},Delete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.delData(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},delData:function(e){var t=this,l={id:e,isDelete:1};this.$fetch("/guess/lotteryPlayed/delete",l).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"删除成功！"}),t.accountList()):t.$message({type:"error",message:"删除失败！"})})},getInfo:function(e){var t=this;this.dialogTableVisible=!0,this.$fetch("/guess/lotteryPlayed/queryOne",{id:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(t.formtwo=e.data,t.GroupTap())})},update:function(e){var t=this;this.$put("/guess/lotteryPlayed/update",this.formtwo).then(function(e){(e.statusCode+"").startsWith("2")&&(t.$message({type:"success",message:"修改成功！"}),t.dialogTableVisible=!1,t.accountList())})},getOne:function(e){var t=this;this.dialogTableDetail=!0,this.$fetch("/guess/lotteryPlayed/queryOne",{id:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(t.formtwoInfo=e.data)})},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()},toggle:function(e){this.isShow=!this.isShow}}},r={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"administratormanage-wrap"},[l("div",{staticClass:"administratormanage-inner"},[e._m(0),e._v(" "),l("div",[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[l("el-form-item",{attrs:{label:"彩种:"}},[l("el-select",{style:e.styleObject,attrs:{placeholder:"请选择彩种"},model:{value:e.formInline.lotteryPlayedTplId,callback:function(t){e.$set(e.formInline,"lotteryPlayedTplId",t)},expression:"formInline.lotteryPlayedTplId"}},e._l(e.lotteryPlayed,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.lotteryPlayedTplId}})}))],1),e._v(" "),l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")]),e._v(" "),e.add?l("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.load()}}},[e._v("添加")]):e._e()],1)],1),e._v(" "),l("div",{staticClass:"administratormanage-table"},[[l("el-table",{attrs:{data:e.tableData,height:"580"}},[l("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"50"}}),e._v(" "),l("el-table-column",{attrs:{fixed:"left",width:"150px",prop:"lotteryName",label:"彩种玩法模板"}}),e._v(" "),l("el-table-column",{attrs:{width:"120px",prop:"palyName",label:"彩种玩法组"}}),e._v(" "),l("el-table-column",{attrs:{width:"120px",prop:"name",label:"玩法名称"}}),e._v(" "),l("el-table-column",{attrs:{width:"150px",prop:"code",label:"code"}}),e._v(" "),l("el-table-column",{attrs:{width:"120px",prop:"odds",label:"赔率*1000"}}),e._v(" "),l("el-table-column",{attrs:{width:"150px",prop:"oddsBase",label:"最低赔率*1000"}}),e._v(" "),l("el-table-column",{attrs:{width:"200px",prop:"rule",label:"规则"}}),e._v(" "),l("el-table-column",{attrs:{width:"150px",prop:"maxCount",label:"最高投注注数"}}),e._v(" "),l("el-table-column",{attrs:{width:"100px",prop:"isOfficial",label:"是否官方"}}),e._v(" "),l("el-table-column",{attrs:{width:"120px",prop:"isDelete",label:"是否删除"}}),e._v(" "),l("el-table-column",{attrs:{width:"100px",prop:"isEnable",label:"是否可用"}}),e._v(" "),l("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(l){e.getOne(t.row.id)}}},[e._v("详情")]),e._v(" "),e.del&&"未删除"==t.row.isDelete?l("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(l){e.Delete(t.row.id)}}},[e._v("删除")]):e._e(),e._v(" "),e.upd?l("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(l){e.getInfo(t.row.id)}}},[e._v("修改")]):e._e()]}}])})],1)],e._v(" "),l("el-dialog",{attrs:{title:"添加赔率",visible:e.dialogFormVisible,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种玩法模版:",prop:"lotteryPlayedTplId","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},on:{change:e.GroupTap},model:{value:e.form.lotteryPlayedTplId,callback:function(t){e.$set(e.form,"lotteryPlayedTplId",t)},expression:"form.lotteryPlayedTplId"}},e._l(e.lotteryPlayed,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.lotteryPlayedTplId}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种玩法组:",prop:"lotteryPlayedGroupId","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.form.lotteryPlayedGroupId,callback:function(t){e.$set(e.form,"lotteryPlayedGroupId",t)},expression:"form.lotteryPlayedGroupId"}},e._l(e.PlayedGroup,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"排序:","label-width":e.formLabelWidth,prop:"displaysort"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.form.displaysort,callback:function(t){e.$set(e.form,"displaysort",t)},expression:"form.displaysort"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"code:","label-width":e.formLabelWidth}},[l("el-input",{style:e.styleObject,attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.form.code,callback:function(t){e.$set(e.form,"code",t)},expression:"form.code"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"赔率*1000:","label-width":e.formLabelWidth,prop:"odds"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.form.odds,callback:function(t){e.$set(e.form,"odds",t)},expression:"form.odds"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"最低赔率*1000:","label-width":e.formLabelWidth,prop:"oddsBase"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.form.oddsBase,callback:function(t){e.$set(e.form,"oddsBase",t)},expression:"form.oddsBase"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"单注最高:","label-width":e.formLabelWidth,prop:"minCharge"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.form.minCharge,callback:function(t){e.$set(e.form,"minCharge",t)},expression:"form.minCharge"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"最高投注注数:","label-width":e.formLabelWidth,prop:"maxCount"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.form.maxCount,callback:function(t){e.$set(e.form,"maxCount",t)},expression:"form.maxCount"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"每注选几个号码:","label-width":e.formLabelWidth,prop:"selectNum"}},[l("el-input",{style:e.styleObject,attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.form.selectNum,callback:function(t){e.$set(e.form,"selectNum",t)},expression:"form.selectNum"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"总注数:","label-width":e.formLabelWidth,prop:"allCount"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.form.allCount,callback:function(t){e.$set(e.form,"allCount",t)},expression:"form.allCount"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否官方:",prop:"isOfficial","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.form.isOfficial,callback:function(t){e.$set(e.form,"isOfficial",t)},expression:"form.isOfficial"}},[l("el-option",{attrs:{label:"是",value:"1"}}),e._v(" "),l("el-option",{attrs:{label:"不是",value:"0"}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否可用:",prop:"isEnable","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.form.isEnable,callback:function(t){e.$set(e.form,"isEnable",t)},expression:"form.isEnable"}},[l("el-option",{attrs:{label:"可用",value:"1"}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:"0"}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否删除:",prop:"isDelete","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.form.isDelete,callback:function(t){e.$set(e.form,"isDelete",t)},expression:"form.isDelete"}},[l("el-option",{attrs:{label:"可用",value:"1"}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:"0"}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"最大中奖号码计算函数:","label-width":"180px"}},[l("el-input",{attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.form.zjMax,callback:function(t){e.$set(e.form,"zjMax",t)},expression:"form.zjMax"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法页面模板:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.form.playedTpl,callback:function(t){e.$set(e.form,"playedTpl",t)},expression:"form.playedTpl"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"中奖规则函数:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.form.betCountFun,callback:function(t){e.$set(e.form,"betCountFun",t)},expression:"form.betCountFun"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"规则:","label-width":e.formLabelWidth,prop:"rule"}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.form.rule,callback:function(t){e.$set(e.form,"rule",t)},expression:"form.rule"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"返现规则:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.form.refundRule,callback:function(t){e.$set(e.form,"refundRule",t)},expression:"form.refundRule"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法名称:","label-width":e.formLabelWidth,prop:"name"}},[l("el-input",{attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法说明:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.form.info,callback:function(t){e.$set(e.form,"info",t)},expression:"form.info"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法简单说明",prop:"simpleInfo","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.form.simpleInfo,callback:function(t){e.$set(e.form,"simpleInfo",t)},expression:"form.simpleInfo"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"中奖举例:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.form.example,callback:function(t){e.$set(e.form,"example",t)},expression:"form.example"}})],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addBtn("form")}}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"修改赔率",visible:e.dialogTableVisible,width:"800px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[l("el-form",{attrs:{model:e.formtwo,rules:e.rules}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种玩法模版:",prop:"lotteryPlayedTplId","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},on:{change:e.GroupTap},model:{value:e.formtwo.lotteryPlayedTplId,callback:function(t){e.$set(e.formtwo,"lotteryPlayedTplId",t)},expression:"formtwo.lotteryPlayedTplId"}},e._l(e.lotteryPlayed,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.lotteryPlayedTplId}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种玩法组:",prop:"lotteryPlayedGroupId","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.formtwo.lotteryPlayedGroupId,callback:function(t){e.$set(e.formtwo,"lotteryPlayedGroupId",t)},expression:"formtwo.lotteryPlayedGroupId"}},e._l(e.PlayedGroup,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"排序:","label-width":e.formLabelWidth,prop:"displaysort"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.displaysort,callback:function(t){e.$set(e.formtwo,"displaysort",t)},expression:"formtwo.displaysort"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"code:","label-width":e.formLabelWidth}},[l("el-input",{style:e.styleObject,attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.code,callback:function(t){e.$set(e.formtwo,"code",t)},expression:"formtwo.code"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"赔率*1000:","label-width":e.formLabelWidth,prop:"odds"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.odds,callback:function(t){e.$set(e.formtwo,"odds",t)},expression:"formtwo.odds"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"最低赔率*1000:","label-width":e.formLabelWidth,prop:"oddsBase"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.oddsBase,callback:function(t){e.$set(e.formtwo,"oddsBase",t)},expression:"formtwo.oddsBase"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"单注最高:","label-width":e.formLabelWidth,prop:"minCharge"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.minCharge,callback:function(t){e.$set(e.formtwo,"minCharge",t)},expression:"formtwo.minCharge"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"最高投注注数:","label-width":e.formLabelWidth,prop:"maxCount"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.maxCount,callback:function(t){e.$set(e.formtwo,"maxCount",t)},expression:"formtwo.maxCount"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"每注选几个号码:","label-width":e.formLabelWidth,prop:"selectNum"}},[l("el-input",{style:e.styleObject,attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.selectNum,callback:function(t){e.$set(e.formtwo,"selectNum",t)},expression:"formtwo.selectNum"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"总注数:","label-width":e.formLabelWidth,prop:"allCount"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.allCount,callback:function(t){e.$set(e.formtwo,"allCount",t)},expression:"formtwo.allCount"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否官方:",prop:"isOfficial","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.formtwo.isOfficial,callback:function(t){e.$set(e.formtwo,"isOfficial",t)},expression:"formtwo.isOfficial"}},[l("el-option",{attrs:{label:"是",value:1}}),e._v(" "),l("el-option",{attrs:{label:"不是",value:0}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否可用:",prop:"isEnable","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.formtwo.isEnable,callback:function(t){e.$set(e.formtwo,"isEnable",t)},expression:"formtwo.isEnable"}},[l("el-option",{attrs:{label:"可用",value:1}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:0}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否删除:",prop:"isDelete","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.formtwo.isDelete,callback:function(t){e.$set(e.formtwo,"isDelete",t)},expression:"formtwo.isDelete"}},[l("el-option",{attrs:{label:"可用",value:1}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:0}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"最大中奖号码计算函数:","label-width":"180px"}},[l("el-input",{attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.zjMax,callback:function(t){e.$set(e.formtwo,"zjMax",t)},expression:"formtwo.zjMax"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法页面模板:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.playedTpl,callback:function(t){e.$set(e.formtwo,"playedTpl",t)},expression:"formtwo.playedTpl"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"中奖规则函数:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.betCountFun,callback:function(t){e.$set(e.formtwo,"betCountFun",t)},expression:"formtwo.betCountFun"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"规则:","label-width":e.formLabelWidth,prop:"rule"}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwo.rule,callback:function(t){e.$set(e.formtwo,"rule",t)},expression:"formtwo.rule"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"返现规则:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwo.refundRule,callback:function(t){e.$set(e.formtwo,"refundRule",t)},expression:"formtwo.refundRule"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法名称:","label-width":e.formLabelWidth,prop:"name"}},[l("el-input",{attrs:{min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.name,callback:function(t){e.$set(e.formtwo,"name",t)},expression:"formtwo.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法说明:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwo.info,callback:function(t){e.$set(e.formtwo,"info",t)},expression:"formtwo.info"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法简单说明","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwo.simpleInfo,callback:function(t){e.$set(e.formtwo,"simpleInfo",t)},expression:"formtwo.simpleInfo"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"中奖举例:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwo.example,callback:function(t){e.$set(e.formtwo,"example",t)},expression:"formtwo.example"}})],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update(e.formtwo)}}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"赔率详情",visible:e.dialogTableDetail,width:"800px"},on:{"update:visible":function(t){e.dialogTableDetail=t}}},[l("el-form",{attrs:{model:e.formtwoInfo}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种玩法模版:","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},on:{change:e.GroupTap},model:{value:e.formtwoInfo.lotteryPlayedTplId,callback:function(t){e.$set(e.formtwoInfo,"lotteryPlayedTplId",t)},expression:"formtwoInfo.lotteryPlayedTplId"}},e._l(e.lotteryPlayed,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.lotteryPlayedTplId}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种玩法组:","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.lotteryPlayedGroupId,callback:function(t){e.$set(e.formtwoInfo,"lotteryPlayedGroupId",t)},expression:"formtwoInfo.lotteryPlayedGroupId"}},e._l(e.PlayedGroup,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.id}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"排序:","label-width":e.formLabelWidth}},[l("el-input",{style:e.styleObject,attrs:{disabled:!0,type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.displaysort,callback:function(t){e.$set(e.formtwoInfo,"displaysort",t)},expression:"formtwoInfo.displaysort"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"code:","label-width":e.formLabelWidth}},[l("el-input",{style:e.styleObject,attrs:{disabled:!0,min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.code,callback:function(t){e.$set(e.formtwoInfo,"code",t)},expression:"formtwoInfo.code"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"赔率*1000:","label-width":e.formLabelWidth}},[l("el-input",{style:e.styleObject,attrs:{disabled:!0,type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.odds,callback:function(t){e.$set(e.formtwoInfo,"odds",t)},expression:"formtwoInfo.odds"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"最低赔率*1000:","label-width":e.formLabelWidth}},[l("el-input",{style:e.styleObject,attrs:{disabled:!0,type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.oddsBase,callback:function(t){e.$set(e.formtwoInfo,"oddsBase",t)},expression:"formtwoInfo.oddsBase"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"单注最高:","label-width":e.formLabelWidth}},[l("el-input",{style:e.styleObject,attrs:{type:"number",disabled:!0,min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.minCharge,callback:function(t){e.$set(e.formtwoInfo,"minCharge",t)},expression:"formtwoInfo.minCharge"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"最高投注注数:","label-width":e.formLabelWidth}},[l("el-input",{style:e.styleObject,attrs:{type:"number",disabled:!0,min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.maxCount,callback:function(t){e.$set(e.formtwoInfo,"maxCount",t)},expression:"formtwoInfo.maxCount"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"每注选几个号码:","label-width":e.formLabelWidth}},[l("el-input",{style:e.styleObject,attrs:{min:"0",disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.selectNum,callback:function(t){e.$set(e.formtwoInfo,"selectNum",t)},expression:"formtwoInfo.selectNum"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"总注数:","label-width":e.formLabelWidth}},[l("el-input",{style:e.styleObject,attrs:{disabled:!0,type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.allCount,callback:function(t){e.$set(e.formtwoInfo,"allCount",t)},expression:"formtwoInfo.allCount"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否官方:","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.isOfficial,callback:function(t){e.$set(e.formtwoInfo,"isOfficial",t)},expression:"formtwoInfo.isOfficial"}},[l("el-option",{attrs:{label:"是",value:1}}),e._v(" "),l("el-option",{attrs:{label:"不是",value:0}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否可用:","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.isEnable,callback:function(t){e.$set(e.formtwoInfo,"isEnable",t)},expression:"formtwoInfo.isEnable"}},[l("el-option",{attrs:{label:"可用",value:1}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:0}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否删除:","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.isDelete,callback:function(t){e.$set(e.formtwoInfo,"isDelete",t)},expression:"formtwoInfo.isDelete"}},[l("el-option",{attrs:{label:"可用",value:1}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:0}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"最大中奖号码计算函数:","label-width":"180px"}},[l("el-input",{attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.zjMax,callback:function(t){e.$set(e.formtwoInfo,"zjMax",t)},expression:"formtwoInfo.zjMax"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法页面模板:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.playedTpl,callback:function(t){e.$set(e.formtwoInfo,"playedTpl",t)},expression:"formtwoInfo.playedTpl"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"中奖规则函数:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.betCountFun,callback:function(t){e.$set(e.formtwoInfo,"betCountFun",t)},expression:"formtwoInfo.betCountFun"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"规则:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{disabled:!0,type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.rule,callback:function(t){e.$set(e.formtwoInfo,"rule",t)},expression:"formtwoInfo.rule"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"返现规则:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{type:"textarea",disabled:!0,autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.refundRule,callback:function(t){e.$set(e.formtwoInfo,"refundRule",t)},expression:"formtwoInfo.refundRule"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法名称:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.name,callback:function(t){e.$set(e.formtwoInfo,"name",t)},expression:"formtwoInfo.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法说明:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{disabled:!0,type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.info,callback:function(t){e.$set(e.formtwoInfo,"info",t)},expression:"formtwoInfo.info"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"玩法简单说明","label-width":e.formLabelWidth}},[l("el-input",{attrs:{disabled:!0,type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.simpleInfo,callback:function(t){e.$set(e.formtwoInfo,"simpleInfo",t)},expression:"formtwoInfo.simpleInfo"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:20}},[l("el-form-item",{attrs:{label:"中奖举例:","label-width":e.formLabelWidth}},[l("el-input",{attrs:{disabled:!0,type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.example,callback:function(t){e.$set(e.formtwoInfo,"example",t)},expression:"formtwoInfo.example"}})],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogTableDetail=!1}}},[e._v("取 消")])],1)],1)],2),e._v(" "),l("div",{staticClass:"block"},[l("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"administratormanage-header"},[t("h3",[this._v("游戏竞猜/赔率")]),this._v(" "),t("hr")])}]};var s=l("VU/8")(o,r,!1,function(e){l("0LM5")},null,null);t.default=s.exports}});