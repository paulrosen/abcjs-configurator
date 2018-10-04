<template>
	<div class="checkbox-item">
		<v-checkbox :label="label" v-model="checkValue"></v-checkbox>
		<InfoDialog :label="label" :help="help"></InfoDialog>
	</div>
</template>

<script>
	import InfoDialog from "./InfoDialog";
	export default {
		name: "CheckboxItem",
		components: {InfoDialog},
		data() {
			return {
				checkValue: null,
				openDialog: false,
			};
		},
		watch: {
			checkValue: function () {
				this.$emit('input', this.checkValue);
			},
		},
		props: ['label', 'value', 'help'],
		mounted() {
			this.checkValue = this.value;
			if (this.help) {
				const label = this.$children[0].$el.querySelector("label");
				const box = this.$children[0].$el.querySelector(".v-input--selection-controls__ripple");
				const width = box.offsetWidth + label.offsetWidth - 14; // not sure where the 14 comes from.
				const helpButton = this.$children[1].$el.querySelector(".help-button");
				helpButton.style.left = width + "px";
			}
		},
		methods: {
		}
	};
</script>

<style>
	.checkbox-item {
		position: relative;
		min-width: 240px;
		max-width: 240px;
		margin-right: 20px;
	}
	.checkbox-item label {
		width: initial;
	}
	.checkbox-item .help-button {
		position: absolute;
		top: 0;
		height: 18px;
		width: 18px;
	}
</style>