<template>
  <div class="g_box">
    <nuxt/>
    <vFooter/>
  </div>
</template>

<script>
import vFooter from '~/components/v-footer'
export default {
    components: {
      vFooter
    },
    mounted() {

    }
}
</script>

<style>
html,body,#__nuxt,#__layout{
  width: 100%;height: 100%;
}
.g_box{
  width: 100%;
  display: flex;flex-direction: column;justify-content: space-between;
}
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
