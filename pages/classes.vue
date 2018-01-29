<template>
	<v-layout class="classes-page">
		<v-flex xs12 sm12 md12 lg12>
			<div class="combine-cards">
				<v-card class="narrow">
				<v-card-title>
					<v-btn flat icon @click="optionsOpen = !optionsOpen">
						<v-icon>{{optionsOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					Available Classes</v-card-title>
				<v-card-text :class="optionsOpen ? 'opened' : 'closed'">
					<v-select
							v-bind:items="titles()"
							v-model="tuneTitle"
							label="Tune To Display"
							bottom
							clearable
					></v-select>
					<p>Check the various classes to see how they are applied to the music. (They are AND'd together.)</p>
					<v-flex>
						<div v-for="c,i in classNames" :key="i" class="classes">
							<v-checkbox :label="c" v-model="checkedClasses" :value="c"></v-checkbox>
						</div>
					</v-flex>
				</v-card-text>
			</v-card>
			<v-card>
				<v-card-title>
					<v-btn flat icon @click="outputOpen = !outputOpen">
						<v-icon>{{outputOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					Output</v-card-title>
				<v-card-text :class="outputOpen ? 'opened' : 'closed'">
					<div id="paper" class="paper amber lighten-4"></div>
				</v-card-text>
			</v-card>
			</div>
			<v-card>
				<v-card-title>
					<v-btn flat icon @click="javascriptOpen = !javascriptOpen">
						<v-icon>{{javascriptOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					JavaScript</v-card-title>
				<v-card-text :class="javascriptOpen ? 'opened' : 'closed'">
					<code>import abcjs from 'abcjs';
{{formatCommand()}}{{formatClassSelection()}}</code>
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
				tuneTitle: null,
				javascriptOpen: true,
				optionsOpen: true,
				outputOpen: true,
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
				this.highlightSelectedClasses();
			},
			tuneTitle: function(val) {
				if (!this.tuneTitle) {
					this.renderAbc()("paper", this.inputAbc(), {add_classes: true});
				}
				else {
					const tune = this.tuneByTitle()(this.tuneTitle);
					this.renderAbc()("paper", tune.abc, { add_classes: true });
				}
				this.getClassNames();
				this.highlightSelectedClasses();
			},
		},
		methods: {
			...mapGetters(['appTitle', 'inputAbc', 'renderAbc', 'titles', 'tuneByTitle']),
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
			highlightSelectedClasses() {
				if (this.selector.length > 0) {
					document.getElementById('paper').querySelectorAll(this.selector).forEach((el) => {
						el.setAttribute("fill", "#3D9AFC");
					});
				}
			},
			formatCommand() {
				if (!this.tuneTitle)
					return "abcjs.renderAbc(\"paper\", abcString, { add_classes: true });";
				else
					return `const tune = abcjs.TuneBook(abcString).getTuneByTitle("${this.tuneTitle}");
abcjs.renderAbc("paper", tune.abc, { add_classes: true });`;
			},
			formatClassSelection() {
				if (this.selector.length === 0) return "";
				return `

document.getElementById("paper").querySelectorAll("${this.selector}").forEach((el) => {
    el.setAttribute("fill", "#3D9AFC");
});`;
			},
		},
		mounted() {
			this.renderAbc()("paper", this.inputAbc(), { add_classes: true });
			this.getClassNames();
		}
	}
</script>

<style>
	.classes {
		width: 190px;
		display: inline-block;
	}
	.classes-page .input-group--select {
		width: 250px;
	}
	@media only screen and (min-width: 1800px) {
		.classes-page .combine-cards .card.narrow {
			min-width: 605px;
			max-width: 605px;
		}
	}

</style>