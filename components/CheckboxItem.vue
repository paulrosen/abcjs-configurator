<template>
	<div class="checkbox-item">
		<v-checkbox :label="label" v-model="checkValue" persistent-hint :hint="help+helpButton()"></v-checkbox>
		<v-btn color="primary" dark @click.stop="openDialog = true">Open Dialog 2</v-btn>
		<v-dialog v-model="openDialog" max-width="500px">
			<v-card>
				<v-card-title>
					Dialog 2
				</v-card-title>
				<v-card-text>
					here it is.
				</v-card-text>
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
				// label.innerHTML = `${label.innerHTML}<button type="button" class="info-button blue-gray" title="${this.help}" onclick="this.helpRequested()"><div><i aria-hidden="true" class="material-icons icon">info_outline</i></div></button>`;
			}
		},
		methods: {
			helpRequested(ev) {
				ev.preventDefault();
				console.log("got here");
			},
			helpButton() {
				return `<button type="button" class="info-button blue-gray" title="${this.help}" @click.stop="openDialog = true"><div><i aria-hidden="true" class="material-icons icon">info_outline</i></div></button>`
			},
		}
	};
</script>

<style>
	.checkbox-item {
		min-width: 250px;
		max-width: 250px;
		margin-right: 10px;
	}
	.info-button i {
		font-size: 12px;
		position: absolute;
		top: 4px;
		margin-left: 2px;
	}
</style>