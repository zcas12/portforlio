<template>
  <div class="container">

  </div>
</template>

<script lang="js">
import {mapGetters} from "vuex";
export default {
  name: 'IndexPage',
  async asyncData({store}) {

  },
  data () {
    return {

    }
  },
  created() {
    this.$router.push({path: '/weather'})
  },
  methods: {

  }
}
</script>
