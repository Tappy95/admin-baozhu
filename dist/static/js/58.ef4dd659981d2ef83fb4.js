webpackJsonp([58],{PSEw:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a("xT6B"),s={name:"FightingQuestion",data:function(){return{styleObject:{width:"200px"},powerTrue:!1,optionW:"75px",menuId:"",add:!1,del:!1,upd:!1,exa:!1,dialogTableVisibleUpdate:!1,dialogTableVisibleInfo:!1,formtwoanswer:[],formtwoInfo:{},formtwoUpdateInfo:{},formtwoUpdateanswer:[],isRejectReason:!1,isUpdateRejectReason:!1,dialogTableVisible:!1,formtwo:{question:{},rejectReason:""},answerType:[],dialogFormVisible:!1,reasonMess:!1,getCoin:!1,form:{},rules:{questionType:[{required:!0,message:"请输入问题类型",trigger:"blur"}],question:[{required:!0,message:"请输入题目",trigger:"blur"}],creator:[{required:!0,message:"请输入出题者",trigger:"blur"}],score:[{required:!0,message:"请输入题目总分",trigger:"blur"},{type:"number",message:"请输入仅数字格式",trigger:"blur",transform:function(e){return Number(e)}}],questionState:[{required:!0,message:"请输入问题状态",trigger:"change"}],rejectReason:[{required:!0,message:"请输入拒绝原因",trigger:"blur"}],countTime:[{required:!0,message:"请输入答题时间",trigger:"blur"},{type:"number",message:"请输入仅数字格式",trigger:"blur",transform:function(e){return Number(e)}}],coin:[{required:!0,message:"请输入出题者的金币数",trigger:"blur"}],answers:[{required:!0,message:"请输入答案",trigger:"blur"}],answer1:[{required:!0,message:"请输入答案",trigger:"blur"}],answer2:[{required:!0,message:"请输入答案",trigger:"blur"}],answer3:[{required:!0,message:"请输入答案",trigger:"blur"}],answer4:[{required:!0,message:"请输入答案",trigger:"blur"}],questionTypeName:[{required:!0,message:"请输入题目类型名称",trigger:"blur"}],mobile:[{required:!0,message:"请输入手机号",trigger:"blur"},{min:11,max:11,message:"请输入11位手机号",trigger:"blur"}]},formLabelWidth:"140px",currentPage:1,pageSize:10,totalCount:0,formInline:{},tableData:[],audit:"",isSubmit:!1}},created:function(){this.menuId=this.$route.query.id,this.queryBtns(),this.accountList()},methods:{queryBtns:function(){var e=this,t={menuId:this.menuId};this.$fetch("/api/pMenuBtn/queryBtns",t).then(function(t){if((t.statusCode+"").startsWith("2"))for(var a=t.data.length-1;a>=0;a--)"add"==t.data[a].btnCode&&(e.add=!0),"exa"==t.data[a].btnCode&&(e.exa=!0,e.powerTrue=!0,e.optionW="150px"),"upd"==t.data[a].btnCode&&(e.upd=!0,e.powerTrue=!0,e.optionW="150px"),"del"==t.data[a].btnCode&&(e.del=!0,e.powerTrue=!0,e.optionW="150px"),(e.upd&&e.del||e.upd&&e.exa||e.upd&&e.exa)&&(e.powerTrue=!0,e.optionW="230px"),e.upd&&e.del&&e.exa&&(e.powerTrue=!0)})},indexMethod:function(e){return 1*e+1},questionType:function(){var e=this;this.$fetch("/api/mFightingQuestion/typeList").then(function(t){(t.statusCode+"").startsWith("2")?e.answerType=t.data:e.$message({type:"error",message:t.message,duration:3e3})})},dateFormat:function(e,t){var a=e[t.property];return void 0==a?"":Object(o.a)(new Date(a),"yyyy-MM-dd hh:mm:sss")},accountList:function(){var e=this,t={pageNum:this.currentPage,pageSize:this.pageSize,question:this.formInline.question,questionState:this.formInline.questionState};this.$fetch("/api/mFightingQuestion/list",t).then(function(t){if((t.statusCode+"").startsWith("2")){for(var a=t.data.list.length-1;a>=0;a--)0==t.data.list[a].questionState?t.data.list[a].questionState="正常":1==t.data.list[a].questionState?t.data.list[a].questionState="提交":2==t.data.list[a].questionState?t.data.list[a].questionState="通过":t.data.list[a].questionState="拒绝";e.tableData=t.data.list,e.totalCount=t.data.total}else e.$message({type:"error",message:t.message,duration:3e3})})},search:function(){this.currentPage=1,this.pageSize=10,this.accountList()},load:function(){this.form={},this.formInline={},this.dialogFormVisible=!0,this.questionType(),this.isSubmit=!1},addBtn:function(e){var t=this,a='[{"answer":"'+this.form.answer1+'","isCorrect":1},{"answer":"'+this.form.answer2+'","isCorrect":2},{"answer":"'+this.form.answer3+'","isCorrect":2},{"answer":"'+this.form.answer4+'","isCorrect":2}]';this.form.answers=a,this.$refs[e].validate(function(e){e&&(t.$nextTick(function(){this.isSubmit=!0}),t.$post("/api/mFightingQuestion/add",t.form).then(function(e){(e.statusCode+"").startsWith("2")?(t.dialogFormVisible=!1,t.$message({type:"success",message:"添加成功！"}),t.accountList()):(t.$message({type:"error",message:e.message}),t.isSubmit=!1)}))})},Delete:function(e){var t=this;this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning",center:!0}).then(function(){t.delData(e)}).catch(function(){t.$message({type:"info",message:"已取消删除"})})},delData:function(e){var t=this,a={qId:e};this.$fetch("/api/mFightingQuestion/delete",a).then(function(e){(e.statusCode+"").startsWith("2")?(t.$message({type:"success",message:"删除成功！"}),t.accountList()):t.$message({type:"error",message:"删除失败！"})})},getInfo:function(e){var t=this;this.reasonMess=!1,this.getCoin=!1,this.dialogTableVisible=!0,this.audit=e,this.$fetch("/api/mFightingQuestion/info",{qId:e}).then(function(e){null!=e.data&&("2"==e.data.staffType?t.isShow=!1:t.isShow=!0,t.formtwo=e.data)})},isAuditingChange:function(e){3==e?(this.getCoin=!1,this.reasonMess=!0):this.reasonMess=!1,2==e?(this.reasonMess=!1,this.getCoin=!0):this.getCoin=!1},update:function(e){var t=this,a={qId:this.audit,questionState:this.formtwo.question.questionState,coin:this.formtwo.coin,rejectReason:this.formtwo.rejectReason,creator:this.formtwo.question.creator};this.$put("/api/mFightingQuestion/audit",a).then(function(e){(e.statusCode+"").startsWith("2")&&(t.$message({type:"success",message:"提交成功！"}),t.dialogTableVisible=!1,t.accountList())})},getOne:function(e){var t=this;this.isRejectReason=!1,this.dialogTableVisibleInfo=!0,this.$fetch("/api/mFightingQuestion/info",{qId:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(e.data.question.createTime=Object(o.a)(new Date(e.data.question.createTime),"yyyy-MM-dd hh:mm:sss"),t.formtwoInfo=e.data.question,t.formtwoanswer=e.data.answer,3==e.data.question.questionState&&(t.isRejectReason=!0))})},updateInfo:function(e){var t=this;this.dialogTableVisibleUpdate=!0,this.$fetch("/api/mFightingQuestion/info",{qId:e}).then(function(e){(e.statusCode+"").startsWith("2")&&(t.formtwoUpdateInfo=e.data.question,t.formtwoUpdateanswer=e.data.answer,t.isUpdateRejectReason=!1,3==e.data.question.questionState&&(t.isUpdateRejectReason=!0),t.questionType())})},updateCilc:function(e){for(var t=this,a="[",o=0;o<this.formtwoUpdateanswer.length;o++)a=o<this.formtwoUpdateanswer.length-1?a+'{"answer":"'+this.formtwoUpdateanswer[o].answer+'","ansId":'+this.formtwoUpdateanswer[o].ansId+"},":a+'{"answer":"'+this.formtwoUpdateanswer[o].answer+'","ansId":'+this.formtwoUpdateanswer[o].ansId+"}";a+="]";var s={qId:this.formtwoUpdateInfo.qId,questionType:this.formtwoUpdateInfo.questionType,question:this.formtwoUpdateInfo.question,rejectReason:this.formtwoUpdateInfo.rejectReason,score:this.formtwoUpdateInfo.score,countTime:this.formtwoUpdateInfo.countTime,answers:a};this.$put("/api/mFightingQuestion/update",s).then(function(e){(e.statusCode+"").startsWith("2")&&(t.$message({type:"success",message:"提交成功！"}),t.dialogTableVisibleUpdate=!1,t.accountList())})},handleSizeChange:function(e){this.pageSize=e,this.accountList()},handleCurrentChange:function(e){this.currentPage=e,this.accountList()}}},i={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"fighting-question-wrap"},[a("div",{staticClass:"fighting-question-inner"},[e._m(0),e._v(" "),a("div",[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.formInline}},[a("el-form-item",{attrs:{label:"题目名称"}},[a("el-input",{attrs:{placeholder:"请输入题目名称",clearable:""},model:{value:e.formInline.question,callback:function(t){e.$set(e.formInline,"question",t)},expression:"formInline.question"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{placeholder:"请选择状态"},model:{value:e.formInline.questionState,callback:function(t){e.$set(e.formInline,"questionState",t)},expression:"formInline.questionState"}},[a("el-option",{attrs:{label:"正常",value:"-1"}}),e._v(" "),a("el-option",{attrs:{label:"提交",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"通过",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"拒绝",value:"3"}}),e._v(" "),a("el-option",{attrs:{label:"全部",value:""}})],1)],1),e._v(" "),a("el-button",{attrs:{type:"primary",plain:""},on:{click:function(t){e.search()}}},[e._v("查询")]),e._v(" "),e.add?a("el-button",{attrs:{type:"success",plain:""},on:{click:function(t){e.load()}}},[e._v("添加")]):e._e()],1)],1),e._v(" "),a("div",{staticClass:"fighting-question-table"},[[a("el-table",{attrs:{data:e.tableData,height:"556"}},[a("el-table-column",{attrs:{fixed:"left",label:"序号",type:"index",index:e.indexMethod,width:"80"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"left",prop:"questionTypeName","min-width":"200px",label:"问题类型"}}),e._v(" "),a("el-table-column",{attrs:{prop:"question","min-width":"250px",label:"题目"}}),e._v(" "),a("el-table-column",{attrs:{prop:"createTime","min-width":"170px",formatter:e.dateFormat,label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"score","min-width":"150px",label:"题目总分"}}),e._v(" "),a("el-table-column",{attrs:{prop:"questionState","min-width":"100px",label:"问题状态"}}),e._v(" "),a("el-table-column",{attrs:{prop:"countTime","min-width":"180px",label:"答题时间(秒)"}}),e._v(" "),a("el-table-column",{attrs:{prop:"coin","min-width":"150px",label:"出题者的金币数"}}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:e.optionW},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"info",plain:"",size:"mini"},on:{click:function(a){e.getOne(t.row.qId)}}},[e._v("详情")]),e._v(" "),e.del?a("el-button",{attrs:{type:"warning",plain:"",size:"mini"},on:{click:function(a){e.Delete(t.row.qId)}}},[e._v("删除")]):e._e(),e._v(" "),e.upd?a("el-button",{attrs:{type:"success",plain:"",size:"mini"},on:{click:function(a){e.updateInfo(t.row.qId)}}},[e._v("修改")]):e._e(),e._v(" "),"提交"==t.row.questionState&&e.exa?a("el-button",{attrs:{type:"primary",plain:"",size:"mini"},on:{click:function(a){e.getInfo(t.row.qId)}}},[(e.optionW="300px")?a("span"):e._e(),e._v("审核")]):e._e()]}}])})],1)],e._v(" "),a("el-dialog",{attrs:{title:"添加题目",visible:e.dialogFormVisible,width:"700px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"问题类型","label-width":e.formLabelWidth,prop:"questionType"}},[a("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.form.questionType,callback:function(t){e.$set(e.form,"questionType",t)},expression:"form.questionType"}},e._l(e.answerType,function(e,t){return a("el-option",{key:t,attrs:{label:e.dicValue,value:e.id}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"题目总分",prop:"score","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.score,callback:function(t){e.$set(e.form,"score",t)},expression:"form.score"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"答题时间(秒)",prop:"countTime","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.countTime,callback:function(t){e.$set(e.form,"countTime",t)},expression:"form.countTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"题目","label-width":e.formLabelWidth,prop:"question"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.form.question,callback:function(t){e.$set(e.form,"question",t)},expression:"form.question"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"正确答案",prop:"answer1","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},"auto-complete":"off",clearable:""},model:{value:e.form.answer1,callback:function(t){e.$set(e.form,"answer1",t)},expression:"form.answer1"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"错误答案",prop:"answer2","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},"auto-complete":"off",clearable:""},model:{value:e.form.answer2,callback:function(t){e.$set(e.form,"answer2",t)},expression:"form.answer2"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"错误答案",prop:"answer3","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},"auto-complete":"off",clearable:""},model:{value:e.form.answer3,callback:function(t){e.$set(e.form,"answer3",t)},expression:"form.answer3"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"错误答案",prop:"answer4","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},"auto-complete":"off",clearable:""},model:{value:e.form.answer4,callback:function(t){e.$set(e.form,"answer4",t)},expression:"form.answer4"}})],1)],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary",disabled:e.isSubmit},on:{click:function(t){e.addBtn("form")}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"题目审核",visible:e.dialogTableVisible,width:"700px"},on:{"update:visible":function(t){e.dialogTableVisible=t}}},[a("el-form",{attrs:{model:e.formtwo}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"出题人:","label-width":e.formLabelWidth,prop:"question"}},[a("el-input",{style:e.styleObject,attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwo.question.creatorName,callback:function(t){e.$set(e.formtwo.question,"creatorName",t)},expression:"formtwo.question.creatorName"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"题目:","label-width":e.formLabelWidth,prop:"question"}},[a("el-input",{attrs:{disabled:!0,"auto-complete":"off",clearable:""},model:{value:e.formtwo.question.question,callback:function(t){e.$set(e.formtwo.question,"question",t)},expression:"formtwo.question.question"}})],1)],1),e._v(" "),e._l(e.formtwo.answer,function(t,o){return a("div",{key:o},[1==t.isCorrect?a("el-form-item",{attrs:{label:"正确答案:",prop:"answers","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",disabled:!0,autosize:{minRows:2,maxRows:4},"auto-complete":"off",clearable:""},model:{value:t.answer,callback:function(a){e.$set(t,"answer",a)},expression:"item.answer"}})],1):e._e(),e._v(" "),1!=t.isCorrect?a("el-form-item",{attrs:{label:"错误答案:",prop:"answer","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",disabled:!0,autosize:{minRows:2,maxRows:4},"auto-complete":"off",clearable:""},model:{value:t.answer,callback:function(a){e.$set(t,"answer",a)},expression:"item.answer"}})],1):e._e()],1)}),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"审核:","label-width":e.formLabelWidth,prop:"questionState"}},[a("el-select",{style:e.styleObject,attrs:{placeholder:""},on:{change:function(t){e.isAuditingChange(e.formtwo.question.questionState)}},model:{value:e.formtwo.question.questionState,callback:function(t){e.$set(e.formtwo.question,"questionState",t)},expression:"formtwo.question.questionState"}},[a("el-option",{attrs:{label:"提交",value:1}}),e._v(" "),a("el-option",{attrs:{label:"拒绝",value:3}}),e._v(" "),a("el-option",{attrs:{label:"通过",value:2}})],1)],1)],1),e._v(" "),e.getCoin?a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"获得金币数","label-width":e.formLabelWidth,prop:"coin"}},[a("el-input",{style:e.styleObject,attrs:{min:"0",type:"number","auto-complete":"off",clearable:""},model:{value:e.formtwo.coin,callback:function(t){e.$set(e.formtwo,"coin",t)},expression:"formtwo.coin"}})],1)],1):e._e(),e._v(" "),e.reasonMess?a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"拒绝原因:",prop:"rejectReason","label-width":e.formLabelWidth}},[a("el-input",{attrs:{rows:4,type:"textarea","auto-complete":"off",clearable:""},model:{value:e.formtwo.rejectReason,callback:function(t){e.$set(e.formtwo,"rejectReason",t)},expression:"formtwo.rejectReason"}})],1)],1):e._e()],2)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableVisible=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.update(e.formtwo)}}},[e._v("确 定")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"题目详情",visible:e.dialogTableVisibleInfo,width:"700px"},on:{"update:visible":function(t){e.dialogTableVisibleInfo=t}}},[a("el-form",[a("el-row",[a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:12}},[a("el-form-item",{attrs:{label:"问题类型:","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{value:e.formtwoInfo.questionTypeName,disabled:!0,"auto-complete":"off",clearable:""}})],1)],1),e._v(" "),a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:12}},[a("el-form-item",{attrs:{label:"创建时间:","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{value:e.formtwoInfo.createTime,disabled:!0,"auto-complete":"off",clearable:""}})],1)],1),e._v(" "),a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:12}},[a("el-form-item",{attrs:{label:"题目总分:","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{value:e.formtwoInfo.score,disabled:!0,"auto-complete":"off",clearable:""}})],1)],1),e._v(" "),a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:12}},[a("el-form-item",{attrs:{label:"出题者:","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{value:e.formtwoInfo.creatorName,disabled:!0,"auto-complete":"off",clearable:""}})],1)],1),e._v(" "),a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:12}},[a("el-form-item",{attrs:{label:"出题者获得金币数:","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{value:e.formtwoInfo.coin,disabled:!0,"auto-complete":"off",clearable:""}})],1)],1),e._v(" "),a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:12}},[a("el-form-item",{attrs:{label:"状态:","label-width":e.formLabelWidth}},[a("el-select",{style:e.styleObject,attrs:{disabled:!0,placeholder:""},model:{value:e.formtwoInfo.questionState,callback:function(t){e.$set(e.formtwoInfo,"questionState",t)},expression:"formtwoInfo.questionState"}},[a("el-option",{attrs:{label:"正常",value:0}}),e._v(" "),a("el-option",{attrs:{label:"提交",value:1}}),e._v(" "),a("el-option",{attrs:{label:"通过",value:2}}),e._v(" "),a("el-option",{attrs:{label:"拒绝",value:3}})],1)],1)],1),e._v(" "),a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:12}},[e.isRejectReason?a("el-form-item",{attrs:{label:"拒绝原因:","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{autosize:{minRows:2,maxRows:4},value:e.formtwoInfo.rejectReason,disabled:!0,"auto-complete":"off",clearable:""}})],1):e._e()],1),e._v(" "),a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:24}},[a("el-form-item",{attrs:{label:"题目:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},value:e.formtwoInfo.question,disabled:!0,"auto-complete":"off",clearable:""}})],1)],1),e._v(" "),e._l(e.formtwoanswer,function(t,o){return a("div",{key:o},[a("el-col",{staticStyle:{"margin-bottom":"10px"},attrs:{span:24}},[1==t.isCorrect?a("el-form-item",{attrs:{label:"正确答案:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},value:t.answer,disabled:!0,"auto-complete":"off",clearable:""}})],1):e._e(),e._v(" "),1!=t.isCorrect?a("el-form-item",{attrs:{label:"错误答案:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",value:t.answer,disabled:!0,autosize:{minRows:2,maxRows:4},"auto-complete":"off",clearable:""}})],1):e._e()],1)],1)})],2)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableVisibleInfo=!1}}},[e._v("取 消")])],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"修改题目",visible:e.dialogTableVisibleUpdate,width:"700px"},on:{"update:visible":function(t){e.dialogTableVisibleUpdate=t}}},[a("el-form",{ref:"form",attrs:{model:e.formtwoUpdateInfo,rules:e.rules}},[a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"问题类型:","label-width":e.formLabelWidth,prop:"questionType"}},[a("el-select",{style:e.styleObject,attrs:{placeholder:""},model:{value:e.formtwoUpdateInfo.questionType,callback:function(t){e.$set(e.formtwoUpdateInfo,"questionType",t)},expression:"formtwoUpdateInfo.questionType"}},e._l(e.answerType,function(e,t){return a("el-option",{key:t,attrs:{label:e.dicValue,value:e.id}})}))],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"题目总分:","label-width":e.formLabelWidth,prop:"score"}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwoUpdateInfo.score,callback:function(t){e.$set(e.formtwoUpdateInfo,"score",t)},expression:"formtwoUpdateInfo.score"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{style:e.styleObject,attrs:{label:"答题时间(秒):",prop:"countTime","label-width":e.formLabelWidth}},[a("el-input",{style:e.styleObject,attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwoUpdateInfo.countTime,callback:function(t){e.$set(e.formtwoUpdateInfo,"countTime",t)},expression:"formtwoUpdateInfo.countTime"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"题目:","label-width":e.formLabelWidth,prop:"question"}},[a("el-input",{attrs:{"auto-complete":"off",clearable:""},model:{value:e.formtwoUpdateInfo.question,callback:function(t){e.$set(e.formtwoUpdateInfo,"question",t)},expression:"formtwoUpdateInfo.question"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:24}},e._l(e.formtwoUpdateanswer,function(t,o){return a("div",{key:o},[1==t.isCorrect?a("el-form-item",{attrs:{label:"正确答案:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},"auto-complete":"off",clearable:""},model:{value:t.answer,callback:function(a){e.$set(t,"answer",a)},expression:"item.answer"}})],1):e._e(),e._v(" "),1!=t.isCorrect?a("el-form-item",{attrs:{label:"错误答案:","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},"auto-complete":"off",clearable:""},model:{value:t.answer,callback:function(a){e.$set(t,"answer",a)},expression:"item.answer"}})],1):e._e()],1)})),e._v(" "),a("el-col",{attrs:{span:24}},[e.isUpdateRejectReason?a("el-form-item",{attrs:{label:"拒绝原因:","label-width":e.formLabelWidth,prop:"rejectReason"}},[a("el-input",{attrs:{autosize:{minRows:2,maxRows:4},value:e.formtwoUpdateInfo.rejectReason,"auto-complete":"off",clearable:""}})],1):e._e()],1)],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogTableVisibleUpdate=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.updateCilc(e.formtwoUpdateInfo)}}},[e._v("确 定")])],1)],1)],2),e._v(" "),a("div",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-sizes":[10,20,50,70],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.totalCount},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)])])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"fighting-question-header"},[t("h3",[this._v("答题对战/题目管理")]),this._v(" "),t("hr")])}]};var l=a("VU/8")(s,i,!1,function(e){a("b0C0")},null,null);t.default=l.exports},b0C0:function(e,t){}});