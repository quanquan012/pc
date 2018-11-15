<template>
  <div>
    <div class="search">
      <div class="search-row">
        <el-row>
          <el-form :inline="true" :model="searchParams" ref="userSearchForm" size="mini">
            <el-col :span="6">
              <el-form-item label="账号:" prop="accountName">
                <el-input v-model="searchParams.accountName" placeholder="昵称"></el-input>
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
                <el-button @click="onReset('userSearchForm')">重置</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </div>
    <div class="page">
      <el-pagination
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="searchParams.pageNum"
        :page-size="searchParams.pageSize"
        layout="total, prev, pager, next"
        :total="total">
      </el-pagination>
    </div>
    <div class="grid">
      <el-table :data="tableData" size="mini" height="460px">
        <el-table-column prop="primaryKey" label="主键" v-if="false"></el-table-column>
        <el-table-column fixed label="日期" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="账号" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.accountName }}</p>
              <p>住址: {{ scope.row.accountPhone }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.accountName }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="accountCode" label="账号编码" align="center"></el-table-column>
        <el-table-column prop="accountPhone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="openId" label="OPEN-ID" align="center"></el-table-column>
        <!--<el-table-column v-if="false" prop="accountAddress" show-overflow-tooltip label="商铺地址"-->
                         <!--align="center"></el-table-column>-->
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleSave(scope.$index, scope.row)">新增</el-button>
            <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="form">
      <el-dialog title="账号信息" :visible.sync="dialogFormVisible">
        <el-form :model="accountForm" label-position="right" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountPhone" maxlength="11" autocomplete="off"></el-input>
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
          <!--<el-row>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label="地址" :label-width="formLabelWidth">-->
                <!--<el-input v-model="accountForm.accountAddress" type="textarea" :rows="2"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
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
              <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="电话" :label-width="formLabelWidth">
                <el-input v-model="accountForm.accountPhone" maxlength="11" autocomplete="off"></el-input>
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
          <!--<el-row>-->
            <!--<el-col :span="24">-->
              <!--<el-form-item label="地址" :label-width="formLabelWidth">-->
                <!--<el-input v-model="accountForm.accountAddress" type="textarea" :rows="2"></el-input>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          <!--</el-row>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="mini" @click="editFormVisible = false">取 消</el-button>
          <el-button size="mini" type="primary" @click="editConfirm()">确 定</el-button>
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
      tableData: [],
      searchParams: {
        accountName: '',
        accountPhone: '',
        createTime: '',
        pageNum: 1,
        pageSize: 1
      },
      accountForm: {
        openId: '',
        accountName: '',
        accountCode: '',
        accountPass: '123',
        accountPhone: '',
        accountAddress: '',
        createTime: ''
      },
      formLabelWidth: '100px',
      dialogFormVisible: false,
      editFormVisible: false,
      total: 0
    }
  },
  created () {
    this.onSearch()
  },
  methods: {
    handleSave (index, row) {
      this.dialogFormVisible = true
      this.accountForm = {}
      console.log(index, row)
    },
    handleEdit (index, row) {
      this.editFormVisible = true
      this.accountForm = Object.assign({}, row)
      console.log(index, row)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该商户, 是否继续?', '提示', {
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
      console.log(index, row)
    },
    onConfirm () {
      this.dialogFormVisible = false
      this.saveAccount(this.accountForm)
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
      console.log(`当前页: ${val}`)
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
        console.log(accounts)
        this.total = accounts.data.total
        this.searchParams.pageSize = accounts.data.pageSize
        this.tableData = accounts.data.list
        console.log(this.tableData)
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
