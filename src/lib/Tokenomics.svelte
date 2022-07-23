<script lang="ts">
  import SectionTitle from './SectionTitle.svelte'
  import { init, EChartsOption } from 'echarts'

  import { __$ } from './shared/locales'
  import { onMount } from 'svelte'
  //   import type { DeepPartial } from './shared/types'
  import _ from 'lodash'
  import DoughnutChart from './shared/DoughnutChart.svelte'
  import { screen$ } from '$lib/shared/helpers/media-queries'
  import { isFirefox$ } from './shared/contexts/is-firefox'
</script>

<div class="flex flex-col gap-12">
  <SectionTitle>
    {$__$.landing.tokenomics.title}
  </SectionTitle>
  {#each $__$.landing.tokenomics.charts as chart}
    <div
      class="w-full mx-auto md:w-3/4 rounded-2xl md:text-2xl text-xs pt-10 pb-12 flex flex-col gap-12 bg-primary-700 bg-opacity-90 {!$isFirefox$
        ? 'md:backdrop-blur-md md:bg-primary-600 md:bg-opacity-30'
        : ''}">
      <div class="font-serif text-center text-3xl md:text-4xl">
        {chart.title}
      </div>
      <div class="w-full aspect-[21/9]">
        <DoughnutChart serif={!$screen$.isMobile} data={chart.items} />
      </div>
    </div>
  {/each}
</div>
