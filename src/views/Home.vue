<template>
  <div class="home-box">
    <cube-tab-bar v-model="selectedLabel" show-slider class="tab_bar">
      <cube-tab v-for="(item) in tabs" :icon="item.icon" :label="item.label" :key="item.label">
      </cube-tab>
    </cube-tab-bar>
    <cube-tab-panels v-model="selectedLabel">
      <cube-tab-panel v-for="(item) in tabs" :label="item.label" :key="item.label">
        <AllPage v-if="item.label === 'Home'"></AllPage>
        <MyPage v-if="item.label === 'Me'"></MyPage>
      </cube-tab-panel>
    </cube-tab-panels>
  </div>
</template>

<script>
  import AllPage from '../components/AllPage.vue'
  import MyPage from '../components/MyPage.vue'

export default {
  name: 'home',
  data () {
    return {
      selectedLabel: 'Home',
      tabs: [{
        label: 'Home',
        icon: 'cubeic-home'
      }, {
        label: 'Me',
        icon: 'cubeic-person'
      }]
    }
  },
  methods: {

  },
  components: {
    AllPage,
    MyPage
  }
}
</script>
<style scoped lang="less">
  .tab_bar {
    .cube-tab{
      font-size: 14px;
    }
  }
</style>