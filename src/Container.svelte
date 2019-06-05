<style>
.content {
	margin: 0 auto 50px;
	max-width: 800px;
	padding: 0 2em;
}
</style>

<main>
	<slot name="header"></slot>

	<div class="content">
		<slot name="content"></slot>
	</div>

	<slot name="footer"></slot>
</main>
