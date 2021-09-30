<template>
  <div
    class="col-6 col-sm-4 col-lg-3 col-xl-2 text-center mb-3"
    @click="selected = true"
  >
    <div class="mb-1">
      <img
        :src="tool.icon"
        class="icon-tool-jb img-thumbnail"
        :alt="tool.name"
      />
    </div>

    <h6>{{ tool.name }}</h6>

    <div class="small text-secondary">Jailbreak iOS {{ tool.support }}</div>
  </div>

  <teleport to="body">
    <transition name="slide-top">
      <div
        class="fixed-top w-100 text-light sidenav px-3"
        data-fixed
        v-if="selected"
      >
        <transition name="slide-left" mode="out-in">
          <div v-if="installed === false">
            <div class="d-flex justify-content-end">
              <button
                class="close my-1 text-light"
                style="font-size: 2em"
                @click="selected = false"
              >
                &times;
              </button>
            </div>

            <div class="d-flex">
              <img class="img-thumbnail icon icon-tool-jb" :src="tool.icon" />
              <div class="pl-3">
                <h5 class="h5 mb-0">
                  {{ tool.name }}
                  <small>({{ tool.version }})</small>
                </h5>

                <div class="authors text-small">
                  <a
                    v-for="author in tool.author"
                    :key="author.name"
                    :href="`https://twitter.com/${author.twitter}`"
                    target="_blank"
                    >{{ author.name }}</a
                  >
                </div>
              </div>
            </div>

            <div class="my-2">
              Jailbreak hỗ trợ iOS {{ tool.support }}

              <div
                class="mt-3 py-2 px-2 bg-success text-center"
                :class="[`bg-${isSupport ? 'success' : 'danger'}`]"
              >
                Phiên bản iOS được {{ isSupport ? "hỗ trợ" : "được hỗ trợ" }}
              </div>

              <div class="small mt-1 text-center">iOS thiết bị: {{ iOS }}</div>
            </div>

            <div class="my-3">
              Resource:
              <a :href="tool.website" target="_blank" v-if="tool.website">
                Website
              </a>
              <template v-if="tool.github">
                &bull;
                <a :href="tool.github" target="_blank"> Source Code </a>
              </template>
              <template v-if="tool.ipa">
                &bull;
                <a :href="tool.ipa" target="_blank">iPA </a>
              </template>
            </div>

            <ul class="list-group">
              <li
                class="
                  list-group-item
                  bg-transparent
                  border
                  text-light
                  download
                "
                style="cursor: pointer"
                v-for="(item, index) in tool.links"
                :key="index"
                @click="download(item)"
              >
                Liên kết {{ index + 1 }}
              </li>
            </ul>
          </div>

          <div class="row" v-else>
            <div class="col-12">
              <button
                class="close my-1 text-light"
                style="font-size: 2em"
                @click="installed = false"
              >
                &times;
              </button>
            </div>
            <div class="col-12 col-sm-6 text-center">
              <img class="img-fluid" src="../assets/install.jpg" />
            </div>
            <div class="col-12 col-sm-6 text-center text-p mt-3">
              <span>
                Nhấn vào <b>Cài đặt</b> khi cửa sổ bật lên và chờ đợi Ứng dụng
                tải về màn hình chính. Có thể sẽ hơi lâu!
              </span>
              <span>
                Sau khi tải về hoàn thành, bạn chỉ cần mở
                <b>Cài đặt ▸ Cài đặt chung ▸ Quản lý thiết bị</b> và
                <b>Tin cậy</b> cấu hình mới.
              </span>

              <span>
                Thêm
                <a href="https://tachibana-shin.github.io/repo" target="_blank">
                  kho lưu trữ của shin-chan
                </a>
                vào Cydia của bạn và liên hệ
                <a
                  href="https://www.facebook.com/profile.php?id=100024588752208"
                  target="_blank"
                >
                  Nguyễn Thành
                </a>
                khi bạn cần được hỗ trợ!
              </span>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts" setup>
import type { configure } from "../data/schema";
import { ref, watch, computed } from "vue";
import { satisfies } from "semver";

const props = defineProps<{
  tool: ReturnType<typeof configure> extends Promise<infer R> ? R : unknown;
}>();

