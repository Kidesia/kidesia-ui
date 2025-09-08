<script lang="ts">
	import { ripple } from '$lib/actions/ripple.js';
	import type { Component } from 'svelte';

	export type ButtonProps = {
		Icon?: Component;
		label?: string;
		variant?: 'filled' | 'tonal' | 'outlined' | 'text';
		size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
		width?: 'content' | 'stretch';
		iconOnlyWidth?: 'default' | 'narrow' | 'wide';
		shape?: 'round' | 'square';
		isToggled?: boolean;
		disabled?: boolean;
		inButtonGroup?: boolean;
		inConnectedGroup?: boolean;
		onClick?: () => void;
	};

	const {
		variant = 'filled',
		size = 'small',
		width = 'content',
		iconOnlyWidth = 'default',
		shape = 'round',
		disabled = false,
		isToggled,
		label,
		Icon,
		inButtonGroup,
		inConnectedGroup
	}: ButtonProps = $props();

	const actualShape = $derived(
		shape === 'round' && isToggled && inButtonGroup && !inConnectedGroup
			? 'square'
			: isToggled
				? 'round'
				: shape
	);
</script>

<button
	{disabled}
	type="button"
	class={[
		`variant-${variant}`,
		`size-${size}`,
		`width-${width}`,
		`shape-${actualShape}`,
		`icon-only-width-${iconOnlyWidth}`,
		{
			'is-disabled': disabled,
			'in-button-group': inButtonGroup,
			'in-connected-group': inConnectedGroup,
			[`is-toggled-${isToggled}`]: isToggled !== undefined
		}
	]}
