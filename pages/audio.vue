<template>
	<v-layout class="audio-page">
		<v-flex xs12 sm12 md12 lg12>
			<div class="combine-cards">
			<v-card class="narrow">
				<v-card-title>
					<v-btn flat icon @click="optionsOpen = !optionsOpen">
						<v-icon>{{optionsOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					Options</v-card-title>
				<v-card-text :class="optionsOpen ? 'opened' : 'closed'">
					<h2>General Params</h2>
					<v-layout wrap justify-start align-center>
						<TextInputItem label="Quarter Notes Per Minute" :help="helpText.qpm" v-model="midiParams.qpm"></TextInputItem>
						<TextInputItem label="Instrument number (program)" :help="helpText.program" v-model="midiParams.program"></TextInputItem>
						<TextInputItem label="Half-steps to transpose" :help="helpText.transpose" v-model="midiParams.transpose"></TextInputItem>
						<TextInputItem label="Index of the Tune" :help="helpText.startingTune" v-model="renderParams.startingTune"></TextInputItem>
						<TextInputItem label="Sound Font Location" :help="helpText.soundFontUrl" v-model="soundFontUrl"></TextInputItem>
					</v-layout>
					<h2>Download Params</h2>
					<v-layout wrap justify-start align-center>
						<CheckboxItem label="Downloadable MIDI?" :help="helpText.generateDownload" v-model="midiParams.generateDownload"></CheckboxItem>
						<TextInputItem label="Download Link Label (%T=title)" :help="helpText.downloadLabel" v-model="midiParams.downloadLabel"></TextInputItem>
						<TextInputItem label="Pre-Download Text" :help="helpText.preTextDownload" v-model="midiParams.preTextDownload"></TextInputItem>
						<TextInputItem label="Post-Download Text" :help="helpText.postTextDownload" v-model="midiParams.postTextDownload"></TextInputItem>
					</v-layout>
					<h2>Inline Params</h2>
					<v-layout wrap justify-start align-center>
						<CheckboxItem label="Inline MIDI?" :help="helpText.generateInline" v-model="midiParams.generateInline"></CheckboxItem>
						<CheckboxItem label="Show Loop Toggle?" :help="helpText.loopToggle" v-model="midiParams.inlineControls.loopToggle"></CheckboxItem>
						<CheckboxItem label="Standard Controls?" :help="helpText.standard" v-model="midiParams.inlineControls.standard"></CheckboxItem>
						<CheckboxItem label="Tempo Control?" :help="helpText.tempo" v-model="midiParams.inlineControls.tempo"></CheckboxItem>
						<CheckboxItem label="Hide?" :help="helpText.hide" v-model="midiParams.inlineControls.hide"></CheckboxItem>
						<CheckboxItem label="Auto Play?" :help="helpText.startPlaying" v-model="midiParams.inlineControls.startPlaying"></CheckboxItem>
						<TextInputItem label="Pre-Inline Text (%T=title)" :help="helpText.preTextInline" v-model="midiParams.inlineControls.preTextInline"></TextInputItem>
						<TextInputItem label="Post-Inline Text (%T=title)" :help="helpText.postTextInline" v-model="midiParams.inlineControls.postTextInline"></TextInputItem>
						<TextInputItem label="Loop Tooltip" :help="helpText.tooltipLoop" v-model="midiParams.inlineControls.tooltipLoop"></TextInputItem>
						<TextInputItem label="Reset Tooltip" :help="helpText.tooltipReset" v-model="midiParams.inlineControls.tooltipReset"></TextInputItem>
						<TextInputItem label="Play Tooltip" :help="helpText.tooltipPlay" v-model="midiParams.inlineControls.tooltipPlay"></TextInputItem>
						<TextInputItem label="Progress Tooltip" :help="helpText.tooltipProgress" v-model="midiParams.inlineControls.tooltipProgress"></TextInputItem>
						<TextInputItem label="Tempo Tooltip" :help="helpText.tooltipTempo" v-model="midiParams.inlineControls.tooltipTempo"></TextInputItem>
					</v-layout>

					<h2>Callback Params</h2>
					<v-layout wrap justify-start align-center>
						<CheckboxItem label="Listener?" :help="helpText.doListener" v-model="midiParams.doListener"></CheckboxItem>
						<CheckboxItem label="Animate?" :help="helpText.doAnimate" v-model="midiParams.doAnimate"></CheckboxItem>
						<TextInputItem label="Callback Context" :help="helpText.context" v-model="midiParams.context"></TextInputItem>
					</v-layout>

					<h2>Metronome Params</h2>
					<v-layout wrap justify-start align-center>
						<TextInputItem label="Drum String" :help="helpText.drum" v-model="midiParams.drum"></TextInputItem>
						<TextInputItem label="Number of Bars" :help="helpText.drumBars" v-model="midiParams.drumBars"></TextInputItem>
						<TextInputItem label="Number Of Intro Bars" :help="helpText.drumIntro" v-model="midiParams.drumIntro"></TextInputItem>
					</v-layout>

					<h2>Commands</h2>
					<div class="button-row">
						<v-btn outline color="primary" @click="doPlay">Play/Pause</v-btn>
						<div><InfoDialog label="Play/Pause" :help="helpText.play"></InfoDialog></div>
						<v-btn outline color="primary" @click="doStop">Stop</v-btn>
						<div><InfoDialog label="Stop" :help="helpText.stop"></InfoDialog></div>
					</div>
				</v-card-text>
			</v-card>
			<v-card class="section-card">
				<v-card-title>
					<v-btn flat icon @click="outputOpen = !outputOpen">
						<v-icon>{{outputOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					Output</v-card-title>
				<v-card-text :class="outputOpen ? 'opened' : 'closed'">
					<div id="midi-id"></div>
					<div id="paper" class="paper amber lighten-4"></div>
					<div v-html="listenerOutput" v-if="listenerOutput"></div>
					<div v-html="animationOutput" v-if="animationOutput"></div>
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
					<code class="code-full">import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';
import abcjs from 'abcjs/midi;

{{javascriptString}}</code>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import {mapGetters} from 'vuex';
	import CheckboxItem from "../components/CheckboxItem";
	import TextInputItem from "../components/TextInputItem";
	import InfoDialog from "../components/InfoDialog";
	const abcjs = process.browser ? require('abcjs/midi.js') : null; // This requires document and window, so can't be used on the server side.

	export default {
		components: {CheckboxItem, TextInputItem, InfoDialog},
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

				soundFontUrl: "",
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
					program: "This is the standard MIDI program number (i.e. 0=grand piano, etc.). This may be overridden in the ABC string if there are %%MIDI commands.",
					qpm: "This overrides a Q: line in the ABC string and sets the number of quarter notes per minute. This is always measured in quarter notes, even in time signatures like 6/8.",
					transpose: "The number of half-steps to transpose. This can be a positive or negative number.",
					startingTune: "If there are multiple tunes in the input string, then this chooses which tune to display. For control over what is displayed, use with the \"Number of Tunes\" parameter. This is zero-based. If this is greater than the number of tunes in the input string, then nothing is displayed.",
					downloadLabel: "If the download option is chosen, this specifies The text in the link. You may use the special pattern \"%T\" to indicate that the title of the piece should be used.",
					preTextDownload: "This is to specify some optional text just before the download link.",
					postTextDownload: "This is to specify some optional text just after the download link.",
					preTextInline: "This is to specify some optional text on the left side of the audio control. You may use the special pattern \"%T\" to indicate that the title of the piece should be used.",
					postTextInline: "This is to specify some optional text on the right side of the audio control. You may use the special pattern \"%T\" to indicate that the title of the piece should be used.",
					tooltipLoop: "This is the title, or tooltip, that appears over the loop icon when it is hovered with the mouse.",
					tooltipReset: "This is the title, or tooltip, that appears over the reset icon when it is hovered with the mouse.",
					tooltipPlay: "This is the title, or tooltip, that appears over the play/pause icon when it is hovered with the mouse.",
					tooltipProgress: "This is the title, or tooltip, that appears over the sliding bar when it is hovered with the mouse.",
					tooltipTempo: "This is the title, or tooltip, that appears over the tempo widget icon when it is hovered with the mouse.",
					context: "This is an arbitrary variable that is passed back in the callback functions. This can be anything and is useful if you have more than one audio control on the page.",
					drum: "This is the drum pattern as specified in the ABC standard. See that documentation for complete details.",
					drumBars: "This is how many bars the specified drum pattern is defined for.",
					drumIntro: "This plays a number of measures of the drum pattern before the music starts.",
					play: "This has the same effect as clicking the play button on the audio control. If you wish to supply your own mechanism for playing audio, then you can hide the standard audio control, and start the playback with this.",
					stop: "This has the same effect as clicking stop button on the audio control. If you wish to supply your own mechanism for playing audio, then you can hide the standard audio control, and start the playback with this.",
					soundFontUrl: "This is the public URL for the sound font files. By default, the sound fonts are here: https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/ and you probably won't need to modify this, but if you want to host them on your own server, or you want different sounding instruments, you can override it here.\n\nImportant!\n<b>This is only used before the first call to the audio is made, so set this before you start playing a tune!</b>",
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
			'soundFontUrl': {
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
			doPlay() {
				abcjs.midi.startPlaying(document.querySelector(".audio-page .abcjs-inline-midi"));
			},
			doStop() {
				abcjs.midi.stopPlaying();
			},
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
			formatSoundFontCall() {
				const comment = this.soundFontUrl === "" ? "//" : "";
				return `${comment}abcjs.midi.setSoundFont("${this.soundFontUrl}");`;
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
    ${renderParams});

abcjs.midi.startPlaying(document.querySelector(".abcjs-inline-midi"));

abcjs.midi.stopPlaying();

${this.formatSoundFontCall()}`;

    			const soundFontUrl = this.soundFontUrl === "" ? "https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/" : this.soundFontUrl;
    			abcjs.midi.setSoundFont(soundFontUrl);
    			this.tunes = this.renderAbc()("paper", this.inputAbc(), {}, {}, this.renderParams);
				this.renderMidi()("midi-id", this.inputAbc(), {}, this.constructMidiParams(), this.renderParams);
			},
		}
	}

// soundfontUrl

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
