webpackJsonp([36],{U5NY:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,s=a("bOdI"),n=a.n(s),l=a("xT6B"),o=a("iPXC"),r={name:"LotteryGoods",data:function(){var t;return t={dynamicTags:[],taskGet:!1,uploadData:{},powerTrue:!1,optionW:"75px",menuId:"",upd:!1,del:!1,imageUrl:"",dialogTableDetail:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,form:{},lotterylist:[],formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,showImg:!1,imgSrc:"",formInline:{},tableData:[]},n()(t,"dialogTableDetail",!1),n()(t,"taskList",[]),n()(t,"dynamicTags",[]),n()(t,"inputVisible",!1),n()(t,"inputValue",""),n()(t,"styleObject",{width:"200px"}),n()(t,"lableArr",[]),t},components:{"big-img":a("fM1o").a},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList(),this.uploadData={token:Object(o.d)("token")},this.channelCode=Object(o.d)("channelCode")},methods:(i={queryBtns:function(){var t=this,e={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",e).then(function(e){if((e.statusCode+"").startsWith("2"))for(var a=e.data.length-1;a>=0;a--)"taskGet"==e.data[a].btnCode&&(t.taskGet=!0),"upd"==e.data[a].btnCode&&(t.upd=!0,t.optionW="150"),"del"==e.data[a].btnCode&&(t.del=!0,t.optionW="150"),t.del&&t.upd&&(t.optionW="220px")})},clickImg:function(t){this.showImg=!0,this.imgSrc=t},viewImg:function(){this.showImg=!1},handleAvatarSuccess:function(t,e){this.imageUrl=t.data},beforeAvatarUpload:function(t){},indexMethod:function(t){return 1*t+1},dateFormat:function(t,e){var a=t[e.property];return void 0==a?"":Object(l.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},handleClose:function(t){this.dynamicTags.splice(this.dynamicTags.indexOf(t),1)},taskType:function(){var t=this;this.$post("/api/taskType/list").then(function(e){(e.statusCode+"").startsWith("2")&&(t.taskList=e.data)})},accountList:function(){var t=this,e={pageNum:this.currentPage,pageSize:this.pageSize,isSignin:this.formInline.isSignin,isUpper:this.formInline.isUpper,name:this.formInline.name};this.$fetch("/api/tpTaskInfo/list",e).then(function(e){if((e.statusCode+"").startsWith("2")){for(var a=e.data.list.length-1;a>=0;a--)e.data.list[a].label&&(e.data.list[a].label=e.data.list[a].label.split(","));t.tableData=e.data.list,t.totalCount=e.data.total}else t.$message({type:"error",message:e.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},handleSizeChange:function(t){this.pageSize=t,this.accountList()},handleCurrentChange:function(t){this.currentPage=t,this.accountList()},handleSizeChangeStep:function(t){this.pageSizeStep=t,this.stepTap(this.stepId)},handleCurrentChangeStep:function(t){this.currentPageStep=t,this.stepTap(this.stepId)}},n()(i,"viewImg",function(){this.showImg=!1}),n()(i,"taskGetTap",function(){var t=this;this.$confirm("此操作将获取任务, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.$fetch("/api/tpTaskInfo/getTasks",{}).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"任务获取成功"}),t.accountList()):t.$message({type:"success",message:e.message})})}).catch(function(){t.$message({type:"info",message:"已取消获取任务操作"})})}),n()(i,"getInfo",function(t,e){var a=this;this.$fetch("/api/tpTaskInfo/queryOne",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(1==e?(t.data.label&&(a.dynamicTags=t.data.label.split(",")),a.dialogTableDetail=!0,t.data.createTime=Object(l.a)(new Date(t.data.createTime),"yyyy-MM-dd hh:mm:sss"),a.imageUrl=t.data.logo):a.dialogTableVisible=!0,a.formtwo=t.data)})}),n()(i,"update",function(t){var e=this;if(/^(0|[1-9][0-9]*)(\.\d+)?$/.test(this.formtwo.drReward)){/^[0-9]*$/.test(this.formtwo.orders)?this.$put("/api/tpTaskInfo/modify",this.formtwo).then(function(t){(t.statusCode+"").startsWith("2")&&(e.$message({type:"success",message:"修改成功！"}),e.dialogTableVisible=!1,e.accountList())}):this.$message({type:"warning",message:"排序为正整数"})}else this.$message({type:"warning",message:"达人奖励为正数"})}),n()(i,"Delete",function(t){var e=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){e.delData(t)}).catch(function(){e.$message({type:"info",message:"已取消删除"})})}),n()(i,"delData",function(t){var e=this,a={id:t};this.$fetch("/api/tpTaskInfo/delete",a).then(function(t){(t.statusCode+"").startsWith("2")?(e.$message({type:"success",message:"删除成功！"}),e.accountList()):e.$message({type:"error",message:"删除失败！"})})}),i)},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bannermanage-wrap"},[a("div",{staticClass:"bannermanage-inner"},[t._m(0),t._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[a("el-form-item",{attrs:{label:"任务名称:"}},[a("el-input",{attrs:{placeholder:"请输入任务名称",clearable:""},model:{value:t.formInline.name,callback:function(e){t.$set(t.formInline,"name",e)},expression:"formInline.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"是否上下架:"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择是否上下架"},model:{value:t.formInline.isUpper,callback:function(e){t.$set(t.formInline,"isUpper",e)},expression:"formInline.isUpper"}},[a("el-option",{attrs:{label:"上架",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"下架",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),a("el-form-item",{attrs:{label:"是否是签到赚任务:"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择是否上下架"},model:{value:t.formInline.isSignin,callback:function(e){t.$set(t.formInline,"isSignin",e)},expression:"formInline.isSignin"}},[a("el-option",{attrs:{label:"是",value:"1"}}),t._v(" "),a("el-option",{attrs:{label:"否",value:"2"}}),t._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(e){t.search()}}},[t._v("查询")]),t._v(" "),t.taskGet?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){t.taskGetTap()}}},[t._v("获取任务")]):t._e()],1)],1),t._v(" "),a("div"),t._v(" "),a("div",{staticClass:"bannermanage-table"},[[a("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData,height:"580"}},[a("el-table-column",{attrs:{label:"序号",type:"index",index:t.indexMethod,width:"80",fixed:"left"}}),t._v(" "),a("el-table-column",{attrs:{prop:"name","min-width":"200",label:"任务名称",fixed:"left"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120",label:"任务logo"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("img",{staticStyle:{"max-width":"50px","max-height":"45px",cursor:"pointer"},attrs:{src:e.row.logo},on:{click:function(a){t.clickImg(e.row.logo)}}})]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"150",label:"任务类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.typeId?a("span",[t._v("高额收益")]):t._e(),t._v(" "),2==e.row.typeId?a("span",[t._v("下载注册")]):t._e(),t._v(" "),3==e.row.typeId?a("span",[t._v("实名认证")]):t._e(),t._v(" "),4==e.row.typeId?a("span",[t._v("超简单")]):t._e(),t._v(" "),5==e.row.typeId?a("span",[t._v("其他")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"300",label:"任务标签"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.label,function(e,i){return a("span",{staticClass:"span_label"},[t._v(t._s(e))])})}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"150",prop:"reward",label:"用户奖励(￥)"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"150",prop:"drReward",label:"达人奖励(￥)"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"150",prop:"channelTaskNumber",label:"渠道任务数"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"170",prop:"surplusChannelTaskNumber",label:"剩余渠道任务数"}}),t._v(" "),a("el-table-column",{attrs:{"min-width":"120",label:"上下架状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.isUpper?a("span",{staticClass:"green"},[t._v("上架中")]):t._e(),t._v(" "),2==e.row.isUpper?a("span",{staticClass:"red"},[t._v("已下架")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{"min-width":"170",label:"是否是签到赚任务"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.isSignin?a("span",{staticClass:"green"},[t._v("是")]):t._e(),t._v(" "),2==e.row.isSignin?a("span",{staticClass:"blue"},[t._v("否")]):t._e()]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"taskChannel","min-width":"120",label:"任务渠道"}}),t._v(" "),a("el-table-column",{attrs:{prop:"createTime",formatter:t.dateFormat,"min-width":"170",label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:t.optionW},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(a){t.getInfo(e.row.id,1)}}},[t._v("详情")]),t._v(" "),t.upd?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){t.getInfo(e.row.id,2)}}},[t._v("修改")]):t._e(),t._v(" "),t.del?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){t.Delete(e.row.id)}}},[t._v("删除")]):t._e()]}}])})],1)],t._v(" "),t.showImg?a("big-img",{attrs:{imgSrc:t.imgSrc},on:{clickit:t.viewImg}}):t._e(),t._v(" "),a("el-dialog",{attrs:{width:"1000px",title:"任务详情",visible:t.dialogTableDetail},on:{"update:visible":function(e){t.dialogTableDetail=e}}},[a("el-form",{attrs:{model:t.formtwo}},[a("el-row",[a("div",{staticClass:"box_xinxi"},[a("div",{staticClass:"wrap_da"},[a("div",{staticClass:"header"},[a("span",[t._v("详情信息")]),t._v(" "),a("span")]),t._v(" "),a("div",{staticClass:"body_list",staticStyle:{width:"100%"}},[a("div",{staticClass:"title"},[t._v("任务名称:")]),t._v(" "),a("div",{staticClass:"name"},[a("span",[t._v(t._s(t.formtwo.name))])])]),t._v(" "),a("div",{staticClass:"body_list",staticStyle:{width:"100%"}},[a("div",{staticClass:"title"},[t._v("任务标签:")]),t._v(" "),a("div",{staticClass:"name"},t._l(t.dynamicTags,function(e){return a("el-tag",{key:e,attrs:{closable:"","disable-transitions":!1}},[t._v(t._s(e)+"\n                    ")])}))]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("是否上架:")]),t._v(" "),a("div",{staticClass:"name"},[a("el-switch",{attrs:{disabled:!0,"active-color":"#13ce66","inactive-color":"#ccc","active-text":1==t.formtwo.isUpper?"是":"否","inactive-text":"","active-value":1,"inactive-value":2},model:{value:t.formtwo.isUpper,callback:function(e){t.$set(t.formtwo,"isUpper",e)},expression:"formtwo.isUpper"}})],1)]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("是否签到赚任务:")]),t._v(" "),a("div",{staticClass:"name"},[a("el-switch",{attrs:{disabled:!0,"active-color":"#13ce66","inactive-color":"#ccc","active-text":1==t.formtwo.isSignin?"是":"否","inactive-text":"","active-value":1,"inactive-value":2},model:{value:t.formtwo.isSignin,callback:function(e){t.$set(t.formtwo,"isSignin",e)},expression:"formtwo.isSignin"}})],1)]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("任务渠道:")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                    "+t._s(t.formtwo.taskChannel)+"\n                  ")])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("渠道任务数:")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                    "+t._s(t.formtwo.channelTaskNumber)+"\n                  ")])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("剩余渠道任务数:")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                    "+t._s(t.formtwo.surplusChannelTaskNumber)+"\n                  ")])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("任务类型:")]),t._v(" "),a("div",{staticClass:"name"},[1==t.formtwo.typeId?a("span",[t._v("高额收益")]):t._e(),t._v(" "),2==t.formtwo.typeId?a("span",[t._v("下载注册")]):t._e(),t._v(" "),3==t.formtwo.typeId?a("span",[t._v("实名认证")]):t._e(),t._v(" "),4==t.formtwo.typeId?a("span",[t._v("其他")]):t._e()])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("用户奖励(￥):")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                    "+t._s(t.formtwo.reward)+"\n                  ")])]),t._v(" "),a("div",{staticClass:"body_list"},[a("div",{staticClass:"title"},[t._v("达人奖励(￥):")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                    "+t._s(t.formtwo.drReward)+"\n                  ")])]),t._v(" "),a("div",{staticClass:"body_list",staticStyle:{width:"100%"}},[a("div",{staticClass:"title"},[t._v("创建时间:")]),t._v(" "),a("div",{staticClass:"name"},[t._v("\n                    "+t._s(t.formtwo.createTime)+"\n                  ")])]),t._v(" "),a("div",{staticClass:"body_list img",staticStyle:{width:"100%"}},[a("div",{staticClass:"title"},[t._v("\n                    任务logo:\n                  ")]),t._v(" "),a("div",{staticClass:"img_box",staticStyle:{width:"730px",float:"left"}},[a("div",{staticClass:"more_img",on:{click:function(e){t.clickImg(t.formtwo.logo)}}},[a("img",{attrs:{src:t.formtwo.logo}})])])])])])])],1)],1),t._v(" "),a("el-dialog",{attrs:{width:"600px",title:"修改任务",visible:t.dialogTableVisible},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[a("el-form",{attrs:{model:t.formtwo}},[a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"是否是签到赚任务:",prop:"isSignin"}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ccc","active-text":1==t.formtwo.isSignin?"是":"否","inactive-text":"","active-value":1,"inactive-value":2},model:{value:t.formtwo.isSignin,callback:function(e){t.$set(t.formtwo,"isSignin",e)},expression:"formtwo.isSignin"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"是否上架:",prop:"isUpper","label-width":t.formLabelWidth}},[a("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ccc","active-text":1==t.formtwo.isUpper?"是":"否","inactive-text":"","active-value":1,"inactive-value":2},model:{value:t.formtwo.isUpper,callback:function(e){t.$set(t.formtwo,"isUpper",e)},expression:"formtwo.isUpper"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:18}},[a("el-form-item",{attrs:{label:"达人奖励(￥):","label-width":t.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:t.formtwo.drReward,callback:function(e){t.$set(t.formtwo,"drReward",e)},expression:"formtwo.drReward"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:18}},[a("el-form-item",{attrs:{label:"排序:","label-width":t.formLabelWidth}},[a("el-input",{attrs:{placeholder:"值越大越靠前","auto-complete":"off",clearable:""},model:{value:t.formtwo.orders,callback:function(e){t.$set(t.formtwo,"orders",e)},expression:"formtwo.orders"}})],1)],1),t._v(" "),a("el-col",{attrs:{span:6}},[a("p",{staticClass:"sign_p"},[t._v("值越大越靠前")])])],1)],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(e){t.update(t.formtwo)}}},[t._v("确 定")])],1)],1),t._v(" "),t.showImg?a("big-img",{attrs:{imgSrc:t.imgSrc},on:{clickit:t.viewImg}}):t._e()],2),t._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,70],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bannermanage-header"},[e("h3",[this._v("第三方/平台任务")]),this._v(" "),e("hr")])}]};var d=a("VU/8")(r,c,!1,function(t){a("gIdX")},null,null);e.default=d.exports},gIdX:function(t,e){}});