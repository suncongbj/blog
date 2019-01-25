<template>
  <div class="content">
    <header class="header">
      <div class="header_img">
        <div class="btn_hover" @click="about">
          <img src="../assets/img/about.png" alt="">
        </div>
        <div class="btn_hover" @click="classfy">
          <img src="../assets/img/classfy.png" alt="">
        </div>
        <div class="btn_hover" @click="search">
          <img src="../assets/img/search.png" alt="">
        </div>
      </div>
      <transition name="fade">
        <div class="search" v-if="search_show">
          <div class="search_close">
            <svg class="icon" aria-hidden="true" @click="search_show = false">
              <use xlink:href="#icon-guanbi"></use>
            </svg>
          </div>
          <div class="search_input">
            <input type="text">
          </div>
          <div class="search_association">
            <div>
              <div v-for=" v in 20">{{v}}</div>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="about" v-if="about_show">
          <div class="about_content">
            <div class="about_close">
              <svg class="icon" aria-hidden="true" style="opacity: 0">
                <use xlink:href="#icon-guanbi"></use>
              </svg>
              <h4>about</h4>
              <svg class="icon" aria-hidden="true" @click="about_show = false">
                <use xlink:href="#icon-guanbi"></use>
              </svg>
            </div>
            <div class="about_detail">
              Everything is component.
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="classfy" v-if="classfy_show">
          <div class="search_close">
            <svg class="icon" aria-hidden="true" @click="classfy_show = false">
              <use xlink:href="#icon-guanbi"></use>
            </svg>
          </div>
          <div class="classfies_box">
            <div v-for="v in 10">{{v}}</div>
          </div>
        </div>
      </transition>
    </header>
    <div class="content_box">
      <div class="content_list">
        <!-- 搜索结果和分类结果时展示 -->
        <p class="content_list_instruct">以下展示为"<b>xxx</b>"的搜索结果。<span class="text_hover">返回></span></p>
        <p class="content_list_instruct">以下展示为"<b>xxx</b>"分类下的结果。<span class="text_hover">返回></span></p>
        <div class="content_list_instruct_hold"></div>
        <div class="content_list_item text_hover" v-for="v in 10" @click="artDetail">js基础-原型链</div>
      </div>
    </div>
    <div class="content_page">
      <!-- 三种加载状态 -->
      <div class="text_hover">more></div>
      <div>{{loading_text}}</div>
      <div>nomore...</div>
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
      search_show: false,
      classfy_show: false,
      about_show: false,
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
    },
    about() {
      this.about_show = true
    },
    classfy() {
      this.classfy_show = true
    },
    search() {
      this.search_show = true
    }
  },
  mounted() {
    this.setLoadingAnimate()
  }
}
</script>

<style scoped>
.content_list_instruct_hold{
  height: 20px;
}
.content_list_instruct>span{
  text-decoration: underline;
  cursor: pointer;
}
.content_list_instruct{
  margin: 20px 0;
  font-size: 15px;line-height: 1.7;letter-spacing: 0.018em;font-weight: 300;
}
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
  margin-left: 30%;
}
.content_page{
  display: flex;justify-content: center;
  margin: 30px auto 20px auto;
  font-size: 14px;
  line-height: 1.7;
  letter-spacing: 0.018em;
  font-weight: 300;
  white-space: nowrap;
}
.classfies_box>div{
  padding: 10px 20px;
  background: #fff;
  margin-top: 12px;
  border-radius: 1px;
  cursor: pointer;
  color: #71A9E4;
}
.classfies_box {
  width: 100%;
  display: flex;flex-direction: column;align-items: center;
  margin-top: 30px;
}
.classfy{
  position: fixed;top: 0;left: 0;
  width: 100%;height: 100%;
  background: rgba(0,0,0,.3);
}
.about_detail{
  margin-top: 20px;
}
.about_close>h4{
  margin-top: 10px;
  color: #555;
  font-size: 34px;line-height: 1.07885;letter-spacing: -0.016em;font-weight: 200;text-align: center;
}
.about_close>svg{
  color: #555;font-size: 30px;
  margin-right: 10px;margin-top: 10px;
  cursor: pointer;
}
.about_close{
  width: 100%;
  display: flex;justify-content: space-between;align-items: center;
}
.about_content{
  width: 60%;background: #fff;
  margin: 5% auto;
  height: 88%;
}

@media screen and (max-width: 960px){
  .about_content{
    width: 90%;
  }
}
.about{
  position: fixed;top: 0;left: 0;
  width: 100%;height: 100%;
  background: rgba(0,0,0,.3);
}
.search_association{
  display: flex;justify-content: center;
  width: 100%;color: #333
}
.search_association>div{
  width: 400px;
  max-height: 400px;
  margin-top: 1px;
  overflow-y: auto;
}
.search_association>div>div{
  background: #fff;
  width: 100%;
  padding: 10px 8px;box-sizing: border-box;
  border-bottom: 1px solid #f6f6f6;
  cursor: pointer;
  transition: padding .5s , color .5s;
}
.search_association>div>div:hover{
  background: #f3f3f3;
  padding-left: 20px;
  color: blue
}
.search_input{
  display: flex;justify-content: center;
  width: 100%;
  margin-top: 20px;
}
.search_input>input{
  width: 400px;height: 36px;
  border: none;
  border-radius: 6px;
  padding-left: 8px;box-sizing: border-box;
  outline: none;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
.search_close>svg{
  color: #fff;font-size: 30px;
  margin-right: 10%;margin-top: 20px;
  cursor: pointer;
}
.search_close{
  width: 100%;
  display: flex;justify-content: flex-end;
}
.search{
  position: fixed;top: 0;left: 0;
  width: 100%;height: 100%;
  background: rgba(0,0,0,.3);
}
.header_img{
  display: flex;
}
.header_img>div{
  width: 35px;height: 35px;
  cursor: pointer;
  margin: 0 10px;
  animation: icon_in 1.5s
}
@keyframes icon_in{
  from {
    opacity: 0;
    transform: translate(0,-15px)
  }
  to{
    opacity: 1;
    transform: translate(0,0);
  }
}
.header{
  width: 100%;min-height: 35px;
  margin-top: 20px;
  display: flex;justify-content: center;
}
img{
  width: 100%;height: 100%;
}
@media screen and (max-width: 960px){
  .search_association>div,.search_input>input{
    width: 90%;
  }
}
</style>
