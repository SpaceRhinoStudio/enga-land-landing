<script lang="ts">
  import { decode } from 'blurhash'
  import cn from 'classnames'
  import _, { isString } from 'lodash'
  import { createEventDispatcher } from 'svelte'
  import Waypoint from 'svelte-waypoint'
  import { fade } from 'svelte/transition'

  export let alt = ''
  export let id: string | undefined = undefined
  export let width: number | undefined = undefined
  export let height: number | undefined = undefined
  export let src = ''
  export let srcset = ''
  export let srcsetWebp = ''
  export let ratio = '100%'
  export let noBlur = false
  // export let sizes = '(max-width: 1000px) 100vw, 1000px'
  export let sizes: string | undefined = undefined
  export let offset = 0
  export let threshold = 0.9
  export let noLazy = false
  export let blurhash: string | undefined = undefined
  export let blurhashSize: { width: number; height: number } | undefined = undefined
  export let cover = false

  export let style = ''
  let className: { [key in 'img' | 'container' | 'placeholder']?: string } | string = {}
  export { className as class }

  let loaded = false

  function decodeBlurhash(canvas: HTMLCanvasElement) {
    if (blurhash && blurhashSize) {
      const pixels = decode(blurhash, blurhashSize.width, blurhashSize.height)
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const imageData = ctx.createImageData(blurhashSize.width, blurhashSize.height)
        imageData.data.set(pixels)
        ctx.putImageData(imageData, 0, 0)
      }
    }
  }

  let ref: HTMLImageElement

  const dispatch = createEventDispatcher<{
    load: Event & {
      currentTarget: EventTarget & HTMLElement
    }
    error: Event & {
      currentTarget: EventTarget & HTMLElement
    }
    loadstart: {
      currentTarget: EventTarget & HTMLElement
    }
    leave: {
      currentTarget: EventTarget & HTMLElement
    }
  }>()
</script>

<!-- style="min-height: 100px; width: 100%;" -->
<Waypoint
  class={_.isString(className) ? className : className.container ?? 'w-full h-full'}
  {style}
  once
  {threshold}
  {offset}
  disabled={noLazy}
  on:enter={() => dispatch('loadstart', { currentTarget: ref })}
  on:leave={() => dispatch('leave', { currentTarget: ref })}>
  <div class:loaded class={cn('relative w-full h-full')}>
    <div class={cn('relative overflow-hidden h-full')}>
      <!-- <div class="w-full" style="padding-bottom:{ratio};" /> -->
      {#if !loaded}
        {#if blurhash}
          <canvas
            transition:fade={{ duration: 1200, delay: 400 }}
            class="w-full h-full"
            use:decodeBlurhash
            width={blurhashSize?.width}
            height={blurhashSize?.height} />
        {:else}
          <img
            transition:fade={{ duration: 1200, delay: 400 }}
            class={cn(
              'w-full h-full',
              !_.isString(className) && className.placeholder,
              !noBlur && 'blur',
            )}
            {src}
            {alt} />
        {/if}
      {/if}
      <picture>
        <source type="image/webp" srcset={srcsetWebp} {sizes} />
        <source {srcset} {sizes} />
        <img
          on:load={e => {
            loaded = true
            dispatch('load', e)
          }}
          on:error={e => {
            loaded = false
            dispatch('error', e)
          }}
          bind:this={ref}
          {id}
          {src}
          class={cn(
            'main select-none h-full',
            !_.isString(className) && className.img,
            cover ? 'object-cover' : 'object-contain',
          )}
          {alt}
          {width}
          {height} />
      </picture>
    </div>
  </div>
</Waypoint>

<style>
  img,
  canvas {
    object-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .blur {
    filter: blur(15px);
  }

  img.main {
    position: static;
    opacity: 0;
    will-change: opacity;
    transition: opacity 1200ms ease-out;
    transition-delay: 0.4s;
  }

  .loaded .main {
    opacity: 1;
  }
</style>
