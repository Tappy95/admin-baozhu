webpackJsonp([92],{YHte:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("xT6B"),a=n("iPXC"),l={name:"UserTrial",data:function(){return{menuId:"",currentPage:1,pageSize:10,totalCount:0,exportExle:!1,formInline:{accountId:"",channelCode:"",minZcYxCount:"",maxZcYxCount:"",minYxCount:"",maxYxCount:"",startTime:"",endTime:""},tableData:[],channelCode:"",selectTime:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-6048e5),e.$emit("pick",[n,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-2592e6),e.$emit("pick",[n,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,n=new Date;n.setTime(n.getTime()-7776e6),e.$emit("pick",[n,t])}}]}}},filters:{currency:function(e){return parseInt(e).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")}},created:function(){this.menuId=this.$route.query.id,this.channelCode=Object(a.d)("channelCode"),this.queryBtns(),this.accountList()},methods:{queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var n=t.data.length-1;n>=0;n--)"exportExle"==t.data[n].btnCode&&(e.exportExle=!0)})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var n=e[t.property];return void 0==n?"":Object(i.a)(new Date(n),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,accountId:this.formInline.accountId,channelCode:this.formInline.channelCode,minZcYxCount:this.formInline.minZcYxCount,maxZcYxCount:this.formInline.maxZcYxCount,minYxCount:this.formInline.minYxCount,maxYxCount:this.formInline.maxYxCount,startTime:this.formInline.startTime,endTime:this.formInline.endTime};this.$fetch("/api/userStatistic/userList",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total):e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.selectTime&&this.selectTime[0]?this.formInline.startTime=new Date(this.selectTime[0]).getTime():this.formInline.startTime="",this.selectTime&&this.selectTime[1]?this.formInline.endTime=new Date(this.selectTime[1]).getTime():this.formInline.endTime="",this.currentPage=1,this.pageSize=10,this.accountList()},queryExport:function(){this.search(),this.fullscreenLoading=this.$loading({lock:!0,text:"正在导出...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.formInline.token=Object(a.d)("token"),this.formInline.channel=Object(a.d)("channelCode"),this.formInline.relation=Object(a.d)("userRelation");this.doDownload(this.formInline,"/api/excl/userGameStatisticExcl")},doDownload:function(e,t){var n=this,i=[],a=[];for(var l in e)null!=e[l]&&""!=e[l]&&(i.push(l),a.push(e[l]));for(var o=t,r=0;r<i.length;r++)o=o==t?o+"?"+i[r]+"="+a[r]:o+"&"+i[r]+"="+a[r];var s=document.createElement("a");s.setAttribute("href",o),document.querySelector("body").appendChild(s),s.click(),s.remove(),setTimeout(function(){n.fullscreenLoading.close()},9e3)},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()}}},o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"user-trial-wrap"},[n("div",{staticClass:"user-trial-inner"},[e._m(0),e._v(" "),n("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[n("el-form-item",{staticStyle:{"margin-right":"20px"},attrs:{label:"用户ID:"}},[n("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入用户ID",clearable:""},model:{value:e.formInline.accountId,callback:function(t){e.$set(e.formInline,"accountId",t)},expression:"formInline.accountId"}})],1),e._v(" "),"baozhu"==e.channelCode?n("el-form-item",{attrs:{label:"渠道标识:"}},[n("el-input",{attrs:{placeholder:"请输入渠道标识","auto-complete":"off",clearable:""},model:{value:e.formInline.channelCode,callback:function(t){e.$set(e.formInline,"channelCode",t)},expression:"formInline.channelCode"}})],1):e._e(),e._v(" "),n("el-form-item",{attrs:{label:"注册当日完成游戏个数:"}},[n("el-input",{staticStyle:{width:"100px"},attrs:{placeholder:"最少个数","auto-complete":"off",clearable:""},model:{value:e.formInline.minZcYxCount,callback:function(t){e.$set(e.formInline,"minZcYxCount",t)},expression:"formInline.minZcYxCount"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"至"}},[n("el-input",{staticStyle:{width:"100px"},attrs:{placeholder:"最多个数","auto-complete":"off",clearable:""},model:{value:e.formInline.maxZcYxCount,callback:function(t){e.$set(e.formInline,"maxZcYxCount",t)},expression:"formInline.maxZcYxCount"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"累计完成游戏个数:"}},[n("el-input",{staticStyle:{width:"100px"},attrs:{placeholder:"最小个数","auto-complete":"off",clearable:""},model:{value:e.formInline.minYxCount,callback:function(t){e.$set(e.formInline,"minYxCount",t)},expression:"formInline.minYxCount"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"至:"}},[n("el-input",{staticStyle:{width:"100px"},attrs:{placeholder:"最大个数","auto-complete":"off",clearable:""},model:{value:e.formInline.maxYxCount,callback:function(t){e.$set(e.formInline,"maxYxCount",t)},expression:"formInline.maxYxCount"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"注册时间:"}},[n("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"起始注册时间","end-placeholder":"结束注册时间",align:"left"},model:{value:e.selectTime,callback:function(t){e.selectTime=t},expression:"selectTime"}})],1),e._v(" "),n("el-form-item",[n("el-button",{attrs:{type:"primary",plain:""},on:{click:e.search}},[e._v("查询")])],1),e._v(" "),n("el-form-item",[e.exportExle?n("el-button",{attrs:{type:"success",plain:""},on:{click:e.queryExport}},[e._v("导出表格")]):e._e()],1)],1)],1),e._v(" "),n("div",{staticClass:"user-trial-table"},[[n("el-table",{attrs:{data:e.tableData,"max-height":"506"}},[n("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"80"}}),e._v(" "),n("el-table-column",{attrs:{fixed:"left","min-width":"100px",prop:"accountId",label:"用户ID"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"100px",prop:"channelCode",label:"渠道标识"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"200px",prop:"zcYxGame",label:"注册当日完成游戏个数"}}),e._v(" "),n("el-table-column",{attrs:{"min-width":"200px",prop:"yxGame",label:"累计完成游戏个数"}}),e._v(" "),n("el-table-column",{attrs:{width:"170px",prop:"createTime",label:"注册时间"}})],1)]],2),e._v(" "),n("div",{staticClass:"block",staticStyle:{"margin-left":"10px"}},[n("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"user-trial-header"},[t("h3",[this._v("运营管理/用户试玩数据")]),this._v(" "),t("hr")])}]};var r=n("VU/8")(l,o,!1,function(e){n("wo51")},null,null);t.default=r.exports},wo51:function(e,t){}});