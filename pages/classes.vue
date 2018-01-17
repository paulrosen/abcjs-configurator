<template>
	<v-layout class="classes-page">
		<v-flex xs12 sm12 md12 lg12>
			<v-card>
				<v-card-title>Command</v-card-title>
				<v-card-text>
					<code>
abcjs.renderAbc("paper", abcString, { add_classes: true });
<template v-if="this.selector.length > 0">document.getElementById("paper").querySelectorAll("{{this.selector}}").forEach((el) => {
    el.setAttribute("fill", "#3D9AFC");
});</template>
					</code>
				</v-card-text>
			</v-card>
			<v-card>
				<v-card-title>Available Classes</v-card-title>
				<v-card-text>
					<v-flex>
						<label v-for="c,i in classNames" :key="i" class="classes">
							<input type="checkbox" v-model="checkedClasses" :value="c">
							{{c}}
						</label>
					</v-flex>
				</v-card-text>
			</v-card>
			<v-card>
				<v-card-title>Output</v-card-title>
				<v-card-text>
					<div id="paper"></div>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {
		head() {
			return {
				title: this.appTitle()
			};
		},
		data() {
			return {
				classNames: [ 'one', 'two'],
				checkedClasses: [],
				selector: "",
			}
		},
		watch: {
			checkedClasses: function (val) {
				const paper = document.getElementById('paper');
				const svg = paper.querySelector("svg");
				const elements = svg.querySelectorAll('[fill]');
				elements.forEach((el) => {
					el.setAttribute("fill", "#000000");
				});

				this.selector = (val.length > 0) ? "." + val.join(".") : "";
				if (this.selector.length > 0) {
					document.getElementById('paper').querySelectorAll(this.selector).forEach((el) => {
						el.setAttribute("fill", "#3D9AFC");
					});
				}
			},
		},
		methods: {
			...mapGetters(['appTitle', 'inputAbc', 'renderAbc']),
			getClassNames() {
				const paper = document.getElementById('paper');
				const svg = paper.querySelector("svg");
				const elements = svg.querySelectorAll('*');

				let classes = [];
				elements.forEach((el) => {
					const arr = el.classList ? el.classList.value.split(" ") : [];
					classes = classes.concat(arr);
				});
				this.classNames = [...new Set(classes)].filter(Boolean).sort();
			},
		},
		mounted() {
			this.renderAbc()("paper", this.inputAbc(), { add_classes: true });
			this.getClassNames();
		}
	}
</script>

<style>
	.card {
		margin-bottom: 10px;
	}
	.card__title {
		font-weight: bold;
	}
	code {
		font-family: "Lucida Console", Monaco, monospace;
		background-color: #DFDBC3;
		color: #333333;
		padding: 10px;
		font-size: 16px;
	}
	.classes {
		width: 150px;
		display: inline-block;
	}
</style>