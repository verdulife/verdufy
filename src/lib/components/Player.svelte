<script lang="ts">
	import { CurrentSong } from '$lib/stores';

	let audio: HTMLAudioElement;
</script>

{#if $CurrentSong}
	<footer class="row acenter xfill">
		<img src={$CurrentSong.thumbnail} alt={$CurrentSong.title} />

		<div class="meta col jend grow">
			<p>{$CurrentSong.title}</p>
			<audio class="xfill" bind:this={audio} src={$CurrentSong.url} controls autoplay />
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
