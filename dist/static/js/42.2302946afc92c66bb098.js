webpackJsonp([42],{TUC0:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("xT6B"),i=(a("iPXC"),{name:"BzPlayNum",data:function(){return{powerTrue:!1,optionW:"0",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},styleW:{width:"200px"},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{},imageUrl:"",rules:{playType:[{required:!0,message:"请输入玩法个数",trigger:"blur"}],probability:[{required:!0,message:"请输入概率",trigger:"blur"},{validator:function(t,e,a){/^[0-9]*$/.test(e)?a():a(new Error("请输入正整数"))},trigger:"blur"}]},formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],uploadData:{},isSubmit:!1}},components:{"big-img":a("fM1o").a},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList()},filters:{dateFont:function(t){return Object(s.a)(new Date(t),"yyyy-MM-dd hh:mm:sss")}},methods:{queryBtns:function(){var t=this,e={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",e).then(function(e){if((e.statusCode+"").startsWith("2"))for(var a=e.data.length-1;a>=0;a--)"add"==e.data[a].btnCode&&(t.add=!0),"del"==e.data[a].btnCode&&(t.del=!0)})},indexMethod:function(t){return 1*t+1},dateFormat:function(t,e){var a=t[e.property];return void 0==a?"":Object(s.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var t=this,e={pageNum:this.currentPage,pageSize:this.pageSize};this.$fetch("/bz28/lotteryRobotPlayed/queryList",e).then(function(e){(e.statusCode+"").startsWith("2")?(t.tableData=e.data.list,t.totalCount=e.data.total):t.$message({type:"error",message:e.message,duration:3e3})})},getInfo:function(t){var e=this;this.dialogTableVisible=!0,this.$fetch("/bz28/lotteryRobotPlayed/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(e.formtwo=t.data)})},robot:function(){this.dialogFormVisible=!0},bzeditTap:function(){this.dialogTableVisible=!0},handleSizeChange:function(t){this.pageSize=t,this.accountList()},handleCurrentChange:function(t){this.currentPage=t,this.accountList()},handleAvatarSuccess:function(t,e){this.imageUrl=t.data},beforeAvatarUpload:function(t){}}}),l={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bz-play-set-wrap"},[s("div",{staticClass:"bz-play-set-inner"},[t._m(0),t._v(" "),s("div",{staticClass:"bz-play-set-table"},[s("el-row",[s("el-col",{attrs:{span:20}},[s("div",{staticClass:"data-list"},[s("el-row",[s("el-col",[s("div",{staticClass:"name"},[t._v("宝猪28")])])],1),t._v(" "),s("el-row",[s("el-col",{attrs:{span:2}},[s("div",{staticClass:"logo"},[s("img",{attrs:{src:a("tYHP")}})])]),t._v(" "),s("el-col",{attrs:{span:17}},[s("div",{staticClass:"d-box"},[s("div",{staticClass:"list"},[s("div",{staticClass:"title"},[t._v("名称")]),t._v(" "),s("div",{staticClass:"dec"},[t._v("大幅度发")])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"title"},[t._v("来源")]),t._v(" "),s("div",{staticClass:"dec"},[t._v("大幅度发")])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"title"},[t._v("每期时间(s)")]),t._v(" "),s("div",{staticClass:"dec"},[t._v("大幅度发")])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"title"},[t._v("暂停时间(s)")]),t._v(" "),s("div",{staticClass:"dec"},[t._v("大幅度发")])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"title"},[t._v("是否显示")]),t._v(" "),s("div",{staticClass:"dec"},[t._v("大幅度发")])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"title"},[t._v("状态")]),t._v(" "),s("div",{staticClass:"dec"},[t._v("大幅度发")])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"title"},[t._v("是否启用机器人")]),t._v(" "),s("div",{staticClass:"dec"},[t._v("大幅度发")])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"title"},[t._v("排序")]),t._v(" "),s("div",{staticClass:"dec"},[t._v("大幅度发")])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"title"},[t._v("门槛(￥)")]),t._v(" "),s("div",{staticClass:"dec"},[t._v("大幅度发")])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"title"},[t._v("权限")]),t._v(" "),s("div",{staticClass:"dec"},[t._v("大幅度发")])])])]),t._v(" "),s("el-col",{attrs:{span:5}},[s("div",{staticClass:"d-option"},[s("el-button",{attrs:{type:"success",plain:"",size:"small"}},[t._v("规则")]),t._v(" "),s("el-button",{attrs:{type:"warning",plain:"",size:"small"},on:{click:t.bzeditTap}},[t._v("编辑")]),t._v(" "),s("el-button",{attrs:{type:"danger",plain:"",size:"small"},on:{click:t.robot}},[t._v("设置机器人")])],1)])],1)],1)])],1),t._v(" "),s("el-dialog",{attrs:{title:"编辑",visible:t.dialogTableVisible,width:"900px"},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[s("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules}},[s("el-row",[s("el-col",{attrs:{span:22}},[s("el-form-item",{attrs:{label:"排序","label-width":t.formLabelWidth,prop:"noticeTitle"}},[s("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.noticeTitle,callback:function(e){t.$set(t.form,"noticeTitle",e)},expression:"form.noticeTitle"}})],1)],1),t._v(" "),s("el-col",{attrs:{span:24}},[s("el-form-item",{attrs:{label:"icon:","label-width":t.formLabelWidth}},[s("el-upload",{staticClass:"bannerAvatar-uploader",attrs:{action:"/api/upload",data:t.uploadData,"show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[s("div",{staticClass:"img_loadBox"},[t.imageUrl?s("img",{staticClass:"avatar",attrs:{src:t.imageUrl}}):s("i",{staticClass:"el-icon-plus bannerAvatar-uploader-icon"})])])],1)],1),t._v(" "),s("el-col",{attrs:{span:22}},[s("el-form-item",{attrs:{label:"游戏名称:","label-width":t.formLabelWidth,prop:"linkAddress"}},[s("el-input",{attrs:{spellcheck:"false","auto-complete":"off",clearable:""},model:{value:t.form.linkAddress,callback:function(e){t.$set(t.form,"linkAddress",e)},expression:"form.linkAddress"}})],1)],1),t._v(" "),s("el-col",{attrs:{span:22}},[s("el-form-item",{attrs:{label:"开奖来源:",prop:"noticeContent","label-width":t.formLabelWidth}},[s("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.noticeContent,callback:function(e){t.$set(t.form,"noticeContent",e)},expression:"form.noticeContent"}})],1)],1),t._v(" "),s("el-col",{attrs:{span:12}},[s("el-form-item",{attrs:{label:"是否发布",prop:"isPublish","label-width":t.formLabelWidth}},[s("el-select",{attrs:{placeholder:""},model:{value:t.form.isPublish,callback:function(e){t.$set(t.form,"isPublish",e)},expression:"form.isPublish"}},[s("el-option",{attrs:{label:"是",value:"1"}}),t._v(" "),s("el-option",{attrs:{label:"否",value:"2"}})],1)],1)],1)],1)],1),t._v(" "),s("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.dialogTableVisible=!1}}},[t._v("取 消")]),t._v(" "),s("el-button",{attrs:{type:"primary",disabled:t.isSubmit},on:{click:function(e){t.addBtn("form")}}},[t._v("确 定")])],1)],1),t._v(" "),s("el-dialog",{attrs:{title:"设置机器人",visible:t.dialogFormVisible,width:"1000px"},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[s("el-form",{ref:"form",attrs:{model:t.form,rules:t.rules}},[s("el-row",[s("el-col",{attrs:{span:24}},[s("el-form-item",{attrs:{label:"机器人进入时间间隔(s)","label-width":"180px",prop:"playType"}},[s("el-input",{style:t.styleW,attrs:{"auto-complete":"off",clearable:""},model:{value:t.form.playType,callback:function(e){t.$set(t.form,"playType",e)},expression:"form.playType"}})],1),t._v(" "),s("div",{staticClass:"play_type"},[s("div",{staticClass:"list1 list"},[s("div",{staticClass:"item"},[t._v("玩法")]),t._v(" "),s("div",{staticClass:"item"},[t._v("0")]),t._v(" "),s("div",{staticClass:"item"},[t._v("1")]),t._v(" "),s("div",{staticClass:"item"},[t._v("2")]),t._v(" "),s("div",{staticClass:"item"},[t._v("3")]),t._v(" "),s("div",{staticClass:"item"},[t._v("4")]),t._v(" "),s("div",{staticClass:"item"},[t._v("5")]),t._v(" "),s("div",{staticClass:"item"},[t._v("6")]),t._v(" "),s("div",{staticClass:"item"},[t._v("7")]),t._v(" "),s("div",{staticClass:"item"},[t._v("8")]),t._v(" "),s("div",{staticClass:"item"},[t._v("9")]),t._v(" "),s("div",{staticClass:"item"},[t._v("10")]),t._v(" "),s("div",{staticClass:"item"},[t._v("11")]),t._v(" "),s("div",{staticClass:"item"},[t._v("12")]),t._v(" "),s("div",{staticClass:"item"},[t._v("13")])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"item"},[t._v("概率(%)")]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})])])]),t._v(" "),s("div",{staticClass:"play_type"},[s("div",{staticClass:"list1 list"},[s("div",{staticClass:"item"},[t._v("玩法")]),t._v(" "),s("div",{staticClass:"item"},[t._v("27")]),t._v(" "),s("div",{staticClass:"item"},[t._v("26")]),t._v(" "),s("div",{staticClass:"item"},[t._v("25")]),t._v(" "),s("div",{staticClass:"item"},[t._v("24")]),t._v(" "),s("div",{staticClass:"item"},[t._v("23")]),t._v(" "),s("div",{staticClass:"item"},[t._v("22")]),t._v(" "),s("div",{staticClass:"item"},[t._v("21")]),t._v(" "),s("div",{staticClass:"item"},[t._v("20")]),t._v(" "),s("div",{staticClass:"item"},[t._v("19")]),t._v(" "),s("div",{staticClass:"item"},[t._v("18")]),t._v(" "),s("div",{staticClass:"item"},[t._v("17")]),t._v(" "),s("div",{staticClass:"item"},[t._v("16")]),t._v(" "),s("div",{staticClass:"item"},[t._v("15")]),t._v(" "),s("div",{staticClass:"item"},[t._v("14")])]),t._v(" "),s("div",{staticClass:"list"},[s("div",{staticClass:"item"},[t._v("概率(%)")]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})]),t._v(" "),s("div",{staticClass:"item"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.form.playType,expression:"form.playType"}],staticClass:"sel-input",domProps:{value:t.form.playType},on:{input:function(e){e.target.composing||t.$set(t.form,"playType",e.target.value)}}})])])])],1)],1)],1)],1)],1),t._v(" "),s("div",{staticClass:"block",staticStyle:{display:"none"}},[s("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,70],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bz-play-set-header"},[e("h3",[this._v("宝猪28/游戏设置")]),this._v(" "),e("hr")])}]};var o=a("VU/8")(i,l,!1,function(t){a("x5CJ")},null,null);e.default=o.exports},x5CJ:function(t,e){}});