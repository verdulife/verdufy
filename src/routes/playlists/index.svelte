<script lang="ts">
	import type { songType } from '$lib/types';

	import { PlaylistStore, CurrentPlaylist, CurrentSong, fetching, paused } from '$lib/stores';
	import { query } from '$lib/scripts/query';

	async function playSong(playlisName: string, i: number) {
		$fetching = true;
		const { updateSong } = await query(`
			updateSong(ref: "${$PlaylistStore[playlisName][i].ref}") {
				url
			}
		`);

		$PlaylistStore[playlisName][i].url = updateSong.url;
		$CurrentPlaylist = playlisName;
		$CurrentSong = i;
		$fetching = false;
	}

	function removeSong(playlisName: string, i: number) {
		$PlaylistStore[playlisName].splice(i, 1);
		$PlaylistStore = $PlaylistStore;
	}

	function addToPlaylist(i: number) {
		const prompt = window.prompt('Enter playlist name').toLocaleLowerCase();

		if (prompt) {
			let song = $PlaylistStore[$CurrentPlaylist][i];
			const playlistExists = Object.keys($PlaylistStore).find((key) => key === prompt);

			if (!playlistExists) {
				$PlaylistStore[prompt] = [song];
			} else {
				$PlaylistStore[prompt].forEach((item: songType, i: number) => {
					if (item.ref === song.ref) {
						$PlaylistStore[prompt].splice(i, 1);
					}
				});

				$PlaylistStore[prompt] = [song, ...$PlaylistStore[prompt]];
				$CurrentPlaylist = prompt;
				$CurrentSong = 0;
			}
		}
	}

	function playPlaylist(playlistName: string) {
		$CurrentPlaylist = playlistName;
		$CurrentSong = 0;
	}
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="wrapper col acenter xfill">
	{#if $PlaylistStore}
		{#each Object.keys($PlaylistStore) as playlist}
			{#if $PlaylistStore[playlist].length > 0}
				<div class="playlist-title row jbetween acenter xfill">
					<h2>{playlist}</h2>
					<button class="outpri semi" on:click={() => playPlaylist(playlist)}>PLAY</button>
				</div>

				<ul class="col acenter xfill">
					{#each $PlaylistStore[playlist] as { title, thumbnail }, i}
						<li class="row jbetween acenter nowrap xfill">
							<div class="metadata row acenter" on:click={() => playSong(playlist, i)}>
								<div
									class="thumbnail"
									class:playing={!$paused && $CurrentPlaylist === playlist && $CurrentSong === i}
								>
									<img class="fill" src={thumbnail} alt={title} />
								</div>

								<p>{title}</p>
							</div>

							<div class="row">
								<button class="pri semi" on:click={() => removeSong(playlist, i)}>DEL</button>
								<button class="pri semi" on:click={() => addToPlaylist(i)}>ADD</button>
							</div>
						</li>
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
		margin-bottom: 20px;

		h2 {
			text-transform: capitalize;
			color: $sec;
		}
	}

	ul {
		max-width: 900px;
		margin-bottom: 40px;

		li {
			color: $sec;
			border-bottom: 1px solid $pri;
			padding: 20px;

			.metadata {
				cursor: pointer;
			}

			.thumbnail {
				position: relative;
				width: 80px;
				height: 80px;

				img {
					object-fit: cover;
				}
			}

			.playing {
				&::after {
					content: '';
					position: absolute;
					bottom: -5px;
					right: -5px;
					display: flex;
					width: 10px;
					height: 10px;
					background: red;
					border-radius: 50%;
					animation: pulse 1s infinite ease-in-out;
				}
			}

			p {
				text-transform: lowercase;
				padding: 20px;

				&::first-letter {
					text-transform: uppercase;
				}
			}

			button {
				margin-left: 5px;
			}
		}
	}

	@keyframes pulse {
		0% {
			transform: scale(1);
			opacity: 0.5;
		}

		50% {
			transform: scale(1.1);
			opacity: 1;
		}

		100% {
			transform: scale(1);
			opacity: 0.5;
		}
	}
</style>
