<script lang="ts">
	import type { songType } from '$lib/types';
	import { PlaylistStore, CurrentPlaylist, CurrentSong, paused } from '$lib/stores';

	export let playlist: string;
	export let song: songType;
	export let i: number;
	let action: string;

	async function playSong(playlistName: string, i: number) {
		$CurrentPlaylist = playlistName;
		$CurrentSong = i;
	}

	function removeSong(playlistName: string, i: number) {
		$PlaylistStore[playlistName].splice(i, 1);
		$PlaylistStore = $PlaylistStore;
	}

	function addToPlaylist(playlistName: string, i: number) {
		let toPlaylist: string;

		if (!playlistName) {
			const prompt = window.prompt('Enter playlist name').toLocaleLowerCase();

			if (prompt) {
				toPlaylist = prompt;
			}
		}

		let song = $PlaylistStore[$CurrentPlaylist][i];
		const playlistExists = Object.keys($PlaylistStore).find((key) => key === toPlaylist);

		if (!playlistExists) {
			$PlaylistStore[toPlaylist] = [song];
		} else {
			$PlaylistStore[toPlaylist].forEach((item: songType, i: number) => {
				if (item.ref === song.ref) {
					$PlaylistStore[toPlaylist].splice(i, 1);
				}
			});
		}

		$PlaylistStore[toPlaylist] = [song, ...$PlaylistStore[toPlaylist]];
		$CurrentPlaylist = toPlaylist;
		$CurrentSong = 0;
	}

	function evalAction() {
		if (action === 'remove') removeSong(playlist, i);
		else if (action === 'new') addToPlaylist(null, i);
		else addToPlaylist(playlist, i);
	}
</script>

<div class="wrapper row">
	<div
		class="thumbnail"
		class:playing={!$paused && $CurrentPlaylist === playlist && $CurrentSong === i}
	>
		<img class="fill" src={song.thumbnail} alt={song.title} />
	</div>

	<div class="meta col jbetween yfill">
		<p class="title">{song.title}</p>

		<div class="cta row jend xfill">
			<button class="sec semi" on:click={() => playSong(playlist, i)}>PLAY</button>
			<select bind:value={action} on:change={evalAction}>
				<option value="" disabled>Actions</option>
				<optgroup label="Add to">
					<option value="new">New playlist</option>

					{#each Object.keys($PlaylistStore) as playlist}
						<option value={playlist}>To {playlist}</option>
					{/each}
				</optgroup>

				<optgroup label="Others">
					<option value="remove">Remove song</option>
				</optgroup>
			</select>
		</div>
	</div>
</div>

<style lang="scss">
	.wrapper {
		height: 180px;
		background: rgba($pri, 0.3);
		border-radius: 10px;
		padding: 15px;
	}

	.thumbnail {
		width: 150px;
		height: 150px;
		border-radius: 5px;
		overflow: hidden;

		img {
			object-fit: cover;
		}
	}

	.playing {
		animation: pulse 1s infinite ease-in-out;
	}

	.meta {
		width: 250px;
		padding-left: 20px;

		p {
			color: $sec;
			font-size: 14px;
			text-transform: lowercase;

			&::first-letter {
				text-transform: capitalize;
			}
		}

		.cta {
			gap: 10px;

			button {
				font-size: 12px;
			}
		}
	}

	@keyframes pulse {
		0% {
			box-shadow: 0 0 9px 0 rgba($sec, 0.2);
		}

		50% {
			box-shadow: 0 0 12px 0 rgba($sec, 0.4);
		}

		100% {
			box-shadow: 0 0 9px 0 rgba($sec, 0.2);
		}
	}
</style>
