webpackJsonp([59],{ETD2:function(e,t){},qwLV:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("xT6B"),o={name:"PlayGroup",data:function(){return{styleObject:{width:"200px"},w_input:"200px",powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{},roles:{id:"",realname:""},rules:{lotteryPlayedTplId:[{required:!0,message:"请选择彩种玩法模版id",trigger:"change"}],parentId:[{required:!0,message:"请选择父类id",trigger:"change"}],appParentId:[{required:!0,message:"请输入App父类id",trigger:"blur"}],maxAmount:[{required:!0,message:"请输入单项最高*1000",trigger:"blur"}],name:[{required:!0,message:"请输入名称",trigger:"blur"}],hasChild:[{required:!0,message:"请选择是否有子类",trigger:"change"}],level:[{required:!0,message:"请选择等级",trigger:"change"}],displaysort:[{required:!0,message:"请输入排序",trigger:"blur"}],isEnable:[{required:!0,message:"请选择是否可用",trigger:"change"}],isDelete:[{required:!0,message:"请选择是否删除",trigger:"change"}],parentName:[{required:!0,message:"请输入parentName",trigger:"blur"}]},formLabelWidth:"150px",currentPage:1,pageSize:10,totalCount:0,formInline:{lotteryPlayedTplId:1},tableData:[],isShow:!1,selectDept:[],selectData:[],staff:1,company:2,lotteryPlayed:[],PlayedGroup:[]}},created:function(){this.menuId=this.$route.query.id,this.playedList(),this.queryBtns(),this.accountList()},methods:{GroupTap:function(){var e=this,t="";1==this.dialogTableVisible&&(t=this.formtwo.lotteryPlayedTplId),1==this.dialogFormVisible&&(t=this.form.lotteryPlayedTplId),this.PlayedGroup=[];var l={lotteryPlayedTplId:t};this.$fetch("/guess/lotteryPlayedGroup/queryParentGroup",l).then(function(t){(t.statusCode+"").startsWith("2")&&(e.PlayedGroup=t.data)})},playedList:function(){var e=this;this.$fetch("/guess/lottery/page").then(function(t){(t.statusCode+"").startsWith("2")&&(e.lotteryPlayed=t.data)})},queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var l=t.data.length-1;l>=0;l--)"add"==t.data[l].btnCode&&(e.add=!0),"upd"==t.data[l].btnCode&&(e.upd=!0,e.powerTrue=!0,e.optionW="150px"),"del"==t.data[l].btnCode&&(e.del=!0,e.powerTrue=!0,e.optionW="150px"),e.upd&&e.del&&(e.powerTrue=!0,e.optionW="225px")})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var l=e[t.property];return void 0==l?"":Object(a.a)(new Date(l),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,lotteryPlayedTplId:this.formInline.lotteryPlayedTplId};this.$fetch("/guess/lotteryPlayedGroup/queryList",t).then(function(t){if((t.statusCode+"").startsWith("2")){for(var l=t.data.list.length-1;l>=0;l--)"1"==t.data.list[l].hasChild?t.data.list[l].hasChild="有":t.data.list[l].hasChild="没有","1"==t.data.list[l].isEnable?t.data.list[l].isEnable="可用":t.data.list[l].isEnable="不可用","1"==t.data.list[l].isDelete?t.data.list[l].isDelete="删除":t.data.list[l].isDelete="未删除";e.tableData=t.data.list,e.totalCount=t.data.total}else e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.dialogFormVisible=!0},addBtn:function(e){var t=this;this.form.parentId=0,this.$refs[e].validate(function(e){e&&t.$post("/guess/lotteryPlayedGroup/save",t.form).then(function(e){(e.statusCode+"").startsWith("2")?(t.dialogFormVisible=!1,t.$message({type:"success",message:"添加成功！"}),t.accountList()):t.$message({type:"error",message:e.message})})})},Delete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.delData(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},delData:function(e){var t=this,l={id:e};this.$fetch("/guess/lotteryPlayedGroup/delete",l).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"删除成功！"}),t.accountList()):t.$message({type:"error",message:"删除失败！"})})},getInfo:function(e){var t=this;this.dialogTableVisible=!0,this.$fetch("/guess/lotteryPlayedGroup/queryOne",{id:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(t.formtwo=e.data,t.GroupTap())})},update:function(e){var t=this;this.$put("/guess/lotteryPlayedGroup/update",this.formtwo).then(function(e){(e.statusCode+"").startsWith("2")&&(t.$message({type:"success",message:"修改成功！"}),t.dialogTableVisible=!1,t.accountList())})},getOne:function(e){var t=this;this.dialogTableDetail=!0,this.$fetch("/guess/lotteryPlayedGroup/queryOne",{id:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(t.formtwoInfo=e.data)})},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()},toggle:function(e){this.isShow=!this.isShow}}},r={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"administratormanage-wrap"},[l("div",{staticClass:"administratormanage-inner"},[e._m(0),e._v(" "),l("div",[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[l("el-form-item",{attrs:{label:"彩种:"}},[l("el-select",{style:e.styleObject,attrs:{placeholder:"请选择彩种"},model:{value:e.formInline.lotteryPlayedTplId,callback:function(t){e.$set(e.formInline,"lotteryPlayedTplId",t)},expression:"formInline.lotteryPlayedTplId"}},e._l(e.lotteryPlayed,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.lotteryPlayedTplId}})}))],1),e._v(" "),l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")]),e._v(" "),e.add?l("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.load()}}},[e._v("添加")]):e._e()],1)],1),e._v(" "),l("div",{staticClass:"administratormanage-table"},[[l("el-table",{attrs:{data:e.tableData,height:"580"}},[l("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"50"}}),e._v(" "),l("el-table-column",{attrs:{"min-width":"120px",fixed:"left",prop:"lotteryName",label:"彩种玩法模板"}}),e._v(" "),l("el-table-column",{attrs:{"min-width":"120px",prop:"name",label:"名称"}}),e._v(" "),l("el-table-column",{attrs:{"min-width":"250px",prop:"parentName",label:"父类名称"}}),e._v(" "),l("el-table-column",{attrs:{"min-width":"150px",prop:"hasChild",label:"是否有子类"}}),e._v(" "),l("el-table-column",{attrs:{"min-width":"150px",prop:"isDelete",label:"是否删除"}}),e._v(" "),l("el-table-column",{attrs:{"min-width":"150px",prop:"isEnable",label:"是否可用"}}),e._v(" "),l("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(l){e.getOne(t.row.id)}}},[e._v("详情")]),e._v(" "),e.del&&"未删除"==t.row.isDelete?l("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(l){e.Delete(t.row.id)}}},[e._v("删除")]):e._e(),e._v(" "),e.upd?l("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(l){e.getInfo(t.row.id)}}},[e._v("修改")]):e._e()]}}])})],1)],e._v(" "),l("el-dialog",{attrs:{title:"添加玩法组",visible:e.dialogFormVisible,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种玩法模版:",prop:"lotteryPlayedTplId","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},on:{change:e.GroupTap},model:{value:e.form.lotteryPlayedTplId,callback:function(t){e.$set(e.form,"lotteryPlayedTplId",t)},expression:"form.lotteryPlayedTplId"}},e._l(e.lotteryPlayed,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.lotteryPlayedTplId}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"名称:","label-width":e.formLabelWidth,prop:"name"}},[l("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.name,callback:function(t){e.$set(e.form,"name",t)},expression:"form.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[e.form.lotteryPlayedTplId?l("el-form-item",{attrs:{label:"App父类:",prop:"appParentId","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.form.appParentId,callback:function(t){e.$set(e.form,"appParentId",t)},expression:"form.appParentId"}},[l("el-option",{attrs:{label:"顶级",value:"0"}}),e._v(" "),e._l(e.PlayedGroup,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.id}})})],2)],1):e._e()],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否有子类:",prop:"hasChild","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.form.hasChild,callback:function(t){e.$set(e.form,"hasChild",t)},expression:"form.hasChild"}},[l("el-option",{attrs:{label:"有",value:"1"}}),e._v(" "),l("el-option",{attrs:{label:"没有",value:"2"}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"等级:","label-width":e.formLabelWidth,prop:"level"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.form.level,callback:function(t){e.$set(e.form,"level",t)},expression:"form.level"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"排序:","label-width":e.formLabelWidth,prop:"displaysort"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.form.displaysort,callback:function(t){e.$set(e.form,"displaysort",t)},expression:"form.displaysort"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"单项最高*1000:","label-width":e.formLabelWidth,prop:"maxAmount"}},[l("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.maxAmount,callback:function(t){e.$set(e.form,"maxAmount",t)},expression:"form.maxAmount"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否删除:",prop:"isDelete","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.form.isDelete,callback:function(t){e.$set(e.form,"isDelete",t)},expression:"form.isDelete"}},[l("el-option",{attrs:{label:"可用",value:"1"}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:"0"}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否可用:",prop:"isEnable","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.form.isEnable,callback:function(t){e.$set(e.form,"isEnable",t)},expression:"form.isEnable"}},[l("el-option",{attrs:{label:"可用",value:"1"}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:"0"}})],1)],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.addBtn("form")}}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"修改玩法组",visible:e.dialogTableVisible,width:"800px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[l("el-form",{attrs:{model:e.formtwo,rules:e.rules}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种玩法模版:",prop:"lotteryPlayedTplId","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},on:{change:e.GroupTap},model:{value:e.formtwo.lotteryPlayedTplId,callback:function(t){e.$set(e.formtwo,"lotteryPlayedTplId",t)},expression:"formtwo.lotteryPlayedTplId"}},e._l(e.lotteryPlayed,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.lotteryPlayedTplId}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"名称:","label-width":e.formLabelWidth,prop:"name"}},[l("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.name,callback:function(t){e.$set(e.formtwo,"name",t)},expression:"formtwo.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"App父类:",prop:"appParentId","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.formtwo.appParentId,callback:function(t){e.$set(e.formtwo,"appParentId",t)},expression:"formtwo.appParentId"}},[l("el-option",{attrs:{label:"顶级",value:0}}),e._v(" "),e._l(e.PlayedGroup,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.id}})})],2)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否有子类:",prop:"hasChild","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.formtwo.hasChild,callback:function(t){e.$set(e.formtwo,"hasChild",t)},expression:"formtwo.hasChild"}},[l("el-option",{attrs:{label:"有",value:1}}),e._v(" "),l("el-option",{attrs:{label:"没有",value:2}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"等级:","label-width":e.formLabelWidth,prop:"level"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.level,callback:function(t){e.$set(e.formtwo,"level",t)},expression:"formtwo.level"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"排序:","label-width":e.formLabelWidth,prop:"displaysort"}},[l("el-input",{style:e.styleObject,attrs:{type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwo.displaysort,callback:function(t){e.$set(e.formtwo,"displaysort",t)},expression:"formtwo.displaysort"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"单项最高*1000:","label-width":e.formLabelWidth,prop:"maxAmount"}},[l("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.maxAmount,callback:function(t){e.$set(e.formtwo,"maxAmount",t)},expression:"formtwo.maxAmount"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否删除:",prop:"isDelete","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.formtwo.isDelete,callback:function(t){e.$set(e.formtwo,"isDelete",t)},expression:"formtwo.isDelete"}},[l("el-option",{attrs:{label:"可用",value:1}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:0}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否可用:",prop:"isEnable","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.formtwo.isEnable,callback:function(t){e.$set(e.formtwo,"isEnable",t)},expression:"formtwo.isEnable"}},[l("el-option",{attrs:{label:"可用",value:1}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:0}})],1)],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update(e.formtwo)}}},[e._v("确 定")])],1)],1),e._v(" "),l("el-dialog",{attrs:{title:"玩法组详情",visible:e.dialogTableDetail,width:"800px"},on:{"update:visible":function(t){e.dialogTableDetail=t}}},[l("el-form",{attrs:{model:e.formtwoInfo,rules:e.rules}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"彩种玩法模版:",prop:"lotteryPlayedTplId","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.lotteryPlayedTplId,callback:function(t){e.$set(e.formtwoInfo,"lotteryPlayedTplId",t)},expression:"formtwoInfo.lotteryPlayedTplId"}},e._l(e.lotteryPlayed,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.lotteryPlayedTplId}})}))],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"名称:","label-width":e.formLabelWidth,prop:"name"}},[l("el-input",{style:e.styleObject,attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.name,callback:function(t){e.$set(e.formtwoInfo,"name",t)},expression:"formtwoInfo.name"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"App父类:",prop:"appParentId","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.appParentId,callback:function(t){e.$set(e.formtwoInfo,"appParentId",t)},expression:"formtwoInfo.appParentId"}},[l("el-option",{attrs:{label:"顶级",value:0}}),e._v(" "),e._l(e.PlayedGroup,function(e,t){return l("el-option",{key:t,attrs:{label:e.name,value:e.id}})})],2)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否有子类:",prop:"hasChild","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.hasChild,callback:function(t){e.$set(e.formtwoInfo,"hasChild",t)},expression:"formtwoInfo.hasChild"}},[l("el-option",{attrs:{label:"有",value:1}}),e._v(" "),l("el-option",{attrs:{label:"没有",value:2}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"等级:","label-width":e.formLabelWidth,prop:"level"}},[l("el-input",{style:e.styleObject,attrs:{disabled:!0,type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.level,callback:function(t){e.$set(e.formtwoInfo,"level",t)},expression:"formtwoInfo.level"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"排序:","label-width":e.formLabelWidth,prop:"displaysort"}},[l("el-input",{style:e.styleObject,attrs:{disabled:!0,type:"number",min:"0","auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.displaysort,callback:function(t){e.$set(e.formtwoInfo,"displaysort",t)},expression:"formtwoInfo.displaysort"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"单项最高*1000:","label-width":e.formLabelWidth,prop:"maxAmount"}},[l("el-input",{style:e.styleObject,attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwoInfo.maxAmount,callback:function(t){e.$set(e.formtwoInfo,"maxAmount",t)},expression:"formtwoInfo.maxAmount"}})],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否删除:",prop:"isDelete","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.isDelete,callback:function(t){e.$set(e.formtwoInfo,"isDelete",t)},expression:"formtwoInfo.isDelete"}},[l("el-option",{attrs:{label:"可用",value:1}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:0}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否可用:",prop:"isEnable","label-width":e.formLabelWidth}},[l("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.isEnable,callback:function(t){e.$set(e.formtwoInfo,"isEnable",t)},expression:"formtwoInfo.isEnable"}},[l("el-option",{attrs:{label:"可用",value:1}}),e._v(" "),l("el-option",{attrs:{label:"不可用",value:0}})],1)],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogTableDetail=!1}}},[e._v("取 消")])],1)],1)],2),e._v(" "),l("div",{staticClass:"block"},[l("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"administratormanage-header"},[t("h3",[this._v("游戏竞猜/玩法组")]),this._v(" "),t("hr")])}]};var s=l("VU/8")(o,r,!1,function(e){l("ETD2")},null,null);t.default=s.exports}});