<template>
	<v-layout class="animation-page">
		<v-flex xs12 sm12 md12 lg12>
			<v-card>
				<v-card-title>Animation</v-card-title>
				<v-card-text>
					There are two types of animation available. The type that is demonstrated here does not require the MIDI option, so it can be used with the smaller, basic library. To see the type of animation that can be synced up with the sound, go to the <nuxt-link to="/audio">Audio page</nuxt-link>. There are three effects that can be achieved here: a cursor, the measures disappearing after they've been played, and the measures disappearing just before they're to be played. The effects can be combined.
				</v-card-text>
			</v-card>
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

&lt;style&gt;
    .cursor {
        background-color: #ffffc0;
        opacity: 0.5
    }
&lt;/style&gt;
</code>
				</v-card-text>
			</v-card>
			<v-card>
				<v-card-title>
					<v-btn flat icon @click="optionsOpen = !optionsOpen">
						<v-icon>{{optionsOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					Options</v-card-title>
				<v-card-text :class="optionsOpen ? 'opened' : 'closed'">
					<p>You must check at least one of these checkboxes to see the animation. If you leave the Beats Per Minute blank, then the the tempo found in the ABC input string is used. If you put a number in, then that overrides the tempo in the ABC string.</p>
					<v-checkbox label="Hide Finished Measures" v-model="hideFinishedMeasures" light></v-checkbox>
					<v-checkbox label="Hide Current Measure" v-model="hideCurrentMeasure" light></v-checkbox>
					<v-checkbox label="Show Cursor" v-model="showCursor" light></v-checkbox>
					<v-text-field
							class="bpm-input"
							v-model="bpm"
							label="Beats Per Minute"
					></v-text-field>
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
				hideFinishedMeasures: false,
				hideCurrentMeasure: false,
				showCursor: false,
				bpm: "",
				isPaused: null,
				javascriptOpen: true,
				optionsOpen: true,
				outputOpen: true,
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
	.cursor {
		border-left: 1px solid #3D9AFC;
	}
	.bpm-input {
		width: 150px;
		margin-top: -25px;
	}
</style>