<script setup>
import { ref,reactive } from 'vue'
const baseUrl = ref(import.meta.env.BASE_URL)
const form = reactive({
  name: '1',
  region: '2',
  date1: '3',
  date2: '4',
  delivery: false,
  type: [],
  resource: '5',
  desc: '6',
})

const onSubmit = () => {
  console.log('submit!')
}
</script>

<template>
  <div>
    <h1>测试界面</h1>
    <el-button type="primary">element plus theme</el-button>
    <h1 class="text-3xl font-bold underline">tailwind css</h1>
    <el-button type="primary" class="text-cyan-400 bg-black">element plus theme+tailwind</el-button>
    <h1>import.meta.env.BASE_URL：{{ baseUrl }}</h1>
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="Activity name">
        <el-input class="text-blue-500" v-model="form.name" />
      </el-form-item>
      <el-form-item class="bg-blue-600" label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="Activity time">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="Pick a date"
            style="width: 100%"
          />
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500">-</span>
        </el-col>
        <el-col :span="11">
          <el-time-picker
            v-model="form.date2"
            placeholder="Pick a time"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item label="Activity type">
        <el-checkbox-group v-model="form.type">
          <el-checkbox value="Online activities" name="type">
            Online activities
          </el-checkbox>
          <el-checkbox value="Promotion activities" name="type">
            Promotion activities
          </el-checkbox>
          <el-checkbox value="Offline activities" name="type">
            Offline activities
          </el-checkbox>
          <el-checkbox value="Simple brand exposure" name="type">
            Simple brand exposure
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="Resources">
        <el-radio-group v-model="form.resource">
          <el-radio value="Sponsor">Sponsor</el-radio>
          <el-radio value="Venue">Venue</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
