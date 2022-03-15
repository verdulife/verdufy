<script>
	import { page } from '$app/stores';
</script>

<nav class="row jbetween acenter xfill">
	<a href="/">
		<img height="30" src="/favicon.svg" alt="Logo" />
	</a>

	<div class="row">
		<a class="btn" class:active={$page.url.pathname === '/'} href="/">SEARCH</a>
		<a class="btn" class:active={$page.url.pathname === '/playlists'} href="/playlists">PLAYLISTS</a
		>
		<a class="btn" class:active={$page.url.pathname === '/queue'} href="/queue">QUEUE</a>
	</div>
</nav>

<style lang="scss">
	nav {
		position: sticky;
		inset: 0 0 auto 0;
		background: $white;
		border-bottom: 1px solid $border;
		padding: 20px;

		@media (prefers-color-scheme: dark) {
			border-bottom: 1px solid $pri;
			background: $black;
		}

		a {
			color: $grey;
			margin: 0 10px;
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
