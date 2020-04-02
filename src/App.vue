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
</style>
