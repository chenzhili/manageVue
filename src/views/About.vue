<template>
  <div class="about">
    <h1>This is an about page</h1>
    <ui-marker
      ref="aiPanel-editor"
      class="ai-observer"
      v-bind:uniqueKey="uuid"
      :ratio="16/9"
      v-bind:imgUrl="currentImage"
    ></ui-marker>
  </div>
</template>
<script>
/* 
  1、用这个做 苗木的 数目 选中表示的 东西
      https://vmarker.sagocloud.com/quick_start/

      https://vmarker.sagocloud.com/diy/#upbm
      基于这个插件 进行修改 就好
  2、对于 将 dom 生成 图片，用 html2canvas 插件
*/
/* 
  对于 要做 web的 流程 控制 的解决：
  http://vidanao.com/#/blog/context/front   ===========>  vue-task-node
*/
/* 
  形成曲面：曲面需要两个自变量，一个因变量，且三个变量的数据均须为矩阵，不能为单列或者单行的数组。这句话没理解到
 */
import { AIMarker } from "vue-picture-bd-marker";
console.log(AIMarker);
export default {
  components: { "ui-marker": AIMarker },
  data() {
    return {
      uuid: "0da9130",
      /* 
        地址 依然不能 加入 动态的变量，或者 把资源放到；
        但是 这个 会被 打包压缩优化；
        会自动给 资源 加 hash 值，减除缓存的影响

        如果确实想用 动态变量替换，把所有内容 放到 public 中，这块不会有任何的改动，直接复制出来
      */ 
      currentImage: require('../assets/logo.png')
    };
  },
  methods: {}
};
</script>
