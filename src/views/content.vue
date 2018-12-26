<template>
  <cube-page type="scroll-view" :title="title" class="content-box" :backUrl="'/chapter?novelId=' + novelId + '&name=' + novelName">
    <template slot="content">
      <div class="content-scroll-wrapper">
        <div class="content-scroll-list-wrap" ref="scrollWrapper">
          <cube-scroll
              ref="contentScroll"
              :data="list"
              :options="options"
              @pulling-up="onPullingUp">
            <ul class="imgs-wrapper">
              <li v-for="(item, index) in list" :key="index" class="imgs-item">
                <div class="chapter_name" v-text="item.name"></div>
                <div class="chapter_content" v-html="item.content"></div>
              </li>
            </ul>
            <template slot="pullup">
              <div class="pullup-box">
                <div class="loading">
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>

            </template>
          </cube-scroll>
        </div>
      </div>
    </template>
  </cube-page>
</template>

<script type="text/ecmascript-6">
  import CubePage from '../components/cube-page.vue';

  let _chapter_id = '';
  let _chapter_name = '';
  let _novel_id = '';
  export default {
    data() {
      return {
        title: '',
        list: [],
        options: {
          pullUpLoad: true
        },
      }
    },
    components: {
      CubePage
    },
    created() {
      _chapter_id = this.$route.query.chapter_id;
      _chapter_name = this.$route.query.chapter_name;
      this.title = this.$route.query.chapter_name;
      _novel_id = this.$route.query.novel_id;
      this.novelId = _novel_id;
      this.novelName = this.$route.query.novel_name;
      localStorage.setItem(
        _novel_id,
        _chapter_id + "," + _chapter_name
      );
      document.title = _chapter_name;
      this.$http.get(this.$url + 'api/novel/content', {
        params: {
          chapter_id: _chapter_id,
          chapter_name: _chapter_name,
          novel_id: _novel_id
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$data.first = false;
          this.$data.list.push({
            name: res.data.chapter_name,
            content: res.data.content
          });
        }
      });
    },
    methods: {
      onPullingUp() {
        this.$http.get(this.$url + 'api/novel/next_content', {
          params: {novel_id: _novel_id, chapter_id: _chapter_id}
        }).then(res => {
          if (res.data.code == 200) {
            this.$data.list.push({
              name: res.data.chapter_name,
              content: res.data.content
            });
            document.title = res.data.chapter_name;
            _chapter_id = res.data.chapter_id;
            localStorage.setItem(
              _novel_id,
              _chapter_id + "," + res.data.chapter_name
            );
            this.title = res.data.chapter_name;
            this.$router.push({
              name: "content",
              query: {
                chapter_id: _chapter_id,
                novel_id: _novel_id,
                chapter_name: res.data.chapter_name
              }
            });
          }
        });
      },
    },
    mounted() {
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .content-box
    .content
      margin: 0 !important
      height: 100%
      display: flex
      flex-flow: column
      background: url(https://qidian.gtimg.com/qdm/img/skin-default-m.35905.jpg) repeat;
      padding-left: 20px;
      padding-right: 20px;
    .content-scroll-wrapper
      flex: 1
      position: relative
      .content-scroll-list-wrap
        height: 100%
        transform: rotate(0deg) // fix 子元素超出边框圆角部分不隐藏的问题
        position: absolute
        top: 0
        bottom: 0
        overflow: hidden
        .imgs-wrapper
          .imgs-item
            >img
              width: 100%
    .success-enter-active, .success-leave-active
      transition: width .5s
    .success-enter, .success-leave-to
      width: 70%
    .success-enter-to, .success-leave
      width: 100%
  .chapter_name {
    font-size: 18px;
    color: #000;
    text-align: center;
    font-weight: 700;
    padding: 20px 0;
  }
  .chapter_content {
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    text-align: left;
    line-height: 24px;
  }
  .pullup-box {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loading{
    width: 75px;
    height: 8px;
  }
  .loading span{
    display: inline-block;
    width: 8px;
    height: 100%;
    margin-right: 4px;
    border-radius: 50%;
    background: #fff;
    -webkit-animation: load 1.04s ease infinite;
  }
  .loading span:last-child{
    margin-right: 0px;
  }
  @keyframes load{
    0%{
      opacity: 1;
      -webkit-transform: scale(1.3);
    }
    100%{
      opacity: 0.2;
      -webkit-transform: scale(.3);
    }
  }
  .loading span:nth-child(1){
    -webkit-animation-delay:0.13s;
  }
  .loading span:nth-child(2){
    -webkit-animation-delay:0.26s;
  }
  .loading span:nth-child(3){
    -webkit-animation-delay:0.39s;
  }
  .loading span:nth-child(4){
    -webkit-animation-delay:0.52s;
  }
  .loading span:nth-child(5){
    -webkit-animation-delay:0.65s;
  }
</style>
