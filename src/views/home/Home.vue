<template>
<div class="wrapper">
  <StaticPart></StaticPart>
  <div class="gap"></div>
  <Nearby></Nearby>
</div>
<docker></docker>
</template>

<script>
import Docker from './Docker.vue'
import Nearby from './Nearby.vue'
import StaticPart from './StaticPart.vue'

export default {
  name: 'Home',
  components: { Docker, Nearby, StaticPart }
}
</script>

<style lang="scss" scoped>
@import '../../style/variable.scss';

.wrapper{
  position:absolute;
  left:0;
  top:0;
  right:0;
  bottom:0.5rem;
  padding:0 .18rem .1rem .18rem;
  overflow-y: auto;
  .gap{
    height:.1rem;
    background-color: $border-bgColor;
    margin:0 -.18rem;
  }
}

</style>
