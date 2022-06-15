<script lang="ts">
  import { goto } from '$app/navigation'

  import LaunchIcon from './shared/assets/icons/vuesax-linear-mouse-circle.svg'
  import { routeConfig, Routes } from './shared/configs/routes'
  import Link from './shared/Link.svelte'
  import { __$ } from './shared/locales'
  import SvgIcon from './shared/SVGIcon.svelte'

  export let alwaysExpand = false
</script>

<Link
  href={routeConfig[Routes.dapp].href}
  className={{
    element: 'flex justify-between dropdown group relative transition-all cursor-pointer',
  }}>
  <SvgIcon
    Icon={LaunchIcon}
    width={'1.5rem'}
    height={'1.5rem'}
    className="h-11 w-11 bg-secondary-500 rounded-xl justify-center items-center text-text-hover shadow-glow shadow-secondary-700" />
  <span
    class="text-secondary-500 font-[300] ml-[10px] leading-10 items-center {alwaysExpand
      ? 'flex'
      : 'md:flex hidden'}">
    {$__$.landing.header.launchDapp}
  </span>
</Link>
