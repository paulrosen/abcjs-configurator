<template>
	<v-layout class="audio-page">
		<v-flex xs12 sm12 md12 lg12>
			<v-card>
				<v-card-title>
					<v-btn flat icon @click="javascriptOpen = !javascriptOpen">
						<v-icon>{{javascriptOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					JavaScript</v-card-title>
				<v-card-text :class="javascriptOpen ? 'opened' : 'closed'">
					<code class="code-full">import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';
import abcjs from 'abcjs/midi;

{{javascriptString}}</code>
				</v-card-text>
			</v-card>
			<v-card>
				<v-card-title>
					<v-btn flat icon @click="optionsOpen = !optionsOpen">
						<v-icon>{{optionsOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					Options</v-card-title>
				<v-card-text :class="optionsOpen ? 'opened' : 'closed'">
					<h2>General Params</h2>
					<v-layout wrap justify-start align-center>
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
							label="Index of the Tune"
					></v-text-field>
					</v-layout>
					<h2>Download Params</h2>
					<v-layout wrap justify-start align-center>
						<CheckboxItem label="Downloadable MIDI?" :help="helpText.generateDownload" v-model="midiParams.generateDownload"></CheckboxItem>
						<v-text-field
								class="numeric"
								v-model="midiParams.downloadLabel"
								label="Download Link Label (%T=title)"
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
					<v-layout wrap justify-start align-center>
						<CheckboxItem label="Inline MIDI?" :help="helpText.generateInline" v-model="midiParams.generateInline"></CheckboxItem>
						<CheckboxItem label="Show Loop Toggle?" :help="helpText.loopToggle" v-model="midiParams.inlineControls.loopToggle"></CheckboxItem>
						<CheckboxItem label="Standard Controls?" :help="helpText.standard" v-model="midiParams.inlineControls.standard"></CheckboxItem>
						<CheckboxItem label="Tempo Control?" :help="helpText.tempo" v-model="midiParams.inlineControls.tempo"></CheckboxItem>
						<CheckboxItem label="Hide?" :help="helpText.hide" v-model="midiParams.inlineControls.hide"></CheckboxItem>
						<CheckboxItem label="Auto Play?" :help="helpText.startPlaying" v-model="midiParams.inlineControls.startPlaying"></CheckboxItem>
						<v-text-field
								class="numeric"
								v-model="midiParams.preTextInline"
								label="Pre-Inline Text (%T=title)"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="midiParams.postTextInline"
								label="Post-Inline Text (%T=title)"
						></v-text-field>
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

					<h2>Callback Params</h2>
					<v-layout wrap justify-start align-center>
						<CheckboxItem label="Listener?" :help="helpText.doListener" v-model="midiParams.doListener"></CheckboxItem>
						<CheckboxItem label="Animate?" :help="helpText.doAnimate" v-model="midiParams.doAnimate"></CheckboxItem>
						<v-text-field
								class="numeric"
								v-model="midiParams.context"
								label="Callback Context"
						></v-text-field>
					</v-layout>

					<h2>Metronome Params</h2>
					<v-layout wrap justify-start align-center>
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
				<v-card-title>
					<v-btn flat icon @click="outputOpen = !outputOpen">
						<v-icon>{{outputOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					Output</v-card-title>
				<v-card-text :class="outputOpen ? 'opened' : 'closed'">
					<div v-html="listenerOutput" v-if="listenerOutput"></div>
					<div id="midi-id"></div>
					<div id="paper" class="paper amber lighten-4"></div>
					<div v-html="animationOutput" v-if="animationOutput"></div>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import {mapGetters} from 'vuex';
	import CheckboxItem from "../components/CheckboxItem";

	export default {
		components: {CheckboxItem},
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
				javascriptOpen: true,
				optionsOpen: true,
				outputOpen: true,
				tunes: null,
				listenerOutput: null,
				animationOutput: null,

				helpText: {
					generateDownload: "Do you want to generate a MIDI file? The user can click on a generated link to download that file.",
					generateInline: "Do you want to create an audio control so the user can interact with the audio in a familiar way? (Note that if you want to programmatically interact with the audio but not let the user have control, you should choose this option, but then hide the generated control.) The control has the class \"abcjs-inline-midi\".",

					loopToggle: "Should the audio control contain a \"loop\" icon? This is a toggle. When set by the user, the audio will play repeatedly.",
					standard: "Should the audio control contain the \"restart\", \"start/pause\", \"progress\", and \"clock\" elements? See the audio control on this page to see how they work.",
					tempo: "Should the audio control contain an element that allows the user to change the speed of the playback?",
					hide: "Should the audio control be hidden from the page? It can still be interacted with programmatically with the abcjs.midi.startPlaying() and abcjs.midi.stopPlaying() functions.",
					startPlaying: "Should the music auto play as soon as it is ready? Combining this with \"hide\" and \"animate\" is a nice effect.",

					doListener: "Pass a callback function here to receive a notification at regular intervals when time has passed. (That is, whether a note has started or stopped.) The function receives three parameters: the audio control element, a status object containing the fields: { currentTime, duration, newBeat, progress }, and whatever value is in the \"context\" parameter. The purpose of the \"context\" is to differentiate between multiple audio controls on a page. WARNING: Do not do any long processing in this function. It needs to return before the next MIDI event happens.",
					doAnimate: `Pass a callback function here to receive a notification whenever a MIDI event has passed. (That is, whether a note has started or stopped.) The function receives three parameters: lastRange, currentRange, and whatever value is in the \"context\" parameter. The purpose of the \"context\" is to differentiate between multiple audio controls on a page. The ranges are arrays of elements that can be manipulated however you like. WARNING: Do not do any long processing in this function. It needs to return before the next MIDI event happens. The following is an example where the currently played notes are colored blue:

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
			this.colorRange(lastRange, "#000000");
			this.colorRange(currentRange, "#3D9AFC");
		},`,
				}
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
		mounted() {
			setTimeout(() => {
				this.redraw();
			}, 1);
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
				setTimeout(() => {
					this.listenerOutput = `<code class="indented">listenerCallback(abcjsElement, currentEvent, context) {
    abcjsElement: &lt;div class="abcjs-inline-midi"&gt;
    currentEvent: {
        currentTime: ${currentEvent.currentTime},
        newBeat: ${currentEvent.newBeat},
        duration: ${currentEvent.duration},
        progress: ${currentEvent.progress},
    },
    context: ${context}
}
</code>`;
				}, 0);
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
			formatElements(elements) {
				let str = "";
				let arr = [];
				if (elements) {
					elements.forEach((el) => {
						let classes = [];
						el.forEach((item) => {
							classes.push(item.attrs.class);
						});
						arr.push(`            ${classes.join(" | ")}`);
					});
					str = arr.join("\n");
				}
				if (!str)
					str = "        (no elements)";
				return str;
			},
			formatRange(range) {
				if (!range)
					return "(null)";

				return `{
        type: ${range.type},
        elements (SVG paths):
${this.formatElements(range.elements)},
        milliseconds: ${range.milliseconds},
        top: ${range.top},
        left: ${range.left},
        width: ${range.width},
        height: ${range.height},
    }
`;
			},
			animateCallback(lastRange, currentRange, context) {
				// This provides the actual visual note being played. It can be used to create the "bouncing ball" effect.
				this.animationOutput = `<code class="indented">animateCallback(lastRange, currentRange, context) {
    lastRange: ${this.formatRange(lastRange)}
    currentRange: ${this.formatRange(currentRange)}
    context: ${context}
}
</code>`;

				this.colorRange(lastRange, "#000000"); // Set the old note back to black.
				this.colorRange(currentRange, "#3D9AFC"); // Set the currently sounding note to blue.
			},
			redraw() {
				this.listenerOutput = null;
				this.animationOutput = null;
				const midiParams = this.formatMidiParams();
				const renderParams = this.formatRenderParams();
    			this.javascriptString = `abcjs.renderMidi(
    "midi-id",
    abcString,
    { },
    ${midiParams},
    ${renderParams});`;

    			this.tunes = this.renderAbc()("paper", this.inputAbc(), {}, {}, this.renderParams);
				this.renderMidi()("midi-id", this.inputAbc(), {}, this.constructMidiParams(), this.renderParams);
			},
		}
	}

// soundfontUrl

	// midi.startPlaying(audio element)
	// midi.stopPlaying()

// 	| `qpm` | 180 | The tempo, if not specified in abcString. |
// 	| `program` | 0 | The midi program (aka "instrument") to use, if not specified in abcString. |
// 	| `transpose` | 0 | The number of half-steps to transpose the everything, if not specified in abcString. |
// 	| `downloadLabel` | "download midi" | The text for the MIDI download. If it contains `%T` then that is replaced with the first title. If this is a function, then the result of that function is called. The function takes two parameters: the parsed tune and the zero-based index of the tune in the tunebook. |
// 	| `preTextDownload` | "" | Text that appears right before the download link (can contain HTML markup). |
// 	| `postTextDownload` | "" | Text that appears right after the download link (can contain HTML markup). |
// 	| `preTextInline` | "" | Text that appears right before the MIDI controls (can contain HTML markup). If it contains `%T` then that is replaced with the first title. |
// 	| `postTextInline` | "" | Text that appears right after the MIDI controls (can contain HTML markup). If it contains `%T` then that is replaced with the first title. |
// 	| `context` | null | A string that is passed back to both the listener and animate callbacks. |
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
// 	| `tooltipSelection` | "Click to toggle play selection/play all." | The text of the tooltip.  **Not yet implemented** |
// 	| `tooltipLoop` | "Click to toggle play once/repeat." | The text of the tooltip. |
// 	| `tooltipReset` | "Click to go to beginning." | The text of the tooltip. |
// 	| `tooltipPlay` | "Click to play/pause." | The text of the tooltip. |
// 	| `tooltipProgress` | "Click to change the playback position." | The text of the tooltip. |
// 	| `tooltipTempo` | "Change the playback speed." | The text of the tooltip.  **Not yet implemented** |

</script>

<style>
	.audio-page .input-group {
		min-width: 250px;
		max-width: 250px;
		margin-right: 10px;
	}
	.audio-page 	#midi-id {
		margin-bottom: 15px;
		max-width: 770px;
	}
</style>
