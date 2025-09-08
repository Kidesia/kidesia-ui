<script lang="ts">
	import type { Component } from 'svelte';
	import Button from './InternalButton.svelte';

	type ButtonGroupItem = {
		Icon?: Component;
		label?: string;
		isToggled: boolean;
		disabled?: boolean;
	};

	type ButtonGroupProps = {
		items: ButtonGroupItem[];
		connected?: boolean;
		shape?: 'round' | 'square';
		variant?: 'filled' | 'tonal' | 'outlined';
		size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
		width?: 'content' | 'stretch';
	};

	let {
		items,
		connected = false,
		variant = 'filled',
		size = 'small',
		width = 'content',
		shape = 'round'
	}: ButtonGroupProps = $props();
</script>

<div class={['button-group', `size-${size}`, { 'is-connected': connected }]}>
	{#each items as item, i (i)}
		<Button {...item} inButtonGroup {size} {width} {shape} inConnectedGroup={!!connected} />
	{/each}
</div>

<style>
	.button-group {
		display: flex;

		&.size-extra-small {
			gap: 1.2rem;
		}

		&.size-small {
			gap: 0.75rem;
		}

		&.size-medium,
		&.size-large,
		&.size-extra-large {
			gap: 0.5rem;
		}
	}

	.button-group.is-connected {
		&.size-extra-small,
		&.size-small,
		&.size-medium,
		&.size-large,
		&.size-extra-large {
			gap: 0.15rem;
		}
	}
</style>
