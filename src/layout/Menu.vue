<template>
  <div class="">
    <el-menu
      :default-active="activeIndex"
      :ellipsis="false"
      class="el-menu-demo"
      mode="horizontal"
      router
      menu-trigger="click"
      @select="handleSelect"
    >
      <el-menu-item index="domain-list">域名管理</el-menu-item>
      
      <el-menu-item index="group-list">分组管理</el-menu-item>

      <el-menu-item index="notify-edit">通知设置</el-menu-item>

      <el-menu-item
        v-if="isAdmin"
        index="user-admin-list"
        >用户管理</el-menu-item
      >

      <el-menu-item
        v-if="isAdmin"
        index="system-list"
        >系统设置</el-menu-item
      >

      <el-menu-item
        v-if="isAdmin"
        index="log-scheduler-list"
        >监测日志</el-menu-item
      >

      <div class="self-center margin-left--auto flex items-center">
        <el-dropdown trigger="hover">
          <el-avatar :src="userInfo && userInfo.avatar_url">
            <img src="https://api.multiavatar.com/domain-admin.png" />
          </el-avatar>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                @click="handleUserInfoEditOpen"
                class="justify-center"
                >个人设置</el-dropdown-item
              >

              <el-dropdown-item
                @click="handleUpdatePasswordClick"
                class="justify-center"
                >修改密码</el-dropdown-item
              >

              <el-dropdown-item
                @click="handleAboutClick"
                class="justify-center"
                >关于</el-dropdown-item
              >

              <el-dropdown-item
                @click="handleLogoutClick"
                class="justify-center"
                >退出</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-menu>

    <!-- 修改密码 -->
    <UserPaswordEditDataFormDailog
      v-model:visible="dialogVisible"
      @on-success="handleUserPaswordEditSuccess"
      @on-cancel="handleUserPaswordEditClose"
    ></UserPaswordEditDataFormDailog>

    <!-- 修改个人设置 -->
    <UserDataFormDailig
      v-model:visible="userDialogVisible"
      @on-success="handleUserInfoEditClose"
      @on-cancel="handleUserInfoEditClose"
    ></UserDataFormDailig>

    <!-- 关于 -->
    <AboutDataFormDailig
      v-model:visible="aboutDialogVisible"
    ></AboutDataFormDailig>
  </div>
</template>

<script>
// created at 2022-10-01

import { removeToken } from '@/utils/token-util.js'
import { useUserStore } from '@/store/user-store.js'
import { mapState, mapActions } from 'pinia'
import UserPaswordEditDataFormDailog from '@/views/user-pasword-edit/DataFormDailog.vue'
import AboutDataFormDailig from '@/views/about/DataFormDailig.vue'
import UserDataFormDailig from '@/views/user-edit/DataFormDailig.vue'

export default {
  name: 'Menu',

  props: {},

  components: {
    UserPaswordEditDataFormDailog,
    AboutDataFormDailig,
    UserDataFormDailig,
  },

  data() {
    return {
      activeIndex: '',
      dialogVisible: false,
      aboutDialogVisible: false,
      userDialogVisible: false,
    }
  },

  computed: {
    ...mapState(useUserStore, {
      userInfo: 'userInfo',
      isAdmin: 'isAdmin',
    }),
  },

  methods: {
    ...mapActions(useUserStore, {
      updateUserInfo: 'updateUserInfo',
      removeUserInfo: 'removeUserInfo',
    }),

    async getData() {},

    handleSelect(index) {
      // console.log(index)
      // this.$router.push({
      //   name: index,
      // })
    },

    handleLogoutClick(data) {
      //   console.log(data)
      this.removeUserInfo()

      removeToken()

      this.$router.push({
        path: '/login',
      })
    },

    handleUpdatePasswordClick() {
      this.dialogVisible = true
    },

    handleUserPaswordEditClose() {
      this.dialogVisible = false
    },

    handleUserPaswordEditSuccess() {
      this.dialogVisible = false
    },

    handleUserInfoEditOpen() {
      this.userDialogVisible = true
    },

    handleUserInfoEditClose() {
      this.userDialogVisible = false
    },

    handleAboutClick() {
      this.aboutDialogVisible = true
    },
  },

  created() {
    this.activeIndex = this.$route.name
    this.getData()
  },
}
</script>

<style lang="less"></style>

<style lang="less" scoped></style>
