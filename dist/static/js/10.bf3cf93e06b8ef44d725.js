webpackJsonp([10],{gv6y:function(e,r,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=t("3cXf"),l=t.n(o),s={name:"",props:{},data:function(){return{ruleForm:{professionKind:"",checkbox:[],genre:1,textbook:"",keyword:"",state:"1",topic:"",textboxList:[{id:"1",label:"A",value:""},{id:"2",label:"B",value:""},{id:"3",label:"C",value:""},{id:"4",label:"D",value:""}],radio:"",together:!0,textbos:[],gapFillingStem:"",gapFillingAnswer:"",stems:"",sqaAnswer:"",answerkeywords:""},rules:{professionKind:[{required:!0,message:"职业工种不能为空",trigger:"blur"}],checkbox:[{required:!0,message:"等级不能为空",trigger:"blur"}],genre:[{required:!0,message:"试题类型不能为空",trigger:"blur"}],textbook:[{required:!0,message:"关联教材不能为空",trigger:"blur"}],keyword:[{required:!0,message:"试题关键字不能为空",trigger:"blur"}],state:[{required:!0,message:"试题状态不能为空",trigger:"blur"}],topic:[{required:!0,message:"题干不能为空",trigger:"blur"}],textbox:[{required:!0,message:"选项不能为空",trigger:"blur"}],radio:[{required:!0,message:"正确答案不能为空",trigger:"blur"}],textbos:[{validator:function(e,r,t){0==r.length?t(new Error("正确答案不能为空")):t()},trigger:"blur"}],stems:[{required:!0,message:"题干不能为空",trigger:"blur"}],sqaAnswer:[{required:!0,message:"正确答案不能为空",trigger:"blur"}],answerkeywords:[{required:!0,message:"正确答案关键字不能为空",trigger:"blur"}],gapFillingStem:[{required:!0,message:"题干不能为空",trigger:"blur"}],gapFillingAnswer:[{required:!0,message:"答案不能为空",trigger:"blur"}]},options:[],genreList:[{id:1,label:"单选题",value:1},{id:2,label:"多选题",value:2},{id:3,label:"填空题",value:3},{id:4,label:"简答题",value:4}],textbookList:[],flag:!0,form:{id:"",jobId:"",level:"",topicType:"",teachingId:"",keyword:"",status:"1",stem:"",options:"",answer:"",isSynchro:"",keywordAnswer:"",practiceId:""},num:"",answera:""}},components:{},methods:{submitForm:function(e){var r=this;this.$refs[e].validate(function(e){if(!e)return r.$message.error("表单填写错误"),!1;1==r.ruleForm.genre?(r.num="",r.ruleForm.together?r.num=1:r.num=0,r.form.jobId=r.ruleForm.professionKind,r.form.level=r.ruleForm.checkbox.sort().toString(),r.form.topicType=r.ruleForm.genre,r.form.teachingId=r.ruleForm.textbook,r.form.keyword=r.ruleForm.keyword,r.form.status=r.ruleForm.state,r.form.stem=r.ruleForm.topic,r.form.options=l()(r.ruleForm.textboxList),r.form.answer=r.ruleForm.radio,r.form.isSynchro=r.num,r.question()):2==r.ruleForm.genre?(r.num="",r.ruleForm.together?r.num=1:r.num=0,r.form.jobId=r.ruleForm.professionKind,r.form.level=r.ruleForm.checkbox.sort().toString(),r.form.topicType=r.ruleForm.genre,r.form.teachingId=r.ruleForm.textbook,r.form.keyword=r.ruleForm.keyword,r.form.status=r.ruleForm.state,r.form.stem=r.ruleForm.topic,r.form.options=l()(r.ruleForm.textboxList),r.form.answer=l()(r.ruleForm.textbos),r.form.isSynchro=r.num,r.question()):3==r.ruleForm.genre?(r.num="",r.ruleForm.together?r.num=1:r.num=0,r.form.jobId=r.ruleForm.professionKind,r.form.level=r.ruleForm.checkbox.sort().toString(),r.form.topicType=r.ruleForm.genre,r.form.teachingId=r.ruleForm.textbook,r.form.keyword=r.ruleForm.keyword,r.form.status=r.ruleForm.state,r.form.stem=r.ruleForm.gapFillingStem,r.form.options="",r.form.answer=r.ruleForm.gapFillingAnswer,r.form.isSynchro=r.num,r.question()):4==r.ruleForm.genre&&(r.num="",r.ruleForm.together?r.num=1:r.num=0,r.form.jobId=r.ruleForm.professionKind,r.form.level=r.ruleForm.checkbox.sort().toString(),r.form.topicType=r.ruleForm.genre,r.form.teachingId=r.ruleForm.textbook,r.form.keyword=r.ruleForm.keyword,r.form.status=r.ruleForm.state,r.form.stem=r.ruleForm.stems,r.form.options="",r.form.answer=r.ruleForm.sqaAnswer,r.form.keywordAnswer=r.ruleForm.answerkeywords,r.form.isSynchro=r.num,r.question())})},getfindQustionBanks:function(){var e=this;this.$api.findQustionBanks({jobId:this.ruleForm.professionKind,level:this.ruleForm.checkbox.toString()}).then(function(r){0==r.code&&(e.textbookList=r.data)})},visibleChange:function(e){e&&(this.ruleForm.professionKind&&this.ruleForm.checkbox.length>0?this.getfindQustionBanks():this.$message.error("请先选择职业功能和职业等级"))},jian:function(){this.ruleForm.textboxList.length<=2?this.$message.error("最少2个选项"):this.ruleForm.textboxList.splice(this.ruleForm.textboxList.length-1)},jia:function(){2==this.ruleForm.textboxList.length?this.ruleForm.textboxList.push({id:"3",label:"C",value:""}):3==this.ruleForm.textboxList.length?this.ruleForm.textboxList.push({id:"4",label:"D",value:""}):4==this.ruleForm.textboxList.length?this.ruleForm.textboxList.push({id:"5",label:"E",value:""}):5==this.ruleForm.textboxList.length?this.ruleForm.textboxList.push({id:"6",label:"F",value:""}):6==this.ruleForm.textboxList.length?this.ruleForm.textboxList.push({id:"7",label:"G",value:""}):7==this.ruleForm.textboxList.length?this.ruleForm.textboxList.push({id:"8",label:"H",value:""}):8==this.ruleForm.textboxList.length&&this.$message.error("最少8个选项")},question:function(){var e=this;this.$api.addQustionBanks(this.form).then(function(r){0==r.code?(e.$message.success(r.msg),e.ruleForm.textboxList=[{id:"1",label:"A",value:""},{id:"2",label:"B",value:""},{id:"3",label:"C",value:""},{id:"4",label:"D",value:""}],e.ruleForm.radio="",e.ruleForm.topic="",e.ruleForm.stems="",e.ruleForm.sqaAnswer="",e.ruleForm.answerkeywords="",e.ruleForm.gapFillingStem="",e.ruleForm.gapFillingAnswer=""):1==r.code&&e.$message.error(r.msg)})},change:function(e){this.ruleForm.textboxList=[{id:"1",label:"A",value:""},{id:"2",label:"B",value:""},{id:"3",label:"C",value:""},{id:"4",label:"D",value:""}],this.ruleForm.radio="",this.ruleForm.topic="",this.ruleForm.checkList=[],this.ruleForm.together=!0,this.ruleForm.stems="",this.ruleForm.sqaAnswer="",this.ruleForm.answerkeywords=""}},created:function(){var e=this;this.$api.getJobfindJob().then(function(r){0==r.code&&(e.options=r.data)})},computed:{},watch:{}},i={render:function(){var e=this,r=e.$createElement,o=e._self._c||r;return o("div",[e._m(0),e._v(" "),o("div",{staticClass:"content"},[o("div",[o("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"100px"}},[o("div",{staticClass:"contenta"},[o("el-form-item",{attrs:{label:"职业工种",prop:"professionKind"}},[o("el-select",{staticStyle:{width:"220px"},attrs:{size:"mini",placeholder:"请选择职业工种"},model:{value:e.ruleForm.professionKind,callback:function(r){e.$set(e.ruleForm,"professionKind",r)},expression:"ruleForm.professionKind"}},e._l(e.options,function(e){return o("el-option",{key:e.id,attrs:{label:e.jobCode+"-"+e.jobName,value:e.id}})}),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"选择等级",prop:"checkbox"}},[o("el-checkbox-group",{model:{value:e.ruleForm.checkbox,callback:function(r){e.$set(e.ruleForm,"checkbox",r)},expression:"ruleForm.checkbox"}},[o("el-checkbox",{attrs:{label:"1"}},[e._v("一级")]),e._v(" "),o("el-checkbox",{attrs:{label:"2"}},[e._v("二级")]),e._v(" "),o("el-checkbox",{attrs:{label:"3"}},[e._v("三级")]),e._v(" "),o("el-checkbox",{attrs:{label:"4"}},[e._v("四级")]),e._v(" "),o("el-checkbox",{attrs:{label:"5"}},[e._v("五级")])],1)],1),e._v(" "),o("div",{staticClass:"genre"},[o("el-form-item",{attrs:{label:"试题类型",prop:"genre"}},[o("el-select",{staticStyle:{width:"140px"},attrs:{size:"mini",placeholder:"请选择试题类型"},on:{change:e.change},model:{value:e.ruleForm.genre,callback:function(r){e.$set(e.ruleForm,"genre",r)},expression:"ruleForm.genre"}},e._l(e.genreList,function(e){return o("el-option",{key:e.id,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"关联教材"}},[o("el-select",{staticStyle:{width:"140px"},attrs:{size:"mini",placeholder:"请选择关联教材"},on:{"visible-change":e.visibleChange},model:{value:e.ruleForm.textbook,callback:function(r){e.$set(e.ruleForm,"textbook",r)},expression:"ruleForm.textbook"}},e._l(e.textbookList,function(e){return o("el-option",{key:e.id,attrs:{label:e.teachName,value:e.id}})}),1)],1),e._v(" "),o("el-form-item",{attrs:{label:"试题关键字"}},[o("el-input",{attrs:{size:"mini",placeholder:"多个试题关键字用逗号隔开"},model:{value:e.ruleForm.keyword,callback:function(r){e.$set(e.ruleForm,"keyword",r)},expression:"ruleForm.keyword"}})],1)],1),e._v(" "),o("el-form-item",{attrs:{label:"试题状态",prop:"state"}},[o("el-radio",{attrs:{label:"1"},model:{value:e.ruleForm.state,callback:function(r){e.$set(e.ruleForm,"state",r)},expression:"ruleForm.state"}},[e._v("启用")]),e._v(" "),o("el-radio",{attrs:{label:"0"},model:{value:e.ruleForm.state,callback:function(r){e.$set(e.ruleForm,"state",r)},expression:"ruleForm.state"}},[e._v("禁用")])],1)],1),e._v(" "),o("div",{staticStyle:{"background-color":"#fff",padding:"20px 0"}},[1==e.ruleForm.genre||2==e.ruleForm.genre?o("div",[o("div",{staticStyle:{"margin-bottom":"20px"}},[o("el-form-item",{staticStyle:{width:"450px"},attrs:{label:"题干",prop:"topic"}},[o("el-input",{attrs:{resize:"none",type:"textarea",rows:3,placeholder:"请输入题干"},model:{value:e.ruleForm.topic,callback:function(r){e.$set(e.ruleForm,"topic",r)},expression:"ruleForm.topic"}})],1)],1),e._v(" "),o("div",{staticClass:"textboxList"},[e._l(e.ruleForm.textboxList,function(r,t){return o("div",{key:r.id},[o("el-form-item",{staticStyle:{width:"450px"},attrs:{label:r.label,prop:"textboxList."+t+".value",rules:[{required:!0,message:"选项不能为空",trigger:"blur"}]}},[o("el-input",{attrs:{resize:"none",type:"textarea",rows:3,placeholder:"请输入选项内容"},model:{value:r.value,callback:function(t){e.$set(r,"value",t)},expression:"item.value"}})],1)],1)}),e._v(" "),o("div",{staticClass:"img"},[o("img",{attrs:{src:t("Ky+O"),alt:""},on:{click:e.jian}}),e._v(" "),o("img",{attrs:{src:t("943w"),alt:""},on:{click:e.jia}})])],2),e._v(" "),o("div",[1==e.ruleForm.genre?o("div",[o("el-form-item",{staticStyle:{width:"800px"},attrs:{label:"正确答案",prop:"radio"}},[o("div",e._l(e.ruleForm.textboxList,function(r){return o("el-radio",{key:r.id,attrs:{label:JSON.stringify(r)},model:{value:e.ruleForm.radio,callback:function(r){e.$set(e.ruleForm,"radio",r)},expression:"ruleForm.radio"}},[e._v(e._s(r.label))])}),1)])],1):e._e(),e._v(" "),2==e.ruleForm.genre?o("div",[o("el-form-item",{staticStyle:{width:"800px"},attrs:{label:"正确答案",prop:"textbos"}},[o("el-checkbox-group",{model:{value:e.ruleForm.textbos,callback:function(r){e.$set(e.ruleForm,"textbos",r)},expression:"ruleForm.textbos"}},e._l(e.ruleForm.textboxList,function(r){return o("el-checkbox",{key:r.id,attrs:{label:JSON.stringify(r)}},[e._v(e._s(r.label))])}),1)],1)],1):e._e()])]):e._e(),e._v(" "),3==e.ruleForm.genre?o("div",[o("div",{staticClass:"gapFilling"},[o("div",[o("el-form-item",{staticStyle:{width:"450px"},attrs:{label:"题干",prop:"gapFillingStem"}},[o("el-input",{attrs:{resize:"none",type:"textarea",rows:3,placeholder:"答案用()包起来"},model:{value:e.ruleForm.gapFillingStem,callback:function(r){e.$set(e.ruleForm,"gapFillingStem",r)},expression:"ruleForm.gapFillingStem"}})],1)],1),e._v(" "),o("div",[o("el-form-item",{staticStyle:{width:"450px"},attrs:{label:"正确答案",prop:"gapFillingAnswer"}},[o("el-input",{attrs:{resize:"none",type:"textarea",rows:3,placeholder:"每个括号()对应一个答案,多个答案用逗号隔开"},model:{value:e.ruleForm.gapFillingAnswer,callback:function(r){e.$set(e.ruleForm,"gapFillingAnswer",r)},expression:"ruleForm.gapFillingAnswer"}})],1)],1)])]):e._e(),e._v(" "),4==e.ruleForm.genre?o("div",[o("div",{staticClass:"sqa"},[o("div",{staticStyle:{"margin-bottom":"20px"}},[o("el-form-item",{staticStyle:{width:"450px"},attrs:{label:"题干",prop:"stems"}},[o("el-input",{attrs:{resize:"none",type:"textarea",rows:3,placeholder:"请输入题干"},model:{value:e.ruleForm.stems,callback:function(r){e.$set(e.ruleForm,"stems",r)},expression:"ruleForm.stems"}})],1)],1),e._v(" "),o("div",{staticClass:"sqa-a"},[o("div",[o("el-form-item",{staticStyle:{width:"450px"},attrs:{label:"正确答案",prop:"sqaAnswer"}},[o("el-input",{attrs:{resize:"none",type:"textarea",rows:3,placeholder:"请输入正确答案"},model:{value:e.ruleForm.sqaAnswer,callback:function(r){e.$set(e.ruleForm,"sqaAnswer",r)},expression:"ruleForm.sqaAnswer"}})],1)],1),e._v(" "),o("div",[o("el-form-item",{staticStyle:{width:"500px"},attrs:{label:"正确答案关键字",prop:"answerkeywords","label-width":"140px"}},[o("el-input",{attrs:{resize:"none",type:"textarea",rows:3,placeholder:"请输入正确答案关键字,多个关键字用逗号隔开"},model:{value:e.ruleForm.answerkeywords,callback:function(r){e.$set(e.ruleForm,"answerkeywords",r)},expression:"ruleForm.answerkeywords"}})],1)],1)])])]):e._e(),e._v(" "),o("div",{staticClass:"synchronization"},[o("span",{staticStyle:{"padding-right":"10px"}},[e._v("同步试题至练习题库")]),e._v(" "),o("el-switch",{attrs:{"active-color":"#409EFF","inactive-color":"#DCDFE6"},model:{value:e.ruleForm.together,callback:function(r){e.$set(e.ruleForm,"together",r)},expression:"ruleForm.together"}})],1)]),e._v(" "),o("div",{staticClass:"submitForm"},[o("el-form-item",[o("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(r){return e.submitForm("ruleForm")}}},[e._v("提交")])],1)],1)])],1)])])},staticRenderFns:[function(){var e=this.$createElement,r=this._self._c||e;return r("div",{staticClass:"nav"},[r("div",[this._v("新增题库")])])}]};var a=t("C7Lr")(s,i,!1,function(e){t("ytE+")},"data-v-182547e1",null);r.default=a.exports},"ytE+":function(e,r){}});
//# sourceMappingURL=10.bf3cf93e06b8ef44d725.js.map