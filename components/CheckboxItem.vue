<template>
	<div class="checkbox-item">
		<v-checkbox :label="label" v-model="checkValue"></v-checkbox>
		<v-btn flat icon @click.stop="openDialog = true" class="help-button blue-gray" v-if="help" title="Click for more info.">
			<v-icon>info_outline</v-icon>
		</v-btn>
		<v-dialog v-model="openDialog" max-width="400px" v-if="help">
			<v-card>
				<v-card-title>
					Explanation of "{{label}}"
				</v-card-title>
				<v-card-text v-html="help"></v-card-text>
				<v-card-actions>
					<v-btn color="primary" flat @click.stop="openDialog=false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	export default {
		name: "CheckboxItem",
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
				const box = this.$children[0].$el.querySelector(".input-group--selection-controls__ripple");
				const width = box.offsetWidth + label.offsetWidth - 14; // not sure where the 14 comes from.
				const helpButton = this.$children[1].$el;
				helpButton.classList.remove("btn");
				helpButton.classList.remove("btn--flat");
				helpButton.classList.remove("btn--icon");
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
		margin-right: 10px;
	}
	.checkbox-item label {
		width: initial;
	}
	.checkbox-item .help-button {
		position: absolute;
		top: 5px;
	}
	.checkbox-item .help-button .btn__content {
		padding: 0;
	}
	.checkbox-item .help-button i {
		font-size: 12px;
		float: left;
	}
</style>