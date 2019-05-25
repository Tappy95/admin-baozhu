<template>
  <div class="bannermanage-wrap">
    <div class="bannermanage-inner">
      <div class="bannermanage-header">
        <h3>第三方/裂变方案</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <!--<el-form-item label="奖品名称"-->
                        <!--prop="goodsName">-->
            <!--<el-input placeholder="请输入奖品名称"-->
                      <!--v-model="formInline.goodsName"-->
                      <!--clearable></el-input>-->
          <!--</el-form-item>-->
          <!--<el-button @click="search()">查询</el-button>-->
          <el-button  type="success" plain @click="load()" v-if="add">添加方案</el-button>
        </el-form>
      </div>
      <div>
        <el-dialog title="添加方案" width="800px"
                   :visible.sync="dialogFormVisible">
          <el-form :model="form"
                   :rules="rules"
                   ref="form">
            <div class="form">
              <el-row>
                <el-col :span="23">
                  <el-form-item label="方案名称:"
                                prop="name"
                                :label-width="formLabelWidth">
                    <el-input v-model="form.name"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="团队长价格:"
                                prop="teamPrice"
                                :label-width="formLabelWidth">
                    <el-input type="number" :style="styleObject" v-model="form.teamPrice"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="续费价格:"
                                prop="renewPrice"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" type="number" v-model="form.renewPrice"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="一级分佣:"
                                prop="oneCommission"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" type="number" v-model="form.oneCommission"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="12">
                  <el-form-item label="二级分佣:"
                                prop="twoCommission"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" type="number" v-model="form.twoCommission"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>


                <el-col :span="12">
                  <el-form-item label="合伙人分佣:"
                                prop="partnerCommission"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" type="number" v-model="form.partnerCommission"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="团队长有效天数:"
                                prop="effectiveDay"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" type="number" v-model="form.effectiveDay"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="普通用户起提金额:"
                                prop="ordinaryExchange"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" type="number" v-model="form.ordinaryExchange"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="团队长起提金额:"
                                prop="groupExchange"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" type="number" v-model="form.groupExchange"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="每日赠送人民币数:"
                                prop="giveMoney"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" type="number" v-model="form.giveMoney"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="每天赠送金币数:"
                                prop="giveCoin"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" type="number" v-model="form.giveCoin"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="12">
                  <el-form-item label="每天赠送金猪数:"
                                prop="givePig"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" type="number" v-model="form.givePig"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="赠送天数:"
                                prop="giveDay"
                                :label-width="formLabelWidth">
                    <el-input :style="styleObject" type="number" v-model="form.giveDay"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="方案图:"
                    prop="imageUrl"
                    :label-width="formLabelWidth">
                      <el-upload
                        action="/api/upload"
                        list-type="picture-card"
                        :file-list="fileList1"
                        :on-success="handlePicture01"
                        :on-preview="handlePictureCardPreview1"
                        :on-remove="handleRemove01">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="普通用户奖励图:"
                                  :label-width="formLabelWidth">
                      <el-upload
                        action="/api/upload"
                        list-type="picture-card"
                        :file-list="fileList2"
                        :on-success="handlePicture02"
                        :on-preview="handlePictureCardPreview2"
                        :on-remove="handleRemove02">
                        <i class="el-icon-plus"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>

                <el-col :span="24">
                      <el-form-item label="团队长奖励图:"
                                    :label-width="formLabelWidth">
                        <el-upload
                          action="/api/upload"
                          list-type="picture-card"
                          :file-list="fileList3"
                          :on-success="handlePicture03"
                          :on-preview="handlePictureCardPreview3"
                          :on-remove="handleRemove03">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                      </el-form-item>
                    </el-col>

                  <el-dialog width="800px" style="z-index: 99999" :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                  </el-dialog>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="类型描述:" prop="remarks" :label-width="formLabelWidth">
                    <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.remarks" auto-complete="off" clearable></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="addBtn('form')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="bannermanage-table">
        <template>
          <el-table :data="tableData"
                    style="width: 100%"
                    height="580">
            <el-table-column label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80' fixed="left">
            </el-table-column>

            <el-table-column prop="id"
                             label="方案ID" fixed="left" >
            </el-table-column>
            <el-table-column prop="name" min-width="150px"
                             label="方案名称">
            </el-table-column>
            <el-table-column prop="teamPrice" min-width="120px"
                             label="团队长价格">
            </el-table-column>
            <el-table-column prop="oneCommission" min-width="120px"
                             label="一级分佣">
            </el-table-column>
            <el-table-column prop="twoCommission" min-width="120px"
                             label="二级分佣">
            </el-table-column>
            <el-table-column prop="partnerCommission" min-width="120px"
                             label="合伙人分佣">
            </el-table-column>

            <!--<el-table-column min-width="200px" label="方案说明图">
              <template slot-scope="scope">
                <img :src='scope.row.schemeImg'
                     style="max-width: 100px;max-height: 50px"
                     @click="clickImg($event)">
              </template>
            </el-table-column>-->

            <el-table-column width="170px" :formatter="dateFormat" prop="createrTime"
                             label="创建时间">
            </el-table-column>

            <el-table-column min-width="200px"  prop="remarks"
                             label="备注">
            </el-table-column>

            <el-table-column fixed="right"
                             label="操作"  :width="optionW">
              <template slot-scope="scope">
                <el-button  type="info" plain size="mini"
                            @click="getInfo(scope.row.id,1)">详情</el-button>
                <el-button  type="warning" plain size="mini"
                           @click="Delete(scope.row.id)" v-if="del" >删除</el-button>
                <el-button  type="success" plain @click="getInfo(scope.row.id,2)" v-if="upd" size="mini">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <el-dialog width="800px" title="修改方案"
                   :visible.sync="dialogTableVisible">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="23">
                <el-form-item label="方案名称:"
                              prop="name"
                              :label-width="formLabelWidth">
                  <el-input v-model="formtwo.name"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="团队长价格:"
                              prop="teamPrice"
                              :label-width="formLabelWidth">
                  <el-input type="number" :style="styleObject" v-model="formtwo.teamPrice"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="续费价格:"
                              prop="renewPrice"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" v-model="formtwo.renewPrice"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="一级分佣:"
                              prop="oneCommission"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" v-model="formtwo.oneCommission"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="二级分佣:"
                              prop="twoCommission"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" v-model="formtwo.twoCommission"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="合伙人分佣:"
                              prop="partnerCommission"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" v-model="formtwo.partnerCommission"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="团队长有效天数:"
                              prop="effectiveDay"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" v-model="formtwo.effectiveDay"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="普通用户起提金额:"
                              prop="ordinaryExchange"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" v-model="formtwo.ordinaryExchange"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="团队长起提金额:"
                              prop="groupExchange"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" v-model="formtwo.groupExchange"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每日赠送人民币数:"
                              prop="giveMoney"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" v-model="formtwo.giveMoney"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每天赠送金币数:"
                              prop="giveCoin"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" v-model="formtwo.giveCoin"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每天赠送金猪数:"
                              prop="givePig"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" v-model="formtwo.givePig"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="赠送天数:"
                              prop="giveDay"
                              :label-width="formLabelWidth">
                  <el-input :style="styleObject" type="number" v-model="formtwo.giveDay"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="方案图:"
                              prop="imageUrl"
                              :label-width="formLabelWidth">
                  <el-upload
                    action="/api/upload"
                    list-type="picture-card"
                    :file-list="fileList1"
                    :on-success="handlePicture01"
                    :on-preview="handlePictureCardPreview1"
                    :on-remove="handleRemove01">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="普通用户奖励图:"
                              :label-width="formLabelWidth">
                  <el-upload
                    action="/api/upload"
                    list-type="picture-card"
                    :file-list="fileList2"
                    :on-success="handlePicture02"
                    :on-preview="handlePictureCardPreview2"
                    :on-remove="handleRemove02">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="团队长奖励图:"
                              :label-width="formLabelWidth">
                  <el-upload
                    action="/api/upload"
                    list-type="picture-card"
                    :file-list="fileList3"
                    :on-success="handlePicture03"
                    :on-preview="handlePictureCardPreview3"
                    :on-remove="handleRemove03">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </el-col>


              <el-col :span="24">
                <el-form-item label="类型描述:" prop="remarks" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.remarks" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog width="800px" title="方案详情"
                   :visible.sync="dialogTableDetail">
          <el-form :model="formtwo">
            <el-row>
              <el-col :span="23">
                <el-form-item label="方案名称:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" v-model="formtwo.name"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="团队长价格:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" type="number" :style="styleObject" v-model="formtwo.teamPrice"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="续费价格:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" v-model="formtwo.renewPrice"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="一级分佣:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" v-model="formtwo.oneCommission"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="二级分佣:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" v-model="formtwo.twoCommission"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="合伙人分佣:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" v-model="formtwo.partnerCommission"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="团队长有效天数:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" v-model="formtwo.effectiveDay"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="普通用户起提金额:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" v-model="formtwo.ordinaryExchange"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="团队长起提金额:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" v-model="formtwo.groupExchange"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每日赠送人民币数:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" v-model="formtwo.giveMoney"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每天赠送金币数:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" v-model="formtwo.giveCoin"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="每天赠送金猪数:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" v-model="formtwo.givePig"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="赠送天数:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" type="number" v-model="formtwo.giveDay"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="创建时间:"
                              :label-width="formLabelWidth">
                  <el-input :disabled="true" :style="styleObject" v-model="formtwo.createrTime"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item  label="奖励图:"
                               :label-width="formLabelWidth">
                  <div class="box_img" style="min-height: 178px">
                    <div class="box_min" v-for="(item,index) in fileList1" :key="index" >
                      <img @click="clickImg(item.url)" v-if="item.url"
                           :src="item.url"
                           class="avatar">
                    </div>

                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item  label="普通用户奖励图:"
                               :label-width="formLabelWidth">
                  <div class="box_img" style="min-height: 178px">
                    <div class="box_min"  v-for="(item,index) in fileList2" :key="index" >
                      <img @click="clickImg(item.url)" v-if="item.url"
                        :src="item.url"
                        class="avatar">
                    </div>

                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item  label="团队长奖励图:"
                               :label-width="formLabelWidth">
                  <div class="box_img" style="min-height: 178px">
                    <div class="box_min"  v-for="(item,index) in fileList3" :key="index" >
                      <img @click="clickImg(item.url)" v-if="item.url"
                        :src="item.url"
                        class="avatar">
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <!--<el-col :span="24">
                <el-form-item label="方案图:"
                              :label-width="formLabelWidth">
                  <el-upload :disabled="true" class="bannerAvatar-uploader"
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
              </el-col>-->
              <el-col :span="24">
                <el-form-item label="类型描述:" :label-width="formLabelWidth">
                  <el-input :disabled="true"  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.remarks" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-dialog>
      </div>
      <div class="block">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 70]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalCount">
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
    name: 'FissionCase',
    data() {
      return {
        fileList:'',
        fileList1:[],
        fileList2:[],
        fileList3:[],
        dialogImageUrl: '',
        dialogVisible: false,
        styleObject: {
          width: '200px',
        },
        uploadData:{},
        powerTrue:false,
        optionW:'75px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        app: 0,
        web: 1,
        advertisingPage: 1,
        webPage:2,
        advertising:3,
        areaChart:4,
        homepage: 0,
        show:0,
        activePage:1,
        detailsPage:2,
        imageUrl: '',
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        form: {
        },
        lotterylist:[],
        rules: {
          name: [
            { required: true, message: '请输入方案名称', trigger: 'blur' }
          ],
          teamPrice: [
            { required: true, message: '请输入团队长价格', trigger: 'blur' }
          ],
          renewPrice: [
            { required: true, message: '请输入续费价格', trigger: 'blur' }
          ],
          oneCommission: [
            { required: true, message: '请输入一级分佣', trigger: 'blur' }
          ],
          twoCommission: [
            { required: true, message: '请输入二级分佣', trigger: 'blur' }
          ],
          partnerCommission: [
            { required: true, message: '请输入合伙人分佣', trigger: 'blur' }
          ],
          effectiveDay: [
            { required: true, message: '请输入团队长有效天数', trigger: 'blur' }
          ],
          ordinaryExchange: [
            { required: true, message: '请输入普通用户起提金额', trigger: 'blur' }
          ],
          groupExchange: [
            { required: true, message: '请输入团队长起提金额', trigger: 'blur' }
          ],
          giveMoney: [
            { required: true, message: '请输入每日赠送人民币数', trigger: 'blur' }
          ],
          giveCoin: [
            { required: true, message: '请输入每天赠送金币数', trigger: 'blur' }
          ],
          givePig: [
            { required: true, message: '请输入每天赠送金猪数', trigger: 'blur' }
          ],
          giveDay: [
            { required: true, message: '请输入赠送天数', trigger: 'blur' }
          ],
          schemeImg: [{ required: true, message: '请选择方案图', trigger: 'change' }],
          remarks: [
                { required: true, message: '请输入备注', trigger: 'blur' }
          ],
          status: [
                {required: true, message: '请选择状态', trigger: 'change' }
              ]
            },
        formLabelWidth: '150px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        showImg: false,
        imgSrc: '',
        formInline: {},
        tableData: [],
        dialogTableDetail:false,
        ordinaryRewardImg:'',
        teamRewardImg:''
      }
    },
    components: {
      'big-img': BigImg
    },
    created() {
      this.menuId=this.$route.query.id
      this.queryBtns()
      this.accountList()
      this.uploadData={
        token:getSession("token")
      }
      // this.lotteryType()
    },
    methods: {
      handlePicture01(res, file, fileList){
        let fileImg={};
        fileImg.url=res.data;
        this.fileList1.push(fileImg)
      },

     handlePicture02(res, file, fileList){
       let fileImg={};
       fileImg.url=res.data;
       this.fileList2.push(fileImg)
      },

      handlePicture03(res, file, fileList){
        let fileImg={};
        fileImg.url=res.data;
        this.fileList3.push(fileImg)
      },
      handleRemove01(file, fileList1) {
        this.fileList1=fileList1;
      },

      handleRemove02(file, fileList2) {
        this.fileList2=fileList2;
      },

      handleRemove03(file, fileList3) {
        this.fileList3=fileList3;
      },

      handlePictureCardPreview1(file,fileList) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePictureCardPreview2(file,fileList) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handlePictureCardPreview3(file,fileList) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
      viewImg() {
        this.showImg = false
      },

      clickImg(img) {
        this.showImg = true;
        this.imgSrc = img;
      },

      handleAvatarSuccess(res, file) {
        this.imageUrl=res.data
      },
      beforeAvatarUpload(file) {

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
          // goodsName: this.formInline.goodsName
        }
        this.$fetch('/api/mFissionScheme/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            // for (let i = res.data.list.length - 1; i >= 0; i--) {
            //
            // }
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
      load() {
        this.dialogFormVisible = true;
        this.form ={};
        this.imageUrl='';
        this.formInline = {};
        this.fileList1=[];
        this.fileList2=[];
        this.fileList3=[];
      },
      addBtn(form) {
        this.form.schemeImg='';
        this.form.ordinaryRewardImg=''; //普通用户奖励图
        this.form.teamRewardImg='';//团队长奖励图
        let arr1 = '';
        if (this.fileList1.length>0){
          for(let i=0; i<this.fileList1.length;i++){
            arr1+= this.fileList1[i].url +','
          }
        }
        let arr2 = '';
        if (this.fileList2.length>0){
          for(let i=0; i<this.fileList2.length;i++){
            arr2+= this.fileList2[i].url +','
          }
        }
        let arr3 = '';
        if (this.fileList3.length>0){
          for(let i=0; i<this.fileList3.length;i++){
            arr3+= this.fileList3[i].url +','
          }
        }
        this.form.schemeImg=arr1.substr(0, arr1.length - 1);
        this.form.ordinaryRewardImg=arr2.substr(0, arr2.length - 1); //普通用户奖励图
        this.form.teamRewardImg=arr3.substr(0, arr3.length - 1);//团队长奖励图
        this.$refs[form].validate(valid => {
          if (valid) {
            this.$post('/api/mFissionScheme/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false
                this.$message({ type: 'success', message: '添加成功！' })
                this.accountList()
              }
            })
          } else {
            // this.$message({
            //   type: 'error',
            //   message: res.message,
            //   duration: 3000
            // })

          }
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
            this.$message({ type: 'info', message: '已取消删除' })
          })
      },
      delData(id) {
        this.$fetch('/api/mFissionScheme/remove',{
          id: id
        } ).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({ type: 'success', message: '删除成功！' })
            this.accountList()
          } else {
          }
        })
      },
      //修改
      getInfo(id,types) {
        this.fileList1=[];
        this.fileList2=[];
        this.fileList3=[];
        this.$fetch('/api/mFissionScheme/queryOne',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            if (types==1){
              this.dialogTableDetail = true;
              res.data.createrTime = formatDate(new Date(res.data.createrTime), 'yyyy-MM-dd hh:mm:sss')
            }else {
              this.dialogTableVisible = true
            }
            /*let ob={};*/
          var arr1=res.data.schemeImg.split(',');
          for(var i=0;i<arr1.length;i++){
            let fileImg1={};
            fileImg1.url=arr1[i];
            this.fileList1.push(fileImg1)
          }

          var arr2=res.data.ordinaryRewardImg.split(',');
          for(var i=0;i<arr2.length;i++){
            let fileImg2={};
            fileImg2.url=arr2[i];
            this.fileList2.push(fileImg2)
          }

          var arr3=res.data.teamRewardImg.split(',');
          for(var i=0;i<arr3.length;i++){
            let fileImg3={};
            fileImg3.url=arr3[i];
            this.fileList3.push(fileImg3)
          }
            this.formtwo = res.data;
          }
        })
      },
      //修改的确定按钮
      update(formtwo) {
        this.formtwo.schemeImg='';
        this.formtwo.ordinaryRewardImg=''; //普通用户奖励图
        this.formtwo.teamRewardImg='';//团队长奖励图
        let arr1 = '';
        if (this.fileList1.length>0){
          for(let i=0; i<this.fileList1.length;i++){
            arr1+= this.fileList1[i].url +','
          }
        }

        let arr2 = '';
        if (this.fileList2.length>0){
          for(let i=0; i<this.fileList2.length;i++){
            arr2+= this.fileList2[i].url +','
          }
        }
        let arr3 = '';
        if (this.fileList3.length>0){
          for(let i=0; i<this.fileList3.length;i++){
            arr3+= this.fileList3[i].url +','
          }
        }
        this.formtwo.schemeImg=arr1.substr(0, arr1.length - 1);
        this.formtwo.ordinaryRewardImg=arr2.substr(0, arr2.length - 1); //普通用户奖励图
        this.formtwo.teamRewardImg=arr3.substr(0, arr3.length - 1);//团队长奖励图
        this.formtwo.createTime = '';
        this.$put('/api/mFissionScheme/modify', this.formtwo).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({ type: 'success', message: '修改成功！' })
            this.dialogTableVisible = false
            this.accountList()
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
      }
    }
  }
