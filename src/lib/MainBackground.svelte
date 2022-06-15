<script lang="ts">
  import RandomPlacement from './RandomPlacement.svelte'
  import Rock1 from '../assets/shapes/rock-1.svg'
  import Rock2 from '../assets/shapes/rock-2.svg'
  import Rock3 from '../assets/shapes/rock-3.svg'
  import Rock4 from '../assets/shapes/rock-4.svg'
  const allRocks = [Rock1, Rock2, Rock3, Rock4]
  import Star from '../assets/shapes/star.svg'
  import Planet from '../assets/shapes/planet.svg'
  import { genArr, rnd, rndElm } from './shared/utils/random'
  import SvgIcon from './shared/SVGIcon.svelte'
  import RandomTranslate from './shared/RandomTranslate.svelte'
  import { screen$ } from './shared/helpers/media-queries'
  import cn from 'classnames'

  let clientHeight: number

  $: multiplier =
    ((clientHeight ?? 0) *
      ($screen$.exact === 'xs'
        ? 640 * 2.7
        : $screen$.exact === 'sm'
        ? 768 * 1.5
        : $screen$.exact === 'md'
        ? 1024 * 2
        : 1280 * 2.5)) /
    3000

  function count(localMultiplier: number, screenMultiplier: number) {
    return Math.round((screenMultiplier / 100) * localMultiplier)
  }

  $: rocks = genArr(count(0.3, multiplier), () => rndElm(allRocks)).map(svg => ({
    svg,
    dimensions: rnd(1.5, 7, true),
  }))
  $: stars = genArr(count(6, multiplier), () => ({
    svg: Star,
    dimensions: { min: 0.07, max: $screen$.isMobile ? 0.15 : 0.25 },
    saturate: 0.08,
  })).map(x => ({
    ...x,
    dimensions: rnd(x.dimensions.max, x.dimensions.min, true),
    hue: rnd(0, 360),
    // shouldPulse: rndElm([true, false]),
    shouldPulse: true,
    delay: rnd(0, 3000),
    duration: rnd(3000, 6000),
    insetX: rnd(-1 / 4, 1 / 4, true),
    insetY: rnd(-1 / 4, 0, true),
  }))
  $: planets = genArr(count(0.25, multiplier), () => ({
    svg: Planet,
    dimensions: { min: 1, max: 2 },
    saturate: 0.6,
  })).map(x => ({
    ...x,
    dimensions: rnd(x.dimensions.max, x.dimensions.min, true),
    hue: rnd(0, 360),
  }))
</script>

<div class="h-full absolute top-0 left-0 right-0 !max-w-none" bind:clientHeight>
  <div
    class="relative h-[calc(100%-theme(spacing.72))] mt-72 left-1/2 -translate-x-1/2 max-w-screen w-screen">
    {#each stars as x}
      <RandomPlacement>
        <div
          class={cn(
            'animate-star',
            x.shouldPulse && '#animate-pulse',
            'bg-primary-500 rounded-full brightness-200',
          )}
          style={cn(
            `width:${x.dimensions}rem;`,
            `height:${x.dimensions}rem;`,
            `filter: hue-rotate(${x.hue}deg) saturate(${x.saturate}) brightness(3);`,
            `animation-delay: ${x.delay}ms;`,
            `animation-duration: ${x.duration}ms;`,
            !$screen$.isMobile &&
              `box-shadow: 0 0 ${x.dimensions * 3}rem ${
                x.dimensions / 7
              }rem rgb(95 25 231 / var(--tw-bg-opacity)), inset ${x.dimensions * x.insetX}rem ${
                x.dimensions * x.insetY
              }rem ${x.dimensions / 2}rem -${x.dimensions / 5}rem #000;`,
          )} />
      </RandomPlacement>
    {/each}
    {#each planets as x}
      <RandomPlacement>
        <SvgIcon
          Icon={x.svg}
          height="{x.dimensions}rem"
          width="{x.dimensions}rem"
          dontFill
          style="filter: hue-rotate({x.hue}deg) saturate({x.saturate});" />
      </RandomPlacement>
    {/each}
    {#each rocks as x}
      <RandomPlacement rotate>
        <RandomTranslate maxMove={0.5} rotate>
          <SvgIcon Icon={x.svg} height="{x.dimensions}rem" width="{x.dimensions}rem" dontFill />
        </RandomTranslate>
      </RandomPlacement>
    {/each}
  </div>
</div>

<style>
  @keyframes star {
    30% {
      opacity: 1;
    }
    50% {
      opacity: 0.15;
    }
    70% {
      opacity: 1;
    }
  }
  .animate-star {
    animation: star cubic-bezier(0.4, 0, 0.6, 1) infinite;
    will-change: opacity;
  }
</style>
