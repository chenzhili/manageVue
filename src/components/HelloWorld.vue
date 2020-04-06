<template>
  <div>
    <h2 v-for="(key,index) of list" :key="index">{{ key.title }}</h2>
    <button @click="addToCart">Add To Cart</button>
  </div>
</template>
<script>
import { mapState, mapMutations, createNamespacedHelpers } from 'vuex'
import { parents } from '../store/constJSON'
const { mapMutations:amapMutations } = createNamespacedHelpers("aModule");
// console.log(amapMutations(['aaa'])); 
export default {
  name: "HelloWorld",
  props: ["id"],
  data() {
    return {
     
    };
  },
  computed: {
    ...mapState(['list']),
    item() {
      return this.$store.state.list.find(item => item.id === this.id);
    }
  },
  methods: {
    check() {
      return true;
    },
    addToCart() {
      // console.log(this.$store.state.list);
      if (this.check() && this.$store.state.list.length < 3) {
        this.$store.commit(parents.mutations.ADD_TO_CART, this.id);
      } else {
        this.$router.push({ name: "About" });
      }
    }
  },
  mounted() {
    // console.log('对应store的值', this.$store);
  }
};
</script>
<style lang="sass" scoped>
</style>