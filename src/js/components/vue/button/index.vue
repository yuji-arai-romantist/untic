<template>
  <div class="vc-button">
    <button @click="handleClick">
      {{ label }}
    </button>
  </div>
</template>

<script>
export default {
  name: "vc-button",
  data() {
    return {
      count: 0,
    };
  },
  props: {
    label: {
      type: String,
      default: "",
    },
  },
  methods: {
    handleClick() {
      alert(this.count++);
    },
  },
};
</script>

<style lang="scss" scoped>
@use "style";
</style>
