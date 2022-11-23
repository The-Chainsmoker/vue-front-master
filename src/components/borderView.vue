<template>
  <div class="border">
    <div v-show="show" class="topLeft" :style="{ 'border-top': `${length} ${type} ${color}`, 'border-left': `${length} ${type} ${color}`, 'width': width, 'height': height }">
    </div>
    <div v-show="show" class="topRight" :style="{ 'border-top': `${length} ${type} ${color}`, 'border-right': `${length} ${type} ${color}`, 'width': width, 'height': height }">
    </div>
    <div v-show="show" class="bottomLeft" :style="{ 'border-bottom': `${length} ${type} ${color}`, 'border-left': `${length} ${type} ${color}`, 'width': width, 'height': height }">
    </div>
    <div v-show="show" class="bottomRight" :style="{ 'border-bottom': `${length} ${type} ${color}`, 'border-right': `${length} ${type} ${color}`, 'width': width, 'height': height }">
    </div>
  </div>
</template>

<script>
import { color } from 'echarts';

export default {
  name: 'border',
  props: {
    show: {
      value: Boolean,
      default: true
    },
    color: {
      value: String,
      default: 'rgba(255,255,255,0.7)'
    },
    //宽度
    length: {
      value: String,
      default: '1px',
    },
    //边框类型
    type: {
      value: String,
      default: 'solid',
    },
    width: {
      value: String,
      default: '10px',
    },
    height: {
      value: String,
      default: '10px',
    },
  }
}
</script>

<style lang="scss" scoped>
.border {
  pointer-events: none; //内层穿透
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 2px solid rgba($color: #fff, $alpha: 0.2);

  // border-top: 2px solid #ccc;
  // border-left: 2px solid #ccc;
  // border-right: 2px solid #ccc;
  // border-bottom: 2px solid #ccc;
  .topLeft {
    position: absolute;
    top: -2px;
    left: -2px;
  }

  .topRight {
    position: absolute;
    top: -2px;
    right: -2px;
  }

  .bottomLeft {
    position: absolute;
    bottom: -2px;
    left: -2px;
  }

  .bottomRight {
    position: absolute;
    bottom: -2px;
    right: -2px;
  }
}
</style>