webpackJsonp([44],{"g+TE":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("xT6B"),s=a("iPXC"),l={name:"NewsNotice",data:function(){return{powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,upper:!1,duobao:!1,choujiang:!1,dialogDuoBao:!1,dialogTableVisible:!1,formtwo:{},formdb:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{},imageUrl:"",rules:{goodsName:[{required:!0,message:"请输入商品名称",trigger:"blur"}],goodsImg:[{required:!0,message:"请输入商品图片",trigger:"blur"}],goodsType:[{required:!0,message:"请选择商品类型",trigger:"change"}],answerMin:[{required:!0,message:"请输入答案最小值",trigger:"blur"}],answerMax:[{required:!0,message:"请输入答案最大值",trigger:"blur"}],tipsRange:[{required:!0,message:"请输入提示范围",trigger:"blur"}],rankingMin:[{required:!0,message:"请输入名次最小值",trigger:"blur"}],rankingMax:[{required:!0,message:"请输入名次最大值",trigger:"blur"}],state:[{required:!0,message:"请选择状态",trigger:"change"}],price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],isDb:[{required:!0,message:"请选择是否夺宝商品",trigger:"change"}],timesNum:[{required:!0,message:"请输入夺宝所需人次数",trigger:"blur"}],timesXy:[{required:!0,message:"请输入夺宝每次需要心愿值",trigger:"blur"}],dbOrders:[{required:!0,message:"请输入排序",trigger:"blur"}],bannerImg:[{required:!0,message:"请选择轮播图",trigger:"change"}]},formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],uploadData:{},selectTime:[],showImg:!1,isSubmit:!1,tops:!1,fileList:[],goodsList:[]}},components:{"big-img":a("fM1o").a},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList(),this.uploadData={token:Object(s.d)("token")},this.goodsType()},filters:{dateFont:function(e){return Object(o.a)(new Date(e),"yyyy-MM-dd hh:mm:sss")}},methods:{clickImg:function(e){this.showImg=!0,this.imgSrc=e},viewImg:function(){this.showImg=!1},handleAvatarSuccess:function(e,t){this.imageUrl=e.data},beforeAvatarUpload:function(e){},selectTap:function(e){},queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var a=t.data.length-1;a>=0;a--){if("add"==t.data[a].btnCode&&t.data.length>=2){var o=75*(t.data.length-1);e.optionW=o}"add"==t.data[a].btnCode&&(e.add=!0),"choujiang"==t.data[a].btnCode&&(e.choujiang=!0),"upd"==t.data[a].btnCode&&(e.upd=!0,e.powerTrue=!0,e.optionW="75"),"upper"==t.data[a].btnCode&&(e.upper=!0,e.powerTrue=!0,e.optionW="75"),"tops"==t.data[a].btnCode&&(e.tops=!0,e.optionW="75"),"duobao"==t.data[a].btnCode&&(e.duobao=!0,e.optionW="75")}})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(o.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,goodsName:this.formInline.goodsName,isDb:this.formInline.isDb,goodsType:this.formInline.goodsType,state:this.formInline.state,isGuess:this.formInline.isGuess};this.$fetch("/wish/guesGoods/list",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total):e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0,this.imageUrl="",this.selectTime=[],this.isSubmit=!1,this.goodsType()},addBtn:function(e){var t=this;this.form.goodsImg=this.imageUrl,this.$refs[e].validate(function(e){e&&(t.$nextTick(function(){this.isSubmit=!0}),t.$post("/wish/guesGoods/add",t.form).then(function(e){(e.statusCode+"").startsWith("2")?(t.dialogFormVisible=!1,t.$message({type:"success",message:"添加成功！"}),t.accountList()):(t.$message({type:"error",message:e.message}),t.isSubmit=!1)}))})},isUpper:function(e,t){var a=this,o={id:e,state:t};this.$put("/wish/guesGoods/updateState",o).then(function(e){(e.statusCode+"").startsWith("2")&&(a.$message({type:"success",message:"操作成功！"}),a.accountList())})},getInfo:function(e){var t=this;this.dialogTableVisible=!0,this.$fetch("/wish/guesGoods/info",{id:e}).then(function(e){if((e.statusCode+"").startsWith("2")){var a=[];if(e.data.releaserTime){var o=new Date(e.data.releaserTime);a.push(o)}if(e.data.cancelTime){var s=new Date(e.data.cancelTime);a.push(s)}e.data.releaserTime&&e.data.cancelTime&&(t.selectTime=a),t.imageUrl=e.data.goodsImg,t.formtwo=e.data}})},update:function(e){var t=this;this.formtwo.goodsImg=this.imageUrl,this.$put("/wish/guesGoods/update",this.formtwo).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"修改成功！"}),t.dialogTableVisible=!1,t.accountList()):t.$message({type:"danger",message:e.message})})},isTop:function(e,t){var a=this,o="";1==t?o="不置顶":2==t&&(o="置顶"),this.$confirm("此操作将"+o+"该商品,是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){a.$post("/wish/guesGoods/updateTop",{id:e,isTop:t}).then(function(e){(e.statusCode+"").startsWith("2")&&(a.$message({type:"success",message:"删除成功！"}),a.accountList())})}).catch(function(){a.$message({type:"info",message:"已取消删除"})})},isDbao:function(e){var t=this;this.dialogDuoBao=!0,this.fileList=[],this.$fetch("/wish/guesGoods/info",{id:e}).then(function(e){if((e.statusCode+"").startsWith("2")){if(e.data.bannerImg)for(var a=e.data.bannerImg.split(","),o=0;o<a.length;o++){var s={};s.url=a[o],t.fileList.push(s)}t.formdb=e.data}})},updateformdb:function(e){var t=this;this.formdb.bannerImg="";var a="";if(this.fileList.length>0)for(var o=0;o<this.fileList.length;o++)a+=this.fileList[o].url+",";this.formdb.bannerImg=a.substr(0,a.length-1),this.$refs[e].validate(function(e){e&&t.$put("/wish/guesGoods/updateDb",t.formdb).then(function(e){(e.statusCode+"").startsWith("2")&&(t.$message({type:"success",message:"修改成功！"}),t.dialogDuoBao=!1,t.accountList())})})},handlePicture:function(e,t,a){var o={};o.url=e.data,this.fileList.push(o)},handleRemove:function(e,t){this.fileList=t},handlePictureCardPreview:function(e,t){this.showImg=!0,this.imgSrc=e.url},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()},goodsType:function(){var e=this;this.$fetch("/wish/goodsType/list").then(function(t){(t.statusCode+"").startsWith("2")&&(e.goodsList=t.data)})},isCj:function(e,t){var a=this,o="";o=1==t?"不抽奖":"抽奖",this.$confirm("此操作将设置该商品为"+o+"状态, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){a.$post("/wish/guesGoods/updateGuess",{id:e,isGuess:t}).then(function(e){(e.statusCode+"").startsWith("2")&&(a.$message({type:"success",message:"设置"+o+"状态成功！"}),a.accountList())})}).catch(function(){a.$message({type:"info",message:"已取消操作"})})}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"news-notice-wrap"},[a("div",{staticClass:"news-notice-inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"商品名称"}},[a("el-input",{attrs:{placeholder:"请输入商品名称",clearable:""},model:{value:e.formInline.goodsName,callback:function(t){e.$set(e.formInline,"goodsName",t)},expression:"formInline.goodsName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"是否夺宝商品"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formInline.isDb,callback:function(t){e.$set(e.formInline,"isDb",t)},expression:"formInline.isDb"}},[a("el-option",{attrs:{label:"否",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"商品类型"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formInline.goodsType,callback:function(t){e.$set(e.formInline,"goodsType",t)},expression:"formInline.goodsType"}},[e._l(e.goodsList,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.typeName,value:e.id}})}),e._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"上架状态"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formInline.state,callback:function(t){e.$set(e.formInline,"state",t)},expression:"formInline.state"}},[a("el-option",{attrs:{label:"上架",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"下架",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"是否抽奖商品"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formInline.isGuess,callback:function(t){e.$set(e.formInline,"isGuess",t)},expression:"formInline.isGuess"}},[a("el-option",{attrs:{label:"否",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"是",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")])],1),e._v(" "),a("el-form-item",{attrs:{label:""}},[e.add?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.load()}}},[e._v("添加")]):e._e()],1)],1)],1),e._v(" "),a("div",{staticClass:"news-notice-table"},[[a("el-table",{attrs:{data:e.tableData,"max-height":"556"}},[a("el-table-column",{attrs:{label:"序号",type:"index",fixed:"left",index:e.indexMethod,width:"80"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"left",width:"170",prop:"goodsName",label:"商品名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"yichu"},[e._v("\n                  "+e._s(t.row.goodsName)+"\n                ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"200px",label:"商品图片"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{"max-width":"45px","max-height":"45px"},attrs:{src:t.row.goodsImg},on:{click:function(a){e.clickImg(t.row.goodsImg)}}})]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"typeName",label:"商品类型"}}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"isDb",label:"是否夺宝商品"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.isDb?a("span",[e._v("否")]):e._e(),e._v(" "),2==t.row.isDb?a("span",[e._v("是")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"isGuess",label:"是否抽奖商品"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.isGuess?a("span",[e._v("否")]):e._e(),e._v(" "),2==t.row.isGuess?a("span",[e._v("是")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"answerMin",label:"答案最小值"}}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"answerMax",label:"答案最大值"}}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"tipsRange",label:"提示范围"}}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"rankingMin",label:"名次最小值"}}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"rankingMax",label:"名次最大值"}}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"state",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.state?a("span",[e._v("上架中")]):e._e(),e._v(" "),2==t.row.state?a("span",[e._v("已下架")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"createTime",formatter:e.dateFormat,label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[e.upd?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){e.getInfo(t.row.id)}}},[e._v("修改")]):e._e(),e._v(" "),e.upper&&1==t.row.state&&1==t.row.isTop?a("el-button",{attrs:{type:"danger",plain:"",size:"mini"},on:{click:function(a){e.isUpper(t.row.id,2)}}},[e._v("下架")]):e._e(),e._v(" "),e.upper&&2==t.row.state?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){e.isUpper(t.row.id,1)}}},[e._v("上架")]):e._e(),e._v(" "),e.tops&&1==t.row.state&&1==t.row.isTop?a("el-button",{attrs:{type:"danger",plain:"",size:"mini"},on:{click:function(a){e.isTop(t.row.id,2)}}},[e._v("置顶")]):e._e(),e._v(" "),e.tops&&1==t.row.state&&2==t.row.isTop?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){e.isTop(t.row.id,1)}}},[e._v("不置顶")]):e._e(),e._v(" "),e.duobao&&1==t.row.state?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){e.isDbao(t.row.id)}}},[e._v("夺宝")]):e._e(),e._v(" "),e.choujiang&&1==t.row.isGuess&&1==t.row.state?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){e.isCj(t.row.id,2)}}},[e._v("抽奖")]):e._e(),e._v(" "),e.choujiang&&2==t.row.isGuess&&1==t.row.state?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){e.isCj(t.row.id,1)}}},[e._v("不抽奖")]):e._e()]}}])})],1)],e._v(" "),e.showImg?a("big-img",{attrs:{imgSrc:e.imgSrc},on:{clickit:e.viewImg}}):e._e(),e._v(" "),a("el-dialog",{attrs:{title:"添加商品",visible:e.dialogFormVisible,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"商品名称","label-width":e.formLabelWidth,prop:"goodsName"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.goodsName,callback:function(t){e.$set(e.form,"goodsName",t)},expression:"form.goodsName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"图片:","label-width":e.formLabelWidth}},[a("el-upload",{staticClass:"bannerAvatar-uploader",attrs:{action:"/api/upload",data:e.uploadData,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[a("div",{staticClass:"img_loadBox"},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus bannerAvatar-uploader-icon"})])])],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"商品类型","label-width":e.formLabelWidth,prop:"goodsType"}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:""},model:{value:e.form.goodsType,callback:function(t){e.$set(e.form,"goodsType",t)},expression:"form.goodsType"}},e._l(e.goodsList,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.typeName,value:e.id}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"商品价格:","label-width":e.formLabelWidth,prop:"price"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.price,callback:function(t){e.$set(e.form,"price",t)},expression:"form.price"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"答案最小值:","label-width":e.formLabelWidth,prop:"answerMin"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.form.answerMin,callback:function(t){e.$set(e.form,"answerMin",t)},expression:"form.answerMin"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"答案最大值:","label-width":e.formLabelWidth,prop:"answerMax"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.form.answerMax,callback:function(t){e.$set(e.form,"answerMax",t)},expression:"form.answerMax"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"名次最小值:","label-width":e.formLabelWidth,prop:"rankingMin"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.form.rankingMin,callback:function(t){e.$set(e.form,"rankingMin",t)},expression:"form.rankingMin"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"名次最大值:","label-width":e.formLabelWidth,prop:"rankingMax"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.form.rankingMax,callback:function(t){e.$set(e.form,"rankingMax",t)},expression:"form.rankingMax"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"提示范围","label-width":e.formLabelWidth,prop:"tipsRange"}},[a("el-input",{attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.form.tipsRange,callback:function(t){e.$set(e.form,"tipsRange",t)},expression:"form.tipsRange"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"淘宝口令","label-width":e.formLabelWidth}},[a("el-input",{attrs:{spellcheck:"false",type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.form.passUrl,callback:function(t){e.$set(e.form,"passUrl",t)},expression:"form.passUrl"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"状态","label-width":e.formLabelWidth,prop:"state"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.form.state,callback:function(t){e.$set(e.form,"state",t)},expression:"form.state"}},[a("el-option",{attrs:{label:"上架",value:1}}),e._v(" "),a("el-option",{attrs:{label:"下架",value:2}})],1)],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:e.isSubmit},on:{click:function(t){e.addBtn("form")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改商品",visible:e.dialogTableVisible,width:"800px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-form",{attrs:{model:e.formtwo}},[a("el-row",[a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"商品名称","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwo.goodsName,callback:function(t){e.$set(e.formtwo,"goodsName",t)},expression:"formtwo.goodsName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"图片:","label-width":e.formLabelWidth}},[a("el-upload",{staticClass:"bannerAvatar-uploader",attrs:{action:"/api/upload",data:e.uploadData,"show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[a("div",{staticClass:"img_loadBox"},[e.imageUrl?a("img",{staticClass:"avatar",attrs:{src:e.imageUrl}}):a("i",{staticClass:"el-icon-plus bannerAvatar-uploader-icon"})])])],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"商品价格:","label-width":e.formLabelWidth,prop:"price"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.formtwo.price,callback:function(t){e.$set(e.formtwo,"price",t)},expression:"formtwo.price"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"答案最小值:","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"200px"},attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.formtwo.answerMin,callback:function(t){e.$set(e.formtwo,"answerMin",t)},expression:"formtwo.answerMin"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"答案最大值:","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"200px"},attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.formtwo.answerMax,callback:function(t){e.$set(e.formtwo,"answerMax",t)},expression:"formtwo.answerMax"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"名次最小值:","label-width":e.formLabelWidth,prop:"rankingMin"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.formtwo.rankingMin,callback:function(t){e.$set(e.formtwo,"rankingMin",t)},expression:"formtwo.rankingMin"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"名次最大值:","label-width":e.formLabelWidth,prop:"rankingMax"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.formtwo.rankingMax,callback:function(t){e.$set(e.formtwo,"rankingMax",t)},expression:"formtwo.rankingMax"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"提示范围:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.formtwo.tipsRange,callback:function(t){e.$set(e.formtwo,"tipsRange",t)},expression:"formtwo.tipsRange"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"淘宝口令:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{spellcheck:"false",type:"textarea",autosize:{minRows:4,maxRows:6},"auto-complete":"off",clearable:""},model:{value:e.formtwo.passUrl,callback:function(t){e.$set(e.formtwo,"passUrl",t)},expression:"formtwo.passUrl"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update(e.formtwo)}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"设置夺宝",visible:e.dialogDuoBao,width:"800px"},on:{"update:visible":function(t){e.dialogDuoBao=t}}},[a("el-form",{ref:"formdb",attrs:{model:e.formdb,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"所需人次数:","label-width":e.formLabelWidth,prop:"timesNum"}},[a("el-input",{staticStyle:{width:"200px"},attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:e.formdb.timesNum,callback:function(t){e.$set(e.formdb,"timesNum",t)},expression:"formdb.timesNum"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"每次需要心愿值",prop:"timesXy","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"200px"},attrs:{"auto-complete":"off",clearable:""},model:{value:e.formdb.timesXy,callback:function(t){e.$set(e.formdb,"timesXy",t)},expression:"formdb.timesXy"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"排序",prop:"dbOrders","label-width":e.formLabelWidth}},[a("el-input",{staticStyle:{width:"200px"},attrs:{"auto-complete":"off",clearable:""},model:{value:e.formdb.dbOrders,callback:function(t){e.$set(e.formdb,"dbOrders",t)},expression:"formdb.dbOrders"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"是否夺宝商品",prop:"isDb","label-width":e.formLabelWidth}},[a("el-select",{staticStyle:{width:"200px"},attrs:{placeholder:""},model:{value:e.formdb.isDb,callback:function(t){e.$set(e.formdb,"isDb",t)},expression:"formdb.isDb"}},[a("el-option",{attrs:{label:"否",value:1}}),e._v(" "),a("el-option",{attrs:{label:"是",value:2}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"轮播图:",prop:"bannerImg","label-width":e.formLabelWidth}},[a("el-upload",{attrs:{action:"/api/upload","list-type":"picture-card",data:e.uploadData,"file-list":e.fileList,"on-success":e.handlePicture,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove}},[a("i",{staticClass:"el-icon-plus"})])],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogDuoBao=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.updateformdb("formdb")}}},[e._v("确 定")])],1)],1)],2),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"news-notice-header"},[t("h3",[this._v("心愿猪/商品管理")]),this._v(" "),t("hr")])}]};var r=a("VU/8")(l,i,!1,function(e){a("heSq")},null,null);t.default=r.exports},heSq:function(e,t){}});