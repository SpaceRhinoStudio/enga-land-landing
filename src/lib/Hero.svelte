<script lang="ts">
  import { __$ } from '$lib/shared/locales'
  import cn from 'classnames'
  import _ from 'lodash'
  import FollowMouse from '$lib/shared/FollowMouse.svelte'
  import { screen$ } from '$lib/shared/helpers/media-queries'
  import { pageLoadingJobs$ } from '$lib/shared/contexts/loading-jobs'
  import { onMount, tick } from 'svelte'
  import { dev } from '$app/env'
  import Parallax from './Parallax.svelte'

  const scrollThereshold = 10

  let scrollY: number
  $: disableParallax = (scrollY ?? 0) >= scrollThereshold

  let loadingImages = [
    'enga',
    'meteor',
    'planet1',
    'planet2',
    'planet3',
    'bg',
    'bg-reverse',
    'ground',
    'left-rock-left',
    'left-rock-right',
    'right-rock-right',
    'right-rock-left',
    'ground-reflection',
    'left-rock-right-reflection',
    'left-rock-left-reflection',
    'right-rock-right-reflection',
  ]
  let resolve: () => void

  onMount(() => {
    if (!dev) {
      pageLoadingJobs$.next(
        new Promise<void>(_resolve => {
          resolve = _resolve
        }),
      )
    }
  })

  function resolveLoadingImage(
    e: Event & {
      currentTarget: EventTarget & HTMLElement
    },
  ) {
    loadingImages = loadingImages.filter(x => x !== e.currentTarget.id)
  }

  function rejectLoadingImage(
    e: Event & {
      currentTarget: EventTarget & HTMLElement
    },
  ) {
    loadingImages = loadingImages.filter(x => x !== e.currentTarget.id)
  }

  $: loadingImages.length === 0 && resolve?.()
</script>

<svelte:window bind:scrollY />

<FollowMouse>
  <div class="blur-md h-4 w-4 bg-[#00ff84] shadow-[0px_0px_3rem_1rem_#00ff8440] rounded-full" />
</FollowMouse>

