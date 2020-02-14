<template>
  <div class="container">
    <h1>設定權限</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'username',
      'roles'
    ])
  },
  mounted() {
    
  }
}
</script>

<style lang="scss" scoped>
.container {
    margin: 30px;
}
</style>
