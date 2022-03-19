<script lang="ts">
	import { PlaylistStore, CurrentSong, CurrentPlaylist, fetching, paused } from '$lib/stores';

	let audio: HTMLAudioElement;

	function nextSong() {
		if ($PlaylistStore[$CurrentPlaylist].length === 1) {
			audio.play();
			return;
		}

		if ($CurrentSong + 1 < $PlaylistStore[$CurrentPlaylist].length) {
			$CurrentSong++;
		} else {
			$CurrentSong = 0;
		}
	}

	function prevSong() {
		if ($CurrentSong - 1 > 0) {
			$CurrentSong--;
		} else {
			$CurrentSong = 0;
		}
	}

	$: if (audio) {
		audio.addEventListener('ended', () => {
			nextSong();
		});
	}

	let emptySong = {
		ref: '',
		title: 'Nothing playing',
		thumbnail: '/mobile.png',
		url: ''
	};

	$: currentSong = $PlaylistStore[$CurrentPlaylist][$CurrentSong] || emptySong;
</script>

<footer class="row acenter xfill nowrap">
	<img class:loading={$fetching} src={currentSong.thumbnail} alt={currentSong.title} />

	<div class="meta col jcenter grow">
		<div class="row jbetween xfill">
			<p>{currentSong.title}</p>

			<div class="row">
				<button on:click={prevSong}>PREV</button>
				<button on:click={nextSong}>NEXT</button>
			</div>
		</div>

		<div class="player row xfill">
			<audio
				class="xfill"
				bind:this={audio}
				bind:paused={$paused}
				src={currentSong.url}
				controls
				autoplay
			/>
		</div>
	</div>
</footer>

<style lang="scss">
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 90px;
		background: $black;
		color: $pri;
		border-top: 1px solid $pri;

		img {
			width: 90px;
			height: 90px;
			object-fit: cover;
		}

		.loading {
			animation: 1s fadeIn infinite;
		}

		.meta {
			p {
				font-size: 14px;
				color: $sec;
				padding: 20px;
				padding-bottom: 0;
			}

			button {
				color: $grey;
				font-size: 12px;
				font-weight: lighter;
			}

			audio {
				filter: invert(1);

				&::-webkit-media-controls-panel {
					background: white;
				}
			}
		}
	}
</style>
