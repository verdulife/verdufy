<script lang="ts">
	import { PlaylistStore, CurrentSong, fetching } from '$lib/stores';
	import { query } from '$lib/scripts/query';

	async function updateURL(i: number) {
		$fetching = true;
		const { updateSong } = await query(`
		updateSong(ref: "${$PlaylistStore[i].ref}") {
			url
		}
		`);

		$PlaylistStore[i].url = updateSong.url;
		$CurrentSong = i;
		$fetching = false;
	}

	function playSong(i: number) {
		updateURL(i);
	}

	function removeSong(i: number) {
		$PlaylistStore.splice(i, 1);
		$PlaylistStore = $PlaylistStore;
	}

	$: console.log($fetching);
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="wrapper col acenter xfill">
	<h1>Your songs</h1>

	{#if $PlaylistStore.length > 0}
		<ul class="col acenter xfill">
			{#each $PlaylistStore as { title, thumbnail }, i}
				<li
					class="row acenter nowrap xfill"
					on:click={() => playSong(i)}
					on:dblclick={() => removeSong(i)}
				>
					<img src={thumbnail} alt={title} />
					<h4>{title}</h4>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		background: $white;
		padding: 40px;
		padding-bottom: 140px;

		@media (prefers-color-scheme: dark) {
			background: $black;
		}
	}

	h1 {
		color: $pri;
		margin-bottom: 20px;

		@media (prefers-color-scheme: dark) {
			color: $sec;
		}
	}

	ul {
		max-width: 900px;
		gap: 20px;

		li {
			background: $sec;
			color: $pri;

			img {
				width: 80px;
				height: 80px;
				object-fit: cover;
			}

			h4 {
				padding: 20px;
			}
		}
	}
</style>
