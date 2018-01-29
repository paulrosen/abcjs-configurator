<template>
	<div class="info-dialog">
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
		name: "InfoDialog",
		data() {
			return {
				openDialog: false,
			};
		},
		props: ['label', 'help'],
		mounted() {
			if (this.help) {
				const helpButton = this.$children[0].$el;
				helpButton.classList.remove("btn");
				helpButton.classList.remove("btn--flat");
				helpButton.classList.remove("btn--icon");
			}
		},
	};
</script>

<style>
	.info-dialog .help-button .btn__content {
		padding: 0;
	}
	.info-dialog .help-button i {
		font-size: 12px;
		float: left;
	}
	.button-row .info-dialog {
		position: relative;
	}
</style>