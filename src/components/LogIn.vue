<template>
	<div class="login-main">
		<div class="login-inner">
			<div class="login-header">
				<h2>宝猪乐园后台管理系统</h2>
			</div>
			<div class="login-content ku">
				<!--<h3 class="login-dl">后台登录</h3>-->
				<el-form :model="ruleForm"
				    :rules="rules"
				    ref="ruleForm"
				    class="demo-ruleForm" @keyup.enter.native="submitForm('ruleForm')">
					<el-form-item prop="mobile">
            <span class="i-span">用户名:</span>
            <!--<i class="fa fa-user-circle-o" aria-hidden="true"></i>-->
						<!--<i><img src="../assets/user.png"></i>-->
						<el-input  v-model="ruleForm.mobile"
						    placeholder="请输入手机号码"
						    style="width:70%;margin-left: 10px;">
              <i slot="prefix" class="el-input__icon fa fa-user-o"></i>
            </el-input>
					</el-form-item>
					<el-form-item prop="password" >
            <span class="i-span">密&nbsp; &nbsp; 码:</span>
						<!--<i><img src="../assets/code.png"></i>-->
						<el-input type="password" v-model="ruleForm.password"
						    placeholder="请输入密码"
						    style="width:70%;margin-left: 10px;" >
              <i slot="prefix" class="el-input__icon fa fa-key"></i>
            </el-input>
					</el-form-item>
					<el-form-item>
            <el-button class="login-btn"  @click="submitForm('ruleForm')">登&nbsp;录
            </el-button>
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

  .login-dl{
    color: #222b38;
  }
  .login_i{
    padding-left:5px;
  }
  .i-span{
    font-size: 14px;
    /*color: #c0c4cc;*/
    color: #7c7d80;
  }

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
  top: 180px;
  padding: 0 100px;
}

  .login-btn {
    width: 150px;
    height: 40px;
    color: #fff;
    /*border-bottom: 4px solid #6683b9;*/
    border-bottom: 4px solid #98B3E2;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    border-radius: 5px;
    margin: 0 auto;
    line-height: 40px;
    padding: 0;
    transition: all 0.35s;
    outline: none;
    /*background: #6e8ec9;*/
    background: #A3BAE4;
    /*background: linear-gradient(to right, #84d9d2, #07cdae);*/
  }

  .login-btn:hover{
    background-color:#A3BAE4;
    color: #fff;
    border: 1px solid transparent;
    border-bottom:0px solid transparent;
    outline: none;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .login-header h2 {
  color: #fff;
  }

  .ku .el-form-item__error{
    left: 100px;
  }
.login-content {
  background-color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 320px;
  width: 450px;
  border: 2px solid #e6e6e6;
  margin: 0 auto;
  padding: 70px 20px 30px 20px;
}
.login-content img {
  width: 35px;
  height: 35px;
  vertical-align: middle;
}
</style>
