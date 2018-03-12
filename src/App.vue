<template>
  <div id="app">
		<div class="test">
			<VirtualAutoComplete />
		</div>
	</div>
</template>

<script>
import VirtualAutoComplete from './components/VirtualAutoComplete.vue'
export default {
  name: 'app',
  components: {
    VirtualAutoComplete
  }
}
</script>

<style>
html, body {
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;
}
.test {
	margin: 0 auto;
	border: 1px solid black;
	height: 50vh;
	width: 80vw;
	padding: 1em;
}
</style>
