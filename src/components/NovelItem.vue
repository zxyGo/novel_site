<template>
  <div class="novel_box" :key="item.index" @click="goChapter(item.novel_id,item.name)">
    <img class="novel_cover" :src="item.image" alt="">
    <div class="info">
      <h4 class="title" v-text="item.name"></h4>
      <p class="intro" v-text="item.intro"></p>
      <div class="classify">
        <span class="author">
          <em class="icon">
            <svg id="icon-human" viewBox="0 0 10 12" width="100%" height="100%">
              <path d="M6.375 6.683C7.053 5.873 7.5 4.649 7.5 3.6 7.5 2.023 6.462 1 5 1S2.5 2.023 2.5 3.6c0 1.05.447 2.274 1.125 3.083a1 1 0 0 1-.463 1.595C1.79 8.715 1 9.537 1 10.5c0-.106-.036-.165-.012-.147.136.1.39.21.743.308C2.52 10.88 3.675 11 5 11c1.325 0 2.48-.12 3.27-.339.352-.097.606-.208.742-.308.024-.018-.012.04-.012.147 0-.963-.789-1.785-2.162-2.222a1 1 0 0 1-.463-1.595zm1.18.071a5.23 5.23 0 0 1-.414.571c.226.072.444.155.653.25l.306.15C9.222 8.32 10 9.268 10 10.5c0 1-2.239 1.5-5 1.5s-5-.5-5-1.5c0-1.232.778-2.179 1.9-2.775l.306-.15c-.306.15.427-.178.653-.25a5.23 5.23 0 0 1-.414-.57l-.17-.287C1.79 5.59 1.5 4.55 1.5 3.6 1.5 1.39 3.067 0 5 0s3.5 1.39 3.5 3.6c0 .951-.29 1.991-.775 2.868l-.17.286z">
              </path>
            </svg>
          </em>
          <em class="author_name" v-text="item.author"></em>
        </span>
        <span class="_type">
          <em v-text="item.type"></em>
          <em v-text="item.word_count"></em>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['item'],
    data() {
      return {}
    },
    methods: {
      goChapter: function (id, name) {
        this.$emit('chapter', {id: id, name: name});
      }
    }
  }
</script>
<style lang="less" scoped>
  .novel_box {
    display: flex;
    justify-content: space-between;
    padding: 20px 0px;
    border-bottom: 0.02rem solid #f0f1f2;
  }

  .novel_cover {
    height: 100px;
    margin-right: 15px;
    width: 20%;
  }

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
  }

  .title {
    line-height: 1.4;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
    font-size: 16px;
  }

  .intro {
    height: 38px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    text-overflow: ellipsis;
    font-size: 14px;
    line-height: 20px;
    color: #969ba3;
    margin: 8px 0 10px 0;
  }

  .author {
    color: #969ba3;
    display: inline-flex;
    align-items: center;
    align-content: center;
    font-size: 13px;
  }

  .author_name {
    width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: left;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    margin-right: 4px;
  }

  #icon-human {
    width: 12px;
    height: 12px;
    fill: currentColor;
  }

  .classify {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  ._type {
    font-size: 10px;

    em {
      padding: 0 4px;
    }
    em:first-child {
      color: #ed424b;
      border: 1px solid rgba(237, 66, 75, 0.5);
      margin-right: 5px;
    }
    em:last-child {
      color: #4284ed;
      border: 1px solid rgba(66, 132, 237, 0.5);
    }
  }

  .popup {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7)
  }

  .word {
    width: 100px;
    background: #ed424b;
    font-size: 16px;
    color: #fff;
    font-weight: 700;
    padding: 5px;
    border-radius: 8px;
  }

  .tab {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    background: #fff;
    border-top: 1px solid #969ba3;
    transition: all 0.5s;
    span {
      flex: 1;
      height: 40px;
      line-height: 40px;
    }
    span:first-child {
      border-right: 1px solid #969ba3;
    }

  }
  em {
    font-style: normal;
  }
</style>