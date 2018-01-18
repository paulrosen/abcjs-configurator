<template>
	<v-layout class="interactive-page">
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
					<h2>Editor Parameters</h2>
					<v-layout wrap justify-start>
					<v-checkbox label="Generate MIDI" v-model="editorParams.generate_midi" light></v-checkbox>
					<v-checkbox label="Specify Inline MIDI Id" v-model="editorParams.specifyInlineMidiId" light></v-checkbox>
					<v-checkbox label="Specify Download MIDI Id" v-model="editorParams.specifyDownloadMidiId" light></v-checkbox>
					<v-checkbox label="Specify Warnings Id" v-model="editorParams.specifyWarningsId" light></v-checkbox>
					<v-checkbox label="Generate Warnings" v-model="editorParams.generate_warnings" light></v-checkbox>
					<v-checkbox label="Callback On Change" v-model="editorParams.callbackOnChange" light></v-checkbox>
					<v-checkbox label="GUI Mode" v-model="editorParams.guiMode" light></v-checkbox>
					<v-checkbox label="Use Dirty Flag" v-model="editorParams.indicate_changed" light></v-checkbox>
					</v-layout>
					<h2>Parser Parameters</h2>
					<v-layout wrap justify-start>
						<div>TODO</div>
					</v-layout>
					<h2>MIDI Parameters</h2>
					<v-layout wrap justify-start>
						<div>TODO</div>
					</v-layout>
					<h2>Render Parameters</h2>
					<v-layout wrap justify-start>
						<div>TODO</div>
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
				editorParams: {
					generate_midi: false,
					specifyInlineMidiId: false,
					specifyDownloadMidiId: false,
					specifyWarningsId: false,
					generate_warnings: false,
					callbackOnChange: false,
					guiMode: false,
					indicate_changed: false,
				},
				isPaused: false,
				isReadOnly: false,
				isMidiPaused: false,

				javascriptString: "",
			}
		},
		watch: {
			'editorParams': {
				handler: function () {
					this.redraw();
				},
				deep: true
			},
		},

		methods: {
			...mapGetters(['appTitle']),
			redraw() {
				this.javascriptString = `abc_editor = new ABCJS.Editor("abc", { canvas_id: "canvas0", midi_id:"midi", warnings_id:"warnings" });
						abc_editor = new ABCJS.Editor(editArea, editorParams)`;
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
	// | `generate_warnings` | if present, then parser warnings are displayed on the page. |
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
		background-color: #eeeeee;
	}
	.interactive-page .input-group {
		min-width: 200px;
		margin-right: 10px;
	}
</style>