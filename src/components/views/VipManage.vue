<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>运营管理/vip管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="vip名称">
            <el-input v-model="formInline.name" placeholder="请输入vip名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="formInline.status" placeholder="请选择状态">
              <el-option label="启用" value="1"></el-option>
              <el-option label="停用" value="2"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain v-if="add" @click="load()">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" style="width: 100%" height="600"  >
            <el-table-column fixed="left" label="序号" type="index" :index="indexMethod" width='120'>
            </el-table-column>
            <el-table-column fixed="left" min-width="150" prop="name" label="vip名称">
            </el-table-column>
            <el-table-column min-width="150" label="logo">
              <template slot-scope="scope">
                <img :src='scope.row.logo'
                     style="max-width: 45px;max-height: 45px;"
                     @click="clickImg($event)">
              </template>
            </el-table-column>
            <el-table-column min-width="170px" prop="gameAddition" label="游戏加成(%)">
            </el-table-column>
            <el-table-column prop="useDay" min-width="170" label="有效期(单位:天)">
            </el-table-column>
            <el-table-column min-width="170" prop="price" label="售价(￥)">
            </el-table-column>
            <el-table-column min-width="150" prop="status" label="是否可用">
            </el-table-column>

            <el-table-column min-width="170" prop="coinToPigAddition" label="金币兑换金猪加成(%)">
            </el-table-column>
            <el-table-column min-width="80" prop="orderId" label="等级">
            </el-table-column>
            <el-table-column min-width="170" prop="createTime" :formatter="dateFormat" label="修改时间">
            </el-table-column>

            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain @click="getOne(scope.row.id)" size="mini">详情</el-button>
                <el-button type="warning" plain size="mini" v-if="del" @click="Delete(scope.row.id)">删除</el-button>
                <el-button type="success" plain v-if="upd" @click="getInfo(scope.row.id)" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <el-dialog title="添加vip" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="vip名称:" :label-width="formLabelWidth" prop="name">
                  <el-input v-model="form.name" auto-complete="off" style="width: 187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="售价:" :label-width="formLabelWidth" prop="price">
                  <el-input v-model="form.price" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <div style="width: 100%;float: left;">
                  <el-col :span="24" style="margin-bottom: 10px">
                    <el-form-item label="等级排序(值越大等级越高):" label-width="190px" prop="orderId">
                      <el-input v-model="form.orderId" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                      </el-input>
                    </el-form-item>
                  </el-col>
              </div>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="首充奖励:" :label-width="formLabelWidth" prop="firstReward">
                  <el-input v-model="form.firstReward" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="首充奖励类型:" :label-width="formLabelWidth" prop="firstRewardUnit">
                  <el-select style="width: 187px" v-model="form.firstRewardUnit" placeholder="">
                    <el-option label="金币" value="1"></el-option>
                    <el-option label="金猪" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="续充奖励:" :label-width="formLabelWidth" prop="continueReward">
                  <el-input v-model="form.continueReward" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="续充奖励类型:" :label-width="formLabelWidth" prop="continueRewardUnit">
                  <el-select style="width: 187px" v-model="form.continueRewardUnit" placeholder="">
                    <el-option label="金币" value="1"></el-option>
                    <el-option label="金猪" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="游戏加成（%）:" :label-width="formLabelWidth" prop="gameAddition">
                  <el-input v-model="form.gameAddition" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="有效期(单位/天):" :label-width="formLabelWidth" prop="useDay">
                  <el-input v-model="form.useDay" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="每日活跃奖励金猪:" :label-width="formLabelWidth" prop="everydayActivePig">
                  <el-input v-model="form.everydayActivePig" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="每日活跃奖励金币:" :label-width="formLabelWidth" prop="everydayActiveCoin">
                  <el-input v-model="form.everydayActiveCoin" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="兑换是否优先审核:" :label-width="formLabelWidth" prop="auditFirst">
                  <el-select v-model="form.auditFirst" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="兑换是否短信提醒:" :label-width="formLabelWidth" prop="sendSms">
                  <el-select v-model="form.sendSms" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="每日救济金猪:" :label-width="formLabelWidth" prop="everydayReliefPig">
                  <el-input v-model="form.everydayReliefPig" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="救济金猪每日领取次数:" :label-width="formLabelWidth" prop="everydayReliefPigTimes">
                  <el-input v-model="form.everydayReliefPigTimes" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="是否一元提现:" :label-width="formLabelWidth" prop="oneWithdrawals">
                  <el-select v-model="form.oneWithdrawals" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="是否可用:" :label-width="formLabelWidth" prop="status">
                  <el-select v-model="form.status" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="单笔限额（金猪）:" :label-width="formLabelWidth" prop="onetimeLimit">
                  <el-input v-model="form.onetimeLimit" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="金币兑换金猪加成(%):" :label-width="formLabelWidth" prop="coinToPigAddition">
                  <el-input v-model="form.coinToPigAddition " min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="logo:"
                          prop="imageUrl"
                          :label-width="formLabelWidth">
              <el-upload class="bannerAvatar-uploader"
                         action="/api/upload"
                         :data="uploadData"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl"
                     :src="imageUrl"
                     class="avatar">
                <i v-else
                   class="el-icon-plus bannerAvatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改vip" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                  <el-form-item label="vip名称:" :label-width="formLabelWidth" prop="name">
                    <el-input v-model="formtwo.name" auto-complete="off" style="width: 187px" clearable>
                    </el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="售价:" :label-width="formLabelWidth" prop="price">
                  <el-input v-model="formtwo.price" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <div style="width: 100%;float: left;">
                <el-col :span="24" style="margin-bottom: 10px">
                  <el-form-item label="等级排序(值越大等级越高):" :label-width="formLabelWidth" prop="orderId">
                    <el-input v-model="formtwo.orderId" min="0" type="number" auto-complete="off" style="width:187px" clearable>
                    </el-input>
                  </el-form-item>
                </el-col>
              </div>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="首充奖励:" :label-width="formLabelWidth" prop="firstReward">
                  <el-input v-model="formtwo.firstReward" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="首充奖励类型:" :label-width="formLabelWidth" prop="firstRewardUnit">
                  <el-select v-model="formtwo.firstRewardUnit" placeholder="">
                    <el-option label="金币" :value="1"></el-option>
                    <el-option label="金猪" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="续充奖励:" :label-width="formLabelWidth" prop="continueReward">
                  <el-input v-model="formtwo.continueReward" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="续充奖励类型:" :label-width="formLabelWidth" prop="continueRewardUnit">
                  <el-select v-model="formtwo.continueRewardUnit" placeholder="">
                    <el-option label="金币" :value="1"></el-option>
                    <el-option label="金猪" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="游戏加成(%):" :label-width="formLabelWidth" prop="gameAddition">
                  <el-input v-model="formtwo.gameAddition" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="有效期(单位/天):" :label-width="formLabelWidth" prop="useDay">
                  <el-input  v-model="formtwo.useDay" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="每日活跃奖励金猪:" :label-width="formLabelWidth" prop="everydayActivePig">
                  <el-input v-model="formtwo.everydayActivePig" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="每日活跃奖励金币:" :label-width="formLabelWidth" prop="everydayActiveCoin">
                  <el-input v-model="formtwo.everydayActiveCoin" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="兑换是否优先审核:" :label-width="formLabelWidth" prop="auditFirst">
                  <el-select v-model="formtwo.auditFirst" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="兑换是否短信提醒:" :label-width="formLabelWidth" prop="sendSms">
                  <el-select v-model="formtwo.sendSms" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="每日救济金猪:" :label-width="formLabelWidth" prop="everydayReliefPig">
                  <el-input v-model="formtwo.everydayReliefPig" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="救济金猪每日领取次数:" :label-width="formLabelWidth" prop="everydayReliefPigTimes">
                  <el-input v-model="formtwo.everydayReliefPigTimes" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="是否一元提现:" :label-width="formLabelWidth" prop="oneWithdrawals">
                  <el-select v-model="formtwo.oneWithdrawals" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="是否可用:" :label-width="formLabelWidth" prop="status">
                  <el-select v-model="formtwo.status" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="单笔限额(金猪):" :label-width="formLabelWidth" prop="onetimeLimit">
                  <el-input v-model="formtwo.onetimeLimit" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
              <el-form-item label="金币兑换金猪加成(%):" :label-width="formLabelWidth" prop="coinToPigAddition">
                <el-input v-model="formtwo.coinToPigAddition" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                </el-input>
              </el-form-item>
            </el-col>
            </el-row>
            <el-form-item label="logo:"
                          prop="imageUrl"
                          :label-width="formLabelWidth">
              <el-upload class="bannerAvatar-uploader"
                         action="/api/upload"
                         :data="uploadData"
                         :show-file-list="false"
                         :on-success="handleAvatarSuccess"
                         :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl"
                     :src="imageUrl"
                     class="avatar">
                <i v-else
                   class="el-icon-plus bannerAvatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="vip详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo">
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="vip名称:" :label-width="formLabelWidth" prop="name">
                  <el-input :disabled="true" v-model="formtwoInfo.name" auto-complete="off" style="width: 187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="首充奖励:" :label-width="formLabelWidth" prop="firstReward">
                  <el-input :disabled=true v-model="formtwoInfo.firstReward" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-row>
                <el-col :span="24" style="margin-bottom: 10px">
                  <el-form-item label="等级排序(值越大等级越高):" :label-width="formLabelWidth" prop="orderId">
                    <el-input :disabled=true v-model="formtwoInfo.orderId" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="首充奖励类型:" :label-width="formLabelWidth" prop="firstRewardUnit">
                  <el-select :disabled=true v-model="formtwoInfo.firstRewardUnit" placeholder="">
                    <el-option label="金币" :value="1"></el-option>
                    <el-option label="金猪" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="续充奖励:" :label-width="formLabelWidth" prop="continueReward">
                  <el-input :disabled=true v-model="formtwoInfo.continueReward" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="续充奖励类型:" :label-width="formLabelWidth" prop="continueRewardUnit">
                  <el-select :disabled=true v-model="formtwoInfo.continueRewardUnit" placeholder="">
                    <el-option label="金币" :value="1"></el-option>
                    <el-option label="金猪" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="游戏加成(%):" :label-width="formLabelWidth" prop="gameAddition">
                  <el-input :disabled="true" v-model="formtwoInfo.gameAddition" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="有效期(单位/天):" :label-width="formLabelWidth" prop="useDay">
                  <el-input :disabled="true" v-model="formtwoInfo.useDay" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="每日活跃奖励金猪:" :label-width="formLabelWidth" prop="everydayActivePig">
                  <el-input :disabled="true" v-model="formtwoInfo.everydayActivePig" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="每日活跃奖励金币:" :label-width="formLabelWidth" prop="everydayActiveCoin">
                  <el-input :disabled="true" v-model="formtwoInfo.everydayActiveCoin" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="单笔限额(金猪):" :label-width="formLabelWidth" prop="onetimeLimit">
                  <el-input :disabled="true" v-model="formtwoInfo.onetimeLimit" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="兑换是否优先审核:" :label-width="formLabelWidth" prop="auditFirst">
                  <el-select :disabled="true" v-model="formtwoInfo.auditFirst" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="兑换是否短信提醒:" :label-width="formLabelWidth" prop="sendSms">
                  <el-select :disabled="true" v-model="formtwoInfo.sendSms" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="每日救济金猪:" :label-width="formLabelWidth" prop="everydayReliefPig">
                  <el-input :disabled="true" v-model="formtwoInfo.everydayReliefPig" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="救济金猪每日领取次数:" :label-width="formLabelWidth" prop="everydayReliefPigTimes">
                  <el-input :disabled="true" v-model="formtwoInfo.everydayReliefPigTimes" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="是否一元提现:" :label-width="formLabelWidth" prop="oneWithdrawals">
                  <el-select :disabled="true" v-model="formtwoInfo.oneWithdrawals" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="售价:" :label-width="formLabelWidth" prop="price">
                  <el-input :disabled="true" v-model="formtwoInfo.price" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="是否可用:" :label-width="formLabelWidth" prop="status">
                  <el-select :disabled="true" v-model="formtwoInfo.status" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="金币兑换金猪加成(%):" :label-width="formLabelWidth" prop="coinToPigAddition">
                  <el-input :disabled="true" v-model="formtwoInfo.coinToPigAddition" type="number" min="0" auto-complete="off" style="width:187px" clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" style="margin-bottom: 10px">
                <el-form-item label="logo:"
                              prop="imgUrl"
                              :label-width="formLabelWidth">
                  <img :src='formtwoInfo.logo' style="width: 148px;height: 148px;display: block">
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableDetail = false">取 消</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 50, 70]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import { formatDate } from '../../utils/date.js'
  import { delSession, getSession } from '../../utils/cookie'
  import BigImg from './BigImg'
  export default {
    name: 'VipManage',
    data() {
      return {
        showImg:false,
        imgSrc:'',
        uploadData:{},
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        imageUrl: '',
        imgUrl:'',
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {
          noticeTitle: '',
          noticeContent: '',
          password: '',
          isRelease: '1'
        },
        rules: {
          name: [{
            required: true,
            message: '请输入vip名称',
            trigger: 'blur'
          }],
          firstReward: [{
            required: true,
            message: '请输入首充奖励',
            trigger: 'blur'
          }],
          firstRewardUnit: [{
            required: true,
            message: '请选择奖励单位',
            trigger: 'change'
          }],
          continueReward: [{
            required: true,
            message: '请输入续充奖励',
            trigger: 'blur'
          }],
          continueRewardUnit: [{
            required: true,
            message: '请选择续充奖励单位',
            trigger: 'change'
          }],
          gameAddition: [{
            required: true,
            message: '请输游戏加成',
            trigger: 'blur'
          }],
          useDay: [{
            required: true,
            message: '请输入有效天数',
            trigger: 'blur'
          }],
          everydayActivePig: [{
            required: true,
            message: '请输入每日活跃奖励金猪',
            trigger: 'blur'
          }],
          everydayActiveCoin: [{
            required: true,
            message: '请输入每日活跃奖励金币',
            trigger: 'blur'
          }],
          onetimeLimit: [{
            required: true,
            message: '请输入单笔限额',
            trigger: 'blur'
          }],
          auditFirst: [{
            required: true,
            message: '请选择兑换是否优先审核',
            trigger: 'change'
          }],
          sendSms: [{
            required: true,
            message: '请选择是否短信提醒',
            trigger: 'change'
          }],
          everydayReliefPig: [{
            required: true,
            message: '请输入每日救济金猪',
            trigger: 'blur'
          }],
          everydayReliefPigTimes: [{
            required: true,
            message: '请输入救济金猪每日领取次数',
            trigger: 'blur'
          }],
          oneWithdrawals: [{
            required: true,
            message: '请选择是否一元提现',
            trigger: 'change'
          }],
          price: [{
            required: true,
            message: '请输入售价',
            trigger: 'blur'
          }],
          status: [{
            required: true,
            message: '请选择是否可用',
            trigger: 'change'
          }],
          imageUrl: [{
            required: true,
            message: '请选择图片',
            trigger: 'change'
          }],
          orderId: [{
            required: true,
            message: '请输入等级排序',
            trigger: 'blur'
          }],
          coinToPigAddition: [{
            required: true,
            message: '请输入金币兑换金猪加成',
            trigger: 'blur'
          }],
        },
        formLabelWidth: '190px',
        /* 分页*/
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {},
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
      }
    },
    components: {
      'big-img': BigImg
    },
    created() {
      this.menuId=this.$route.query.id
      this.accountList()
      this.queryBtns()
      this.uploadData={
        token:getSession("token")
      }
    },
    methods: {
      clickImg(e) {
        this.showImg = true
        this.imgSrc = e.currentTarget.src
      },
      viewImg() {
        this.showImg = false
      },
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.length - 1; i >= 0; i--) {
            if(res.data[i].btnCode == 'add') {
              this.add=true;
            }
            if(res.data[i].btnCode == 'upd') {
              this.upd=true;
              this.optionW = '160px';
            }
            if(res.data[i].btnCode == 'del') {
              this.del=true;
              this.optionW = '220px';
            }
          }
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
        }
      })
      },
      indexMethod(index) {
        return index * 1 + 1
      },
      dateFormat(row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ''
        }
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
      },
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          name: this.formInline.name,
          status: this.formInline.status
        }
        this.$fetch('/api/mVipInfo/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if(res.data.list[i].status == '1') {
              res.data.list[i].status = '是'
            } else {
              res.data.list[i].status = '否'
            }
          }
          this.tableData = res.data.list
          this.totalCount = res.data.total
        } else {
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
        }
      })
      },
      search() {
        this.currentPage = 1
        this.pageSize = 10
        this.accountList()
      },
      load() {
        this.form={};
        this.formInline = {};
        this.imageUrl='';
        this.dialogFormVisible = true;
      },
      addBtn(form) {
        this.form.imageUrl=this.imageUrl
        this.form.logo=this.imageUrl;
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/api/mVipInfo/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogFormVisible = false
              this.$message({
                type: 'success',
                message: '添加成功！'
              })
              this.accountList()
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
      Delete(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
          this.delData(id)
      })
      .catch(() => {
          this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      },
      delData(id) {
        let parameterData = {
          id: id
        }
        this.$fetch('/api/mVipInfo/remove', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.accountList()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败！'
          })
        }
      })
      },
      getInfo(id) {
        this.imageUrl=''
        this.dialogTableVisible = true
        this.$fetch('/api/mVipInfo/queryOne', {
          id: id
        }).then(res => {
          if(res.data != null ) {
            if ((res.statusCode + "").startsWith("2")) {
              this.formtwo = res.data
              this.imageUrl=res.data.logo
            }
          }
      })
      },
      update(formtwo) {
        this.formtwo.logo=this.imageUrl
        this.$post('/api/mVipInfo/modify', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({
            type: 'success',
            message: '修改成功！'
          })
          this.dialogTableVisible = false
          this.accountList()
        }
      })
      },
      getOne(id){
        this.dialogTableDetail = true
        this.$fetch('/api/mVipInfo/queryOne', {
          id: id
        }).then(res => {
          if (res.data != null) {
            if ((res.statusCode+"").startsWith("2")) {
              res.data.createTime = formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss')
              this.formtwoInfo = res.data
            }
          }
      })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl=res.data
      },
      beforeAvatarUpload(file) {

      },
      handleSizeChange(val) {
        this.pageSize = val
        this.accountList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.accountList()
      },
      toggle: function(value) {
        this.isShow = !this.isShow;
      }
    },

  }
</script>
<style type="text/css">
  .avatar{
     width: 148px;
    height: 148px;
    display: block;
  }
  .el-input--suffix .el-input__inner{
    padding-right: 0;
  }
  .administratormanage-wrap {
    width: 100%;
  }

  .administratormanage-inner {
    margin: auto;
    padding: 0 20px;
  }

  .administratormanage-header {
    margin-bottom: 20px;
  }

  .administratormanage-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }

  .administratormanage-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
  }

  .el-table th {
    background-color: #e6e6e6;
  }

  .bannerAvatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .bannerAvatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .bannerAvatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
</style>
