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
						<TextInputItem label="Quarter Notes Per Minute" :help="helpText.qpm" v-model="abcjsParams.qpm"></TextInputItem>
						<TextInputItem label="Instrument number (program)" :help="helpText.program" v-model="abcjsParams.program"></TextInputItem>
						<TextInputItem label="Half-steps to transpose" :help="helpText.midiTranspose" v-model="abcjsParams.midiTranspose"></TextInputItem>
						<TextInputItem label="Index of the Tune" :help="helpText.startingTune" v-model="abcjsParams.startingTune"></TextInputItem>
						<TextInputItem label="Sound Font Location" :help="helpText.soundFontUrl" v-model="soundFontUrl"></TextInputItem>
					</v-layout>
					<h2>Download Params</h2>
					<v-layout wrap justify-start align-center>
						<CheckboxItem label="Downloadable MIDI?" :help="helpText.generateDownload" v-model="abcjsParams.generateDownload"></CheckboxItem>
						<TextInputItem label="Download Link Label (%T=title)" :help="helpText.downloadLabel" v-model="abcjsParams.downloadLabel"></TextInputItem>
						<TextInputItem label="Pre-Download Text" :help="helpText.preTextDownload" v-model="abcjsParams.preTextDownload"></TextInputItem>
						<TextInputItem label="Post-Download Text" :help="helpText.postTextDownload" v-model="abcjsParams.postTextDownload"></TextInputItem>
						<TextInputItem label="Download Class" :help="helpText.downloadClass" v-model="abcjsParams.downloadClass"></TextInputItem>
					</v-layout>
					<h2>Inline Params</h2>
					<v-layout wrap justify-start align-center>
						<CheckboxItem label="Large Audio Control?" :help="helpText.largeAudioControl" v-model="largeAudioControl"></CheckboxItem>
						<CheckboxItem label="Inline MIDI?" :help="helpText.generateInline" v-model="abcjsParams.generateInline"></CheckboxItem>
						<CheckboxItem label="Show Loop Toggle?" :help="helpText.loopToggle" v-model="abcjsParams.inlineControls.loopToggle"></CheckboxItem>
						<CheckboxItem label="Standard Controls?" :help="helpText.standard" v-model="abcjsParams.inlineControls.standard"></CheckboxItem>
						<CheckboxItem label="Tempo Control?" :help="helpText.tempo" v-model="abcjsParams.inlineControls.tempo"></CheckboxItem>
						<CheckboxItem label="Hide?" :help="helpText.hide" v-model="abcjsParams.inlineControls.hide"></CheckboxItem>
						<CheckboxItem label="Auto Play?" :help="helpText.startPlaying" v-model="abcjsParams.inlineControls.startPlaying"></CheckboxItem>
						<CheckboxItem label="No Melody?" :help="helpText.voicesOff" v-model="abcjsParams.voicesOff"></CheckboxItem>
						<CheckboxItem label="No Chords?" :help="helpText.chordsOff" v-model="abcjsParams.chordsOff"></CheckboxItem>
						<TextInputItem label="Pre-Inline Text (%T=title)" :help="helpText.preTextInline" v-model="abcjsParams.preTextInline"></TextInputItem>
						<TextInputItem label="Post-Inline Text (%T=title)" :help="helpText.postTextInline" v-model="abcjsParams.postTextInline"></TextInputItem>
						<TextInputItem label="Loop Tooltip" :help="helpText.tooltipLoop" v-model="abcjsParams.inlineControls.tooltipLoop"></TextInputItem>
						<TextInputItem label="Reset Tooltip" :help="helpText.tooltipReset" v-model="abcjsParams.inlineControls.tooltipReset"></TextInputItem>
						<TextInputItem label="Play Tooltip" :help="helpText.tooltipPlay" v-model="abcjsParams.inlineControls.tooltipPlay"></TextInputItem>
						<TextInputItem label="Progress Tooltip" :help="helpText.tooltipProgress" v-model="abcjsParams.inlineControls.tooltipProgress"></TextInputItem>
						<TextInputItem label="Tempo Tooltip" :help="helpText.tooltipTempo" v-model="abcjsParams.inlineControls.tooltipTempo"></TextInputItem>
					</v-layout>

					<h2>Callback Params</h2>
					<v-layout wrap justify-start align-center>
						<CheckboxItem label="Listener?" :help="helpText.doListener" v-model="abcjsParams.doListener"></CheckboxItem>
						<CheckboxItem label="Animate?" :help="helpText.doAnimate" v-model="abcjsParams.doAnimate"></CheckboxItem>
						<TextInputItem label="Callback Context" :help="helpText.context" v-model="abcjsParams.context"></TextInputItem>
					</v-layout>

					<h2>Metronome Params</h2>
					<v-layout wrap justify-start align-center>
						<TextInputItem label="Drum String" :help="helpText.drum" v-model="abcjsParams.drum" dlgWidth="500"></TextInputItem>
						<TextInputItem label="Number of Bars" :help="helpText.drumBars" v-model="abcjsParams.drumBars"></TextInputItem>
						<TextInputItem label="Number Of Intro Bars" :help="helpText.drumIntro" v-model="abcjsParams.drumIntro"></TextInputItem>
					</v-layout>

					<h2>Commands</h2>
					<div class="button-row">
						<v-btn outline color="primary" @click="doPlay">Play/Pause</v-btn>
						<div><InfoDialog label="Play/Pause" :help="helpText.play"></InfoDialog></div>
						<v-btn outline color="primary" @click="doStop">Stop</v-btn>
						<div><InfoDialog label="Stop" :help="helpText.stop"></InfoDialog></div>
						<v-btn outline color="primary" @click="doRestart">Restart</v-btn>
						<div><InfoDialog label="Restart" :help="helpText.restart"></InfoDialog></div>
						<v-btn outline color="primary" @click="doLoop">Loop</v-btn>
						<div><InfoDialog label="Loop" :help="helpText.loop"></InfoDialog></div>
						<v-btn outline color="primary" @click="doOneThird">Move To 1/3</v-btn>
						<v-btn outline color="primary" @click="doTwoThirds">Move To 2/3</v-btn>
						<div><InfoDialog label="Random" :help="helpText.random"></InfoDialog></div>
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
					<div v-if="largeAudioControl">
						<div class="footnote">Add the class "abcjs-large" to the div that will contain the midi control.</div>
					</div>
					<div id="midi-id" :class="largeAudioControl ? 'abcjs-large' : ''"></div>
					<div id="current-abc-element" v-html="currentAbcElement"></div>
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
				abcjsParams: {
					qpm: "",
					program: "",
					midiTranspose: "",
					generateDownload: false,
					generateInline: true,
					downloadLabel: "download midi",
					downloadClass: "",
					preTextDownload: "",
					postTextDownload: "",
					preTextInline: "",
					postTextInline: "",
					doListener: false,
					doAnimate: false,
					voicesOff: false,
					chordsOff: false,
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

					startingTune: "0",
				},

				largeAudioControl: false,
				soundFontUrl: "",
				javascriptString: "",
				javascriptOpen: true,
				optionsOpen: true,
				outputOpen: true,
				tunes: null,
				listenerOutput: null,
				animationOutput: null,
				loopOn: false,
				currentAbcElement: '',
				startIndexOfTune: 0,

				helpText: {
					largeAudioControl: "Double the size of the audio control so that it is easier to use on a touch device.",
					generateDownload: "Do you want to generate a MIDI file? The user can click on a generated link to download that file.",
					generateInline: "Do you want to create an audio control so the user can interact with the audio in a familiar way? (Note that if you want to programmatically interact with the audio but not let the user have control, you should choose this option, but then hide the generated control.) The control has the class \"abcjs-inline-midi\".",

					loopToggle: "Should the audio control contain a \"loop\" icon? This is a toggle. When set by the user, the audio will play repeatedly.",
					standard: "Should the audio control contain the \"restart\", \"start/pause\", \"progress\", and \"clock\" elements? See the audio control on this page to see how they work.",
					tempo: "Should the audio control contain an element that allows the user to change the speed of the playback?",
					hide: "Should the audio control be hidden from the page? It can still be interacted with programmatically with the abcjs.midi.startPlaying() and abcjs.midi.stopPlaying() functions.",
					startPlaying: "Should the music auto play as soon as it is ready? Combining this with \"hide\" and \"animate\" is a nice effect.",
					voicesOff: "When playing audio, play the metronome track and the accompaniment track, but don't play the melody. The animation over the melody line works normally. This is useful to create a \"music-minus-one\" effect.",
					chordsOff: "When playing audio, do not play the chords track.",

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
					midiTranspose: "The number of half-steps to transpose. This can be a positive or negative number.",
					startingTune: "If there are multiple tunes in the input string, then this chooses which tune to display. For control over what is displayed, use with the \"Number of Tunes\" parameter. This is zero-based. If this is greater than the number of tunes in the input string, then nothing is displayed.",
					downloadClass: "This adds the specified classes to the download link. (To see a visual change in this demo, use the class \"colorful\").",
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
					drum: `This is the drum pattern as specified in the ABC standard. See that documentation for complete details.
The following table shows some reasonable values for different time signatures.

${this.formatDrumTable()}`,
					drumBars: "This is how many bars the specified drum pattern is defined for.",
					drumIntro: "This plays a number of measures of the drum pattern before the music starts.",
					play: "This has the same effect as clicking the play button on the audio control. If you wish to supply your own mechanism for playing audio, then you can hide the standard audio control, and start the playback with this.",
					stop: "This has the same effect as clicking stop button on the audio control. If you wish to supply your own mechanism for playing audio, then you can hide the standard audio control, and start the playback with this.",
					restart: "This has the same effect as clicking the restart button on the audio control. If you wish to supply your own mechanism for playing audio, then you can hide the standard audio control, and restart the playback with this.",
					loop: "This has the same effect as clicking the loop button on the audio control. If you wish to supply your own mechanism for playing audio, then you can hide the standard audio control, and change the loop with this. (This requires that \"Show Loop Toggle\" is checked.)",
					random: "Move the progress to whatever percent complete you want.",
					soundFontUrl: "This is the public URL for the sound font files. By default, the sound fonts are here: https://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/ and you probably won't need to modify this, but if you want to host them on your own server, or you want different sounding instruments, you can override it here.\n\nImportant!\n<b>This is only used before the first call to the audio is made, so set this before you start playing a tune!</b>",
				}
			};
		},
		watch: {
			'abcjsParams': {
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
			doRestart() {
				abcjs.midi.restartPlaying();
			},
			doLoop() {
				this.loopOn = !this.loopOn;
				abcjs.midi.setLoop(document.querySelector(".audio-page .abcjs-inline-midi"), this.loopOn);
			},
			doOneThird() {
				abcjs.midi.setRandomProgress(0.33);
			},
			doTwoThirds() {
				abcjs.midi.setRandomProgress(0.66);
			},
			constructMidiParams() {
				this.abcjsParams.midiListener = this.abcjsParams.doListener ? this.listenerCallback : undefined;
				this.abcjsParams.animate = this.abcjsParams.doAnimate ?
					{ listener: this.animateCallback, target: this.tunes[0] }
					: undefined;
				return this.abcjsParams;
			},
			formatDrumTable() {
				return `<table class="datatable table drum-examples"><tr><th>Time Sig</th><th>Drum String</th><th>Num Bars</th><th>Bars of Intro</th></tr>
<tr><td>2/4</td><td>dd 76 77 60 30</td><td>1</td><td>2</td></tr>
<tr><td>3/4</td><td>ddd 76 77 77 60 30 30</td><td>1</td><td>1</td></tr>
<tr><td>4/4</td><td>dddd 76 77 77 77 60 30 30 30</td><td>1</td><td>1</td></tr>
<tr><td>5/4</td><td>ddddd 76 77 77 76 77 60 30 30 60 30</td><td>1</td><td>1</td></tr>
<tr><td>Cut Time</td><td>dd 76 77 60 30</td><td>1</td><td>2</td></tr>
<tr><td>6/8</td><td>dd 76 77 60 30</td><td>1</td><td>2</td></tr>
<tr><td>9/8</td><td>ddd 76 77 77 60 30 30</td><td>1</td><td>1</td></tr>
<tr><td>9/8</td><td>dddd 76 77 77 77 60 30 30 30</td><td>1</td><td>1</td></tr>
<tr><td></td><td></td><td></td><td></td></tr>
<tr><td>4/4</td><td>d2dd2ddz 76 77 76 77 77 60 30 60 30 30</td><td>2</td><td>4</td></tr>
</table>`.replace(/\n/g,"");
			},
			formatInlineControls() {
				let params = "";
				if (!this.abcjsParams.inlineControls.standard)
					params += "\n            standard: false,";
				if (this.abcjsParams.inlineControls.loopToggle)
					params += "\n            loopToggle: true,";
				if (this.abcjsParams.inlineControls.hide)
					params += "\n            hide: true,";
				if (this.abcjsParams.inlineControls.startPlaying)
					params += "\n            startPlaying: true,";
				if (this.abcjsParams.inlineControls.tempo)
					params += "\n            tempo: true,";
				if (this.abcjsParams.inlineControls.tooltipLoop !== "Click to toggle play once/repeat.")
					params += `\n            tooltipLoop: "${this.abcjsParams.inlineControls.tooltipLoop}",`;
				if (this.abcjsParams.inlineControls.tooltipReset !== "Click to go to beginning.")
					params += `\n            tooltipReset: "${this.abcjsParams.inlineControls.tooltipReset}",`;
				if (this.abcjsParams.inlineControls.tooltipPlay !== "Click to play/pause.")
					params += `\n            tooltipPlay: "${this.abcjsParams.inlineControls.tooltipPlay}",`;
				if (this.abcjsParams.inlineControls.tooltipProgress !== "Click to change the playback position.")
					params += `\n            tooltipProgress: "${this.abcjsParams.inlineControls.tooltipProgress}",`;
				if (this.abcjsParams.inlineControls.tooltipTempo !== "Change the playback speed.")
					params += `\n            tooltipTempo: "${this.abcjsParams.inlineControls.tooltipTempo}",`;
				return params;
			},
			formatMidiParams() {
				let params = "";
				if (this.abcjsParams.qpm !== "")
					params += `\n        qpm: ${this.abcjsParams.qpm},`;
				if (this.abcjsParams.program !== "")
					params += `\n        program: ${this.abcjsParams.program},`;
				if (this.abcjsParams.midiTranspose !== "")
					params += `\n        midiTranspose: ${this.abcjsParams.midiTranspose},`;
				if (this.abcjsParams.voicesOff)
					params += "\n            voicesOff: true,";
				if (this.abcjsParams.chordsOff)
					params += "\n            chordsOff: true,";
				if (this.abcjsParams.generateDownload)
					params += "\n        generateDownload: true,";
				if (!this.abcjsParams.generateInline)
					params += "\n        generateInline: false,";
				if (this.abcjsParams.downloadLabel !== "download midi")
					params += `\n        downloadLabel: "${this.abcjsParams.downloadLabel}",`;
				if (this.abcjsParams.downloadClass !== "")
					params += `\n        downloadClass: "${this.abcjsParams.downloadClass}",`;
				if (this.abcjsParams.preTextDownload !== "")
					params += `\n        preTextDownload: "${this.abcjsParams.preTextDownload}",`;
				if (this.abcjsParams.postTextDownload !== "")
					params += `\n        postTextDownload: "${this.abcjsParams.postTextDownload}",`;
				if (this.abcjsParams.preTextInline !== "")
					params += `\n        preTextInline: "${this.abcjsParams.preTextInline}",`;
				if (this.abcjsParams.postTextInline !== "")
					params += `\n        postTextInline: "${this.abcjsParams.postTextInline}",`;
				if (this.abcjsParams.drum !== "")
					params += `\n        drum: \"${this.abcjsParams.drum}\",`;
				if (this.abcjsParams.drumBars !== "1")
					params += `\n        drumBars: ${this.abcjsParams.drumBars},`;
				if (this.abcjsParams.drumIntro !== "0")
					params += `\n        drumIntro: ${this.abcjsParams.drumIntro},`;
				if (this.abcjsParams.doListener)
					params += `\n        midiListener: function(abcjsElement, currentEvent, context) {},`;
				if (this.abcjsParams.doAnimate)
					params += `\n        animate: { listener: function(abcjsElement, currentEvent, context) {}, target: tunes[0], qpm: 120 },`;
				if (this.abcjsParams.context)
					params += `\n        context: ${this.abcjsParams.context},`;

				const inlineControls = this.formatInlineControls();
				if (inlineControls !== '')
					params += `\n        inlineControls: {${inlineControls}\n        },`;

				if (this.abcjsParams.startingTune !== "0")
					params += `\n        startingTune: ${this.abcjsParams.startingTune},`;

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
							item.setAttribute("fill", color);
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
							classes.push(item.className);
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
        startChar: ${range.startChar},
        endChar: ${range.endChar},
        startCharArray: ${range.startCharArray},
        endCharArray: ${range.endCharArray},
        [ abcString.substring(startChar,endChar) = ${ this.inputAbc().substring(range.startChar, range.endChar)} ]
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
				let abcText = [];
				currentRange.startCharArray.forEach((st, i) => {
					abcText.push(this.inputAbc().substring(this.startIndexOfTune+st, this.startIndexOfTune+currentRange.endCharArray[i]))
				});
				this.currentAbcElement = abcText.join(" ")
			},
			redraw() {
				this.listenerOutput = null;
				this.animationOutput = null;
				const abcjsParams = this.formatMidiParams();
    			this.javascriptString = `abcjs.renderMidi(
    "midi-id",
    abcString,
    ${abcjsParams});

abcjs.midi.startPlaying(document.querySelector(".abcjs-inline-midi"));

abcjs.midi.stopPlaying();

abcjs.midi.restartPlaying();

abcjs.midi.setLoop(document.querySelector(".abcjs-inline-midi"), true);

abcjs.midi.setRandomProgress(0.33);

${this.formatSoundFontCall()}`;

    			const soundFontUrl = this.soundFontUrl === "" ? "https://paulrosen.github.io/midi-js-soundfonts/FluidR3_GM/" : this.soundFontUrl;
    			abcjs.midi.setSoundFont(soundFontUrl);
    			this.tunes = this.renderAbc()("paper", this.inputAbc(), this.abcjsParams);
				const tunes = new abcjs.TuneBook(this.inputAbc());
				this.startIndexOfTune = tunes.tunes[this.abcjsParams.startingTune].startPos;
				console.log(this.inputAbc().substring(this.startIndexOfTune, this.startIndexOfTune+5))

				this.renderMidi()("midi-id", this.inputAbc(), this.constructMidiParams());
			},
		}
	}
