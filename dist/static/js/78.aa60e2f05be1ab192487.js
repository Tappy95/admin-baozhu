webpackJsonp([78],{"8g7y":function(e,t){},IsNc:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a("xT6B"),l=a("iPXC"),s={name:"NewsNotice",data:function(){return{powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,dialogTableVisible:!1,formtwo:{},dialogFormVisible:!1,dialogTableDetail:!1,formtwoInfo:{},form:{isMail:1,remarks:""},imageUrl:"",formLabelWidth:"120px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],uploadData:{},selectTime:[],showImg:!1,isSubmit:!1,send:!1}},components:{"big-img":a("fM1o").a},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList(),this.uploadData={token:Object(l.d)("token")}},filters:{dateFont:function(e){return Object(i.a)(new Date(e),"yyyy-MM-dd hh:mm:sss")}},methods:{selectTap:function(e){},queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var a=t.data.length-1;a>=0;a--)"add"==t.data[a].btnCode&&(e.add=!0),"upd"==t.data[a].btnCode&&(e.upd=!0,e.powerTrue=!0,e.optionW="160px"),"del"==t.data[a].btnCode&&(e.del=!0,e.powerTrue=!0,e.optionW="160px"),"send"==t.data[a].btnCode&&(e.send=!0,e.powerTrue=!0,e.optionW="160px"),e.upd&&e.del&&(e.powerTrue=!0,e.optionW="220px")})},indexMethod:function(e){return 1*e+1},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(i.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,accountId:this.formInline.accountId,issueNumber:this.formInline.issueNumber,state:this.formInline.state,isMail:this.formInline.isMail};this.$fetch("/wish//guesUserLog/page",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.tableData=t.data.list,e.totalCount=t.data.total):e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0,this.imageUrl="",this.selectTime=[],this.isSubmit=!1},getInfo:function(e,t,a){this.id=e,this.form.isMail=t,this.form.remarks=a,this.dialogFormVisible=!0},update:function(){var e=this,t={id:this.id,isMail:this.form.isMail,remarks:this.form.remarks};this.$post("/wish/guesUserLog/isMail",t).then(function(t){(t.statusCode+"").startsWith("2")?(e.$message({type:"success",message:"修改成功！"}),e.dialogFormVisible=!1,e.accountList()):e.$message({type:"danger",message:t.message})})},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"news-notice-wrap"},[a("div",{staticClass:"news-notice-inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"用户id"}},[a("el-input",{attrs:{placeholder:"请输入用户id",clearable:""},model:{value:e.formInline.accountId,callback:function(t){e.$set(e.formInline,"accountId",t)},expression:"formInline.accountId"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"期号"}},[a("el-input",{attrs:{placeholder:"请输入期号",clearable:""},model:{value:e.formInline.issueNumber,callback:function(t){e.$set(e.formInline,"issueNumber",t)},expression:"formInline.issueNumber"}})],1),e._v(" "),a("el-form-item",{attrs:{"label-width":e.labelWidth,label:"状态:"}},[a("el-select",{attrs:{placeholder:"请选择状态",clearable:""},model:{value:e.formInline.state,callback:function(t){e.$set(e.formInline,"state",t)},expression:"formInline.state"}},[a("el-option",{attrs:{label:"未猜中",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"已猜中",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"幸运儿",value:"3"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{"label-width":e.labelWidth,label:"是否发货:"}},[a("el-select",{attrs:{placeholder:"请选择是否发货",clearable:""},model:{value:e.formInline.isMail,callback:function(t){e.$set(e.formInline,"isMail",t)},expression:"formInline.isMail"}},[a("el-option",{attrs:{label:"待发货",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"已发货",value:"2"}})],1)],1),e._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")])],1)],1),e._v(" "),a("div",{staticClass:"news-notice-table"},[[a("el-table",{attrs:{data:e.tableData,"max-height":"556"}},[a("el-table-column",{attrs:{label:"序号",type:"index",fixed:"left",index:e.indexMethod,width:"80"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"left",width:"170",prop:"issueNumber",label:"期号"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"yichu"},[e._v(e._s(t.row.issueNumber))])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"left",width:"170",prop:"accountId",label:"用户id"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("div",{staticClass:"yichu"},[e._v(e._s(t.row.accountId))])]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"mobile",label:"注册手机号"}}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"receiver",label:"收货人姓名"}}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"contactMobile",label:"收货人电话"}}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"detailAddress",label:"收货地址"}}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"guessNumber",label:"抽奖次数"}}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"state",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.state?a("span",[e._v("未猜中")]):e._e(),e._v(" "),2==t.row.state?a("span",[e._v("已猜中")]):e._e(),e._v(" "),3==t.row.state?a("span",[e._v("幸运儿")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"150",prop:"isMail",label:"是否发货"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.isMail?a("span",[e._v("待发货")]):e._e(),e._v(" "),2==t.row.isMail?a("span",[e._v("已发货")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{width:"170",prop:"remarks",label:"备注"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[e.send&&3==t.row.state?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){e.getInfo(t.row.id,t.row.isMail,t.row.remarks)}}},[e._v("发货")]):e._e()]}}])})],1)],e._v(" "),e.showImg?a("big-img",{attrs:{imgSrc:e.imgSrc},on:{clickit:e.viewImg}}):e._e(),e._v(" "),a("el-dialog",{attrs:{title:"是否发货",visible:e.dialogFormVisible,width:"800px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{model:e.form}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"是否发货",prop:"isMail","label-width":e.formLabelWidth}},[a("el-select",{attrs:{placeholder:""},model:{value:e.form.isMail,callback:function(t){e.$set(e.form,"isMail",t)},expression:"form.isMail"}},[a("el-option",{attrs:{label:"是",value:2}}),e._v(" "),a("el-option",{attrs:{label:"否",value:1}})],1)],1)],1),e._v(" "),a("el-col",{attrs:{span:22}},[a("el-form-item",{attrs:{label:"备注","label-width":e.formLabelWidth,prop:"remarks"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.remarks,callback:function(t){e.$set(e.form,"remarks",t)},expression:"form.remarks"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:e.update}},[e._v("确 定")])],1)],1)],2),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"news-notice-header"},[t("h3",[this._v("心愿猪/抽奖记录")]),this._v(" "),t("hr")])}]};var n=a("VU/8")(s,o,!1,function(e){a("8g7y")},null,null);t.default=n.exports}});