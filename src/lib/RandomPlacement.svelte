<script lang="ts">
  import cn from 'classnames'
  import _ from 'lodash'
  import { onMount } from 'svelte'
  import { rnd } from './shared/utils/random'

  export let rotate = false
  let className = ''
  export { className as class }
  let x: number
  let y: number
  let deg: number

  onMount(() => {
    x = rnd(0, 100)
    y = rnd(0, 100)
    deg = rotate ? rnd(0, 360) : 0
  })
</script>

<div
  class={cn(
    'absolute',
    x !== undefined && y !== undefined ? 'opacity-100' : 'opacity-0',
    'transition-opacity',
    className,
  )}
  style={cn(
    `top: ${y}%; left: ${x}%;`,
    'transform:',
    deg && `rotate(${deg}deg)`,
    'translate(-50%, -50%, -1px)',
    ';',
  )}>
  <slot />
</div>
