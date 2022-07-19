<script lang="ts">
  let className = ''
  export { className as class }
</script>

<div
  class="text-yellow-400 text-3xl sm:text-3xl lg:text-4xl font-serif font-semibold text-center scale-y-125 tracking-wide {className}">
  <slot />
</div>
