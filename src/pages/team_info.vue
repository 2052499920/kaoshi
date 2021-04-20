<!-- 登录界面 -->
<template>
  <div>
    <div class="top_title">
      当前位置：备案管理-<a style="cursor: pointer">我的备案</a>-人员队伍信息
    </div>
    <div style="width: 90%; margin: 50px auto">
      <el-row :gutter="20">
        <el-col :span="6" class="center_box">
          <router-link to="/record_info" class="item_box">
            <div style="overflow: hidden">
              <span class="item_box_text">基本信息</span>
              <img :src="urla" class="item_icon" alt="" />
            </div>
          </router-link>
        </el-col>
        <el-col :span="6" class="center_box">
          <router-link to="/add_career" class="item_box">
            <div style="overflow: hidden">
              <span class="item_box_text">职业信息</span>
              <img :src="urlb" class="item_icon" alt="" />
            </div>
          </router-link>
          <img
            src="../assets/jiantou.png"
            style="position: absolute; right: 0"
            alt=""
          />
        </el-col>
        <el-col :span="6" class="center_box">
          <router-link
            to="/team_info"
            class="item_box"
            style="background-color: #ededed"
          >
            <div style="overflow: hidden">
              <span class="item_box_text">人员队伍信息</span>
              <img :src="urlc" class="item_icon" alt="" />
            </div>
          </router-link>
          <img
            src="../assets/jiantou.png"
            style="position: absolute; right: 0"
            alt=""
          />
        </el-col>
        <el-col :span="6" class="center_box">
          <router-link to="/newPlan" class="item_box">
            <div style="overflow: hidden">
              <span class="item_box_text">方案和资料上传</span>
              <img :src="urld" class="item_icon" alt="" />
            </div>
          </router-link>
        </el-col>
      </el-row>
    </div>
    <div style="margin: 100px auto; width: 90%">
      <div>
        <div>
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="专职人员" name="1">
              <div class="from_box">
                <div class="search">
                  <div class="btn" v-if="show">
                    <!-- <el-button type="primary" size="mini" @click="leada"
                    >导入</el-button
                  > -->
                    <el-dropdown trigger="click" @command="handleCommand">
                      <el-button type="primary" size="mini">
                        添加队伍信息<i
                          class="el-icon-arrow-down el-icon--right"
                        ></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a"
                          >文件导入</el-dropdown-item
                        >
                        <el-dropdown-item command="b"
                          >手动添加</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="inpt">
                    <el-input
                      placeholder="请输入姓名"
                      v-model="inputa"
                      class="input-with-select"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="searcha"
                        >搜索</el-button
                      >
                    </el-input>
                  </div>
                </div>
                <div v-if="show">
                  <el-table :data="tableData.rows" style="width: 100%">
                    <el-table-column label="姓名" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.planName
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="证件类型" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.certificatesType
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="证件号" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.certificatesCode
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="职务/职称" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.title
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="学历" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.education
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="主要工作职责" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.specialty
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" width="180" align="center">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)"
                          >编辑</el-button
                        >
                        <el-button
                          type="danger"
                          size="mini"
                          @click="handleDel(scope.$index, scope.row)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-sizes="[5, 10, 15]"
                      :page-size="5"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableData.total"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <div class="form_tips" v-if="!show">
                <p>文件说明：</p>
                <p>
                  1.请下载专职人员模板：<a
                    href="https://skill-identification.obs.cn-southwest-2.myhuaweicloud.com/online/%E4%B8%93%E8%81%8C%E4%BA%BA%E5%91%98%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx"
                    >专职人员模板.xlsx</a
                  >
                  ,根据模板中提示进行填写；
                </p>
                <p>2.填写模板中所有提示必须填写后将文档进行上传；</p>
                <p>3.只支持Excel文件，文件不超过1000行</p>
                <div style="overflow: hidden; margin-top: 40px">
                  <div class="import_but">
                    <el-upload
                      class="upload-demo"
                      action="http://116.63.172.55:8089/online/personnel/importPersonnel"
                      :headers="headers"
                      :auto-upload="true"
                      :show-file-list="true"
                      :on-success="handleSuccess"
                      accept=".xlsx,.xls"
                      :data="data1"
                    >
                      <el-button size="small" type="primary">导入</el-button>
                    </el-upload>
                  </div>
                  <div
                    class="import_but"
                    style="background: #d5d5d5; color: #fff; margin-left: 20px"
                    @click="cancel"
                  >
                    取消
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="专家队伍" name="2">
              <div class="from_box">
                <div class="search">
                  <div class="btn" v-if="show">
                    <!-- <el-button type="primary" size="mini" @click="leada"
                    >导入</el-button
                  > -->
                    <el-dropdown trigger="click" @command="handleCommand">
                      <el-button type="primary" size="mini">
                        添加队伍信息<i
                          class="el-icon-arrow-down el-icon--right"
                        ></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a"
                          >文件导入</el-dropdown-item
                        >
                        <el-dropdown-item command="b"
                          >手动添加</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="inpt">
                    <el-input
                      placeholder="请输入姓名"
                      v-model="inputa"
                      class="input-with-select"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="searcha"
                        >搜索</el-button
                      >
                    </el-input>
                  </div>
                </div>
                <div v-if="show">
                  <el-table :data="tableData.rows" style="width: 100%">
                    <el-table-column label="姓名" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.planName
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="证件类型" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.certificatesType
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="证件号" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.certificatesCode
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="职务/职称" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.title
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="学历" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.education
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="主要工作职责" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.specialty
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" width="180" align="center">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)"
                          >编辑</el-button
                        >
                        <el-button
                          type="danger"
                          size="mini"
                          @click="handleDel(scope.$index, scope.row)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-sizes="[5, 10, 15]"
                      :page-size="5"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableData.total"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <div class="form_tips" v-if="!show">
                <p>文件说明：</p>
                <p>
                  1.请下载专家队伍模板：<a
                    href="https://skill-identification.obs.cn-southwest-2.myhuaweicloud.com/online/%E4%B8%93%E5%AE%B6%E9%98%9F%E4%BC%8D%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx"
                    >专家队伍模板.xlsx</a
                  >
                  ,根据模板中提示进行填写；
                </p>
                <p>2.填写模板中所有提示必须填写后将文档进行上传；</p>
                <p>3.只支持Excel文件，文件不超过1000行</p>
                <div style="overflow: hidden; margin-top: 40px">
                  <div class="import_but">
                    <el-upload
                      class="upload-demo"
                      action="http://116.63.172.55:8089/online/personnel/importPersonnel"
                      :headers="headers"
                      :auto-upload="true"
                      :show-file-list="true"
                      :on-success="handleSuccess"
                      accept=".xlsx,.xls"
                      :data="data2"
                    >
                      <el-button size="small" type="primary">导入</el-button>
                    </el-upload>
                  </div>
                  <div
                    class="import_but"
                    style="background: #d5d5d5; color: #fff; margin-left: 20px"
                    @click="cancel"
                  >
                    取消
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="考评人员" name="3">
              <div class="from_box">
                <div class="search">
                  <div class="btn" v-if="show">
                    <!-- <el-button type="primary" size="mini" @click="leada"
                    >导入</el-button
                  > -->
                    <el-dropdown trigger="click" @command="handleCommand">
                      <el-button type="primary" size="mini">
                        添加队伍信息<i
                          class="el-icon-arrow-down el-icon--right"
                        ></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a"
                          >文件导入</el-dropdown-item
                        >
                        <el-dropdown-item command="b"
                          >手动添加</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="inpt">
                    <el-input
                      placeholder="请输入姓名"
                      v-model="inputa"
                      class="input-with-select"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="searcha"
                        >搜索</el-button
                      >
                    </el-input>
                  </div>
                </div>
                <div v-if="show">
                  <el-table :data="tableData.rows" style="width: 100%">
                    <el-table-column label="姓名" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.planName
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="证件类型" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.certificatesType
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="证件号" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.certificatesCode
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="职务/职称" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.title
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="学历" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.education
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="主要工作职责" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.specialty
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" width="180" align="center">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)"
                          >编辑</el-button
                        >
                        <el-button
                          type="danger"
                          size="mini"
                          @click="handleDel(scope.$index, scope.row)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-sizes="[5, 10, 15]"
                      :page-size="5"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableData.total"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <div class="form_tips" v-if="!show">
                <p>文件说明：</p>
                <p>
                  1.请下载考评人员模板：<a
                    href="https://skill-identification.obs.cn-southwest-2.myhuaweicloud.com/online/%E8%80%83%E8%AF%84%E4%BA%BA%E5%91%98%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx"
                    >考评人员模板.xlsx</a
                  >
                  ,根据模板中提示进行填写；
                </p>
                <p>2.填写模板中所有提示必须填写后将文档进行上传；</p>
                <p>3.只支持Excel文件，文件不超过1000行</p>
                <div style="overflow: hidden; margin-top: 40px">
                  <div class="import_but">
                    <el-upload
                      class="upload-demo"
                      action="http://116.63.172.55:8089/online/personnel/importPersonnel"
                      :headers="headers"
                      :auto-upload="true"
                      :show-file-list="true"
                      :on-success="handleSuccess"
                      accept=".xlsx,.xls"
                      :data="data3"
                    >
                      <el-button size="small" type="primary">导入</el-button>
                    </el-upload>
                  </div>
                  <div
                    class="import_but"
                    style="background: #d5d5d5; color: #fff; margin-left: 20px"
                    @click="cancel"
                  >
                    取消
                  </div>
                </div>
              </div>
            </el-tab-pane>

            <el-tab-pane label="督导人员" name="4">
              <div class="from_box">
                <div class="search">
                  <div class="btn" v-if="show">
                    <!-- <el-button type="primary" size="mini" @click="leada"
                    >导入</el-button
                  > -->
                    <el-dropdown trigger="click" @command="handleCommand">
                      <el-button type="primary" size="mini">
                        添加队伍信息<i
                          class="el-icon-arrow-down el-icon--right"
                        ></i>
                      </el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a"
                          >文件导入</el-dropdown-item
                        >
                        <el-dropdown-item command="b"
                          >手动添加</el-dropdown-item
                        >
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="inpt">
                    <el-input
                      placeholder="请输入姓名"
                      v-model="inputa"
                      class="input-with-select"
                    >
                      <el-button
                        slot="append"
                        icon="el-icon-search"
                        @click="searcha"
                        >搜索</el-button
                      >
                    </el-input>
                  </div>
                </div>
                <div v-if="show">
                  <el-table :data="tableData.rows" style="width: 100%">
                    <el-table-column label="姓名" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.planName
                        }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="证件类型" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.certificatesType
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="证件号" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.certificatesCode
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="职务/职称" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.title
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="学历" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.education
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="主要工作职责" align="center">
                      <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                          scope.row.specialty
                        }}</span>
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" width="" align="center">
                      <template slot-scope="scope">
                        <el-button
                          type="primary"
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)"
                          >编辑</el-button
                        >
                        <el-button
                          type="danger"
                          size="mini"
                          @click="handleDel(scope.$index, scope.row)"
                          >删除</el-button
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="page">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-sizes="[5, 10, 15]"
                      :page-size="5"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableData.total"
                    >
                    </el-pagination>
                  </div>
                </div>
              </div>
              <div class="form_tips" v-if="!show">
                <p>文件说明：</p>
                <p>
                  1.请下载督导人员：<a
                    href="https://skill-identification.obs.cn-southwest-2.myhuaweicloud.com/online/%E7%9D%A3%E5%AF%BC%E4%BA%BA%E5%91%98%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx"
                    >督导人员模板.xlsx</a
                  >
                  ,根据模板中提示进行填写；
                </p>
                <p>2.填写模板中所有提示必须填写后将文档进行上传；</p>
                <p>3.只支持Excel文件，文件不超过1000行</p>
                <div style="overflow: hidden; margin-top: 40px">
                  <div class="import_but">
                    <el-upload
                      class="upload-demo"
                      action="http://116.63.172.55:8089/online/personnel/importPersonnel"
                      :headers="headers"
                      :auto-upload="true"
                      :show-file-list="true"
                      :on-success="handleSuccess"
                      accept=".xlsx,.xls"
                      :data="data4"
                    >
                      <el-button size="small" type="primary">导入</el-button>
                    </el-upload>
                  </div>
                  <div
                    class="import_but"
                    style="background: #d5d5d5; color: #fff; margin-left: 20px"
                    @click="cancel"
                  >
                    取消
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

    <div>
      <el-dialog
        title="编辑"
        :visible.sync="dialogFormVisible"
        :destroy-on-close="true"
      >
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="姓名" label-width="100px" prop="name">
            <el-input v-model="form.name" size="small"></el-input>
          </el-form-item>
          <el-form-item
            label="证件类型"
            label-width="100px"
            prop="certificatesType"
          >
            <!-- <el-input v-model="form.certificatesType" size="small"></el-input> -->
            <el-select
              v-model="form.certificatesType"
              placeholder="请选择证件类型"
              style="width: 620px"
            >
              <el-option
                v-for="item in certificatesTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="证件号"
            label-width="100px"
            prop="certificatesCode"
          >
            <el-input v-model="form.certificatesCode" size="small"></el-input>
          </el-form-item>
          <el-form-item label="职务/职称" label-width="100px" prop="title">
            <el-input v-model="form.title" size="small"></el-input>
          </el-form-item>
          <el-form-item label="学历" label-width="100px" prop="education">
            <!-- <el-input v-model="form.education" size="small"></el-input> -->
            <el-select
              v-model="form.education"
              placeholder="请选择学历"
              style="width: 620px"
            >
              <el-option
                v-for="item in educationList"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主要职责" label-width="100px" prop="specialty">
            <el-input v-model="form.specialty" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="dialogBtn">
              <el-button @click="cancels">取 消</el-button>
              <el-button type="primary" @click="confirm('ruleForm')"
                >确 定</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="添加" :visible.sync="Visible" :destroy-on-close="true">
        <el-form :model="formList" :rules="rules" ref="ruleForms">
          <el-form-item label="姓名" label-width="100px" prop="name">
            <el-input v-model="formList.name" size="small"></el-input>
          </el-form-item>
          <el-form-item
            label="证件类型"
            label-width="100px"
            prop="certificatesType"
          >
            <!-- <el-input v-model="form.certificatesType" size="small"></el-input> -->
            <el-select
              v-model="formList.certificatesType"
              placeholder="请选择证件类型"
              style="width: 620px"
            >
              <el-option
                v-for="item in certificatesTypeList"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="证件号"
            label-width="100px"
            prop="certificatesCode"
          >
            <el-input
              v-model="formList.certificatesCode"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item label="职务/职称" label-width="100px" prop="title">
            <el-input v-model="formList.title" size="small"></el-input>
          </el-form-item>
          <el-form-item label="学历" label-width="100px" prop="education">
            <!-- <el-input v-model="form.education" size="small"></el-input> -->
            <el-select
              v-model="formList.education"
              placeholder="请选择学历"
              style="width: 620px"
            >
              <el-option
                v-for="item in educationList"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主要职责" label-width="100px" prop="specialty">
            <el-input v-model="formList.specialty" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="dialogBtn">
              <el-button @click="cancelsa('ruleForms')">取 消</el-button>
              <el-button type="primary" @click="confirma('ruleForms')"
                >确 定</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>

    <div class="lastStep">
      <div style="width: 300px">
        <div class="back_but" @click="lastStep">上一步</div>
        <div class="back_but bottom_but_right" @click="add">下一步</div>
      </div>
    </div>
  </div>
