<template>
  <cube-page type="tabs" :title="title" :backUrl="'/'">
    <div slot="content">
      <div class="scroll-list-wrap">
        <cube-scroll
            class="item-box"
            ref="scroll"
            :data="chapters"
            :options="options">
          <div class="chapter_title"><span v-text="'共'+chapterNum+'章'"></span><span @click='goBack' v-text='desc'></span></div>
          <div v-if='show'>
            <div class="c_t">上次看到</div>
            <div class="last_chapter" v-text="lastChapter_name" @click='goContent(lastChapter_id, lastChapter_name)'></div>
          </div>
          <div class="c_t">正文</div>
          <div class="chapter_box">
            <div class="chapter_item" v-for='item in chapters' :key='item.index' v-text="item.chapter_name" @click='goContent(item.chapter_id, item.chapter_name)'></div>
          </div>
        </cube-scroll>
      </div>
    </div>
  </cube-page>
</template>
<script>
  import CubePage from '../components/cube-page.vue';
  let novelId = '';
  export default {
    data() {
      return {
        title: '',
        chapters: [],
        chapterNum: 0,
        desc: '倒序',
        show: false, // 是否有观看的历史
        lastChapter_name: '',
        lastChapter_id: 0,
        back: true
      }
    },
    mounted() {
      novelId = this.$route.query.novelId;
      const novelName = this.$route.query.name;
      this.title = novelName;
      if (localStorage.getItem(novelId)) {
        let lastChapter = localStorage.getItem(novelId).split(",");
        this.$data.lastChapter_id = lastChapter[0];
        this.$data.lastChapter_name = lastChapter[1];
        this.$data.show=true;
      }
      this.$http
        .get(this.$url + "api/novel/chapter", {
          params: { novel_id: novelId }
        })
        .then(res => {
          if (res.data.code == 200) {
            this.$data.chapters = res.data.list;
            this.$data.chapterNum = res.data.list.length + 1;
            if (res.data.history && res.data.history.chapter_id) {
              this.$data.lastChapter_id = res.data.history.chapter_id;
              this.$data.lastChapter_name = res.data.history.chapter_name;
              this.$data.show=true;
            }
          }
        });
    },
    methods: {
      goContent(_chapter_id, _chapter_name) {
        this.$router.push({
          name: "content",
          query: {
            chapter_id: _chapter_id,
            novel_id: novelId,
            chapter_name: _chapter_name,
            novel_name: this.title
          }
        });
      },
      goBack() {
        this.$data.chapters = this.chapters.reverse();
        this.$data.desc = "正序";
      },
    },
    components: {
      CubePage
    }
  }
</script>
<style lang="less" scoped>
  .chapter_title {
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    padding: 15px 20px;
    border-bottom: 1px solid #ed424b;
    span:first-child {
      font-weight: 700;
    }
  }
  .c_t {
    font-size: 14px;
    color: #969ba3;
    background: #f6f7f9;
    padding: 5px 20px;
  }
  .chapter_box {
    padding: 0 20px;
    .chapter_item {
      font-size: 14px;
      font-weight: 700;
      text-align: left;
      color: #333;
      padding: 15px 0;
      border-bottom: 1px solid #f0f1f2;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .last_chapter {
    font-size: 14px;
    font-weight: 700;
    text-align: left;
    color: #ed424b;
    padding: 15px 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

</style>