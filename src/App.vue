<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
    <notifications group="cart" position="bottom right" />
  </div>
</template>

<script>
import Header from '@/components/ui/MainHeader.vue'

export default {
  name: 'App',
  components: { Header },
  async created() {
    await this.$store.dispatch('loadProductsList')
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  box-sizing: border-box;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
}

main {
  padding: 8px;
  background: rgb(255, 254, 251);
  flex-grow: 1;
}
</style>
