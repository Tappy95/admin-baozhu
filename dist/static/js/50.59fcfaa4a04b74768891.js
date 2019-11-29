webpackJsonp([50],{bjT1:function(e,t){},gfbk:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("xT6B"),l=a("iPXC"),o={name:"Dictionary",data:function(){return{uploadData:{},powerTrue:!1,optionW:"0px",menuId:"",add:!1,del:!1,upd:!1,typeImg:!1,typeText:!1,imageUrl:"",dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,form:{status:"1"},rules:{dicName:[{required:!0,message:"请输入字典名称",trigger:"blur"}],dicValue:[{required:!0,message:"请输入字典值",trigger:"blur"}],dicRemark:[{required:!0,message:"请输入字典描述",trigger:"blur"}],valueType:[{required:!0,message:"请选择字典类型",trigger:"change"}],status:[{required:!0,message:"请选择状态",trigger:"change"}],imageUrl:[{required:!0,message:"请选择图片",trigger:"change"}]},formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],aa:"",isSubmit:!1}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList(),this.uploadData={token:Object(l.d)("token")}},methods:{queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var a=t.data.length-1;a>=0;a--)"add"==t.data[a].btnCode&&(e.add=!0),"upd"==t.data[a].btnCode&&(e.upd=!0,e.powerTrue=!0,e.optionW="75px"),"del"==t.data[a].btnCode&&(e.del=!0,e.powerTrue=!0,e.optionW="75px"),e.upd&&e.del&&(e.powerTrue=!0,e.optionW="150px")})},handleAvatarSuccess:function(e,t){this.imageUrl=e.data},beforeAvatarUpload:function(e){},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(i.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},typeChange:function(e){1==e?(this.typeText=!0,this.typeImg=!1):(this.typeText=!1,this.typeImg=!0)},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,dicName:this.formInline.dicName};this.$fetch("/api/pDictionary/list",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total):e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.typeImg=!1,this.typeText=!1,this.form={},this.imageUrl="",this.dialogFormVisible=!0,this.formInline={},this.isSubmit=!1},addBtn:function(e){var t=this;2==this.form.valueType&&(this.form.dicValue=this.imageUrl,this.form.imageUrl=this.imageUrl),this.$refs[e].validate(function(e){e&&(t.$nextTick(function(){this.isSubmit=!0}),t.$post("/api/pDictionary/add",t.form).then(function(e){(e.statusCode+"").startsWith("2")?(t.dialogFormVisible=!1,t.$message({type:"success",message:"添加成功！"}),t.accountList()):(t.$message({type:"error",message:e.message}),t.isSubmit=!1)}))})},Delete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.delData(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},delData:function(e){var t=this,a={id:e,status:3};this.$fetch("/api/pDictionary/remove",a).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"删除成功！"}),t.accountList()):t.$message({type:"error",message:"删除失败！"})})},getInfo:function(e){var t=this;this.dialogTableVisible=!0,this.$fetch("/api/pDictionary/queryOne",{id:e}).then(function(e){(e.statusCode+"").startsWith("2")&&null!=e.data&&(1==e.data.valueType?(t.typeText=!0,t.typeImg=!1):(t.typeText=!1,t.typeImg=!0,t.imageUrl=e.data.dicValue),t.formtwo=e.data)})},update:function(e){var t=this;2==this.formtwo.valueType&&(this.formtwo.dicValue=this.imageUrl,this.formtwo.imageUrl=this.imageUrl),this.$put("/api/pDictionary/modify",this.formtwo).then(function(e){(e.statusCode+"").startsWith("2")&&(t.$message({type:"success",message:"修改成功！"}),t.dialogTableVisible=!1,t.accountList())})},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()},toggle:function(e){this.isShow=!this.isShow}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"dictionary-wrap"},[a("div",{staticClass:"dictionary-inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"字典名"}},[a("el-input",{attrs:{placeholder:"请输入字典名",clearable:""},model:{value:e.formInline.dicName,callback:function(t){e.$set(e.formInline,"dicName",t)},expression:"formInline.dicName"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")]),e._v(" "),e.add?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.load()}}},[e._v("添加")]):e._e()],1)],1),e._v(" "),a("div",{staticClass:"dictionary-table"},[[a("el-table",{attrs:{data:e.tableData,"max-height":"556"}},[a("el-table-column",{attrs:{label:"序号",type:"index",index:e.indexMethod,width:"80"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"150",prop:"dicName",label:"字典名称"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"150",prop:"dicValue",label:"字典值"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"150",prop:"dicRemark",label:"字典描述"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"valueType",label:"字典类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.valueType?a("span",{staticClass:"green"},[e._v("文本")]):e._e(),e._v(" "),2==t.row.valueType?a("span",{staticClass:"red"},[e._v("图片")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"120",prop:"status",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?a("span",{staticClass:"green"},[e._v("正常")]):e._e(),e._v(" "),2==t.row.status?a("span",{staticClass:"red"},[e._v("已禁用")]):e._e(),e._v(" "),3==t.row.status?a("span",{staticClass:"zi"},[e._v("已删除")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"modifyTime",label:"修改时间",formatter:e.dateFormat}}),e._v(" "),e.powerTrue?a("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[3!=t.row.status&&e.del?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){e.Delete(t.row.id)}}},[e._v("删除")]):e._e(),e._v(" "),e.upd?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){e.getInfo(t.row.id)}}},[e._v("修改")]):e._e()]}}])}):e._e()],1)],e._v(" "),a("el-dialog",{attrs:{title:"添加字典",visible:e.dialogFormVisible,width:"600px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-form-item",{attrs:{label:"字典名称:","label-width":e.formLabelWidth,prop:"dicName"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.dicName,callback:function(t){e.$set(e.form,"dicName",t)},expression:"form.dicName"}})],1),e._v(" "),e.typeText?a("el-form-item",{attrs:{label:"字典值:",prop:"dicValue","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.dicValue,callback:function(t){e.$set(e.form,"dicValue",t)},expression:"form.dicValue"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"字典描述",prop:"dicRemark","label-width":e.formLabelWidth}},[a("el-input",{staticClass:"text_area",attrs:{autosize:{minRows:4,maxRows:6},type:"textarea","auto-complete":"off",clearable:""},model:{value:e.form.dicRemark,callback:function(t){e.$set(e.form,"dicRemark",t)},expression:"form.dicRemark"}})],1),e._v(" "),e.typeImg?a("el-form-item",{attrs:{label:"url地址",prop:"imageUrl","label-width":e.formLabelWidth}},[a("el-upload",{staticClass:"bannerAvatar-uploader",attrs:{action:"/api/upload",data:e.uploadData,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus bannerAvatar-uploader-icon"})])],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"字典类型:","label-width":e.formLabelWidth,prop:"valueType"}},[a("el-select",{attrs:{placeholder:""},on:{change:function(t){e.typeChange(e.form.valueType)}},model:{value:e.form.valueType,callback:function(t){e.$set(e.form,"valueType",t)},expression:"form.valueType"}},[a("el-option",{attrs:{label:"文本",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"图片",value:"2"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"状态","label-width":e.formLabelWidth,prop:"status"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.form.status,callback:function(t){e.$set(e.form,"status",t)},expression:"form.status"}},[a("el-option",{attrs:{label:"启用",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"禁用",value:"2"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:e.isSubmit},on:{click:function(t){e.addBtn("form")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改字典",visible:e.dialogTableVisible,width:"600px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-form",{attrs:{model:e.formtwo}},[a("el-form-item",{attrs:{label:"字典名称","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.dicName,callback:function(t){e.$set(e.formtwo,"dicName",t)},expression:"formtwo.dicName"}})],1),e._v(" "),e.typeText?a("el-form-item",{attrs:{label:"字典值","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.dicValue,callback:function(t){e.$set(e.formtwo,"dicValue",t)},expression:"formtwo.dicValue"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"字典描述","label-width":e.formLabelWidth}},[a("el-input",{staticClass:"text_area",attrs:{type:"textarea","auto-complete":"off",clearable:""},model:{value:e.formtwo.dicRemark,callback:function(t){e.$set(e.formtwo,"dicRemark",t)},expression:"formtwo.dicRemark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"字典类型","label-width":e.formLabelWidth,prop:"valueType"}},[a("el-select",{attrs:{placeholder:""},on:{change:function(t){e.typeChange(e.formtwo.valueType)}},model:{value:e.formtwo.valueType,callback:function(t){e.$set(e.formtwo,"valueType",t)},expression:"formtwo.valueType"}},[a("el-option",{attrs:{label:"文本",value:1}}),e._v(" "),a("el-option",{attrs:{label:"图片",value:2}})],1)],1),e._v(" "),e.typeImg?a("el-form-item",{attrs:{label:"url地址",prop:"imageUrl","label-width":e.formLabelWidth}},[a("el-upload",{staticClass:"bannerAvatar-uploader",attrs:{action:"/api/upload",data:e.uploadData,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus bannerAvatar-uploader-icon"})])],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"状态","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formtwo.status,callback:function(t){e.$set(e.formtwo,"status",t)},expression:"formtwo.status"}},[a("el-option",{attrs:{label:"启用",value:1}}),e._v(" "),a("el-option",{attrs:{label:"禁用",value:2}}),e._v(" "),a("el-option",{attrs:{label:"删除",value:3}})],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update(e.formtwo)}}},[e._v("确 定")])],1)],1)],2),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"dictionary-header"},[t("h3",[this._v("系统配置/字典管理")]),this._v(" "),t("hr")])}]};var r=a("VU/8")(o,s,!1,function(e){a("bjT1")},null,null);t.default=r.exports}});