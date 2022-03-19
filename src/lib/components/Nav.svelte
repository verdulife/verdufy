<script>
	import { page } from '$app/stores';
</script>

<nav class="col jcenter acenter yfill">
	<a class="logo" href="/">
		<img height="30" src="/favicon.svg" alt="Logo" />
	</a>

	<div class="row">
		<a class="btn" class:active={$page.url.pathname === '/'} href="/">SEARCH</a>
		<a class="btn" class:active={$page.url.pathname === '/playlists'} href="/playlists">PLAYLISTS</a
		>
	</div>
</nav>

<style lang="scss">
	nav {
		position: fixed;
		inset: 0 auto auto 0;
		width: 200px;
		height: calc(100% - 90px);
		background: $white;
		border-right: 1px solid $sec;
		padding: 20px;

		@media (prefers-color-scheme: dark) {
			border-right: 1px solid $pri;
			background: $black;
		}

		.logo {
			position: absolute;
			top: 20px;
		}

		a {
			color: $grey;
			margin: 10px 0;
			transition: 200ms;

			&:hover {
				color: $sec;
			}
		}

		.active {
			color: $sec;
		}
	}
</style>
