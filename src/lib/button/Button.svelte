<script lang="ts">
	import type { Component } from 'svelte';
	import InternalButton from './InternalButton.svelte';

	type ButtonProps = {
		Icon?: Component;
		label?: string;
		variant?: 'filled' | 'tonal' | 'outlined' | 'text';
		size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
		width?: 'content' | 'stretch';
		iconOnlyWidth?: 'default' | 'narrow' | 'wide';
		shape?: 'round' | 'square';
		disabled?: boolean;
		onClick?: () => void;
	};

	const { ...props }: ButtonProps = $props();
</script>

<InternalButton {...props} />
