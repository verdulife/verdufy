<script lang="ts">
	import { PlaylistStore, CurrentPlaylist, CurrentSong } from '$lib/stores';
	import Song from '$lib/components/Song.svelte';

	function playPlaylist(playlistName: string) {
		$CurrentPlaylist = playlistName;
		$CurrentSong = 0;
	}
</script>

<svelte:head>
	<title>Playlists</title>
</svelte:head>

<div class="wrapper col acenter xfill">
	{#if $PlaylistStore}
		{#each Object.keys($PlaylistStore) as playlist}
			{#if $PlaylistStore[playlist].length > 0}
				<div class="playlist-title row acenter xfill">
					<h2>{playlist}</h2>
					<button class="outpri semi" on:click={() => playPlaylist(playlist)}>PLAY</button>
				</div>

				<ul class="row acenter xfill">
					{#each $PlaylistStore[playlist] as song, i}
						<Song {playlist} {song} {i} />
					{/each}
				</ul>
			{/if}
		{/each}
	{/if}
</div>

<style lang="scss">
	.wrapper {
		padding: 40px;
	}

	.playlist-title {
		gap: 20px;
		margin-bottom: 20px;

		h2 {
			text-transform: capitalize;
			color: $sec;
		}
	}

	ul {
		gap: 20px;
		margin-bottom: 40px;
	}
</style>
