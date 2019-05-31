<template>
	<div class="login-main">
		<div class="login-inner">
			<div class="login-header">
				<h2>宝猪乐园后台管理系统</h2>
			</div>
			<div class="login-content">
				<h3>登录</h3>
				<el-form :model="ruleForm"
				    :rules="rules"
				    ref="ruleForm"
				    class="demo-ruleForm" @keyup.enter.native="submitForm('ruleForm')">
					<el-form-item prop="mobile">
						<i><img src="../assets/user.png"></i>
						<el-input v-model="ruleForm.mobile"
						    placeholder="请输入手机号码"
						    style="width:70%;margin-left: 10px;"></el-input>
					</el-form-item>
					<el-form-item prop="password">
						<i><img src="../assets/code.png"></i>
						<el-input type="password" v-model="ruleForm.password"
						    placeholder="请输入密码"
						    style="width:70%;margin-left: 10px;" ></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"
						    @click="submitForm('ruleForm')">登录</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import md5 from 'js-md5'

export default {
  data() {
    return {
      buttonName: '获取验证码',
      isDisbled: false,
      name: 'LogIn',
      roleType:'',
      ruleForm: {
        mobile: '',
        password: ''
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var sign =
            'moblie:' + this.ruleForm.mobile + '|captch:' + this.ruleForm.password
          var md5Sign = md5(this.ruleForm.password)
          var fromData = {
            sign: md5Sign,
            mobile: this.ruleForm.mobile,
            password: md5(this.ruleForm.password)
          }
          this.$setSession('sign', md5Sign)
          this.$fetch("/api/pAdmin/login", fromData).then(res => {
            if ((res.statusCode+"").startsWith("2")) {
              this.roleType = res.data.channelCode;
              this.$setSession('channelCode', res.data.channelCode);
              this.$setSession('adminId', res.data.adminId);
              this.$setSession('token', res.token);
              this.$setSession('mobileCookie', res.data.mobile);
              this.$setSession('roleName', res.data.roleName);

              this.$setSession('userRelation', res.data.userRelation)

              let parameterData = {
                token: res.token
              }
              this.$fetch("/api/pMenu/queryMenu", parameterData).then(res => {
                if ((res.statusCode+"").startsWith("2")) {
                    let login = JSON.stringify(res.data);
                    // console.log(res.data)
                    let n=0;
                    for (var i=0;i<res.data.length;i++) {
                      if(res.data[i].fileName=="首页"){
                         n++;
                         break;
                      }
                    }
                    this.$setSession("authSize", login);
                    //宝猪跳转数据统计页
                    if (this.roleType=='baozhu' && n>0){
                      this.$router.push({
                        name: 'Statistics'
                      })
                    }else {//渠道商跳转默认页
                      this.$router.push({
                        name: 'Index'
                      })
                    }
                }
              })
            } else {
              this.$message({ type: 'error', message: res.message })
            }
          })
        }
      })
    },
    getExplorerInfo() {
      var explorer = window.navigator.userAgent.toLowerCase()
      //ie
      if (explorer.indexOf('msie') >= 0) {
        var ver = explorer.match(/msie ([\d.]+)/)[1]
        return { type: 'IE', version: ver }
      } else if (explorer.indexOf('firefox') >= 0) {
        var ver = explorer.match(/firefox\/([\d.]+)/)[1]
        return { type: 'Firefox', version: ver }
      } else if (explorer.indexOf('chrome') >= 0) {
        var ver = explorer.match(/chrome\/([\d.]+)/)[1]
        return { type: 'Chrome', version: ver }
      } else if (explorer.indexOf('opera') >= 0) {
        var ver = explorer.match(/opera.([\d.]+)/)[1]
        return { type: 'Opera', version: ver }
      } else if (explorer.indexOf('Safari') >= 0) {
        var ver = explorer.match(/version\/([\d.]+)/)[1]
        return { type: 'Safari', version: ver }
      }
    }
  }
}
</script>
<style type="text/css">
.login-main {
  width: 100%;
  height: 100%;
  text-align: center;
  background-color: #222b38;
  position: fixed;
}
.login-inner {
  width: 100%;
  height: 100%;
}
.login-header {
  display: flex;
  width: 260px;
  margin: 0 auto;
  position: relative;
  top: 220px;
  padding: 0 100px;
}

.login-header h2 {
  color: #fff;
}
.login-content {
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 320px;
  width: 500px;
  border: 2px solid #e6e6e6;
  margin: 0 auto;
  padding: 20px;
}
.login-content img {
  width: 35px;
  height: 35px;
  vertical-align: middle;
}
</style>
