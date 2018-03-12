<template>
	<virtual-scroller ref="scroller" class="vta-filter-box" :items="data" :item-height="itemHeight" pool-size="10" :style="'width: ' + width + '; height: ' + height + '; left: ' + left">
		<template slot-scope="props">
			<div class="vta-item" tabindex="0" v-on:keyup="onKeyUp" v-on:click="onClick" :data-id="props.item.id">
				<span>{{props.item.id}}: {{props.item.name}}</span>
			</div>
		</template>
	</virtual-scroller>
</template>

<script>
import _ from 'lodash/core';
export default {
	name: "FilterBox",
	props: ['items', 'onSelected'],
	created () {
		if (!this.height) {
			this.height = '10vh'
		}
		this.left = '-9000000px'
	},
	data () {
		return {
			itemHeight: 0,
			height: 0,
			width: 0,
			data: [],
			filterBox: null,
			fontSize: 0
		}
	},
	mounted () {
		this.filterBox = document.getElementsByClassName("vta-filter-box")[0]
		this.fontSize = parseFloat(getComputedStyle(this.filterBox).fontSize)
	},
	methods: {
		setWidget (width, height) {
			this.width = (width - 2) + 'px'
			this.itemHeight = height
		},
		getMaxHeight () {
			let elemRect = this.filterBox.getBoundingClientRect()
			return document.body.clientHeight - this.fontSize - elemRect.top
		},
		calculateHeight () {
			let length = 0
			if (this.data && this.data.length > 0) {
				length = this.data.length
			}
			let checkHeight = (this.itemHeight * length)
			let maxHeight = this.getMaxHeight()
			if (checkHeight < maxHeight) {
				this.height = checkHeight
				this.height += 'px'
			} else {
				this.height = maxHeight
				this.height += 'px'
			}
		},
		filter (text) {
			let filter = []
			if (text) {
				filter = _.filter(this.items, (o) => {
					let str = o.id + ''
					return str.indexOf(text) >= 0; 
				});
			}
			this.data = filter
			if (this.data.length > 0) {
				this.left = 'unset'
			} else {
				this.left = '-9000000px'
			}
			this.calculateHeight()
		},
		focus () {
			let items = document.getElementsByClassName("vta-item")
			if (items && items.length > 0) {
				items[0].focus()
			}
		},
		onKeyUp (e) {
			let keycode = e.keyCode
			switch (keycode) {
				case 38: { // Up arrow
					let pEl = e.target.previousSibling
					if (pEl) {
						pEl.focus()
					}
					break
				}
				case 40: { // Down arrow
					let nEl = e.target.nextSibling
					if (nEl) {
						nEl.focus()
					}
					break
				}
				case 13: { // Enter
					let id = e.target.getAttribute('data-id')
					this.selected(id)
					break
				}
			}
			e.preventDefault()
		},
		onClick (e) {
			let id = e.target.getAttribute('data-id')
			this.selected(id)
		},
		selected (id) {
			this.$emit('onSelected', id)
		}
	}
};
</script>

<style scoped>
.vta-filter-box {
  position: absolute;
  z-index: 100;
  border: 1px solid #ccc;
	width: 171px;
	height: 60vh;
	border-top: 0;
	background: #fff;
}
.vta-item {
	display: block;
	padding: 0.5em;
}
.vta-item:hover,
.vta-item:focus {
	background: #2196f3;
	cursor: pointer;
}
</style>
