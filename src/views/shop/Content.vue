<template>
    <div class="content">
        <div class="category">
            <div class="category__item " :class="item.tab === activeTab?'category__item--active':''" v-for="(item, index) in categories" :key ="index" @click="onCategoryClick(item.tab)">{{item.name}}</div>
        </div>
        <div class="product">
            <div class="product__item" v-for = "item in contentList" :key=item._id>
                <img class="product__item__img" src="" alt="">
                <div class="product__item__detail">
                    <h4 class="product__item__title">{{item.name}}</h4>
                    <p class="product__item__sales">月售{{item.sales}}件</p>
                    <p class="product__item__price">
                        <span class="product__item__yen">&yen;</span>{{item.price}}
                        <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
                    </p>
                </div>
                <div class="product__number">
                    <span class="product__number__minus">-</span> 0
                    <span class="product__number__plus">+</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { get } from '../../utils/request'
import { reactive, toRefs, ref, watchEffect } from 'vue'

const categories = [{ name: '全部商品', tab: 'all' }, { name: '秒杀', tab: 'seckill' }, { name: '新鲜水果', tab: 'fruit' }]

// 切换tab的操作处理
const useTabEffect = () => {
  const activeTab = ref(categories[0].tab)
  const onCategoryClick = (tab) => {
    activeTab.value = tab
  }
  return { activeTab, onCategoryClick }
}

// content list相关逻辑
const useContentEffect = (activeTab) => {
  const data = reactive({ contentList: [] })
  const getContentData = async (tab) => {
    const result = await get('/api/shop/1/products', { tab: activeTab.value })

    if (result?.errno === 0 && result?.data?.length) {
      data.contentList = result.data
    }
  }

  watchEffect(() => { getContentData() })
  const { contentList } = toRefs(data)
  return { contentList }
}

export default {
  name: 'Content',
  setup () {
    const { activeTab, onCategoryClick } = useTabEffect()
    const { contentList } = useContentEffect(activeTab)

    return { contentList, categories, activeTab, onCategoryClick }
  }
}

</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';
@import '../../style/mixins.scss';

.content{
    display:flex;
    position:absolute;
    left:0;
    right:0;
    top:1.45rem;
    bottom:.5rem;
}
.category{
    overflow-y: scroll;
    width:.76rem;
    height:100%;
    background: $search-bgColor;
    &__item{
        line-height:.4rem;
        text-align: center;
        font-size:14px;
        color:$content-fontcolor;
        &--active{
            background-color: $bgColor;
        }
    }
}
.product{
    overflow-y: scroll;
    flex:1;
    &__item{
        position:relative;
        display: flex;
        padding:.12rem 0;
        margin:0 .16rem;
        border-bottom:.01rem solid $border-bgColor;
        &__img{
            width:.68rem;
            height:.68rem;
            margin-right:.16rem;
        }
        &__detail{
            flex:1;
            overflow: hidden;
        }
        &__title{
            margin:0 0;
            font-size:.14rem;
            line-height: .2rem;
            color:$content-fontcolor;
            @include text-ellipsis;
        }
        &__sales{
            margin:.06rem 0;
            font-size:.12rem;
            line-height: .16rem;
            color:$content-fontcolor;
        }
        &__price{
            margin:0;
            font-size:.14rem;
            line-height: .2rem;
            color:#e93b3b;
        }
        &__yen{
            font-size:.12rem;
        }
        &__origin{
            margin-left:.06rem;
            font-size:.12rem;
            line-height: .2rem;
            color:#999;
            text-decoration: line-through;
        }
    }
    .product__number{
        position:absolute;
        right:0;
        bottom:.12rem;
        &__minus, &__plus{
            display:inline-block;
            width: 0.2rem;
            height: .2rem;
            line-height: .16rem;
            border-radius: 50%;
            border: .01rem solid $medium-fontColor;
            font-size:.2rem;
            text-align: center;
            box-sizing: border-box;
        }
         &__minus{
             margin-right:.05rem;
             border: .01rem solid $medium-fontColor;
             color:$medium-fontColor;
         }
        &__plus{
            margin-left:.05rem;
            background:$btn-bgColor;
            color:$bgColor;
        }
    }
}
</style>
