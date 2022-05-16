<template>
      <div class="shop_item">
      <img :src="shopItem.imgUrl" alt="" class="shop_item__img">
      <div class="shop_content" :class="hideBorder?'':'shop_content--bordered'" >
        <div class="shop_content__title">{{shopItem.name}}</div>
        <div class="shop_content__tags">
          <span class="shop_content__tag">月售：{{shopItem.sales}}</span>
          <span class="shop_content__tag">起送：{{shopItem.expressLimit}}</span>
          <span class="shop_content__tag">基础运费：{{shopItem.expressPrice}}</span>
        </div>
        <div class="shop_content__highlight">{{shopItem.slogan}}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ShopItem',
  props: ['shopItem', 'hideBorder']
}
</script>

<style lang="scss" scoped>
@import '../style/variable.scss';
    .shop_item{
      display:flex;
      &__img{
        width:.56rem;
        height:.56rem;
      }
    }
    .shop_content{
      flex:1;
      margin-left:.16rem;
      padding-bottom:.12rem;
      &--bordered{
        border-bottom:.01rem solid $border-bgColor;
      }
      &__title{
        font-size:.16rem;
        color:$content-fontcolor;
      }
      &__tags{
        margin-top:.08rem;
        font-size:.13rem;
        color:$content-fontcolor;
      }
      &__tag{
        margin-right:.13rem;
      }
      &__highlight{
        margin-top:.08rem;
        font-size:.13rem;
        color:#E93B3B;
      }
    }

</style>