>
	<div class="button" use:ripple={!disabled}>
		{#if Icon}
			<div class="icon"><Icon class="icon" /></div>
		{/if}
		{#if label}
			<div class="label">{label}</div>
		{/if}
	</div>
</button>

<style>
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 3rem;
		appearance: none;
		border: none;
		background: none;
		padding: 0;
		cursor: pointer;
	}

	button > .button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		overflow: hidden;
		user-select: none;
		transition: all var(--duration-fast) var(--easing-back-out);
	}

	button:disabled {
		pointer-events: none;
		opacity: 0.38;
	}

	/* Colors and borders */

	.variant-filled {
		--clr-ripple: rgb(from var(--clr-on-primary) r g b / var(--layer-opacity-2));

		> .button {
			background: var(--clr-primary);
			color: var(--clr-on-primary);
		}

		&:hover > .button,
		&:focus-visible > .button {
			background: color-mix(
				in oklch,
				var(--clr-primary),
				var(--clr-on-primary) var(--layer-opacity-1)
			);
		}
	}

	.variant-filled.is-toggled-false {
		--clr-ripple: rgb(from var(--clr-on-surface-variant) r g b / var(--layer-opacity-2));

		> .button {
			background: var(--clr-surface-container);
			color: var(--clr-on-surface-variant);
		}

		&.is-toggled-false:hover > .button,
		&.is-toggled-false:focus-visible > .button {
			background: color-mix(
				in oklch,
				var(--clr-surface-container),
				var(--clr-on-surface-variant) var(--layer-opacity-1)
			);
		}
	}

	.variant-tonal {
		--clr-ripple: rgb(from var(--clr-on-secondary-container) r g b / var(--layer-opacity-2));

		> .button {
			background: var(--clr-secondary-container);
			color: var(--clr-on-secondary-container);
		}

		&:hover > .button,
		&:focus-visible > .button {
			background: color-mix(
				in oklch,
				var(--clr-secondary-container),
				var(--clr-on-secondary-container) var(--layer-opacity-1)
			);
		}
	}

	.variant-tonal.is-toggled-true {
		--clr-ripple: rgb(from var(--clr-on-secondary) r g b / var(--layer-opacity-2));

		> .button {
			background: var(--clr-secondary);
			color: var(--clr-on-secondary);
		}

		&:hover > .button,
		&:focus-visible > .button {
			background: color-mix(
				in oklch,
				var(--clr-secondary),
				var(--clr-on-secondary) var(--layer-opacity-1)
			);
		}
	}

	.variant-outlined {
		--clr-ripple: rgb(from var(--clr-surface-variant) r g b / var(--layer-opacity-2));

		> .button {
			background: transparent;
			color: var(--clr-on-surface-variant);
			border: 1.5px solid var(--clr-outline-variant);
			--clr-ripple: rgb(from var(--clr-on-surface-variant) r g b / var(--layer-opacity-2));
		}

		&:hover > .button,
		&:focus-visible > .button {
			background: rgb(from var(--clr-on-surface-variant) r g b / var(--layer-opacity-1));
		}
	}

	.variant-outlined.is-toggled-true {
		--clr-ripple: rgb(from var(--clr-inverse-on-surface) r g b / var(--layer-opacity-2));

		> .button {
			background: var(--clr-inverse-surface);
			color: var(--clr-inverse-on-surface);
		}

		&:hover > .button,
		&:focus-visible > .button {
			background: color-mix(
				in oklch,
				var(--clr-inverse-surface),
				var(--clr-inverse-on-surface) var(--layer-opacity-1)
			);
		}
	}

	.variant-text {
		> .button {
			background: transparent;
			color: var(--clr-primary);
			--clr-ripple: rgb(from var(--clr-primary) r g b / var(--layer-opacity-2));
		}

		&:hover > .button,
		&:focus-visible > .button {
			background: rgb(from var(--clr-primary) r g b / var(--layer-opacity-1));
		}
	}

	/* Shapes and sizes */

	.width-stretch,
	.width-stretch > .button {
		width: 100%;
	}

	.size-extra-small {
		> .button {
			height: 2rem;
			padding: 0 0.75rem;
			gap: 0.25rem;
			font-size: 0.9rem;
			line-height: 1.25rem;
		}

		.icon {
			width: 1.25rem;
		}

		&.icon-only-width-narrow > .button {
			min-width: 1.75rem;
		}

		&.icon-only-width-default > .button {
			min-width: 2rem;
		}

		&.icon-only-width-wide > .button {
			min-width: 2.5rem;
		}

		&.shape-round > .button {
			border-radius: 1rem;
		}

		&.shape-square > .button {
			border-radius: 0.75rem;
		}

		&:active > .button {
			border-radius: 0.5rem;
		}
	}

	.size-small {
		> .button {
			height: 2.5rem;
			padding: 0 1rem;
			gap: 0.5rem;
			font-size: 0.9rem;
			line-height: 1.25rem;
		}

		.icon {
			width: 1.25rem;
		}

		&.icon-only-width-narrow > .button {
			min-width: 2rem;
		}

		&.icon-only-width-default > .button {
			min-width: 2.5rem;
		}

		&.icon-only-width-wide > .button {
			min-width: 3.25rem;
		}

		&.shape-round > .button {
			border-radius: 1.25rem;
		}

		&.shape-square > .button {
			border-radius: 0.75rem;
		}

		&:active > .button {
			border-radius: 0.5rem;
		}
	}

	.size-medium {
		> .button {
			height: 3.5rem;
			padding: 0 1.5rem;
			gap: 0.5rem;
			font-size: 1rem;
			line-height: 1.5rem;
		}

		.icon {
			width: 1.5rem;
		}

		&.icon-only-width-narrow > .button {
			min-width: 3rem;
		}

		&.icon-only-width-default > .button {
			min-width: 3.5rem;
		}

		&.icon-only-width-wide > .button {
			min-width: 4.5rem;
		}

		&.shape-round > .button {
			border-radius: 1.75rem;
		}

		&.shape-square > .button {
			border-radius: 1rem;
		}

		&:active > .button {
			border-radius: 0.75rem;
		}
	}

	.size-large {
		> .button {
			height: 6rem;
			padding: 0 3rem;
			gap: 0.75rem;
			font-size: 1.5rem;
			line-height: 2rem;
		}

		.icon {
			width: 2rem;
		}

		&.icon-only-width-narrow > .button {
			min-width: 4rem;
		}

		&.icon-only-width-default > .button {
			min-width: 6rem;
		}

		&.icon-only-width-wide > .button {
			min-width: 8rem;
		}

		&.shape-round > .button {
			border-radius: 3rem;
		}

		&.shape-square > .button {
			border-radius: 1.75rem;
		}

		&:active > .button {
			border-radius: 1rem;
		}
	}

	.size-extra-large {
		> .button {
			height: 8.5rem;
			padding: 0 4rem;
			gap: 1rem;
			font-size: 2rem;
			line-height: 2.5rem;
		}

		.icon {
			width: 2.5rem;
		}

		&.icon-only-width-narrow > .button {
			min-width: 6.5rem;
		}

		&.icon-only-width-default > .button {
			min-width: 8.5rem;
		}

		&.icon-only-width-wide > .button {
			min-width: 11.5rem;
		}

		&.shape-round > .button {
			border-radius: 4.25rem;
		}

		&.shape-square > .button {
			border-radius: 1.75rem;
		}

		&:active > .button {
			border-radius: 1rem;
		}
	}

	/* GroupButton overrides */

	.in-connected-group {
		> .button {
			min-width: 3rem;
		}
	}

	.in-connected-group.is-toggled-false:not(:first-child) {
		&.size-extra-small > .button {
			border-top-left-radius: 0.25rem;
			border-bottom-left-radius: 0.25rem;
		}

		&.size-small > .button,
		&.size-medium > .button {
			border-top-left-radius: 0.5rem;
			border-bottom-left-radius: 0.5rem;
		}

		&.size-large > .button {
			border-top-left-radius: 1rem;
			border-bottom-left-radius: 1rem;
		}

		&.size-extra-large > .button {
			border-top-left-radius: 1.25rem;
			border-bottom-left-radius: 1.25rem;
		}
	}

	.in-connected-group.is-toggled-false:not(:last-child) {
		&.size-extra-small > .button {
			border-top-right-radius: 0.25rem;
			border-bottom-right-radius: 0.25rem;
		}

		&.size-small > .button,
		&.size-medium > .button {
			border-top-right-radius: 0.5rem;
			border-bottom-right-radius: 0.5rem;
		}

		&.size-large > .button {
			border-top-right-radius: 1rem;
			border-bottom-right-radius: 1rem;
		}

		&.size-extra-large > .button {
			border-top-right-radius: 1.25rem;
			border-bottom-right-radius: 1.25rem;
		}
	}
</style>
