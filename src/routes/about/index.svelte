<svelte:head>
	<title>About</title>
</svelte:head>

<div class="wrapper row jcenter xfill">
	<h1>About page</h1>
</div>

<style lang="scss">
	.wrapper {
		background: $white;
		padding: 15% 40px;

		@media (prefers-color-scheme: dark) {
			background: $black;
		}
	}

	h1 {
		color: $pri;

		@media (prefers-color-scheme: dark) {
			color: $sec;
		}
	}
</style>
