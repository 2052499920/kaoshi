<!-- 整体布局 -->
<template>

   <el-container style="position: relative;" class="app-container" :class="{
         'mini-side': isCollapse,
         'hide-side': hideSide
      }">

      <el-header class="app-header" style="position: fixed;left: 0; top: 0;width: 100%;" :height="headerHeight + 'px'">
         <app-header @switch="handleSideSwitch" @set-theme="handleSetTheme" @hide-side="handleSwitchHideSide">
         </app-header>
      </el-header>

      <!-- 左侧打开与否颜色变化 -->
      <el-aside class="app-side" :width="hideSide ? '0' : sideWidth + 'px'"
         style="background: #3C6EFF;width: 7%;height: 100%;position: fixed;left: 0; top: 50px;">

         <!-- logo -->
         <!-- <div class="app-header-logo-box" :style="{height: headerHeight + 'px', color: theme.theme.activeTextColor}">
            <img src="../assets/logo.png" alt="" class="header-logo">
            <span class="header-logo-text">控制台</span>
         </div> -->

         <!-- 左侧菜单栏 -->
         <app-side style="background: #3C6EFF;" :collapse="isCollapse" :theme="theme.theme"></app-side>
      </el-aside>

      <!-- 右侧主体 -->
      <el-container style="width: 93%; position: absolute; right: 0;margin-top: 62px;">
         <el-main class="app-body">
            <el-container style="height: 100%;min-height: 100%;overflow: auto" id="appBody">
               <el-main class="app-page-body">
                  <transition name="slide-fade">
                     <router-view></router-view>
                  </transition>
               </el-main>
               <!--  <el-footer class="app-footer" :height="footerHeight + 'px'">
                  <app-footer></app-footer>
               </el-footer> -->
            </el-container>
         </el-main>
      </el-container>
      <m-back-top body-id="appBody"></m-back-top>
   </el-container>

</template>

<script type="text/javascript">
   import AppHeader from '@/components/app-header'
   import AppFooter from '@/components/app-footer'
   import AppSide from '@/components/app-side'
   export default {
      name: 'app-view',
      data() {
         return {
            isCollapse: false,
            hideSide: false,
            sideWidth: 200,
            footerHeight: 50,
            headerHeight: 50,
            theme: { theme: {} }
         }
      },
      components: {
         AppHeader,
         AppFooter,
         AppSide
      },
      methods: {

         // 左侧菜单栏隐藏与否
         handleSideSwitch(val) {
            this.isCollapse = val;
            this.sideWidth = val ? 60 : 250;
         },

         // 左菜单栏？
         handleSwitchHideSide() {
            this.hideSide = !this.hideSide;
         },

         // 主题色
         handleSetTheme(theme) {
            this.theme = theme;
         }
      }
   }
</script>

<style type="text/css">
   .slide-fade {
      position: absolute;
      left: 0;
      right: 0;
   }

   .slide-fade-enter-active {
      transition: all 1.2s ease;
   }

   .slide-fade-leave-active {

      transition: all .1s cubic-bezier(2.0, 0.5, 0.8, 1.0);
   }

   .slide-fade-enter,
   .slide-fade-leave-to {
      left: 0;
      right: 0;
      transform: translateX(50px);
      opacity: 0;
   }

   .app-container {
      margin: 0 auto;
      position: absolute;
      width: 100%;
      height: 100%;
   }

   .app-container .app-header {
      padding: 0;
      background: #16AAD8;
      overflow: visible;
      z-index: 100;
   }

   .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 250px;
      min-height: 400px;
   }

   .app-container .app-side {
      width: 250px;
      transition: all 0.5s ease;
   }

   .app-container .app-body {
      /* background: #ECF0F5; */
      padding: 0;
   }

   .app-container .app-footer {
      background: #fff;
      border-top: solid 1px rgba(48, 54, 62, 0.14);
   }

   .app-container .app-page-body {
      overflow: visible;
      padding: 0px;
   }

   .app-header-logo-box {
      padding: 15px;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
   }

   .app-header-logo-box .header-logo {
      height: 42px;
      margin-top: -17px;
      margin-right: 5px;
      vertical-align: middle;
   }

   .app-header-logo-box .header-logo-text {
      font-size: 20px;
      font-weight: bold;
      opacity: 1;
   }

   /*mini-side*/
   .app-container.mini-side .app-side {
      overflow: visible;
   }

   .app-container.mini-side .app-side .el-menu--collapse {
      width: 60px;
   }

   .app-container.mini-side .header-logo {
      margin-left: -10px;
   }

   .app-container.mini-side .header-logo-text {
      opacity: 0;
   }

   /*hide-side*/
   .app-container.hide-side .app-side {
      display: none;
   }
</style>