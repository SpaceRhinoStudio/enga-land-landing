<script lang="ts" context="module">
  import KomorebiIcon from './shared/assets/icons/realms/komorebi.svg'
  import MagestaIcon from './shared/assets/icons/realms/magesta.svg'
  import NubiaIcon from './shared/assets/icons/realms/nubia.svg'
  import SigrIcon from './shared/assets/icons/realms/sigr.svg'
  import UfmIcon from './shared/assets/icons/realms/ufm.svg'

  const Icons: { [key in Realms]: any } = {
    [Realms.komorebi]: KomorebiIcon,
    [Realms.magesta]: MagestaIcon,
    [Realms.nubia]: NubiaIcon,
    [Realms.sigr]: SigrIcon,
    [Realms.ufm]: UfmIcon,
  }
</script>

<script lang="ts">
  import _ from 'lodash'
  import { onMount } from 'svelte'
  import { __$ } from './shared/locales'
  import Modal from './shared/Modal.svelte'
  import SvgIcon from './shared/SVGIcon.svelte'
  import { Realms } from './shared/types/enga'
  import { canHover$, screen$ } from './shared/helpers/media-queries'
  import cn from 'classnames'
  import Parallax from './Parallax.svelte'
  import MeritPointIcon from './shared/assets/icons/families-stats/merit-point.svg'
  import XpIcon from './shared/assets/icons/families-stats/xp.svg'
  import ZealIcon from './shared/assets/icons/families-stats/zeal.svg'
  import BackIcon from './shared/assets/icons/vuesax-linear-arrow-left-2.svg'
  import Button from './shared/Button.svelte'
  import HoverState from './shared/HoverState.svelte'
  import ClickState from './shared/ClickState.svelte'
  import { fade } from 'svelte/transition'
  import { portal } from './shared/actions/portal'
  import { Writable } from 'svelte/store'

  export let realm: Realms
  export let hovering: Writable<{ realm: Realms; sticky: boolean; isLeaving: boolean } | null>
  let isLoading = true
  function hasLoaded() {
    isLoading = false
  }

  let hasVisitedBefore = true
  onMount(() => {
    hasVisitedBefore = localStorage.getItem('hasVisitedBefore') === 'true' ? true : false
  })
  function setVisited() {
    hasVisitedBefore = true
    localStorage.setItem('hasVisitedBefore', 'true')
  }

  let dismiss = false
  let hoverState: boolean
  let clickState: boolean
  let shouldLeave: boolean
  let portalHover: boolean
  let portalClick: boolean
  let hasClicked = false

  function getHoverState() {
    return hoverState
  }

  let scrollY: number
  $: scrollY && !getHoverState() && (dismiss = true)
  $: !portalHover && !portalClick && !hoverState && !clickState && (dismiss = true)
  $: portalClick && (hasClicked = true)
  $: !portalClick && hasClicked && (dismiss = true)
  $: !portalClick && (hasClicked = false)
  $: (hoverState || clickState) && (dismiss = false)

  $: !dismiss &&
    !isLoading &&
    (shouldLeave ? $hovering?.realm === realm : true) &&
    ($hovering === null || $hovering.realm === realm || $hovering.isLeaving) &&
    !($hovering?.realm !== realm && $hovering?.sticky && !(clickState || portalClick)) &&
    hovering.set({ realm, sticky: clickState || portalClick, isLeaving: shouldLeave })

  $: $hovering?.realm === realm && (dismiss || isLoading) && hovering.set(null)

  $: shouldExpand = $hovering?.realm === realm

  let toggle: () => void
</script>

<svelte:window bind:scrollY />