<Parallax disabled={disableParallax} let:transform let:x let:y>
  <div class="relative mb-20 md:mb-24 lg:mb-32">
    <div
      class="relative z-20 h-[var(--h-screen)] flex flex-col justify-center pb-16"
      style={transform(1.5, 1, 1.5)(x, y)}>
      <div
        class="flex flex-col justify-center gap-4 sm:gap-6 lg:w-1/2 md:w-8/12 items-center text-center md:text-left md:items-start">
        <div class="font-serif text-3xl sm:text-4xl text-text-hover text-shadow">
          {$__$?.landing.hero.title}
        </div>
        <div class="text-text-primary text-sm sm:text-base text-shadow-strong">
          {$__$?.landing.hero.subtitle}
        </div>
      </div>
      <div />
    </div>
    <div class="-mt-5 h-[var(--h-screen)] absolute top-0 left-96 right-96 -mx-[99rem] !max-w-none">
      <div
        class="overflow-hidden scale-y-[102%]"
        style={cn(
          'mask-image: linear-gradient(to bottom, black 97%, transparent);',
          '-webkit-mask-image: linear-gradient(to bottom, black 97%, transparent);',
        )}>
        <div
          class="relative left-1/2 -translate-x-1/2 max-w-screen w-screen h-[var(--h-screen)] children:absolute overflow-hidden">
          <div
            class="z-10 top-[40%] md:top-[2%] h-[80%] w-[80%] sm:h-[60%] sm:w-[60%] md:h-[70%] md:w-[40%] left-[5%] md:left-1/2"
            style={transform(1.15, 0.2)(x, y)}>
            <img
              id="enga"
              on:load={resolveLoadingImage}
              on:error={rejectLoadingImage}
              alt=""
              src={'/hero/enga.png'}
              class="h-full w-full object-contain -translate-x-1/2 -translate-y-1/2 md:translate-y-0" />
          </div>
          <img
            id="meteor"
            on:load={resolveLoadingImage}
            on:error={rejectLoadingImage}
            alt=""
            src={'/hero/meteor.png'}
            class="select-none z-10 -right-[8%] top-[15%] lg:top-[5%] w-[40vw]"
            style={transform(2.5, 0.2)(x, y)} />
          <img
            id="planet1"
            on:load={resolveLoadingImage}
            on:error={rejectLoadingImage}
            alt=""
            src={'/hero/planet-1.png'}
            class="select-none z-10 left-[17%] lg:left-1/4 top-[58%] invisible md:visible"
            style={transform(0.4, 0.2)(x, y)} />
          <img
            id="planet2"
            on:load={resolveLoadingImage}
            on:error={rejectLoadingImage}
            alt=""
            src={'/hero/planet-2.png'}
            class="select-none z-10 left-[7%] lg:left-[15%] top-[20%] invisible md:visible object-contain w-[6%] h-[13%] min-w-[4.5rem] min-h-[4.5rem]"
            style={transform(0.9, 0.2)(x, y)} />
          <img
            id="planet3"
            on:load={resolveLoadingImage}
            on:error={rejectLoadingImage}
            alt=""
            src={'/hero/planet-3.png'}
            class="select-none z-10 right-[5%] top-[22%] h-[24%] w-[11%] object-contain min-w-[6.5rem] min-h-[6.5rem]"
            style={transform($screen$.isMobile ? 0.9 : 1.6, 0.2)(x, y)} />

          <!-- bg -->
          <img
            id="bg"
            on:load={resolveLoadingImage}
            on:error={rejectLoadingImage}
            alt=""
            src={'/hero/bg-space.png'}
            class="select-none z-0 w-screen h-[50vh] object-cover -scale-y-100" />
          <img
            id="bg-reverse"
            on:load={resolveLoadingImage}
            on:error={rejectLoadingImage}
            alt=""
            src={'/hero/bg-space.png'}
            class="select-none z-0 w-screen h-[50vh] object-cover translate-y-full" />

          <!-- ground -->
          <div
            class="select-none z-10 bottom-0 left-1/2 w-[110vw] !max-w-none min-w-[80rem]"
            style={transform(1.3, 0)(x, y)}>
            <img
              id="ground"
              on:load={resolveLoadingImage}
              on:error={rejectLoadingImage}
              alt=""
              src={'/hero/ground.png'}
              class="-translate-x-1/2 w-full" />
          </div>

          <!-- left rock -->
          <div
            class="select-none z-20 w-[27vw] min-w-[12rem] max-w-[35rem] children:grow children:object-contain children:-translate-x-full left-0 bottom-0 flex"
            style={transform(5, 0)(x, y)}>
            <img
              id="left-rock-left"
              on:load={resolveLoadingImage}
              on:error={rejectLoadingImage}
              alt=""
              src={'/hero/rock-right.png'}
              class="select-none translate-y-[17%] scale-[170%] translate-x-[5%]"
              style={cn(
                'mask-image: linear-gradient(to right, black 80%, transparent);',
                '-webkit-mask-image: linear-gradient(to right, black 80%, transparent);',
              )} />
            <img
              id="left-rock-right"
              on:load={resolveLoadingImage}
              on:error={rejectLoadingImage}
              alt=""
              src={'/hero/rock-left.png'}
              class="select-none relative translate-y-[12%]"
              style={cn(
                'mask-image: linear-gradient(to left, black 90%, transparent);',
                '-webkit-mask-image: linear-gradient(to left, black 90%, transparent);',
              )} />
            <!-- <img
              id="left-rock-right"
              on:load={resolveLoadingImage}
              on:error={rejectLoadingImage}
              alt=""
              src={'/hero/rock-left.png'}
              class="select-none relative translate-y-[27%] !-ml-[110%] scale-x-75 scale-y-75 -hue-rotate-15 brightness-75"
              style={cn(
                'mask-image: linear-gradient(to left, black 90%, transparent);',
                '-webkit-mask-image: linear-gradient(to left, black 90%, transparent);',
              )} /> -->
          </div>

          <!-- right rock -->
          <div
            class="z-20 w-[27vw] min-w-[12rem] max-w-[35rem] children:grow children:object-contain right-0 bottom-0 flex -space-x-[15%] children:translate-x-[5%]"
            style={transform(5, 0)(x, y)}>
            <img
              id="right-rock-right"
              on:load={resolveLoadingImage}
              on:error={rejectLoadingImage}
              alt=""
              src={'/hero/rock-right.png'}
              class="select-none relative z-10 translate-y-[22%] scale-150"
              style={cn(
                'mask-image: linear-gradient(to right, black 95%, transparent);',
                '-webkit-mask-image: linear-gradient(to right, black 95%, transparent);',
              )} />
            <img
              id="right-rock-left"
              on:load={resolveLoadingImage}
              on:error={rejectLoadingImage}
              alt=""
              src={'/hero/rock-left.png'}
              class="select-none relative z-0 translate-y-[20%]"
              style={cn(
                'mask-image: linear-gradient(to left, black 95%, transparent);',
                '-webkit-mask-image: linear-gradient(to left, black 95%, transparent);',
              )} />
            <img
              id="right-rock-left"
              on:load={resolveLoadingImage}
              on:error={rejectLoadingImage}
              alt=""
              src={'/hero/rock-left.png'}
              class="select-none relative z-0 translate-y-[28%] !-ml-[67%] scale-110"
              style={cn(
                'mask-image: linear-gradient(to left, black 95%, transparent);',
                '-webkit-mask-image: linear-gradient(to left, black 95%, transparent);',
              )} />
          </div>
        </div>
      </div>

      <!-- reflection -->
      <div class="-my-10 py-10 overflow-hidden h-[15vw] min-h-[10rem]">
        <div class="-translate-y-[0.7vw] 2xl:-translate-y-[0.3vw]">
          <div
            class="h-[50vw] min-h-[40rem] relative -mx-[99rem] !max-w-none overflow-hidden blur-[2px] lg:blur-[3px] 2xl:blur-[4px] brightness-125 saturate-50"
            style={cn(
              'mask-image: radial-gradient(ellipse farthest-corner at bottom center, transparent 60%, black 100% );',
              '-webkit-mask-image: radial-gradient(ellipse farthest-corner at bottom center, transparent 60%, black 100% );',
            )}>
            <div
              class="-scale-y-100 relative left-1/2 -translate-x-1/2 max-w-screen w-screen h-[var(--h-screen)] children:absolute overflow-hidden">
              <div class="z-10 bottom-0 left-1/2 w-[104vw] !max-w-none min-w-[80rem]">
                <img
                  id="ground-reflection"
                  on:load={resolveLoadingImage}
                  on:error={rejectLoadingImage}
                  alt=""
                  src={'/hero/ground.png'}
                  class="select-none -translate-x-1/2 w-full" />
              </div>
              <div
                class="z-20 w-[27vw] children:w-full children:object-contain children:-translate-x-full left-0 bottom-0 flex -space-x-[12%]">
                <img
                  id="left-rock-right-reflection"
                  on:load={resolveLoadingImage}
                  on:error={rejectLoadingImage}
                  alt=""
                  src={'/hero/rock-right.png'}
                  class="select-none translate-y-[8%] scale-150"
                  style={cn(
                    'mask-image: linear-gradient(to right, black 95%, transparent);',
                    '-webkit-mask-image: linear-gradient(to right, black 95%, transparent);',
                  )} />
                <img
                  id="left-rock-left-reflection"
                  on:load={resolveLoadingImage}
                  on:error={rejectLoadingImage}
                  alt=""
                  src={'/hero/rock-left.png'}
                  class="select-none relative translate-y-[12%]"
                  style={cn(
                    'mask-image: linear-gradient(to left, black 90%, transparent);',
                    '-webkit-mask-image: linear-gradient(to left, black 90%, transparent);',
                  )} />
              </div>
              <div
                class="z-20 w-[27vw] min-w-[12rem] max-w-[35rem] children:w-full children:object-contain right-0 bottom-0 flex -space-x-[15%] children:translate-x-[5%]">
                <img
                  id="right-rock-right-reflection"
                  on:load={resolveLoadingImage}
                  on:error={rejectLoadingImage}
                  alt=""
                  src={'/hero/rock-right.png'}
                  class="select-none relative z-10 translate-y-[22%] scale-150" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</Parallax>

<style lang="postcss">
  .text-shadow {
    text-shadow: 0 0 0.5rem black, 0 0 1rem black;
  }
  .text-shadow-strong {
    text-shadow: 0 0 0.5rem black, 0 0 0.7rem black, 0 0 0.9rem black;
  }

  .no-select {
    user-select: none;
    * {
      user-select: none;
    }
  }
</style>
