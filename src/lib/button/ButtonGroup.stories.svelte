<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';

	import ButtonGroup from './ButtonGroup.svelte';

	import '../global.css';

	const { Story } = defineMeta({
		title: 'Example/ButtonGroup',
		component: ButtonGroup,
		tags: ['autodocs']
	});
</script>

<Story
	name="Default"
	args={{
		items: [
			{ label: 'Button 1', isToggled: false },
			{ label: 'Button 2', isToggled: true },
			{ label: 'Button 3', isToggled: false },
			{ label: 'Button 4', isToggled: false }
		]
	}}
/>

<Story
	name="Connected"
	args={{
		connected: true,
		items: [
			{ label: 'Button 1', isToggled: false },
			{ label: 'Button 2', isToggled: true },
			{ label: 'Button 3', isToggled: false },
			{ label: 'Button 4', isToggled: false }
		]
	}}
/>

<Story
	name="Square"
	args={{
		shape: 'square',
		items: [
			{ label: 'Button 1', isToggled: false },
			{ label: 'Button 2', isToggled: true },
			{ label: 'Button 3', isToggled: false },
			{ label: 'Button 4', isToggled: false }
		]
	}}
/>

<Story
	name="Square Connected"
	args={{
		shape: 'square',
		connected: true,
		items: [
			{ label: 'Button 1', isToggled: false },
			{ label: 'Button 2', isToggled: true },
			{ label: 'Button 3', isToggled: false },
			{ label: 'Button 4', isToggled: false }
		]
	}}
/>
