webpackJsonp([33],{ZQlH:function(e,t){},zr4V:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("xT6B"),l={name:"DbList",data:function(){return{menuId:"",currentPage:1,pageSize:10,totalCount:0,exportExle:!1,formInline:{timeNo:"",status:"",goodsTypeId:""},tableData:[],channelCode:"",days:"",minDays:"",maxDays:"",selectTime:"",selectTimeCash:"",loading:!1,showImg:!1,imgSrc:"",goodsList:[],send:!1,form:{isMail:1,remarks:""},dialogFormVisible:!1,formLabelWidth:"120px"}},components:{"big-img":i("fM1o").a},filters:{currency:function(e){return parseInt(e).toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,"$&,")}},created:function(){this.menuId=this.$route.query.id,this.channelCode=this.$getSession("channelCode"),this.queryBtns(),this.goodsType(),this.accountList()},methods:{queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var i=t.data.length-1;i>=0;i--)"exportExle"==t.data[i].btnCode&&(e.exportExle=!0),"send"==t.data[i].btnCode&&(e.send=!0)})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var i=e[t.property];return void 0==i?"":Object(a.a)(new Date(i),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this;this.loading=!0;var t={pageNum:this.currentPage,pageSize:this.pageSize,accountId:this.formInline.accountId,timeNo:this.formInline.timeNo,status:this.formInline.status,isMail:this.formInline.isMail};this.$fetch("/wish/dbUserLog/queryBList",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total,e.loading=!1):(e.$message({type:"error",message:t.message,duration:3e3}),e.loading=!1)})},search:function(){this.selectTime&&this.selectTime[0]?this.formInline.startTime=new Date(this.selectTime[0]).getTime():this.formInline.startTime="",this.selectTime&&this.selectTime[1]?this.formInline.endTime=new Date(this.selectTime[1]).getTime():this.formInline.endTime="",this.currentPage=1,this.pageSize=10,this.accountList()},queryExport:function(){this.search(),this.fullscreenLoading=this.$loading({lock:!0,text:"正在导出...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.formInline.token=this.$getSession("token"),this.formInline.channel=this.$getSession("channelCode"),this.formInline.relation=this.$getSession("userRelation");this.doDownload(this.formInline,"/excl/dbUserLogExcl")},doDownload:function(e,t){var i=this,a=[],l=[];for(var s in e)null!=e[s]&&""!=e[s]&&(a.push(s),l.push(e[s]));for(var o=t,n=0;n<a.length;n++)o=o==t?o+"?"+a[n]+"="+l[n]:o+"&"+a[n]+"="+l[n];var r=document.createElement("a");r.setAttribute("href",o),document.querySelector("body").appendChild(r),r.click(),r.remove(),setTimeout(function(){i.fullscreenLoading.close()},9e3)},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()},goodsType:function(){var e=this;this.$fetch("/wish/goodsType/list").then(function(t){(t.statusCode+"").startsWith("2")&&(e.goodsList=t.data)})},clickImg:function(e){this.showImg=!0,this.imgSrc=e},viewImg:function(){this.showImg=!1},getInfo:function(e,t,i){this.id=e,this.form.isMail=t,this.form.remarks=i,this.dialogFormVisible=!0},update:function(){var e=this,t={id:this.id,isMail:this.form.isMail,remarks:this.form.remarks};this.$fetch("/wish/dbUserLog/sendGoods",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.$message({type:"success",message:"修改成功！"}),e.dialogFormVisible=!1,e.accountList()):e.$message({type:"danger",message:t.message})})}}},s={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"db-list-wrap"},[i("div",{staticClass:"db-list-inner"},[e._m(0),e._v(" "),i("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[i("el-form-item",{attrs:{label:"用户Id:"}},[i("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入用户Id",clearable:""},model:{value:e.formInline.accountId,callback:function(t){e.$set(e.formInline,"accountId",t)},expression:"formInline.accountId"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"期号:"}},[i("el-input",{attrs:{"auto-complete":"off",placeholder:"请输入期号",clearable:""},model:{value:e.formInline.timeNo,callback:function(t){e.$set(e.formInline,"timeNo",t)},expression:"formInline.timeNo"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"状态:"}},[i("el-select",{attrs:{placeholder:"请选择状态",clearable:""},model:{value:e.formInline.status,callback:function(t){e.$set(e.formInline,"status",t)},expression:"formInline.status"}},[i("el-option",{attrs:{label:"待揭晓",value:"1"}}),e._v(" "),i("el-option",{attrs:{label:"未抽中",value:"2"}}),e._v(" "),i("el-option",{attrs:{label:"幸运儿",value:"3"}}),e._v(" "),i("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"是否发货:"}},[i("el-select",{attrs:{placeholder:"请选择是否发货",clearable:""},model:{value:e.formInline.isMail,callback:function(t){e.$set(e.formInline,"isMail",t)},expression:"formInline.isMail"}},[i("el-option",{attrs:{label:"待发货",value:"1"}}),e._v(" "),i("el-option",{attrs:{label:"已发货",value:"2"}}),e._v(" "),i("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary",plain:""},on:{click:e.search}},[e._v("查询")])],1),e._v(" "),i("el-form-item",[e.exportExle?i("el-button",{attrs:{type:"success",plain:""},on:{click:e.queryExport}},[e._v("导出表格")]):e._e()],1)],1)],1),e._v(" "),i("div",{staticClass:"db-list-table"},[[i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.tableData,"max-height":"506"}},[i("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"80"}}),e._v(" "),i("el-table-column",{attrs:{"min-width":"150px",prop:"accountId",label:"夺宝人账户id"}}),e._v(" "),i("el-table-column",{attrs:{"min-width":"150px",prop:"mobile",label:"夺宝人电话号码"}}),e._v(" "),i("el-table-column",{attrs:{"min-width":"170px",prop:"timeNo",label:"期号"}}),e._v(" "),i("el-table-column",{attrs:{"min-width":"120px",prop:"joinNum",label:"参与次数"}}),e._v(" "),i("el-table-column",{attrs:{"min-width":"150px",prop:"xyExpend",label:"消耗心愿值\t"}}),e._v(" "),i("el-table-column",{attrs:{"min-width":"200px",prop:"goodsName",label:"商品名称\t"}}),e._v(" "),i("el-table-column",{attrs:{width:"150",prop:"typeName",label:"商品类型"}}),e._v(" "),i("el-table-column",{attrs:{"min-width":"100px",prop:"goodsPrice",label:"商品价格"}}),e._v(" "),i("el-table-column",{attrs:{"min-width":"170px",prop:"modifyTime",formatter:e.dateFormat,label:"最后一次参与夺宝时间"}}),e._v(" "),i("el-table-column",{attrs:{width:"100px",prop:"isMail",label:"是否发货"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.isMail?i("span",[e._v("待发货")]):e._e(),e._v(" "),2==t.row.isMail?i("span",[e._v("已发货")]):e._e(),e._v(" "),""==t.row.isMail?i("span",[e._v("不发货")]):e._e()]}}])}),e._v(" "),i("el-table-column",{attrs:{"min-width":"120px",prop:"receiver",label:"收件人"}}),e._v(" "),i("el-table-column",{attrs:{"min-width":"150px",prop:"receiverMobile",label:"收件人电话号码"}}),e._v(" "),i("el-table-column",{attrs:{"min-width":"200px",prop:"address",label:"详细地址"}}),e._v(" "),i("el-table-column",{attrs:{"min-width":"200px",prop:"remarks",label:"描述"}}),e._v(" "),i("el-table-column",{attrs:{width:"170px",prop:"mailTime",formatter:e.dateFormat,label:"发货时间"}}),e._v(" "),i("el-table-column",{attrs:{width:"100px",prop:"status",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.status?i("span",[e._v("待揭晓")]):e._e(),e._v(" "),2==t.row.status?i("span",[e._v("未抽中")]):e._e(),e._v(" "),3==t.row.status?i("span",[e._v("幸运儿")]):e._e()]}}])}),e._v(" "),e.send?i("el-table-column",{attrs:{fixed:"right",label:"操作",width:"75"},scopedSlots:e._u([{key:"default",fn:function(t){return[3==t.row.status&&1==t.row.isMail?i("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(i){e.getInfo(t.row.id,t.row.isMail,t.row.remarks)}}},[e._v("发货")]):e._e()]}}])}):e._e()],1)]],2),e._v(" "),i("el-dialog",{attrs:{title:"是否发货",visible:e.dialogFormVisible,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[i("el-form",{attrs:{model:e.form}},[i("el-row",[i("el-col",{attrs:{span:12}},[i("el-form-item",{attrs:{label:"是否发货",prop:"isMail","label-width":e.formLabelWidth}},[i("el-select",{attrs:{placeholder:""},model:{value:e.form.isMail,callback:function(t){e.$set(e.form,"isMail",t)},expression:"form.isMail"}},[i("el-option",{attrs:{label:"是",value:2}}),e._v(" "),i("el-option",{attrs:{label:"否",value:1}})],1)],1)],1),e._v(" "),i("el-col",{attrs:{span:22}},[i("el-form-item",{attrs:{label:"备注","label-width":e.formLabelWidth,prop:"remarks"}},[i("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.remarks,callback:function(t){e.$set(e.form,"remarks",t)},expression:"form.remarks"}})],1)],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.update}},[e._v("确 定")])],1)],1),e._v(" "),e.showImg?i("big-img",{attrs:{imgSrc:e.imgSrc},on:{clickit:e.viewImg}}):e._e(),e._v(" "),i("div",{staticClass:"block",staticStyle:{"margin-left":"10px"}},[i("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"db-list-header"},[t("h3",[this._v("心愿猪/用户夺宝记录")]),this._v(" "),t("hr")])}]};var o=i("VU/8")(l,s,!1,function(e){i("ZQlH")},null,null);t.default=o.exports}});