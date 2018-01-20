<template>
	<v-layout class="interactive-page">
		<v-flex xs12 sm12 md12 lg12>
			<v-card>
				<v-card-title>
					<v-btn flat icon @click="javascriptOpen = !javascriptOpen">
						<v-icon>{{javascriptOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					JavaScript</v-card-title>
				<v-card-text :class="javascriptOpen ? 'opened' : 'closed'">
					<code class="code-full">import abcjs from 'abcjs';
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
					<h2>Editor Parameters</h2>
					<v-layout wrap justify-start align-center>
					<v-checkbox label="Generate MIDI" v-model="editorParams.generate_midi"></v-checkbox>
					<v-checkbox label="Specify Inline MIDI Id" v-model="editorParams.specifyInlineMidiId"></v-checkbox>
					<v-checkbox label="Specify Download MIDI Id" v-model="editorParams.specifyDownloadMidiId"></v-checkbox>
					<v-checkbox label="Specify Warnings Id" v-model="editorParams.specifyWarningsId"></v-checkbox>
					<v-checkbox label="Callback On Change" v-model="editorParams.callbackOnChange"></v-checkbox>
					<v-checkbox label="GUI Mode" v-model="editorParams.gui"></v-checkbox>
					<v-checkbox label="Use Dirty Flag" v-model="editorParams.indicate_changed"></v-checkbox>
					</v-layout>
					<h2>Parser Parameters</h2>
					<v-layout wrap justify-start align-center>
						<v-checkbox label="Format For Printing" v-model="editorParams.parser_options.print"></v-checkbox>
					</v-layout>

					<h2>MIDI Parameters</h2>
					<p>See the <nuxt-link to="/audio">audio page</nuxt-link>: all of the same parameters apply.</p>
					<v-layout wrap justify-start align-center>
						<v-checkbox label="Specify MIDI params" v-model="midiParams"></v-checkbox>
					</v-layout>
					<h2>Commands</h2>
					<div>
						<v-btn outline color="primary" @click="setNotDirty">Set Not Dirty</v-btn>
						<v-btn-toggle v-model="isReadOnly">
							<v-btn outline color="primary" @click="setReadOnly">Set Read Only</v-btn>
						</v-btn-toggle>
						<v-btn-toggle v-model="isPaused">
							<v-btn outline color="primary" @click="pause">Pause</v-btn>
						</v-btn-toggle>
						<v-btn-toggle v-model="isMidiPaused">
							<v-btn outline color="primary" @click="pauseMidi">Pause MIDI</v-btn>
						</v-btn-toggle>
					</div>
					<div>
						<v-text-field
								v-model="abcInput"
								multi-line
								textarea
								label="abcString"
								id="textarea-id"
						></v-text-field>
					</div>
				</v-card-text>
			</v-card>
			<v-card>
				<v-card-title>
					<v-btn flat icon @click="outputOpen = !outputOpen">
						<v-icon>{{outputOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					Output</v-card-title>
				<v-card-text :class="outputOpen ? 'opened' : 'closed'">
					<div id="warnings-id"></div>
					<div id="paper" class="paper amber lighten-4"></div>
					<div id="midi-download-id"></div>
					<div id="midi-inline-id"></div>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex';
	const abcjs = process.browser ? require('abcjs/midi.js') : null; // This requires document and window, so can't be used on the server side.

	export default {
		head() {
			return {
				title: this.appTitle()
			};
		},
		data() {
			return {
				editorParams: {
					generate_midi: false,
					specifyInlineMidiId: false,
					specifyDownloadMidiId: false,
					specifyWarningsId: false,
					callbackOnChange: false,
					gui: false,
					indicate_changed: false,
					parser_options: {
						print: false
					},
				},
				midiParams: false,
				isPaused: false,
				isReadOnly: false,
				isMidiPaused: false,
				abcInput: `X: 31
T:Green Light
M:4/4
L:1/8
Q:1/2=112
C:Paul Rosen
S:Copyright 2007, Paul Rosen
R:Reel
K:Em
"Em"E2EG (ED)B,E|e2"D"d4Bd|"Am (C)"(AB)AG (FD)FG|(AB)AG "D"(FE)DF|
"Em"E2EG (ED)B,E|e2 d4(ef|"C"gf)ed "Bm7 (D)"(BA)Bd|1"Em"e4e3G:|2"Em"e4e2(ef)||
|:"Em"(gf)ed (Bd)(ef|"D"af)ef (af)(ef|"Em"gf)ed (Bd)(ef|"Bm"g).d.f.d. e.d.ef|
"Em"(gf)ed (Bd)(ef|"D"af)ef (af)ef|"Am7 (C7)"b2a2 (fe)d2|1"B"(ef)ed (Bd)(ef):|2"B"(ef)ed (BA)FF|
`,

				javascriptString: "",
				javascriptOpen: true,
				optionsOpen: true,
				outputOpen: true,
			}
		},
		watch: {
			'editorParams': {
				handler: function () {
					this.redraw();
				},
				deep: true
			},
			'midiParams': {
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
			...mapGetters(['appTitle']),
			formatEditorParams() {
				let params = "";
				params += "\n        paper_id: \"paper\",";
				if (this.editorParams.specifyWarningsId)
					params += "\n        warnings_id: \"warnings-id\",";
				if (this.editorParams.gui)
					params += "\n        gui: true,";
				if (this.editorParams.indicate_changed)
					params += "\n        indicate_changed: true,";
				if (this.editorParams.callbackOnChange)
					params += "\n        onchange: function(editorInstance) {},";
				if (this.editorParams.generate_midi) {
					params += "\n        generate_midi: true,";
					if (this.editorParams.specifyDownloadMidiId)
						params += "\n        midi_download_id: \"midi-download-id\",";
					if (this.editorParams.specifyInlineMidiId)
						params += "\n        midi_id: \"midi-inline-id\",";
				}
				if (this.editorParams.parser_options.print) {
					params += "\n        parser_options: {\n            print: true\n        },";
				}
				if (this.midiParams) {
					params += "\n        midi_options: {\n            etc...\n        },";
				}
				if (params === "")
					params = "{ }";
				else
					params = `{${params}
    }`;
				return params;
			},
			resetDiv(id) {
				const paper = document.getElementById(id);
				paper.innerText = "";
				paper.setAttribute("style", "");
			},
			redraw() {
				const editorParams = this.formatEditorParams();
				this.javascriptString = `const abcEditor = new abcjs.Editor(
    "textarea-id",
    ${editorParams});`;

				this.editorParams.paper_id = "paper";
				this.editorParams.warnings_id = this.editorParams.specifyWarningsId ? "warnings-id" : undefined;
				this.editorParams.midi_download_id = this.editorParams.specifyDownloadMidiId ? "midi-download-id" : undefined;
				this.editorParams.midi_id = this.editorParams.specifyInlineMidiId ? "midi-inline-id" : undefined;

				this.resetDiv("warnings-id");
				this.resetDiv("midi-download-id");
				this.resetDiv("midi-inline-id");

				new abcjs.Editor("textarea-id",
					this.editorParams);
			},
			setNotDirty() {

			},
			setReadOnly() {

			},
			pause() {

			},
			pauseMidi() {

			},
	// 	| `setReadOnly(bool)` |adds or removes the class abc_textarea_readonly, and adds or removes the attribute readonly=yes |
	// 	| `setNotDirty()` | Called by the client app to reset the dirty flag |
	// | `isDirty()` | Returns true or false, whether the textarea contains the same text that it started with. |
	// | `pause(bool)` | Stops the automatic rendering when the user is typing. |
	// | `pauseMidi(shouldPause)` | Stops the automatic re-rendering of the MIDI. |
		}
	}
	// | Editor entry points | Description |
	// | ------------- | ----------- |
	// | `abc_editor = new ABCJS.Editor(editArea, editorParams)` | constructor of the editor object |
	// | `setReadOnly(bool)` |adds or removes the class abc_textarea_readonly, and adds or removes the attribute readonly=yes |
	// 	| `setDirtyStyle(bool)` | adds or removes the class abc_textarea_dirty |
	// | `renderTune(abc, parserParams, domElement)` | Immediately renders the tune. (Useful for creating the SVG output behind the scenes, if div is hidden) |
	// | `modelChanged()` | Called when the model has been changed to trigger re-rendering |
	// | `parseABC()` | Called internally by fireChanged() -- returns true if there has been a change since last call. |
	// | `updateSelection()` | Called when the user has changed the selection. This calls the engraver_controller to show the selection. |
	// | `fireSelectionChanged()` | Called by the textarea object when the user has changed the selection. |
	// | `paramChanged(engraverParams)` | Called to signal that the engraver params have changed, so re-rendering should occur. |
	// | `fireChanged()` | Called by the textarea object when the user has changed something. |
	// | `setNotDirty()` | Called by the client app to reset the dirty flag |
	// | `isDirty()` | Returns true or false, whether the textarea contains the same text that it started with. |
	// | `highlight(abcelem)` | Called by the engraver_controller to highlight an area. |
	// | `pause(bool)` | Stops the automatic rendering when the user is typing. |
	// | `pauseMidi(shouldPause)` | Stops the automatic re-rendering of the MIDI. |
	//
	// | Edit parameters | Description |
	// | ------------- | ----------- |
	// | `editArea` | If it is a string, then it is an HTML id of a textarea control. Otherwise, it should be an instantiation of an object that expresses the `EditArea` interface. |
	// | `editorParams` | Hash of parameters for the editor. |
	//
	// | editorParams | Description |
	// | ------------- | ----------- |
	// | `canvas_id` or `paper_id` | HTML id to draw in. If not present, then the drawing happens just below the editor. |
	// | `generate_midi` | if present, then midi is generated. |
	// | `midi_id` | if present, the HTML id to place the midi control. Otherwise it is placed in the same div as the paper. An encompassing `div` surrounds each control with the class in the format `"inline-midi midi-%d"`. |
	// | `midi_download_id` | if present, the HTML id to place the midi download link. Otherwise, if `midi_id` is present it is placed there, otherwise it is placed in the same div as the paper. An encompassing `div` surrounds each control with the class in the format `"download-midi midi-%d"`.|
	// | `warnings_id` | if present, the HTML id to place the warnings. Otherwise they are placed in the same div as the paper. |
	// | `onchange` | if present, the callback function to call whenever there has been a change. |
	// | `gui` | if present, the paper can send changes back to the editor (presumably because the user changed something directly.) |
	// | `parser_options` | options to send to the parser engine. |
	// | `midi_options` | options to send to the midi engine. |
	// | `render_options` | options to send to the render engine. |
	// | `indicate_changed` | the dirty flag is set if this is true. |

</script>

<style>
	.abc_textarea_dirty {
		background: linear-gradient(to right, rgba(230,230,230,0) 0%,rgba(230,230,230,1) 100%);
	}
	.interactive-page .input-group {
		min-width: 250px;
		max-width: 250px;
		margin-right: 10px;
	}
	.interactive-page .input-group.input-group--textarea {
		max-width: inherit;
	}
	.interactive-page #warnings-id {
		border: 2px solid #E53935;
		color: #E53935;
		padding: 10px;
		margin-bottom: 10px;
	}
	.interactive-page #warnings-id:empty {
		display: none;
	}
</style>