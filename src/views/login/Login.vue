<template>
<div class="wrapper">
    <img src="https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg" alt="" class="wrapper__img">
    <div class="wrapper__input">
      <input type="text" placeholder="请输入手机号" v-model="mobile">
    </div>
    <div class="wrapper__input">
      <input type="text" placeholder="请输入密码" v-model="password">
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登陆</div>
    <div class="wrapper__login-link">立即注册</div>
</div>
<Toast v-if="toastData.showToast" :message="toastData.message"></Toast>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useLoginEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    mobile: '',
    password: ''
  })

  const handleLogin = async () => {
    try {
      const result = await post('/api/user/login', {
        username: data.mobile,
        password: data.password
      })

      if (result?.errno === 0) {
        localStorage.isLogin = true
        router.push({ name: 'Home' })
      } else {
        showToast('登录失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }
  const { mobile, password } = toRefs(data)

  return { mobile, password, handleLogin }
}

export default {
  name: 'Login',
  components: { Toast },
  setup () {
    const { toastData, showToast } = useToastEffect()
    const { mobile, password, handleLogin } = useLoginEffect(showToast)
    return { handleLogin, mobile, password, toastData }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';

.wrapper{
  position:absolute;
  top:50%;
  left:0;
  right:0;
  transform: translateY(-50%);
  &__img{
    display:block;
    margin: 0 auto .4rem auto;
    width:.66rem;
    height:.66rem;
    border-radius: 50%;
  }
  &__input{
    box-sizing: border-box;
    margin: 0 .4rem .16rem .4rem;
    padding:0 .16rem;
    height:.48rem;
    background: #F9F9F9;
    border: 1px solid rgba(0,0,0,0.10);
    border-radius: 6px;
    font-size:.16rem;
    input{
      border:none;
      outline: none;
      background: none;
      line-height:.48rem;
      width:100%;
      color:$third-fontColor;
      &::placeholder{
        background: none;
        color:$third-fontColor;
      }
    }
  }
  &__login-button{
    line-height: .48rem;
    margin:.32rem .4rem .16rem .4rem;
    background: $btn-bgColor;
    box-shadow: 0 4px 8px 0 rgba(0,145,255,0.32);
    border-radius: 4px;
    color:$bgColor;
    text-align: center;
    font-size:.16rem;
  }
  &__login-link{
    text-align: center;
    color:$third-fontColor;
    font-size: .14rem;
  }
}

</style>
