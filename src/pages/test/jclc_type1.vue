<template>
    <div style="padding: 2%">
        <el-button type="primary" @click="exportExcel" style="float: left">新增检查流程</el-button>

        <div style="margin-top: 4%;">
            <div v-for="item in tableData">
                <el-alert style="margin-top: 10px;" type="success" :closable="false">
                    <div style="width: 100%; height: 100%;">
                        <p style="float: left; width: 50px; ;">{{item.title}}</p>
                        <el-button type="primary" style="float: right;" @click="del(item, 1)" size="mini">删除</el-button>
                        <el-button type="primary" style="float: right; margin-right: 10px;" @click="edit(item, 0)" size="mini">编辑</el-button>
                    </div>
                </el-alert>
                <el-alert style="margin-top: 10px;margin-left: 20px;" v-for="item in item.list" type="warning"
                    :closable="false">
                    <div style="width: 100%; height: 100%;">
                        <p style="float: left; width: 50px; ;">{{item.title}}</p>
                        <img style="float: left; width: 50px; height: 50px;" :src="'/public/static/img/' + item.icon"
                            alt="">
                        <el-button type="primary" style="float: right;margin-top: 10px;" @click="del(item, 2)" size="mini">删除</el-button>
                        <el-button type="primary" style="float: right;margin-top: 10px; margin-right: 10px;" @click="edit(item, 1)" size="mini">编辑</el-button>
                        <router-link :to="'/jclc_html?id=' + item.id + '&state=0'">
                            <el-button type="primary" style="float: right;margin-top: 10px; margin-right: 5px;" size="mini">住院部</el-button>
                        </router-link>
                        <router-link :to="'/jclc_html?id=' + item.id + '&state=1'">
                        <el-button type="primary" style="float: right;margin-top: 10px; margin-right: 5px;" size="mini">门诊</el-button>
                        </router-link>
                    </div>
                </el-alert>
            </div>
        </div>

        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <el-radio-group v-model="radio1">
                <el-radio-button v-if="!(edit_id && type1_id)" label="一级分类"></el-radio-button>
                <el-radio-button v-if="!(edit_id && type1_id == null)" label="二级分类"></el-radio-button>
            </el-radio-group>

            <el-upload v-if="radio1 == '二级分类'" style="margin-top: 20px" class="avatar-uploader"
                action="/uploadsFile" name="file" :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="value" :src="'/public/static/img/' + value" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div>
                <el-select v-if="radio1 == '二级分类'" style="width: 300px; margin-top: 20px;" v-model="type1_id"
                    placeholder="请选择">
                    <el-option v-for="item in tableData" :key="item.title" :label="item.title" :value="item.id">
                    </el-option>
                </el-select>
            </div>
            <el-input style="width: 300px; margin-top: 20px; display: block" placeholder="请输入分类标题" v-model="title" />

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sub">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import axios from "axios";
    import FileSaver from "file-saver";
    import XLSX from "xlsx";

    export default {
        created() {
            this.get_list(this.page);
        },
        data() {
            return {
                type1_id: null,
                tableData: [],
                value: "",
                dialogVisible: false,
                edit_id: null,
                title: "",
                radio1: "一级分类",
                page: 1,
            };
        },
        methods: {
            // 打开编辑
            edit(e, type) {
                this.radio1 = type == 0 ? '一级分类' : '二级分类'
                this.value = e.icon;
                this.title = e.title;
                this.dialogVisible = true;
                this.edit_id = e.id;
                this.type1_id = e.type1_id
            },

            // 删除
            del(e, type) {
                let obj = {}
                if(type == 1) {
                    obj = { del_id: e.id }
                }else {
                    obj = { type1_id_del: e.id }
                }
                this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        axios
                            .post("/jclc_type1", obj)
                            .then((res) => {
                                if (res.data.code == 200) {
                                    this.get_list(this.page);
                                } else {
                                    this.$message.error("操作失败");
                                }
                            });
                    })
                    .catch(() => { });
            },

            sub() {
                let obj = { title: this.title };
                if (this.edit_id) {
                    obj.edit_id = this.edit_id;
                } else {
                    obj.add = "add";
                }
                if (this.radio1 == '二级分类') {
                    obj.type1_id = this.type1_id
                    obj.icon = this.value
                }
                axios.post("/jclc_type1", obj).then((res) => {
                    this.edit_id = null;
                    this.dialogVisible = false;
                    this.get_list(this.page);
                });
            },

            handleCurrentChange(currentPage) {
                this.get_list(currentPage);
            },

            exportExcel() {
                this.dialogVisible = true;
                this.edit_id = null
                this.type1_id = null
                this.title = null
                this.icon = null
            },

            get_list(limit) {
                axios
                    .post("/jclc_type1", { query: "query", page: limit })
                    .then((res) => {
                        this.tableData = res.data.data;
                    });
            },
            // 上传图片
            handleAvatarSuccess(res, file) {
                this.value = res;
            },
        },
    };
</script>

<style >
    .el-alert__content {
        width: 100% !important;
    }
</style>