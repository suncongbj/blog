<template>
  <div class="content">
    <div class="content_box">
      <div class="content_list">
        <div class="content_list_item text_hover" v-for="v in 20">js基础-原型链</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
}
</script>

<style>
.content_list_item{
  font-size: 15px;line-height: 1.7;letter-spacing: 0.018em;font-weight: 300;text-decoration: underline;
  cursor: pointer;
}
.content {
  width: 60%;height: 100%;
  margin: 0 auto;
}
.content_box{
  margin-top: 20px;margin-left: 30%;
}
</style>
