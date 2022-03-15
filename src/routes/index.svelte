<script lang="ts">
	import type { songType } from '$lib/types';

	import { PlaylistStore, LastSearchStore } from '$lib/stores';
	import { query } from '$lib/scripts/query';

	let searchTerm: String;
	let results: songType[] = $LastSearchStore;
	let loading: Boolean = false;

	async function searchSongs() {
		loading = true;

		results = await query(`
			searchSongs(term: "${searchTerm}") {
				ref
				title
				thumbnail
				url
			}
		`);

		$LastSearchStore = results;
		loading = false;
	}

	function addSong(song: songType) {
		song.playlist = 'default';
		$PlaylistStore = [song, ...$PlaylistStore];
	}
</script>

<svelte:head>
	<title>Verdufy 🎵</title>
</svelte:head>

<div class="wrapper col xfill">
	<form class="col acenter xfill" class:loading on:submit|preventDefault={searchSongs}>
		<input
			class="xfill"
			type="text"
			bind:value={searchTerm}
			placeholder="Search by title or artist name"
			autofocus
		/>
	</form>

	{#if results.length > 0}
		<ul class="row xfill">
			{#each results as { title, thumbnail }, i}
				<li
					class="col acenter"
					style="background-image: url({thumbnail})"
					on:click={() => addSong(results[i])}
				>
					<h4 class="row aend fill">{title}</h4>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style lang="scss">
	.wrapper {
		background: $white;
		color: $pri;
		padding: 20px 40px;
		padding-bottom: 140px;

		@media (prefers-color-scheme: dark) {
			background: $black;
			color: $sec;
		}
	}

	form {
		max-width: 900px;
		margin-bottom: 20px;

		input {
			font-size: 40px;
			color: $sec;
		}
	}

	.loading {
		animation: 1s fadeIn infinite;

		input {
			color: $pri;
		}
	}

	ul {
		gap: 20px;

		li {
			cursor: pointer;
			width: 20vw;
			max-width: 300px;
			height: 20vw;
			max-height: 300px;
			background-color: $sec;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			border-radius: 10px;
			color: $pri;
			overflow: hidden;

			h4 {
				background: linear-gradient(to top, rgba(#000, 0.7), rgba(#000, 0));
				color: $white;
				font-size: 16px;
				padding: 20px;
				transition: 200ms ease-in;

				&:hover {
					box-shadow: inset 0 0 40px 20px rgba(#000, 1);
				}
			}
		}
	}
</style>
