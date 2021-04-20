<!-- table 表格列表页面 -->
<template>
	<div class="page-body">

		<!-- 头部页面标题 -->
  		<div class="page-header">
    		<h1 class="page-title">编辑页面</h1>
    		<el-breadcrumb>
      		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      		<el-breadcrumb-item >编辑页面</el-breadcrumb-item>
    		</el-breadcrumb>
  		</div>

  		<!-- 编辑框 -->
  		<div class="box">
  			<el-form ref="form" :model="form" :rules="rules" label-width="150px">
      		<el-form-item label="轮播标题" prop="title">
        			<m-input block placeholder="请输入轮播标题" v-model="form.title"/>
      		</el-form-item>
      		<el-form-item label="轮播描述" prop="desc">
            	<m-input placeholder="请输入轮播标题" type="textarea" v-model="form.desc" block/>
         	</el-form-item>
            <el-form-item label="轮播图片" prop="value">
               <el-upload
                  class="avatar-uploader"
                  :headers="headers"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :on-progress="avatorProgress"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="isImg" :src="imgUrl + form.value" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               </el-upload>
            </el-form-item>
            <el-form-item label="附件上传" v-if="form.edit == 1">
               <el-upload
                  class="upload-demo"
                  ref="upload"
                  :on-remove="handleRemove"
                  :on-success="uploadSuccess"
                  :before-remove="beforeRemove"
                  multiple
                  :limit="5"
                  :on-exceed="handleExceed"
                  :file-list="fileList">
                  <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
               </el-upload>
            </el-form-item>
            <el-form-item label="文本内容" prop="html">
               <div class="edit_container">
                  <quill-editor v-model="form.html"
                     ref="myQuillEditor"
                     class="editer"
                     placeholder="请输入内容"
                     :options="editorOption">
                  </quill-editor>
               </div>
            </el-form-item>
      		<el-form-item>
        			<el-button size="small" type="primary" @click="edit('form')" :loading="on_submit_loading">提交</el-button>
        			<el-button size="small" @click="$router.back()">取消</el-button>
      		</el-form-item>
    		</el-form>
  		</div>

  	</div>
</template>

<script>
import { imgUrl, uploadurl } from '@/api/env'
import { quillEditor, Quill } from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
Quill.register('modules/ImageExtend', ImageExtend)
import { addSwiper, updateSwiper, editAttachment } from '@/api/getData'
export default {
	components: { quillEditor },
	data() {
		return {
			imgUrl,
			uploadurl,
			headers: { token: localStorage.getItem('token')},
			form: this.$route.query.item,
			editorOption: {
            placeholder: '请输入内容',
            modules: {
               ImageExtend: {
                  loading: true,
                  name: 'img',
                  action: uploadurl + '?token=' + localStorage.getItem('token'),
                  response: (res) => {

                     return imgUrl + res.data[0];
                  }
               },
               toolbar: {
                  container: container,
                  handlers: {
                     'image': function () {
                        QuillWatch.emit(this.quill.id)
                     }
                  }
               }
            }
         },
         rules: {
            title: [ { required: true, message: '请输入轮播标题', trigger: 'blur' } ],
            value: [ { required: true, message: '请上传轮播图片', trigger: 'blur' } ],
            desc: [ { required: true, message: '请输入描述', trigger: 'blur' } ],
            html: [ { required: true, message: '请输入具体内容', trigger: 'blur' } ]
         },
         isImg: false,
         fileList: [],
         on_submit_loading: false
		}
	},
	created() {

      // 将 token 加载 upload 后面，上传文件一般都要带上 token
      var token = localStorage.getItem('token');
      if ( [undefined, 'undefined', null, 'null', ''].indexOf(token) == -1 ) {
         this.uploadurl += '?token=' + token;
      }

      // 判断编辑显示情况
		if ( this.form.edit == 1 ) {
         this.isImg = true;
      }
	},
	methods: {

      // 编辑提交验证
      edit(formName) {
         this.$refs[formName].validate((valid) => {
            if (valid) {

               // 数据在这里整理传入对应函数，不用新增和编辑都写一次
               var data = {
                  title: this.form.title,
                  value: this.form.value,
                  html: this.form.html
               }

               if ( this.form.edit == 1 ) {
                  this.update(data);                                
               } else {
                  this.add(data);             
               }
               this.on_submit_loading = true;
            } else {
               return false;
            }
         });
      },

      // 新增
      async add(data) {

         var ret = await addSwiper(data);
         if ( ret.code == 200 ) {
            this.$message.success('新增成功');
            this.$router.go(-1);
         } else {
            this.$message.error('新增失败，请重试');
            this.on_submit_loading = false;
            console.log('新增', ret);
         }

      },

      // 修改
      async update(data) {

         var ret = await updateSwiper(this.form._id,data);
         if ( ret.code == 200 ) {
            this.$message.success('修改成功');
            this.$router.go(-1);
         } else {
            this.$message.error('修改失败，请重试');
            this.on_submit_loading = false;
            console.log('修改', ret);
         }

      },

		// 上传图片
      avatorProgress(res, file) {
         this.$message('图片上传中');
      },
      handleAvatarSuccess(res, file) {
         if( res.code == 200 ) {
            this.$message.success('上传成功');
            this.form.value = res.data[0];
            this.isImg = true;
         } else {
            this.$message.error('上传失败，请重试');
         }
      },
      beforeAvatarUpload(file) {
         const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
         const isLt2M = file.size / 1024 / 1024 < 2;

         if (!isRightType) {
            this.$message.error('只能上传 jepg/png 格式的图片文件!');
         }
         if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!');
         }
         return isRightType && isLt2M;
      },

      // 上传限制
      handleExceed(files, fileList) {
         console.log(files, fileList);
      },

      // 上传附件
      async uploadSuccess(res, file, filelist) {

         if ( res.code == 200 ) {

            this.$message.info('文件上传中');

            // 文件上传对应的模块和文件名
            var data = {
               model: 'carousel',
               type: 0,
               name: file.name,
               file: res.data[0],
               id: this.form._id
            }
            this.fileList.push(data);

            var ret = await editAttachment(data);
            if ( ret.code == 200 ) {
               this.$message.success('附件上传成功');
            } else {
               this.$message.error('附件上传失败，请重试');
               console.log('上传附件', ret);
            }

         } else {
            this.$message.error('文件上传失败，请重试');
            console.log('文件上传', res);
         }

      },

      // 删除附件提示
      beforeRemove(file, fileList) {
         return this.$confirm(`确定移除 ${ file.name }？`);
      },

      // 删除附件
      async handleRemove(file, filelist) {

         var data = {
            model: 'carousel', 
            type: 1, 
            id: this.form._id, 
            fileid: file.fileid
         }

         var ret = await editAttachment(data);
         if ( ret.code == 200 ) {
            this.$message.success('删除成功');
         } else {
            this.$message.error('删除失败，请重试');
            console.log('删除附件', ret);
         }
      },

	}
}
</script>

<style>
.box-body{
	width: 100%;
	overflow: auto;
}
</style>
