<template>
  <div class="wrapper">
       <div class="search">
           <div class="search__back" @click="routerBack">
               <i class="iconfont icon-back"></i>
           </div>
           <div class="search__content">
               <i class="iconfont icon-search"/>
               <input type="text" placeholder="请输入商品名称搜索" />
           </div>
       </div>
       <shop-item :shop-item="data.item" :hide-border="true" />
       <Content></Content>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router'
import { get } from '../../utils/request'
import { reactive } from 'vue'
import ShopItem from '../../components/ShopItem'
import Content from './Content.vue'

// 获取shopItem数据
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ item: {} })
  const fetchItemData = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.item = result.data
    }
  }
  return { data, fetchItemData }
}

// 点击后退逻辑
const useRouterBackClick = () => {
  const router = useRouter()
  const routerBack = () => {
    router.back()
  }
  return routerBack
}

export default {
  name: 'Shop',
  components: { ShopItem, Content },
  setup () {
    const { data, fetchItemData } = useShopInfoEffect()
    const routerBack = useRouterBackClick()
    fetchItemData()
    return { data, routerBack }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
.wrapper{
    padding: 0 .18rem;
}
.search{
    display:flex;
    margin:.2rem 0 .16rem;
    line-height:.32rem;
    &__back{
        box-sizing: border-box;
        height:.32rem;
        width:.3rem;
        color:#b6b6b6;
    }
    &__content{
        display:flex;
        flex:1;
        background-color: $search-bgColor;
        border-radius: .16rem;
        .icon-search{
            width:.44rem;
            text-align: center;
            color: #b7b7b7;
        }
        input{
            width:100%;
            padding-right:.2rem;
            outline: none;
            border:none;
            background:none;
            color:$content-fontcolor;
            font-size: 14px;
            &::placeholder{
                color:$content-fontcolor;
            }
        }
    }
}

</style>
