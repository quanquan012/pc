<template>
  <div>
    <div class="search">
      <div class="search-row">
        <el-row>
          <el-form :inline="true" :model="searchParams" ref="userSearchForm" size="mini">
            <el-col :span="6">
              <el-form-item label="账号:" prop="accountNumber">
                <el-input v-model="searchParams.accountNumber" placeholder="账号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话:" prop="accountPhone">
                <el-input maxlength="11" v-model="searchParams.accountPhone" placeholder="电话"></el-input>
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
        <el-table-column fixed label="日期" align="center"  width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" align="center" prop="accountNumber">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.accountName }}</p>
              <p>电话: {{ scope.row.accountPhone }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.accountNumber }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="accountCode" label="账号编码" align="center"></el-table-column>
        <el-table-column prop="accountPhone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="openId" label="OPEN-ID" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button icon="el-icon-view" size="small" type="text" @click="handleAuth(scope.$index, scope.row)">权限</el-button>
            <el-button icon="el-icon-edit" size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button icon="el-icon-delete" size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="form">
      <el-dialog title="账号信息" :visible.sync="dialogFormVisible">
        <el-form :model="accountForm" label-position="right" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountNumber" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="OPEN-ID" :label-width="formLabelWidth">
                <el-input v-model="accountForm.openId" maxlength="11" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账户编码" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountCode" maxlength="8" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountPhone" maxlength="11" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期" :label-width="formLabelWidth">
                <el-date-picker type="datetime" :editable="false" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
                                v-model="accountForm.createTime"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="密码" :label-width="formLabelWidth" hidden>
                <el-input v-model="accountForm.accountPass" :editable="false" autocomplete="off"></el-input>
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
      <el-dialog title="账号信息" :visible.sync="editFormVisible">
        <el-form :model="accountForm" label-position="right" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountNumber" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="OPEN-ID" :label-width="formLabelWidth">
                <el-input v-model="accountForm.openId" maxlength="11" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="账户编码" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountCode" maxlength="8" :disabled="true"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountPhone" maxlength="11" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="日期" :label-width="formLabelWidth">
                <el-date-picker type="datetime" :disabled="true" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
                                v-model="accountForm.createTime"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="密码" :label-width="formLabelWidth" hidden>
                <el-input v-model="accountForm.accountPass" :editable="false" autocomplete="off"></el-input>
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
      <el-dialog title="权限分配" :visible.sync="editAuthVisible">
        <div style="text-align: center">
          <el-transfer style="text-align: left; display: inline-block"
                       :titles="['未选权限', '已选权限']"
                       v-model="auths.right"
                       :button-texts="['', '']"
                       :format="{
                          noChecked: '${total}',
                          hasChecked: '${checked}/${total}'
                        }"
                       :props="{
                          key: 'primaryKey',
                          label: 'authName',
                          disabled: 'disable'
                        }"
                       :data="auths.left">

          </el-transfer>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="editAuthVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="authConfirm()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      auths:{
        left:[],
        right: [],
        accountCode: ''
      },
      tableData: [],
      searchParams: {
        accountName: '',
        accountNumber: '',
        accountPhone: '',
        createTime: '',
        pageNum: 1,
        pageSize: 10
      },
      accountForm: {
        openId: '',
        accountName: '',
        accountNumber: '',
        accountCode: '',
        accountPass: '123',
        accountPhone: '',
        accountAddress: '',
        createTime: ''
      },
      formLabelWidth: '100px',
      dialogFormVisible: false,
      editFormVisible: false,
      editAuthVisible: false,
      total: 0
    }
  },
  created () {
    this.onSearch()
  },
  methods: {
    handleSave () {
      this.dialogFormVisible = true
      this.accountForm = {
        }
    },
    handleAuth (index, row){
      this.editAuthVisible = true
      console.log(row.accountCode)
      this.searchAuths(row.accountCode)
    },
    handleEdit (index, row) {
      this.editFormVisible = true
      this.accountForm = Object.assign({}, row)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteAccount(row.primaryKey)
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
      this.saveAccount(this.accountForm)
    },
    authConfirm (){
      this.editAuthVisible = false
      console.log(this.auths.accountCode)
      this.updateAccountAuths(this.auths)
    },
    editConfirm () {
      this.editFormVisible = false
      this.editAccount(this.accountForm)
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
      this.$http.get('/accounts', {
        params: {
          type: 'page',
          pageNum: searchFilters.pageNum,
          pageSize: searchFilters.pageSize,
          accountName: searchFilters.accountName,
          accountPhone: searchFilters.accountPhone,
          createTime: searchFilters.createTime
        }
      }).then((response) => {
        const accounts = response.data
        this.total = accounts.data.total
        this.searchParams.pageSize = accounts.data.pageSize
        this.tableData = accounts.data.list
      })
    },
    saveAccount (accountForm) {
      const p = JSON.parse(JSON.stringify(accountForm))
      this.$http.post('/accounts', p).then((response) => {
        this.onSearch()
      })
    },
    editAccount (accountForm) {
      const p = JSON.parse(JSON.stringify(accountForm))
      this.$http.put('/accounts', p).then((response) => {
        this.onSearch()
      })
    },
    deleteAccount (primaryKey) {
      this.$http.delete('/accounts/' + primaryKey).then((response) => {
        this.onSearch()
      })
    },
    searchAuths (accountCode){
      this.$http.get('/auths',{
        params: {
          type: 'byAccountCode',
          accountCode: accountCode}
      }).then((response) => {
        const accounts = response.data
        console.log(accounts.data)
        this.auths = accounts.data
        this.auths.accountCode = accountCode
      })
    },
    updateAccountAuths(newAuths){
      console.log(newAuths)
      const p = JSON.parse(JSON.stringify(newAuths))
      this.$http.put('/auths/accountAuths', p).then((response) => {
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

  .add{
    margin-left: 20px;
    background-color: #7e8c8d;
  }

  .page {
    text-align: right;
  }

  .grid {
    height: 100%;
    width: 100%;
  }
</style>