</template>

<style type="text/css" scoped>
@import "../assets/css/team_info.css";
.dropdown {
  color: #fff;
  font-size: 12px;
}
.btn {
  margin: 15px 0;
}
.inpt {
  width: 300px;
  padding-left: 20px;
}
.lastStep {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  z-index: 10;
}
.dialogBtn {
  text-align: right;
}
.page {
  text-align: right;
  margin: 15px 50px 10px 0;
}
.search {
  display: flex;
  align-items: center;
}
</style>

<script>
import exportMethod from "../utils/method";
import axios from "axios";
export default {
  name: "login",
  data() {
    return {
      headers: {
        Authorization: sessionStorage.getItem("token"),
      },
      data1: {
        personnelType: "1",
      },
      data2: {
        personnelType: "2",
      },
      data3: {
        personnelType: "3",
      },
      data4: {
        personnelType: "4",
      },
      activeName: "1",
      inputa: "",
      inputb: "",
      inputc: "",
      inputd: "",
      tableData: [],
      show: true,

      search: "",
      pageNo: 1,
      pageSize: 5,
      personnelType: "",
      dialogFormVisible: false,
      form: {
        name: "",
        certificatesType: "",
        certificatesCode: "",
        title: "",
        education: "",
        specialty: "",
        personnelType: "",
      },
      rules: {
        name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        certificatesType: [
          { required: true, message: "证件类型不能为空", trigger: "blur" },
        ],
        certificatesCode: [
          { required: true, message: "证件号不能为空", trigger: "blur" },
        ],
        title: [
          { required: true, message: "职务/技能不能为空", trigger: "blur" },
        ],
        education: [
          { required: true, message: "学历不能为空", trigger: "blur" },
        ],
        specialty: [
          { required: true, message: "主要工作职责不能为空", trigger: "blur" },
        ],
      },
      certificatesTypeList: [
        {
          id: 1,
          label: "身份证",
          value: 1,
        },
        {
          id: 2,
          label: "士兵证",
          value: 2,
        },
        {
          id: 3,
          label: "军官证",
          value: 3,
        },
        {
          id: 4,
          label: "警官证",
          value: 4,
        },
        {
          id: 5,
          label: "护照",
          value: 5,
        },
        {
          id: 6,
          label: "港澳台居住证",
          value: 6,
        },
        {
          id: 7,
          label: "港澳台居民身份证",
          value: 7,
        },
        {
          id: 8,
          label: "其他",
          value: 8,
        },
      ],
      educationList: [
        {
          id: 1,
          label: "博士",
          value: 1,
        },
        {
          id: 2,
          label: "硕士",
          value: 2,
        },
        {
          id: 3,
          label: "大学",
          value: 3,
        },
        {
          id: 4,
          label: "大专",
          value: 4,
        },
        {
          id: 5,
          label: "中专",
          value: 5,
        },
        {
          id: 6,
          label: "职高",
          value: 6,
        },
        {
          id: 7,
          label: "技校",
          value: 7,
        },
        {
          id: 8,
          label: "高中",
          value: 8,
        },
        {
          id: 9,
          label: "初中",
          value: 9,
        },
        {
          id: 10,
          label: "小学",
          value: 10,
        },
        {
          id: 11,
          label: "其他",
          value: 11,
        },
      ],
      id: "",
      urla: require("../assets/cha.jpg"),
      urlb: require("../assets/cha.jpg"),
      urlc: require("../assets/cha.jpg"),
      urld: require("../assets/cha.jpg"),
      Visible: false,
      formList: {
        name: "",
        certificatesType: "",
        certificatesCode: "",
        title: "",
        education: "",
        specialty: "",
        personnelType: "",
        id: "",
      },
    };
  },
  created() {
    // this.$api.exportPersonnelList().then(res=>{
    //   console.log(res);
    // })
    // this.exportDepReceRank();
    // axios({
    //     method: 'get',
    //     url: `http://116.63.172.55:8089/online/personnel/exportPersonnelList?personnelType=1`,
    //     responseType: 'blob',
    //     headers:{ 'Authorization': localStorage.getItem('token')}
    // }).then((res) => {
    //   // console.log(res);
    //     const link = document.createElement('a')
    //     let blob = new Blob([res], {type: 'application/vnd.ms-excel'})
    //     console.log(blob);
    //     link.style.display = 'none'
    //     link.href = URL.createObjectURL(blob)
    //     // link.download = res.headers['content-disposition'] //下载后文件名
    //     link.download = 'zxc' //下载的文件名
    //     document.body.appendChild(link)
    //     link.click()
    //     document.body.removeChild(link)
    //     console.log(link);
    // }).catch(error => {
    //     // this.$Notice.error({
    //     //     title: '错误',
    //     //     desc: '网络连接错误'
    //     // })
    //     console.log(error)
    // })
    this.$api
      .findPersonnelByPage({
        search: "",
        pageNo: 1,
        pageSize: 5,
        personnelType: 1,
      })
      .then((res) => {
        // console.log(res);
        if (res.code == 0) {
          this.tableData = res.data;
        }
      });
    this.$api.checkSubmitReview().then((res) => {
      // console.log(res.data);
      if (res.data.oCount > 0) {
        this.urla = require("../assets/chas.jpg");
      }
      if (res.data.JobCount > 0) {
        this.urlb = require("../assets/chas.jpg");
      }
      if (res.data.personnelCount >= 4) {
        this.urlc = require("../assets/chas.jpg");
      }
      if (res.data.programmeCount >= 10) {
        this.urld = require("../assets/chas.jpg");
      }
    });
  },
  methods: {
    add() {
      this.$router.push("/newPlan");
    },
    lastStep() {
      this.$router.push("/add_career");
    },
    handleSuccess(response) {
      // console.log(response);
      if (response.code == 0) {
        this.$message.success(response.msg);
        this.personnelType = this.activeName;
        this.getfindPersonnelByPage();
        this.show = true;
      }
    },
    handleCommand(val) {
      // console.log(val);
    },
    handleClick(tab) {
      //tab切换
      this.search = "";
      this.pageNo = 1;
      this.pageSize = 5;
      // console.log(tab.name);
      this.personnelType = tab.name;
      this.getfindPersonnelByPage();
    },
    getfindPersonnelByPage() {
      //获取信息
      this.$api
        .findPersonnelByPage({
          search: this.search,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          personnelType: this.personnelType,
        })
        .then((res) => {
          // console.log(res);
          if (res.code == 0) {
            this.tableData = res.data;
          }
        });
    },
    searcha() {
      //搜索专职人员
      this.search = this.inputa;
      this.personnelType = this.activeName;
      this.getfindPersonnelByPage();
    },
    searchb() {
      //搜索专家人员
      this.search = this.inputb;
      this.personnelType = this.activeName;
      this.getfindPersonnelByPage();
    },
    searchc() {
      //搜索考评人员
      this.search = this.inputac;
      this.personnelType = this.activeName;
      this.getfindPersonnelByPage();
    },
    searchd() {
      //搜索督导人员
      this.search = this.inputd;
      this.personnelType = this.activeName;
      this.getfindPersonnelByPage();
    },
    handleEdit(index, row) {
      //编辑
      this.form = row;
      this.form.name = row.planName;
      this.id = row.id;
      // console.log(index, row);
      this.dialogFormVisible = true;
    },
    cancels() {
      //取消编辑
      // console.log(111);
      this.dialogFormVisible = false;
    },
    confirm(ruleForm) {
      //确定编辑
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.certificatesTypeList.map((item) => {
            if (item.label == this.form.certificatesType) {
              this.form.certificatesType = item.value;
            }
          });
          this.educationList.map((item) => {
            if (item.label == this.form.education) {
              this.form.education = item.value;
            }
          });
          this.form.id = this.id;
          this.form.personnelType = this.activeName;
          // console.log(this.form);
          this.$api.savePersonnel(this.form).then((res) => {
            // console.log(res);
            if (res.code == 0) {
              this.personnelType = this.activeName;
              this.getfindPersonnelByPage();
              this.dialogFormVisible = false;
              this.$message.success(res.msg);
            }
          });
        } else {
          // console.log('error submit!!');
          this.$message.error("表单填写错误");
          return false;
        }
      });
    },
    handleDel(index, row) {
      //删除
      // console.log(index, row);
      let ids = [];
      ids.push(row.id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$api.delPerson(ids).then((res) => {
            // console.log(res);
            if (res.code == 0) {
              this.personnelType = this.activeName;
              this.getfindPersonnelByPage();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //手动添加
    cancelsa(ruleForms) {
      //取消添加
      this.$refs[ruleForms].resetFields();
      this.Visible = false;
    },
    confirma(ruleForms) {
      //手动确定添加
      this.$refs[ruleForms].validate((valid) => {
        if (valid) {
          // console.log(this.formList);
          this.formList.personnelType = this.activeName;
          this.$api.savePersonnel(this.formList).then((res) => {
            // console.log(res);
            if (res.code == 0) {
              this.$refs[ruleForms].resetFields();
              this.Visible = false;
              this.getfindPersonnelByPage();
              this.$message.success("添加成功");
            }
          });
        } else {
          // console.log('error submit!!');
          this.$message.error("表单填写错误");
          return false;
        }
      });
    },

    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.personnelType = this.activeName;
      this.getfindPersonnelByPage();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.pageNo = val;
      this.personnelType = this.activeName;
      this.getfindPersonnelByPage();
    },
    handleCommand(val) {
      if (val == "a") {
        this.show = false;
      } else if (val == "b") {
        // console.log(111);
        this.Visible = true;
      }
    },
    cancel() {
      this.show = true;
    },
    exportDepReceRank() {
      // console.log(111);
      let myObj = {
        method: "get",
        url:
          "http://116.63.172.55:8089/online/personnel/exportPersonnelList?personnelType=1",
        fileName: "",
        params: "",
      };
      exportMethod(myObj);
    },
  },
  components: {},
};
</script>