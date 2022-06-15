<script lang="ts" context="module">
  import ChainlinkIcon from '../assets/tech/chainlink.svg'
  import GodotIcon from '../assets/tech/godot.svg'
  import HardhatIcon from '../assets/tech/hardhat.svg'
  import PolygonIcon from '../assets/tech/polygon.svg'
  import ChainlinkBg from '../assets/tech/bg/chainlink.svg'
  import GodotBg from '../assets/tech/bg/godot.svg'
  import HardhatBg from '../assets/tech/bg/hardhat.svg'
  import PolygonBg from '../assets/tech/bg/polygon.svg'
  const technologies: { title: string; icon: any; bg: any; fillIcon: boolean; fillBg: boolean }[] =
    [
      { title: 'Chainlink', icon: ChainlinkIcon, bg: ChainlinkBg, fillIcon: true, fillBg: true },
      { title: 'Godot', icon: GodotIcon, bg: GodotBg, fillIcon: true, fillBg: true },
      { title: 'Hardhat', icon: HardhatIcon, bg: HardhatBg, fillIcon: false, fillBg: false },
      { title: 'Polygon', icon: PolygonIcon, bg: PolygonBg, fillIcon: true, fillBg: true },
    ]
</script>

<script lang="ts">
  import RandomPlacement from './RandomPlacement.svelte'
  import SectionTitle from './SectionTitle.svelte'
  import { __$ } from './shared/locales'
  import SvgIcon from './shared/SVGIcon.svelte'
  import RandomTranslate from './shared/RandomTranslate.svelte'
  import { genArr, rnd, rndElm } from './shared/utils/random'
  import cn from 'classnames'
  import { screen$ } from './shared/helpers/media-queries'

  const bgItems = technologies.reduce(
    (acc, curr) => [
      ...acc,
      ...[
        { svg: curr.bg, fill: curr.fillBg, small: false },
        { svg: curr.icon, fill: curr.fillIcon, small: true },
      ],
    ],
    [] as { svg: any; fill: boolean; small: boolean }[],
  )
</script>

<div class="relative flex flex-col -mt-12 pt-12 gap-24 items-center pb-40">
  <SectionTitle>
    {$__$.landing.technologies.title}
  </SectionTitle>

  <div class="grid grid-cols-2 gap-20 md:flex flex-wrap items-center justify-center">
    {#each technologies as x}
      <div class="flex flex-col gap-3 items-center">
        <SvgIcon
          dontFill={!x.fillIcon}
          Icon={x.icon}
          className={!x.fillIcon ? 'brightness-75' : ''}
          width="4rem"
          height="4rem" />
        <span class="text-shadow">{x.title}</span>
      </div>
    {/each}
  </div>

  <div class="h-full absolute -top-10 left-0 right-0 !max-w-none">
    <div
      class="relative h-full left-1/2 -translate-x-1/2 md:w-[70vw] w-screen blur-[2px]"
      style={cn(
        `mask-image: radial-gradient(ellipse at 50% 50%, black 35%, transparent 65%);`,
        `-webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 35%, transparent 65%);`,
      )}>
      <div
        class="absolute w-full lg:w-1/2 left-1/2 -translate-x-1/2 h-5/6 top-1/2 -translate-y-1/2 flex justify-center space-x-4 space-y-4 md:space-y-0 md:space-x-12 flex-wrap">
        {#each bgItems as x}
          <div class="relative md:h-1/2" style="width: {x.small ? 4 : 10}rem;">
            <div class="absolute h-full">
              <RandomPlacement>
                <RandomTranslate config={{ mass: 3000 }} maxMove={0.5}>
                  <SvgIcon
                    Icon={x.svg}
                    height={x.small ? '4rem' : '10rem'}
                    width={x.small ? '4rem' : '10rem'}
                    style="opacity: {rnd(0.3, 0.1, true)};"
                    dontFill={!x.fill} />
                </RandomTranslate>
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
    text-shadow: 0 0 0.25rem black, 0 0 0.4rem black, 0 0 0.6rem black;
  }
</style>
