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
        <el-menu-item class="font1"> 基坑监测系统</el-menu-item>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-plus"></i>新增</template>
          <el-menu-item index="2-1"
            ><i class="el-icon-user"></i>用户</el-menu-item
          >
        </el-submenu>

        <el-submenu index="3" style="float:right">
          <template slot="title"><i class="el-icon-plus"></i>admin</template>
          <el-menu-item index="3-1" @click =" personalInformation "
            ><i class="el-icon-s-check" ></i>个人信息</el-menu-item
          >
          <el-menu-item index="3-2"
            ><i class="el-icon-connection"></i>切换用户</el-menu-item
          >
          <el-menu-item index="3-3" @click="logout"
            ><i class="el-icon-switch-button" ></i>退出</el-menu-item
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
        router
        @select="select"
        unique-opened
        @open="handleOpen"
        @close="handleClose"
        :collapse="isCollapse"
        background-color="#e9eef3"
        style="height:100%"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-unfold"></i>
            <span slot="title">基础管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/index">基坑沉降简介</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-share"></i>
            <span slot="title">数据监测</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/TotalView">总视图</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/DataView">监测配置</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/RealData">实时数据</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/HistoryData">历史数据</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span slot="title">管理员管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/UserAdmin">角色管理</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/AdminList">管理员列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/SysLog">系统日志</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <!-- end -->

      <!-- 中部视图区 -->
      <el-main>
        <el-header>
          <el-tabs
            v-model="editableTabsValue"
            type="border-card"
            @tab-remove="removeTab"
            @tab-click="tabSelect"
            style=" background-color:#e9eef3"
          >
            <el-tab-pane label="首页" name="/top"> </el-tab-pane>
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
          <transition name="move" mode="out-in">
            <template>
              <keep-alive>
                <router-view />
              </keep-alive>
            </template>
          </transition>
        </el-main>
      </el-main>
      <!-- end -->

      <!-- 用户注册对话框 -->
      <el-dialog
        :modal-append-to-body="true"
        custom-class="bg-col"
        title="用户注册"
        :visible.sync="dialogVisible"
        width="50%"
      >
        <Dialog></Dialog>
      </el-dialog>
      <!-- 用户个人信息显示对话框 -->
      <el-dialog
        title="用户个人信息"
        :visible.sync="personalDialogVisible"
        width="50%"
      >
       <el-form
        :model="showForm"
        :rules="showFormRules"
        ref="showFormRef"
        label-width="100px"
        class="demo-ruleForm"
      >
      
        <el-form-item label="用户ID">
         {{ uid }}
        </el-form-item>
        <el-form-item label="用户名:">
         {{username }}
        </el-form-item>
         <el-form-item label="权限:">
         {{  title }}
        </el-form-item>
         <el-form-item label="创建时间:">
         {{ createdAt }}
        </el-form-item>
         <el-form-item label="手机:">
         {{  tel }}
        </el-form-item>
         
       </el-form>
      <!-- <span>用户ID:{{ uid }}</span>
      <p><span>用户名:{{ username }}</span></p>
      <p><span>权限:{{ title }}</span></p>
      <p><span>创建时间:{{ createdAt }}</span></p>
      <p><span>手机:{{ tel }}</span></p> -->
        <span slot="footer" class="dialog-footer">
        <el-button @click="personalDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="personalDialogVisible = false">确 定</el-button>
      </span>
      </el-dialog>

    </el-container>
  </el-container>
</template>
<script>
import Dialog from './Dialog'
export default {
  components: { Dialog, props: ['visible'] },
  data () { 
  

    return {
      //显示框
        showForm: '',
        showFormRules: '',
        //用户个人信息
        uid: '',
        username: '',
        title: '',
        tel: '',
        createdAt: '',
    
      // 用户个人信息展示
      personalDialogVisible:false,
      activeIndex: '2-1',
      activeIndex2: this.$route.path,
      isCollapse: false,
      collapseWidth: '201px',
      editableTabsValue: this.$route.path,
      editableTabs: [{
        title: '基坑沉降简介',
        name: '/index',
      }],
      tabsMap: {
        '/index': '基坑沉降简介',
        '/TotalView': '总试图',
        '/DataView': '监测数据',
        '/RealData': '实时数据',
        '/HistoryData': '历史数据',
        '/UserAdmin': '角色管理',
        '/AdminList': '管理员列表',
        '/SysLog': '系统日志'      },
      tabName: this.$route.path,
      tabIndex: 2,
      dialogVisible: false
    };
  },
    // 周期函数
  created() {
  
  },
  methods: {
  //  展示个人用户信息
  async  personalInformation(){
    
   
        const { data: res } = await this.$axios
        .get("/admin/getUserInfo") 
        .then( async ()  => {         
           console.log(res.data);
          if (res.data.status == "success") {
            this.$message.success("获取个人信息成功");
            this.uid=res.data.data.uid
            this.username=res.data.data.username
            this.title=res.data.data.title
            this.createdAt=res.data.data.createdAt
            this.tel=res.data.data.tel
            this.personalDialogVisible = true;
         
          }
        })
        .catch(error => {
          console.log(error);
          this.$alert("网络请求问题，联系管理员修复", "管理员的提示", {
            confirmButtonText: "确定"
          });
        });
    },
  
    logout(){
      window.sessionStorage.clear()
      this.$router.push("/login");
    },
    goCollapse () {
      this.isCollapse = !this.isCollapse;
    },
    tabSelect (targetName) {
      let pathname = targetName.name;
      if (this.$route.path != pathname) {
        this.tabName = pathname;
        this.$router.push(pathname);
        this.activeIndex2 = pathname;
      }

    },
    select (index) {
      let exit = false;
      for (let i in this.editableTabs) {
        if (index == this.editableTabs[i].name) {
          this.editableTabsValue = index;
          exit = true;
        }
      }
      if (!exit) {
        this.addTab(index);
      }

    },
    handleSelect (key, keyPath) {
      if (key == '2-1') {
        this.dialogVisible = true;
      }

      console.log(key, keyPath);
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath);
    },
    addTab (targetName) {
      let newTabName = targetName;
      let newTitle = this.tabsMap[targetName];
      this.editableTabs.push({
        title: newTitle,
        name: newTabName,
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
    },

  }
}
</script>
<style>
.font2 {
  color: #ffffff;
  font-weight: 500;
  font-size: 25px;
  text-align: center;
}
.font1 {
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
  color: #333;
  text-align: center;
  line-height: 40px;
  padding: 0px;
  padding-top: 2px;
}

body > .el-container {
  margin-bottom: 40px;
}

.bg-col {
  width: 50%;
  position: relative;
  background: linear-gradient(to bottom right, #50a3a2, #53e3a6);
}
</style>