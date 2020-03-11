webpackJsonp([65],{IsNc:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("xT6B"),i=l("iPXC"),s={name:"NewsNotice",data:function(){return{powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{isMail:1,remarks:""},imageUrl:"",formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{userTypeStr:"1"},tableData:[],uploadData:{},selectTime:[],showImg:!1,isSubmit:!1,send:!1,typeSel:!0,exportExle:!1}},components:{"big-img":l("fM1o").a},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList(),this.uploadData={token:Object(i.d)("token")}},filters:{dateFont:function(e){return Object(a.a)(new Date(e),"yyyy-MM-dd hh:mm:sss")}},methods:{selectTap:function(e){},queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var l=t.data.length-1;l>=0;l--)"send"==t.data[l].btnCode&&(e.send=!0,e.powerTrue=!0,e.optionW="75"),"exportExle"==t.data[l].btnCode&&(e.exportExle=!0)})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var l=e[t.property];return void 0==l?"":Object(a.a)(new Date(l),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,accountId:this.formInline.accountId,issueNumber:this.formInline.issueNumber,state:this.formInline.state,isMail:this.formInline.isMail,userTypeStr:this.formInline.userTypeStr};this.$fetch("/wish//guesUserLog/page",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total):e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,"2"==this.formInline.userTypeStr?this.typeSel=!1:this.typeSel=!0,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0,this.imageUrl="",this.selectTime=[],this.isSubmit=!1},getInfo:function(e,t,l){this.id=e,this.form.isMail=t,this.form.remarks=l,this.dialogFormVisible=!0},update:function(){var e=this,t={id:this.id,isMail:this.form.isMail,remarks:this.form.remarks};this.$post("/wish/guesUserLog/isMail",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.$message({type:"success",message:"修改成功！"}),e.dialogFormVisible=!1,e.accountList()):e.$message({type:"danger",message:t.message})})},queryExport:function(){this.search(),this.fullscreenLoading=this.$loading({lock:!0,text:"正在导出...",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"}),this.formInline.token=Object(i.d)("token"),this.formInline.channel=Object(i.d)("channelCode"),this.formInline.relation=Object(i.d)("userRelation");this.doDownload(this.formInline,"/excl/guessLogExcl")},doDownload:function(e,t){var l=this,a=[],i=[];for(var s in e)null!=e[s]&&""!=e[s]&&(a.push(s),i.push(e[s]));for(var o=t,n=0;n<a.length;n++)o=o==t?o+"?"+a[n]+"="+i[n]:o+"&"+a[n]+"="+i[n];var r=document.createElement("a");r.setAttribute("href",o),document.querySelector("body").appendChild(r),r.click(),r.remove(),setTimeout(function(){l.fullscreenLoading.close()},9e3)},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()}}},o={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"news-notice-wrap"},[l("div",{staticClass:"news-notice-inner"},[e._m(0),e._v(" "),l("div",[l("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[l("el-form-item",{attrs:{label:"用户Id"}},[l("el-input",{attrs:{placeholder:"请输入用户Id",clearable:""},model:{value:e.formInline.accountId,callback:function(t){e.$set(e.formInline,"accountId",t)},expression:"formInline.accountId"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"期号"}},[l("el-input",{attrs:{placeholder:"请输入期号",clearable:""},model:{value:e.formInline.issueNumber,callback:function(t){e.$set(e.formInline,"issueNumber",t)},expression:"formInline.issueNumber"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"状态:"}},[l("el-select",{attrs:{placeholder:"请选择状态",clearable:""},model:{value:e.formInline.state,callback:function(t){e.$set(e.formInline,"state",t)},expression:"formInline.state"}},[l("el-option",{attrs:{label:"未猜中",value:"1"}}),e._v(" "),l("el-option",{attrs:{label:"已猜中",value:"2"}}),e._v(" "),l("el-option",{attrs:{label:"幸运儿",value:"3"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"是否发货:"}},[l("el-select",{attrs:{placeholder:"请选择是否发货",clearable:""},model:{value:e.formInline.isMail,callback:function(t){e.$set(e.formInline,"isMail",t)},expression:"formInline.isMail"}},[l("el-option",{attrs:{label:"待发货",value:"1"}}),e._v(" "),l("el-option",{attrs:{label:"已发货",value:"2"}})],1)],1),e._v(" "),l("el-form-item",{attrs:{label:"用户类型:"}},[l("el-select",{attrs:{placeholder:"请选择用户类型",clearable:""},model:{value:e.formInline.userTypeStr,callback:function(t){e.$set(e.formInline,"userTypeStr",t)},expression:"formInline.userTypeStr"}},[l("el-option",{attrs:{label:"真实用户",value:"1"}}),e._v(" "),l("el-option",{attrs:{label:"机器人",value:"2"}})],1)],1),e._v(" "),l("el-form-item",[l("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")])],1),e._v(" "),l("el-form-item",[e.exportExle?l("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.queryExport()}}},[e._v("导出表格")]):e._e()],1)],1)],1),e._v(" "),l("div",{staticClass:"news-notice-table"},[[l("el-table",{attrs:{data:e.tableData,"max-height":"556"}},[l("el-table-column",{attrs:{label:"序号",type:"index",fixed:"left",index:e.indexMethod,width:"80"}}),e._v(" "),l("el-table-column",{attrs:{fixed:"left",width:"170",prop:"issueNumber",label:"期号"}}),e._v(" "),l("el-table-column",{attrs:{fixed:"left",width:"150",prop:"accountId",label:"用户Id"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("div",{staticClass:"yichu"},[e._v(e._s(t.row.accountId))])]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"150",prop:"mobile",label:"注册手机号"}}),e._v(" "),l("el-table-column",{attrs:{"min-width":"270",prop:"goodsName",label:"商品名称"}}),e._v(" "),l("el-table-column",{attrs:{width:"150",prop:"typeName",label:"商品类型"}}),e._v(" "),l("el-table-column",{attrs:{"min-width":"170",prop:"price",label:"商品价格"}}),e._v(" "),l("el-table-column",{attrs:{width:"170",prop:"receiver",label:"收货人姓名"}}),e._v(" "),l("el-table-column",{attrs:{width:"150",prop:"contactMobile",label:"收货人电话"}}),e._v(" "),l("el-table-column",{attrs:{"min-width":"270",prop:"detailAddress",label:"收货地址"}}),e._v(" "),l("el-table-column",{attrs:{width:"120",prop:"guessNumber",label:"抽奖次数"}}),e._v(" "),l("el-table-column",{attrs:{width:"120",prop:"state",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.state?l("span",[e._v("未猜中")]):e._e(),e._v(" "),2==t.row.state?l("span",[e._v("已猜中")]):e._e(),e._v(" "),3==t.row.state?l("span",[e._v("幸运儿")]):e._e()]}}])}),e._v(" "),l("el-table-column",{attrs:{width:"120",prop:"isMail",label:"是否发货"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.isMail&&3==t.row.state?l("span",[e._v("待发货")]):e._e(),e._v(" "),2==t.row.isMail&&3==t.row.state?l("span",[e._v("已发货")]):e._e(),e._v(" "),1==t.row.isMail&&3!=t.row.state?l("span",[e._v("不发货")]):e._e()]}}])}),e._v(" "),l("el-table-column",{attrs:{"min-width":"170",prop:"remarks",label:"备注"}}),e._v(" "),l("el-table-column",{attrs:{width:"170",prop:"guessTime",label:"中奖时间"}}),e._v(" "),l("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[e.send&&3==t.row.state&&e.typeSel?l("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(l){e.getInfo(t.row.id,t.row.isMail,t.row.remarks)}}},[e._v("发货")]):e._e()]}}])})],1)],e._v(" "),e.showImg?l("big-img",{attrs:{imgSrc:e.imgSrc},on:{clickit:e.viewImg}}):e._e(),e._v(" "),l("el-dialog",{attrs:{title:"是否发货",visible:e.dialogFormVisible,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[l("el-form",{attrs:{model:e.form}},[l("el-row",[l("el-col",{attrs:{span:12}},[l("el-form-item",{attrs:{label:"是否发货",prop:"isMail","label-width":e.formLabelWidth}},[l("el-select",{attrs:{placeholder:""},model:{value:e.form.isMail,callback:function(t){e.$set(e.form,"isMail",t)},expression:"form.isMail"}},[l("el-option",{attrs:{label:"是",value:2}}),e._v(" "),l("el-option",{attrs:{label:"否",value:1}})],1)],1)],1),e._v(" "),l("el-col",{attrs:{span:22}},[l("el-form-item",{attrs:{label:"备注","label-width":e.formLabelWidth,prop:"remarks"}},[l("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.remarks,callback:function(t){e.$set(e.form,"remarks",t)},expression:"form.remarks"}})],1)],1)],1)],1),e._v(" "),l("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[l("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),l("el-button",{attrs:{type:"primary"},on:{click:e.update}},[e._v("确 定")])],1)],1)],2),e._v(" "),l("div",{staticClass:"block"},[l("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"news-notice-header"},[t("h3",[this._v("心愿猪/抽奖记录")]),this._v(" "),t("hr")])}]};var n=l("VU/8")(s,o,!1,function(e){l("K9v4")},null,null);t.default=n.exports},K9v4:function(e,t){}});