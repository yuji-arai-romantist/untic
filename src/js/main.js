import { createApp } from "vue/dist/vue.esm-bundler";
import components from "./components";

const App = {
  data() {
    return {
      scrollTop: 0,
    };
  },
  components: components,
  mounted() {
    document.addEventListener("scroll", function () {
      this.scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    });
  },
  watch: {
    scrollTop() {
      const isShadow = this.$refs["header"].classList.contains("is-shadow");

      if (this.scrollTop > 20) {
        !isShadow ? this.$refs["header"].classList.add("is-shadow") : "";
      } else {
        isShadow ? this.$refs["header"].classList.remove("is-shadow") : "";
      }
    },
  },
  methods: {
    onClickMenu(e) {
      const target = e.target;

      target.classList.toggle("is-active");
      this.$refs["overlay-nav"].classList.toggle("is-active");
      document.body.classList.toggle("is-blur");
    },
  },
};

createApp(App).mount("#vue-app");
