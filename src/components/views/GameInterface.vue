<template>
  <div class="bannermanage-wrap">
    <div class="bannermanage-inner">
      <div class="bannermanage-header">
        <h3>第三方/接口列表</h3>
        <hr />
      </div>
      <div>
        <el-form :inline="true"
                 :model="formInline"
                 class="demo-form-inline">
          <el-button @click="addMethod()" >添加接口</el-button>
        </el-form>
      </div>
      <div>
        <el-dialog title="添加接口" width="700px"
                   :visible.sync="dialogMethod">
          <el-form :model="formMethod"
                   :rules="rules"
                   ref="formsend">
            <div class="form">
              <el-form-item label="商户名称:"
                            label-width="140px" prop="name">
                <el-select style="width: 200px" v-model="formMethod.companyId" @change="changeLocationValue"  placeholder="" >
                  <el-option v-for="(item,index) in company" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>

              </el-form-item>
              <el-form-item label="接口名称:"
                            label-width="140px" prop="interfaceName">
                <el-input v-model="formMethod.interfaceName"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label="接口代码:"
                            label-width="140px" prop="interfaceCode">
                <el-input v-model="formMethod.interfaceCode"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label="基础地址:"
                            label-width="140px" prop="baseUrl">
                <el-input v-model="formMethod.baseUrl"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label="定时顺序:"
                            label-width="140px" prop="weight">
                <el-input min="0" type="number" v-model="formMethod.weight"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label-width="140px" label="预计获取金币:"  prop="coins">
                <el-input type="number" min="0" v-model="formMethod.coins"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label-width="140px" label="游戏类型:"  prop="game_type">
                <el-select style="width: 200px" v-model="formMethod.game_type" placeholder="" >
                  <el-option :key="index" v-for="(item,index) in gameList" :label="item.typeName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label-width="140px" label="请求类型:" prop="reqType">
                <el-select style="width: 200px" v-model="formMethod.reqType" placeholder="" >
                  <el-option label="get" value="1"></el-option>
                  <el-option label="post" value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label-width="140px" label="是否循环:"  prop="isCycle">
                <el-select style="width: 200px" v-model="formMethod.isCycle" placeholder="" >
                  <el-option label="是" value="1"></el-option>
                  <el-option label="否" value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogMethod = false">取 消</el-button>
            <el-button type="primary"
                       @click="methodBtn('formMethod')">确 定</el-button>
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
            <el-table-column fixed="left" prop="name"
                             label="所属公司名称" width="200px" >
            </el-table-column>

            <el-table-column width="200px"  prop="interfaceName"
                              label="接口名称">
            </el-table-column>

            <el-table-column width="300px"  prop="interfaceCode"
                              label="接口代码">
            </el-table-column>

            <el-table-column width="300px"   prop="baseUrl"
                              label="基础地址">
            </el-table-column>

            <el-table-column width="100px"  prop="reqType"
                              label="请求类型">
            </el-table-column>

            <el-table-column width="100px" prop="isCycle"
                              label="是否循环">
            </el-table-column>

            <el-table-column prop="createTime" width="200px"
                             label="创建时间" :formatter="dateFormat">
            </el-table-column>

            <el-table-column fixed="right"
                             label="操作"
                             :width="optionW">
              <template slot-scope="scope">
                <el-button size="mini" @click="getInfo(scope.row.id,1)">详情</el-button>
                <el-button size="mini" @click="Delete(scope.row.id)" v-if="del">删除</el-button>
                <el-button @click="getInfo(scope.row.id,2)" size="mini" v-if="upd">修改</el-button>
                <el-button v-if="seePar" @click="paramsTap(scope.row.id,scope.row.interfaceName)" size="mini" >请求参数</el-button>
                <el-button @click="responseParamsTap(scope.row.id)" v-if="resparse" size="mini" >响应参数</el-button>
                <el-button @click="getCame(scope.row.id)" v-if="game" size="mini" >获取游戏</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <el-dialog title="修改接口" width="700px"
                   :visible.sync="dialogTableVisible">
          <el-form :model="formtwo">
            <div class="form">
              <el-form-item label="商户名称:"
                            label-width="140px" prop="name">
                <el-select style="width: 200px" v-model="formtwo.companyId" @change="changeLocationValue"  placeholder="" >
                  <el-option v-for="(item,index) in company" :key="index" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="接口名称:"
                            label-width="140px" prop="interfaceName">
                <el-input v-model="formtwo.interfaceName"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label="接口代码:"
                            label-width="140px" prop="interfaceCode">
                <el-input v-model="formtwo.interfaceCode"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label="基础地址:"
                            label-width="140px" prop="baseUrl">
                <el-input v-model="formtwo.baseUrl"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label="定时顺序:"
                            label-width="140px" prop="weight">
                <el-input type="number" min="0" v-model="formtwo.weight"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label-width="140px" label="预计获取金币:"  prop="coins">
                <el-input type="number" min="0" v-model="formtwo.coins"
                          auto-complete="off"
                          clearable
                          style="width: 400px;"></el-input>
              </el-form-item>

              <el-form-item label-width="140px" label="游戏类型:"  prop="game_type">
                <el-select style="width: 200px" v-model="formtwo.game_type" placeholder="" >
                  <el-option :key="index" v-for="(item,index) in gameList" :label="item.typeName" :value="item.game_type"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label-width="140px" label="请求类型:" prop="reqType">
                <el-select style="width: 200px" v-model="formtwo.reqType" placeholder="" >
                  <el-option label="get" :value="1"></el-option>
                  <el-option label="post" :value="2"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label-width="140px" label="是否循环:"  prop="isCycle">
                <el-select style="width: 200px" v-model="formtwo.isCycle" placeholder="" >
                  <el-option label="是" :value="1"></el-option>
                  <el-option label="否" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
          <div slot="footer"
               class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary"
                       @click="update(formtwo)">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="接口详情" :visible.sync="dialog" width="800px">
          <el-form>
            <el-row>
              <div class="form">
                <el-form-item label="商户名称:"
                              label-width="140px" prop="name">
                  <el-select :disabled="true" style="width: 200px" v-model="formtwo.companyId" @change="changeLocationValue"  placeholder="" >
                    <el-option v-for="(item,index) in company" :key="index" :label="item.name" :value="item.id"></el-option>
                  </el-select>

                </el-form-item>
                <el-form-item label="接口名称:"
                              label-width="140px" prop="interfaceName">
                  <el-input :disabled="true" v-model="formtwo.interfaceName"
                            auto-complete="off"
                            clearable
                            style="width: 400px;"></el-input>
                </el-form-item>

                <el-form-item label="接口代码:"
                              label-width="140px" prop="interfaceCode">
                  <el-input :disabled="true" v-model="formtwo.interfaceCode"
                            auto-complete="off"
                            clearable
                            style="width: 400px;"></el-input>
                </el-form-item>

                <el-form-item label="基础地址:"
                              label-width="140px" prop="baseUrl">
                  <el-input :disabled="true" v-model="formtwo.baseUrl"
                            auto-complete="off"
                            clearable
                            style="width: 400px;"></el-input>
                </el-form-item>

                <el-form-item label-width="140px" label="预计获取金币:"  prop="coins">
                  <el-input :disabled="true" type="number" v-model="formtwo.coins"
                            auto-complete="off"
                            clearable
                            style="width: 400px;"></el-input>
                </el-form-item>

                <el-form-item label-width="140px" label="游戏类型:"  prop="game_type">
                  <el-select :disabled="true" style="width: 200px" v-model="formtwo.game_type" placeholder="" >
                    <el-option :key="index" v-for="(item,index) in gameList" :label="item.typeName" :value="item.game_type"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="定时顺序:"
                              label-width="140px" prop="weight">
                  <el-input :disabled="true" v-model="formtwo.weight"
                            auto-complete="off"
                            clearable
                            style="width: 400px;"></el-input>
                </el-form-item>

                <el-form-item label-width="140px" label="请求类型:" prop="reqType">
                  <el-select :disabled="true" style="width: 200px" v-model="formtwo.reqType" placeholder="" >
                    <el-option label="get" :value="1"></el-option>
                    <el-option label="post" :value="2"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label-width="140px" label="是否循环:"  prop="isCycle">
                  <el-select :disabled="true" style="width: 200px" v-model="formtwo.isCycle" placeholder="" >
                    <el-option label="是" :value="1"></el-option>
                    <el-option label="否" :value="2"></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialog = false">取 消</el-button>
          </div>
        </el-dialog>

        <el-dialog title="查看参数" width="1200px"
                   :visible.sync="dialogParams">
          <el-button style="margin-bottom: 30px" @click="addParamsDia" >添加参数</el-button>
          <template>
            <el-table :data="paramsData"
                      style="width: 100%"
                      height="580">
              <el-table-column label="序号"
                               type="index"
                               :index="indexMethod"
                               width='80' fixed="left">
              </el-table-column>
              <el-table-column fixed="left" prop="interfaceName"
                               label="所属接口名称" width="200px" >
              </el-table-column>

              <el-table-column width="150px"  prop="name"
                               label="参数名称">
              </el-table-column>

              <el-table-column width="150px"   prop="code"
                               label="参数代码">
              </el-table-column>

              <el-table-column width="100px"  prop="type"
                               label="参数类型">
              </el-table-column>

              <el-table-column width="100px"  prop="value"
                               label="参数值">
              </el-table-column>


              <el-table-column width="100px" prop="isEncrypt"
                               label="是否加密">
              </el-table-column>

              <el-table-column width="100px" prop="encryptType"
                               label="加密类型">
              </el-table-column>

              <el-table-column width="100px" prop="encryptSeparator"
                               label="加密分隔符">
              </el-table-column>

              <el-table-column width="100px" prop="isNeed"
                               label="是否必须">
              </el-table-column>

              <el-table-column width="100px" prop="encryptNeed"
                               label="是否加密所需字段">
              </el-table-column>

              <el-table-column width="100px" prop="orderId"
                               label="排序">
              </el-table-column>

              <el-table-column prop="createTime" width="200px"
                               label="创建时间" :formatter="dateFormat">
              </el-table-column>

              <el-table-column fixed="right" label="操作" v-if="powerTrue" width="230px">
                <template slot-scope="scope">
                  <el-button size="mini" @click="getPaInfo(scope.row.id)">详情</el-button>
                  <el-button size="mini" @click="DeleteParams(scope.row.id)" v-if="del">删除</el-button>
                  <el-button @click="getParamsInfo(scope.row.id)" size="mini" v-if="upd">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
          <div class="block">
            <el-pagination @size-change="handleSizeChange1"
                           @current-change="handleCurrentChange1"
                           :current-page="currentPage1"
                           :page-sizes="[10, 20, 50, 70]"
                           :page-size="pageSize1"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalCount1">
            </el-pagination>
          </div>
        </el-dialog>

        <el-form :model="formParams">
          <div class="form">
            <el-dialog title="添加参数" width="900px"
                       :visible.sync="dialogList">
              <el-form :model="formParams" :rules="rules"
                       ref="formParams">
                <div class="form">
                  <el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="所属接口名称:"
                                      label-width="170px" >
                          <el-input :disabled="true" v-model="formParams.interfaceName"
                                    auto-complete="off"
                                    clearable
                                    style="width: 214px;"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-col :span="12">
                      <el-form-item label="参数名称:"
                                    label-width="170px" prop="name">
                        <el-input v-model="formParams.name"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="参数代码:"
                                    label-width="170px" prop="code">
                        <el-input v-model="formParams.code"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label-width="170px" label="参数类型:" prop="type">
                        <el-select style="width: 214px" v-model="formParams.type" placeholder="" >
                          <el-option label="固定值" value="1"></el-option>
                          <el-option label="请求参数" value="2"></el-option>
                          <el-option label="加密" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label-width="170px" label="参数值:" >
                        <el-input v-model="formParams.value"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>

                 <div style="width: 100%;display: inline-block;">
                      <el-col :span="12">
                        <el-form-item label-width="170px" label="是否加密:" prop="isEncrypt">
                          <el-select @change="isEncryptTap(formParams.isEncrypt)" style="width: 214px" v-model="formParams.isEncrypt" placeholder="" >
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                     <el-col :span="12" v-show="isEncryptShow">
                       <el-form-item label-width="170px" label="加密类型:" >
                         <el-select style="width: 214px" v-model="formParams.encryptType" placeholder="" >
                           <el-option label="MD5" value="1"></el-option>
                           <el-option label="其他" value="2"></el-option>
                         </el-select>
                       </el-form-item>
                     </el-col>
                 </div>

                    <el-col :span="12" v-show="isEncryptShow">
                      <el-form-item label-width="170px" label="加密分隔符:"  prop="encryptSeparator">
                        <el-input v-model="formParams.encryptSeparator"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>

                      <el-col :span="12" >
                        <el-form-item label-width="170px" label="是否加密列表所需字段:" prop="encryptNeed">
                          <el-select style="width: 214px" v-model="formParams.encryptNeed" placeholder="" >
                            <el-option label="是" value="1"></el-option>
                            <el-option label="否" value="2"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                    <el-col :span="12">
                      <el-form-item label-width="170px" label="是否必须:" prop="isNeed">
                        <el-select style="width: 214px" v-model="formParams.isNeed" placeholder="" >
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label-width="170px" label="是否替换:" prop="isReplace">
                        <el-select @change="isReplaceTap(formParams.isReplace)" style="width: 214px" v-model="formParams.isReplace" placeholder="" >
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12" v-show="isReplaceCode">
                      <el-form-item label-width="170px" label="用户传值:" prop="replaceCode">
                        <el-input v-model="formParams.replaceCode" auto-complete="off" clearable style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12" >
                      <el-form-item label-width="170px" label="是否详情加密所需字段:" prop="infoEncryptNeed">
                        <el-select  style="width: 214px" v-model="formParams.infoEncryptNeed" placeholder="" >
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <div style="width: 100%;display: inline-block;">
                      <el-col :span="12">
                          <el-form-item label-width="160px" label="排序:"  prop="orderId">
                            <el-input min="0" type="number" v-model="formParams.orderId"
                                      auto-complete="off"
                                      clearable
                                      style="width: 214px;"></el-input>
                          </el-form-item>
                      </el-col>
                    </div>
                  </el-row>
                </div>
              </el-form>
              <div slot="footer"
                   class="dialog-footer">
                <el-button @click="dialogList = false">取 消</el-button>
                <el-button type="primary"
                @click="addParams('formParams')">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </el-form>


          <div class="form">
            <el-dialog title="修改参数" width="900px"
                       :visible.sync="dialogListUpdate">
              <el-form :model="formParamsUpdate" :rules="rules"
                       ref="formParams">
                <div class="form">
                  <el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="所属接口名称:"
                                      label-width="170px" >
                          <el-input :disabled="true" v-model="formParamsUpdate.interfaceName"
                                    auto-complete="off"
                                    clearable
                                    style="width: 214px;"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>

                    <el-col :span="12">
                      <el-form-item label="参数名称:"
                                    label-width="170px" prop="name">
                        <el-input v-model="formParamsUpdate.name"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label="参数代码:"
                                    label-width="170px" prop="code">
                        <el-input v-model="formParamsUpdate.code"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label-width="170px" label="参数类型:" prop="type">
                        <el-select style="width: 214px" v-model="formParamsUpdate.type" placeholder="" >
                          <el-option label="固定值" :value="1"></el-option>
                          <el-option label="请求参数" :value="2"></el-option>
                          <el-option label="加密" :value="3"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label-width="170px" label="参数值:" >
                        <el-input v-model="formParamsUpdate.value"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>

                    <div style="width: 100%;display: inline-block;">
                      <el-col :span="12">
                        <el-form-item label-width="170px" label="是否加密:" prop="isEncrypt">
                          <el-select @change="isEncryptTap(formParamsUpdate.isEncrypt)" style="width: 214px" v-model="formParamsUpdate.isEncrypt" placeholder="" >
                            <el-option label="是" :value="1"></el-option>
                            <el-option label="否" :value="2"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>

                      <el-col :span="12" v-show="isEncryptShow">
                        <el-form-item label-width="170px" label="加密类型:" >
                          <el-select style="width: 214px" v-model="formParamsUpdate.encryptType" placeholder="" >
                            <el-option label="MD5" :value="1"></el-option>
                            <el-option label="其他" :value="2"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </div>

                    <el-col :span="12" v-show="isEncryptShow">
                      <el-form-item label-width="170px" label="加密分隔符:"  prop="encryptSeparator">
                        <el-input v-model="formParamsUpdate.encryptSeparator"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12" v-show="isEncryptShow">
                      <el-form-item label-width="170px" label="是否加密列表所需字段:" >
                        <el-select style="width: 214px" v-model="formParamsUpdate.encryptNeed" placeholder="" >
                          <el-option label="是" :value="1"></el-option>
                          <el-option label="否" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label-width="170px" label="是否必须:" prop="isNeed">
                        <el-select style="width: 214px" v-model="formParamsUpdate.isNeed" placeholder="" >
                          <el-option label="是" :value="1"></el-option>
                          <el-option label="否" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12">
                      <el-form-item label-width="170px" label="是否替换:" prop="isReplace">
                        <el-select @change="isReplaceTap(formParamsUpdate.isReplace)" style="width: 214px" v-model="formParamsUpdate.isReplace" placeholder="" >
                          <el-option label="是" :value="1"></el-option>
                          <el-option label="否" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12" v-show="isReplaceCode">
                      <el-form-item label-width="170px" label="用户传值:" prop="replaceCode">
                        <el-input v-model="formParamsUpdate.replaceCode" auto-complete="off" clearable style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12" >
                      <el-form-item label-width="170px" label="是否详情加密所需字段:" prop="infoEncryptNeed">
                        <el-select  style="width: 214px" v-model="formParamsUpdate.infoEncryptNeed" placeholder="" >
                          <el-option label="是" :value="1"></el-option>
                          <el-option label="否" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <div style="width: 100%;display: inline-block;">
                      <el-col :span="12">
                        <el-form-item label-width="170px" label="排序:"  prop="orderId">
                          <el-input min="0" type="number" v-model="formParamsUpdate.orderId"
                                    auto-complete="off"
                                    clearable
                                    style="width: 214px;"></el-input>
                        </el-form-item>
                      </el-col>
                    </div>
                  </el-row>
                </div>
              </el-form>
              <div slot="footer"
                   class="dialog-footer">
                <el-button @click="dialogListUpdate = false">取 消</el-button>
                <el-button type="primary"
                           @click="updateParams('formParamsUpdate')">确 定</el-button>
              </div>
            </el-dialog>
          </div>

        <div class="form">
          <el-dialog title="参数详情" width="900px"
                     :visible.sync="dialogListinfo">
            <el-form :model="formParamsInfo" :rules="rules"
                     ref="formParams">
              <div class="form">
                <el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="所属接口名称:"
                                    label-width="140px" >
                        <el-input :disabled="true" v-model="formParamsInfo.interfaceName"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  <el-col :span="12">
                    <el-form-item label="参数名称:"
                                  label-width="140px" prop="name">
                      <el-input :disabled="true" v-model="formParamsInfo.name"
                                auto-complete="off"
                                clearable
                                style="width: 214px;"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="参数代码:"
                                  label-width="140px" prop="code">
                      <el-input :disabled="true" v-model="formParamsInfo.code"
                                auto-complete="off"
                                clearable
                                style="width: 214px;"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label-width="140px" label="参数类型:" prop="type">
                      <el-select :disabled="true" style="width: 214px" v-model="formParamsInfo.type" placeholder="" >
                        <el-option label="固定值" :value="1"></el-option>
                        <el-option label="请求参数" :value="2"></el-option>
                        <el-option label="加密" :value="3"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label-width="140px" label="参数值:" >
                      <el-input :disabled="true" v-model="formParamsInfo.value"
                                auto-complete="off"
                                clearable
                                style="width: 214px;"></el-input>
                    </el-form-item>
                  </el-col>

                  <div style="width: 100%;display: inline-block;">
                    <el-col :span="12">
                      <el-form-item label-width="140px" label="是否加密:" prop="isEncrypt">
                        <el-select :disabled="true" @change="isEncryptTap(formParamsInfo.isEncrypt)" style="width: 214px" v-model="formParamsInfo.isEncrypt" placeholder="" >
                          <el-option label="是" :value="1"></el-option>
                          <el-option label="否" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                    <el-col :span="12" v-show="isEncryptShow">
                      <el-form-item label-width="140px" label="加密类型:" >
                        <el-select :disabled="true" style="width: 214px" v-model="formParamsInfo.encryptType" placeholder="" >
                          <el-option label="MD5" :value="1"></el-option>
                          <el-option label="其他" :value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </div>

                  <el-col :span="12" v-show="isEncryptShow">
                    <el-form-item label-width="140px" label="加密分隔符:"  prop="encryptSeparator">
                      <el-input :disabled="true" v-model="formParamsInfo.encryptSeparator"
                                auto-complete="off"
                                clearable
                                style="width: 214px;"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" v-show="isEncryptShow">
                    <el-form-item label-width="140px" label="是否加密所需字段:" >
                      <el-select :disabled="true" style="width: 214px" v-model="formParamsInfo.encryptNeed" placeholder="" >
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label-width="140px" label="是否必须:" prop="isNeed">
                      <el-select :disabled="true" style="width: 214px" v-model="formParamsInfo.isNeed" placeholder="" >
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label-width="140px" label="是否替换:" prop="isReplace">
                      <el-select :disabled="true" style="width: 214px" v-model="formParamsInfo.isReplace" placeholder="" >
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" v-show="isReplaceCode">
                    <el-form-item label-width="140px" label="用户传值:" prop="replaceCode">
                      <el-input :disabled="true" v-model="formParamsInfo.replaceCode" auto-complete="off" clearable style="width: 214px;"></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" >
                    <el-form-item label-width="170px" label="是否详情加密所需字段:" prop="infoEncryptNeed">
                      <el-select :disabled="true"  style="width: 214px" v-model="formParamsInfo.infoEncryptNeed" placeholder="" >
                        <el-option label="是" :value="1"></el-option>
                        <el-option label="否" :value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <div style="width: 100%;display: inline-block;">
                    <el-col :span="12">
                      <el-form-item label-width="140px" label="排序:"  prop="orderId">
                        <el-input :disabled="true" type="number" v-model="formParamsInfo.orderId"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>
                  </div>
                </el-row>
              </div>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="dialogListinfo = false">取 消</el-button>
            </div>
          </el-dialog>
        </div>

      </div>

      <el-dialog title="响应参数" width="1200px"
                 :visible.sync="dialogResponseParams">
        <el-button style="margin-bottom: 30px" @click="addResponseParamsBtn" >添加响应参数</el-button>
        <template>
          <el-table :data="responseParamsData"
                    style="width: 100%"
                    height="580">
            <el-table-column label="序号"
                             type="index"
                             :index="indexMethod"
                             width='80' fixed="left">
            </el-table-column>
            <el-table-column prop="field"
                             label="field" width="200px" >
            </el-table-column>

            <el-table-column  prop="key"
                             label="key">
            </el-table-column>
            <el-table-column fixed="right" label="操作" v-if="powerTrue" width="230px">
              <template slot-scope="scope">
                <el-button size="mini" @click="getResponsePaInfo(scope.row.id)">详情</el-button>
                <el-button size="mini" @click="DeleteResponseParams(scope.row.id)" v-if="del">删除</el-button>
                <el-button @click="getResponseParamsUpdate(scope.row.id)" size="mini" v-if="upd">修改</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="block">
          <el-pagination @size-change="handleSizeChange2"
                         @current-change="handleCurrentChange2"
                         :current-page="currentPage2"
                         :page-sizes="[10, 20, 50, 70]"
                         :page-size="pageSize2"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="totalCount2">
          </el-pagination>
        </div>
      </el-dialog>

      <el-form :model="formResponseParams">
        <div class="form">
          <el-dialog title="添加响应参数" width="500px"
                     :visible.sync="addResponseParams">
            <el-form :model="formResponseParams" :rules="rules"
                     ref="formResponseParams">
              <div class="form">
                <el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="field:"
                                    label-width="140px" prop="field">
                        <el-input v-model="formResponseParams.field"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-col :span="12">
                    <el-form-item label="key:"
                                  label-width="140px" prop="key">
                      <el-input v-model="formResponseParams.key"
                                auto-complete="off"
                                clearable
                                style="width: 214px;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="addResponseParams = false">取 消</el-button>
              <el-button type="primary"
                         @click="addResponseParamsSum('formResponseParams')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-form>

      <el-form :model="formResponseInfoParams">
        <div class="form">
          <el-dialog title="响应参数详情" width="500px"
                     :visible.sync="addResponseInfoParams">
            <el-form :model="formResponseInfoParams">
              <div class="form">
                <el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="field:"
                                    label-width="140px" >
                        <el-input :disabled="true" v-model="formResponseInfoParams.field"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-col :span="12">
                    <el-form-item label="key:"
                                  label-width="140px" prop="key">
                      <el-input :disabled="true" v-model="formResponseInfoParams.key"
                                auto-complete="off"
                                clearable
                                style="width: 214px;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="addResponseInfoParams = false">确定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-form>
      <el-form :model="formResponseUpdateParams">
        <div class="form">
          <el-dialog title="修改响应参数" width="500px"
                     :visible.sync="addResponseUpdateParams">
            <el-form :model="formResponseUpdateParams">
              <div class="form">
                <el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="field:"
                                    label-width="140px" >
                        <el-input v-model="formResponseUpdateParams.field"
                                  auto-complete="off"
                                  clearable
                                  style="width: 214px;"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-col :span="12">
                    <el-form-item label="key:"
                                  label-width="140px" prop="key">
                      <el-input v-model="formResponseUpdateParams.key"
                                auto-complete="off"
                                clearable
                                style="width: 214px;"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
            <div slot="footer"
                 class="dialog-footer">
              <el-button @click="addResponseUpdateParams = false">取消</el-button>
              <el-button type="primary" @click="responseUpdateParamsSum('formResponseUpdateParams')">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </el-form>
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
    name: 'GameInterface',
    data() {
      return {
        gameList:[],
        formResponseUpdateParams:{},
        addResponseUpdateParams:false,
        formResponseInfoParams:{},
        addResponseInfoParams:false,
        formResponseParams:{},
        addResponseParams:false,
        dialogResponseParams:false,
        isReplaceCode:false,
        dialogListinfo:false,
        dialogListUpdate:false,
        isEncryptShow:false,
        dialogList:false,
        interfaceNameBelone:'',
        formParams:{},
        dialogParams:false,
        company:[],//
        batchSendName:'',
        formsendPhone:'',
        batchSend:'',
        formMethod:{
        },
        formParamsUpdate:{
        },
        formParamsInfo:{},
        dialogMethod:false,
        dialog:false,
        taskTypes:[],
        persent:'',
        taskTypeName:[],
        checkedCities1: [],
        cities: [],
        powerTrue:false,
        optionW:'220px',
        menuId:'',
        add:false,
        del:false,
        upd:false,
        seePar:false,
        resparse:false,
        game:false,
        app: 0,
        web: 1,
        advertisingPage: 1,
        webPage: 2,
        advertising: 3,
        areaChart: 4,
        homepage: 0,
        show: 0,
        activePage: 1,
        detailsPage: 2,
        imageUrl: '',
        imgUrl:'',
        dialogTableVisible: false,
        formtwo: {},
        dialogFormVisible: false,
        form: {
          name: '',
          remark: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入商户名称', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请输入商户描述', trigger: 'blur' }
          ],
          interfaceName: [
            { required: true, message: '请输入接口名称', trigger: 'blur' }
          ],
          interfaceCode: [
            { required: true, message: '请输入接口代码', trigger: 'blur' }
          ],
          baseUrl: [
            { required: true, message: '请输入基础地址', trigger: 'blur' }
          ],
          reqType: [
            { required: true, message: '请选择请求类型', trigger: 'change' }
          ],
          isCycle: [
            { required: true, message: '请选择是否循环', trigger: 'change' }
          ],
          code: [
            { required: true, message: '请输入参数代码', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择参数类型', trigger: 'change' }
          ],
          isEncrypt: [
            { required: true, message: '请选择是否加密', trigger: 'change' }
          ],
          isNeed: [
            { required: true, message: '请选择是否必须', trigger: 'change' }
          ],
          orderId: [
            { required: true, message: '请输入排序值', trigger: 'blur' }
          ],
          weight:[
            { required: true, message: '请输入定时顺序', trigger: 'blur' }
          ],
          isReplace:[
            { required: true, message: '请选择是否替换', trigger: 'change' }
          ],
          field:[
            { required: true, message: '请输入field', trigger: 'blur' }
          ],
          key:[
            { required: true, message: '请输入key', trigger: 'blur' }
          ],
          coins:[
             { required: true, message: '请输入预计获取金币', trigger: 'blur' }
           ],
          game_type:[
            { required: true, message: '请选择游戏类型', trigger: 'change' }
          ],
          infoEncryptNeed:[
            { required: true, message: '请选择是否详情加密所需字段', trigger: 'change' }
          ],
        },
        formLabelWidth: '120px',
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        showImg: false,
        imgSrc: '',
        formInline: {},
        tableData: [],
        paramsData:[],
        paramsId:'',
        currentPage1: 1,
        pageSize1: 10,
        totalCount1: 0,
        currentPage2: 1,
        pageSize2: 10,
        totalCount2: 0,
        responseParamsData:[],
        addResponseParams:false

      }
    },
    components: {
      'big-img': BigImg
    },
    created() {
      this.menuId=this.$route.query.id
      this.queryBtns()
      this.accountList()
      this.getgameList()
    },
    methods: {
      getgameList(){
        this.$fetch('/api/tpGameType/queryOpt').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.gameList = res.data
        }
        })
      },
      responseParamsTap(id){
        this.paramsId = id;
        this.responseParamsList()
        this.dialogResponseParams=true
      },
      responseParamsList(){
        let parameterData = {
          pageNum: this.currentPage2,
          pageSize: this.pageSize2,
          interfaceId:this.paramsId
        }
        this.$fetch('/api/tpResp/list',parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.responseParamsData = res.data.list
          this.totalCount2 = res.data.total
        }else{
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
        }
      })
      },

      addResponseParamsBtn(){
        this.formResponseParams={}
        this.addResponseParams=true
      },
      addResponseParamsSum(formResponseParams){
        this.formResponseParams.interfaceId=this.paramsId
        this.$refs.formResponseParams.validate(valid => {
          if (valid) {
            this.$post('/api/tpResp/add', this.formResponseParams).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.addResponseParams = false
              this.$message({ type: 'success', message: '添加成功！' })
              this.responseParamsList();
            }else{
              this.$message({
                type: 'error',
                message: res.message,
                duration: 3000
              })
            }
          })
          } else {
          }
        })
      },

      getResponsePaInfo(id){
        this.addResponseInfoParams=true
        this.$fetch('/api/tpResp/queryOne',{id: id}).then(res => {
           this.formResponseInfoParams=res.data
        })
      },
      getResponseParamsUpdate(id){
        this.addResponseUpdateParams=true
        this.$fetch('/api/tpResp/queryOne',{id: id}).then(res => {
          this.formResponseUpdateParams=res.data
        })
      },
      responseUpdateParamsSum(){
        this.$put('/api/tpResp/modify', this.formResponseUpdateParams).then(res => {
          if(res.statusCode == 2000){
          this.$message({type: 'success', message: '修改成功！'})
          this.addResponseUpdateParams = false
          this.responseParamsList();
        }
      })
      },
      DeleteResponseParams(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
          this.delDataResponseParams(id)
      })
      .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
      })
      },
      delDataResponseParams(id) {
        this.$fetch('/api/tpResp/remove',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({ type: 'success', message: '删除成功！' })
          this.responseParamsList()
        } else {
        }
      })
      },
      isEncryptTap(id){
        if(id==1){
          this.isEncryptShow = true;
        }else {
          this.isEncryptShow = false;
        }
      },
      paramsTap(id,name){
        this.interfaceNameBelone = name;
        this.paramsId = id;
        this.dialogParams = true;
        this.paramsList();
      },
      changeLocationValue(val){
        let obj = {};
        obj = this.company.find((item)=>{
          return item.id === val;
      });
        this.formMethod.name = obj.name
      },
      paramsList() {
        let parameterData = {
          pageNum: this.currentPage1,
          pageSize: this.pageSize1,
          interfaceId:this.paramsId
        }
        this.$fetch('/api/tpParams/list',parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i = res.data.list.length - 1; i >= 0; i--) {
            if (res.data.list[i].type == 1) {
              res.data.list[i].type = '固定值'
            } else if(res.data.list[i].type == 2) {
              res.data.list[i].type = '请求参数'
            }else {
              res.data.list[i].type = '加密'
            }

            if (res.data.list[i].isEncrypt == 1) {
              res.data.list[i].isEncrypt = '是'
            }else {
              res.data.list[i].isEncrypt = '否'
            }

            if (res.data.list[i].encryptType == 1) {
              res.data.list[i].encryptType = 'MD5'
            }else {
              res.data.list[i].encryptType = '其他'
            }

            if (res.data.list[i].isNeed == 1) {
              res.data.list[i].isNeed = '是'
            }else {
              res.data.list[i].isNeed = '否'
            }
            if (res.data.list[i].encryptNeed == 1) {
              res.data.list[i].encryptNeed = '是'
            }else {
              res.data.list[i].encryptNeed = '否'
            }
          }
          this.paramsData = res.data.list
          this.totalCount1 = res.data.total
        }else{
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
        }
      })
      },

      companyList() {
        this.$fetch('/api/tpCompany/queryOpt').then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.company = res.data;
        }else{
          this.$message({
            type: 'error',
            message: res.message,
            duration: 3000
          })
        }
      })
      },

      addMethod(){
        this.formMethod ={};
        this.dialogMethod = true;
        this.companyList();
      },
      methodBtn(formMethod) {
        this.$refs.formsend.validate(valid => {
          if (valid) {
            this.$post('/api/tpInterface/add', this.formMethod).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogMethod = false
              this.$message({ type: 'success', message: '添加成功！' })
              this.accountList()
            }else{
              this.$message({
                type: 'error',
                message: res.message,
                duration: 3000
              })
            }
          })
          } else {
          }
        })
      },
      addParamsDia(){
        this.isReplaceCode=false
        this.isEncryptShow=false
        this.dialogList =true
        this.formParams={}
        this.formParams.interfaceName =this.interfaceNameBelone;
        this.formParams.interfaceId = this.paramsId;
      },

      addParams(formParams){
        this.$refs.formParams.validate(valid => {
          if (valid) {
            this.$post('/api/tpParams/add', this.formParams).then(res => {
              if ((res.statusCode+"").startsWith("2")) {
              this.dialogList = false
              this.$message({ type: 'success', message: '添加成功！' })
              this.paramsList();
            }else{
              this.$message({
                type: 'error',
                message: res.message,
                duration: 3000
              })
            }
          })
          } else {
          }
        })
      },
      getParamsInfo(id){
        this.isEncryptShow=false
        this.isReplaceCode=false
        this.dialogListUpdate = true
        this.$fetch('/api/tpParams/queryOne',{
          id: id
        }).then(res => {
          this.formParamsUpdate = res.data
          if(this.formParamsUpdate.encryptNeed==1){
            this.isEncryptShow=true
          }
          if(this.formParamsUpdate.isReplace==1){
            this.isReplaceCode=true
          }
        this.formParamsUpdate.interfaceName=this.interfaceNameBelone
      })
      },
      updateParams(formParamsUpdate){
        this.$put('/api/tpParams/modify', this.formParamsUpdate).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
            this.$message({type: 'success', message: '修改成功！'})
            this.dialogListUpdate = false
            this.paramsList();
          }
       })
      },
      getCame(id){
        let parameterData = {
          id: id
        }
        this.$put('/api/tpInterface/getGames', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({type: 'success', message: '获取成功！'})
         }
        })
      },
      getPaInfo(id){
        this.isEncryptShow=false
        this.isReplaceCode=false
        this.dialogListinfo = true
        this.$fetch('/api/tpParams/queryOne',{
          id: id
        }).then(res => {
          this.formParamsInfo = res.data
        if(this.formParamsInfo.encryptNeed==1){
          this.isEncryptShow=true
        }
        if(this.formParamsInfo.isReplace==1){
          this.isReplaceCode=true
        }
        this.formParamsInfo.interfaceName=this.interfaceNameBelone
      })
      },
      DeleteParams(id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        })
          .then(() => {
          this.delDataParams(id)
      })
      .catch(() => {
          this.$message({ type: 'info', message: '已取消删除' })
      })
      },
      delDataParams(id) {
        this.$fetch('/api/tpParams/remove',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({ type: 'success', message: '删除成功！' })
          this.paramsList()
        } else {
        }
      })
      },
      sendTap(id,name){
        this.dialogSend =true;
        this.formsend.id = id;
        this.batchSendName = name;
        this.formsend.mobiles = '';
      },
      dateFormat(row, column) {
        var date = row[column.property]
        if (date == undefined) {
          return ''
        }
        return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:sss')
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
              this.optionW = '220px'
            }
            if(res.data[i].btnCode == 'del') {
              this.del=true;
              this.powerTrue =true;
              this.optionW = '220px'
            }

            if(res.data[i].btnCode == 'resparse') {
              this.resparse=true;
              this.powerTrue =true;
              this.optionW = '220px'
            }

            if(res.data[i].btnCode == 'seePar'){
              this.seePar=true;
              this.powerTrue =true;
              this.optionW = '220px'
            }

            if(res.data[i].btnCode == 'game'){
              this.game=true;
              this.powerTrue =true;
              this.optionW = '220px'
            }

            if (this.upd && this.del || this.upd && this.seePar || this.del && this.seePar) {
              this.powerTrue =true;
              this.optionW = '320px'
            }

            if (this.upd && this.del &&  this.seePar) {
              this.powerTrue =true;
              this.optionW = '420px'
            }

            if (this.upd && this.del &&  this.seePar && this.game) {
              this.powerTrue =true;
              this.optionW = '530px'
            }
          }
        } else {
        }
      })
      },
      indexMethod(index) {
        return index * 1 + 1
      },
      accountList() {
        let parameterData = {
          pageNum: this.currentPage,
          pageSize: this.pageSize,
        }
        this.$fetch('/api/tpInterface/list', parameterData).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          for(let i =0; i <res.data.list.length; i++) {
            if (res.data.list[i].reqType == 1) {
              res.data.list[i].reqType = 'get'
            }else {
              res.data.list[i].reqType = 'post'
            }
            if (res.data.list[i].isCycle == 1) {
              res.data.list[i].isCycle = '是'
            }else {
              res.data.list[i].isCycle = '否'
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
        this.dialogFormVisible = true
        this.form = {}
      },
      isReplaceTap(isReplace){
        if(isReplace==1){
          this.isReplaceCode=true
        }else{
          this.isReplaceCode=false
        }
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
        this.$fetch('/api/tpInterface/remove',{
          id: id
        }).then(res => {
          if ((res.statusCode+"").startsWith("2")) {
          this.$message({ type: 'success', message: '删除成功！' })
          this.accountList()
        } else {
        }
      })
      },
      getInfo(id,types) {
        if (types ==1) {
          this.dialog = true
        }else {
          this.dialogTableVisible = true
        }
        this.companyList();
        this.$fetch('/api/tpInterface/queryOne',{
          id: id
        }).then(res => {
          this.formtwo = res.data
      })
      },
      update(formtwo) {
        this.$put('/api/tpInterface/modify', this.formtwo).then(res => {
          if (res.statusCode == 2000) {
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
      },
      handleSizeChange1(val) {
        this.pageSize1 = val
        this.paramsList()
      },
      handleCurrentChange1(val) {
        this.currentPage1 = val
        this.paramsList()
      },
      handleSizeChange2(val) {
        this.pageSize2 = va2
        this.responseParamsList()
      },
      handleCurrentChange2(val) {
        this.currentPage2 = val
        this.responseParamsList()
      }
    }
  }
</script>
<style type="text/css">
  .hoverC:hover{
    cursor: pointer
  }

  .el-input--suffix .el-input__inner{
    padding-right: 0;
  }
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .form {
    overflow-y: scroll;
    height: auto;
  }
</style>
