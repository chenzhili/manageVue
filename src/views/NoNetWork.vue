<template>
  <div>
    <h1>重连中....</h1>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next(async vm => {
      console.log(from.fullPath);
      await new Promise((resolve, reject) => {
          setTimeout(() => {
              resolve();
          }, 2000)
      })
      vm.$router.replace(from.fullPath);
    });
  },
  methods: {},
  mounted() {}
};
</script>
