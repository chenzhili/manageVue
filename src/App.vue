<template>
  <div id="app">
    <div class="refresh" v-if="!network">
      <h3>我没网了</h3>
      <el-button type="primary" @click="onRefresh">刷新</el-button>
    </div>

    <ContainerRouter>
        <router-view></router-view>
    </ContainerRouter>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import {permission} from '@/store/constJSON'
import { constantRouterMap } from '@/router/index'
console.log(permission);
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["network"])
  },
  methods: {
    ...mapMutations([permission.mutations.INIT_ROUTES]),
    onRefresh() {
      this.$router.replace("/refresh");
    }
  },
  mounted() {
    this[permission.mutations.INIT_ROUTES](constantRouterMap);
  }
};
</script>
<style lang="scss">
@import './styles/common.scss';
@import "./styles/scrollBar.scss";
@import "./styles/variable.scss";
</style>
