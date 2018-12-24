<template>
  <div class="my_box">
    <LoginAndRegister v-if="!type" @isLogin="loginSuccess"></LoginAndRegister>
    <div class="scroll-list-wrap" v-if="type && my_novel.length !== 0">
      <cube-scroll
          class="item-box"
          ref="scroll"
          :data="my_novel"
          :options="options">
        <cube-swipe>
          <transition-group name="swipe" tag="div">
            <div v-for="(item, index) in my_novel" :key="item.id">
              <cube-swipe-item
                  ref="swipeItem"
                  :btns="btns"
                  :index="index"
                  @btn-click="onBtnClick">
                <NovelItem :item="item" :key="item.index"  @chapter="goChapter"></NovelItem>
              </cube-swipe-item>
            </div>

          </transition-group>
        </cube-swipe>
        <div class="out_btn_box">
          <cube-button :outline="true" class="out_btn" @click="outLogin">退出登录</cube-button>
        </div>
      </cube-scroll>
    </div>
    <div class="no_novel" v-if="type && my_novel.length === 0">
      <span>暂未添加小说</span>
    </div>
  </div>
</template>
<script>
  import LoginAndRegister from './LoginAndRegister.vue'
  import NovelItem from './NovelItem.vue'
  export default {
    data() {
      return {
        type: false, // 判断是否登录
        my_novel: [],
        btns:[
          {
            action: 'clear',
            text: '置顶',
            color: '#c8c7cd'
          },
          {
            action: 'delete',
            text: '删除',
            color: '#ff3a32'
          }
        ]
      }
    },
    mounted() {
      this.$http.get(this.$url + 'api/novel/userValid').then(res => {
        if (res.data.code === 200) {
          this.$data.type = true;
          this.getMyPage();
//          this.$data.selected = 'myPage';
//          this.getAllPage();
        } else if (res.data.code === 302) {
//          this.getAllPage();
//          this.$data.selected = 'allPage';
//          this.$data.type = false;
        }
      })
    },
    methods: {
      loginSuccess: function (value) {
        if (value.success) {
          this.$data.type = true;
          this.getMyPage();
        }
      },
      getMyPage: function () {
        this.$http.get(this.$url + 'api/novel/userList').then(res => {
          if (res.data.code == 200) {
            this.$data.my_novel = res.data.list;
          }
        });
      },
      onBtnClick: function (btn, index) {
        console.log(btn, index)
        if (btn.action === 'delete') {
          this.$createActionSheet({
            title: '确认要删除吗',
            active: 0,
            data: [
              {content: '删除'}
            ],
            onSelect: () => {
              this.my_novel.splice(index, 1)
            }
          }).show()
        } else {
          this.$createActionSheet({
            title: '确认要置顶吗',
            active: 0,
            data: [
              {content: '置顶'}
            ],
            onSelect: () => {
              this.my_novel.unshift(this.my_novel.splice(index, 1)[0]);
              this.$refs.swipeItem[index].shrink()
            }
          }).show()
        }
      },
      outLogin() {
        console.log(document.cookie)
      }
    },
    components: {
      LoginAndRegister,
      NovelItem
    }
  }
</script>
<style lang="less" scoped>
  .my_box {
    position: relative;
    height: 100%;
  }
  .no_novel {
    display: flex;
    font-size: 16px;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: #aaaaaa;
  }
  .scroll-list-wrap {
    height: 627px;
  }
  .item-box {
    padding:0 20px;
  }
  .out_btn_box {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
  .out_btn {
    width: 100px;
    font-size: 12px;
    padding: 4px 4px;
    color: #fc9153;
  }
  .cube-btn-outline::after {
    border-color: #fc9153;
  }
</style>