webpackJsonp([17],{TcI6:function(e,t){},xYdZ:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("xT6B"),n=a("iPXC"),r={name:"DarenManage",data:function(){return{powerTrue:!1,optionW:"75",menuId:"",showT:!1,addDR:!1,cancelDR:!1,Exlexport:!1,openActive:!1,editScore:!1,dialogTableVisible:!1,formtwo:{},dialogTableHyd:!1,dialogTableDetail:!1,formtwoInfo:[],form:{accountId:""},formhyd:{qualityScore:"",activityScore:"",userId:""},currentId:"",formLabelWidth:"140px",currentPage:1,pageSize:10,totalCount:0,currentPageDetail:1,pageSizeDetail:10,totalCountDetail:0,formInline:{},tableData:[],rules:{accountId:[{required:!0,message:"请输入达人Id",trigger:"blur"},{validator:function(e,t,a){/^[0-9]*$/.test(t)?a():a(new Error("请输入正整数"))},trigger:"blur"}],qualityScore:[{required:!0,message:"请输入质量分",trigger:"blur"},{validator:function(e,t,a){!/^[0-9]*$/.test(t)||t<0||t>100?a(new Error("请输入0至100的正整数")):a()},trigger:"blur"}],activityScore:[{required:!0,message:"请输入活跃度",trigger:"blur"},{validator:function(e,t,a){var i=t,n=0;"string"!=typeof i&&(i=i.toString()),i.includes(".")&&(n=i.split(".")[1].length),t>1||t<0||n>2?a(new Error("请输入0至1之间的数(只保留小数点后两位)")):a()},trigger:"blur"}]},styleObject:{width:"200px"},pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},selectTime:"",fullscreenLoading:!1,formDetail:{},selectTimeDetail:"",rewardSum:"",isSubmit:!1,loading:!1}},filters:{currencyNum:function(e){return parseInt(e).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},datetime:function(e){return Object(i.a)(new Date(e),"yyyy-MM-dd hh:mm:sss")}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList()},methods:{queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var a=t.data.length-1;a>=0;a--)"Exlexport"==t.data[a].btnCode&&(e.Exlexport=!0),"addDR"==t.data[a].btnCode&&(e.addDR=!0),"cancelDR"===t.data[a].btnCode&&(e.cancelDR=!0,e.optionW="170"),"editScore"===t.data[a].btnCode&&(e.editScore=!0,e.optionW="170"),"openActive"===t.data[a].btnCode&&(e.openActive=!0),e.editScore&&e.cancelDR&&(e.optionW="260")})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(i.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this;this.loading=!0;var t={pageNum:this.currentPage,pageSize:this.pageSize,darenTime_start:this.formInline.darenTime_start,darenTime_end:this.formInline.darenTime_end,accountId:this.formInline.accountId,mobile:this.formInline.mobile};this.$fetch("/api/userInfo/drList",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total,e.loading=!1):(e.$message({type:"error",message:t.message,duration:3e3}),e.loading=!1)})},search:function(){this.selectTime&&this.selectTime[0]?this.formInline.darenTime_start=new Date(this.selectTime[0]).getTime():this.formInline.darenTime_start="",this.selectTime&&this.selectTime[1]?this.formInline.darenTime_end=new Date(this.selectTime[1]).getTime():this.formInline.darenTime_end="",this.currentPage=1,this.pageSize=10,this.accountList()},searchDetail:function(){this.selectTimeDetail&&this.selectTimeDetail[0]?this.formDetail.startTime=new Date(this.selectTimeDetail[0]).getTime():this.formDetail.startTime="",this.selectTimeDetail&&this.selectTimeDetail[1]?this.formDetail.endTime=new Date(this.selectTimeDetail[1]).getTime():this.formDetail.endTime="",this.currentPageDetail=1,this.pageSizeDetail=10,this.getOne(this.currentId)},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0},getHyd:function(e,t,a){this.dialogTableHyd=!0,this.formhyd.userId=e,this.formhyd.qualityScore=t,this.formhyd.activityScore=a},update:function(e){var t=this;this.$refs[e].validate(function(e){e&&t.$put("/api/userActivity/modifyScore",t.formhyd).then(function(e){(e.statusCode+"").startsWith("2")&&(t.$message({type:"success",message:"修改成功！"}),t.dialogTableHyd=!1,t.accountList())})})},addTap:function(e){this.isSubmit=!1,this.dialogTableVisible=!0},getOne:function(e){var t=this;this.dialogTableDetail=!0,this.currentId=e;var a={pageNum:this.currentPageDetail,pageSize:this.pageSizeDetail,userId:this.currentId,taccountId:this.formDetail.taccountId,taskName:this.formDetail.taskName,taskType:this.formDetail.taskType,startTime:this.formDetail.startTime,endTime:this.formDetail.endTime};this.$fetch("/api/darenRewardDetail/list",a).then(function(e){(e.statusCode+"").startsWith("2")&&(t.formtwoInfo=e.data.list,t.totalCountDetail=e.data.total,t.rewardSum=e.data.rewardSum)})},cancelTap:function(e){var t=this;this.$confirm("此操作将永久取消该达人身份, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.cancelFun(e)}).catch(function(){t.$message({type:"info",message:"已取消操作"})})},cancelFun:function(e){var t=this,a={accountId:e};this.$fetch("/api/userInfo/cancleDR",a).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"取消达人身份成功！"}),t.accountList()):t.$message({type:"error",message:e.message})})},showHyd:function(e,t){var a=this,i="";2==t?i="展示活跃度":1==t&&(i="不展示活跃度"),this.$confirm("此操作将"+i+"是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){var n={userId:e,openActivity:t};a.$post("/api/userActivity/openActivity",n).then(function(e){(e.statusCode+"").startsWith("2")?(a.$message({type:"success",message:i+"操作成功！"}),a.accountList()):a.$message({type:"error",message:e.message})})}).catch(function(){a.$message({type:"info",message:"已取消操作"})})},addBtn:function(e){var t=this;this.$refs[e].validate(function(e){e&&(t.$nextTick(function(){this.isSubmit=!0}),t.$post("/api/userInfo/setDR",t.form).then(function(e){(e.statusCode+"").startsWith("2")?(t.dialogTableVisible=!1,t.$message({type:"success",message:"添加成功！"}),t.accountList()):(t.$message({type:"error",message:e.message}),t.isSubmit=!1)}))})},queryExport:function(){this.search(),this.fullscreenLoading=this.$loading({lock:!0,text:"正在导出...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.formInline.token=Object(n.d)("token"),this.formInline.channel=Object(n.d)("channelCode"),this.formInline.relation=Object(n.d)("userRelation");this.doDownload(this.formInline,"/excl/drExcl")},doDownload:function(e,t){var a=this,i=[],n=[];for(var r in e)null!=e[r]&&""!=e[r]&&(i.push(r),n.push(e[r]));for(var l=t,o=0;o<i.length;o++)l=l==t?l+"?"+i[o]+"="+n[o]:l+"&"+i[o]+"="+n[o];var s=document.createElement("a");s.setAttribute("href",l),document.querySelector("body").appendChild(s),s.click(),s.remove(),setTimeout(function(){a.fullscreenLoading.close()},9e3)},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleSizeChangeDetail:function(e){this.pageSizeDetail=e,this.getOne(this.currentId)},handleCurrentChange:function(e){this.currentPage=e,this.accountList()},handleCurrentChangeDetail:function(e){this.currentPageDetail=e,this.getOne(this.currentId)}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"daren-manage-wrap"},[a("div",{staticClass:"daren-manage-inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"用户Id:"}},[a("el-input",{attrs:{placeholder:"请输入用户Id",clearable:""},model:{value:e.formInline.accountId,callback:function(t){e.$set(e.formInline,"accountId",t)},expression:"formInline.accountId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"电话号码:"}},[a("el-input",{attrs:{placeholder:"请输入电话号码",clearable:""},model:{value:e.formInline.mobile,callback:function(t){e.$set(e.formInline,"mobile",t)},expression:"formInline.mobile"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"设置达人时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"left"},model:{value:e.selectTime,callback:function(t){e.selectTime=t},expression:"selectTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")])],1),e._v(" "),a("el-form-item",[e.addDR?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.addTap()}}},[e._v("添加达人")]):e._e()],1),e._v(" "),a("el-form-item",[e.Exlexport?a("el-button",{staticClass:"mar_bottom",attrs:{type:"warning",plain:""},on:{click:function(t){e.queryExport()}}},[e._v("导出表格")]):e._e()],1)],1)],1),e._v(" "),a("div",{staticClass:"daren-manage-table"},[[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableData,height:"558"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"50"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"left","min-width":"150",prop:"accountId",label:"用户Id"}}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"userName",label:"达人姓名"}}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"channelCode",label:"渠道"}}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"qualityScore",label:"质量分"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{class:t.row.qualityScore<40?"red":"green"},[e._v(e._s(t.row.qualityScore))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"activityScore",label:"活跃度"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{class:t.row.activityScore<.4?"red":"green"},[e._v(e._s(t.row.activityScore))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"apprenticeCount",label:"下级人数"}}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"reward",label:"总收益"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"red"},[e._v(e._s(e._f("currencyNum")(t.row.reward)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"firstReward",label:"首个任务奖励"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("currencyNum")(t.row.firstReward)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"secondReward",label:"后续任务奖励"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("currencyNum")(t.row.secondReward)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"taskCount",label:"徒弟完成任务数"}}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"apprenticeReward",label:"徒弟任务奖励"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("currencyNum")(t.row.apprenticeReward)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"coin",label:"余额"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"green"},[e._v(e._s(e._f("currencyNum")(t.row.coin)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"darenTime",label:"达人设置时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.darenTime>0?a("span",[e._v(e._s(e._f("datetime")(t.row.darenTime)))]):a("span",[e._v("-")])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(a){e.getOne(t.row.userId)}}},[e._v("详情")]),e._v(" "),e.cancelDR?a("el-button",{attrs:{type:"danger",plain:"",size:"mini"},on:{click:function(a){e.cancelTap(t.row.accountId)}}},[e._v("取消身份")]):e._e(),e._v(" "),e.editScore?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){e.getHyd(t.row.userId,t.row.qualityScore,t.row.activityScore)}}},[e._v("活跃度分")]):e._e(),e._v(" "),1==t.row.openActivity&&e.openActive?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){e.showHyd(t.row.userId,2)}}},[(e.optionW="370")?a("span"):e._e(),e._v("展示活跃度")]):e._e(),e._v(" "),2==t.row.openActivity&&e.openActive?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){e.showHyd(t.row.userId,1)}}},[(e.optionW="370")?a("span"):e._e(),e._v("不展示活跃度")]):e._e()]}}])})],1)],e._v(" "),a("el-dialog",{attrs:{title:"添加用户为达人",visible:e.dialogTableVisible,width:"600px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:16}},[a("el-form-item",{attrs:{label:"达人Id","label-width":e.formLabelWidth,prop:"accountId"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.accountId,callback:function(t){e.$set(e.form,"accountId",t)},expression:"form.accountId"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary",disabled:e.isSubmit},on:{click:function(t){e.addBtn("form")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改活跃度分",visible:e.dialogTableHyd,width:"700px"},on:{"update:visible":function(t){e.dialogTableHyd=t}}},[a("el-form",{ref:"formhyd",attrs:{model:e.formhyd,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:19}},[a("el-form-item",{attrs:{label:"质量分:",prop:"qualityScore","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formhyd.qualityScore,callback:function(t){e.$set(e.formhyd,"qualityScore",t)},expression:"formhyd.qualityScore"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:14}},[a("el-form-item",{attrs:{label:"活跃度:",prop:"activityScore","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.formhyd.activityScore,callback:function(t){e.$set(e.formhyd,"activityScore",t)},expression:"formhyd.activityScore"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update("formhyd")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"详情",visible:e.dialogTableDetail,width:"1200px"},on:{"update:visible":function(t){e.dialogTableDetail=t}}},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formDetail}},[a("el-form-item",{attrs:{label:"用户Id:"}},[a("el-input",{attrs:{placeholder:"请输入用户Id",clearable:""},model:{value:e.formDetail.taccountId,callback:function(t){e.$set(e.formDetail,"taccountId",t)},expression:"formDetail.taccountId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"任务名称:"}},[a("el-input",{attrs:{placeholder:"请输入任务名称",clearable:""},model:{value:e.formDetail.taskName,callback:function(t){e.$set(e.formDetail,"taskName",t)},expression:"formDetail.taskName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"任务顺序:"}},[a("el-select",{attrs:{placeholder:""},model:{value:e.formDetail.taskType,callback:function(t){e.$set(e.formDetail,"taskType",t)},expression:"formDetail.taskType"}},[a("el-option",{attrs:{label:"首个任务",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"后续任务",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"创建时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"left"},model:{value:e.selectTimeDetail,callback:function(t){e.selectTimeDetail=t},expression:"selectTimeDetail"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.searchDetail()}}},[e._v("查询")])],1)],1),e._v(" "),[a("el-table",{attrs:{data:e.formtwoInfo,"max-height":"578"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"50"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"left",prop:"taccountId",label:"用户Id"}}),e._v(" "),a("el-table-column",{attrs:{prop:"userName",label:"姓名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"daccountId",label:"所属达人id"}}),e._v(" "),a("el-table-column",{attrs:{prop:"qrCode",label:"达人邀请码"}}),e._v(" "),a("el-table-column",{attrs:{prop:"taskName",label:"任务名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"taskType",label:"任务顺序"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.taskType?a("span",[e._v("首个任务")]):e._e(),e._v(" "),2==t.row.taskType?a("span",[e._v("后续任务")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"apprenticeReward",label:"奖励金币"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("currencyNum")(t.row.apprenticeReward)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"reward",label:"贡献奖励"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("currencyNum")(t.row.reward)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"createTime",label:"创建时间"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.createTime>0?a("span",[e._v(e._s(e._f("datetime")(t.row.createTime)))]):a("span",[e._v("-")])]}}])})],1)],e._v(" "),e.tableData?a("div",{staticClass:"sun_sty",staticStyle:{"margin-top":"10px"}},[a("p",[e._v("总奖励"),a("span",[e._v("：")]),e._v("[ "+e._s(e._f("currencyNum")(e.rewardSum))+" ]")])]):e._e(),e._v(" "),a("div",{staticClass:"block",staticStyle:{"margin-top":"10px"}},[a("el-pagination",{attrs:{"current-page":e.currentPageDetail,"page-sizes":[10,20,50,70],"page-size":e.pageSizeDetail,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCountDetail},on:{"size-change":e.handleSizeChangeDetail,"current-change":e.handleCurrentChangeDetail}})],1)],2)],2),e._v(" "),a("div",{staticClass:"block mar_bot"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"daren-manage-header"},[t("h3",[this._v("达人管理/达人管理")]),this._v(" "),t("hr")])}]};var o=a("VU/8")(r,l,!1,function(e){a("TcI6")},null,null);t.default=o.exports}});