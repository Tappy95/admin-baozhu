<template>
  <div>
    <div class="mobilepage-head">
      <img :src='bankDatas.cardLogo'
        style="width: 120px;height:60px">
      <div>
        <h2>{{bankDatas.cardName}}</h2>
        <ul class="head_Label">
          <li>{{bankDatas.coinsType}}</li>
          <li>{{bankDatas.level}}</li>
        </ul>
      </div>
    </div>
    <div class="mobilepage-main">
      <div class="mobilepage-content">
        <div class="content_text">
          <div></div>
          <h2>专享特权</h2>
          <div style="clear:both; display:none"></div>
        </div>
        <div class="Line"></div>
        <div class="content_text">{{bankDatas.privilegeRemark}}</div>
        <div class="Line3"></div>
      </div>

      <div class="mobilepage-content">
        <div class="content_text">
          <div></div>
          <h2>基本信息</h2>
          <div style="clear:both; display:none"></div>
        </div>
        <div class="Line"></div>
        <div class="content_text">等级
          <span>{{bankDatas.level}}</span>
        </div>
        <div class="Line"></div>
        <div class="content_text">币种
          <span>{{bankDatas.coinsType}}</span>
        </div>
        <div class="Line"></div>
        <div class="content_text">发卡组织
          <span>{{bankDatas.belongsOrganization}}</span>
        </div>
        <div class="Line3"></div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'MobilePage',
  data() {
    return {
      bankDatas: {
        cardLogo: '',
        cardName: '',
        coinsType: '',
        level: '',
        privilegeRemark: '',
        belongsOrganization: ''
      },
      isPrivilege: ''
    }
  },
  created() {
    let id = this.$route.query.id
    this.accountList(id)
  },
  methods: {
    accountList(id) {
      this.$fetch('/api/moduleCreditcard/' + id).then(res => {
        if (res.statusCode == 2000) {
          if (res.data.coinsType == '1') {
            res.data.coinsType = '人民币'
          } else {
            res.data.coinsType = '多币种'
          }
          if (res.data.level == '1') {
            res.data.level = '普卡'
          } else if (res.data.level == '2') {
            res.data.level = '金卡'
          } else if (res.data.level == '3') {
            res.data.level = '白金卡'
          } else if (res.data.level == '4') {
            res.data.level = '钻石卡'
          } else {
            res.data.level = '黑卡'
          }
          if (res.data.belongsOrganization == '1') {
            res.data.belongsOrganization = '银联'
          } else if (res.data.belongsOrganization == '2') {
            res.data.belongsOrganization = 'Visa'
          } else {
            res.data.belongsOrganization = 'Master'
          }
          if (res.data.isPrivilege == '0') {
            res.data.privilegeRemark = '没有特权'
          }
          this.bankDatas = res.data
        }
      })
    }
  }
}
</script>
<style>
.mobilepage-head {
  height: 5.7rem;
  background: #376eca;
}
.mobilepage-head img {
  max-width: 100%;
  float: left;
  width: 5.9rem;
  margin-top: 0.8rem;
  margin-left: 1.6rem;
  border: 0;
  display: block;
}
.mobilepage-head div h2 {
  font-size: 0.8rem;
  color: #fff;
  float: left;
  margin-left: 2rem;
  margin-top: 0.8rem;
  width: 11rem;
  word-break: break-all;
  margin-bottom: 0.1rem;
}
.head_Label {
  float: left;
  width: 8.1rem;
  margin: 0;
  padding-left: 2rem;
}
.head_Label li {
  border: 1px solid #fff;
  float: left;
  padding: 0.1rem 0.2rem;
  display: block;
  color: #fff;
  font-weight: 300;
  margin-right: 0.4rem;
  margin-top: 0.4rem;
  border-radius: 0.2rem;
  font-size: 0.6rem;
}
.mobilepage-main {
  clear: both;
}
.mobilepage-main .mobilepage-content .content_text {
  margin-left: 1.2rem;
  color: #757575;
  font-size: 0.7rem;
  padding: 0.7rem 0;
  margin-right: 1.2rem;
}
.mobilepage-main .mobilepage-content div h2 {
  font-size: 0.8rem;
  line-height: 0.8rem;
  color: #212121;
}
.mobilepage-main .mobilepage-content div div {
  width: 0.4rem;
  height: 0.8rem;
  background: #376eca;
  display: block;
  float: left;
  border-radius: 0.1rem;
  margin-right: 0.4rem;
  margin-left: 0;
  margin-top: 0.6rem;
}
.mobilepage-main .mobilepage-content .Line {
  width: 100%;
  height: 1px;
  background: #eaf0f7;
  margin-left: 0;
}
.mobilepage-main .mobilepage-content .Line3 {
  width: 100%;
  height: 0.4rem;
  background: #eaf0f7;
  margin-left: 0;
}
.content_text span {
  float: right;
  color: #bababa;
}
</style>


