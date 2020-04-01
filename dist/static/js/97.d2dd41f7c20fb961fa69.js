webpackJsonp([97],{"8wBN":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("NC6I"),o=a.n(l),s=a("xT6B"),r={name:"AdministratorManage",data:function(){return{powerTrue:!1,optionW:"0px",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,form:{realname:"",mobile:"",password:"",status:"1"},role:[],roles:{id:"",realname:""},rules:{realname:[{required:!0,message:"请输入管理员名称",trigger:"blur"}],mobile:[{required:!0,message:"请输入手机号",trigger:"blur"},{min:11,max:11,message:"请输入11位手机号",trigger:"blur"},{type:"number",message:"请输入仅数字格式",trigger:"blur",transform:function(e){return Number(e)}}],password:[{required:!0,message:"请输入密码",trigger:"blur"}],status:[{required:!0,message:"请选择状态",trigger:"change"}],roleId:[{required:!0,message:"请选择角色名称",trigger:"change"}],channelCode:[{required:!0,message:"请选择渠道标识",trigger:"change"}]},formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],tempPassword:"",channelCodeList:[],isSubmit:!1}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList(),this.roleList(),this.ChannelList()},methods:{queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var a=t.data.length-1;a>=0;a--)"add"==t.data[a].btnCode&&(e.add=!0),"upd"==t.data[a].btnCode&&(e.upd=!0,e.powerTrue=!0,e.optionW="75px"),"del"==t.data[a].btnCode&&(e.del=!0,e.powerTrue=!0,e.optionW="75px"),e.upd&&e.del&&(e.powerTrue=!0,e.optionW="150px")})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(s.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,mobile:this.formInline.mobile};this.$fetch("/api/pAdmin/list",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total):e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0,this.isSubmit=!1},addBtn:function(e){var t=this;/0?(13|14|15|18|17|19|16)[0-9]{9}/.test(this.form.mobile)?(this.form.password=o()(this.form.password),this.$refs[e].validate(function(e){e&&(t.$nextTick(function(){this.isSubmit=!0}),t.$post("/api/pAdmin/add",t.form).then(function(e){(e.statusCode+"").startsWith("2")?(t.dialogFormVisible=!1,t.$message({type:"success",message:"添加成功！"}),t.accountList()):(t.$message({type:"error",message:e.message}),t.isSubmit=!1)}))})):this.$message({type:"error",message:"手机号格式错误"})},Delete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.delData(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},delData:function(e){var t=this,a={adminId:e};this.$fetch("/api/pAdmin/remove",a).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"删除成功！"}),t.accountList()):t.$message({type:"error",message:"删除失败！"})})},getInfo:function(e){var t=this;this.tempPassword="",this.dialogTableVisible=!0,this.$fetch("/api/pAdmin/queryOne",{adminId:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(t.tempPassword=e.data.password,t.formtwo=e.data)})},roleList:function(){var e=this;this.$fetch("/api/pRole/queryOption").then(function(t){(t.statusCode+"").startsWith("2")?e.role=t.data:e.$message({type:"error",message:t.message,duration:3e3})})},ChannelList:function(){var e=this;this.$fetch("/api/mChannelInfo/downList").then(function(t){(t.statusCode+"").startsWith("2")?e.channelCodeList=t.data:e.$message({type:"error",message:t.message,duration:3e3})})},update:function(e){var t=this;/0?(13|14|15|18|17|19|16)[0-9]{9}/.test(this.formtwo.mobile)?(this.tempPassword!==this.formtwo.password&&(this.formtwo.password=o()(this.formtwo.password)),this.$put("/api/pAdmin/modify",this.formtwo).then(function(e){(e.statusCode+"").startsWith("2")&&(t.$message({type:"success",message:"修改成功"}),t.dialogTableVisible=!1,t.accountList())})):this.$message({type:"error",message:"手机号格式错误"})},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()},toggle:function(e){this.isShow=!this.isShow}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"administratormanage-wrap"},[a("div",{staticClass:"administratormanage-inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"手机号"}},[a("el-input",{attrs:{placeholder:"请输入手机号",clearable:""},model:{value:e.formInline.mobile,callback:function(t){e.$set(e.formInline,"mobile",t)},expression:"formInline.mobile"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")]),e._v(" "),e.add?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.load()}}},[e._v("添加")]):e._e()],1)],1),e._v(" "),a("div",{staticClass:"administratormanage-table"},[[a("el-table",{attrs:{data:e.tableData,"max-height":"556"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"120"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"left","min-width":"150px",prop:"realname",label:"管理员名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"mobile","min-width":"150px",label:"手机号"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170px",prop:"roleName",label:"角色名称"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170px",prop:"channelCode",label:"渠道标识"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"150px",prop:"createTime",formatter:e.dateFormat,label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("span",{staticClass:"green"},[e._v("正常")]):e._e(),e._v(" "),2==t.row.status?a("span",{staticClass:"red"},[e._v("冻结")]):e._e(),e._v(" "),0==t.row.status?a("span",{staticClass:"zi"},[e._v("已删除")]):e._e()]}}])}),e._v(" "),e.powerTrue?a("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[e.del?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){e.Delete(t.row.adminId)}}},[e._v("删除")]):e._e(),e._v(" "),e.upd?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){e.getInfo(t.row.adminId)}}},[e._v("修改")]):e._e()]}}])}):e._e()],1)],e._v(" "),a("el-dialog",{attrs:{title:"修改管理员管理",visible:e.dialogTableVisible,width:"700px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-form",{attrs:{model:e.formtwo,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"管理员名称:","label-width":e.formLabelWidth,prop:"realname"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.realname,callback:function(t){e.$set(e.formtwo,"realname",t)},expression:"formtwo.realname"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"手机号:","label-width":e.formLabelWidth,prop:"mobile"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.mobile,callback:function(t){e.$set(e.formtwo,"mobile",t)},expression:"formtwo.mobile"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"密码:","label-width":e.formLabelWidth,prop:"password"}},[a("el-input",{attrs:{type:"password","auto-complete":"off",clearable:""},model:{value:e.formtwo.password,callback:function(t){e.$set(e.formtwo,"password",t)},expression:"formtwo.password"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"角色名称:","label-width":e.formLabelWidth,prop:"roleId"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formtwo.roleId,callback:function(t){e.$set(e.formtwo,"roleId",t)},expression:"formtwo.roleId"}},e._l(e.role,function(e,t){return a("el-option",{key:t,attrs:{label:e.roleName,value:e.id}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"用户关系:","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formtwo.userRelation,callback:function(t){e.$set(e.formtwo,"userRelation",t)},expression:"formtwo.userRelation"}},[a("el-option",{attrs:{label:"全部",value:1}}),e._v(" "),a("el-option",{attrs:{label:"直属用户",value:2}}),e._v(" "),a("el-option",{attrs:{label:"非直属用户",value:3}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"渠道标识:","label-width":e.formLabelWidth,prop:"channelCode"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formtwo.channelCode,callback:function(t){e.$set(e.formtwo,"channelCode",t)},expression:"formtwo.channelCode"}},e._l(e.channelCodeList,function(e,t){return a("el-option",{key:t,attrs:{label:e.channelCode,value:e.channelCode}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"状态:","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formtwo.status,callback:function(t){e.$set(e.formtwo,"status",t)},expression:"formtwo.status"}},[a("el-option",{attrs:{label:"正常",value:1}}),e._v(" "),a("el-option",{attrs:{label:"冻结",value:2}})],1)],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update(e.formtwo)}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"添加管理员",visible:e.dialogFormVisible,width:"700px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"管理员名称:","label-width":e.formLabelWidth,prop:"realname"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.realname,callback:function(t){e.$set(e.form,"realname",t)},expression:"form.realname"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"手机号:",prop:"mobile","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.mobile,callback:function(t){e.$set(e.form,"mobile",t)},expression:"form.mobile"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"密码:",prop:"password","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.password,callback:function(t){e.$set(e.form,"password",t)},expression:"form.password"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"角色名称:","label-width":e.formLabelWidth,prop:"roleId"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.form.roleId,callback:function(t){e.$set(e.form,"roleId",t)},expression:"form.roleId"}},e._l(e.role,function(e,t){return a("el-option",{key:t,attrs:{label:e.roleName,value:e.id}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"用户关系:","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:""},model:{value:e.form.userRelation,callback:function(t){e.$set(e.form,"userRelation",t)},expression:"form.userRelation"}},[a("el-option",{attrs:{label:"全部",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"直属用户",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"非直属用户",value:"3"}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"渠道标识:","label-width":e.formLabelWidth,prop:"channelCode"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.form.channelCode,callback:function(t){e.$set(e.form,"channelCode",t)},expression:"form.channelCode"}},e._l(e.channelCodeList,function(e,t){return a("el-option",{key:t,attrs:{label:e.channelCode,value:e.channelCode}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"状态:","label-width":e.formLabelWidth,prop:"status"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[a("el-option",{attrs:{label:"删除",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"正常",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"冻结",value:"2"}})],1)],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:e.isSubmit},on:{click:function(t){e.addBtn("form")}}},[e._v("确 定")])],1)],1)],2),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"administratormanage-header"},[t("h3",[this._v("系统配置/管理员管理")]),this._v(" "),t("hr")])}]};var n=a("VU/8")(r,i,!1,function(e){a("tOSH")},null,null);t.default=n.exports},tOSH:function(e,t){}});