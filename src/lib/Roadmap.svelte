<script lang="ts">
  import cn from 'classnames'
  import _ from 'lodash'
  import { fade, slide } from 'svelte/transition'
  import SectionTitle from './SectionTitle.svelte'
  import { intersection } from './shared/actions/intersection'
  import { isFirefox$ } from './shared/contexts/is-firefox'
  import { canHover$, screen$ } from './shared/helpers/media-queries'
  import { pxPerRem$ } from './shared/helpers/px-rem-conversion'
  import JigglyCard from './shared/JigglyCard.svelte'
  import { __$ } from './shared/locales'

  let intersections: { [index: number]: { middle: number; isActive: boolean } } = {}
  let lastActive: number
  $: lastActive =
    _.values(intersections).reduce(
      (acc, curr, index) => (curr.isActive ? index : acc),
      lastActive === $__$.landing.roadmap.items.length - 1 ? lastActive : -1,
    ) ?? -1
  let firstItemTop = 0
  let lastItemBottom = 0

  function intersectionHandler(i: number) {
    return function (e: CustomEvent<boolean>) {
      let middle: number = 1
      const target = e.currentTarget as HTMLElement
      if (target && 'getBoundingClientRect' in target) {
        const rect = target.getBoundingClientRect()
        if (i === 0) {
          firstItemTop = rect.top + window.scrollY
        }
        middle = rect.top + window.scrollY + rect.height / 2 - firstItemTop
        if (i === $__$.landing.roadmap.items.length - 1) {
          setTimeout(() => {
            const rect = target.getBoundingClientRect()
            lastItemBottom = rect.top + window.scrollY + rect.height - firstItemTop
          }, 1000)
        }
      }
      intersections = {
        ...intersections,
        [i]: { middle, isActive: e.detail },
      }
    }
  }
</script>

