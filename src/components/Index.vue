<template>
	<div class="index-main">
		<div class="index-inner">
			<div class="index-header">
				<h2>宝猪乐园后台管理系统</h2>
				<div class="login-message">
					<span>欢迎 {{realName}} 管理员</span>
					<span class="cutline">|</span>
					<div class="exit"
					  @click="editPw"> 修改密码</div>

          <span class="cutline">|</span>
          <div class="exit"
               @click="quit"> 退出</div>
				</div>
			</div>


      <el-dialog title="修改密码" :visible.sync="dialogFormVisible" width="600px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="旧密码:" :label-width="formLabelWidth" prop="oldPassword">
          <el-input style="width: 240px" type="password" show-password v-model="form.oldPassword" auto-complete="off"  clearable>
          </el-input>
        </el-form-item>
        <el-form-item label="新密码:" prop="password" :label-width="formLabelWidth">
          <el-input style="width: 240px" show-password type="password"  v-model="form.password" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:" prop="mitPassword" :label-width="formLabelWidth">
          <el-input style="width: 240px" type="password"  show-password v-model="form.mitPassword" auto-complete="off" clearable></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addBtn('form')">确 定</el-button>
      </div>
    </el-dialog>
			<div class="index-side">
				<el-menu class="el-menu-vertical"
				  background-color="rgb(50, 65, 87)"
				  text-color="#fff"
				  active-text-color="#ffd04b" style="border-right: 0;">
          <el-submenu v-for="(item,index) in powers" :key="item.id" :data=powers power :index="index+''">
            <template slot="title"><i v-bind:class="item.icon"></i>{{item.name}}</template>
            <el-menu-item v-for="items in item.rightCollections" :key="items.id" :index="items.url" v-on:click="pushPage(items.fileName,items.id)">{{items.name}}</el-menu-item>
          </el-submenu>
				</el-menu>
			</div>
			<div class="router-show">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
import { delSession, getSession } from '../utils/cookie'
import md5 from 'js-md5'
export default {
  data() {
    return {
      dialogFormVisible:false,
      powers: [],
      realName: '',
      adminId:'',
      menus: [
        {
          rightName: '',
          rightUrl: '',
          rightCode: '',
          id: '',
          secondRight: [
            {
              rightName: '',
              rightUrl: '',
              rightCode: '',
              id: ''
            }
          ]
        }
      ],
      form: {},
      mitPassword:'',
      role:[],
      rules: {
        password: [{
          required: true,
          message: '请输入新密码',
          trigger: 'blur'
        }],
        oldPassword: [{
          required: true,
          message: '请输入旧密码',
          trigger: 'blur'
        }],
        mitPassword: [{
          required: true,
          message: '请输入确认新密码',
          trigger: 'blur'
        }],
      },
      formLabelWidth: '120px',
    }
  },
  created() {
    this.realName = getSession('mobileCookie')
    this.getPower()
  },
  methods: {
    //修改密码
    editPw() {
      this.dialogFormVisible = true;
      this.form = {};
    },

    addBtn(form) {
      if (this.form.password != this.form.mitPassword) {
        this.$message({
          type: 'error',
          message: '请确认新密码和确认新密码一致'
        })
        return
      }

      this.form.adminId = getSession("adminId");
      this.form.password = md5(this.form.password);
      this.form.oldPassword = md5(this.form.oldPassword);
      this.form.mitPassword = md5(this.form.mitPassword);

      this.$refs[form].validate(valid => {
        if(valid) {
          this.$post('/api/pAdmin/updatePassword', this.form).then(res => {
            if ((res.statusCode+"").startsWith("2")) {
              this.dialogFormVisible = false;
              this.$message({
                type: 'success',
                message: '修改成功！'
              })
            } else {
              this.$message({
                type: 'error',
                message: res.message
              })
            }
          })
        } else {}
      })
    },

    //退出
    quit() {
      this.$confirm('您确定要退出吗?', '退出管理平台', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(() => {
          this.$fetch('/api/pAdmin/quit').then(res => {
            this.$router.push({ path: '/' })
            delSession('token')
            delSession('authSize')
          })
        })
        .catch(() => {})
    },
    pushPage(rightUrl,id) {
      this.$router.push({
        name: rightUrl,
        query:{
          id:id
        }
      })
    },
    getPower(){
      let myauth = getSession("authSize");
      this.powers = JSON.parse(myauth)
    },
    handleOpen(key, keyPath) {
    },
    handleClose(key, keyPath) {
    }
  }
}
</script>
<style type="text/css">
.router-show {
  margin-left: 230px;
  padding-top: 60px;
}
.index-main {
  width: 100%;
}
.index-header {
  width: 100%;
  height: 60px;
  background-color: #242f42;
  color: #fff;
  text-align: center;
  z-index: 10;
  position: fixed;
}
.login-message {
  float: right;
  position: relative;
  top: -40px;
  display: flex;
  width: 370px;
}
.login-message .cutline {
  padding-left: 10px;
}
.login-message .exit {
  cursor: pointer;
  padding: 0 10px 0 10px;
}
.index-header h2 {
  /*width: 500px;*/
  margin: 0 auto;
  text-align: left;
  /*padding: 0 300px;*/
  padding-left: 22px;
  line-height: 60px;
  vertical-align: middle;
}
.index-side {
  background-color: rgb(50, 65, 87);
  width: 230px;
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  z-index: 2;
  overflow-y: scroll;
  overflow-x: hidden;
}
.index-main {
  height: 100%;
  width: 100%;
}
.index-inner {
  overflow: hidden;
  height: 100%;
  width: 100%;
}
.index-side::-webkit-scrollbar {
  width: 16px;
  height: 16px;
  background-color: #f5f5f5;
}
.index-side::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  -moz-border-radius: 10px;
}
.index-side:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  -moz-border-radius: 10px;
}
.index-side::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
.index-side::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: white;
}
.index-side::-webkit-scrollbar-track:hover {
  background-color: rgba(0, 0, 0, 0.01);
}
</style>
