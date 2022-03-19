<script context="module">
	export async function load({ url }) {
		return {
			props: { url }
		};
	}
</script>

<script lang="ts">
	import 'verdu/fonts/circular.css';
	import 'verdu/fonts/operator.css';

	import Transition from '$lib/components/Transition.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Player from '$lib/components/Player.svelte';

	import { fetching, paused } from '$lib/stores';

	export let url: string;

	$: console.log('Fetching', $fetching);
	$: console.log('Paused', $paused);
</script>

<main>
	<Nav />

	<div class="scroll">
		<Transition {url}>
			<slot />
		</Transition>
	</div>

	<Player />
</main>

<style lang="scss">
	:global {
		@import 'verdu/_reset.scss';
		@import 'verdu/verdu.scss';
	}

	main {
		background: $white;

		@media (prefers-color-scheme: dark) {
			background: $black;
		}
	}

	.scroll {
		width: calc(100% - 200px);
		height: calc(100% - 90px);
		margin-left: 200px;
	}
</style>
