<script lang="ts">
	import { PlaylistStore } from '$lib/stores';

	let currentSongIndex: number = 0;
	$: currentSong = $PlaylistStore[currentSongIndex];

	async function getSong() {
		const req = await fetch('/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				query: `query {
  				songRef(ref: "${currentSong.ref}") {
						url
					}
				}`
			})
		});
		const res = await req.json();

		console.log(res);

		if (res.errors) alert('Something went wrong');
		else {
			$PlaylistStore[currentSongIndex].url = res.data.songRef.url;
		}
	}

	let audio: HTMLAudioElement;

	$: if (audio) {
		audio.addEventListener('ended', () => {
			if (currentSongIndex + 1 < $PlaylistStore.length) {
				currentSongIndex++;
			} else {
				currentSongIndex = 0;
			}
		});
	}

	$: if (currentSong) {
		//getSong();
	}
</script>

{#if currentSong}
	<footer class="row acenter xfill">
		<img src={currentSong.thumbnail} alt={currentSong.title} />

		<div class="meta col jend grow">
			<p>{currentSong.title}</p>
			<audio class="xfill" bind:this={audio} src={currentSong.url} controls autoplay />
		</div>
	</footer>
{/if}

<style lang="scss">
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 90px;
		background: $sec;
		color: $pri;

		img {
			width: 90px;
			height: 90px;
			object-fit: cover;
		}

		.meta {
			height: 100%;
			padding: 0 20px;

			audio::-webkit-media-controls-panel {
				background: white;
			}
		}
	}
</style>
