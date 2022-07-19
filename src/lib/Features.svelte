<script lang="ts">
  import SectionTitle from './SectionTitle.svelte'
  import { __$ } from './shared/locales'
  import JigglyCard from './shared/JigglyCard.svelte'
  import cn from 'classnames'
  import { canHover$ } from './shared/helpers/media-queries'
  import { isFirefox$ } from './shared/contexts/is-firefox'
  import Ring from './shared/Ring.svelte'
  import RandomPlacement from './RandomPlacement.svelte'
</script>

<div class="flex flex-col gap-12 relative z-0 overflow-x-visible">
  <SectionTitle>
    {$__$.landing.features.title}
  </SectionTitle>
  <div
    class="relative z-20 flex flex-wrap md:children:w-[calc(50%-theme(spacing.8))] justify-center gap-8 text-text-secondary">
    {#each $__$.landing.features.items as x}
      <JigglyCard brightnessMaxRotation={45} multiplier={8}>
        <div
          class={cn(
            'h-full',
            'max-w-lg',
            'border-4',
            'rounded-xl',
            'border-primary-600',
            'bg-primary-800',
            'bg-opacity-80',
            !$isFirefox$ && cn('md:bg-primary-700', 'md:bg-opacity-30', 'md:backdrop-blur-md'),
            'flex',
            'flex-col',
            'gap-6',
            'md:p-10',
            'p-6',
            'transition-all',
            'duration-500',
            $canHover$ &&
              cn(
                'hover:bg-primary-600',
                'hover:bg-opacity-50',
                'hover:text-text-primary',
                'hover:scale-105',
              ),
            'md:text-justify',
          )}>
          <span class="font-semibold text-lg">{x.title}</span>
          <span>{x.description}</span>
        </div>
      </JigglyCard>
    {/each}
  </div>
  <div
    class="absolute -z-10 w-screen overflow-hidden h-[calc(100%+theme(spacing.96))] py-48 top-[calc(50%+theme(spacing.24))] -translate-y-1/2 left-1/2 -translate-x-1/2 flex justify-center">
    <div class="h-full w-screen max-w-screen-xl flex justify-between">
      <div class="relative w-12">
        <RandomPlacement>
          <Ring />
        </RandomPlacement>
      </div>
      <div class="relative w-12">
        <RandomPlacement>
          <Ring />
        </RandomPlacement>
      </div>
    </div>
  </div>
</div>
