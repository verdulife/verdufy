<nav class="row jbetween acenter xfill">
	<a href="/">
		<img class="yfill" src="/favicon.svg" alt="Logo" />
	</a>

	<div class="row">
		<a class="btn sec semi" href="/">HOME</a>
		<a class="btn sec semi" href="/about">ABOUT</a>
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
			margin: 0 10px;
		}
	}
</style>
