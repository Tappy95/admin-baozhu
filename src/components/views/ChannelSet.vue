<template>
  <div class="administratormanage-wrap">
    <div class="administratormanage-inner">
      <div class="administratormanage-header">
        <h3>第三方/渠道设置</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <!--<el-form-item label="渠道标识:">-->
            <!--<el-input v-model="formInline.channelCode" auto-complete="off"  clearable>-->
            <!--</el-input>-->
          <!--</el-form-item>-->
          <!--</el-form-item>-->
          <!--<el-button @click="search()">查询</el-button>-->
          <el-button style="margin-bottom: 30px" @click="load()" v-if="add">添加渠道配置</el-button>
          <!--<el-button @click="loadChannel()" v-if="addChannelName">添加渠道名称</el-button>-->
        </el-form>
      </div>
      <div class="administratormanage-table">
        <template>
          <el-table :data="tableData" height="580">
            <el-table-column label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>
            <el-table-column  prop="channelCode" label="渠道ID">
            </el-table-column>
            <el-table-column  prop="fissionId" label="裂变方案">
            </el-table-column>
            <el-table-column prop="chargeMode" label="裂变收费">
            </el-table-column>
            <el-table-column  prop="effectiveObject" label="生效对象">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini" @click="Delete(scope.row.id,1)" v-if="del">删除</el-button>
                <el-button @click="getInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
                <el-button @click="getOne(scope.row.id)" size="mini">详情</el-button>
                <el-button @click="rewarTap(scope.row.id)" v-if="award" size="mini">用户奖励</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <el-dialog title="添加渠道名称" :visible.sync="dialogChannel" width="600px">
          <el-form :model="formChannel" :rules="rules" ref="formChannel">
            <el-row>
              <el-col :span="20">
                <el-form-item label="渠道名称:" :label-width="formLabelWidth" prop="channelName">
                  <el-input style="300px" v-model="formChannel.channelName" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChannel = false">取 消</el-button>
            <el-button type="primary" @click="addChannel('formChannel')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="添加渠道配置" :visible.sync="dialogFormVisible" width="800px">
          <el-form :model="form" :rules="rules" ref="form">
            <el-row>
              <el-col :span="12">
                <el-form-item label="渠道标识:" :label-width="formLabelWidth" prop="channelCode">
                  <el-select  :style="styleObject" v-model="form.channelCode" placeholder="">
                    <el-option  v-for="(item,index) in channelNameList" :key="index" :label="item.channelName" :value="item.channelCode"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="裂变方案:" prop="fissionId" :label-width="formLabelWidth">
                  <el-select  :style="styleObject" v-model="form.fissionId" placeholder="">
                    <el-option  v-for="(item,index) in fissionList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="收费方式:" prop="chargeMode" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.chargeMode" placeholder="">
                    <el-option label="线上" value="1"></el-option>
                    <el-option label="线下" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="生效对象:" prop="effectiveObject" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="form.effectiveObject" placeholder="">
                    <el-option label="仅对渠道生效" value="1"></el-option>
                    <el-option label="对渠道用户和渠道次级用户生效" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <p>普通用户无权限功能:</p>
              <div style="width: 100%; display: inline-block; height: auto;border: 1px #ccc solid">
              <el-col :span="24">
                  <el-form-item label="28模块:"  :label-width="formLabelWidth">
                    <el-checkbox v-model="form.game28" label="游戏28" ></el-checkbox>
                    <el-checkbox v-model="form.pcdd28" label="蛋蛋28" ></el-checkbox>
                    <el-checkbox v-model="form.jnd28" label="加拿大28" ></el-checkbox>
                  </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="第三方游戏:"  :label-width="formLabelWidth">
                  <el-checkbox-group
                    v-model="taskTypeName">
                    <el-checkbox v-for="(item,index) in cities" :label="item.id" :key="index">{{item.tpName}}</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              </div>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="修改渠道配置" :visible.sync="dialogTableVisible" width="800px">
          <el-form :model="formtwo" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="渠道标识:" :label-width="formLabelWidth" prop="channelCode">
                  <el-select  :style="styleObject" v-model="formtwo.channelCode" placeholder="">
                    <el-option  v-for="(item,index) in channelNameList" :key="index" :label="item.channelName" :value="item.channelCode"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="裂变方案:" prop="fissionId" :label-width="formLabelWidth">
                  <el-select  :style="styleObject" v-model="formtwo.fissionId" placeholder="">
                    <el-option  v-for="(item,index) in fissionList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="收费方式:" prop="chargeMode" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.chargeMode" placeholder="">
                    <el-option label="线上" :value="1"></el-option>
                    <el-option label="线下" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="生效对象:" prop="effectiveObject" :label-width="formLabelWidth">
                  <el-select :style="styleObject" v-model="formtwo.effectiveObject" placeholder="">
                    <el-option label="仅对渠道生效" :value="1"></el-option>
                    <el-option label="对渠道用户和渠道次级用户生效" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <p>普通用户无权限功能</p>
              <div style="width: 100%; display: inline-block; height: auto;border: 1px #ccc solid">
                <el-col :span="24">
                  <el-form-item label="28模块:"  :label-width="formLabelWidth">
                    <el-checkbox v-model="formtwo.game28" label="游戏28" ></el-checkbox>
                    <el-checkbox v-model="formtwo.pcdd28" label="蛋蛋28" ></el-checkbox>
                    <el-checkbox v-model="formtwo.jnd28" label="加拿大28" ></el-checkbox>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="第三方游戏:"  :label-width="formLabelWidth">
                    <el-checkbox-group
                      v-model="taskTypes">
                      <el-checkbox v-for="(item,index) in cities" :label="item.id" :key="item.id">{{item.tpName}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="渠道配置详情" :visible.sync="dialogTableDetail" width="800px">
          <el-form :model="formtwoInfo" >
            <el-row>
              <el-col :span="12">
                <el-form-item label="渠道标识:" :label-width="formLabelWidth" prop="channelCode">
                  <el-select :disabled="true"  :style="styleObject" v-model="formtwoInfo.channelCode" placeholder="">
                    <el-option  v-for="(item,index) in channelNameList" :key="index" :label="item.channelName" :value="item.channelCode"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="裂变方案:" prop="fissionId" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.fissionId" placeholder="">
                    <el-option  v-for="(item,index) in fissionList" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="收费方式:" prop="chargeMode" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.chargeMode" placeholder="">
                    <el-option label="线上" :value="1"></el-option>
                    <el-option label="线下" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="生效对象:" prop="effectiveObject" :label-width="formLabelWidth">
                  <el-select :disabled="true" :style="styleObject" v-model="formtwoInfo.effectiveObject" placeholder="">
                    <el-option label="仅对渠道生效" :value="1"></el-option>
                    <el-option label="对渠道用户和渠道次级用户生效" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <p>普通用户无权限功能</p>
              <div style="width: 100%; display: inline-block; height: auto;border: 1px #ccc solid">
                <el-col :span="24">
                  <el-form-item label="28模块:"  :label-width="formLabelWidth">
                    <el-checkbox :disabled="true" v-model="formtwoInfo.game28" label="游戏28" ></el-checkbox>
                    <el-checkbox :disabled="true"  v-model="formtwoInfo.pcdd28" label="蛋蛋28" ></el-checkbox>
                    <el-checkbox :disabled="true" v-model="formtwoInfo.jnd28" label="加拿大28" ></el-checkbox>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="第三方游戏:"  :label-width="formLabelWidth">
                    <el-checkbox-group
                      v-model="taskTypes">
                      <el-checkbox :disabled="true" v-for="(item,index) in cities" :label="item.id" :key="item.id">{{item.tpName}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </div>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableDetail = false">取 消</el-button>
          </div>
        </el-dialog>


        <el-dialog title="用户奖励" :visible.sync="dialogChannel" width="800px">
          <el-button style="margin-bottom: 30px" @click="loadUser()" v-if="addUAward">添加用户奖励</el-button>
          <el-table :data="tablereward" height="580">
            <el-table-column label="序号" type="index" :index="indexMethod" width='50'>
            </el-table-column>
            <el-table-column  prop="configId" label="渠道配置id">
            </el-table-column>
            <el-table-column  prop="userType" label="用户类型">
            </el-table-column>
            <el-table-column prop="status" label="状态">
            </el-table-column>
            <el-table-column fixed="right" label="操作" :width="optionWUser">
              <template slot-scope="scope">
                <el-button size="mini" @click="Delete(scope.row.id,2)" v-if="delUAward">删除</el-button>
                <el-button @click="getEditAward(scope.row.id,1)" size="mini" v-if="updUAward">修改</el-button>
                <el-button @click="getEditAward(scope.row.id,2)" size="mini">详情</el-button>
                <!--<el-button @click="loadChannel(scope.row.id)" v-if="award" size="mini">签到奖励</el-button>-->
              </template>
            </el-table-column>
          </el-table>

          <div class="block">
            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="currentPage1" :page-sizes="[10, 20, 50, 70]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="totalCount1">
            </el-pagination>
          </div>
        </el-dialog>
        <el-dialog title="添加用户奖励" :visible.sync="dialogloadUser" width="800px">
          <el-form :model="formUser" :rules="rules" ref="formUser">
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户类型:" prop="userType" :label-width="formLabelWidth01">
                    <el-select :style="styleObject" v-model="formUser.userType" placeholder="">
                      <el-option label="普通用户" value="1"></el-option>
                      <el-option label="团队长" value="2"></el-option>
                    </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态:" prop="status" :label-width="formLabelWidth01">
                  <el-select :style="styleObject" v-model="formUser.status" placeholder="">
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="停用" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="徒弟游戏试玩加成(%):" prop="referrerAddition" :label-width="formLabelWidth01">
                  <el-input :style="styleObject"  type="number"   v-model="formUser.referrerAddition" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="推荐有效好友奖励金币数:" prop="recommendCoin" :label-width="formLabelWidth01">
                  <el-input :style="styleObject"  type="number"   v-model="formUser.recommendCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="累计连续签到7天奖励金币:" prop="sign7" :label-width="formLabelWidth01">
                  <el-input :style="styleObject"  type="number"   v-model="formUser.sign7" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="累计连续签到15天奖励金币:" prop="sign15" :label-width="formLabelWidth01">
                  <el-input :style="styleObject"  type="number"   v-model="formUser.sign15" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                 <p>好友累计购买VIP权益达到一定等级，可获得相应奖励:</p>
              </el-col>
              <div class="my-coltable big">
                <div class="list">
                  <div class="item">购买VIP权益</div>
                  <div class="item">18</div>
                  <div class="item">48</div>
                  <div class="item">228</div>
                  <div class="item">1188</div>
                  <div class="item">1688</div>
                  <div class="item">1888</div>
                  <div class="item">3188</div>
                </div>
                <div class="list">
                  <div class="item">奖励比值(%)</div>
                  <div class="item"><el-input   v-model="formUser.vip18" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="formUser.vip48" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="formUser.vip228" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="formUser.vip1188" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="formUser.vip1688" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="formUser.vip1888" auto-complete="off"  clearable></el-input></div>
                  <div class="item"> <el-input   v-model="formUser.vip3188" auto-complete="off"  clearable> </el-input></div>

                </div>
              </div>

              <el-col :span="18" >
                <p>好友到达一定成长等级可获得相应奖励:</p>
              </el-col>

              <div class="my-coltable small">
                <div class="list">
                  <div class="item">成长值等级</div>
                  <div class="item">4</div>
                  <div class="item">6</div>
                  <div class="item">8</div>
                  <div class="item">12</div>
                </div>
                <div class="list">
                  <div class="item">奖励/金币</div>
                  <div class="item"><el-input   v-model="formUser.level4" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="formUser.level6" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="formUser.level8" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="formUser.level12" auto-complete="off"  clearable></el-input></div>
                </div>
              </div>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
          <el-button @click="dialogloadUser = false">取 消</el-button>
          <el-button type="primary" @click="addUserAward('formUser')">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="修改用户奖励" :visible.sync="dialogEditUser" width="800px">
          <el-form :model="fromEditUser">
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户类型:" prop="userType" :label-width="formLabelWidth01">
                  <el-select :style="styleObject" v-model="fromEditUser.userType" placeholder="">
                    <el-option label="普通用户" :value="1"></el-option>
                    <el-option label="团队长" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态:" prop="status" :label-width="formLabelWidth01">
                  <el-select :style="styleObject" v-model="fromEditUser.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="徒弟游戏试玩加成(%):" prop="referrerAddition" :label-width="formLabelWidth01">
                  <el-input :style="styleObject"  type="number"   v-model="fromEditUser.referrerAddition" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="推荐有效好友奖励金币数:" prop="recommendCoin" :label-width="formLabelWidth01">
                  <el-input :style="styleObject"  type="number"   v-model="fromEditUser.recommendCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="累计连续签到7天奖励金币:" prop="sign7" :label-width="formLabelWidth01">
                  <el-input :style="styleObject"  type="number"   v-model="fromEditUser.sign7" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="累计连续签到15天奖励金币:" prop="sign15" :label-width="formLabelWidth01">
                  <el-input :style="styleObject"  type="number"   v-model="fromEditUser.sign15" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <p>好友累计购买VIP权益达到一定等级，可获得相应奖励:</p>
              </el-col>
              <div class="my-coltable big">
                <div class="list">
                  <div class="item">购买VIP权益</div>
                  <div class="item">18</div>
                  <div class="item">48</div>
                  <div class="item">228</div>
                  <div class="item">1188</div>
                  <div class="item">1688</div>
                  <div class="item">1888</div>
                  <div class="item">3188</div>
                </div>
                <div class="list">
                  <div class="item">奖励比值(%)</div>
                  <div class="item"><el-input   v-model="fromEditUser.vip18" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="fromEditUser.vip48" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="fromEditUser.vip228" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="fromEditUser.vip1188" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="fromEditUser.vip1688" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="fromEditUser.vip1888" auto-complete="off"  clearable></el-input></div>
                  <div class="item"> <el-input   v-model="fromEditUser.vip3188" auto-complete="off"  clearable> </el-input></div>
                </div>
              </div>

              <el-col :span="18" >
                <p>好友到达一定成长等级可获得相应奖励:</p>
              </el-col>

              <div class="my-coltable small">
                <div class="list">
                  <div class="item">成长值等级</div>
                  <div class="item">4</div>
                  <div class="item">6</div>
                  <div class="item">8</div>
                  <div class="item">12</div>
                </div>
                <div class="list">
                  <div class="item">奖励/金币</div>
                  <div class="item"><el-input   v-model="fromEditUser.level4" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="fromEditUser.level6" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="fromEditUser.level8" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input   v-model="fromEditUser.level12" auto-complete="off"  clearable></el-input></div>
                </div>
              </div>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogEditUser = false">取 消</el-button>
            <el-button type="primary" @click="EditUserAward('fromEditUser')">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="用户奖励详情" :visible.sync="dialogInfoUser" width="800px">
          <el-form :model="fromInfoUser">
            <el-row>
              <el-col :span="12">
                <el-form-item label="用户类型:" prop="userType" :label-width="formLabelWidth01">
                  <el-select :disabled="true" :style="styleObject" v-model="fromInfoUser.userType" placeholder="">
                    <el-option label="普通用户" :value="1"></el-option>
                    <el-option label="团队长" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="状态:" prop="status" :label-width="formLabelWidth01">
                  <el-select :disabled="true" :style="styleObject" v-model="fromInfoUser.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="徒弟游戏试玩加成(%):" prop="referrerAddition" :label-width="formLabelWidth01">
                  <el-input :style="styleObject" :disabled="true" type="number"   v-model="fromInfoUser.referrerAddition" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="推荐有效好友奖励金币数:" prop="recommendCoin" :label-width="formLabelWidth01">
                  <el-input :disabled="true" :style="styleObject"  type="number"   v-model="fromInfoUser.recommendCoin" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="20">
                <el-form-item label="累计连续签到7天奖励金币:" prop="sign7" :label-width="formLabelWidth01">
                  <el-input :style="styleObject"  type="number" :disabled="true"  v-model="fromInfoUser.sign7" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="20">
                <el-form-item label="累计连续签到15天奖励金币:" prop="sign15" :label-width="formLabelWidth01">
                  <el-input :style="styleObject"  type="number" :disabled="true"   v-model="fromInfoUser.sign15" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <p>好友累计购买VIP权益达到一定等级，可获得相应奖励:</p>
              </el-col>
              <div class="my-coltable big">
                <div class="list">
                  <div class="item">购买VIP权益</div>
                  <div class="item">18</div>
                  <div class="item">48</div>
                  <div class="item">228</div>
                  <div class="item">1188</div>
                  <div class="item">1688</div>
                  <div class="item">1888</div>
                  <div class="item">3188</div>
                </div>
                <div class="list">
                  <div class="item">奖励比值(%)</div>
                  <div class="item"><el-input  :disabled="true" v-model="fromInfoUser.vip18" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input  :disabled="true" v-model="fromInfoUser.vip48" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input  :disabled="true" v-model="fromInfoUser.vip228" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input  :disabled="true" v-model="fromInfoUser.vip1188" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input  :disabled="true" v-model="fromInfoUser.vip1688" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input  :disabled="true" v-model="fromInfoUser.vip1888" auto-complete="off"  clearable></el-input></div>
                  <div class="item"> <el-input :disabled="true"  v-model="fromInfoUser.vip3188" auto-complete="off"  clearable> </el-input></div>

                </div>
              </div>

              <el-col :span="18" >
                <p>好友到达一定成长等级可获得相应奖励:</p>
              </el-col>

              <div class="my-coltable small">
                <div class="list">
                  <div class="item">成长值等级</div>
                  <div class="item">4</div>
                  <div class="item">6</div>
                  <div class="item">8</div>
                  <div class="item">12</div>
                </div>
                <div class="list">
                  <div class="item">奖励/金币</div>
                  <div class="item"><el-input :disabled="true" v-model="fromInfoUser.level4" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input  :disabled="true" v-model="fromInfoUser.level6" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input  :disabled="true" v-model="fromInfoUser.level8" auto-complete="off"  clearable></el-input></div>
                  <div class="item"><el-input  :disabled="true" v-model="fromInfoUser.level12" auto-complete="off"  clearable></el-input></div>
                </div>
              </div>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogInfoUser = false">取 消</el-button>
            <!--<el-button type="primary" @click="InfoUserAward('fromEditUser')">确 定</el-button>-->
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
    name: 'ChannelSet',
    data() {
      return {
        uploadData:{},
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
        award:false,
        delUAward:false,
        updUAward:false,
        addUAward:false,
        optionWUser:'75px',
        addChannelName:false,
        dialogTableVisible: false,
        dialogloadUser:false,
        dialogEditUser:false,
        dialogInfoUser:false,
        fromEditUser:{},
        fromInfoUser:{},
        formtwo: {},
        dialogFormVisible: false,
        dialogTableDetail:false,
        dialogChannel:false,
        formtwoInfo:{},
        formUser:{},
        awardId:'',
        EditAwardId:'',
        form:{
          // game28:false,
          // pcdd28:false,
          // jnd28:false,
          // channelCode:'',
          // fromfissionId:'',
          // fromchargeMode:'',
          // fromeffectiveObject:''
          // channelName:''
        },
        formChannel:{
        },
        imageUrl: '',
        rules: {
          openGame: [{
            required: true,
            message: '请选择第三方游戏',
            trigger: 'change'
          }],
          // game28: [{
          //   required: true,
          //   message: '请选择是否打开游戏28',
          //   trigger: 'change'
          // }],
          // pcdd28: [{
          //   required: true,
          //   message: '请选择是否打开蛋蛋28',
          //   trigger: 'change'
          // }],
          // jnd28: [{
          //   required: true,
          //   message: '请选择是否打开加拿大28',
          //   trigger: 'change'
          // }],
          channelCode: [{
            required: true,
            message: '请选择渠道标识',
            trigger: 'change'
          }],
          fissionId: [{
            required: true,
            message: '请选择渠道标识',
            trigger: 'change'
          }],
          chargeMode: [{
            required: true,
            message: '请选择渠道名称',
            trigger: 'change'
          }],
          effectiveObject: [{
            required: true,
            message: '请选择生效对象',
            trigger: 'change'
          }],
          userType: [{
            required: true,
            message: '请选择用户类型',
            trigger: 'change'
          }],
          status: [{
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }],
          referrerAddition: [{
            required: true,
            message: '请输入徒弟游戏试玩加成',
            trigger: 'blur'
          }],
          recommendCoin:[{
            required: true,
            message: '请输入推荐有效好友奖励金币数',
            trigger: 'blur'
          }],
    },
        formLabelWidth01:'188px',
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        currentPage1: 1,
        pageSize1: 10,
        totalCount: 0,
        totalCount1:0,
        formInline: {
          lotteryPlayedTplId:1
        },
        tableData: [],
        isShow: false,
        selectDept: [],
        selectData: [],
        staff: 1,
        company: 2,
        channelNameList:[],
        showImg:false,
        taskTypes:[],
        cities: [],
        taskTypeName:[],
        taskType28:[],
        fissionList:[],
        tablereward:[],
      }
    },
    components: {
      'big-img': BigImg
    },
    created() {
      this.menuId=this.$route.query.id;
      this.uploadData={
        token:getSession("token")
      }
      this.queryBtns();
      //调取名称列表
      this.channelList();
      this.fission();
      this.accountList();
      this.queryTaskType();
    },
    methods: {
      //游戏商户
      queryTaskType(){
        let parameterData = {
          token:getSession('token')
        }
        this.$fetch('/api/tpCallback/selectDownList', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.cities =res.data;
          }
          else {
          }
        })
      },

      //裂变方案
      fission(){
        this.$fetch('/api/mFissionScheme/selectDownList').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.fissionList =res.data;
          }
          else {
          }
        })
      },

      //放大图片
      clickImg(e) {
        this.showImg = true
        this.imgSrc = e.currentTarget.src
      },
      viewImg() {
        this.showImg = false
      },
      //图片上传
      handleAvatarSuccess(res, file) {
        this.imageUrl=res.data
      },
      beforeAvatarUpload(file) {
      },
      //权限
      queryBtns(){
        let parameterData = {
          menuId: this.menuId
        }
        this.$fetch('/api/pMenuBtn/queryBtns', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.length - 1; i >= 0; i--) {

              if(res.data[i].btnCode == 'addChannelName') {
                this.addChannelName=true
              }
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

              if(res.data[i].btnCode == 'award') {
                this.award=true;
                this.powerTrue =true;
                this.optionW = '150px'
              }

              if (this.upd && this.del|| this.upd && this.award || this.del && this.award) {
                this.powerTrue =true;
                this.optionW = '230px'
              }

              if (this.upd && this.del && this.award) {
                this.powerTrue =true;
                this.optionW = '315px'
              }

              if(res.data[i].btnCode == 'addUAward') {
                this.addUAward=true;
              }

              if(res.data[i].btnCode == 'delUAward') {
                this.delUAward=true;
                this.optionWUser = '150px'
              }
              if(res.data[i].btnCode == 'updUAward') {
                this.updUAward=true;
                this.optionWUser = '150px'
              }
              if (this.delUAward && this.updUAward) {;
                this.optionWUser = '230px'
              }
            }
          } else {
          }
        })
      },
      indexMethod(index) {
        return index * 1 + 1
      },
      //日期格式
      dateFormat(row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ''
        }
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
      },
      //列表
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
        }
        this.$fetch('/api/mChannelConfig/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].effectiveObject == '1') {
                res.data.list[i].effectiveObject = '仅对渠道生效'
              } else  if(res.data.list[i].effectiveObject == '2'){
                res.data.list[i].effectiveObject = '对渠道用户和渠道次级用户生效'
              }
            }
            this.tableData = res.data.list;
            this.totalCount = res.data.total;
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
      //渠道
      load() {
        this.taskTypeName =[];
        this.dialogFormVisible = true;
      },
      //渠道名称
      rewarTap(id) {
        this.awardId = id;
        // this.formChannel = {};
        this.dialogChannel = true;
        this.rewardList(id)
      },
      //调取名称列表
      channelList(){
        this.$fetch('/api/mChannelInfo/downList',{
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.channelNameList = res.data;
          }
        })
      },
      //添加渠道名称
      addChannel(formChannel) {
        this.$refs[formChannel].validate(valid => {
          if(valid) {
            this.$post('/api/mChannel/add', this.formChannel).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogChannel = false
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                })
                this.channelList()
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
      //添加渠道
      addBtn(form) {
        var selecType = ''
        for (let i=0; i<this.taskTypeName.length;i++){
          if(selecType!=''){
            selecType+= ','
          }
          selecType+= this.taskTypeName[i]
        }
        this.form.openGame = selecType;
        if (this.form.game28) {
          this.form.game28 = 1
        }else {
          this.form.game28 = 2
        }
        if (this.form.pcdd28) {
          this.form.pcdd28 = 1
        }else {
          this.form.pcdd28 = 2
        }

        if (this.form.jnd28) {
          this.form.jnd28 = 1
        }else {
          this.form.jnd28 = 2
        }
        
        this.$refs[form].validate(valid => {
          if(valid) {
            this.$post('/api/mChannelConfig/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false;
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
      Delete(id,type) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
            if (type==1){
              this.delData(id)
            }else if (type==2){
              this.EditAwardId = id;
              this.deluser(id)
            }
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
        this.$fetch('/api/mChannelConfig/remove', parameterData).then(res => {
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

      deluser(id) {
        let parameterData = {
          id: id
        }
        this.$fetch('/api/channelConfigUser/remove', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.rewardList(this.EditAwardId)
          } else {
            this.$message({
              type: 'error',
              message: '删除失败！'
            })
          }
        })
      },

      getInfo(id) {
        this.taskTypes=[];
        //修改前查询基本信息
        this.dialogTableVisible = true;
        this.$fetch('/api/mChannelConfig/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.formtwo = res.data;
            if (res.data.game28==1) {
              this.formtwo.game28 = true
            }else {
              this.formtwo.game28 = false
            }
            if (res.data.pcdd28==1) {
              this.formtwo.pcdd28 = true
            }else {
              this.formtwo.pcdd28 = false
            }

            if (res.data.jnd28==1) {
              this.formtwo.jnd28 = true
            }else {
              this.formtwo.jnd28 = false
            }
           let arr=this.formtwo.openGame.split(',');
           for(let i=0;i<arr.length;i++){
             this.taskTypes.push(parseInt(arr[i]))
           }
          }
        })
      },
      update(formtwo) {
        if (this.formtwo.game28) {
          this.formtwo.game28 = 1
        }else {
          this.formtwo.game28 = 2
        }
        if (this.formtwo.pcdd28) {
          this.formtwo.pcdd28 = 1
        }else {
          this.formtwo.pcdd28 = 2
        }

        if (this.formtwo.jnd28) {
          this.formtwo.jnd28 = 1
        }else {
          this.formtwo.jnd28 = 2
        }
        this.formtwo.openGame=this.taskTypes.join(",");
        this.$put('/api/mChannelConfig/modify', this.formtwo).then(res => {
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
          this.taskTypes=[];
          //修改前查询基本信息
          this.dialogTableDetail = true;
          this.$fetch('/api/mChannelConfig/queryOne', {
            id: id
          }).then(res => {
            if ((res.statusCode+"").startsWith("2")) {
            this.formtwoInfo = res.data;

            if (res.data.game28==1) {
              this.formtwoInfo.game28 = true
            }else {
              this.formtwoInfo.game28 = false
            }
            if (res.data.pcdd28==1) {
              this.formtwoInfo.pcdd28 = true
            }else {
              this.formtwoInfo.pcdd28 = false
            }

            if (res.data.jnd28==1) {
              this.formtwoInfo.jnd28 = true
            }else {
              this.formtwoInfo.jnd28 = false
            }
            let arr=this.formtwoInfo.openGame.split(',');
            for(let i=0;i<arr.length;i++){
              this.taskTypes.push(parseInt(arr[i]))
            }
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

      loadUser(){
        this.dialogloadUser = true;
      },

      addUserAward(formUser) {
        this.formUser.configId = this.awardId
        this.$refs[formUser].validate(valid => {
          if(valid) {
            this.$post('/api/channelConfigUser/add', this.formUser).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogloadUser = false;
                this.$message({
                  type: 'success',
                  message: '添加成功！'
                })
                this.rewardList(this.awardId)
                // this.accountList()
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

      getEditAward(id,type){
        this.EditAwardId = id;
        if (type==1){
          this.dialogEditUser = true;
        } else if (type==2) {
          this.dialogInfoUser =true;
        }
        this.$fetch('/api/channelConfigUser/queryOne', {
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            if (type==1){
              this.fromEditUser = res.data;
            } else if (type==2) {
              this.fromInfoUser = res.data;
            }
          }
        })
      },

      //点击确定修改用户奖
      EditUserAward(fromEditUser) {
        this.$put('/api/channelConfigUser/modify', this.fromEditUser).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.dialogEditUser = false;
            this.rewardList(this.awardId)
          }
        })
      },

      rewardList(id){
        let parameterData = {
          configId:id,
          pageNum: this.currentPage1,
          pageSize: this.pageSize1,
        }

        this.$fetch('/api/channelConfigUser/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            for(let i = res.data.list.length - 1; i >= 0; i--) {
              if(res.data.list[i].userType == '1') {
                res.data.list[i].userType = '普通用户'
              } else  if(res.data.list[i].userType == '2'){
                res.data.list[i].userType = '团队长'
              }

              if(res.data.list[i].status == '1') {
                res.data.list[i].status = '启用'
              } else  if(res.data.list[i].status == '2'){
                res.data.list[i].status = '停用'
              }
            }
            this.tablereward = res.data.list;
            this.totalCount1 = res.data.total;
          } else {
            this.$message({
              type: 'error',
              message: res.message,
              duration: 3000
            })
          }
        })
      },

      handleSizeChange1(val) {
        this.pageSize1 = val;
        this.rewardList();
      },
      handleCurrentChange1(val) {
        this.currentPage1 = val
        this.rewardList();
      },


    },
  }
</script>
<style type="text/css">
  .my-coltable{
    height: 80px;
    border-top: 1px solid #cccccc;
    /*border-bottom: 1px solid #cccccc;*/
    border-left: 1px solid #cccccc;
    display: inline-block;
    font-size: 14px;
    margin-bottom: 30px;
    /*border-radius: 4px;*/
  }

  .my-coltable.big{
    width: 760px;
  }


  .my-coltable.small{
    width: 475px;
  }

  .my-coltable .list{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-items: center;
  }

  .my-coltable .list .item{
    line-height: 40px;
    text-align: center;
    width: 95px;
    height: 40px;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    /*border: 0 1px 1px 0 solid #ccc;*/
  }

  .my-coltable .list .item input{
    width: 94px;
    height: 40px;
    border: none;
    box-shadow: none;
    text-align: center;
    padding: 0;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
  ..el-checkbox.is-bordered{
    border: none;
  }
</style>
