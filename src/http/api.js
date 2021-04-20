import http from "./index";
var token = sessionStorage.getItem("token");

export default {
  login({ userName, passWord }) {  //登录
    return http.post("/user/login", {
      userName: userName,
      passWord: passWord
    });
  },
  exportJobList() {
    return http.get('/essential/findBasicInfo', {
      headers: {
        'Authorization': token
      }
    })
  },
  findList(organType) { //评价机构性质
    return http.get(`/nature/findList?organType=${organType}`, {
      headers: {
        'Authorization': token
      }
    })
  },
  chankOrganizationList() {  //所属机构
    return http.get(`/evaluate/findList`, {
      headers: {
        'Authorization': token
      }
    })
  },
  addInformation({ type, oType, oAttribute, oNature, oName, socialCreditCode, address, contactName, contactPhone, duties, email, centerCode, orgCode }) {    //备案管理基本信息保存
    return http.post(`/essential/addInformation`, {
      type: type,
      oType: oType,
      oAttribute: oAttribute,
      oNature: oNature,
      oName: oName,
      socialCreditCode: socialCreditCode,
      address: address,
      contactName: contactName,
      contactPhone: contactPhone,
      duties: duties,
      email: email,
      centerCode: centerCode,
      orgCode: orgCode
    },
      {
        headers: {
          'Authorization': token
        }
      })
  },
  findOccupationList() {  //查询职业工种
    return http.get('/occupation/findOccupationList', {
      headers: {
        'Authorization': token
      }
    })
  },
  addJobInfo({ jobId, level, jobType, jobStandards, id }) {  //保存职业信息
    return http.post(`/job/addJobInfo`, {
      jobId: jobId,
      level: level,
      jobType: jobType,
      jobStandards: jobStandards,
      id: id
    },
      {
        headers: {
          'Authorization': token
        }
      })
  },
  getCos() {
    return http.get('manager/common/getCos/wj-1303870608/ap-chengdu')
  },
  findOrganInfo() {  //查询备案
    return http.get('/essential/findOrganInfo')
  },
  findRecord({ type, status, pageNo, pageSize }) {  //查询备案记录
    return http.get(`/essential/findRecord?type=${type}&status=${status}&pageNo=${pageNo}&pageSize=${pageSize}`)
  },
  findBasicInfo() {  //查询备案基本信息
    return http.get('/essential/findBasicInfo')
  },
  findJobInfo({ pageNo, pageSize }) {   //查询备案职业信息
    return http.get(`/job/findJobList?pageNo=${pageNo}&pageSize=${pageSize}`, {
      headers: {
        'Authorization': token
      }
    })
  },
  delOccupation(ids) {
    return http.post('/job/delJobInfo', ids)
  },

  importPersonnel(fileinput) {
    return http.post('/personnel/importPersonnel', {
      personnelType: '1',
      fileinput: fileinput
    },
      {
        headers: {
          'Authorization': token
        }
      }
    )
  },
  submitReview() {  //提交
    return http.post('/essential/submitReview', {},
      {
        headers: {
          'Authorization': token
        }
      })
  },
  findProgrammeByPage() {
    return http.get('/programme/findProgrammeByPage?pageNo=1&pageSize=5')
  },
  exportPersonnelList() {
    return http.get('/personnel/exportPersonnelList?personnelType=1',
      {
        headers: {
          'Authorization': token
        }
      })
  },
  importProgramme(list) {
    return http.post('/programme/importProgramme', list)
  },
  findPersonnelByPage({ search, pageNo, pageSize, personnelType }) {  //查询人员队伍信息
    if (search) {
      return http.get(`/personnel/findPersonnelByPage?search=${search}&pageNo=${pageNo}&pageSize=${pageSize}&personnelType=${personnelType}`)
    } else {
      return http.get(`/personnel/findPersonnelByPage?pageNo=${pageNo}&pageSize=${pageSize}&personnelType=${personnelType}`)
    }
  },
  delPerson(ids) {  //删除人员队伍信息
    return http.post('/personnel/delPerson', ids)
  },
  savePersonnel({ name, certificatesType, certificatesCode, title, education, specialty, personnelType, id }) {  //编辑保存人员信息
    return http.post('/personnel/savePersonnel', {
      name: name,
      certificatesType: certificatesType,
      certificatesCode: certificatesCode,
      title: title,
      education: education,
      specialty: specialty,  //specialty
      personnelType: personnelType,
      id: id
    })
  },
  getScheme({ pageNo, pageSize }) {  //查询方案计划
    return http.get(`/programme/findProgrammeByPage?pageNo=${pageNo}&pageSize=${pageSize}`)
  },
  delProgramme(ids) { //删除方案计划
    return http.post('/programme/delProgramme', ids)
  },
  checkSubmitReview() {
    return http.get('/essential/isSubmitReview')
  },
  //考试

  refusePlan(list) {  //拒绝计划
    return http.post('/plan/refusePlan', list)
  },
  affirmSubmit(ids) { //提交计划
    return http.post('/plan/submitPlan', ids)
  },

  //考试题库
  findQustionBanks({ jobId, level }) {   //选择关联教材
    return http.get(`/teachingMaterial/findTeachingList?jobId=${jobId}&level=${level}`)
  },
  addQustionBanks({ id, jobId, level, topicType, teachingId, keyword, status, stem, options, answer, isSynchro, keywordAnswer, practiceId }) {  //保存考试题
    return http.post('/questionBank/saveQustionBanks', {
      id: id,//编辑室可上传
      jobId: jobId,//职业工种id
      level: level, //职业等级
      topicType: topicType,//试题类型
      teachingId: teachingId,//关联教材
      keyword: keyword, // 关键字
      status: status,//试题状态
      stem: stem, //题干
      options: options, //选项json
      answer: answer, //答案
      isSynchro: isSynchro,//同步至练习库
      keywordAnswer: keywordAnswer, //简单题的正确答案关键字 ,隔开
      practiceId: practiceId //练习题库的id 编辑时传
    })
  },
  getTestQuestion({ jobId, level, keyword, status, teachingId, topicType, pageNo, pageSize }) { //查询考试题库列表
    return http.get(`/questionBank/findQustionBanks?jobId=${jobId}&level=${level}&keyword=${keyword}&status=${status}&teachingId=${teachingId}&topicType=${topicType}&pageNo=${pageNo}&pageSize=${pageSize}`)
  },
  delQuestions({ id, topicType }) {  //删除考试题
    return http.get(`/questionBank/delQuestions?id=${id}&topicType=${topicType}`)
  },
  updateStatus({ id, topicType, status }) { //修改考试题状态
    return http.get(`/questionBank/updateStatus?id=${id}&topicType=${topicType}&status=${status}`)
  },
  getPascalDetails({ id, topicType }) {  //获取试题详情
    return http.get(`/questionBank/findQustionbyId?id=${id}&topicType=${topicType}`)
  },
  //练习题库
  saveQustionBanks({ id, jobId, level, topicType, teachingId, keyword, status, stem, options, answer, isSynchro, keywordAnswer, practiceId, examId }) {
    return http.post('/practiceBank/saveQustionBanks', {
      id: id,//编辑室可上传
      jobId: jobId,//职业工种id
      level: level, //职业等级
      topicType: topicType,//试题类型
      teachingId: teachingId,//关联教材
      keyword: keyword, // 关键字
      status: status,//试题状态
      stem: stem, //题干
      options: options, //选项json
      answer: answer, //答案
      isSynchro: isSynchro,//同步至练习库
      keywordAnswer: keywordAnswer, //简单题的正确答案关键字 ,隔开
      examId: examId,//考试题库的id，编辑时上传
    })
  },
  getTestQuestiona({ jobId, level, keyword, status, teachingId, topicType, pageNo, pageSize }) { //查询考试题库列表
    return http.get(`/practiceBank/findQustionBanks?jobId=${jobId}&level=${level}&keyword=${keyword}&status=${status}&teachingId=${teachingId}&topicType=${topicType}&pageNo=${pageNo}&pageSize=${pageSize}`)
  },
  updateStatusa({ id, topicType, status }) { //修改练习考试题状态
    return http.get(`/practiceBank/updateStatus?id=${id}&topicType=${topicType}&status=${status}`)
  },
  delQuestionsa({ id, topicType }) {  //删除考试题
    return http.get(`/practiceBank/delQuestions?id=${id}&topicType=${topicType}`)
  },
  getPascalDetailsa({ id, topicType }) {  //获取试题详情
    return http.get(`/practiceBank/findQustionbyId?id=${id}&topicType=${topicType}`)
  },
  getJobfindJob() { //查询职业下拉列表
    return http.get('/job/findJob')
  },
  //题库配置
  saveTeaching({ jobId, level, teachName, id }) {  //保存新增教材
    return http.post('/teachingMaterial/saveTeaching', {
      jobId: jobId, //职业工种id
      level: level,  //职业工种等级
      teachName: teachName, //教材名称
      id: id,   //编辑时上传
    })
  },
  getTextbook({ jobId, level, teachName, pageNo, pageSize }) {  //查询教材列表
    return http.get(`/teachingMaterial/findTeachingByPage?jobId=${jobId}&level=${level}&teachName=${teachName}&pageNo=${pageNo}&pageSize=${pageSize}`)
  },
  delTeaching(id) { //删除教材
    return http.get(`/teachingMaterial/delTeaching?id=${id}`)
  },
  getTeachingByPage({ pageNo, pageSize }) {  //查询职业工种教材分页列表
    return http.get(`/occupation/findTeachingByPage?pageNo=${pageNo}&pageSize=${pageSize}`)
  },
  saveOccupation({ jobName, jobCode, id }) {  //保存(编辑)职业工种
    return http.post('/occupation/saveOccupation', {
      jobName: jobName,  //工种名称
      jobCode: jobCode, //工种编码
      id: jobCode  //编辑时传id
    })
  },
  delCraft(id) {  //删除工种
    return http.get(`/occupation/delOccupation?id=${id}`)
  },

  //考务管理
  addPlan({ planName, jobId, level, candidatesNumber, startTime, endTime, duration, remarks }) {  //编辑保存计划
    return http.post('/plan/addPlan', {
      planName: planName, //计划名称
      jobId: jobId, //考试职业
      level: level, //计划等级
      candidatesNumber: candidatesNumber, //考试人数
      startTime: startTime, //开始考试时间
      endTime: endTime, //结束考试时间
      duration: duration, //考试时长
      remarks: remarks, // 备注
    })
  },
  getQueryPlan({ search, status, pageNo, pageSize }) {  //查询计划列表
    return http.get(`/plan/findPlanListByPage?search=${search}&status=${status}&pageNo=${pageNo}&pageSize=${pageSize}`)
  },
  delPlan(ids) {  //删除计划
    return http.post('/plan/delPlan', ids)
  },
  cancelPlan(id){  //撤销计划 计划作废
return http.post('/plan/cancelPlan',{
  id:id
})
  }
}