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
.img-view .img-layer {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  order: 1px solid #f00;
  overflow: hidden;
}
.img-view .img img {
  height: 60%;
  display: block;
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1000;
}
</style>
