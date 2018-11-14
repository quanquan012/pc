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
  name: 'Navigation',
  data () {
    return {
      menus: [/* {
        name: '用户列表',
        path: '/merchants',
        children: [{
          name: '123',
          path: '/test'
        }, {
          name: '456',
          path: '/test/t'
        }]
      }, {
        name: '商品分类',
        path: '/categories',
        children: []
      } */]
    }
  },
  created: function () {
    this.listNavigators()
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    listNavigators () {
      this.$http.get('/navigators').then((response) => {
        const navigators = response.data
        console.log(navigators)
        this.menus = navigators.data
        console.log(this.menus)
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

  /*.el-submenu {*/
  /*text-align: center;*/
  /*}*/

  /*.el-menu-item {*/
  /*text-align: center;*/
  /*}*/

</style>
