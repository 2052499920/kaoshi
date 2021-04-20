webpackJsonp([6],{UVwl:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("3cXf"),s=i.n(a),n={name:"",props:{},data:function(){return{form:{jobId:"",level:"",keyword:"",status:"",teachingId:"",topicType:1,pageNo:1,pageSize:5},options:[],levelList:[{id:1,label:"一级",value:1},{id:2,label:"二级",value:2},{id:3,label:"三级",value:3},{id:4,label:"四级",value:4},{id:5,label:"五级",value:5}],teachingIdList:[],topicTypeList:[{id:1,label:"单选题",value:1},{id:2,label:"多选题",value:2},{id:3,label:"填空题",value:3},{id:4,label:"简答题",value:4}],statusList:[{id:1,label:"开启",value:1},{id:0,label:"禁用",value:0}],tableData:[],condition:""}},components:{},methods:{getTestQuestionList:function(){var t=this;this.$api.getTestQuestion(this.form).then(function(e){0==e.code&&(e.data.rows.map(function(t){1==t.status?t.switch=!0:t.switch=!1}),t.tableData=e.data)})},visibleChange:function(t){var e=this;t&&(this.form.jobId&&this.form.level?this.$api.findQustionBanks({jobId:this.form.jobId,level:this.form.level.toString()}).then(function(t){0==t.code&&(e.teachingIdList=t.data)}):this.$message.error("请先选择职业功能和职业等级"))},search:function(){this.form.pageNo=1,this.getTestQuestionList()},changeSwitch:function(t,e){var i=this;this.condition="",this.condition=t?1:0,this.$api.updateStatus({id:e.id,topicType:this.form.topicType,status:this.condition}).then(function(t){0==t.code?i.$message.success(t.msg):i.$message.error(t.msg)})},handleEdit:function(t,e){localStorage.setItem("editPascal",s()(e)),this.$router.push("/editPascal")},handleDelete:function(t,e){var i=this;this.$confirm("此操作将永久删除该试题, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.$api.delQuestions({id:e.id,topicType:i.form.topicType}).then(function(t){0==t.code?(i.getTestQuestionList(),i.$message.success(t.msg)):i.$message.error(t.msg)})}).catch(function(){i.$message({type:"info",message:"取消删除"})})},handleSizeChange:function(t){this.form.pageSize=t,this.getTestQuestionList()},handleCurrentChange:function(t){this.form.pageNo=t,this.getTestQuestionList()}},created:function(){var t=this;this.$api.getJobfindJob().then(function(e){0==e.code&&(t.options=e.data)}),this.getTestQuestionList()},computed:{},watch:{}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),t._v(" "),i("div",{staticClass:"contenta"},[i("div",{staticClass:"contenta1"},[i("div",{staticClass:"selet"},[i("span",{staticClass:"texts"},[t._v("职业工种")]),t._v(" "),i("el-select",{staticStyle:{width:"200px"},attrs:{size:"mini",placeholder:"请选择职业工种"},model:{value:t.form.jobId,callback:function(e){t.$set(t.form,"jobId",e)},expression:"form.jobId"}},t._l(t.options,function(t){return i("el-option",{key:t.id,attrs:{label:t.jobCode+"-"+t.jobName,value:t.id}})}),1)],1),t._v(" "),i("div",{staticClass:"selet"},[i("span",{staticClass:"texts"},[t._v("职业等级")]),t._v(" "),i("el-select",{staticStyle:{width:"200px"},attrs:{size:"mini",placeholder:"请选择职业等级"},model:{value:t.form.level,callback:function(e){t.$set(t.form,"level",e)},expression:"form.level"}},t._l(t.levelList,function(t){return i("el-option",{key:t.id,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),i("div",[i("span",{staticClass:"texts"},[t._v("关联教材")]),t._v(" "),i("el-select",{staticStyle:{width:"200px"},attrs:{size:"mini",placeholder:"请选择关联教材"},on:{"visible-change":t.visibleChange},model:{value:t.form.teachingId,callback:function(e){t.$set(t.form,"teachingId",e)},expression:"form.teachingId"}},t._l(t.teachingIdList,function(t){return i("el-option",{key:t.id,attrs:{label:t.teachName,value:t.id}})}),1)],1)]),t._v(" "),i("div",{staticClass:"contenta2"},[i("div",{staticClass:"keyword selet"},[t._m(1),t._v(" "),i("div",{staticStyle:{width:"200px"}},[i("el-input",{attrs:{size:"mini",placeholder:"多个试题关键字用逗号隔开"},model:{value:t.form.keyword,callback:function(e){t.$set(t.form,"keyword",e)},expression:"form.keyword"}})],1)]),t._v(" "),i("div",{staticClass:"selet"},[i("span",{staticClass:"texts"},[t._v("试题类型")]),t._v(" "),i("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini",placeholder:"试题类型"},model:{value:t.form.topicType,callback:function(e){t.$set(t.form,"topicType",e)},expression:"form.topicType"}},t._l(t.topicTypeList,function(t){return i("el-option",{key:t.id,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),i("div",{staticClass:"selet"},[i("span",{staticClass:"texts"},[t._v("试题状态")]),t._v(" "),i("el-select",{staticStyle:{width:"100px"},attrs:{size:"mini",placeholder:"试题状态"},model:{value:t.form.status,callback:function(e){t.$set(t.form,"status",e)},expression:"form.status"}},t._l(t.statusList,function(t){return i("el-option",{key:t.id,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),i("div",[i("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.search}},[t._v("搜索")])],1)])]),t._v(" "),i("div",{staticClass:"contentb"},[i("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tableData.rows}},[i("el-table-column",{attrs:{label:"编号",align:"center",width:"80"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.$index+1))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"试题类型",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.answer))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"状态",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-switch",{attrs:{"active-color":"#409EFF","inactive-color":"#DCDFE6"},on:{change:function(i){return t.changeSwitch(i,e.row)}},model:{value:e.row.switch,callback:function(i){t.$set(e.row,"switch",i)},expression:"scope.row.switch"}})]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"职业工种",align:"center",width:"240"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.jobCode+"-"+e.row.jobName))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"关联教材",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticStyle:{"margin-left":"10px"}},[t._v(t._s(e.row.teachName))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"试题内容",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("span",{staticStyle:{"margin-left":"10px overflow: hidden","text-overflow":"ellipsis","white-space":"nowrap"}},[t._v(t._s(e.row.stem))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(i){return t.handleEdit(e.$index,e.row)}}},[t._v("编辑")]),t._v(" "),i("el-button",{staticStyle:{color:"#f8902a"},attrs:{size:"mini",type:"text"},on:{click:function(i){return t.handleDelete(e.$index,e.row)}}},[t._v("删除")])]}}])})],1),t._v(" "),i("div",{staticClass:"pagination"},[i("el-pagination",{attrs:{"page-sizes":[5,10,15,20],"page-size":5,background:"",layout:"total, sizes, prev, pager, next, jumper",total:t.tableData.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"nav"},[e("div",[this._v("题库管理")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("span",{staticClass:"texts"},[this._v("试题关键字")])])}]};var o=i("C7Lr")(n,l,!1,function(t){i("YkxU")},"data-v-63e59a3c",null);e.default=o.exports},YkxU:function(t,e){}});
//# sourceMappingURL=6.0f88605fd40d4597bd49.js.map