//X: 22 T:Money Lost M:3/4 L:1/8 Q:1/4=100 C:Paul Rosen S:Copyright 2007, Paul Rosen R:Klezmer K:Dm Ade|:"Dm"(f2d)e gf|"A7"e2^c4|"Gm"B>>^c BA BG|"A"A3Ade|"Dm"(f2d)e gf|"A7"e2^c4| "Gm"A>>B "A7"AG FE|1"Dm"D3Ade:|2"Dm"D3DEF||:"Gm"(G2D)E FG|"Dm"A2F4|"Gm"B>>c "A7"BA BG| "Dm"A3 DEF|"Gm"(G2D)EFG|"Dm"A2F4|"E°"E>>Fy "(A7)"ED^C2|1"Dm"D3DEF:|2"Dm"D6|| X: 39 T:Pretty Little Liza C:Paul Rosen S:Copyright 2005, Paul Rosen M:4/4 L:1/8 Q:1/2=106 R:old time K:Am "Am"A2AA c2dd|e2eg e2dc|A2AA c2dd|e2cc A2cc|"Em (G)"B2BB B2BB| B2BB B2BB|"Am"A2AA c2dd|e2eg e2c2|"D"d2dd d2dd|d2dd d2cd| "Am"e2cc A2c2|"G"BAG2 BAG2|"Am"A2AA A2AA|A2AA A2AA|:"Am"e4 a3e|"G"g2d2- d2eg| "Am"a2aa ged2|"Em"e2ee e2ee|"Am"e4 a3e|"G"g2d2- d2Bc|"Em"d2e2 dcB2|"Am"A2AA A2AA:| X:1 M:4/4 L:1/16 %%stretchlast .7 Q:1/4=100 T:Piano %%staves {(PianoRightHand) (PianoLeftHand)} V:PianoRightHand clef=treble V:PianoLeftHand clef=bass K:C [V: PianoRightHand] !mp!e2f2 e2d2 c2B2 A4|!>(!B2d2 g4 c6 !>)!e2|!p![G4e4] z4 A4 G4|c12 z4|[A12f12] [g4d4]|z4 !<(!B4 !<)![A8c8]| !mf!A4 z4 d8|B8 [G4c4] z4|f2A2 c4 f4 g4|[f12d12] e4|!<(!A4 A4 c2e2 !<)!g4|!f!e8 z8| [A4d4] z4 A8|BcBA G4 c4 G2B2|A2G2 A2B2 c4 B2G2|c12 z4|] [V: PianoLeftHand] [E,12C,12] F,4|[G,8D,8] [C,8E,8]|G,4 C,4 C,4 B,,A,,C,B,,|A,,12 z4|A,,4 B,,4 C,2D,2 B,,C,D,E,|C,2E,2 G,4 E,2F,2 G,4| F,4 A,4 [A,8F,8]|G,2F,2 E,2D,2 [C,4E,4] z4|[F,8A,8] [D,4A,4] z4|F,2G,2 A,2F,2 D,2F,2 C,2B,,2|C,4 F,A,D,F, E,4 z4|C,8 z8| F,4 E,4 F,4 A,4|[D,8G,8] E,4 z4|C,4 [C,4F,4] z4 G,4|C,12 z4|] X:100 T:Mary M:C L:1/4 K:G BAGA| BBB2|AAA2| Bdd2| w:Mar- y had a lit- tle lamb, lit- tle lamb, lit- tle lamb, BAGA| BBBB|AABA |G|] w:Mar- y had a lit- tle lamb whose fleece was white as snow. X:1 %%staves 1 2 3 T: Sonata I C: J.S. Bach M: C Q:"Adagio" L: 1/8 K:C V:1 clef=treble name="Violino I" sname="Vl. I" V:2 clef=treble name="Violino II" sname="Vl. II" space=+10 V:3 clef=bass name="Violoncello" sname="Vc." [V:1] g8-|gf/e/ {e}f>g (a/f/d/f/) (A//=B//A//B//TB3//A///B///)| [V:2] z8 | z8 | [V:3] z cec gGBG | Aa- a/_b/a/g/ f3 g/f/ | % [V:1] c/gf/ E/ed/ c/c'b/ A/ag/ | ^f/e/d- d/(c/B/A/) G/(e/c/e/) Aa| d2-d/g/_b/a/ a3 g/=f/| [V:2] c8- | cB/A/ {A}B>c (e/c/A/c/) (E//^F//E//F//TF3//E///F///) | G/(D/G/A/) _B/G/g/e/ ^cA d2-| [V:3] edcB AG^FE | D^FGg c3d/c/| _BG g2-gf/e/ f>g| X:665 T:Amazing Grace C:Lyric Author: John Newton R:Early American Melody Z:Public Domain N:A well known tune L:1/4 M:3/4 %%staves (S A) (T B) V:S clef=treble name="" V:A clef=treble name="" V:T clef=bass name="" V:B clef=bass name="" K:Ab % Measures 1 - 7 [V:S] (E/ F/) | A2 (c/ A/) | c2 B | A2 F | E2 (E/ F/) | A2 (c/ A/) | c2 (B/ c/) | He2 | [V:A] (C/ D/) | C2 (E/ C/) | E2 D | C2 D | C2 (C/ D/) | C2 (E/ C/) | E2 A | G2 | [V:T] A, | E,2 A, | A,2 G, | A,2 A, | A,2 A, | E,2 A, | A,2 A, | HB,2 | [V:B] A,, | A,,2 A,, | A,,2 E, | F,2 D, | A,,2 A,, | A,,2 A,, | A,2 F, | E,2 | % Measures 8 - 14 [V:S] (B/ c/) | e2 (e/ c/) | A2 (F/ E/) | A2 F | E2 (E/ F/) | A2 (c/ A/) | c2 B | HA2 | [V:A] G | A2 (A/ E/) | E2 (D/ C/) | F2 D | C2 (C/ D/) | C2 (E/ A/) | G2 G | E2 | [V:T] E | C2 (C/ A,/) | C2 A, | A,2 A, | A,2 A, | A,2 (A,/ C/) | E2 D | HC2 | [V:B] E, | A,2 A, | A,2 A, | D,2 D, | A,,2 A, | F,2 E, | E,2 E, | A,,2 | X:1 T:Drum Kit %%map drummap D print=D heads=x_head % pedal hi-hat %%map drummap E print=E % bass drum 1 %%map drummap F print=F % acoustic bass drum %%map drummap G print=G % low floor tom-tom %%map drummap A print=A % high floor tom-tom %%map drummap B print=B % low tom-tom %%map drummap ^B print=B heads=triangle % tambourine %%map drummap c print=c % acoustic snare %%map drummap _c print=c % electric snare %%map drummap ^c print=c heads=triangle % low wood block %%map drummap =c print=c % side stick %%map drummap d print=d % low-mid tom tom %%map drummap ^d print=d heads=triangle % high wood block %%map drummap e print=e % high-mid tom tom %%map drummap ^e print=e heads=triangle % cowbell %%map drummap f print=f % high tom tom %%map drummap ^f print=f heads=x_head % ride cymbal 1 %%map drummap g print=g heads=x_head % closed hi-hat %%map drummap ^g print=g heads=diamond % open hi-hat %%map drummap a print=a heads=x_head % crash cymbal 1 %%map drummap ^a print=a heads=triangle % open triangle %%MIDI drummap D 44 % pedal hi-hat %%MIDI drummap E 36 % bass drum 1 %%MIDI drummap F 35 % acoustic bass drum %%MIDI drummap G 41 % low floor tom-tom %%MIDI drummap A 43 % high floor tom-tom %%MIDI drummap B 45 % low tom-tom %%MIDI drummap ^B 54 % tambourine %%MIDI drummap c 38 % acoustic snare %%MIDI drummap _c 40 % electric snare %%MIDI drummap ^c 77 % low wood block %%MIDI drummap =c 37 % side stick %%MIDI drummap d 47 % low-mid tom tom %%MIDI drummap ^d 76 % high wood block %%MIDI drummap e 48 % high-mid tom tom %%MIDI drummap ^e 56 % cowbell %%MIDI drummap f 50 % high tom tom %%MIDI drummap ^f 51 % ride cymbal 1 %%MIDI drummap g 42 % closed hi-hat %%MIDI drummap ^g 46 % open hi-hat %%MIDI drummap a 49 % crash cymbal 1 %%MIDI drummap ^a 81 % open triangle %%score (1 2) Q:1/4=120 M:4/4 L:1/4 K:C perc V:1 z4| g/^f/g/^f/ g/^f/g/^f/| c/^f/g/^f/ A/^f/g/^f/| c/^f/g/^f/ A/^f/g/^f/| c/c/g/^f/ A/A/g/^f/| c/^f/c/^f/ A/^f/A/^f/|(3B/B/B/ (3f/f/f/ (3e/e/e/ (3d/d/d/ | a4| V:2 E D E/E/ D|E D E/E/ D|E D E/E/ D|E D E/E/ D| E D E/E/ D|E D E/E/ D|E D E/E/ D|E D E/E/ D|"
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
	.drum-examples td:nth-child(2) {
		white-space: nowrap;
	}
	table.table.drum-examples tbody th {
		padding: 0;
		text-align: left;
	}
	table.table.drum-examples tbody td {
		padding: 0;
		text-align: left;
		height: 24px;
	}
	.colorful {
		padding: 10px;
		background: #5743dc;
		display: inline-block;
		border-radius: 3px;
		margin-top: 5px;
		border: 3px dotted #e0d43f;
	}
	.colorful a {
		color: #9af3bf;
	}
</style>
