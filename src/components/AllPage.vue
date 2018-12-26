<template>
  <div class="all-page">
    <div class="submit-box">
      <cube-input v-model="need_novel" placeholder="添加小说，等待审核" class="submit-input"></cube-input>
      <cube-button class="submit-btn" @click="add_novel">ADD</cube-button>
    </div>
    <div class="scroll-list-wrap">
      <cube-scroll
          class="item-box"
          ref="scroll"
          :data="novel_list"
          :options="options">
        <NovelItem :item="item" :key="item.index" v-for="item in novel_list" @chapter="goChapter"></NovelItem>
      </cube-scroll>
    </div>
  </div>
</template>
<script>
  import NovelItem from './NovelItem.vue'
  export default {
    data() {
      return {
        novel_list: [],
        need_novel: '', // 添加的小说
      }
    },
    mounted() {
      this.getAllPage();
    },
    methods: {
      goChapter: function (data) {
        console.log(data);
        this.$router.push({
          name: "chapter",
          query: {
            novelId: data.id,
            name: data.name
          }
        })
      },
      getAllPage: function () {
        this.$http.get(this.$url + 'api/novel/list').then(res => {
          if (res.data.code == 200) {
            this.$data.novel_list = res.data.list;
          }
        });
      },
      add_novel: function () {
        if (this.need_novel) {
          this.$http.get(this.$url + 'api/novel/need_novel', {params: {name: this.$data.need_novel}}).then((res) => {
            if (res.data.code == 200) {
              this.$data.need_novel = '';
              this.toast = this.$createToast({
                txt: '提交成功！',
                type: 'txt'
              });
              this.toast.show();
            }
          })
        } else {
          this.toast = this.$createToast({
            txt: '请填写小说！',
            type: 'txt'
          });
          this.toast.show();
        }
      },
    },
    components: {
      NovelItem
    }
  }
</script>
<style lang="less" scoped>
  .submit-box {
    display: flex;
    padding: 10px;
    height: 40px;
    .submit-input {
      flex: 5;
      background: #fafafa;
      .cube-input-field {
        border-bottom-left-radius: 6px;
        border-top-left-radius: 6px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    }
    .submit-btn {
      flex: 1;
      background: #4284ed;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      border-bottom-left-radius: 0px;
      border-top-left-radius: 0px;
      line-height: 0;
    }
  }
  .scroll-list-wrap {
    height: 567px;
  }
  .item-box {
    padding:0 20px;
  }

</style>