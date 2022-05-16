<template>
   <div class="docker">
    <div class="docker__item docker__item--active" v-for="(item, index) in dockerList" :key=index>
      <i class="iconfont" :class="item.icon"></i>
      <div class="docker__title">{{item.text}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  setup () {
    const dockerList = [
      { icon: 'icon-home', text: '首页' },
      { icon: 'icon-cart', text: '购物车' },
      { icon: 'icon-order', text: '订单' },
      { icon: 'icon-My', text: '我的' }
    ]
    return { dockerList }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/variable.scss';
.docker{
  position:absolute;
  left:0;
  bottom:0;
  width:100%;
  display:flex;
  box-sizing: border-box;
  padding: 0 .18rem;
  height: .49rem;
  border-top: .01rem solid $border-bgColor;
  color:$content-fontcolor;
  &__item{
    flex:1;
    text-align: center;
    margin-top:.07rem;
    .iconfont{
      font-size:.18rem;
    }
    &--active{
      color:#1FA4FC;
    }
  }
  &__title{
    font-size:.2rem;
    transform: scale(.5,.5);
    transform-origin: center center;
  }
}
</style>