<div class="flex flex-col gap-12">
  <SectionTitle>
    {$__$.landing.roadmap.title}
  </SectionTitle>

  <div class="relative z-20 flex flex-wrap justify-center gap-8">
    <div class="w-full h-full absolute pointer-events-none">
      <div class="relative z-10 w-full h-full flex justify-start md:justify-center">
        <!-- bg progress -->
        <div
          class="absolute top-0 w-2 md:w-3 bg-primary-600 bg-opacity-50 transition-all duration-700 h-[1000px] my-2 origin-top"
          style={cn(
            `transform: scaleY(${
              ((lastActive === $__$.landing.roadmap.items.length - 1
                ? intersections[lastActive]?.middle ?? 0
                : lastItemBottom ?? 0) -
                $pxPerRem$ * 0.5 * 2) /
              1000
            });`,
          )} />
        <!-- bg progress top round -->
        <div class="absolute top-0 w-2 md:w-3 bg-primary-600 bg-opacity-50 rounded-t-xl h-2" />
        <!-- bg progress bottom round -->
        <div
          class="absolute bottom-0 w-2 md:w-3 bg-primary-600 bg-opacity-50 rounded-b-xl transition-all ease-linear"
          style={cn(
            `height: ${
              lastActive === $__$.landing.roadmap.items.length - 1 ? 0 : $pxPerRem$ * 0.5
            }px;`,
            `transition-duration: ${(700 / (intersections[0]?.middle ?? 0)) * $pxPerRem$ * 0.5}ms;`,
            `transition-delay: ${
              lastActive === $__$.landing.roadmap.items.length - 1
                ? 0
                : (700 / (intersections[0]?.middle ?? 0)) *
                  ((intersections[0]?.middle ?? 0) - $pxPerRem$ * 0.5)
            }ms;`,
          )} />
        <!-- main progress top round -->
        <div
          class="absolute top-0 w-2 md:w-3 bg-neutral-300 rounded-t-xl transition-all ease-linear"
          style={cn(
            `height: ${lastActive === -1 ? 0 : $pxPerRem$ * 0.5}px;`,
            `transition-duration: ${(700 / (intersections[0]?.middle ?? 0)) * $pxPerRem$ * 0.5}ms;`,
            `transition-delay: ${
              lastActive === -1
                ? (700 / (intersections[0]?.middle ?? 0)) *
                    ((intersections[0]?.middle ?? 0) - $pxPerRem$ * 0.5) -
                  50
                : 0
            }ms;`,
          )} />
        <!-- main progress -->
        <div
          class="absolute top-0 w-2 md:w-3 bg-neutral-300 h-[1000px] mt-2 transition-all origin-top duration-700"
          style={cn(
            `transform: scaleY(${
              lastActive === -1
                ? 0
                : ((intersections[lastActive]?.middle ?? 0) - $pxPerRem$ * 0.5) / 1000
            });`,
            `transition-delay: ${
              lastActive === 0 ? (700 / (intersections[0]?.middle ?? 0)) * $pxPerRem$ * 0.5 + 50 : 0
            }ms;`,
          )} />
        <!-- main stop indicator -->
        <div
          class="absolute top-0 md:h-8 md:w-8 h-6 w-6 transition-all duration-700 border-4 md:border-8 bg-blood shadow-float shadow-blood border-white rounded-full left-1 md:left-1/2 {lastActive ===
          -1
            ? 'opacity-0'
            : 'opacity-100'}"
          style="transform: translate(-50%, calc({intersections[lastActive]?.middle ??
            0}px - 50%));" />
      </div>
    </div>
    {#each $__$.landing.roadmap.items as x, i}
      <div
        class="w-full relative z-0 flex {i % 2
          ? 'md:justify-end'
          : 'md:justify-start'} justify-center"
        use:intersection={{ threshold: $screen$.isMobile ? 0.7 : 1 }}
        on:intersection={intersectionHandler(i)}>
        {#if i > lastActive}
          <div
            in:fade
            out:fade={{ delay: 700 }}
            class="absolute z-0 md:h-8 md:w-8 h-6 w-6 transition-all duration-700 bg-primary-600 rounded-full left-1 md:left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
        {/if}
        <JigglyCard
          disabled={i > lastActive}
          multiplier={5}
          className="md:w-[calc(50%-theme(spacing.8))] w-full max-w-lg ml-6 md:ml-0">
          <div
            class={cn(
              'w-full',
              'h-full',
              'border-4',
              'rounded-xl',
              'border-primary-600',
              'bg-primary-800',
              'bg-opacity-80',
              !$isFirefox$ && cn('md:bg-primary-700', 'md:bg-opacity-30', 'md:backdrop-blur-md'),
              'flex',
              'flex-col',
              'gap-6',
              'md:p-10 p-6',
              'transition-all',
              'duration-500',
              i <= lastActive
                ? cn(
                    'text-text-primary',
                    $canHover$ &&
                      'hover:bg-primary-600 hover:bg-opacity-50 group hover:scale-105 hover:text-text-hover',
                  )
                : 'text-text-secondary',
            )}>
            <span
              class={cn(
                'font-semibold text-lg transition-colors duration-700',
                i <= lastActive && 'text-secondary-500',
              )}>{x.title}</span>
            <div class="flex flex-col gap-2">
              {#each x.items as item, j}
                <div class="relative flex items-start w-full">
                  {#if i <= lastActive}
                    <div
                      in:fade={{ duration: 500, delay: j * 50 }}
                      out:fade={{ duration: 500, delay: (x.items.length - j) * 50 }}
                      class={cn(
                        'absolute',
                        'rounded-full mt-1.5',
                        'w-2.5',
                        'h-2.5',
                        !item[1] && 'border',
                        item[1]
                          ? cn(i <= lastActive ? 'bg-text-primary' : 'bg-text-secondary')
                          : cn(i <= lastActive ? 'border-text-primary' : 'border-text-secondary'),
                        item[1] ? 'group-hover:bg-text-hover' : 'group-hover:border-text-hover',
                        'transition-colors',
                      )} />
                  {/if}
                  <span
                    class={cn(
                      'transition-all duration-500 pr-5',
                      i <= lastActive && 'translate-x-5',
                    )}
                    style="transition-delay: {(i <= lastActive
                      ? j * 50
                      : (x.items.length - j) * 50) + 100}ms;">{item[0]}</span>
                </div>
              {/each}
            </div>
          </div>
        </JigglyCard>
      </div>
    {/each}
  </div>
</div>
