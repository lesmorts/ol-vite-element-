<script lang="ts">

import { state } from '../../state/index'
import { shallowRef } from 'vue'
import { toggleDark, isDark } from '../../composables'

export default {
  props: [],
  data() {
    return {
      value1: shallowRef(false),
      proflag: 'EPSG:4326',
      overlayState: 'off',
      state,
      isDark,
      toggleDark,
      isdraw: '',
      opends:['1'],
    }
  },
  watch: {
    value1: 'toggleDark',
    'state.isDrawMessage': {
      handler(val) {
        this.isdraw = val
      },
      deep: true,
    },
  },
  mounted() {
    this.testTheme()
  },
  unmounted() {

  },
  methods: {
    projectionChange(option: string) {
      this.proflag = option
      this.$bus.emit('projectionChange', this.proflag)
    },

    testTheme() {
      if (this.isDark) {
        toggleDark()
      }
    },
    offDraw() {
      state.setDrawMessage('off')
    },
    setWMTSMap(){
      state.setIsMainMap()
      state.setISWMTSMap()
    }

  },

}


</script>

<template>
  <el-menu class="el-menu-demo" mode="horizontal" default-active="opends">
    <el-menu-item index="1">Openplayer-Vite</el-menu-item>
    <el-sub-menu index="2">
      <template #title>OGC资源</template>
      <el-menu-item-group title="加载服务">
        <el-menu-item index="2-1" @click="setWMTSMap();">WMTS案例</el-menu-item>
        <el-menu-item index="2-2" >WMS</el-menu-item>
        <el-menu-item index="2-3" >WFS</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
    <el-switch v-model="isDark" @change="toggleDark" class="mt-1" size="large"
      style="

--el-switch-on-color:#409eff ; --el-switch-off-color: #bcdbff;

top: 13%;" inline-prompt active-text="夜"
      inactive-text="日" />
    <div id="flex-grow"></div>
    <el-menu-item index="3" @click="offDraw()">
      <span>{{ isdraw }}</span></el-menu-item>


    <el-sub-menu index="4">
      <template #title>坐标</template>
      <el-menu-item-group title="Projection">
        <el-menu-item index="4-1" @click="projectionChange('EPSG:3857')">EPSG:3857</el-menu-item>
        <el-menu-item index="4-2" @click="projectionChange('EPSG:4326')">EPSG:4326</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="5">
      <template #title>设置</template>
      <el-menu-item-group title="Setting">
        <el-menu-item index="5-1">隐藏绘图</el-menu-item>
        <el-menu-item index="5-2">隐藏测量</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

  </el-menu>
</template>

<style scoped>
#flex-grow {
  flex-grow: 1;
}

.pro {
  padding: 4px;
}
</style>
