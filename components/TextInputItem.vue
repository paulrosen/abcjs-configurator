<template>
	<div class="text-input-item">
		<v-text-field
				class="numeric"
				v-model="textValue"
				:label="label"
		></v-text-field>
		<v-btn flat icon @click.stop="openDialog = true" class="help-button blue-gray" v-if="help" title="Click for more info.">
			<v-icon>info_outline</v-icon>
		</v-btn>
		<v-dialog v-model="openDialog" max-width="400px" v-if="help">
			<v-card>
				<v-card-title>
					Explanation of "{{label}}"
				</v-card-title>
				<v-card-text v-html="help.replace(/\n/g, '<br>').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;')"></v-card-text>
				<v-card-actions>
					<v-btn color="primary" flat @click.stop="openDialog=false">Close</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
	export default {
		name: "TextInputItem",
		data() {
			return {
				textValue: "",
				openDialog: false,
			};
		},
		watch: {
			textValue: function () {
				this.$emit('input', this.textValue);
			},
		},
		props: ['label', 'value', 'help'],
		mounted() {
			this.textValue = this.value;
			if (this.help) {
				const helpButton = this.$children[1].$el;
				helpButton.classList.remove("btn");
				helpButton.classList.remove("btn--flat");
				helpButton.classList.remove("btn--icon");
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
		top: 36px;
	}
	.text-input-item .help-button .btn__content {
		padding: 0;
	}
	.text-input-item .help-button i {
		font-size: 12px;
		float: left;
	}
</style>