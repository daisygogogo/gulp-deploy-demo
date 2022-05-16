<template>
<div class="wrapper">
    <img src="https://img.zcool.cn/community/0158db5983dd90a8012156036d7f59.jpg@1280w_1l_2o_100sh.jpg" alt="" class="wrapper__img">
    <div class="wrapper__input">
      <input type="text" placeholder="请输入手机号" v-model="mobile">
    </div>
    <div class="wrapper__input">
      <input type="text" placeholder="请输入密码"  v-model="password">
    </div>
    <div class="wrapper__input">
      <input type="text" placeholder="请确认密码"  v-model="ensurement">
    </div>
    <div class="wrapper__login-button" @click="handleRegister">注册</div>
    <div class="wrapper__login-link" @click="handleLogin">已有账号去登陆</div>
    <Toast v-if="toastData.showToast" :message="toastData.message"></Toast>
</div>

</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, toRefs } from 'vue'
import { post } from '../../utils/request'
import Toast, { useToastEffect } from '../../components/Toast.vue'

const useRegisterEffect = (showToast) => {
  const router = useRouter()
  const data = reactive({
    mobile: '',
    password: '',
    ensurement: ''
  })

  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.mobile,
        password: data.password,
        ensurement: data.ensurement
      })

      if (result?.errno === 0) {
        router.push({ name: 'Login' })
      } else {
        showToast('注册失败')
      }
    } catch (e) {
      showToast('请求失败')
    }
  }

  const { mobile, password, ensurement } = toRefs(data)
  return { mobile, password, ensurement, handleRegister }
}

export default {
  name: 'Register',
  components: { Toast },
  setup () {
    const router = useRouter()

    const { toastData, showToast } = useToastEffect()
    const { mobile, password, ensurement, handleRegister } = useRegisterEffect(showToast)

    const handleLogin = () => {
      router.push({ name: 'Login' })
    }

    return { handleRegister, handleLogin, mobile, password, ensurement, toastData }
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
