<template>
  <div class="lottery-goods-wrap">
    <div class="lottery-goods-inner">
      <div class="lottery-goods-header">
        <h3>运营管理/奖品管理</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-form-item label="奖品名称"
                        prop="goodsName">
            <el-input placeholder="请输入奖品名称"
                      v-model="formInline.goodsName"
                      clearable></el-input>
          </el-form-item>
          <el-form-item label="类型名称">
            <el-select :style="styleObject" v-model="formInline.typeId" placeholder="">
              <el-option v-for="item in lotterylist" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-button type="primary" plain @click="search()">查询</el-button>
          <el-button type="success" plain @click="load()" v-if="add">添加奖品</el-button>
        </el-form>
      </div>
      <div>
        <el-dialog title="添加奖品" width="1000px"
                   :visible.sync="dialogFormVisible">
          <template>
            <el-tabs v-model="index" type="card" @tab-click="handleClick(index)">
              <el-tab-pane v-for="item in lotterylist" :index="item" :key="item.id" :label="item.typeName"></el-tab-pane>
            </el-tabs>
          </template>
          <el-form v-show="activeName==2" :model="form"
                   :rules="rules"
                   ref="form">
            <div class="form">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="奖品价格:" :label-width="formLabelWidth" prop="price">
                    <el-input :style="styleObject" v-model.number="form.price" auto-complete="off"  clearable>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="奖品类型:"  prop="goodsType" :label-width="formLabelWidth">
                    <el-select :style="styleObject" v-model="form.goodsType" placeholder="">
                      <el-option label="虚拟" :value="1"></el-option>
                      <el-option label="实物" :value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="中奖概率(%):" :label-width="formLabelWidth" prop="rate">
                    <el-input :style="styleObject"  v-model.number="form.rate" auto-complete="off"  clearable>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否启用:"  prop="status" :label-width="formLabelWidth">
                    <el-select :style="styleObject" v-model="form.status" placeholder="">
                      <el-option label="启用" :value="1"></el-option>
                      <el-option label="停用" :value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="22">
                  <el-form-item label="奖品名称:"
                                prop="goodsName"
                                :label-width="formLabelWidth">
                    <el-input  v-model="form.goodsName"
                              auto-complete="off"
                              clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="22">
                  <el-form-item label="类型描述:" prop="remark" :label-width="formLabelWidth">
                    <el-input  spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="form.remark" auto-complete="off" clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="奖品图片:"
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
                </el-col>
              </el-row>
            </div>
          </el-form>
           <div v-show="activeName==2" slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="addBtn('form')">确 定</el-button>
          </div>
          <el-form v-show="activeName==1" :model="formShop"
                   :rules="rules"
                   ref="formShop">
            <div class="form">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="奖品类型:"  prop="goodsType" :label-width="formLabelWidth">
                    <el-select :style="styleObject" v-model="formShop.goodsType" placeholder="">
                      <el-option label="虚拟" :value="1"></el-option>
                      <el-option label="实物" :value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="排序:" :label-width="formLabelWidth" prop="orders">
                    <el-input :style="styleObject" v-model.number="formShop.orders" auto-complete="off"  clearable>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="兑换价格(金猪):" :label-width="formLabelWidth" prop="pigCoin">
                    <el-input :style="styleObject" v-model.number="formShop.pigCoin" auto-complete="off"  clearable>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="价格:" :label-width="formLabelWidth" prop="price">
                    <el-input :style="styleObject" v-model.number="formShop.price" auto-complete="off"  clearable>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="奖品数量:" :label-width="formLabelWidth" prop="goodsNumber">
                    <el-input :style="styleObject" v-model.number="formShop.goodsNumber" auto-complete="off"  clearable>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="是否启用:"  prop="status" :label-width="formLabelWidth">
                    <el-select :style="styleObject" v-model="formShop.status" placeholder="">
                      <el-option label="启用" :value="1"></el-option>
                      <el-option label="停用" :value="2"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="22">
                  <el-form-item label="奖品简称:"
                                prop="goodsName"
                                :label-width="formLabelWidth">
                    <el-input  v-model="formShop.abbreviation"
                               auto-complete="off"
                               clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="22">
                  <el-form-item label="奖品名称:"
                                prop="goodsName"
                                :label-width="formLabelWidth">
                    <el-input  v-model="formShop.goodsName"
                               auto-complete="off"
                               clearable></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="22">
                  <el-form-item label="类型描述:" prop="remark" :label-width="formLabelWidth">
                    <el-input  spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formShop.remark" auto-complete="off" clearable></el-input>
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="上传icon:"
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
                </el-col>

                <el-col :span="24">
                  <el-form-item label="奖品轮播图:"
                                prop="carouselImg"
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
                  <el-form-item label="奖品详情图:"
                                prop="infoImg"
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
              </el-row>
            </div>
          </el-form>
          <div v-show="activeName==1" slot="footer"
               class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="addformShop('formShop')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <div class="lottery-goods-table">
        <template>
          <el-table :data="tableData"
                    style="width: 100%"
                    max-height="560">
            <el-table-column label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80' fixed="left">
            </el-table-column>
            <el-table-column  prop="goodsName"
                             label="奖品名称" fixed="left" >
              <template slot-scope="scope">
                <span class="yichu">{{scope.row.goodsName}}</span>
              </template>
            </el-table-column>
            <el-table-column width="150px" prop="typeName"
                             label="类型名称"  >
            </el-table-column>

            <el-table-column width="170px" prop="pigCoin"
                             label="抽奖价格(金猪)"  >
              <template slot-scope="scope">
                <span class="yellow"> {{scope.row.pigCoin | currency}}</span>
            </template>
              <!--goodsNumber-goodsConsumeNumber  剩余数量-->

            </el-table-column>

            <el-table-column  width="120px"
                             label="剩余数量">
              <template slot-scope="scope">
                <span class="red"> {{scope.row.goodsNumber-scope.row.goodsConsumeNumber}}</span>
              </template>
            </el-table-column>

            <el-table-column width="150px" prop="price"
                             label="奖品价格(￥)"  >
            </el-table-column>
            <el-table-column prop="rate" width="120px"
                             label="中奖概率(%)">
            </el-table-column>
            <!--<el-table-column min-width="200px" label="奖品图片">-->
              <!--<template slot-scope="scope">-->
                <!--<img :src='scope.row.imageUrl'-->
                     <!--style="max-width: 100px;max-height: 50px"-->
                     <!--@click="clickImg($event)">-->
              <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="orders" width="120px"
                             label="排序">
            </el-table-column>
            <el-table-column prop="status" width="120px"
                             label="状态">
              <template slot-scope="scope">
                <span class="green" v-if="scope.row.status==1">已启用</span>
                <span class="red" v-if="scope.row.status==2">已停用</span>
                <span class="zi" v-if="scope.row.status==3">已删除</span>
              </template>
            </el-table-column>
            <el-table-column width="170px" :formatter="dateFormat" prop="createTime"
                             label="创建时间">
            </el-table-column>
            <el-table-column fixed="right"
                             label="操作" v-if="powerTrue" :width="optionW">
              <template slot-scope="scope">
                <el-button type="info" plain size="mini"
                           @click="getInfo(scope.row.id,1)">详情</el-button>
                <el-button type="warning" plain size="mini"
                           @click="Delete(scope.row.id)" v-if="del && scope.row.status!=3"><span v-if="optionW='220px'"></span> 删除</el-button>
                <el-button  type="success" v-if="upd && scope.row.status!=3" plain @click="getInfo(scope.row.id,2)" size="mini">
                  <span v-if="optionW='220px'"></span> 修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <big-img v-if="showImg"
                 @clickit="viewImg"
                 :imgSrc="imgSrc"></big-img>
        <el-dialog width="1000px" title="修改奖品"
                   :visible.sync="dialogTableVisible">
          <el-form :model="formtwo"
                   :rules="rules"
                   ref="formtwo">
            <el-row v-if="formtwo.lotterySort==2">
              <el-form  :model="formtwo"
                       :rules="rules"
                       ref="formtwo">
                <div class="form">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="奖品价格:" :label-width="formLabelWidth" prop="price">
                        <el-input :style="styleObject" v-model.number="formtwo.price" auto-complete="off"  clearable>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="奖品类型:"  prop="goodsType" :label-width="formLabelWidth">
                        <el-select :style="styleObject" v-model="formtwo.goodsType" placeholder="">
                          <el-option label="虚拟" :value="1"></el-option>
                          <el-option label="实物" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="中奖概率(%):" :label-width="formLabelWidth" prop="rate">
                        <el-input :style="styleObject"  v-model.number="formtwo.rate" auto-complete="off"  clearable>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="是否启用:"  prop="status" :label-width="formLabelWidth">
                        <el-select :style="styleObject" v-model="formtwo.status" placeholder="">
                          <el-option label="启用" :value="1"></el-option>
                          <el-option label="停用" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="22">
                      <el-form-item label="奖品名称:"
                                    prop="goodsName"
                                    :label-width="formLabelWidth">
                        <el-input  v-model="formtwo.goodsName"
                                   auto-complete="off"
                                   clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="22">
                      <el-form-item label="类型描述:" prop="remark" :label-width="formLabelWidth">
                        <el-input  spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.remark" auto-complete="off" clearable></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="24">
                      <el-form-item label="奖品图片:"
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
                    </el-col>
                  </el-row>
                </div>
              </el-form>
            </el-row>
            <el-row v-if="formtwo.lotterySort==1">
              <el-form  :model="formtwo"
                       :rules="rules"
                       ref="formShop">
                <div class="form">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="奖品类型:"  prop="goodsType" :label-width="formLabelWidth">
                        <el-select :style="styleObject" v-model="formtwo.goodsType" placeholder="">
                          <el-option label="虚拟" :value="1"></el-option>
                          <el-option label="实物" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="排序:" :label-width="formLabelWidth" prop="orders">
                        <el-input :style="styleObject" v-model.number="formtwo.orders" auto-complete="off"  clearable>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="兑换价格(金猪):" :label-width="formLabelWidth" prop="pigCoin">
                        <el-input :style="styleObject" v-model.number="formtwo.pigCoin" auto-complete="off"  clearable>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="价格:" :label-width="formLabelWidth" prop="price">
                        <el-input :style="styleObject" v-model.number="formtwo.price" auto-complete="off"  clearable>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="奖品数量:" :label-width="formLabelWidth" prop="goodsNumber">
                        <el-input :style="styleObject" v-model.number="formtwo.goodsNumber" auto-complete="off"  clearable>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="是否启用:"  prop="status" :label-width="formLabelWidth">
                        <el-select :style="styleObject" v-model="formtwo.status" placeholder="">
                          <el-option label="启用" :value="1"></el-option>
                          <el-option label="停用" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="22">
                      <el-form-item label="奖品简称:"
                                    prop="goodsName"
                                    :label-width="formLabelWidth">
                        <el-input  v-model="formtwo.abbreviation"
                                   auto-complete="off"
                                   clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="22">
                      <el-form-item label="奖品名称:"
                                    prop="goodsName"
                                    :label-width="formLabelWidth">
                        <el-input  v-model="formtwo.goodsName"
                                   auto-complete="off"
                                   clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="22">
                      <el-form-item label="类型描述:" prop="remark" :label-width="formLabelWidth">
                        <el-input  spellcheck="false" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.remark" auto-complete="off" clearable></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="上传icon:"
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
                    </el-col>
                    <el-col :span="24">
                      <el-form-item label="奖品轮播图:"
                                    prop="carouselImg"
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
                      <el-form-item label="奖品详情图:"
                                    prop="infoImg"
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
                  </el-row>
                </div>
              </el-form>
            </el-row>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="dialogTableVisible = false">取 消</el-button>
              <el-button type="primary"
                         @click="update(formtwo)">确 定</el-button>
            </div>
            <el-row style="display: none;">
              <el-col :span="12">
                <el-form-item label="类型名称:" :label-width="formLabelWidth" prop="typeName">
                  <el-select v-model="formtwo.typeId" placeholder="">
                    <el-option v-for="(item,index) in lotterylist" :key="index" :label="item.typeName" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="奖品价格:" :label-width="formLabelWidth" prop="price">
                  <el-input type="number" min="0" v-model="formtwo.price" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="中奖概率(%):" :label-width="formLabelWidth" prop="rate">
                  <el-input type="number" min="0" v-model="formtwo.rate" auto-complete="off"  clearable>
                  </el-input>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="是否启用:"  prop="status" :label-width="formLabelWidth">
                  <el-select v-model="formtwo.status" placeholder="">
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="停用" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="24">
                <el-form-item label="奖品名称:"
                              prop="goodsName"
                              :label-width="formLabelWidth">
                  <el-input v-model="formtwo.goodsName"
                            auto-complete="off"
                            clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="类型描述:" prop="remark" :label-width="formLabelWidth">
                  <el-input  type="textarea" :autosize="{ minRows: 4, maxRows: 6}" v-model="formtwo.remark" auto-complete="off" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="奖品图片:"
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
              </el-col>
            </el-row>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="update('formtwo')">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog width="1000px" title="奖品详情"
                   :visible.sync="dialogTableDetail">
          <el-form :model="formtwo">
            <el-row >
            <div class="box_xinxi">
              <div class="wrap_da">
                <div class="header">
                  <span>详情信息</span>
                  <span></span>
                </div>
                <div class="body_list">
                  <div class="title">奖品类型:</div>
                  <div class="name">
                    <span v-if="formtwo.goodsType==1">虚拟</span>
                    <span v-if="formtwo.goodsType==2">实物</span>
                  </div>
                </div>
                <div class="body_list" v-if="formtwo.lotterySort==1">
                  <div class="title">排序:</div>
                  <div class="name">
                    {{formtwo.orders}}
                  </div>
                </div>
                <div class="body_list" v-if="formtwo.lotterySort==1">
                  <div class="title">兑换价格(金猪):</div>
                  <div class="name">
                    {{formtwo.pigCoin | currency}}
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">价格:</div>
                  <div class="name">
                    {{formtwo.price}}
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">奖品数量:</div>
                  <div class="name">
                    {{formtwo.goodsNumber}}
                  </div>
                </div>
                <div class="body_list">
                  <div class="title">是否启用:</div>
                  <div class="name">
                    <span v-if="formtwo.status==1">已启用</span>
                    <span v-if="formtwo.status==2">已停用</span>
                  </div>
                </div>
                <div class="body_list" v-if="formtwo.lotterySort==1" style="width: 100%">
                  <div class="title">奖品简称:</div>
                  <div class="name">
                    {{formtwo.abbreviation}}
                  </div>
                </div>
                <div class="body_list" style="width: 100%" >
                  <div class="title">奖品名称:</div>
                  <div class="name">
                    {{formtwo.goodsName}}
                  </div>
                </div>
                <div class="body_list dec" style="width: 100%" >
                  <div class="title">类型描述:</div>
                  <div class="name">
                    <span class="dec">  {{formtwo.remark}}</span>
                  </div>
                </div>
                <div class="body_list img" style="width: 100%" >
                  <div class="title">
                    <span v-if="formtwo.lotterySort==1">icon:</span>
                    <span v-else>奖品图片</span>
                  </div>
                  <img @click="clickImg(formtwo.imageUrl)" :src="formtwo.imageUrl" />
                </div>
                <div v-if="formtwo.lotterySort==1" class="body_list img" style="width: 100%" >
                  <div class="title">
                    奖品轮播图:
                  </div>
                  <div class="img_box" style="width: 730px;float: left">
                    <div @click="clickImg(item.url)" v-if="fileList1" v-for="item in fileList1" class="more_img">
                      <img  :src="item.url"  />
                    </div>
                  </div>
                </div>

                <div v-if="formtwo.lotterySort==1" class="body_list img" style="width: 100%" >
                  <div class="title">
                    奖品详情图:
                  </div>
                  <div class="img_box" style="width: 730px;float: left">
                    <div @click="clickImg(item.url)" v-if="fileList2" v-for="item in fileList2" class="more_img">
                      <img  :src="item.url" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    name: 'LotteryGoods',
    data() {
      return {
        formtwoInfo:{},
        formShop:{
          carouselImg:'',
          infoImg:'',
          imageUrl:''
        },
        activeName: 1,
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
          goodsName: [
             { required: true, message: '请输入奖品名称', trigger: 'blur' }
            ],
          price: [
            { required: true, message: '请输入奖品价格', trigger: 'blur' },
            { type: 'number', message: '请输入数字值'}
          ],
            rate: [
            { required: true, message: '请输入中奖概率', trigger: 'blur' },
              { type: 'number', message: '请输入数字值'}
            ],
            imageUrl: [{ required: true, message: '请选择图片', trigger: 'change' }],
            remark: [
            { required: true, message: '请输入奖品描述', trigger: 'blur' }
            ],
            status: [
              {required: true, message: '请选择状态', trigger: 'change' }
             ],
            goodsType: [
              {required: true, message: '请选择奖品类型', trigger: 'change' }
            ],
            imageUrlIcon: [
              {required: true, message: '请选择icon', trigger: 'change' }
            ],
            orders: [
              { required: true, message: '请输入排序', trigger: 'blur' },
              { type: 'number', message: '请输入数字值'}
            ],
            goodsNumber: [
              { required: true, message: '请输入剩余份数', trigger: 'blur' },
              { type: 'number', message: '请输入数字值'}
            ],
          pigCoin: [
              { required: true, message: '请输入兑换价格(金猪)', trigger: 'blur' },
              { type: 'number', message: '请输入数字值'}
            ],
          price: [
            { required: true, message: '请输入价格', trigger: 'blur' },
            { type: 'number', message: '请输入数字值'}
          ],
          carouselImg: [{required: true, message: '请输入奖品轮播图', trigger: 'change' }],
          infoImg : [{required: true, message: '请输入奖品详情图', trigger: 'change' }],
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        showImg: false,
        imgSrc: '',
        formInline: {},
        tableData: [],
        dialogTableDetail:false,
        styleObject:{
          width:'200px'
        },
        activeId:'',
        imageUrlIcon:'',
        fileList1:[],
        fileList2:[]
      }
    },
    components: {
      'big-img': BigImg
    },
    created() {
      this.menuId=this.$route.query.id;
      this.queryBtns();
      this.accountList();
      this.uploadData={
        token:getSession("token")
      }
      this.lotteryType();
    },
    filters: {
      //每隔三位数字以逗号隔开，保留小数点后两位
      currency: function (num) {
        var dataval = parseInt(num);
        return dataval.toFixed(0).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        // return dataval.toFixed(2).replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,'$&,');
      },
      },
    methods: {
      handleClick(tab) {
        this.activeName=this.lotterylist[tab].lotterySort;
        this.activeId = this.lotterylist[tab].id;
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
      clickImg(img) {
        this.showImg = true;
        this.imgSrc = img
      },
      viewImg() {
        this.showImg = false
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
          goodsName: this.formInline.goodsName,
          typeId: this.formInline.typeId
        }
        this.$fetch('/api/mLotteryGoods/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
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
        this.dialogFormVisible = true;
        this.form ={};
        this.imageUrl='';
        this.formInline = {};
        this.lotteryType();
        this.fileList1=[];
        this.fileList2=[];
        this.formShop.carouselImg='';
        this.formShop.infoImg='';
      },
      addBtn(form) {
        this.form.imageUrl=this.imageUrl;
        this.form.typeId =this.activeId;
        this.$refs[form].validate(valid => {
          if (valid) {
            this.$post('/api/mLotteryGoods/add', this.form).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false
                this.$message({ type: 'success', message: '添加成功！' })
                this.accountList()
              }else {
                this.$message({ type: 'warning', message: res.message})
              }
            })
          } else {
          }
        })
      },
      addformShop(formShop) {
        this.formShop.carouselImg=''; //奖品轮播图
        this.formShop.infoImg ='';//奖品详情图
        this.formShop.typeId =this.activeId;
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
        this.formShop.carouselImg=arr1.substr(0, arr1.length - 1);
        this.formShop.infoImg=arr2.substr(0, arr2.length - 1);
        this.formShop.imageUrl=this.imageUrl;
        this.formShop.typeId =this.activeId;
        this.formShop.rate=100;
        this.$refs[formShop].validate(valid => {
          if (valid) {
            this.$post('/api/mLotteryGoods/add', this.formShop).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
                this.dialogFormVisible = false
                this.$message({ type: 'success', message: '添加成功！' })
                this.accountList()
              }else {
                this.$message({ type: 'warning', message: res.message})
              }
            })
          } else {

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
        this.$fetch('/api/mLotteryGoods/remove',{
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
        this.fileList1 = [];
        this.fileList2 = [];
        this.imageUrl='';
        this.$fetch('/api/mLotteryGoods/queryOne',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            if (types==1){//详情
              this.dialogTableDetail = true;
              res.data.createTime = formatDate(new Date(res.data.createTime), 'yyyy-MM-dd hh:mm:sss')
            }
            else if(types==2) {//修改
              this.dialogTableVisible = true;
            }
            if (res.data.lotterySort == 1) {
              if (res.data.carouselImg) {
                var arr1 = res.data.carouselImg.split(',');
                for (var i = 0; i < arr1.length; i++) {
                  let fileImg1 = {};
                  fileImg1.url = arr1[i];
                  this.fileList1.push(fileImg1);
                }
                if (res.data.infoImg) {
                  var arr2 = res.data.infoImg.split(',');
                  for (var i = 0; i < arr2.length; i++) {
                    let fileImg2 = {};
                    fileImg2.url = arr2[i];
                    this.fileList2.push(fileImg2)
                  }
                }
              }
            }
            this.formtwo = res.data;
            this.imageUrl = res.data.imageUrl;
          }
        })
      },
      //修改的确定按钮
      update(formtwo) {
        if (this.formtwo.lotterySort==1){
          this.formtwo.carouselImg='';
          this.formtwo.infoImg=''; //普通用户奖励图
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
          this.formtwo.carouselImg=arr1.substr(0, arr1.length - 1);
          this.formtwo.infoImg=arr2.substr(0, arr2.length - 1); //普通用户奖励图
        }

        this.formtwo.imageUrl=this.imageUrl;
        this.formtwo.createTime = '';

        this.$refs[formtwo].validate(valid => {
          if (valid) {
            this.$put('/api/mLotteryGoods/modify', this.formtwo).then(res => {
              if ((res.statusCode + "").startsWith("2")) {
                this.$message({type: 'success', message: '修改成功！'})
                this.dialogTableVisible = false
                this.accountList()
              }
            })
          }
        })
      },

      //奖品类型
        lotteryType(){
          this.$fetch('/api/mLotteryType/list').then(res => {
            if ((res.statusCode+"").startsWith("2")) {
              this.lotterylist = res.data;
              this.activeId=this.lotterylist[0].id;
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

      handleRemove01(file, fileList1) {
        this.fileList1=fileList1;
      },
      handleRemove02(file, fileList2) {
        this.fileList2=fileList2;
      },
      handlePictureCardPreview1(file,fileList) {
        this.showImg = true;
        this.imgSrc = file.url
      },
      handlePictureCardPreview2(file,fileList) {
        this.showImg = true;
        this.imgSrc = file.url
      },
    }
  }
</script>
<style type="text/css">
  .blue{
    color: #409eff;
  }
  .green{
    color: #13ce66;
  }
  .yellow{
    color: #e6a23c;
  }

  .red{
    color: #ff4d51;
  }

  .zi{
    color: #d8b1ee;
  }
  .lottery-goods-wrap {
    width: 100%;
  }
  .lottery-goods-inner {
    margin: auto;
    padding: 0 20px;
  }
  .lottery-goods-header {
    margin-bottom: 20px;
  }
  .lottery-goods-header hr {
    color: #e6e6e6;
    opacity: 0.5;
  }
  .lottery-goods-table {
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
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }

  .el-icon-plus{
    line-height:0;
  }
  .bannerAvatar-uploader-icon{
    line-height: 148px !important;
  }

  .bannerAvatar-uploader .el-upload{
    width: 148px;
    height: 148px;
    line-height: 148px;
  }
  .el-upload el-upload--text{
    width: 148px;
    height: 148px;
    line-height: 148px;
  }

  .yichu{
    width: 100%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }


</style>
