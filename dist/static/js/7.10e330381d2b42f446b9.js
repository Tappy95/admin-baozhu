webpackJsonp([7],{"c1/+":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("xT6B"),i={name:"RankCoin",data:function(){return{powerTrue:!1,optionW:"75px",menuId:"",dialogTableVisible:!1,dialogTable:!1,formtwo:{},dialogFormVisible:!1,formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{realData:"",rankDate:"",rankType:"1"},tableData:[],isShow:!1,message:{},showImg:!1,pickerOptions:{disabledDate:function(e){return e.getTime()>Date.now()},shortcuts:[{text:"今天",onClick:function(e){e.$emit("pick",new Date)}},{text:"昨天",onClick:function(e){var t=new Date;t.setTime(t.getTime()-864e5),e.$emit("pick",t)}},{text:"一周前",onClick:function(e){var t=new Date;t.setTime(t.getTime()-6048e5),e.$emit("pick",t)}}]}}},created:function(){this.menuId=this.$route.query.id,this.accountList()},components:{"big-img":a("fM1o").a},filters:{currency:function(e){return parseInt(e).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")}},methods:{clickImg:function(e){this.showImg=!0,this.imgSrc=e.currentTarget.src},viewImg:function(){this.showImg=!1},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(n.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,realData:this.formInline.realData,rankDate:this.formInline.rankDate,rankType:this.formInline.rankType};this.$fetch("/api/rankCoin/queryFlist",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total):e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.formInline.rankDate?this.formInline.rankDate=Object(n.a)(new Date(this.formInline.rankDate),"yyyy-MM-dd"):this.formInline.rankDate="",this.currentPage=1,this.pageSize=10,this.accountList()},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()},JumpTap:function(){this.$router.push({name:"RankPig"})}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"rank-coin-wrap"},[a("div",{staticClass:"rank-coin-inner"},[a("div",{staticClass:"rank-coin-header"},[a("h3",[e._v("排行榜/金币排行")]),e._v(" "),a("el-button",{attrs:{size:"small",plain:"",type:"warning"},on:{click:e.JumpTap}},[e._v("金猪排行")])],1),e._v(" "),a("hr"),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"是否真实用户:"}},[a("el-select",{attrs:{placeholder:"请选择是否真实用户"},model:{value:e.formInline.realData,callback:function(t){e.$set(e.formInline,"realData",t)},expression:"formInline.realData"}},[a("el-option",{attrs:{label:"是",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"排行榜类型:"}},[a("el-select",{attrs:{placeholder:"请选择排行榜类型"},model:{value:e.formInline.rankType,callback:function(t){e.$set(e.formInline,"rankType",t)},expression:"formInline.rankType"}},[a("el-option",{attrs:{label:"日榜",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"月榜",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"排名时间:"}},[a("el-date-picker",{attrs:{align:"right",type:"date",placeholder:"请选择日期","picker-options":e.pickerOptions},model:{value:e.formInline.rankDate,callback:function(t){e.$set(e.formInline,"rankDate",t)},expression:"formInline.rankDate"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"rank-coin-table"},[[a("el-table",{attrs:{data:e.tableData,"max-height":"680"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"80"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"left","min-width":"150",prop:"rankType",label:"排行榜类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.rankType?a("span",[e._v("日榜")]):e._e(),e._v(" "),3==t.row.rankType?a("span",[e._v("月榜")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"120",prop:"rankOrder",label:"排名"}}),e._v(" "),a("el-table-column",{attrs:{prop:"imageUrl",label:"头像"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("img",{staticClass:"list_img",staticStyle:{"max-width":"90px","max-height":"50px"},attrs:{src:t.row.imageUrl},on:{click:function(t){e.clickImg(t)}}})]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"120",prop:"mobile",label:"电话号码"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170",label:"累计金币数"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"green"},[e._v("\n               "+e._s(e._f("currency")(t.row.coinBalance))+"\n              ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170",label:"奖励金币数"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{staticClass:"green"},[e._v("\n               "+e._s(e._f("currency")(t.row.rewardAmount))+"\n              ")])]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"rankDate",width:"170",formatter:e.dateFormat,label:"排名时间"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170",prop:"realData",label:"是否真实用户"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.realData?a("span",{staticClass:"green"},[e._v("是")]):e._e(),e._v(" "),2==t.row.realData?a("span",{staticClass:"red"},[e._v("否")]):e._e()]}}])})],1)]],2),e._v(" "),e.showImg?a("big-img",{attrs:{imgSrc:e.imgSrc},on:{clickit:e.viewImg}}):e._e(),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)])},staticRenderFns:[]};var l=a("VU/8")(i,r,!1,function(e){a("jm4f")},null,null);t.default=l.exports},jm4f:function(e,t){}});