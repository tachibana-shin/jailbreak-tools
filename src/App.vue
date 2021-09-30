<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col-12">
        <small class="text-secondary"
          >Website tổng hợp các liên kết cài đặt trực tiếp các công cụ
          jailbreak. Bạn có thể thêm repo
          <a href="https://tachibana-shin.github.io/repo">shin</a> để nhận
          các tweak free.</small
        >
      </div>
    </div>
    <!-- //container (1) > row(1) -->

    <div class="row mb-3">
      <div class="col-12">
        <input class="form-control" placeholder="Tìm kiếm" v-model="keyword" />
      </div>
    </div>

    <div class="row">
      <ToolItem
        v-for="tool in tools.filter(({ name }) => name.includes(keyword))"
        :tool="tool"
        :key="tool.name"
      />
    </div>

    <div class="text-center small text-secondary">
      &copy; Copyright Nguyen Thanh ({{ new Date().getFullYear() }})
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { configure } from "./data/schema";
import ToolItem from "./components/ToolItem.vue";

const tools = reactive<
  (ReturnType<typeof configure> extends Promise<infer R> ? R : unknown)[]
>([]);
const keyword = ref<string>("");

void load();
async function load() {
  const raw = import.meta.globEager("./data/tools/*.ts");

  for (const tool in raw) {
    tools.push(await raw[tool].default);
  }
}
</script>

<style lang="scss">
@import "bootstrap/scss/bootstrap-reboot.scss";
@import "bootstrap/scss/bootstrap-grid.scss";
@import "bootstrap/scss/utilities";
@import "bootstrap/scss/type";
@import "bootstrap/scss/forms";
@import "bootstrap/scss/list-group";
@import "bootstrap/scss/close";
</style>
