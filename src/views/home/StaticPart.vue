<template>
     <div class="position">
    <i class="iconfont icon-position"></i>
    北京理工大学国防科技园2号楼10层
    <i class="iconfont icon-bell"></i>
  </div>
  <div class="search">
    <i class="iconfont icon-search"/>
    <input type="text" placeholder="山姆会员商店优惠商品">
  </div>
  <div class="banner">
    <img src="https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg" alt="" class="banner__img">
  </div>
  <div class="icons">
    <div class="icons__item" v-for="(item, index) in iconsList" :key="index">
      <img class="icons__item__img" :src="item.imgUrl" alt="">
      <p class="icons__item__desc">{{item.desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = [{
      imgUrl: 'https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg',
      desc: '超市便利'
    }, {
      imgUrl: 'https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg',
      desc: '超市便利'
    }, {
      imgUrl: 'https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg',
      desc: '超市便利'
    }, {
      imgUrl: 'https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg',
      desc: '超市便利'
    }, {
      imgUrl: 'https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg',
      desc: '超市便利'
    }, {
      imgUrl: 'https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg',
      desc: '超市便利'
    }, {
      imgUrl: 'https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg',
      desc: '超市便利'
    }, {
      imgUrl: 'https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg',
      desc: '超市便利'
    }, {
      imgUrl: 'https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg',
      desc: '超市便利'
    }, {
      imgUrl: 'https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg',
      desc: '超市便利'
    }]
    return { iconsList }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';
  .position{
    padding:.16rem .24rem .16rem 0;
    font-size:.16rem;
    color:$content-fontcolor;
    @include text-ellipsis;
    .iconfont{
      font-size: .2rem;
      &.icon-position{
        position:relative;
        top:.01rem;
      }
      &.icon-bell{
        position: absolute;
        right: .18rem;
        top: .17rem;
      }
    }
  }
  .search{
    margin-bottom:.12rem;
    line-height:.32rem;
    background-color: #F5F5F5;
    border-radius: 0.16rem;
    .iconfont{
      padding:0 .08rem 0 .16rem;
      font-size:.16rem;
      color:#B7B7B7;
    }
    input{
      width: calc(100% - 0.6rem);
      background-color: #f5f5f5;
      font-size:.14rem;
      outline:none;
      border: none;
    }
  }
  .banner{
    overflow: hidden;
    height:21%;
    &__img{
      width:100%;
    }
  }
  .icons{
    display:flex;
    flex-wrap: wrap;
    margin-top:.16rem;
    &__item{
      width:20%;
      &__img{
        display: block;
        width:.4rem;
        height:.4rem;
        margin:0 auto;
        border-radius: 50%;
      }
      &__desc{
        margin:.07rem 0 .16rem;
        text-align: center;
        color:$content-fontcolor;
      }
    }
  }
</style>
