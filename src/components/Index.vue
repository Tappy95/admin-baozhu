<template>
	<div class="index-main">
		<div class="index-inner">
			<div class="index-header">
				<h2>宝猪乐园后台管理系统</h2>
				<div class="login-message">
					<span>欢迎 {{realName}} 管理员</span>
					<span class="cutline">|</span>
					<div class="exit"
					  @click="quit"> 退出</div>
				</div>
			</div>
			<div class="index-side">
        <!--<i class="fa fa-gamepad" aria-hidden="true"></i>-->
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
export default {
  data() {
    return {
      powers: [],
      realName: '',
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
      ]
    }
  },
  created() {
    this.realName = getSession('mobileCookie')
    this.getPower()
  },
  methods: {
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
  width: 320px;
}
.login-message .cutline {
  padding-left: 20px;
}
.login-message .exit {
  cursor: pointer;
  padding: 0 40px 0 20px;
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
