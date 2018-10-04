<template>
	<div class="text-input-item">
		<v-text-field
				class="numeric"
				v-model="textValue"
				:label="label"
		></v-text-field>
		<InfoDialog :label="label" :help="help" :width="dlgWidth"></InfoDialog>
	</div>
</template>

<script>
	import InfoDialog from "./InfoDialog";
	export default {
		name: "TextInputItem",
		components: {InfoDialog},
		data() {
			return {
				textValue: "",
			};
		},
		watch: {
			textValue: function () {
				this.$emit('input', this.textValue);
			},
		},
		props: ['label', 'value', 'help', 'dlgWidth'],
		mounted() {
			this.textValue = this.value;
			if (this.help) {
				const helpButton = this.$children[1].$el.querySelector(".help-button");
				helpButton.style.left = "230px";
			}
		},
		methods: {
		}
	};
</script>

<style>
	.text-input-item {
		position: relative;
	}
	.text-input-item .input-group.input-group--text-field {
		min-width: 230px;
		max-width: 230px;
		margin-right: 30px;
	}
	.text-input-item label {
		width: initial;
	}
	.text-input-item .help-button {
		position: absolute;
		top: 15px;
		height: 18px;
		width: 18px;
	}
</style>