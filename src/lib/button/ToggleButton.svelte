<script lang="ts">
	import type { Component } from 'svelte';
	import Button from './InternalButton.svelte';

	type ToggleButtonProps = {
		Icon?: Component;
		ToggledIcon?: Component;
		label?: string;
		toggledLabel?: string;
		isToggled: boolean;
		variant?: 'filled' | 'tonal' | 'outlined';
		size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
		width?: 'content' | 'stretch';
		shape?: 'round' | 'square';
		disabled?: boolean;
		onClick?: () => void;
	};

	let {
		isToggled = $bindable(),
		Icon,
		ToggledIcon,
		label,
		shape,
		toggledLabel,
		onClick,
		...props
	}: ToggleButtonProps = $props();

	function toggle() {
		if (onClick) {
			onClick();
		} else {
			isToggled = !isToggled;
		}
	}
</script>

<Button
	{...props}
	{isToggled}
	Icon={isToggled ? (ToggledIcon ?? Icon) : Icon}
	label={isToggled ? (toggledLabel ?? label) : label}
	shape={isToggled ? 'square' : shape}
	onClick={toggle}
/>
