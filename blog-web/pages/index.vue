<template>
  <div class="content">
    <div class="content_box">
      <div class="content_list">
        <div class="content_list_item text_hover" v-for="v in 10" @click="artDetail">js基础-原型链</div>
      </div>
    </div>
    <div class="content_page">
      <div class="text_hover" v-if="!loading">more></div>
      <div v-else>{{loading_text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'box',
  data() {
    return {
      loading: true,
      loading_text: 'loading',
    }
  },
  methods: {
    artDetail() {
      this.$router.push({path: '/detail',query:{id:1}})
    },
    setLoadingAnimate() {
      setInterval(()=>{
        this.loading_text += '.'
        if(this.loading_text == 'loading....'){
          this.loading_text = 'loading'
        }
      },800)
    }
  },
  mounted() {
    this.setLoadingAnimate()
  }
}
</script>

<style>
.content_list_item{
  font-size: 15px;line-height: 1.7;letter-spacing: 0.018em;font-weight: 300;text-decoration: underline;
  white-space: nowrap;
  cursor: pointer;
}
.content {
  width: 60%;
  margin: 0 auto;
}
.content_box{
  margin-top: 20px;margin-left: 30%;
}
.content_page{
  display: flex;justify-content: center;
  margin: 30px auto 20px auto;
  font-size: 15px;
  line-height: 1.7;
  letter-spacing: 0.018em;
  font-weight: 300;
  text-decoration: underline;
  white-space: nowrap;
  cursor: pointer;
}
</style>
