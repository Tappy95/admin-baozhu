<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>游戏竞猜/赔率</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="彩种:" prop="isOfficial">
              <el-select :style="styleObject" v-model="formInline.lotteryPlayedTplId" placeholder="">
                <el-option v-for="(item,index) in lotteryPlayed" :key="index" :label="item.name" :value="item.lotteryPlayedTplId"></el-option>
              </el-select>
            </el-form-item>
          <el-button @click="search()">查询</el-button>
          <el-button @click="load()" v-if="add">添加</el-button>
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>
            <el-table-column width="150px" prop="lotteryName" label="彩种玩法模板">
            </el-table-column>
            <el-table-column width="120px"  prop="palyName" label="彩种玩法组">
            </el-table-column>

            <el-table-column width="120px" prop="name"  label="玩法名称">
            </el-table-column>

            <el-table-column width="150px" prop="code" label="code">
            </el-table-column>

            <el-table-column width="120px" prop="odds" label="赔率*1000">
            </el-table-column>

            <el-table-column width="150px" prop="oddsBase" label="最低赔率*1000">
            </el-table-column>

            <el-table-column width="200px" prop="rule" label="规则">
            </el-table-column>

            <el-table-column width="150px" prop="maxCount" label="最高投注注数">
            </el-table-column>

            <el-table-column width="100px" prop="isOfficial" label="是否官方">
            </el-table-column>

            <el-table-column width="120px" prop="isDelete" label="是否删除">
            </el-table-column>

            <el-table-column width="100px" prop="isEnable" label="是否可用">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini" @click="Delete(scope.row.id)" v-if="del && scope.row.isDelete=='未删除'">删除</el-button>
                <!--<el-button size="mini"  v-if="del && scope.row.isDelete==1">已删除</el-button>-->
                <el-button @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
                <el-button @click="getOne(scope.row.id)" size="mini">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="添加赔率" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <!--prop="lotteryPlayedTplId"-->
                <el-form-item label="彩种玩法模版:" prop="lotteryPlayedTplId"  :label-width="formLabelWidth">
                  <el-select @change="GroupTap" :style="styleObject" v-model="form.lotteryPlayedTplId" placeholder="">
                    <el-option  v-for="(item,index) in lotteryPlayed" :key="index" :label="item.name" :value="item.lotteryPlayedTplId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <!--prop="lotteryPlayedGroupId"-->
                <el-form-item label="彩种玩法组:"  prop="lotteryPlayedGroupId" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.lotteryPlayedGroupId" placeholder="">
                    <el-option  v-for="(item,index) in PlayedGroup" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="排序:" :label-width="formLabelWidth" prop="displaysort">
                  <el-input  :style="styleObject" type="number" min="0" v-model="form.displaysort" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="code:" :label-width="formLabelWidth" >
                  <el-input :style="styleObject"  min="0" v-model="form.code" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="赔率*1000:" :label-width="formLabelWidth" prop="odds">
                  <el-input :style="styleObject" type="number" min="0" v-model="form.odds" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="最低赔率*1000:" :label-width="formLabelWidth" prop="oddsBase">
                  <el-input :style="styleObject"  type="number" min="0" v-model="form.oddsBase" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="单注最高:" :label-width="formLabelWidth" prop="minCharge">
                  <el-input :style="styleObject" type="number" min="0" v-model="form.minCharge" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="最高投注注数:" :label-width="formLabelWidth" prop="maxCount">
                  <el-input :style="styleObject" type="number" min="0" v-model="form.maxCount" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每注选几个号码:" :label-width="formLabelWidth" prop="selectNum">
                  <el-input :style="styleObject" min="0" v-model="form.selectNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="总注数:" :label-width="formLabelWidth" prop="allCount">
                  <el-input :style="styleObject"  type="number" min="0" v-model="form.allCount" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="是否官方:" prop="isOfficial" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.isOfficial" placeholder="">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="不是" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否可用:" prop="isEnable" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.isEnable" placeholder="">
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="不可用" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否删除:" prop="isDelete" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.isDelete" placeholder="">
                    <el-option label="可用" value="1"></el-option>
                    <el-option label="不可用" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="最大中奖号码计算函数:" label-width="180px">
                  <el-input   min="0" v-model="form.zjMax" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="玩法页面模板:" :label-width="formLabelWidth">
                  <el-input   min="0" v-model="form.playedTpl" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="中奖规则函数:" :label-width="formLabelWidth" >
                  <el-input   min="0" v-model="form.betCountFun" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
            </el-col>

              <el-col :span="20">
                <el-form-item label="规则:" :label-width="formLabelWidth" prop="rule">
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.rule" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="返现规则:" :label-width="formLabelWidth" >
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.refundRule" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="玩法名称:" :label-width="formLabelWidth" prop="name">
                  <el-input    min="0" v-model="form.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="玩法说明:" :label-width="formLabelWidth" >
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.info" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="玩法简单说明" prop="simpleInfo" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.simpleInfo" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="中奖举例:" :label-width="formLabelWidth">
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.example" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改赔率" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" :rules="rules" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种玩法模版:" prop="lotteryPlayedTplId" :label-width="formLabelWidth">
                  <el-select @change="GroupTap" :style="styleObject" v-model="formtwo.lotteryPlayedTplId" placeholder="">
                    <el-option  v-for="(item,index) in lotteryPlayed" :key="index" :label="item.name" :value="item.lotteryPlayedTplId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="彩种玩法组:" prop="lotteryPlayedGroupId" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.lotteryPlayedGroupId" placeholder="">
                    <el-option  v-for="(item,index) in PlayedGroup" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="排序:" :label-width="formLabelWidth" prop="displaysort">
                  <el-input  :style="styleObject" type="number" min="0" v-model="formtwo.displaysort" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="code:" :label-width="formLabelWidth" >
                  <el-input :style="styleObject"  min="0" v-model="formtwo.code" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="赔率*1000:" :label-width="formLabelWidth" prop="odds">
                  <el-input :style="styleObject" type="number" min="0" v-model="formtwo.odds" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="最低赔率*1000:" :label-width="formLabelWidth" prop="oddsBase">
                  <el-input :style="styleObject"  type="number" min="0" v-model="formtwo.oddsBase" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="单注最高:" :label-width="formLabelWidth" prop="minCharge">
                  <el-input :style="styleObject" type="number" min="0" v-model="formtwo.minCharge" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="最高投注注数:" :label-width="formLabelWidth" prop="maxCount">
                  <el-input :style="styleObject" type="number" min="0" v-model="formtwo.maxCount" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每注选几个号码:" :label-width="formLabelWidth" prop="selectNum">
                  <el-input :style="styleObject" min="0" v-model="formtwo.selectNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="总注数:" :label-width="formLabelWidth" prop="allCount">
                  <el-input :style="styleObject"  type="number" min="0" v-model="formtwo.allCount" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否官方:" prop="isOfficial" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isOfficial" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="不是" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否可用:" prop="isEnable" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isEnable" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否删除:" prop="isDelete" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.isDelete" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="最大中奖号码计算函数:" label-width="180px" >
                  <el-input   min="0" v-model="formtwo.zjMax" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="玩法页面模板:" :label-width="formLabelWidth" >
                  <el-input   min="0" v-model="formtwo.playedTpl" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="中奖规则函数:" :label-width="formLabelWidth" >
                  <el-input   min="0" v-model="formtwo.betCountFun" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="规则:" :label-width="formLabelWidth" prop="rule">
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.rule" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="返现规则:" :label-width="formLabelWidth" >
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.refundRule" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="玩法名称:" :label-width="formLabelWidth" prop="name">
                  <el-input   min="0" v-model="formtwo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="玩法说明:" :label-width="formLabelWidth" >
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.info" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="玩法简单说明"  :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.simpleInfo" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="中奖举例:" :label-width="formLabelWidth" >
                  <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.example" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="赔率详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo" :rules="rules">
            <el-row>
              <el-col :span="12">
                <el-form-item label="彩种玩法模版:"  :label-width="formLabelWidth">
                  <el-select :disabled="true" @change="GroupTap" :style="styleObject" v-model="formtwoInfo.lotteryPlayedTplId" placeholder="">
                    <el-option  v-for="(item,index) in lotteryPlayed" :key="index" :label="item.name" :value="item.lotteryPlayedTplId"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="彩种玩法组:" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.lotteryPlayedGroupId" placeholder="">
                    <el-option  v-for="(item,index) in PlayedGroup" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="排序:" :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" min="0" v-model="formtwoInfo.displaysort" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="code:" :label-width="formLabelWidth" >
                  <el-input :style="styleObject" :disabled="true" min="0" v-model="formtwoInfo.code" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="赔率*1000:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true" type="number" min="0" v-model="formtwoInfo.odds" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="最低赔率*1000:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true" type="number" min="0" v-model="formtwoInfo.oddsBase" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="单注最高:" :label-width="formLabelWidth" >
                  <el-input :style="styleObject" type="number" :disabled="true" min="0" v-model="formtwoInfo.minCharge" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="最高投注注数:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" :disabled="true" min="0" v-model="formtwoInfo.maxCount" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每注选几个号码:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" min="0" :disabled="true" v-model="formtwoInfo.selectNum" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="总注数:" :label-width="formLabelWidth">
                  <el-input :style="styleObject" :disabled="true" type="number" min="0" v-model="formtwoInfo.allCount" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否官方:"  :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.isOfficial" placeholder="">
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="不是" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否可用:"  :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.isEnable" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="是否删除:"  :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.isDelete" placeholder="">
                    <el-option label="可用" :value="1"></el-option>
                    <el-option label="不可用" :value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="最大中奖号码计算函数:" label-width="180px" >
                  <el-input :disabled="true"   v-model="formtwoInfo.zjMax" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="玩法页面模板:" :label-width="formLabelWidth" >
                  <el-input  :disabled="true" v-model="formtwoInfo.playedTpl" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="中奖规则函数:" :label-width="formLabelWidth" >
                  <el-input  :disabled="true" v-model="formtwoInfo.betCountFun" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="规则:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.rule" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="返现规则:" :label-width="formLabelWidth" >
                  <el-input type="textarea" :disabled="true" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.refundRule" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="玩法名称:" :label-width="formLabelWidth">
                  <el-input  :disabled="true" v-model="formtwoInfo.name" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="玩法说明:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.info" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="玩法简单说明"  :label-width="formLabelWidth">
                  <el-input :disabled="true"  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.simpleInfo" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="中奖举例:" :label-width="formLabelWidth" >
                  <el-input :disabled="true" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwoInfo.example" auto-complete="off"  clearable>
                  </el-input>
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

  export default {
    name: 'OddsManage',
    data() {
      return {
        styleObject: {
          width: '200px',
        },
        w_input:'200px',
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        formtwoInfo:{},
        form: {

        },
        roles: {
          id: '',
          realname: ''
        },
        rules: {
          lotteryPlayedTplId: [{
            required: true,
            message: '请选择彩种玩法模版id',
            trigger: 'change'
          }],
          lotteryPlayedGroupId: [{
            required: true,
            message: '请选择彩种玩法组id',
            trigger: 'change'
          }],
          name: [{
            required: true,
            message: '请输入玩法名称',
            trigger: 'blur'
          }],
          code: [{
            required: true,
            message: '请输入code',
            trigger: 'blur'
          }],
          odds: [{
            required: true,
            message: '请输入赔率*1000',
            trigger: 'blur'
          }],
          oddsBase: [{
            required: true,
            message: '请输入最低赔率*1000',
            trigger: 'blur'
          }],
          rule: [{
            required: true,
            message: '请输入规则',
            trigger: 'blur'
          }],
          refundRule: [{
            required: true,
            message: '请输入返现规则',
            trigger: 'blur'
          }],
          info: [{
            required: true,
            message: '请输入玩法说明',
            trigger: 'blur'
          }],
          example: [{
            required: true,
            message: '请输入中奖举例',
            trigger: 'blur'
          }],
          minCharge: [{
            required: true,
            message: '请输入最低消费金额',
            trigger: 'blur'
          }],
          maxCharge: [{
            required: true,
            message: '请输入单注最高',
            trigger: 'blur'
          }],
          maxCount: [{
            required: true,
            message: '请输入最高投注注数',
            trigger: 'blur'
          }],
          allCount: [{
            required: true,
            message: '请输入总注数',
            trigger: 'blur'
          }],
          isOfficial: [{
            required: true,
            message: '请选择是否官方',
            trigger: 'change'
          }],
          displaysort: [{
            required: true,
            message: '请输入排序',
            trigger: 'blur'
          }],
          isEnable: [{
            required: true,
            message: '请选择是否可用',
            trigger: 'change'
          }],
          isDelete: [{
            required: true,
            message: '请选择是否删除',
            trigger: 'change'
          }],
          zjMax: [{
            required: true,
            message: '请输入最大中奖号码计算函数',
            trigger: 'blur'
          }],
          playedTpl: [{
            required: true,
            message: '请输入玩法页面模板',
            trigger: 'blur'
          }],
          selectNum: [{
            required: true,
            message: '请输入每注选几个号码',
            trigger: 'blur'
          }],
          betCountFun: [{
            required: true,
            message: '请输入中奖规则函数',
            trigger: 'blur'
          }],
          simpleInfo: [{
            required: true,
            message: '请输入玩法简单说明',
            trigger: 'blur'
          }],
        },
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        formInline: {
          lotteryPlayedTplId:1
        },
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        lotteryPlayed:[],
        PlayedGroup:[],
    }
    },
    created() {
      this.menuId=this.$route.query.id;
      this.playedList();
      this.queryBtns();
      this.accountList();
    },
    methods: {
      //选择彩种玩法组id
      GroupTap(){
        //修改前查询基本信息
        let idLottery = ''
        if (this.dialogTableVisible == true){
            idLottery = this.formtwo.lotteryPlayedTplId
        }
         //添加
        if (this.dialogFormVisible == true){
          idLottery = this.form.lotteryPlayedTplId
        }

        this.PlayedGroup=[]
        let parameterData = {
          lotteryPlayedTplId: idLottery
        }
        this.$fetch('/guess/lotteryPlayedGroup/playGroup',parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.PlayedGroup = res.data;
          }
        })
      },
      //获取彩种玩法模版id
      playedList(){
        this.$fetch('/guess/lottery/page').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.lotteryPlayed = res.data;
          }
        })
      },

      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {
              if(res.data[i].btnCode == 'add') {
                this.add=true
              }
              if(res.data[i].btnCode == 'upd') {
                this.upd=true;
                this.powerTrue =true;
                this.optionW = '150px'
              }
              if(res.data[i].btnCode == 'del') {
                this.del=true;
                this.powerTrue =true;
                this.optionW = '150px'
              }

              if (this.upd && this.del) {
                this.powerTrue =true;
                this.optionW = '220px'
              }
            }
          } else {
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
          lotteryPlayedTplId: this.formInline.lotteryPlayedTplId
        }
        this.$fetch('/guess/lotteryPlayed/queryList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].isOfficial == '1') {
                res.data.list[i].isOfficial = '是'
              } else {
                res.data.list[i].isOfficial = '否'
              }

              if(res.data.list[i].isEnable == '1') {
                res.data.list[i].isEnable = '可用'
              } else {
                res.data.list[i].isEnable = '不可用'
              }

              if(res.data.list[i].isDelete == '1') {
                res.data.list[i].isDelete = '删除'
              } else {
                res.data.list[i].isDelete = '未删除'
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
        this.dialogFormVisible = true;
      },
      addBtn(form) {
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/guess/lotteryPlayed/save', this.form).then(res => {
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
          id: id,
          isDelete:1
        }
        this.$fetch('/guess/lotteryPlayed/delete', parameterData).then(res => {
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
        //修改前查询基本信息
        this.dialogTableVisible = true
        this.$fetch('/guess/lotteryPlayed/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
            this.GroupTap();
          }
        })
      },
      update(formtwo) {
        this.$put('/guess/lotteryPlayed/update', this.formtwo).then(res => {
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
        this.$fetch('/guess/lotteryPlayed/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            // res.data.createrTime =  formatDate(new Date(res.data.createrTime), 'yyyy-MM-dd hh:mm:sss')
            this.formtwoInfo = res.data
          }
        })
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
</style>
