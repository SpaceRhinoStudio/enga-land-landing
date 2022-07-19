<script lang="ts" context="module">
  import GBMIcon from '../assets/partners/gbm.svg'
  const partners: {
    title: string
    href: string
    icon: any
    fillIcon: boolean
  }[] = [
    {
      title: 'GBM Auction',
      href: 'https://www.gbm.auction',
      icon: GBMIcon,
      fillIcon: true,
    },
  ]
</script>

<script lang="ts">
  import RandomPlacement from './RandomPlacement.svelte'
  import SectionTitle from './SectionTitle.svelte'
  import { __$ } from './shared/locales'
  import SvgIcon from './shared/SVGIcon.svelte'
  import RandomTranslate from './shared/RandomTranslate.svelte'
  import { rnd } from './shared/utils/random'
  import cn from 'classnames'
  import { canHover$ } from './shared/helpers/media-queries'
  import Ring from './shared/Ring.svelte'

  let rings = Array(3).fill(undefined)
</script>

<div class="relative z-0 flex flex-col -mt-12 pt-12 gap-24 items-center pb-48">
  <SectionTitle>
    {$__$.landing.partners.title}
  </SectionTitle>

  <div class="relative z-10 grid grid-cols-1 gap-20 md:flex flex-wrap items-center justify-center">
    {#each partners as x}
      <a
        class={cn(
          'flex relative z-0 flex-col gap-3 items-center cursor-pointer',
          $canHover$ &&
            'will-change-transform brightness-100 hover:scale-110 group children:transition-all children:duration-300 transition-all duration-300',
        )}
        href={x.href}>
        <SvgIcon
          dontFill={!x.fillIcon}
          Icon={x.icon}
          className={cn(!x.fillIcon && 'brightness-75', 'group-hover:brightness-150')}
          width="6rem"
          height="6rem" />
        <span class="group-hover:text-text-hover">{x.title}</span>
        <div
          class="absolute -z-10 top-5 h-full scale-150 aspect-square rounded-full bg-primary-990 bg-opacity-70 blur-md shadow-floatColoredStrong" />
      </a>
    {/each}
  </div>
  <div class="h-full absolute -z-10 -top-10 left-0 right-0 !max-w-none">
    <div class="relative h-full left-1/2 -translate-x-1/2 md:w-[70vw] w-screen">
      <div
        class="absolute w-full left-1/2 -translate-x-1/2 h-4/6 top-1/2 -translate-y-1/3 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-20">
        {#each rings as _, i (i)}
          <div class="relative md:h-1/2 grow md:w-56 md:grow-0 w-full">
            <div class="absolute h-full w-full">
              <RandomPlacement>
                <Ring />
              </RandomPlacement>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .text-shadow {
    text-shadow: 0 0 0.25rem black, 0 0 0.5rem black, 0 0 0.8rem black, 0 0 1rem black;
  }
  .shadow-floatColoredStrong {
    box-shadow: 0 0 6rem 1.5rem theme('colors.primary.990');
  }
</style>
