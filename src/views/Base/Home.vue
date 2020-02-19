<template>
  <el-container>
    <!-- 顶部导航栏 -->
    <el-header>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item @click="goCollapse">
          <i class="el-icon-menu"></i>
        </el-menu-item>
        <el-menu-item class="font"> 基坑监测系统</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-plus"></i>新增</template>
          <el-menu-item index="2-1"
            ><i class="el-icon-user"></i>用户</el-menu-item
          >
        </el-submenu>

        <el-submenu index="3" style="float:right">
          <template slot="title"><i class="el-icon-plus"></i>admin</template>
          <el-menu-item index="3-1"
            ><i class="el-icon-s-check"></i>个人信息</el-menu-item
          >
          <el-menu-item index="3-2"
            ><i class="el-icon-connection"></i>切换用户</el-menu-item
          >
          <el-menu-item index="3-3"
            ><i class="el-icon-switch-button"></i>退出</el-menu-item
          >
        </el-submenu>
        <span style="float:right;color:white">超级管理员</span>
      </el-menu>
    </el-header>
    <!-- end -->

    <el-container>
      <!-- 侧边导航栏 -->
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-vertical-demo"
        unique-opened
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height:100%"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-home"></i>
            <span slot="title">基础管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">基坑沉降简介</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-share"></i>
            <span slot="title">数据监测</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">总视图</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="2-2">监测配置</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="2-3">实时数据</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="2-4">历史数据</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">管理员管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">角色管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="3-2">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">系统日志</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <!-- end -->

      <!-- 中部视图区 -->
      <el-main>
        <el-header>
          <el-tabs
            v-model="editableTabsValue"
            type="card"
            @tab-remove="removeTab"
            style=" background-color:white"
          >
            <el-tab-pane label="首页"> </el-tab-pane>
            <el-tab-pane
              v-for="item in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              closable
            >
            </el-tab-pane>
          </el-tabs>
        </el-header>
        <el-main style="padding-top:6px">
          <router-view />
        </el-main>
      </el-main>
      <!-- end -->
    </el-container>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: '2-1',
      activeIndex2: '1-1',
      isCollapse: false,
      collapseWidth: '201px',
      editableTabsValue: '0',
      editableTabs: [{
        title: 'Tab 1',
        name: '1',
        content: 'Tab 1 content'
      }, {
        title: 'Tab 2',
        name: '2',
        content: 'Tab 2 content'
      }],
      tabIndex: 2
    };
  },
  created () {

  },
  methods: {
    goCollapse () {
      this.isCollapse = !this.isCollapse;
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    addTab (targetName) {
      let newTabName = ++this.tabIndex + '';
      this.editableTabs.push({
        title: 'New Tab',
        name: newTabName,
        content: 'New Tab content'
      });
      this.editableTabsValue = newTabName;
    },
    removeTab (targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
}
</script>
<style>
.font {
  font-size: 20px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-container {
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;
  padding: 0px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
  padding: 0px;
  width: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}
</style>