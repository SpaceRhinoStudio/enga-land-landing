<script context="module" lang="ts">
  export const intro = true
</script>

<script lang="ts">
  import { Routes } from '$lib/shared/configs/routes'
  import MainLayout from '$lib/shared/MainLayout.svelte'
  import { useWobble } from '$lib/shared/helpers/wobble-svelte'
  import LaunchDappButton from '$lib/LaunchDappButton.svelte'
  import cn from 'classnames'
  import { isFirefox$ } from '$lib/shared/contexts/is-firefox'
  import { derived } from 'svelte/store'

  const bottomScrollHintShowThreshold = 1000
  const [_scrollTop, setScrollTop] = useWobble({ damping: 1000, stiffness: 5, mass: 0.1 })
  const scrollTop = derived(_scrollTop, x => (x < 0 ? 0 : x))
  let scrollY: number
  $: setScrollTop(scrollY ?? 0)
  $: bottomScrollHintDownscaleFactor = Math.max(bottomScrollHintShowThreshold / $scrollTop, 4)
</script>

<svelte:window bind:scrollY />

<MainLayout
  hintDownscaleFactor={{ end: bottomScrollHintDownscaleFactor }}
  className={{
    headerContainer: '',
    headerWrapper: cn(
      !$isFirefox$ && 'md:bg-slate-100 md:bg-opacity-10 md:backdrop-blur-md',
      'bg-primary-600 bg-opacity-80 px-6 md:py-3 py-5 mt-2 md:mt-0 translate-y-1 rounded-2xl',
    ),
    headerNavDropContainer: cn(
      !$isFirefox$ && 'bg-slate-100 bg-opacity-10 backdrop-blur-md',
      '!translate-y-6',
    ),
    headerNavDropItem: 'hover:!border-slate-600 hover:!bg-slate-300 hover:!bg-opacity-20',
  }}
  small
  floatingHeader
  footerRoutes={[
    Routes.dapp,
    Routes.marketplace,
    Routes.docs,
    Routes.tokenomics,
    Routes.github,
    Routes.community,
    Routes.aboutUs,
  ]}
  headerRoutes={[Routes.dapp, Routes.marketplace, Routes.docs, Routes.blog]}
  headerCollapsedRoutes={[Routes.tokenomics, Routes.github, Routes.community, Routes.aboutUs]}
  sidebarRoutes={[
    Routes.dapp,
    Routes.marketplace,
    Routes.docs,
    Routes.tokenomics,
    Routes.blog,
    Routes.community,
    Routes.github,
    Routes.aboutUs,
  ]}>
  <slot />
  <svelte:fragment slot="header-right">
    <LaunchDappButton />
  </svelte:fragment>
  <svelte:fragment slot="sidebar-foot">
    <LaunchDappButton alwaysExpand />
  </svelte:fragment>
</MainLayout>
