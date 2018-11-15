<template>
  <div>
    <div class="search">
      <div class="search-row">
        <el-row>
          <el-form :inline="true" :model="searchParams" ref="userSearchForm" size="mini">
            <el-col :span="6">
              <el-form-item label="昵称:" prop="merchantName">
                <el-input v-model="searchParams.merchantName" placeholder="昵称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="电话:" prop="merchantPhone">
                <el-input maxlength="11" v-model="searchParams.merchantPhone" placeholder="电话"></el-input>
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
        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.merchantName }}</p>
              <p>住址: {{ scope.row.merchantAddress }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.merchantName }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="merchantCode" label="商户编码" align="center"></el-table-column>
        <el-table-column prop="merchantPhone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="openId" label="OPEN-ID" align="center"></el-table-column>
        <el-table-column v-if="false" prop="merchantAddress" show-overflow-tooltip label="商铺地址"
                         align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="small" type="text" @click="handleSave(scope.$index, scope.row)">新增</el-button>
            <el-button size="small" type="text" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--<div :visible.sync="tableData.length > 0 ? false : true" class="grid">-->
    <!--暂时没有数据-->
    <!--</div>-->
    <div class="form">
      <el-dialog title="商户信息" :visible.sync="dialogFormVisible">
        <el-form :model="merchantForm" label-position="right" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="昵称" :label-width="formLabelWidth">
                <el-input v-model="merchantForm.merchantName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="merchantForm.merchantPhone" maxlength="11" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="OPEN-ID" :label-width="formLabelWidth">
                <el-input v-model="merchantForm.openId" maxlength="11" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商户编码" :label-width="formLabelWidth">
                <el-input v-model="merchantForm.merchantCode" maxlength="8" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="日期" :label-width="formLabelWidth">
                <el-date-picker type="datetime" :editable="false" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
                                v-model="merchantForm.createTime"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="merchantForm.merchantAddress" type="textarea" :rows="2"></el-input>
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
      <el-dialog title="商户信息" :visible.sync="editFormVisible">
        <el-form :model="merchantForm" label-position="right" size="mini">
          <el-row>
            <el-col :span="12">
              <el-form-item label="昵称" :label-width="formLabelWidth">
                <el-input v-model="merchantForm.merchantName" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="merchantForm.merchantPhone" maxlength="11" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="OPEN-ID" :label-width="formLabelWidth">
                <el-input v-model="merchantForm.openId" maxlength="11" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="商户编码" :label-width="formLabelWidth">
                <el-input v-model="merchantForm.merchantCode" maxlength="8" :disabled="true"
                          autocomplete="off"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="日期" :label-width="formLabelWidth">
                <el-date-picker type="datetime" :disabled="true" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"
                                v-model="merchantForm.createTime"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="地址" :label-width="formLabelWidth">
                <el-input v-model="merchantForm.merchantAddress" type="textarea" :rows="2"></el-input>
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
  </div>
</template>

<script>
export default {
  name: 'user',
  data () {
    return {
      tableData: [],
      searchParams: {
        merchantName: '',
        merchantPhone: '',
        createTime: '',
        pageNum: 1,
        pageSize: 1
      },
      merchantForm: {
        openId: '',
        merchantName: '',
        merchantCode: '',
        merchantPhone: '',
        merchantAddress: '',
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
      this.merchantForm = {}
      console.log(index, row)
    },
    handleEdit (index, row) {
      this.editFormVisible = true
      this.merchantForm = Object.assign({}, row)
      console.log(index, row)
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该商户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteMerchant(row.primaryKey)
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
      this.saveMerchant(this.merchantForm)
    },
    editConfirm () {
      this.editFormVisible = false
      this.editMerchant(this.merchantForm)
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
      this.$http.get('/merchants', {
        params: {
          type: 'page',
          pageNum: searchFilters.pageNum,
          pageSize: searchFilters.pageSize,
          merchantName: searchFilters.merchantName,
          merchantPhone: searchFilters.merchantPhone,
          createTime: searchFilters.createTime
        }
      }).then((response) => {
        const merchants = response.data
        console.log(merchants)
        this.total = merchants.data.total
        this.searchParams.pageSize = merchants.data.pageSize
        this.tableData = merchants.data.list
        console.log(this.tableData)
      })
    },
    saveMerchant (merchantForm) {
      const p = JSON.parse(JSON.stringify(merchantForm))
      this.$http.post('/merchants', p).then((response) => {
        this.onSearch()
      })
    },
    editMerchant (merchantForm) {
      const p = JSON.parse(JSON.stringify(merchantForm))
      this.$http.put('/merchants', p).then((response) => {
        this.onSearch()
      })
    },
    deleteMerchant (primaryKey) {
      this.$http.delete('/merchants/' + primaryKey).then((response) => {
        this.onSearch()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
