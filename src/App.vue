<template>
  <!-- 这里是 测试用的 -->
  <!-- <div id="app">
    <div id="nav">
      <router-link to="/home/1/2">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/test">test</router-link>
    </div>
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
        <router-view name='about'></router-view>
        <router-view name='test'></router-view>
      </keep-alive>
    </transition>
  </div>-->
  <div id="app">
    <div class="refresh" v-if="!network">
      <h3>我没网了</h3>
      <el-button type="primary" @click="onRefresh">刷新</el-button>
    </div>

    <router-link to="/home/1/2">Home</router-link>|
    <router-link to="/about">About</router-link>|
    <router-link to="/test">test</router-link>
    <!-- <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition> -->
    <ContainerRouter>
        <router-view></router-view>
    </ContainerRouter>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["network"])
  },
  methods: {
    onRefresh() {
      this.$router.replace("/refresh");
    }
  },
  mounted() {
    console.log(this.network);
  }
};
</script>
<style lang="scss">
@import './styles/common.scss';
@import "./styles/scrollBar.scss";
@import "./styles/variable.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.child-view {
  position: absolute;
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(30px, 0);
  transform: translate(30px, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-30px, 0);
  transform: translate(-30px, 0);
}
</style>