const selected = ref<boolean>(false);
const iOS = computed<string>(() => {
  const os = navigator.userAgent.match(/OS ([\d\._]*)/);

  if (!os) return "unknown";

  return os[1].replace(/_/g, ".");
});
const isSupport = computed<boolean>(() => {
  return iOS.value !== "unknown" && satisfies(iOS.value, props.tool.support);
});
const installed = ref<boolean>(false);
watch(selected, () => void (installed.value = false));

watch(
  selected,
  (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  },
  {
    immediate: true,
  }
);

function download(url: string): void {
  window.open(
    "itms-services://?action=download-manifest&amp;url=" + url,
    "_self"
  );
  installed.value = true;
}
</script>

<style lang="scss" scoped>
.icon-tool-jb {
  width: 5em;
  height: 5em;
  border-radius: 20px !important;
}

.text-p span {
  display: block;
  margin-bottom: 1rem;
}
.text-p a {
  color: var(--primary) !important;
}

.bg-color-green {
  background-color: #4cd964 !important;
}
.bg-color-blue {
  background-color: #34aadc !important;
}

.sidenav {
  background-color: #1d1d27;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch !important;
  -webkit-overflow-style: -webkit-autohiding-scrollbar !important;
  bottom: 0;
  top: 0;
}
.h-0 {
  height: 0 !important;
}
.text-middle {
  vertical-align: middle;
  line-height: 2.5em;
}

.download:before {
  content: "";
  position: absolute;
  top: 50%;
  right: 0;
  width: 1em;
  height: 1em;
  color: #fff;
  -webkit-transform: translate(-150%, -50%);
  -ms-transform: translate(-150%, -50%);
  transform: translate(-150%, -50%);
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 16.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='512px' height='512px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve' fill='%23fff' %3E%3Cg%3E%3Cpath d='M446.844,208.875C447.625,203.313,448,197.656,448,192c0-70.563-57.406-128-128-128 c-40.938,0-78.531,19.344-102.344,51.063C209.25,113.031,200.688,112,192,112c-61.75,0-112,50.25-112,112 c0,1.563,0.031,3.094,0.094,4.625C33.813,242.375,0,285.313,0,336c0,61.75,50.25,112,112,112h272c70.594,0,128-57.406,128-128 C512,273.344,486.344,231.188,446.844,208.875z M384,416H112c-44.188,0-80-35.813-80-80s35.813-80,80-80 c2.438,0,4.75,0.5,7.125,0.719c-4.5-10-7.125-21.031-7.125-32.719c0-44.188,35.813-80,80-80c14.438,0,27.813,4.125,39.5,10.813 C246,120.25,280.156,96,320,96c53.031,0,96,42.969,96,96c0,12.625-2.594,24.625-7.031,35.688C449.813,238.75,480,275.688,480,320 C480,373.031,437.031,416,384,416z'/%3E%3Cpolygon points='288,192 224,192 224,288 160,288 256,384 352,288 288,288 '/%3E%3C/g%3E%3C/svg%3E%0A");
}

.title {
  text-align: center;
  padding: 1rem;
  background-image: -webkit-gradient(
    linear,
    right top,
    left top,
    from(#1e5799),
    color-stop(#2ce0bf),
    color-stop(#76dd2c),
    color-stop(#dba62b),
    color-stop(#ff1493),
    to(#1e5799)
  );
  background-image: -o-linear-gradient(
    right,
    #1e5799,
    #2ce0bf,
    #76dd2c,
    #dba62b,
    #ff1493,
    #1e5799
  );
  background-image: linear-gradient(
    270deg,
    #1e5799,
    #2ce0bf,
    #76dd2c,
    #dba62b,
    #ff1493,
    #1e5799
  );
  background-size: 100% 100%;
  background-clip: text;
  -webkit-background-clip: text;
  color: #00000000;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.25);
}
</style>

<style lang="scss">
.slide-top {
  &-enter-active,
  &-leave-active {
    transition: transform 0.5s ease-in-out;
  }
  &-enter-from,
  &-leave-to {
    transform: translateY(100%);
  }
}
.slide-left {
  &-enter-active,
  &-leave-active {
    transition: transform 0.3s ease-in-out;
  }
  &-enter-from,
  &-leave-to {
    transform: translateX(-100%);
  }
}
</style>
