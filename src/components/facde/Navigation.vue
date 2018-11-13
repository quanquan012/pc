<template>
  <el-aside width="240px" class="navigation">
    <el-scrollbar style="height: 100%">
      <el-menu :default-active="$route.path" mode="vertical" background-color="#545c64" @select="handleSelect"
               text-color="#fff" active-text-color="#ffd04b" light router>
        <el-menu-item v-for="(item, index) in menus" :key="index" :index="item.path">{{item.title}}</el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script>
  export default {
    name: 'Navigation',
    data () {
      return {
        menus: [{
          title: '用户列表',
          path: '/users'
        }, {
          title: '商品分类',
          path: '/categories'
        },{
          title: '用户列表',
          path: '/users'
        }, {
          title: '商品分类',
          path: '/categories'
        },{
          title: '用户列表',
          path: '/users'
        }, {
          title: '商品分类',
          path: '/categories'
        },{
          title: '用户列表',
          path: '/users'
        }, {
          title: '商品分类',
          path: '/categories'
        },{
          title: '用户列表',
          path: '/users'
        }, {
          title: '商品分类',
          path: '/categories'
        },{
          title: '用户列表',
          path: '/users'
        }, {
          title: '商品分类',
          path: '/categories'
        },{
          title: '用户列表',
          path: '/users'
        }, {
          title: '商品分类',
          path: '/categories'
        }]
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
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

  .el-menu-item {
    text-align: center;
  }

</style>
