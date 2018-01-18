<template>
	<v-layout class="audio-page">
		<v-flex xs12 sm12 md12 lg12>
			<v-card>
				<v-card-title>JavaScript</v-card-title>
				<v-card-text>
					<code>import abcjs from 'abcjs';
{{javascriptString}}</code>
				</v-card-text>
			</v-card>
			<v-card>
				<v-card-title>Options</v-card-title>
				<v-card-text>
					<h2>General Params</h2>
					<v-layout wrap justify-start>
					<v-text-field
							class="numeric"
							v-model="midiParams.qpm"
							label="Beats Per Minute"
					></v-text-field>
					<v-text-field
							class="numeric"
							v-model="midiParams.program"
							label="Instrument number (program)"
					></v-text-field>
					<v-text-field
							class="numeric"
							v-model="midiParams.transpose"
							label="Half-steps to transpose"
					></v-text-field>
					<v-text-field
							class="numeric"
							v-model="renderParams.startingTune"
							label="Index of the Tune to Process"
					></v-text-field>
					</v-layout>
					<h2>Download Params</h2>
					<v-layout wrap justify-start>
						<v-checkbox label="Downloadable MIDI?" v-model="midiParams.generateDownload" light></v-checkbox>
						<v-text-field
								class="numeric"
								v-model="midiParams.downloadLabel"
								label="Label For Download Link"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="midiParams.preTextDownload"
								label="Pre-Download Text"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="midiParams.postTextDownload"
								label="Post-Download Text"
						></v-text-field>
					</v-layout>
					<h2>Inline Params</h2>
					<v-layout wrap justify-start>
						<v-checkbox label="Inline MIDI?" v-model="midiParams.generateInline" light></v-checkbox>
						<v-text-field
								class="numeric"
								v-model="midiParams.preTextInline"
								label="Pre-Inline Text"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="midiParams.postTextInline"
								label="Post-Inline Text"
						></v-text-field>
					</v-layout>
					<h2>Callback Params</h2>
					<v-layout wrap justify-start>
						<v-checkbox label="Listener?" v-model="midiParams.doListener" light></v-checkbox>
						<v-checkbox label="Animate?" v-model="midiParams.doAnimate" light></v-checkbox>
						<v-text-field
								class="numeric"
								v-model="midiParams.context"
								label="Callback Context"
						></v-text-field>
					</v-layout>
					<h2>Look and Feel Params</h2>
					<v-layout wrap justify-start>
						<v-checkbox label="Show Loop Toggle?" v-model="midiParams.inlineControls.loopToggle" light></v-checkbox>
						<v-checkbox label="Standard Controls?" v-model="midiParams.inlineControls.standard" light></v-checkbox>
						<v-checkbox label="Tempo Control?" v-model="midiParams.inlineControls.tempo" light></v-checkbox>
						<v-checkbox label="Hide?" v-model="midiParams.inlineControls.hide" light></v-checkbox>
						<v-checkbox label="Auto Play?" v-model="midiParams.inlineControls.startPlaying" light></v-checkbox>
						<v-text-field
								class="numeric"
								v-model="midiParams.inlineControls.tooltipLoop"
								label="Loop Tooltip"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="midiParams.inlineControls.tooltipReset"
								label="Reset Tooltip"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="midiParams.inlineControls.tooltipPlay"
								label="Play Tooltip"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="midiParams.inlineControls.tooltipProgress"
								label="Progress Tooltip"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="midiParams.inlineControls.tooltipTempo"
								label="Tempo Tooltip"
						></v-text-field>
					</v-layout>
					<h2>Metronome Params</h2>
					<v-layout wrap justify-start>
						<v-text-field
								class="numeric"
								v-model="midiParams.drum"
								label="Drum String"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="midiParams.drumBars"
								label="Number of Bars"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="midiParams.drumIntro"
								label="Number Of Intro Bars"
						></v-text-field>
					</v-layout>
				</v-card-text>
			</v-card>
			<v-card class="section-card">
				<v-card-title>Output</v-card-title>
				<div id="paper"></div>
				<div id="midi-id"></div>
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
				midiParams: {
					qpm: "",
					program: "",
					transpose: "",
					generateDownload: false,
					generateInline: true,
					downloadLabel: "download midi",
					preTextDownload: "",
					postTextDownload: "",
					preTextInline: "",
					postTextInline: "",
					doListener: false,
					doAnimate: false,
					context: "",
					inlineControls: {
						loopToggle: false,
						standard: true,
						hide: false,
						startPlaying: false,
						tempo: false,
						tooltipLoop: "Click to toggle play once/repeat.",
						tooltipReset: "Click to go to beginning.",
						tooltipPlay: "Click to play/pause.",
						tooltipProgress: "Click to change the playback position.",
						tooltipTempo: "Change the playback speed.",
					},
					drum: "",
					drumBars: "1",
					drumIntro: "0",
				},
				renderParams: {
					startingTune: "0",
				},

				javascriptString: "",
				tunes: null,
			};
		},
		watch: {
			'midiParams': {
				handler: function () {
					this.redraw();
				},
				deep: true
			},
			'renderParams': {
				handler: function () {
					this.redraw();
				},
				deep: true
			},
		},

		methods: {
			...mapGetters(['appTitle', 'renderAbc', 'renderMidi', 'inputAbc']),
			constructMidiParams() {
				this.midiParams.listener = this.midiParams.doListener ? this.listenerCallback : undefined;
				this.midiParams.animate = this.midiParams.doAnimate ?
					{ listener: this.animateCallback, target: this.tunes[0] }
					: undefined;
				return this.midiParams;
			},
			formatInlineControls() {
				let params = "";
				if (!this.midiParams.inlineControls.standard)
					params += "\n            standard: false,";
				if (this.midiParams.inlineControls.loopToggle)
					params += "\n            loopToggle: true,";
				if (this.midiParams.inlineControls.hide)
					params += "\n            hide: true,";
				if (this.midiParams.inlineControls.startPlaying)
					params += "\n            startPlaying: true,";
				if (this.midiParams.inlineControls.tempo)
					params += "\n            tempo: true,";
				if (this.midiParams.inlineControls.tooltipLoop !== "Click to toggle play once/repeat.")
					params += `\n            tooltipLoop: "${this.midiParams.inlineControls.tooltipLoop}",`;
				if (this.midiParams.inlineControls.tooltipReset !== "Click to go to beginning.")
					params += `\n            tooltipReset: "${this.midiParams.inlineControls.tooltipReset}",`;
				if (this.midiParams.inlineControls.tooltipPlay !== "Click to play/pause.")
					params += `\n            tooltipPlay: "${this.midiParams.inlineControls.tooltipPlay}",`;
				if (this.midiParams.inlineControls.tooltipProgress !== "Click to change the playback position.")
					params += `\n            tooltipProgress: "${this.midiParams.inlineControls.tooltipProgress}",`;
				if (this.midiParams.inlineControls.tooltipTempo !== "Change the playback speed.")
					params += `\n            tooltipTempo: "${this.midiParams.inlineControls.tooltipTempo}",`;
				return params;
			},
			formatMidiParams() {
				let params = "";
				if (this.midiParams.qpm !== "")
					params += `\n        qpm: ${this.midiParams.qpm},`;
				if (this.midiParams.program !== "")
					params += `\n        program: ${this.midiParams.program},`;
				if (this.midiParams.transpose !== "")
					params += `\n        transpose: ${this.midiParams.transpose},`;
				if (this.midiParams.generateDownload)
					params += "\n        generateDownload: true,";
				if (!this.midiParams.generateInline)
					params += "\n        generateInline: false,";
				if (this.midiParams.preTextDownload !== "")
					params += `\n        preTextDownload: "${this.midiParams.preTextDownload}",`;
				if (this.midiParams.postTextDownload !== "")
					params += `\n        postTextDownload: "${this.midiParams.postTextDownload}",`;
				if (this.midiParams.preTextInline !== "")
					params += `\n        preTextInline: "${this.midiParams.preTextInline}",`;
				if (this.midiParams.postTextInline !== "")
					params += `\n        postTextInline: "${this.midiParams.postTextInline}",`;
				if (this.midiParams.drum !== "")
					params += `\n        drum: ${this.midiParams.drum},`;
				if (this.midiParams.drumBars !== "1")
					params += `\n        drumBars: ${this.midiParams.drumBars},`;
				if (this.midiParams.drumIntro !== "0")
					params += `\n        drumIntro: ${this.midiParams.drumIntro},`;
				if (this.midiParams.doListener)
					params += `\n        listener: function(abcjsElement, currentEvent, context) {},`;
				if (this.midiParams.doAnimate)
					params += `\n        animate: { listener: function(abcjsElement, currentEvent, context) {}, target: tunes[0], qpm: 120 },`;
				if (this.midiParams.context)
					params += `\n        context: ${this.midiParams.context},`;

				const inlineControls = this.formatInlineControls();
				if (inlineControls !== '')
					params += `\n        inlineControls: {${inlineControls}\n        },`;

				if (params === "")
					params = "{ }";
				else
					params = `{${params}
    }`;
				return params;
			},
			formatRenderParams() {
				let params = "";
				if (this.renderParams.startingTune !== "1")
					params += `\n        startingTune: ${this.renderParams.startingTune},`;
				if (params === "")
					params = "{ }";
				else
					params = `{${params}
    }`;
				return params;
			},
			listenerCallback(abcjsElement, currentEvent, context) {
				console.log(abcjsElement, currentEvent, context);
			},
			colorRange(range, color) {
				if (range && range.elements) {
					range.elements.forEach(function (set) {
						set.forEach(function (item) {
							item.attr({fill: color});
						});
					});
				}
			},
			animateCallback(lastRange, currentRange, context) {
				// This provides the actual visual note being played. It can be used to create the "bouncing ball" effect.
				this.colorRange(lastRange, "#000000"); // Set the old note back to black.
				this.colorRange(currentRange, "#3D9AFC"); // Set the currently sounding note to blue.
			},
			redraw() {
				// import "font-awesome/css/font-awesome.min.css";
				// import 'abcjs/abcjs-midi.css';
				const midiParams = this.formatMidiParams();
				const renderParams = this.formatRenderParams();
    			this.javascriptString = `ABCJS.renderMidi(
    "midi-id",
    abcString,
    {},
    ${midiParams},
    ${renderParams});`;

    			this.tunes = this.renderAbc()("paper", this.inputAbc(), {}, {}, this.renderParams);
				this.renderMidi()("midi-id", this.inputAbc(), {}, this.constructMidiParams(), this.renderParams);
			},
		}
	}
