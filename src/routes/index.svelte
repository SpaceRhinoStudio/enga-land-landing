<script lang="ts">
  import Hero from '$lib/Hero.svelte'
  import MainBackground from '$lib/MainBackground.svelte'
  import Realms from '$lib/Realms.svelte'
  import Waypoint from 'svelte-waypoint'

  import { __$ } from '$lib/shared/locales'
  import _ from 'lodash'
  import { fade } from 'svelte/transition'
  import SectionTitle from '$lib/SectionTitle.svelte'
  import Features from '$lib/Features.svelte'
  import Roadmap from '$lib/Roadmap.svelte'
  import Technologies from '$lib/Technologies.svelte'
  import Partners from '$lib/Partners.svelte'

  let isTeaserLoading = true
</script>

<Hero />

<div class="relative mb-48">
  <MainBackground />
  <div class="relative flex flex-col gap-48">
    <!-- teaser -->
    <div
      class="flex flex-col md:flex-row-reverse gap-6 justify-evenly items-start h-96 sm:h-[calc(theme(spacing.96)+theme(spacing.36))] md:h-72">
      <div
        class="md:w-1/2 flex flex-col gap-4 md:mt-9 lg:mt-6 transition-opacity duration-500 {isTeaserLoading
          ? 'opacity-0'
          : 'opacity-100'}">
        <SectionTitle>
          {$__$.landing.teaser.title}
        </SectionTitle>
        <div class="text-sm md:text-base text-justify">{$__$.landing.teaser.subtitle}</div>
      </div>
      <Waypoint
        class="!flex justify-center w-full md:w-1/2 self-center"
        once
        threshold={1}
        offset={0}>
        <video
          on:loadedmetadata={() => (isTeaserLoading = false)}
          class="max-w-full h-full rounded-2xl shadow-lg shadow-[#0003] border border-primary-700 transition-opacity delay-200 duration-500 {isTeaserLoading
            ? 'opacity-0'
            : 'opacity-100'}"
          controls>
          <track kind="captions" />
          <source src="/about-video.mp4" type="video/mp4" />
        </video>
      </Waypoint>
    </div>
    <Realms />
    <Features />
    <Roadmap />
  </div>
</div>
<Partners />
<Technologies />
