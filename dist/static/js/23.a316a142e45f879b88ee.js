webpackJsonp([23],{"C7k+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("iPXC"),i=a("xT6B"),s={name:"WishXwCallback",data:function(){return{channelNameList:[],menuId:"",formLabelWidth:"120px",exportExle:!1,currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],successCount:"",priceSum:"",moneySum:"",smallSuccessCount:"",smallPriceSum:"",smallMoneySum:"",optionW:"1px",rep:!1,showW:!1,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]},selectTime:"",channelCode:""}},created:function(){this.menuId=this.$route.query.id,this.accountList(),this.channelCode=Object(n.d)("channelCode")},filters:{currency:function(e){return parseInt(e).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")}},methods:{indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(i.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,accountId:this.formInline.accountId,adname:this.formInline.adname,status:this.formInline.status,ordernum:this.formInline.ordernum,startTime:this.formInline.startTime,endTime:this.formInline.endTime,channelCode:this.formInline.channelCode};this.$fetch("/api/XWCallback/xyzList",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total,e.successCount=t.data.successCount,e.priceSum=t.data.priceSum,e.moneySum=t.data.moneySum,e.smallSuccessCount=t.data.smallSuccessCount,e.smallPriceSum=t.data.smallPriceSum,e.smallMoneySum=t.data.smallMoneySum):e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.selectTime&&this.selectTime[0]?this.formInline.startTime=new Date(this.selectTime[0]).getTime():this.formInline.startTime="",this.selectTime&&this.selectTime[1]?this.formInline.endTime=new Date(this.selectTime[1]).getTime():this.formInline.endTime="",this.currentPage=1,this.pageSize=10,this.accountList()},repTap:function(e){var t=this;this.$confirm("此操作将重发消息, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){var a={ordernum:e};t.$fetch("/api/XWCallback/reSend",a).then(function(e){(e.statusCode+"").startsWith("2")?t.$message({type:"success",message:"重发成功！"}):t.$message({type:"error",message:e.message}),t.accountList()})}).catch(function(){t.$message({type:"info",message:"已取消重发操作"})})},timePickeTap:function(){if(this.formInline.creatorTime){var e=this.formInline.creatorTime;this.formInline.creatorTime=Object(i.a)(new Date(e),"yyyy-MM-dd")}else this.formInline.creatorTime=""},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()}}},l={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wishxianwan-callback-wrap"},[a("div",{staticClass:"wishxianwan-callback-inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"用户Id:"}},[a("el-input",{attrs:{placeholder:"请输入用户Id",clearable:""},model:{value:e.formInline.accountId,callback:function(t){e.$set(e.formInline,"accountId",t)},expression:"formInline.accountId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"游戏名称:"}},[a("el-input",{attrs:{placeholder:"请输入游戏名称",clearable:""},model:{value:e.formInline.adname,callback:function(t){e.$set(e.formInline,"adname",t)},expression:"formInline.adname"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"订单号:"}},[a("el-input",{attrs:{placeholder:"请输入订单号",clearable:""}})],1),e._v(" "),"baozhu"==e.channelCode?a("el-form-item",{attrs:{label:"渠道标识:"}},[a("el-input",{attrs:{placeholder:"请输入渠道标识",clearable:""},model:{value:e.formInline.channelCode,callback:function(t){e.$set(e.formInline,"channelCode",t)},expression:"formInline.channelCode"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:e.formInline.status,callback:function(t){e.$set(e.formInline,"status",t)},expression:"formInline.status "}},[a("el-option",{attrs:{label:"失败",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"成功",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"回调时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange","picker-options":e.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"left"},model:{value:e.selectTime,callback:function(t){e.selectTime=t},expression:"selectTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"mar_bottom",attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")])],1)],1)],1),e._v(" "),a("div",{staticClass:"wishxianwan-callback-table"},[[a("el-table",{attrs:{data:e.tableData,"max-height":"600"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"80"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"250",fixed:"left",prop:"ordernum",label:"订单号"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"accountId",label:"用户Id"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"150",prop:"channelCode",label:"渠道号"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"adname",label:"游戏名称"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"150",prop:"appid",label:"开发者Id"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170",prop:"deviceid",label:"设备号"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"price",label:"总奖励"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"money",label:"用户奖励"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"xy",label:"心愿值"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"status",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.status?a("span",{staticClass:"red"},[e._v("失败")]):e._e(),e._v(" "),1==t.row.status?a("span",{staticClass:"green"},[e._v("成功")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170",prop:"createTime",label:"回调时间"}})],1)]],2),e._v(" "),e.tableData.length>0?a("div",{staticClass:"sun_sty"},[a("div",{staticClass:"list"},[e._m(1),e._v(" "),a("div",{staticClass:"item su"},[a("p",[e._v(" [ 成功数： "+e._s(e._f("currency")(e.smallSuccessCount))+" ]")])]),e._v(" "),a("div",{staticClass:"item"},[a("p",[e._v(" [ 平台奖励："+e._s(e._f("currency")(e.smallPriceSum))+" ]")])]),e._v(" "),a("div",{staticClass:"item"},[a("p",[e._v(" [ 用户奖励："+e._s(e._f("currency")(e.smallMoneySum))+" ]")])])]),e._v(" "),a("div",{staticClass:"list"},[e._m(2),e._v(" "),a("div",{staticClass:"item su"},[a("p",[e._v(" [ 成功数： "+e._s(e._f("currency")(e.successCount))+" ]")])]),e._v(" "),a("div",{staticClass:"item"},[a("p",[e._v(" [ 平台奖励："+e._s(e._f("currency")(e.priceSum))+" ]")])]),e._v(" "),a("div",{staticClass:"item"},[a("p",[e._v(" [ 用户奖励："+e._s(e._f("currency")(e.moneySum))+" ]")])])])]):e._e(),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"wishxianwan-callback-header"},[t("h3",[this._v("心愿值/闲玩回调")]),this._v(" "),t("hr")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"item xiao"},[t("p",[this._v("小计：")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"item xiao"},[t("p",[this._v("合计：")])])}]};var r=a("VU/8")(s,l,!1,function(e){a("Fxxu")},null,null);t.default=r.exports},Fxxu:function(e,t){}});