<script lang="ts">
	import type { songType } from '$lib/types';

	import {
		PlaylistStore,
		LastSearchStore,
		CurrentSong,
		CurrentPlaylist,
		fetching
	} from '$lib/stores';
	import { query } from '$lib/scripts/query';

	let searchTerm: String;
	let results: songType[] = $LastSearchStore;

	async function searchSongs() {
		$fetching = true;

		const { searchSongs } = await query(`
			searchSongs(term: "${searchTerm}") {
				ref
				title
				thumbnail
				url
			}
		`);

		results = searchSongs;
		$LastSearchStore = results;
		$fetching = false;
	}

	function addSong(song: songType) {
		$PlaylistStore.queue.forEach((item: songType, i: number) => {
			if (item.ref === song.ref) {
				$PlaylistStore.queue.splice(i, 1);
			}
		});

		$PlaylistStore.queue = [song, ...$PlaylistStore.queue];
		$CurrentPlaylist = 'queue';
		$CurrentSong = 0;
	}
</script>

<svelte:head>
	<title>Verdufy 🎵</title>
</svelte:head>

<div class="wrapper col xfill">
	<form class="col acenter xfill" class:loading={$fetching} on:submit|preventDefault={searchSongs}>
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
		color: $pri;
		padding: 40px;

		@media (prefers-color-scheme: dark) {
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
			transition: 200ms ease;

			&:hover {
				transform: scale(0.99);
				border: 2px solid #000;
				box-shadow: inset 0 0 40px 20px rgba(#000, 1);
			}

			h4 {
				background: linear-gradient(to top, rgba(#000, 0.7), rgba(#000, 0));
				color: $white;
				font-size: 16px;
				padding: 20px;
			}
		}
	}
</style>
