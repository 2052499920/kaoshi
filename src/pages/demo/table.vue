<!-- table 表格列表页面 -->
<template>
	<div class="page-body">

		<!-- 头部页面标题 -->
  		<div class="page-header">
    		<h1 class="page-title">表格列表页面</h1>
    		<el-breadcrumb>
      		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      		<el-breadcrumb-item >表格列表页面</el-breadcrumb-item>
    		</el-breadcrumb>
  		</div>

  		<!-- 表格数据 -->
  		<div class="box">
  			<div style="display: flex;justify-content: flex-end;margin: 10px 0;">
  				<el-button @click.stop="refresh()" size="mini">
        			<i class="fa fa-refresh"></i>
      		</el-button>
        		<el-button type="success" size="mini" @click="newItem()">新增</el-button>
  			</div>
    		<el-table :data="table_data" v-loading="load_data" element-loading-text="拼命加载中" style="width: 100%;border: 1px #F0F0F0 solid;">
    			<el-table-column type="expand">
               <template slot-scope="props">
                  <el-card class="box-card">
                     <div slot="header" class="clearfix">
                        <span>内容详情</span>
                     </div>
                     <div class="ql-snow">
                        <div class="ql-editor" v-html="props.row.html"></div>
                     </div>
                  </el-card>
               </template>
            </el-table-column>
		      <el-table-column label="#" type="index"></el-table-column>
		      <el-table-column label="图片" prop="value" width="200">
		      	<template slot-scope="scope">
		      		<img :src="imgUrl + scope.row.value" style="width: 80px;height: 50px;" />
		      	</template>
		      </el-table-column>
		      <el-table-column label="标题" prop="title"></el-table-column>
		      <el-table-column label="上传时间" prop="createdAt" width="150">
		      	<template slot-scope="scope">
		      		{{ scope.row.createdAt | date1 }}
		      	</template>
		      </el-table-column>
		      <el-table-column label="操作" width="150">
		        	<template slot-scope="scope">
		          	<el-button type="primary" size="mini" @click="updateItem(scope.row)">修改</el-button>
		          	<el-button type="danger" size="mini" @click="deleteItem(scope.row)">删除</el-button>
		        	</template>
		      </el-table-column>
    		</el-table>

    		<!-- 分页 -->
			<div style="margin-top: 10px;">
            <el-pagination background
               @current-change="handleCurrentChange"
               :current-page="currentPage"
               :page-size="limit"
               layout="total, prev, pager, next"
               :total="count">
            </el-pagination>
         </div>

    	</div>

  	</div>
</template>

<script>
import { imgUrl } from '@/api/env'
import { getSwiperCount, getSwiperList, deleteData } from '@/api/getData'
export default {
	data() {
		return {
			imgUrl,
			table_data: [],
			load_data: true,
			currentPage: 1,
			limit: 20,
			count: 0,
			offset: 0
		}
	},
	created() {
		this.initData();
	},
	methods: {

		// 数据条数
		async initData() {

			var res = await getSwiperCount();
			if ( res.code == 200 ) {
				this.count = res.data;
				this.getData();
			} else {
				console.log('数据条数', res);
			}

		},

		// 分页数据
		async getData() {

			var res = await getSwiperList({ skip: this.offset, limit: this.limit });
			if ( res.code == 200 ) {
				this.table_data = res.data;
				this.load_data = false;
			} else {
				console.log('数据', res);
				this.load_data = false;
			}

		},

		// 新增
		newItem() {
			var item = {};
			item.edit = 0;
			this.$router.push({
				path: '/table-edit',
				query: { item: item }
			});
		},

		// 修改
		updateItem(row) {
			var item = row;
			item.edit = 1;
			this.$router.push({
				path: '/table-edit',
				query: { item: item }
			});
		},

		deleteItem(row) {

			this.$confirm('是否删除此数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
         }).then( async () => {
            var ret = await deleteData({
               id: row._id,
               model: 'carousel',
               enabled: 0
            });
            if ( ret.code == 200 ) {
               this.$message({ type: 'success', message: '删除成功!' });
               this.initData();
            } else {
               this.$message({ type: 'warning', message: '删除失败，请重试！'});
            }           
         }).catch(() => {
            this.$message({ type: 'info',  message: '已取消删除' });          
         });

		},

		// 刷新
		refresh() {
			this.load_data = true;
			this.initData();
		},

		// 分页
		handleCurrentChange(val) {
			this.load_data = true;
			this.currentPage = val;
			this.offset = ( this.currentPage - 1 ) * this.limit;
			this.initData();
		}

	}
}
</script>

<style>
.box-body{
	width: 100%;
	overflow: auto;
}
</style>