</script>
<style type="text/css">
  .bannermanage-wrap {
    width: 100%;
  }
  .bannermanage-inner {
    margin: auto;
    padding: 0 20px;
  }
  .bannermanage-header {
    margin-bottom: 20px;
  }
  .bannermanage-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .bannermanage-table {
    border: 1px solid #e6e6e6;
    margin-bottom: 20px;
    margin-top: 20px;
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
    width: 138px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    max-width: 148px;
    max-height: 148px;
    display: block;
  }
  .form {
    /*overflow-y: scroll;*/
    height: auto;
  }
  .el-icon-plus{
    line-height:0;
  }
  .bannerAvatar-uploader-icon{
    line-height: 178px !important;
  }

  .box_img{
    height: auto;
     width: 560px;
     min-height: 178px;
    border: 1px solid #dcdfe6;
    float: left;
    background-color: #f5f7fa;
    display: block;
    position: relative;
  }

  .box_img .box_min{
    width: 148px;
    height: 148px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-content: space-between;
    align-items: center;
    border: 1px dashed #ccc;
    /*position: relative;*/
  }

  .box_img img{
    max-width: 148px;
    max-height: 148px;
  }
  .box_img .box_min img.avatar{
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: auto;
    height: auto;
    max-width: 148px;
    max-height: 148px;
  }

</style>
