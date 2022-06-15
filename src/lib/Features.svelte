<script lang="ts">
  import SectionTitle from './SectionTitle.svelte'
  import { __$ } from './shared/locales'
  import JigglyCard from './shared/JigglyCard.svelte'
  import cn from 'classnames'
  import { canHover$ } from './shared/helpers/media-queries'
  import { isFirefox$ } from './shared/contexts/is-firefox'
</script>

<div class="flex flex-col gap-12">
  <SectionTitle>
    {$__$.landing.features.title}
  </SectionTitle>
  <div
    class="relative z-20 flex flex-wrap md:children:w-[calc(50%-theme(spacing.8))] justify-center gap-8 text-text-secondary">
    {#each $__$.landing.features.items as x}
      <JigglyCard multiplier={7}>
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
                'hover:text-text-hover',
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
</div>