// 	| `qpm` | 180 | The tempo, if not specified in abcString. |
// 	| `program` | 0 | The midi program (aka "instrument") to use, if not specified in abcString. |
// 	| `transpose` | 0 | The number of half-steps to transpose the everything, if not specified in abcString. |
// 	| `generateDownload` | false | Whether to generate a download MIDI link. |
// 	| `generateInline` | true | Whether to generate the inline MIDI controls. |
// 	| `downloadLabel` | "download midi" | The text for the MIDI download. If it contains `%T` then that is replaced with the first title. If this is a function, then the result of that function is called. The function takes two parameters: the parsed tune and the zero-based index of the tune in the tunebook. |
// 	| `preTextDownload` | "" | Text that appears right before the download link (can contain HTML markup). |
// 	| `postTextDownload` | "" | Text that appears right after the download link (can contain HTML markup). |
// 	| `preTextInline` | "" | Text that appears right before the MIDI controls (can contain HTML markup). If it contains `%T` then that is replaced with the first title. |
// 	| `postTextInline` | "" | Text that appears right after the MIDI controls (can contain HTML markup). If it contains `%T` then that is replaced with the first title. |
// 	| `listener` | null | Function that is called for each midi event. The parameters are the current abcjs element and the current MIDI event. |
// 	| `animate` | null | Whether to do a "bouncing ball" effect on the visual music. `{ listener: callback, target: output of ABCJS.renderAbc, qpm: tempo }` This calls the listener whenever the current note has changed. It is called with both the last selected note and the newly selected note. The callback parameters are arrays of svg elements. |
// 	| `context` | null | A string that is passed back to both the listener and animate callbacks. |
// 	| `inlineControls` | { selectionToggle: false, loopToggle: false, standard: true, tempo: false, startPlaying: false } | These are the options for which buttons and functionality appear in the inline controls. This is a hash, and is defined below. |
// 	| `drum` | "" | A string formatted like the `%%MIDI drum` specification. Using this parameter also implies `%%MIDI drumon` |
// 	| `drumBars` | 1 |  How many bars to spread the drum pattern over. |
// 	| `drumIntro` | 0 | How many bars of drum should precede the music. |
//
// 	**Note on the drum parameter:**
// 	See the ABC documentation for the correct way to format the string that is passed as the drum parameter. Here is a table that provides a fairly reasonable default for drum, drumIntro, and drumBars when used as a metronome:
// 		```
// const drumBeats = {
// // the array is [0]=drum [1]=drumIntro
// "2/4": ["dd 92 90 60 30", 2],
// "3/4": ["ddd 92 90 90 60 30 30", 1],
// "4/4": ["dddd 92 90 90 90 60 30 30 30", 1],
// "5/4": ["ddddd 92 90 90 92 90 60 30 30 60 30", 1],
// "Cut Time": ["dd 92 90 60 30", 2],
// "6/8": ["dd 92 90 60 30", 2],
// "9/8": ["ddd 92 90 90 60 30 30", 1],
// "12/8": ["dddd 92 90 90 90 60 30 30 30", 1]
// };
// ```
// 	A more complicated example that has the drum pattern fall over two measures of 2/4 time (This is a typical Bulgar pattern):
// 	```
// { drum: "d2dd2ddz", drumBars: 2, drumIntro: 2 }
// ```
//
// 	| `inlineControls` | Default | Description |
// 	| ------------- | ----------- | ----------- |
// 	| `selectionToggle` | false | Show a latched push button to play only the current selection. **Not yet implemented** |
// 	| `loopToggle` | false | Show a a latched push button to start playing again when the end is reached. |
// 	| `standard` | true | Show the start, pause, reset, and progress controls. |
// 	| `hide` | false | Whether to show the control at all. |
// 	| `startPlaying` | false | Whether to start the MIDI as soon as it is available. (Not available in the Editor. Only available when calling `ABCJS.renderMidi` ) |
// 	| `tempo` | false | Show the tempo change controls. This is a spinner that starts at 100%. There is an absolute tempo printed next to it.  **Not yet implemented** |
// 	| `tooltipSelection` | "Click to toggle play selection/play all." | The text of the tooltip.  **Not yet implemented** |
// 	| `tooltipLoop` | "Click to toggle play once/repeat." | The text of the tooltip. |
// 	| `tooltipReset` | "Click to go to beginning." | The text of the tooltip. |
// 	| `tooltipPlay` | "Click to play/pause." | The text of the tooltip. |
// 	| `tooltipProgress` | "Click to change the playback position." | The text of the tooltip. |
// 	| `tooltipTempo` | "Change the playback speed." | The text of the tooltip.  **Not yet implemented** |

</script>

<style>
	.audio-page .input-group {
		min-width: 200px;
		margin-right: 10px;
	}
</style>
