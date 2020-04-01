webpackJsonp([70],{Y8us:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("xT6B"),i={name:"PunchCardRecord",data:function(){return{currentPage:1,pageSize:10,totalCount:0,subPayCoin:"",subRewardCoin:"",payCoin:"",rewardCoin:"",formInline:{startCreateTime:"",endCreateTime:"",accountId:"",state:""},tableData:[],fullscreenLoading:!1,selectTime:"",pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-6048e5),e.$emit("pick",[a,t])}},{text:"最近一个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-2592e6),e.$emit("pick",[a,t])}},{text:"最近三个月",onClick:function(e){var t=new Date,a=new Date;a.setTime(a.getTime()-7776e6),e.$emit("pick",[a,t])}}]}}},created:function(){this.menuId=this.$route.query.id,this.accountList()},filters:{currency:function(e){return parseInt(e).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")}},methods:{indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(n.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,startCreateTime:this.formInline.startCreateTime,endCreateTime:this.formInline.endCreateTime,accountId:this.formInline.accountId,state:this.formInline.state};this.$fetch("/api/checkinLog/page",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=parseInt(t.data.total),e.subPayCoin=t.data.subPayCoin,e.subRewardCoin=t.data.subRewardCoin,e.payCoin=t.data.payCoin,e.rewardCoin=t.data.rewardCoin):e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.selectTime&&this.selectTime[0]?this.formInline.startCreateTime=this.selectTime[0].getTime():this.formInline.startCreateTime="",this.selectTime&&this.selectTime[1]?this.formInline.endCreateTime=this.selectTime[1].getTime():this.formInline.endCreateTime="",this.currentPage=1,this.pageSize=10,this.accountList()},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()}}},s={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"punch-card-record-wrap"},[a("div",{staticClass:"punch-card-record-inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"用户Id:"}},[a("el-input",{attrs:{placeholder:"请输入用户Id",clearable:""},model:{value:e.formInline.accountId,callback:function(t){e.$set(e.formInline,"accountId",t)},expression:"formInline.accountId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态:"}},[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:e.formInline.state,callback:function(t){e.$set(e.formInline,"state",t)},expression:"formInline.state"}},[a("el-option",{attrs:{label:"待打卡",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"打卡成功",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"打卡失败",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"创建时间:"}},[a("el-date-picker",{attrs:{type:"datetimerange",align:"right","unlink-panels":"","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","picker-options":e.pickerOptions},model:{value:e.selectTime,callback:function(t){e.selectTime=t},expression:"selectTime"}})],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")])],1)],1)],1),e._v(" "),a("div",{staticClass:"punch-card-record-table"},[[a("el-table",{attrs:{data:e.tableData,"max-height":"518"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"80"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"100",fixed:"left",prop:"accountId",label:"用户Id"}}),e._v(" "),a("el-table-column",{attrs:{label:"状态","min-width":"120px"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.state?a("span",{staticClass:"blue"},[e._v("待打卡")]):e._e(),e._v(" "),2==t.row.state?a("span",{staticClass:"green"},[e._v("打卡成功")]):e._e(),e._v(" "),3==t.row.state?a("span",{staticClass:"red"},[e._v("打卡失败")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"payCoin",label:"支付金币"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"amountyellow"},[e._v("\n               -"+e._s(e._f("currency")(t.row.payCoin))+"\n              ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",coinBalance:"",prop:"rewardCoin",label:"奖励金币"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"amountgreen"},[e._v("\n               +"+e._s(e._f("currency")(t.row.rewardCoin))+"\n              ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"isCoupon","min-width":"170px",label:"是否使用补签券"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.isCoupon?a("span",[e._v("否")]):e._e(),e._v(" "),2==t.row.isCoupon?a("span",[e._v("是")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime",formatter:e.dateFormat,width:"170px",label:"创建时间"}})],1)]],2),e._v(" "),e.tableData.length>0?a("div",{staticClass:"sun_sty"},[a("div",{staticClass:"list nolen"},[e._m(1),e._v(" "),a("div",{staticClass:"item"},[a("p",[e._v(" [ 支付金额： "+e._s(e._f("currency")(e.subPayCoin))+" ]")])]),e._v(" "),a("div",{staticClass:"item"},[a("p",[e._v("[ 奖励金额："+e._s(e._f("currency")(e.subRewardCoin))+" ]")])])]),e._v(" "),a("div",{staticClass:"list nolen"},[e._m(2),e._v(" "),a("div",{staticClass:"item"},[a("p",[e._v(" [ 支付金额： "+e._s(e._f("currency")(e.payCoin))+" ]")])]),e._v(" "),a("div",{staticClass:"item"},[a("p",[e._v("[ 奖励金额："+e._s(e._f("currency")(e.rewardCoin))+" ]")])])])]):e._e(),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"punch-card-record-header"},[t("h3",[this._v("早起打卡/打卡记录")]),this._v(" "),t("hr")])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"item",staticStyle:{"min-width":"50px"}},[t("p",[this._v("小计:"),t("span")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"item",staticStyle:{"min-width":"50px"}},[t("p",[this._v("合计:"),t("span")])])}]};var r=a("VU/8")(i,s,!1,function(e){a("uIDX")},null,null);t.default=r.exports},uIDX:function(e,t){}});