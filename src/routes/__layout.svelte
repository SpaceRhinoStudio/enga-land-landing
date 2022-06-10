<script context="module" lang="ts">
  export const intro = true
</script>

<script lang="ts">
  import { Routes } from '$lib/shared/configs/routes'
  import MainLayout from '$lib/shared/MainLayout.svelte'
</script>

<MainLayout
  small
  footerRoutes={[
    Routes.home,
    Routes.dapp,
    Routes.marketplace,
    Routes.docs,
    Routes.help,
    Routes.aboutUs,
  ]}
  headerRoutes={[Routes.home, Routes.dapp, Routes.marketplace]}
  headerCollapsedRoutes={[
    Routes.docs,
    Routes.help,
    Routes.tokenomics,
    Routes.github,
    Routes.community,
    Routes.aboutUs,
  ]}
  sidebarRoutes={[
    Routes.home,
    Routes.dapp,
    Routes.marketplace,
    Routes.docs,
    Routes.help,
    Routes.tokenomics,
    Routes.github,
    Routes.community,
    Routes.aboutUs,
  ]}>
  <slot />
  <svelte:fragment slot="header-right" />
  <svelte:fragment slot="sidebar-foot" />
</MainLayout>
