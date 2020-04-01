<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld id="123" />
    <ul>
      <li v-for="(item,key) of list" :key="key">{{item.low}}</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

import { type } from '@/utils'

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data() {
    return {
      test: "test",
      list: []
    };
  },
  methods: {
    // 想要获取到 取消请求的方式 必须以 reqIns 结尾
    cacelGetListReqIns(source) {
      // console.log(source, '执行');
      this.$set(this.reqTokenInsConfig, 'cancelGetList', source);
    }
  },
  async mounted() {
    const cofnig = {
      serviceid: 'kline',
      body: {
        marketid: 1,
        stockcode: '002013',
        requesttype: 0,
        applysize: 1000,
        starttime: 20180101,
        wgtflag: 1
      }
    };
    const data = await this.$http.moduleA.getList(cofnig, this.cacelGetListReqIns);
    this.list = data.data.data.slice(0, 11);
    console.log(this.list);
  }
};
</script>
