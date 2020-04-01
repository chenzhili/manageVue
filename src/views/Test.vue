<template>
  <div>
    <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam deleniti distinctio minima cum. Hic quae quisquam repellat tempore ad odit sapiente. Optio enim nisi velit a recusandae expedita, sequi dolores?</div>
    <router-link to="/test/child1">child1</router-link>
    <router-link to="/test/child2">child2</router-link>
    <ContainerRouter>
      <router-view></router-view>
    </ContainerRouter>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data() {
    return {
      test: "test"
    };
  },
  methods: {
    // 想要获取到 取消请求的方式 必须以 reqIns 结尾
    cacelGetListReqIns(source) {}
  },
  async mounted() {}
};
</script>
