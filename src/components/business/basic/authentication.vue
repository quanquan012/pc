<template>
  <div>
    <div class="search">
      <div class="search-row">
        <el-row>
          <el-form :inline="true" :model="searchParams" ref="userSearchForm" size="mini">
            <el-col :span="6">
              <el-form-item label="名称:" prop="authName">
                <el-input v-model="searchParams.authName" placeholder="权限"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="编码:" prop="authCode">
                <el-input maxlength="11" v-model="searchParams.authCode" placeholder="编码"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期" prop="createTime">
                <el-date-picker type="datetime" :editable="false" placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss" v-model="searchParams.createTime"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" @click="onSearch()">查询</el-button>
                <el-button icon="el-icon-refresh" @click="onReset('userSearchForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </div>
    <div class="page">
      <el-row>
        <el-col :span="2">
          <el-button icon="el-icon-plus" size="mini" type="primary" @click="handleSave()">新增</el-button>
        </el-col>
        <el-col :span="22">
          <el-pagination
            small
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="searchParams.pageNum"
            :page-size="searchParams.pageSize"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </el-col>
      </el-row>
    </div>
    <div class="grid">
      <el-table :data="tableData" size="mini" height="460px">
        <el-table-column prop="primaryKey" label="主键" v-if="false"></el-table-column>
        <el-table-column fixed label="日期" align="center" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="authName" label="名称" align="center"></el-table-column>
        <el-table-column prop="authCode" label="编码" align="center"></el-table-column>
        <el-table-column prop="status" label="权限" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.status" style="color: green">启用</span>
            <span v-else style="color: red">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="disable" label="状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.disable" style="color: green">可编辑</span>
            <span v-else style="color: red">不可编辑</span>
          </template>
        </el-table-column>
        <el-table-column prop="openId" label="OPEN-ID" align="center" v-if="false"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-view" size="small" type="text" @click="handleNavigator(scope.$index, scope.row)">导航</el-button>
            <el-button icon="el-icon-edit" size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button icon="el-icon-delete" size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="form">
      <el-dialog title="权限信息" :visible.sync="dialogFormVisible">
        <el-form :model="authForm" label-position="right" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="authForm.authName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="权限" :label-width="formLabelWidth" prop="status">
                <el-switch v-model="authForm.status" active-text="启用" inactive-text="禁用"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="OPEN-ID" :label-width="formLabelWidth">
                <el-input v-model="authForm.openId" maxlength="11" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编码" :label-width="formLabelWidth">
                <el-input v-model="authForm.authCode" maxlength="8" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="日期" :label-width="formLabelWidth">
                <el-date-picker type="datetime" :editable="false" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
                                v-model="authForm.createTime"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" :label-width="formLabelWidth" prop="disable">
                <el-switch v-model="authForm.disable" active-text="不可编辑" inactive-text="可编辑"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="dialogFormVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="onConfirm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="form">
      <el-dialog title="权限信息" :visible.sync="editFormVisible">
        <el-form :model="authForm" label-position="right" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="authForm.authName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="权限" :label-width="formLabelWidth" prop="status">
                <el-switch v-model="authForm.status" active-text="启用" inactive-text="禁用"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="OPEN-ID" :label-width="formLabelWidth">
                <el-input v-model="authForm.openId" maxlength="11" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="编码" :label-width="formLabelWidth">
                <el-input v-model="authForm.authCode" maxlength="8" :disabled="true"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="日期" :label-width="formLabelWidth">
                <el-date-picker type="datetime" :disabled="true" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
                                v-model="authForm.createTime"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="状态" :label-width="formLabelWidth" prop="disable">
                <el-switch v-model="authForm.disable" active-text="可编辑" inactive-text="不可编辑"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="editFormVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="editConfirm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="form">
      <el-dialog title="导航分配" :visible.sync="editNavigatorVisible">
        <div style="text-align: center">
          <el-transfer style="text-align: left; display: inline-block"
                       :titles="['未选导航', '已选导航']"
                       v-model="navigators.right"
                       :button-texts="['', '']"
                       :format="{
                          noChecked: '${total}',
                          hasChecked: '${checked}/${total}'
                        }"
                       :props="{
                          key: 'primaryKey',
                          label: 'navigatorName'
                        }"
                       :data="navigators.left">

          </el-transfer>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="editNavigatorVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="navigatorConfirm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'authentication',
    data () {
      return {
        navigators:{
          left:[],
          right: [],
          accountCode: ''
        },
        tableData: [],
        searchParams: {
          authName: '',
          createTime: '',
          pageNum: 1,
          pageSize: 10
        },
        authForm: {
          openId: '',
          authName: '123',
          disable: true,
          status: true,
          authCode: '',
          createTime: ''
        },
        formLabelWidth: '100px',
        dialogFormVisible: false,
        editFormVisible: false,
        editNavigatorVisible: false,
        total: 0
      }
    },
    created () {
      this.onSearch()
    },
    methods: {
      handleSave () {
        this.dialogFormVisible = true
        this.authForm = {disable:true,status:true}
      },
      handleNavigator (index, row) {
        this.editNavigatorVisible = true
        console.log(row.authCode)
        this.searchNavigators(row.authCode)
      },
      handleEdit (index, row) {
        this.editFormVisible = true
        this.authForm = Object.assign({}, row)
      },
      handleDelete (index, row) {
        this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteAuth(row.primaryKey)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      onConfirm () {
        this.dialogFormVisible = false
        this.saveAuth(this.authForm)
      },
      editConfirm () {
        this.editFormVisible = false
        this.editAuth(this.authForm)
      },
      navigatorConfirm (){
        this.editNavigatorVisible = false
        console.log(this.navigators.authCode)
        this.updateAuthNavigators(this.navigators)
      },
      onSearch () {
        this.searchPageByParams(this.searchParams)
      },
      onReset (formName) {
        this.$refs[formName].resetFields()
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.onSearch()
      },
      searchPageByParams (searchFilters) {
        this.$http.get('/auths', {
          params: {
            type: 'page',
            pageNum: searchFilters.pageNum,
            pageSize: searchFilters.pageSize,
            authName: searchFilters.authName,
            createTime: searchFilters.createTime
          }
        }).then((response) => {
          const auths = response.data
          this.total = auths.data.total
          this.searchParams.pageSize = auths.data.pageSize
          this.tableData = auths.data.list
        })
      },
      saveAuth (authForm) {
        const p = JSON.parse(JSON.stringify(authForm))
        this.$http.post('/auths', p).then((response) => {
          this.onSearch()
        })
      },
      editAuth (authForm) {
        const p = JSON.parse(JSON.stringify(authForm))
        this.$http.put('/auths', p).then((response) => {
          this.onSearch()
        })
      },
      deleteAuth (primaryKey) {
        this.$http.delete('/auths/' + primaryKey).then((response) => {
          this.onSearch()
        })
      },
      searchNavigators (authCode){
        this.$http.get('/navigators',{
          params: {
            type: 'byAuthCode',
            authCode: authCode}
        }).then((response) => {
          const transfer = response.data
          console.log(transfer.data)
          this.navigators = transfer.data
          this.navigators.authCode = authCode
        })
      },
      updateAuthNavigators(newNavigators){
        console.log(newNavigators)
        const p = JSON.parse(JSON.stringify(newNavigators))
        this.$http.put('/navigators/authNavigators', p).then((response) => {
          this.onSearch()
        })
      }
    }
  }
</script>

<style scoped>
  .el-table {
    width: 100%;
  }

  .form {

  }

  .search {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
  }

  .search-row {
    margin-bottom: 1px;
  }

  .page {
    text-align: right;
  }

  .grid {
    height: 100%;
    width: 100%;
  }
</style>