<HoverState bind:hoverState bind:shouldLeave>
  <ClickState bind:clickState noToggle>
    <div
      class={cn(
        'relative flex flex-col items-center transition-all hover:text-text-hover pointer-events-auto duration-500',
        shouldExpand && 'scale-110',
        $hovering !== null && $hovering.realm !== realm && 'opacity-20',
        !clickState && !portalClick && 'cursor-pointer',
      )}
      on:click={() => {
        if (!$canHover$) {
          toggle()
          setVisited()
        }
      }}>
      <div class="w-40 h-40 md:w-32 md:h-32 lg:w-40 lg:h-40">
        <slot name="icon" {hasLoaded} />
      </div>
      <div
        class="font-serif text-3xl md:text-2xl lg:text-3xl transition-all text-shadow duration-700 delay-700 {isLoading
          ? 'opacity-0'
          : 'opacity-100'}">
        {_.upperCase($__$.EngaVerse.realms[realm])}
      </div>
      {#if !isLoading && !hasVisitedBefore}
        <slot name="tooltip" />
      {/if}
      <div
        use:portal
        class="fixed z-30 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-screen max-w-screen-lg flex items-center justify-center">
        <HoverState bind:hoverState={portalHover}>
          <ClickState bind:clickState={portalClick} noToggle>
            {#if shouldExpand}
              <div
                transition:fade={{ duration: 300 }}
                class={cn(
                  'pointer-events-auto w-11/12 flex justify-end rounded-t-xl md:rounded-xl px-5 pt-10 pb-5 bg-primary-800 relative z-0 h-auto overflow-hidden text-shadow-lite',
                  !clickState && !portalClick && 'cursor-pointer',
                )}>
                <div class="relative z-10 flex flex-col gap-6">
                  <div class="flex gap-3 items-center">
                    <SvgIcon Icon={Icons[realm]} width="2.5rem" height="2.5rem" dontFill />
                    <span class="font-serif text-yellow-400 text-3xl"
                      >{_.upperCase($__$.EngaVerse.realms[realm])}</span>
                  </div>
                  <div class="text-justify max-w-[theme(spacing.96)]">
                    {$__$.landing.realms.info[realm].description}
                  </div>
                  <div class="space-x-0 text-lg">
                    <quote class="font-semibold tracking-wide">
                      {`“`}{$__$.landing.realms.info[realm].subtitle}{`”`}
                    </quote>
                  </div>
                  <div class="flex gap-3">
                    <div class="flex gap-2 items-center">
                      <SvgIcon Icon={XpIcon} width="2.2rem" height="2.2rem" dontFill />
                      <span>{$__$.landing.realms.info[realm].xp}</span>
                    </div>
                    <div class="flex gap-2 items-center">
                      <SvgIcon Icon={ZealIcon} width="2.2rem" height="2.2rem" dontFill />
                      <span>{$__$.landing.realms.info[realm].zealDefect}</span>
                    </div>
                    <div class="flex gap-2 items-center">
                      <SvgIcon Icon={MeritPointIcon} width="2.2rem" height="2.2rem" dontFill />
                      <span>{$__$.landing.realms.info[realm].meritPoints}</span>
                    </div>
                  </div>
                </div>
                <div
                  class="absolute inset-0 -z-10 brightness-50"
                  style={cn(
                    'mask-image: linear-gradient(to right, black 1%, transparent);',
                    '-webkit-mask-image: linear-gradient(to right, black 1%, transparent);',
                  )}>
                  <div class="w-full h-full">
                    <slot name="bg" />
                  </div>
                </div>
                <div class="absolute z-0 -bottom-5 lg:right-1/2 md:left-1/4 h-3/4 brightness-110">
                  <slot name="character" />
                </div>
              </div>
            {/if}
          </ClickState>
        </HoverState>
      </div>
    </div>
  </ClickState>
</HoverState>

<Modal bind:toggle>
  <div
    class="flex flex-col gap-6 rounded-t-xl md:rounded-xl px-5 pt-10 pb-5 bg-primary-800 w-11/12 relative z-0 h-5/6 overflow-hidden text-shadow-lite max-w-screen-sm">
    <Parallax let:transform let:x let:y>
      <div
        class="absolute -left-24 top-1/4 bottom-0 -right-24 -z-10 brightness-50"
        style={cn(
          'mask-image: linear-gradient(to top, black 50%, transparent);',
          '-webkit-mask-image: linear-gradient(to top, black 50%, transparent);',
        )}>
        <div class="w-full h-full" style={transform(0.8, 0)(x, y)}>
          <slot name="bg" />
        </div>
      </div>
      <div class="flex gap-3 items-center">
        <SvgIcon Icon={Icons[realm]} width="2.5rem" height="2.5rem" dontFill />
        <span class="font-serif text-yellow-400 text-3xl"
          >{_.upperCase($__$.EngaVerse.realms[realm])}</span>
      </div>
      <div class="text-justify max-w-[theme(spacing.96)]">
        {$__$.landing.realms.info[realm].description}
      </div>
      <div class="space-x-0 text-lg">
        <quote class="font-semibold tracking-wide">
          {`“`}{$__$.landing.realms.info[realm].subtitle}{`”`}
        </quote>
      </div>
      <div class="flex flex-col gap-3">
        <div class="flex gap-2 items-center">
          <SvgIcon Icon={XpIcon} width="2.2rem" height="2.2rem" dontFill />
          <span>{$__$.landing.realms.info[realm].xp}</span>
        </div>
        <div class="flex gap-2 items-center">
          <SvgIcon Icon={ZealIcon} width="2.2rem" height="2.2rem" dontFill />
          <span>{$__$.landing.realms.info[realm].zealDefect}</span>
        </div>
        <div class="flex gap-2 items-center">
          <SvgIcon Icon={MeritPointIcon} width="2.2rem" height="2.2rem" dontFill />
          <span>{$__$.landing.realms.info[realm].meritPoints}</span>
        </div>
      </div>
      <div class="mt-auto">
        <Button job={toggle} secondary className="!px-6 !py-3 shadow-lg shadow-black">
          <SvgIcon Icon={BackIcon} width="1.3rem" height="1.3rem" />
        </Button>
      </div>

      <div class="absolute -bottom-3 right-5 h-2/5 brightness-110" style={transform(1.5, 0)(x, y)}>
        <slot name="character" />
      </div>
    </Parallax>
  </div>
</Modal>

<style lang="postcss">
  .text-shadow {
    text-shadow: 0 0 0.5rem black, 0 0 1rem black;
  }
  .text-shadow-lite {
    text-shadow: 0 0 0.2rem black, 0 0 0.5rem black;
  }
</style>
