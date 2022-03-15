<script lang="ts">
	import { browser } from '$app/env';

	import { PlaylistStore, CurrentSong } from '$lib/stores';

	$: currentSong = $PlaylistStore[$CurrentSong];

	$: if ($PlaylistStore.length) {
		$CurrentSong = 0;
	}

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
			$PlaylistStore[$CurrentSong].url = res.data.songRef.url;
		}
	}

	let audio: HTMLAudioElement;

	function nextSong() {
		if ($PlaylistStore.length === 1) {
			audio.play();
			return;
		}

		if ($CurrentSong + 1 < $PlaylistStore.length) {
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
</script>

{#if currentSong}
	<footer class="row acenter xfill nowrap">
		<img src={currentSong.thumbnail} alt={currentSong.title} />

		<div class="meta col jend grow">
			<div class="row jbetween xfill">
				<p>{currentSong.title}</p>

				<div class="row">
					<button on:click={prevSong}>PREV</button>
					<button on:click={nextSong}>NEXT</button>
				</div>
			</div>

			<audio class="xfill" bind:this={audio} controls autoplay>
				<source src={currentSong.url} type="audio/webm" />
			</audio>
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
