<script lang="ts">
  import { __$ } from '$lib/shared/locales'
  import _ from 'lodash'
  import { useWobble } from '$lib/shared/helpers/wobble-svelte'
  import { canHover$ } from '$lib/shared/helpers/media-queries'
  import { onMount } from 'svelte'
  import { animationFrameScheduler, fromEvent, map, skip, take, throttleTime } from 'rxjs'
  import { SpringConfig } from 'wobble'

  export let disabled = false
  export let noAcl = false
  export let noRandom = false
  export let noPointer = false
  export let pointerConfig: Partial<SpringConfig> = { damping: 2.5, stiffness: 4, mass: 0.2 }
  export let randomConfig: Partial<SpringConfig> = { mass: 5, damping: 1000 }
  export let aclConfig: Partial<SpringConfig> = { damping: 1, stiffness: 5, mass: 1 }

  let vh: number = 0
  let vw: number = 0
  let m: { x: number; y: number } = { x: 0, y: 0 }
  $: m = { x: vw / 2, y: vh / 2 }

  function calc(current: number, max: number) {
    return ((max / 2 - current) / (max / 2)) * 22
  }
  let [x, setX, springX] = useWobble({ ...pointerConfig, fromValue: m.x })
  let [y, setY, springY] = useWobble({ ...pointerConfig, fromValue: m.y })

  let hasWorkingAcl = false

  onMount(() => {
    fromEvent<DeviceMotionEvent>(window, 'devicemotion')
      .pipe(skip(1), take(1))
      .subscribe(() => {
        hasWorkingAcl = true
        springX.current.updateConfig(aclConfig)
        springY.current.updateConfig(aclConfig)
      })
  })

  const motion$ = fromEvent<DeviceMotionEvent>(window, 'devicemotion').pipe(
    throttleTime(60, animationFrameScheduler, { leading: true, trailing: true }),
    map(e => ({
      x: e.accelerationIncludingGravity?.x ?? 0,
      y: e.accelerationIncludingGravity?.y ?? 0,
      z: e.accelerationIncludingGravity?.z ?? 0,
    })),
  )

  $: {
    if (hasWorkingAcl && !disabled && !noAcl) {
      setX(calc($motion$.x + 15, 30) * 2)
      setY(calc($motion$.z + 15, 30) * 2)
    }
  }

  $: {
    if (!$canHover$ && !noRandom) {
      setTimeout(() => {
        if (hasWorkingAcl) {
          return
        }
        springX.current.updateConfig(randomConfig)
        springY.current.updateConfig(randomConfig)
        const newX = _.throttle(
          (v: number, x: number) => {
            //TODO: derive new value from current value
            if (v < 0.01) {
              setX(calc(Math.random() * vw * 0.5 + (vw * (1 - 0.5)) / 2, vw))
            }
          },
          1000,
          { leading: true, trailing: true },
        )
        const newY = _.throttle(
          (v: number, y: number) => {
            //TODO: derive new value from current value
            if (v < 0.01) {
              setY(calc(Math.random() * vh * 0.5 + (vh * (1 - 0.5)) / 2, vh))
            }
          },
          1000,
          { leading: true, trailing: true },
        )
        newX(0, 0)
        newY(0, 0)
        springX.current.onUpdate(x => {
          !disabled && newX(x.currentVelocity, x.currentValue)
        })
        springY.current.onUpdate(y => {
          !disabled && newY(y.currentVelocity, y.currentValue)
        })
      }, 1000)
    }
  }
  $: {
    if (!disabled && !noPointer) {
      setX(calc(m.x, vw))
      setY(calc(m.y, vh))
    }
  }
  $: {
    if (disabled) {
      setX(calc(vw / 2, vw))
      setY(calc(vh / 2, vh))
    }
  }

  function transform(
    multiplier: number = 1,
    verticalMultiplier: number = 0.2,
    aclVerticalMultiplier: number = 1,
  ) {
    return (x: number, y: number) =>
      `transform: translate(${x * multiplier}px,${
        y * (hasWorkingAcl ? aclVerticalMultiplier : multiplier) * verticalMultiplier
      }px); will-change: transform;`
  }
</script>

<svelte:window
  bind:innerHeight={vh}
  bind:innerWidth={vw}
  on:pointermove={_.throttle(e => (m = { x: e.clientX, y: e.clientY }), 50, {
    leading: true,
    trailing: true,
  })} />

<slot x={$x} y={$y} {hasWorkingAcl} {transform} />
