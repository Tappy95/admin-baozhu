<template>
  <transition name="fade">
    <div class="img-view"
      @click="bigImg">
      <div class="img-layer"></div>
      <div class="img">
        <img :src="imgSrc">
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ['imgSrc'],
  methods: {
    bigImg() {
      this.$emit('clickit')
    }
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s linear;
  transform: translate3D(0, 0, 0);
}

.fade-enter,
.fade-leave-active {
  transform: translate3D(100%, 0, 0);
}


.img-view{
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-content: center;

  align-items: center;
}
.img-view .img-layer {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.img-view .img img {
  max-width:100%;
  position: relative;
  z-index: 1000;
}
</style>
