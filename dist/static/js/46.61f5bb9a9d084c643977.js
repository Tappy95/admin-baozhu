webpackJsonp([46],{"MI/7":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("xT6B"),n={name:"GoldEggsOrders",data:function(){return{powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwoInfo:{},dialogFormVisible:!1,form:{},formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{accountId:"",exchangeAccountId:"",state:"",startCreatorTime:"",endCreatorTime:"",startExchangeTime:"",endExchangeTime:""},tableData:[],isSubmit:!1,pickerOptions:{shortcuts:[{text:"最近一周",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-6048e5),t.$emit("pick",[i,e])}},{text:"最近一个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-2592e6),t.$emit("pick",[i,e])}},{text:"最近三个月",onClick:function(t){var e=new Date,i=new Date;i.setTime(i.getTime()-7776e6),t.$emit("pick",[i,e])}}]},exchangTime:"",createTime:""}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList()},mounted:function(){},filters:{currencyNum:function(t){return parseInt(t).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")},datetime:function(t){return Object(a.a)(new Date(t),"yyyy-MM-dd hh:mm:sss")}},methods:{queryBtns:function(){var t=this,e={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",e).then(function(e){if((e.statusCode+"").startsWith("2"))for(var i=e.data.length-1;i>=0;i--)"upd"==e.data[i].btnCode&&(t.upd=!0,t.powerTrue=!0,t.optionW="150")})},indexMethod:function(t){return 1*t+1},accountList:function(){var t=this,e={pageNum:this.currentPage,pageSize:this.pageSize,accountId:this.formInline.accountId,state:this.formInline.state,exchangeAccountId:this.formInline.exchangeAccountId,startCreatorTime:this.formInline.startCreatorTime,endCreatorTime:this.formInline.endCreatorTime,startExchangeTime:this.formInline.startExchangeTime,endExchangeTime:this.formInline.endExchangeTime};this.$fetch("/api/goleEggOrder/list",e).then(function(e){(e.statusCode+"").startsWith("2")?(t.tableData=e.data.list,t.totalCount=e.data.total):t.$message({type:"error",message:e.message,duration:3e3})})},search:function(){this.createTime&&this.createTime[0]?this.formInline.startCreatorTime=this.createTime[0].getTime():this.formInline.startCreatorTime="",this.createTime&&this.createTime[1]?this.formInline.endCreatorTime=this.createTime[1].getTime():this.formInline.endCreatorTime="",this.exchangTime&&this.exchangTime[0]?this.formInline.startExchangeTime=this.exchangTime[0].getTime():this.formInline.startExchangeTime="",this.exchangTime&&this.exchangTime[1]?this.formInline.endExchangeTime=this.exchangTime[1].getTime():this.formInline.endExchangeTime="",this.currentPage=1,this.pageSize=10,this.accountList()},getInfo:function(t){var e=this;this.dialogTableVisible=!0,this.$fetch("/api/goleEggOrder/info",{id:t}).then(function(t){(t.statusCode+"").startsWith("2")&&(e.formtwoInfo=t.data)})},edit:function(t,e){var i,a=this;i=1==e?"启用":"禁用",this.$confirm("此操作将"+i+"该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){var n={id:t,isProhibit:e};a.$post("/api/goleEggOrder/updateProhibit",n).then(function(t){(t.statusCode+"").startsWith("2")?(a.$message({type:"success",message:i+"成功！"}),a.accountList()):a.$message({type:"error",message:i+"失败！"})})}).catch(function(){a.$message({type:"info",message:"已取消操作"})})},handleSizeChange:function(t){this.pageSize=t,this.accountList()},handleCurrentChange:function(t){this.currentPage=t,this.accountList()}}},s={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"gold-eggs-order-wrap"},[i("div",{staticClass:"gold-eggs-order-inner"},[t._m(0),t._v(" "),i("div",[i("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[i("el-form-item",{attrs:{label:"用户Id:"}},[i("el-input",{attrs:{placeholder:"请输入用户Id",clearable:""},model:{value:t.formInline.accountId,callback:function(e){t.$set(t.formInline,"accountId",e)},expression:"formInline.accountId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"使用者用户Id:"}},[i("el-input",{attrs:{placeholder:"请输入使用者用户Id",clearable:""},model:{value:t.formInline.exchangeAccountId,callback:function(e){t.$set(t.formInline,"exchangeAccountId",e)},expression:"formInline.exchangeAccountId"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"状态:"}},[i("el-select",{attrs:{placeholder:"请选择状态"},model:{value:t.formInline.state,callback:function(e){t.$set(t.formInline,"state",e)},expression:"formInline.state"}},[i("el-option",{attrs:{label:"未使用",value:"1"}}),t._v(" "),i("el-option",{attrs:{label:"已使用",value:"2"}}),t._v(" "),i("el-option",{attrs:{label:"全部",value:""}})],1)],1),t._v(" "),i("el-form-item",{attrs:{label:"创建时间:"}},[i("el-date-picker",{attrs:{type:"datetimerange","picker-options":t.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"left"},model:{value:t.createTime,callback:function(e){t.createTime=e},expression:"createTime"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"使用时间:"}},[i("el-date-picker",{attrs:{type:"datetimerange","picker-options":t.pickerOptions,"range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期",align:"left"},model:{value:t.exchangTime,callback:function(e){t.exchangTime=e},expression:"exchangTime"}})],1),t._v(" "),i("el-button",{staticClass:"mytest",attrs:{type:"primary",plain:""},on:{click:function(e){t.search()}}},[t._v("查询")]),t._v(" "),t.add?i("el-button",{attrs:{type:"success",plain:""},on:{click:function(e){t.load()}}},[t._v("添加")]):t._e()],1)],1),t._v(" "),i("div",{staticClass:"gold-eggs-order-table"},[[i("el-table",{attrs:{data:t.tableData,"max-height":"556"}},[i("el-table-column",{attrs:{label:"序号",type:"index",index:t.indexMethod,width:"80"}}),t._v(" "),i("el-table-column",{attrs:{prop:"accountId",label:"用户Id"}}),t._v(" "),i("el-table-column",{attrs:{prop:"cardNumber",label:"卡号"}}),t._v(" "),i("el-table-column",{attrs:{prop:"pigCoin",label:"消耗金猪数"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("currencyNum")(e.row.pigCoin)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"obtainPigCoin",label:"获得金猪"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("currencyNum")(e.row.obtainPigCoin)))])]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"state",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.state?i("span",[t._v("未使用")]):t._e(),t._v(" "),2==e.row.state?i("span",[t._v("已使用")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"exchangeAccountId",label:"使用者用户id"}}),t._v(" "),i("el-table-column",{attrs:{prop:"exchangeTime",label:"使用时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[e.row.exchangeTime>0?i("span",[t._v(t._s(t._f("datetime")(e.row.exchangeTime)))]):i("span",[t._v("-")])]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"isProhibit",label:"是否禁用"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.isProhibit?i("span",[t._v("否")]):t._e(),t._v(" "),2==e.row.isProhibit?i("span",[t._v("是")]):t._e()]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"creatorTime",label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",[t._v(t._s(t._f("datetime")(e.row.creatorTime)))])]}}])}),t._v(" "),t.powerTrue?i("el-table-column",{attrs:{fixed:"right",label:"操作",width:t.optionW},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(i){t.getInfo(e.row.id)}}},[t._v("详情")]),t._v(" "),t.upd&&2==e.row.isProhibit&&1==e.row.state?i("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(i){t.edit(e.row.id,1)}}},[t._v("启用")]):t._e(),t._v(" "),t.upd&&1==e.row.isProhibit&&1==e.row.state?i("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(i){t.edit(e.row.id,2)}}},[t._v("禁用")]):t._e()]}}])}):t._e()],1)],t._v(" "),i("el-dialog",{attrs:{title:"详情",visible:t.dialogTableVisible,width:"800px"},on:{"update:visible":function(e){t.dialogTableVisible=e}}},[i("el-form",{attrs:{model:t.formtwoInfo}},[i("el-row",[i("div",{staticClass:"box_xinxi"},[i("div",{staticClass:"wrap_da"},[i("div",{staticClass:"body_list",staticStyle:{width:"100%"}},[i("div",{staticClass:"title"},[t._v("用户d:")]),t._v(" "),i("div",{staticClass:"name"},[t._v("\n                    "+t._s(t.formtwoInfo.accountId)+"\n                  ")])]),t._v(" "),i("div",{staticClass:"body_list",staticStyle:{width:"100%"}},[i("div",{staticClass:"title"},[t._v("卡号:")]),t._v(" "),i("div",{staticClass:"name"},[t._v("\n                    "+t._s(t.formtwoInfo.cardNumber)+"\n                  ")])]),t._v(" "),i("div",{staticClass:"body_list",staticStyle:{width:"100%"}},[i("div",{staticClass:"title"},[t._v("卡密:")]),t._v(" "),i("div",{staticClass:"name"},[t._v("\n                    "+t._s(t.formtwoInfo.cardPassword)+"\n                  ")])]),t._v(" "),i("div",{staticClass:"body_list"},[i("div",{staticClass:"title"},[t._v("消耗金猪数:")]),t._v(" "),i("div",{staticClass:"name"},[t._v("\n                    "+t._s(t._f("currencyNum")(t.formtwoInfo.pigCoin))+"\n                  ")])]),t._v(" "),i("div",{staticClass:"body_list"},[i("div",{staticClass:"title"},[t._v("获得金猪:")]),t._v(" "),i("div",{staticClass:"name"},[t._v("\n                    "+t._s(t._f("currencyNum")(t.formtwoInfo.obtainPigCoin))+"\n                  ")])]),t._v(" "),i("div",{staticClass:"body_list"},[i("div",{staticClass:"title"},[t._v("使用者用户id:")]),t._v(" "),i("div",{staticClass:"name"},[t._v("\n                    "+t._s(t.formtwoInfo.exchangeAccountId)+"\n                  ")])]),t._v(" "),i("div",{staticClass:"body_list"},[i("div",{staticClass:"title"},[t._v("使用时间:")]),t._v(" "),i("div",{staticClass:"name"},[t.formtwoInfo.exchangeTime>0?i("span",[t._v(t._s(t._f("datetime")(t.formtwoInfo.exchangeTime)))]):i("span",[t._v("-")])])]),t._v(" "),i("div",{staticClass:"body_list"},[i("div",{staticClass:"title"},[t._v("是否禁用:")]),t._v(" "),i("div",{staticClass:"name"},[1==t.formtwoInfo.isProhibit?i("span",[t._v("否")]):t._e(),t._v(" "),2==t.formtwoInfo.isProhibit?i("span",[t._v("是")]):t._e()])]),t._v(" "),i("div",{staticClass:"body_list"},[i("div",{staticClass:"title"},[t._v("状态:")]),t._v(" "),i("div",{staticClass:"name"},[1==t.formtwoInfo.state?i("span",[t._v("未使用")]):t._e(),t._v(" "),2==t.formtwoInfo.state?i("span",[t._v("已使用")]):t._e()])]),t._v(" "),i("div",{staticClass:"body_list",staticStyle:{width:"100%"}},[i("div",{staticClass:"title"},[t._v("创建时间:")]),t._v(" "),i("div",{staticClass:"name"},[t._v("\n                    "+t._s(t._f("datetime")(t.formtwoInfo.creatorTime))+"\n                  ")])])])])])],1)],1)],2),t._v(" "),i("div",{staticClass:"block"},[i("el-pagination",{attrs:{"current-page":t.currentPage,"page-sizes":[10,20,50,70],"page-size":t.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.totalCount},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"gold-eggs-order-header"},[e("h3",[this._v("砸金蛋/砸金蛋订单")]),this._v(" "),e("hr")])}]};var o=i("VU/8")(n,s,!1,function(t){i("ipBb")},null,null);e.default=o.exports},ipBb:function(t,e){}});