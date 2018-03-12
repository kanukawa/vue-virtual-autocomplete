<template>
	<div>
		<input type="text" class="input" ref="input" v-on:keyup="onKeyUp" />
		<FilterBox ref="filter" :items="items" @onSelected="onSelected" />
	</div>
</template>

<script>
import FilterBox from '@/components/FilterBox'
export default {
	name: 'VirtualAutoComplete',
	components: {
		FilterBox
	},
	created () {
		for (let i = 1; i <= 100000; i++) {
			this.items.push({
				id: i,
				name: 'Test'
			})
		}
		if (!this.height) {
			this.height = '10vh'
		}
	},
	mounted () {
		this.$refs.filter.setWidget(this.$refs.input.offsetWidth, 34);
	},
	data () {
		return {
			items: []
		}
	},
	methods: {
		onKeyUp (e) {
			let keycode = e.keyCode
			switch (keycode) {
				case 40: // Down arrow
					this.$refs.filter.focus()
					e.preventDefault()
					break
				default:
					this.$refs.filter.filter(e.target.value)
			}
		},
		onSelected (id) {
			console.log(this.items[id - 1])
		}
	}
}
</script>

<style scoped>
.input {
	width: 500px;
	padding: 0.5em;
}
</style>
