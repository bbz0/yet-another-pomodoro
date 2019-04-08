<template>
	<header>
		<b-navbar class="navigation" toggleable="lg" type="dark">
			<div class="container">
				<b-navbar-brand>YAP App</b-navbar-brand>
				<b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
				<b-collapse id="nav-collapse" is-nav>
					<b-navbar-nav class="ml-auto">
						<b-nav-item to="/">Home</b-nav-item>
						<b-nav-item to="/about">About</b-nav-item>
					</b-navbar-nav>
				</b-collapse>
			</div>
		</b-navbar>
	</header>
</template>

<script>
	export default {
		name: 'Header'
	}
</script>

<style scoped>
	.navigation {
		padding: 30px 20px;
	}

	.container {
		max-width: 1600px;
	}
</style>