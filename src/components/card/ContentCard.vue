<template>
  <article ref="card" class="card">
    <div class="card-content_wrapper">
      <slot />
    </div>
  </article>
</template>
<style lang="scss">
.card {
  display: flex;
  border-bottom: 1px solid $primary-border-color;
  padding: 2rem;
  transform-origin: top center;
  transition: all 0.5s cubic-bezier(0.37, 0.33, 0.1, 1);

  &-content {
    &_wrapper {
      position: relative;
      height: 100%;
      display: grid;
      align-items: center;
    }
  }
}
</style>
