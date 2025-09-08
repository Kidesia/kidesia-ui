<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { fn } from 'storybook/test';

	import ToggleButton from './ToggleButton.svelte';

	import '../global.css';

	const { Story } = defineMeta({
		title: 'Example/ToggleButton',
		component: ToggleButton,
		tags: ['autodocs'],
		args: {
			onclick: fn()
		}
	});
</script>

<Story name="Regular" args={{ label: 'Toggle me' }} />
