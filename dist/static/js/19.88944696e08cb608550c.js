webpackJsonp([19],{WwyD:function(e,t){},rHSs:function(e,t){},zA7M:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l={name:"login",data:function(){return{urla:a("ctTX"),urlb:a("ctTX"),urlc:a("ctTX"),urld:a("ctTX"),ruleForm:{radio:"",kind:"",attribute:"",nature:"",organizationName:"",creditCode:"",site:"",linkmanName:"",linkmanPhone:"",job:"",mailbox:"",central:"",organization:""},flag:!0,options:[{value:"请选择种类",label:"请选择种类"}],attributeList:[{value:"1",label:"省级机构"},{value:"2",label:"市级机构"},{value:"3",label:"中央机构"}],value:"",natureList:[],flags:!0,organizationList:[],rules:{radio:[{required:!0,message:"评价机构类型不能为空",trigger:"blur"}],kind:[{required:!0,message:"评价机构种类不能为空",trigger:"blur"}],attribute:[{required:!0,message:"评价机构属性不能为空",trigger:"blur"}],nature:[{required:!0,message:"评价机构性质不能为空",trigger:"blur"}],organizationName:[{required:!0,message:"评价机构名称不能为空",trigger:"blur"}],creditCode:[{required:!0,message:"社会信用代码不能为空",trigger:"blur"},{min:18,message:"长度为18个字符",trigger:"chamg"}],site:[{required:!0,message:"地址不能为空",trigger:"blur"}],linkmanName:[{required:!0,message:"联系人姓名不能为空",trigger:"blur"}],linkmanPhone:[{required:!0,validator:function(e,t,a){return t?/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(t)?void a():a(new Error("手机号码有误，请重新输入")):a(new Error("联系人手机号不能为空"))},trigger:"blur"}]},show:!1,list:[{value:"1",label:"省级机构"},{value:"2",label:"市级机构"},{value:"3",label:"中央机构"}],lista:[{value:"1",label:"企业"},{value:"2",label:"技工院校"},{value:"3",label:"行业(学会)协会"},{value:"4",label:"其他"}],listb:[{value:"1",label:"国有"},{value:"2",label:"民营"},{value:"3",label:"外资"},{value:"4",label:"其他"},{value:"5",label:"厅直属技工院校"},{value:"6",label:"公办技工院校"},{value:"7",label:"民办技工院校"},{value:"8",label:"部署回行业(学会)协会"},{value:"9",label:"省署行业(学会)协会"},{value:"10",label:"市署行业(学会)协会"},{value:"11",label:"其他"}]}},created:function(){var e=this;this.$api.findBasicInfo().then(function(t){e.$api.findList(t.data.oType).then(function(t){0==t.code&&(e.natureList=t.data)}),t.data&&(e.ruleForm.radio=String(t.data.type),e.ruleForm.kind=t.data.oType,e.ruleForm.attribute=t.data.oAttribute,e.ruleForm.nature=t.data.oNature,e.ruleForm.organizationName=t.data.oName,e.ruleForm.creditCode=t.data.socialCreditCode,e.ruleForm.site=t.data.address,e.ruleForm.linkmanName=t.data.contactName,e.ruleForm.linkmanPhone=t.data.contactPhone,e.ruleForm.job=t.data.duties,e.ruleForm.mailbox=t.data.email,e.ruleForm.central=t.data.centerCode,e.ruleForm.organization=t.data.orgCode)}),this.$api.checkSubmitReview().then(function(t){t.data.oCount>0&&(e.urla=a("1MyU")),t.data.JobCount>0&&(e.urlb=a("1MyU")),t.data.personnelCount>=4&&(e.urlc=a("1MyU")),t.data.programmeCount>=10&&(e.urld=a("1MyU"))})},methods:{nextStep:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return t.$message.error("表单填写错误"),!1;t.list.map(function(e){e.label==t.ruleForm.attribute&&(t.ruleForm.attribute=e.value)}),t.lista.map(function(e){e.label==t.ruleForm.kind&&(t.ruleForm.kind=e.value)}),t.listb.map(function(e){e.label==t.ruleForm.nature&&(t.ruleForm.nature=e.value)}),t.$api.addInformation({type:t.ruleForm.radio,oType:t.ruleForm.kind,oAttribute:t.ruleForm.attribute,oNature:t.ruleForm.nature,oName:t.ruleForm.organizationName,socialCreditCode:t.ruleForm.creditCode,address:t.ruleForm.site,contactName:t.ruleForm.linkmanName,contactPhone:t.ruleForm.linkmanPhone,duties:t.ruleForm.job,email:t.ruleForm.mailbox,centerCode:t.ruleForm.central,orgCode:t.ruleForm.organization}).then(function(e){e.data&&sessionStorage.setItem("token",e.data),t.$router.push("/add_career")})})},lastStep:function(){},affirm:function(){},changeAttribute:function(e){var t=this;2==e&&this.$api.chankOrganizationList().then(function(e){0==e.code&&(t.organizationList=e.data)})},changekind:function(e){var t=this;this.$api.findList(e).then(function(e){0==e.code&&(t.natureList=e.data)})},selectClassify:function(e){}},components:{Button:a("94Zy").a},watch:{ruleForm:{handler:function(e){var t=this;e.radio&&(this.flag=!1,"1"==e.radio?(this.options=[{value:"1",label:"企业"},{value:"2",label:"技工院校"}],Number(e.kind)>2&&(this.ruleForm.kind="")):"2"==e.radio?this.options=[{value:"1",label:"企业"},{value:"2",label:"技工院校"},{value:"3",label:"行业(学会)协会"},{value:"4",label:"其他"}]:this.options=[{value:"2",label:"技工院校"},{value:"4",label:"其他"}]),e.kind&&("2"==e.kind?(3==e.attribute&&(this.ruleForm.attribute=""),this.attributeList=[{value:"1",label:"省级机构"},{value:"2",label:"市级机构"}]):this.attributeList=[{value:"1",label:"省级机构"},{value:"2",label:"市级机构"},{value:"3",label:"中央机构"}]),e.attribute&&this.list.map(function(a){a.value==e.attribute&&(t.ruleForm.attribute=a.label)}),e.kind&&this.lista.map(function(a){a.value==e.kind&&(t.ruleForm.kind=a.label)}),e.kind&&e.nature&&("1"==e.kind||"企业"==e.kind?this.listb.map(function(a){a.value==e.nature&&(t.ruleForm.nature=a.label)}):"2"==e.kind||"技工院校"==e.kind?this.listb.map(function(a){a.value==e.nature&&(t.ruleForm.nature=a.label)}):"3"==e.kind||"行业(学会)协会"==e.kind?this.listb.map(function(a){a.value==e.nature&&(t.ruleForm.nature=a.label)}):"4"!=e.kind&&"其他"!=e.kind||this.listb.map(function(a){a.value==e.nature&&(t.ruleForm.nature=a.label)}))},deep:!0,immediate:!0}}},r={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[e._m(0),e._v(" "),l("div",{staticStyle:{overflow:"hidden",width:"90%",margin:"50px auto"}},[l("el-row",{attrs:{gutter:20}},[l("el-col",{staticClass:"center_box",attrs:{span:6}},[l("router-link",{staticClass:"item_box",staticStyle:{"background-color":"#EDEDED"},attrs:{to:"/record_info"}},[l("div",{staticStyle:{overflow:"hidden"}},[l("span",{staticClass:"item_box_text"},[e._v("基本信息")]),e._v(" "),l("img",{staticClass:"item_icon",attrs:{src:e.urla,alt:""}})])])],1),e._v(" "),l("el-col",{staticClass:"center_box",attrs:{span:6}},[l("router-link",{staticClass:"item_box",attrs:{to:"/add_career"}},[l("div",{staticStyle:{overflow:"hidden"}},[l("span",{staticClass:"item_box_text"},[e._v("职业信息")]),e._v(" "),l("img",{staticClass:"item_icon",attrs:{src:e.urlb,alt:""}})])]),e._v(" "),l("img",{staticStyle:{position:"absolute",right:"0"},attrs:{src:a("JSah"),alt:""}})],1),e._v(" "),l("el-col",{staticClass:"center_box",attrs:{span:6}},[l("router-link",{staticClass:"item_box",attrs:{to:"/team_info"}},[l("div",{staticStyle:{overflow:"hidden"}},[l("span",{staticClass:"item_box_text"},[e._v("人员队伍信息")]),e._v(" "),l("img",{staticClass:"item_icon",attrs:{src:e.urlc,alt:""}})])]),e._v(" "),l("img",{staticStyle:{position:"absolute",right:"0"},attrs:{src:a("JSah"),alt:""}})],1),e._v(" "),l("el-col",{staticClass:"center_box",attrs:{span:6}},[l("router-link",{staticClass:"item_box",attrs:{to:"/newPlan"}},[l("div",{staticStyle:{overflow:"hidden"}},[l("span",{staticClass:"item_box_text"},[e._v("方案和资料上传")]),e._v(" "),l("img",{staticClass:"item_icon",attrs:{src:e.urld,alt:""}})])])],1)],1)],1),e._v(" "),l("div",{staticStyle:{margin:"50px 100px 19px 150px",width:"90%",height:"400px"}},[l("div",{staticClass:"from_box",staticStyle:{float:"left"}},[l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,rules:e.rules,"label-width":"150px"}},[l("div",{staticClass:"form"},[l("div",[l("el-form-item",{attrs:{label:"评价机构类型",prop:"genre"}},[l("el-radio",{attrs:{label:"1"},model:{value:e.ruleForm.radio,callback:function(t){e.$set(e.ruleForm,"radio",t)},expression:"ruleForm.radio"}},[e._v("用人单位")]),e._v(" "),l("el-radio",{attrs:{label:"2"},model:{value:e.ruleForm.radio,callback:function(t){e.$set(e.ruleForm,"radio",t)},expression:"ruleForm.radio"}},[e._v("社会评价组织机构")]),e._v(" "),l("el-radio",{attrs:{label:"3"},model:{value:e.ruleForm.radio,callback:function(t){e.$set(e.ruleForm,"radio",t)},expression:"ruleForm.radio"}},[e._v("技工院校")])],1),e._v(" "),l("el-form-item",{attrs:{label:"评价机构种类",prop:"kind"}},[l("el-select",{staticStyle:{width:"350px"},attrs:{disabled:e.flag,placeholder:"请选择种类"},on:{change:e.changekind},model:{value:e.ruleForm.kind,callback:function(t){e.$set(e.ruleForm,"kind",t)},expression:"ruleForm.kind"}},e._l(e.options,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"评价机构属性",prop:"attribute"}},[l("el-select",{staticStyle:{width:"350px"},attrs:{disabled:e.flag,placeholder:"请选择属性"},on:{change:e.changeAttribute},model:{value:e.ruleForm.attribute,callback:function(t){e.$set(e.ruleForm,"attribute",t)},expression:"ruleForm.attribute"}},e._l(e.attributeList,function(e){return l("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1),e._v(" "),2==e.ruleForm.attribute?l("el-form-item",{attrs:{label:"所属机构"}},[l("el-select",{staticStyle:{width:"350px"},attrs:{disabled:e.flag,placeholder:"请选择所属机构"},model:{value:e.ruleForm.organization,callback:function(t){e.$set(e.ruleForm,"organization",t)},expression:"ruleForm.organization"}},e._l(e.organizationList,function(e){return l("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1):e._e(),e._v(" "),3==e.ruleForm.attribute?l("el-form-item",{attrs:{label:"央企代码"}},[l("el-input",{attrs:{placeholder:"请输入央企代码",maxlength:"4"},model:{value:e.ruleForm.central,callback:function(t){e.$set(e.ruleForm,"central",t)},expression:"ruleForm.central"}})],1):e._e(),e._v(" "),l("el-form-item",{attrs:{label:"评价机构性质",prop:"nature"}},[l("el-select",{staticStyle:{width:"350px"},attrs:{disabled:e.flag,placeholder:"请选择性质"},model:{value:e.ruleForm.nature,callback:function(t){e.$set(e.ruleForm,"nature",t)},expression:"ruleForm.nature"}},e._l(e.natureList,function(e){return l("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),l("el-form-item",{attrs:{label:"评价机构名称",prop:"organizationName"}},[l("el-input",{attrs:{placeholder:"请输入机构名称"},model:{value:e.ruleForm.organizationName,callback:function(t){e.$set(e.ruleForm,"organizationName",t)},expression:"ruleForm.organizationName"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"社会信用代码",prop:"creditCode"}},[l("el-input",{attrs:{maxlength:"18",placeholder:"18个字符由数字+字母组合"},model:{value:e.ruleForm.creditCode,callback:function(t){e.$set(e.ruleForm,"creditCode",t)},expression:"ruleForm.creditCode"}})],1)],1),e._v(" "),l("div",{staticClass:"formb"},[l("el-form-item",{attrs:{label:"地址",prop:"site"}},[l("el-input",{staticStyle:{width:"350px"},attrs:{placeholder:"请输入公司地址"},model:{value:e.ruleForm.site,callback:function(t){e.$set(e.ruleForm,"site",t)},expression:"ruleForm.site"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"联系人姓名",prop:"linkmanName"}},[l("el-input",{staticStyle:{width:"350px"},attrs:{placeholder:"请输入联系人姓名"},model:{value:e.ruleForm.linkmanName,callback:function(t){e.$set(e.ruleForm,"linkmanName",t)},expression:"ruleForm.linkmanName"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"联系方式",prop:"linkmanPhone"}},[l("el-input",{staticStyle:{width:"350px"},attrs:{placeholder:"请输入联系人电话",maxlength:"11"},model:{value:e.ruleForm.linkmanPhone,callback:function(t){e.$set(e.ruleForm,"linkmanPhone",t)},expression:"ruleForm.linkmanPhone"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"职务",prop:"job"}},[l("el-input",{staticStyle:{width:"350px"},attrs:{placeholder:"请输入职务"},model:{value:e.ruleForm.job,callback:function(t){e.$set(e.ruleForm,"job",t)},expression:"ruleForm.job"}})],1),e._v(" "),l("el-form-item",{attrs:{label:"邮箱",prop:"mailbox"}},[l("el-input",{staticStyle:{width:"350px"},attrs:{placeholder:"请输入邮箱"},model:{value:e.ruleForm.mailbox,callback:function(t){e.$set(e.ruleForm,"mailbox",t)},expression:"ruleForm.mailbox"}})],1)],1)]),e._v(" "),l("el-form-item",[l("el-button",{attrs:{disabled:e.show,type:"primary"},on:{click:function(t){return e.nextStep("ruleForm")}}},[e._v("下一步")])],1)],1)],1)]),e._v(" "),l("div",{staticClass:"center"})])},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"top_title"},[this._v("\n    当前位置：备案管理-"),t("a",{staticStyle:{cursor:"pointer"}},[this._v("我的备案")]),this._v("-基本信息\n  ")])}]};var i=a("C7Lr")(l,r,!1,function(e){a("rHSs"),a("WwyD")},"data-v-379209a6",null);t.default=i.exports}});
//# sourceMappingURL=19.88944696e08cb608550c.js.map