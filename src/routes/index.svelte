<script lang="ts">
	import { message } from '$lib/scripts/utils';
	import { PlaylistStore } from '$lib/stores';
	import type { songType } from '$lib/types';

	let searchTerm: String;
	let limit: Number = 1;
	let songs: [] = [];
	let loading: Boolean = false;

	async function searchSongs() {
		loading = true;

		const req = await fetch('/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `query {
  				songs(term: "${searchTerm}", limit: ${limit}) {
						ref
    				title
    				thumbnail
    				url
					}
				}`
			})
		});
		const res = await req.json();

		if (res.errors) alert('Something went wrong');
		else {
			songs = res.data.songs;
		}

		loading = false;
	}

	function playSong(song: songType) {
		$PlaylistStore = [song, ...$PlaylistStore];

		console.log($PlaylistStore);
	}
</script>

<svelte:head>
	<title>{message}</title>
</svelte:head>

<div class="wrapper col acenter xfill">
	<h1>Search for a song</h1>

	<form class="col acenter xfill" on:submit|preventDefault={searchSongs}>
		<input class="white semi xhalf" type="text" bind:value={searchTerm} placeholder="Ej. Guajiro" />
	</form>

	{#if loading}
		<p>Loading...</p>
	{/if}

	{#if songs.length > 0}
		<ul class="row jcenter xfill">
			{#each songs as { title, thumbnail }, i}
				<li class="col acenter" on:click={() => playSong(songs[i])}>
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
		color: $pri;
		padding: 40px;

		@media (prefers-color-scheme: dark) {
			background: $black;
			color: $sec;
		}
	}

	h1,
	form {
		margin-bottom: 20px;
	}

	ul {
		gap: 20px;

		li {
			width: 300px;
			height: 300px;
			background: $sec;
			color: $pri;

			img {
				width: 100%;
				margin-bottom: 10px;
			}

			h4 {
				margin-bottom: auto;
			}
		}
	}
</style>
