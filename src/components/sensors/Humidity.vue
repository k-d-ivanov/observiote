<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import DefaultSensor from "./DefaultSensor.vue";

const props = defineProps<{
  id: number;
  type: string;
  data: any[];
}>();
const isType = ref("basic");
const dataNow = ref("");
let gaugeFill: HTMLElement | null = null;

function updateGauge(fill: HTMLElement | null) {
  if (!fill) return;
  const converted = parseInt(dataNow.value, 10);
  // (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
  const value = (converted * 0.5) / 100;
  fill.style.transform = `rotate(${value}turn)`;
}

onMounted(() => {
  isType.value = props.type;

  for (let i = 0; i < props.data.length; i += 1) {
    if (props.data[i].sensorId.sensorId === props.id) {
      dataNow.value = props.data[i].sensorData;
      break;
    }
  }
  gaugeFill = document.querySelector<HTMLElement>(".humidity-gauge-fill");
  updateGauge(gaugeFill);
});
watchEffect(() => {
  gaugeFill = document.querySelector<HTMLElement>(".humidity-gauge-fill");
  updateGauge(gaugeFill);
  for (let i = 0; i < props.data.length; i += 1) {
    if (props.data[i].sensorId.sensorId === props.id) {
      dataNow.value = props.data[i].sensorData;
      break;
    }
  }
});
</script>
<template>
  <div v-if="isType === 'basic'" class="humidity-container">
    <default-sensor :id="'basic_' + id" :default-data="dataNow" />
  </div>
  <div v-else class="humidity-container">
    <div class="humidity-gauge-body">
      <div class="humidity-gauge-fill"></div>
      <div class="humidity-gauge-cover">
        <div class="humidity-value">{{ dataNow }}%</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.humidity-container {
  width: 100%;
  max-width: 250px;
  padding: 1em;
}
.humidity-gauge-body {
  width: 100%;
  height: 0;
  padding-bottom: 50%;
  background: #606060;
  position: relative;
  border-top-left-radius: 100% 200%;
  border-top-right-radius: 100% 200%;
  overflow: hidden;
}
.humidity-gauge-cover {
  width: 75%;
  height: 150%;
  background: #353839;
  border-radius: 50%;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  /* Text */
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 25%;
  box-sizing: border-box;
}
.humidity-gauge-fill {
  position: absolute;
  top: 100%;
  left: 0;
  width: inherit;
  height: 100%;
  background: #0266a8;
  transform-origin: center top;
  transform: rotate(0);
  transition: transform 0.2s ease-out;
}
.humidity-value {
  color: rgba(255, 255, 255, 1);
  font-size: 1.2em;
  position: absolute;
  width: auto;
  height: 100%;
  top: 2em;
  margin-left: auto;
  margin-right: auto;
  transition: all 1s ease-out;
}
</style>
