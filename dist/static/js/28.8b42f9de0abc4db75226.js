webpackJsonp([28],{"/5RG":function(t,e){},t3Nk:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("xT6B"),i=n("iPXC"),s={name:"BzGameReport",data:function(){return{menuId:"",currentPage:1,pageSize:10,totalCount:0,exportExle:!1,formInline:{timeNo:"",startTime:"",endTime:""},tableData:[],channelCode:"",days:"",minDays:"",maxDays:"",selectTime:"",selectTimeCash:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-6048e5),t.$emit("pick",[n,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-2592e6),t.$emit("pick",[n,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,n=new Date;n.setTime(n.getTime()-7776e6),t.$emit("pick",[n,e])}}]},dialogTableDetail:!1,tableDetail:[],timeNoDetail:"",xjsjjcAmount:"",xjsjzjAmount:"",zjsjjcAmount:"",zjsjzjAmount:""}},filters:{currency:function(t){return parseInt(t).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")}},created:function(){this.menuId=this.$route.query.id,this.channelCode=Object(i.d)("channelCode"),this.queryBtns(),this.accountList()},methods:{queryBtns:function(){var t=this,e={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",e).then(function(e){if((e.statusCode+"").startsWith("2"))for(var n=e.data.length-1;n>=0;n--)"exportExle"==e.data[n].btnCode&&(t.exportExle=!0)})},indexMethod:function(t){return 1*t+1},dateFormat:function(t,e){var n=t[e.property];return void 0==n?"":Object(a.a)(new Date(n),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var t=this,e={pageNum:this.currentPage,pageSize:this.pageSize,timeNo:this.formInline.timeNo,startTime:this.formInline.startTime,endTime:this.formInline.endTime};this.$fetch("/bz28/lotteryTime/queryList",e).then(function(e){(e.statusCode+"").startsWith("2")?(t.tableData=e.data.list,t.totalCount=e.data.total,t.xjsjjcAmount=e.data.xjsjjcAmount,t.xjsjzjAmount=e.data.xjsjzjAmount,t.zjsjjcAmount=e.data.zjsjjcAmount,t.zjsjzjAmount=e.data.zjsjzjAmount):t.$message({type:"error",message:e.message,duration:3e3})})},search:function(){this.selectTime&&this.selectTime[0]?this.formInline.startTime=new Date(this.selectTime[0]).getTime():this.formInline.startTime="",this.selectTime&&this.selectTime[1]?this.formInline.endTime=new Date(this.selectTime[1]).getTime():this.formInline.endTime="",this.currentPage=1,this.pageSize=10,this.accountList()},queryExport:function(){this.search(),this.fullscreenLoading=this.$loading({lock:!0,text:"正在导出...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.formInline.token=Object(i.d)("token"),this.formInline.channel=Object(i.d)("channelCode"),this.formInline.relation=Object(i.d)("userRelation");this.doDownload(this.formInline,"/bz28/excl/exclUserCashLog")},doDownload:function(t,e){var n=this,a=[],i=[];for(var s in t)null!=t[s]&&""!=t[s]&&(a.push(s),i.push(t[s]));for(var l=e,o=0;o<a.length;o++)l=l==e?l+"?"+a[o]+"="+i[o]:l+"&"+a[o]+"="+i[o];var r=document.createElement("a");r.setAttribute("href",l),document.querySelector("body").appendChild(r),r.click(),r.remove(),setTimeout(function(){n.fullscreenLoading.close()},9e3)},getOne:function(t,e){var n=this;this.dialogTableDetail=!0,this.timeNoDetail=e,this.$fetch("/bz28/lotteryTime/timeDetail",{id:t,lotteryId:1}).then(function(t){(t.statusCode+"").startsWith("2")&&(n.tableDetail=t.data)})},getDetail:function(t,e){this.$router.push({name:"BzGameDetail",query:{detailId:t,num:e}})},handleSizeChange:function(t){this.pageSize=t,this.accountList()},handleCurrentChange:function(t){this.currentPage=t,this.accountList()}}},l={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"bz-game-report-wrap"},[n("div",{staticClass:"bz-game-report-inner"},[t._m(0),t._v(" "),n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[n("el-form-item",{attrs:{label:"期号:"}},[n("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入期号",clearable:""},model:{value:t.formInline.timeNo,callback:function(e){t.$set(t.formInline,"timeNo",e)},expression:"formInline.timeNo"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"预计开奖时间"}},[n("el-date-picker",{attrs:{type:"datetimerange","picker-options":t.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"left"},model:{value:t.selectTime,callback:function(e){t.selectTime=e},expression:"selectTime"}})],1),t._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",plain:""},on:{click:t.search}},[t._v("查询")])],1)],1)],1),t._v(" "),n("div",{staticClass:"bz-game-report-table"},[[n("el-table",{attrs:{data:t.tableData,"max-height":"556"}},[n("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:t.indexMethod,width:"80"}}),t._v(" "),n("el-table-column",{attrs:{"min-width":"100px",prop:"timeNo",label:"期号"}}),t._v(" "),n("el-table-column",{attrs:{width:"170px",formatter:t.dateFormat,prop:"endDate",label:"预计开奖时间"}}),t._v(" "),n("el-table-column",{attrs:{"min-width":"200px",label:"实际竞猜人数"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.sjjcCount)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"210px",label:"实际竞猜金猪"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.sjjcAmount)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"150px",label:"实际中奖金猪"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.sjzjAmount)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"170px",label:"实际盈亏金猪"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.sjykAmount>0?n("span",{staticClass:"red"},[t._v("+"+t._s(t._f("currency")(e.row.sjykAmount)))]):e.row.sjykAmount<0?n("span",{staticClass:"green"},[t._v(t._s(t._f("currency")(e.row.sjykAmount)))]):n("span",[t._v(t._s(e.row.sjykAmount))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"170px",label:"机器人竞猜人数"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.robotCount)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"170",label:"机器人竞猜金猪"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.robotAmount)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"170",label:"机器人中奖金猪"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.robotzjAmount)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{width:"200",prop:"resultNum",label:"开奖结果"}}),t._v(" "),n("el-table-column",{attrs:{label:"状态","min-width":"120px"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.status?n("span",[t._v("未开始")]):t._e(),t._v(" "),2==e.row.status?n("span",[t._v("已开奖")]):t._e(),t._v(" "),3==e.row.status?n("span",[t._v("已截止投注")]):t._e(),t._v(" "),4==e.row.status?n("span",[t._v("已锁定")]):t._e()]}}])}),t._v(" "),n("el-table-column",{attrs:{fixed:"right",label:"操作",width:"175"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(n){t.getOne(e.row.id,e.row.timeNo)}}},[t._v("查看")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:function(n){t.getDetail(e.row.id,e.row.timeNo)}}},[t._v("投资明细")])]}}])})],1)]],2),t._v(" "),n("el-dialog",{attrs:{title:"查看",visible:t.dialogTableDetail,width:"1150px"},on:{"update:visible":function(e){t.dialogTableDetail=e}}},[n("div",{staticClass:"timeN_title"},[t._v("期号："+t._s(this.timeNoDetail))]),t._v(" "),[n("el-table",{attrs:{data:t.tableDetail,"max-height":"506"}},[n("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:t.indexMethod,width:"80"}}),t._v(" "),n("el-table-column",{attrs:{width:"80px",prop:"name",label:"玩法"}}),t._v(" "),n("el-table-column",{attrs:{width:"100px",prop:"odds",label:"赔率(%)"}}),t._v(" "),n("el-table-column",{attrs:{width:"150px",label:"实际竞猜人数"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.sjjcCount)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"150px",label:"实际竞猜金猪"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.sjjcAmount)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"150px",label:"预计中奖金猪"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.yjzAmount)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"150px",label:"实际中奖金猪"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.sjzjAmount)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"150px",label:"机器人竞猜人数"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.robotjcCount)))])]}}])}),t._v(" "),n("el-table-column",{attrs:{"min-width":"150px",label:"机器人竞猜金猪"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("span",[t._v(t._s(t._f("currency")(e.row.robotjcAmount)))])]}}])})],1)]],2),t._v(" "),t.tableData.length>0?n("div",{staticClass:"sun_sty report"},[n("div",{staticClass:"list"},[n("div",{staticClass:"item"},[n("p",[t._v("小计"),n("span",[t._v("("+t._s(t.tableData.length)+"):")])])]),t._v(" "),n("div",{staticClass:"item"},[n("p",[t._v(" [ 实际竞猜金猪： "+t._s(t._f("currency")(t.xjsjjcAmount))+" ]")])]),t._v(" "),n("div",{staticClass:"item"},[n("p",[t._v(" [ 实际中奖金猪："+t._s(t._f("currency")(t.xjsjzjAmount))+" ]")])])]),t._v(" "),n("div",{staticClass:"list"},[n("div",{staticClass:"item"},[n("p",[t._v("合计"),n("span",[t._v("("+t._s(t.totalCount)+"):")])])]),t._v(" "),n("div",{staticClass:"item"},[n("p",[t._v(" [ 实际竞猜金猪： "+t._s(t._f("currency")(t.zjsjjcAmount))+" ]")])]),t._v(" "),n("div",{staticClass:"item"},[n("p",[t._v("[ 实际中奖金猪："+t._s(t._f("currency")(t.zjsjzjAmount))+" ]")])])])]):t._e(),t._v(" "),n("div",{staticClass:"block",staticStyle:{"margin-left":"10px"}},[n("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,70],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"bz-game-report-header"},[e("h3",[this._v("宝猪28/游戏报表")]),this._v(" "),e("hr")])}]};var o=n("VU/8")(s,l,!1,function(t){n("/5RG")},null,null);e.default=o.exports}});