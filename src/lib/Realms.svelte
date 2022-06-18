<script lang="ts">
  import _ from 'lodash'
  import { writable } from 'svelte/store'
  import Image from './Image.svelte'
  import RealmPlanet from './RealmPlanet.svelte'
  import SectionTitle from './SectionTitle.svelte'
  import { canHover$, screen$ } from './shared/helpers/media-queries'
  import { __$ } from './shared/locales'
  import ToolTip from './shared/ToolTip.svelte'
  import { Realms } from './shared/types/enga'

  let isLoadingEnga = true
  let hovering = writable<{ realm: Realms; sticky: boolean; isLeaving: boolean } | null>(null)
</script>

<div class="flex flex-col gap-12 relative">
  <SectionTitle
    class="transition-opacity duration-700 {isLoadingEnga ? 'opacity-0' : 'opacity-100'}">
    {$__$.landing.realms.title}
  </SectionTitle>
  <div class="flex flex-col gap-8 md:gap-0 md:-space-y-[14%]">
    <div class="flex justify-center md:mb-[9%]">
      <div
        class="flex flex-col items-center transition-opacity duration-500 {$hovering !== null
          ? 'opacity-20'
          : 'opacity-100'}">
        <Image
          noLazy
          src="/realms/planets/enga.png"
          on:load={() => (isLoadingEnga = false)}
          class={{ container: 'w-72 h-72 md:w-60 md:h-60' }} />
        <div
          class="font-serif text-2xl lg:text-3xl transition-opacity duration-700 delay-700 {isLoadingEnga
            ? 'opacity-0'
            : 'opacity-100'}">
          {_.upperCase($__$.EngaVerse.engaland)}
        </div>
      </div>
    </div>
    <div
      class="flex flex-col md:flex-row justify-center md:-translate-y-[10%] gap-8 md:gap-[60%] pointer-events-none">
      <RealmPlanet {hovering} let:hasLoaded realm={Realms.sigr}>
        <Image noLazy slot="icon" src="/realms/planets/sigr.png" on:load={hasLoaded} />
        <Image
          noLazy
          slot="bg"
          cover
          src="/realms/bg/sigr.png"
          class={{ img: 'object-[22%] md:object-[60%]' }} />
        <Image
          noLazy
          slot="character"
          src="/realms/character/sigr.png"
          class={{ img: 'object-bottom' }} />
        <svelte:fragment slot="tooltip">
          {#if $screen$.isMobile}
            <ToolTip
              fadeParams={{ duration: 700, delay: 1000 }}
              className={{
                position: 'top-[40%] left-1/2',
                class:
                  '!py-2 !rounded-2xl flex flex-col gap-1 font-serif text-2xl leading-none shadow-lg shadow-[#0006] pointer-events-none',
              }}>
              <div>Learn more about Engaverse</div>
              <div class="animate-bounce">
                {`>`} Tap the planets {`<`}
              </div>
            </ToolTip>
          {/if}
        </svelte:fragment>
      </RealmPlanet>
      <RealmPlanet {hovering} let:hasLoaded realm={Realms.ufm}>
        <Image noLazy slot="icon" src="/realms/planets/ufm.png" on:load={hasLoaded} />
        <Image noLazy slot="bg" cover src="/realms/bg/ufm.jpeg" class={{ img: 'object-[12%]' }} />
        <Image
          noLazy
          slot="character"
          class={{ img: 'object-bottom' }}
          src="/realms/character/ufm.png" />
      </RealmPlanet>
    </div>
    <div class="flex flex-col md:flex-row justify-center gap-8 md:gap-[25%] pointer-events-none">
      <RealmPlanet {hovering} let:hasLoaded realm={Realms.magesta}>
        <Image noLazy slot="icon" src="/realms/planets/magesta.png" on:load={hasLoaded} />
        <Image
          noLazy
          slot="bg"
          cover
          src="/realms/bg/magesta.png"
          class={{ img: 'object-[25%] md:object-center' }} />
        <Image
          noLazy
          slot="character"
          class={{ img: 'object-bottom' }}
          src="/realms/character/magesta.png" />
      </RealmPlanet>
      <RealmPlanet {hovering} let:hasLoaded realm={Realms.nubia}>
        <Image noLazy slot="icon" src="/realms/planets/nubia.png" on:load={hasLoaded} />
        <Image
          noLazy
          slot="bg"
          cover
          src="/realms/bg/nubia.png"
          class={{ img: 'object-[10%] md:object-[15%]' }} />
        <Image
          noLazy
          slot="character"
          class={{ img: 'object-bottom' }}
          src="/realms/character/nubia.png" />
      </RealmPlanet>
    </div>
    <div
      class="flex justify-center md:-translate-y-[calc(25%-4vw)] lg:-translate-y-[8%] pointer-events-none">
      <RealmPlanet {hovering} let:hasLoaded realm={Realms.komorebi}>
        <Image noLazy slot="icon" src="/realms/planets/komorebi.png" on:load={hasLoaded} />
        <Image
          noLazy
          slot="bg"
          cover
          src="/realms/bg/komorebi.jpeg"
          class={{ img: 'object-left' }} />
        <Image
          noLazy
          slot="character"
          class={{ img: 'object-bottom' }}
          src="/realms/character/komorebi.png" />
        <svelte:fragment slot="tooltip">
          {#if !$screen$.isMobile && !$canHover$}
            <ToolTip
              fadeParams={{ duration: 700, delay: 1200 }}
              className={{
                position: 'md:top-[45%] left-1/2',
                class:
                  '-hue-rotate-30 brightness-75 saturate-200 !py-2 !rounded-2xl flex flex-col gap-1 font-serif text-xl leading-none shadow-lg shadow-[#0006] pointer-events-none',
              }}>
              <div>Learn more about Engaverse</div>
              <div class="animate-bounce">
                {`>`} Tap the planets {`<`}
              </div>
            </ToolTip>
          {/if}
        </svelte:fragment>
      </RealmPlanet>
    </div>
  </div>
</div>
