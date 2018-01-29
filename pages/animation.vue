<template>
	<v-layout class="animation-page">
		<v-flex xs12 sm12 md12 lg12>
			<v-card>
				<v-card-title>Animation</v-card-title>
				<v-card-text>
					There are two types of animation available. The type that is demonstrated here does not require the MIDI option, so it can be used with the smaller, basic library. To see the type of animation that can be synced up with the sound, go to the <nuxt-link to="/audio">Audio page</nuxt-link>. There are three effects that can be achieved here: a cursor, the measures disappearing after they've been played, and the measures disappearing just before they're to be played. The effects can be combined.
				</v-card-text>
			</v-card>
			<div class="combine-cards">
				<v-card class="narrow">
				<v-card-title>
					<v-btn flat icon @click="optionsOpen = !optionsOpen">
						<v-icon>{{optionsOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					Options</v-card-title>
				<v-card-text :class="optionsOpen ? 'opened' : 'closed'">
					<p>You must check at least one of these checkboxes to see the animation.</p>
					<v-layout wrap justify-start align-center>
						<TextInputItem label="Beats Per Minute" :help="helpText.bpm" v-model="bpm"></TextInputItem>
						<CheckboxItem label="Hide Finished Measures" :help="helpText.hideFinishedMeasures" v-model="hideFinishedMeasures"></CheckboxItem>
						<CheckboxItem label="Hide Current Measure" :help="helpText.hideCurrentMeasure" v-model="hideCurrentMeasure"></CheckboxItem>
						<CheckboxItem label="Show Cursor" :help="helpText.showCursor" v-model="showCursor"></CheckboxItem>
					</v-layout>
					<v-btn round color="primary" @click="start">Start</v-btn>
					<v-btn outline color="primary" @click="stop">Stop</v-btn>
					<v-btn-toggle v-model="isPaused">
					<v-btn outline color="primary" @click="pause">Pause</v-btn>
					</v-btn-toggle>
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
const tunes = abcjs.renderAbc("paper", abcString, { add_classes: true });

abcjs.startAnimation("paper", tunes[0], {
<div v-if="hideCurrentMeasure">    hideCurrentMeasure: true,</div><div v-if="hideFinishedMeasures">    hideFinishedMeasures: true,</div><div v-if="showCursor">    showCursor: true,</div><div v-if="bpm">    bpm: {{bpm}},</div>});

abcjs.stopAnimation();

abcjs.pauseAnimation(true | false);

<template v-if="showCursor">
	&lt;style&gt;
	#paper .cursor {
	background-color: #ffffc0;
	opacity: 0.5
	}
	&lt;/style&gt;
</template>
</code>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import {mapGetters} from 'vuex';
	import CheckboxItem from "../components/CheckboxItem";
	import TextInputItem from "../components/TextInputItem";

	export default {
		components: {CheckboxItem,TextInputItem},
		head() {
			return {
				title: this.appTitle()
			};
		},
		data() {
			return {
				hideFinishedMeasures: false,
				hideCurrentMeasure: false,
				showCursor: false,
				bpm: "",
				isPaused: null,
				javascriptOpen: true,
				optionsOpen: true,
				outputOpen: true,

				helpText: {
					hideFinishedMeasures: "As soon as a measure has been passed in the animation, then it is hidden. This is useful if you are trying to keep the user focused on the upcoming music and not look back at previously played measures.",
					hideCurrentMeasure: "As soon as a measure is about to be played, it is hidden. This is useful if you are trying to get the user to read ahead and memorize each measure as it happens.",
					showCursor: "When animating, move an element along in time. This element has the selector \"#paper .cursor\" and needs to have some CSS applied to it to be visible. A possible styling is shown.",
					bpm: "This is the tempo that the animation should be. If you leave it blank, then the the tempo found in the ABC input string is used. If you put a number in, then that overrides the tempo in the ABC string.",
				}
			};
		},
		mounted() {
			this.renderAbc()("paper", this.inputAbc(), { add_classes: true });
		},
		methods: {
			...mapGetters(['appTitle', 'inputAbc', 'renderAbc', 'startAnimation', 'stopAnimation', 'pauseAnimation']),
			start() {
				const tunes = this.renderAbc()("paper", this.inputAbc(), { add_classes: true });
				const options = {
					hideFinishedMeasures: this.hideFinishedMeasures,
					hideCurrentMeasure: this.hideCurrentMeasure,
					showCursor: this.showCursor,
					bpm: this.bpm,
				};
				this.startAnimation()(document.getElementById("paper"), tunes[0], options);
				this.isPaused = null;
			},
			stop() {
				this.stopAnimation()();
				this.isPaused = null;
			},
			pause() {
				const paused = this.isPaused === null;
				this.pauseAnimation()(paused);
			},
		}
	}
</script>

<style>
	.animation-page .input-group {
		min-width: 250px;
		max-width: 250px;
		margin-right: 10px;
	}
	#paper .cursor {
		border-left: 1px solid #3D9AFC;
	}
</style>