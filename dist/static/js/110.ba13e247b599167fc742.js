webpackJsonp([110],{DX1U:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("bOdI"),s=a.n(o),l=a("xT6B"),r={name:"Commodity",data:function(){var e;return e={searchFrom:{},goodsType:[],imageUrl:"",form1:{id:0},form2:{},messageFrom:{},rules:{typeName:[{required:!0,message:"请选择商品类型",trigger:"change"}],goodsName:[{required:!0,message:"请输入商品名称",trigger:"blur"}],totalCount:[{required:!0,message:"请输入商品总量",trigger:"blur"},{type:"number",message:"请输入仅数字格式",trigger:"blur",transform:function(e){return Number(e)}}],surplusCount:[{required:!0,message:"请输入商品剩余总量",trigger:"blur"},{type:"number",message:"请输入仅数字格式",trigger:"blur",transform:function(e){return Number(e)}}],needIntegral:[{required:!0,message:"请输入所属积分",trigger:"blur"},{type:"number",message:"请输入仅数字格式",trigger:"blur",transform:function(e){return Number(e)}}],simpleRemark:[{required:!0,message:"请输入商品简介",trigger:"blur"}],goodsRemark:[{required:!0,message:"请输入商品描述",trigger:"blur"}],status:[{required:!0,message:"请选择商品状态",trigger:"change"}]},loading:!1,disabled:!1,desactivar:0,start:1,option:""},s()(e,"imageUrl",""),s()(e,"formLabelWidth","100px"),s()(e,"dialogForm",!1),s()(e,"currentPage",1),s()(e,"pageSize",10),s()(e,"totalCount",0),s()(e,"tableData",[]),s()(e,"selectData",[]),s()(e,"showImg",!1),s()(e,"imgSrc",""),s()(e,"dialogEdit",!1),s()(e,"dialogDetail",!1),e},created:function(){this.accountList(),this.getDictionary()},methods:{getDictionary:function(){var e=this;this.$fetch("/api/mGoodsType/typeList").then(function(t){2e3==t.statusCode&&(e.goodsType=t.data)})},updateGrounding:function(e){var t=this,a={id:e,status:2};this.$post("/api/mGoodsInfo/editStatus",a).then(function(e){2e3==e.statusCode?(t.$message({type:"success",message:"修改成功！"}),t.accountList()):t.$message({type:"info",message:"已取消修改"})})},updateUndercarriage:function(e){var t=this,a={id:e,status:1};this.$post("/api/mGoodsInfo/editStatus",a).then(function(e){2e3==e.statusCode?(t.$message({type:"success",message:"修改成功！"}),t.accountList()):t.$message({type:"info",message:"已取消修改"})})},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,goodsName:this.searchFrom.goodsName};this.$fetch("/api/mGoodsInfo/page",t).then(function(t){if(2e3==t.statusCode){for(var a=t.data.list.length-1;a>=0;a--)1==t.data.list[a].status?t.data.list[a].status="待上架":t.data.list[a].status="已上架";e.tableData=t.data.list,e.totalCount=t.data.total}else e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(e){this.imageUrl="",this.dialogForm=!0,this.messageFrom.title="",this.messageFrom.id=null,this.messageFrom.content="",this.option="添加"},updateDate:function(e){var t=this;this.dialogEdit=!0,this.imageUrl="";var a={id:e};this.$fetch("/api/mGoodsInfo/info",a).then(function(e){2e3==e.statusCode?(t.form1=e.data,t.imageUrl=e.data.imgUrl):t.$message({type:"error",message:e.message,duration:3e3})})},updateClick:function(){var e=this,t={id:this.form1.id,typeId:this.form1.typeId,goodsName:this.form1.goodsName,imgUrl:this.imageUrl,totalCount:this.form1.totalCount,surplusCount:this.form1.surplusCount,simpleRemark:this.form1.simpleRemark,goodsRemark:this.form1.goodsRemark};this.$post("/api/mGoodsInfo/edit",t).then(function(t){2e3==t.statusCode?(e.dialogEdit=!1,e.$message({type:"success",message:"修改成功！"}),e.accountList()):e.$message({type:"info",message:"已取消修改"})})},getClick:function(e){var t=this;this.dialogDetail=!0,this.imageUrl="";var a={id:e};this.$fetch("/api/mGoodsInfo/info",a).then(function(e){2e3==e.statusCode?(1==e.data.status?e.data.status="待上架":e.data.status="已上架",t.form2=e.data):t.$message({type:"error",message:e.message,duration:3e3})})},Delete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.delData(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},delData:function(e){var t=this,a={id:e};this.$fetch("/api/mGoodsInfo/del",a).then(function(e){2e3==e.statusCode&&(t.$message({type:"success",message:"删除成功！"}),t.accountList())})},optionBtn:function(e){var t=this;this.$refs[e].validate(function(e){var a={typeId:t.messageFrom.typeName,goodsName:t.messageFrom.goodsName,imgUrl:t.imageUrl,totalCount:t.messageFrom.totalCount,simpleRemark:t.messageFrom.simpleRemark,needIntegral:t.messageFrom.needIntegral,goodsRemark:t.messageFrom.goodsRemark,status:1};t.$post("/api/mGoodsInfo/insert",a).then(function(e){2e3==e.statusCode?(t.$message({type:"success",message:e.message}),t.dialogForm=!1,t.accountList()):t.$message({type:"error",message:e.message})})})},remoteMethod:function(e){var t=this,a={mobile:e};this.$fetch("/api/user/info/search",a).then(function(e){2e3==e.statusCode?t.selectData=e.data:t.$message({type:"error",message:e.message,duration:3e3})})},handleAvatarSuccess:function(e,t){this.imageUrl=e.data},beforeAvatarUpload:function(e){},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(l.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},indexMethod:function(e){return 1*e+1},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"message_wrap"},[a("div",{staticClass:"message_inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.searchFrom}},[a("el-form-item",{attrs:{label:"商品名称：",prop:"goodsName"}},[a("el-input",{attrs:{placeholder:"请输入商品名称",clearable:""},model:{value:e.searchFrom.goodsName,callback:function(t){e.$set(e.searchFrom,"goodsName",t)},expression:"searchFrom.goodsName"}})],1),e._v(" "),a("el-button",{on:{click:function(t){e.search()}}},[e._v("查询")]),e._v(" "),a("el-button",{on:{click:function(t){e.load(0)}}},[e._v("添加")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:e.option,visible:e.dialogForm},on:{"update:visible":function(t){e.dialogForm=t}}},[a("el-form",{ref:"catalogForm",attrs:{model:e.messageFrom,rules:e.rules}},[a("el-form-item",{attrs:{label:"商品类型","label-width":e.formLabelWidth,prop:"typeName"}},[a("el-select",{attrs:{placeholder:"类型名称",clearable:""},model:{value:e.messageFrom.typeName,callback:function(t){e.$set(e.messageFrom,"typeName",t)},expression:"messageFrom.typeName"}},e._l(e.goodsType,function(e,t){return a("el-option",{key:t,attrs:{label:e.typeName,value:e.id}})})),a("br")],1),e._v(" "),a("el-form-item",{attrs:{label:"商品名称：",prop:"goodsName","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"90%"},attrs:{"auto-complete":"off",clearable:"",disabled:e.disabled},model:{value:e.messageFrom.goodsName,callback:function(t){e.$set(e.messageFrom,"goodsName",t)},expression:"messageFrom.goodsName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"图片:",prop:"imgUrl","label-width":e.formLabelWidth}},[a("el-upload",{staticClass:"bannerAvatar-uploader",attrs:{action:"/api/upload","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus bannerAvatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"商品总量：",prop:"totalCount","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"90%"},attrs:{"auto-complete":"off",clearable:"",disabled:e.disabled},model:{value:e.messageFrom.totalCount,callback:function(t){e.$set(e.messageFrom,"totalCount",t)},expression:"messageFrom.totalCount"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所需积分：",prop:"needIntegral","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"90%"},attrs:{"auto-complete":"off",clearable:"",disabled:e.disabled},model:{value:e.messageFrom.needIntegral,callback:function(t){e.$set(e.messageFrom,"needIntegral",t)},expression:"messageFrom.needIntegral"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"简介：",prop:"simpleRemark","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"90%"},attrs:{"auto-complete":"off",clearable:"",disabled:e.disabled},model:{value:e.messageFrom.simpleRemark,callback:function(t){e.$set(e.messageFrom,"simpleRemark",t)},expression:"messageFrom.simpleRemark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商品描述：",prop:"goodsRemark","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"90%"},attrs:{rows:7,type:"textarea","auto-complete":"off",clearable:"",disabled:e.disabled},model:{value:e.messageFrom.goodsRemark,callback:function(t){e.$set(e.messageFrom,"goodsRemark",t)},expression:"messageFrom.goodsRemark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogForm=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.optionBtn("catalogForm")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改商品",visible:e.dialogEdit},on:{"update:visible":function(t){e.dialogEdit=t}}},[a("el-form",{ref:"catalogForm",attrs:{model:e.form1,rules:e.rules}},[a("el-form-item",{attrs:{label:"商品类型","label-width":e.formLabelWidth,prop:"typeId"}},[a("el-select",{attrs:{placeholder:"类型名称",clearable:""},model:{value:e.form1.typeId,callback:function(t){e.$set(e.form1,"typeId",t)},expression:"form1.typeId"}},e._l(e.goodsType,function(e,t){return a("el-option",{key:t,attrs:{label:e.typeName,value:e.id}})})),a("br")],1),e._v(" "),a("el-form-item",{attrs:{label:"商品名称：","label-width":e.formLabelWidth,prop:"goodsName"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form1.goodsName,callback:function(t){e.$set(e.form1,"goodsName",t)},expression:"form1.goodsName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"图片:",prop:"imgUrl","label-width":e.formLabelWidth}},[a("el-upload",{staticClass:"bannerAvatar-uploader",attrs:{action:"/api/upload","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus bannerAvatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",{attrs:{label:"商品总量：","label-width":e.formLabelWidth,prop:"totalCount"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form1.totalCount,callback:function(t){e.$set(e.form1,"totalCount",t)},expression:"form1.totalCount"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"剩余总量：","label-width":e.formLabelWidth,prop:"surplusCount"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form1.surplusCount,callback:function(t){e.$set(e.form1,"surplusCount",t)},expression:"form1.surplusCount"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所需积分：","label-width":e.formLabelWidth,prop:"needIntegral"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form1.needIntegral,callback:function(t){e.$set(e.form1,"needIntegral",t)},expression:"form1.needIntegral"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商品简介：","label-width":e.formLabelWidth,prop:"simpleRemark"}},[a("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form1.simpleRemark,callback:function(t){e.$set(e.form1,"simpleRemark",t)},expression:"form1.simpleRemark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"描述：","label-width":e.formLabelWidth,prop:"goodsRemark"}},[a("el-input",{attrs:{rows:10,type:"textarea","auto-complete":"off"},model:{value:e.form1.goodsRemark,callback:function(t){e.$set(e.form1,"goodsRemark",t)},expression:"form1.goodsRemark"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogEdit=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.updateClick}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"商品详情",visible:e.dialogDetail},on:{"update:visible":function(t){e.dialogDetail=t}}},[a("el-form",{attrs:{model:e.form2}},[a("el-form-item",{attrs:{label:"商品类型","label-width":e.formLabelWidth,prop:"typeId"}},[a("el-select",{attrs:{disabled:"disabled",placeholder:"类型名称",clearable:""},model:{value:e.form2.typeId,callback:function(t){e.$set(e.form2,"typeId",t)},expression:"form2.typeId"}},e._l(e.goodsType,function(e,t){return a("el-option",{key:t,attrs:{label:e.typeName,value:e.id}})})),a("br")],1),e._v(" "),a("el-form-item",{attrs:{label:"商品名称：","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"disabled","auto-complete":"off"},model:{value:e.form2.goodsName,callback:function(t){e.$set(e.form2,"goodsName",t)},expression:"form2.goodsName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商品图片",prop:"imgUrl","label-width":e.formLabelWidth}},[e.form2.imgUrl?a("img",{staticClass:"avatar",attrs:{src:e.form2.imgUrl}}):e._e()]),e._v(" "),a("el-form-item",{attrs:{label:"商品总量：","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"disabled","auto-complete":"off"},model:{value:e.form2.totalCount,callback:function(t){e.$set(e.form2,"totalCount",t)},expression:"form2.totalCount"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"剩余总量：","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"disabled","auto-complete":"off"},model:{value:e.form2.surplusCount,callback:function(t){e.$set(e.form2,"surplusCount",t)},expression:"form2.surplusCount"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所需积分：","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"disabled","auto-complete":"off"},model:{value:e.form2.needIntegral,callback:function(t){e.$set(e.form2,"needIntegral",t)},expression:"form2.needIntegral"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"商品简介：","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"disabled","auto-complete":"off"},model:{value:e.form2.simpleRemark,callback:function(t){e.$set(e.form2,"simpleRemark",t)},expression:"form2.simpleRemark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"描述：","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"disabled",rows:10,type:"textarea","auto-complete":"off"},model:{value:e.form2.goodsRemark,callback:function(t){e.$set(e.form2,"goodsRemark",t)},expression:"form2.goodsRemark"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"上架时间：","label-width":e.formLabelWidth}},[a("el-input",{attrs:{disabled:"disabled","auto-complete":"off"},model:{value:e.form2.shelfDate,callback:function(t){e.$set(e.form2,"shelfDate",t)},expression:"form2.shelfDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态：","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"90%"},attrs:{disabled:"disabled",placeholder:""},model:{value:e.form2.status,callback:function(t){e.$set(e.form2,"status",t)},expression:"form2.status"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogDetail=!1}}},[e._v("确 定")])],1)],1),e._v(" "),a("div",{staticClass:"message-table"},[[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData,height:"580"}},[a("el-table-column",{attrs:{label:"序号",type:"index",index:e.indexMethod,width:"80"}}),e._v(" "),a("el-table-column",{attrs:{prop:"typeName",label:"所属分类"}}),e._v(" "),a("el-table-column",{attrs:{prop:"goodsName",label:"商品名称"}}),e._v(" "),a("el-table-column",{attrs:{label:"商品图片"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{width:"100px",height:"50px"},attrs:{src:t.row.imgUrl},on:{click:function(t){e.clickImg(t)}}})]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"totalCount",label:"商品总量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"surplusCount",label:"剩余总量"}}),e._v(" "),a("el-table-column",{attrs:{prop:"needIntegral",label:"所需积分"}}),e._v(" "),a("el-table-column",{attrs:{prop:"simpleRemark",label:"简介"}}),e._v(" "),a("el-table-column",{attrs:{prop:"shelfDate",label:"上架时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态"}}),e._v(" "),a("el-table-column",{attrs:{prop:"appointStatus",label:"操作",width:"200px"},scopedSlots:e._u([{key:"default",fn:function(t){return["待上架"==t.row.status?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.updateGrounding(t.row.id)}}},[e._v("上架")]):e._e(),e._v(" "),"已上架"==t.row.status?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.updateUndercarriage(t.row.id)}}},[e._v("下架")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.updateDate(t.row.id)}}},[e._v("修改")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.Delete(t.row.id)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.getClick(t.row.id)}}},[e._v("详情")])]}}])})],1)]],2),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"message_header"},[t("h3",[this._v("商品管理")]),this._v(" "),t("hr")])}]};var m=a("VU/8")(r,i,!1,function(e){a("zCwH")},null,null);t.default=m.exports},zCwH:function(e,t){}});