<template>
  <el-aside width="240px" class="navigation">
    <el-scrollbar style="height: 100%">

      <el-menu :default-active="$route.path" mode="vertical" background-color="#545c64" @select="handleSelect"
               text-color="#fff" active-text-color="#ffd04b" light router>
        <template v-for="(item, index) in menus">
          <el-submenu v-if="item.children.length>0" :key="index" :index="item.navigatorPath">
            <template slot="title">
              <i :class="item.navigatorIcon"></i>
              <span slot="title">{{item.navigatorName}}</span>
            </template>
            <el-menu-item v-for="child in item.children" :index="child.navigatorPath" :key="child.navigatorPath">
              {{child.navigatorName}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-if="!item.children.length>0" :key="index" :index="item.navigatorPath">
            <i :class="item.navigatorIcon"></i>
            <span slot="title">{{item.navigatorName}}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
export default {
  name: 'navigation',
  data () {
    return {
      menus: []
    }
  },
  created: function () {
    this.listNavigators()
  },
  methods: {
    handleSelect (key, keyPath) {

    },
    listNavigators () {
      this.$http.get('/navigators',{
        params:{
          type: 'byCurrentAuth'
        }
      }).then((response) => {
        const navigators = response.data
        this.menus = navigators.data
      })
    }
  }
}
</script>

<style>
  .navigation {
    height: 100%;
    background-color: #525C64;
  }

  .el-scrollbar {
    height: 100%;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  .el-menu {
    border-right-width: 0;
    width: 240px;
    overflow-x: hidden;
  }

</style>
