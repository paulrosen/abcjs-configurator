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
						<CheckboxItem label="Inline MIDI" :help="helpText.specifyInlineMidiId" v-model="editorParams.specifyInlineMidiId"></CheckboxItem>
						<CheckboxItem label="Download MIDI" :help="helpText.specifyDownloadMidiId" v-model="editorParams.specifyDownloadMidiId"></CheckboxItem>
						<CheckboxItem label="Show Warnings" :help="helpText.specifyWarningsId" v-model="editorParams.specifyWarningsId"></CheckboxItem>
						<CheckboxItem label="Callback On Change" :help="helpText.callbackOnChange" v-model="editorParams.callbackOnChange"></CheckboxItem>
						<CheckboxItem label="GUI Mode" :help="helpText.gui" v-model="editorParams.gui"></CheckboxItem>
						<CheckboxItem label="Use Dirty Flag" :help="helpText.indicate_changed" v-model="editorParams.indicate_changed"></CheckboxItem>
					</v-layout>

					<h2>Parser Parameters</h2>
					<v-layout wrap justify-start align-center>
						<v-checkbox label="Format For Printing" v-model="editorParams.parser_options.print"></v-checkbox>
					</v-layout>

					<h2>Engraver Parameters</h2>
					<v-layout wrap justify-start align-center>
						<v-text-field
								class="numeric"
								v-model="editorParams.render_options.scale"
								label="Scale"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="editorParams.render_options.staffwidth"
								label="Staff Width"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="editorParams.render_options.paddingtop"
								label="Padding Top"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="editorParams.render_options.paddingbottom"
								label="Padding Bottom"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="editorParams.render_options.paddingright"
								label="Padding Right"
						></v-text-field>
						<v-text-field
								class="numeric"
								v-model="editorParams.render_options.paddingleft"
								label="Padding Left"
						></v-text-field>
						<v-checkbox label="Editable" v-model="editorParams.render_options.editable"></v-checkbox>
						<v-checkbox label="Add Classes" v-model="editorParams.render_options.add_classes"></v-checkbox>
						<v-checkbox label="User Click Listener" v-model="editorParams.render_options.highlightListener"></v-checkbox>
						<v-checkbox label="Music Changed Listener" v-model="editorParams.render_options.modelChangedListener"></v-checkbox>
						<v-checkbox label="Responsive Sizing" v-model="editorParams.render_options.responsiveResize"></v-checkbox>
					</v-layout>

					<h2>MIDI Parameters</h2>
					<p>See the <nuxt-link to="/audio">audio page</nuxt-link>: all of the same parameters apply. Put the parameters in the property <code class="subtle-code">midi_options</code>.</p>

					<h2>Commands</h2>
					<div>
						<v-btn outline color="primary" @click="setNotDirty">Set Not Dirty</v-btn>
						<v-btn-toggle v-model="isReadOnly">
							<v-btn outline color="primary" value="writable" @click="setReadOnly">Set Read Only</v-btn>
						</v-btn-toggle>
						<v-btn-toggle v-model="isPaused">
							<v-btn outline color="primary" value="running" @click="pause">Pause</v-btn>
						</v-btn-toggle>
						<v-btn-toggle v-model="isMidiPaused">
							<v-btn outline color="primary" value="running" @click="pauseMidi">Pause MIDI</v-btn>
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
					<div>
						<div v-if="editorParams.callbackOnChange">
							<div class="footnote">Type in the textarea to see the output of the callback function.</div>
							<code class="indented">{{onChangeOutput}}</code>
						</div>
						<div v-if="editorParams.render_options.highlightListener">
							<div class="footnote">Click on the displayed music to see the output of the callback function.</div>
							<code class="indented">{{highlightListenerOutput}}</code>
						</div>
						<div v-if="editorParams.render_options.responsive === 'resize'">
							<div class="footnote"><span>When using resize, do not place the </span><code class="subtle-code">&lt;div id="paper"&gt;</code><span> as a flex element: the flex functionality will interfere. Just wrap in another </span><code class="subtle-code">&lt;div&gt;</code></div>
						</div>
					<div id="warnings-id"></div>
					<div id="paper" class="paper amber lighten-4"></div>
					<div id="midi-download"></div>
					<div id="midi-inline"></div>
					</div>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex';
	import CheckboxItem from "../components/CheckboxItem";

	const abcjs = process.browser ? require('abcjs/midi.js') : null; // This requires document and window, so can't be used on the server side.

	export default {
		components: {CheckboxItem},
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
					render_options: {
						scale: "1",
						staffwidth: "740",
						paddingtop: "15",
						paddingbottom: "30",
						paddingright: "50",
						paddingleft: "15",
						editable: false,
						add_classes: false,
						highlightListener: false,
						modelChangedListener: false,
						responsiveResize: false,
					},
					midi_options: {
						midi_download_id: null,
						midi_id: null,
					}
				},
				helpText: {
					specifyInlineMidiId: "This creates an audio player in the element that is passed in. That control keeps up with changes to the textarea so the audio is always reflective of the user's input. If you use this, then you must use the \"abcjs/midi\" version of the library. There is also some CSS that is required. You can use the default in \"abcjs-midi.css\" or you can use your own.",
					specifyDownloadMidiId: "This creates a link in the element that is passed in that allows the user to download a MIDI file that is generated from the ABC string in the textarea.  If you use this, then you must use the \"abcjs/midi\" version of the library.",
					specifyWarningsId: "This will print all warnings from the parser in the element that is passed in. It is a good idea to supply this because this provides valuable feedback to the end user.",
					callbackOnChange: "Pass a function in that will be called everytime the user types anything in the textarea. This is particularly useful for knowing when the user has unsaved changes. The parameter that is passed to this function is the instance of the editor. Note that there are many undocumented functions and variables in this -- use them with caution because they could change in a future version of abcjs. The one function that will not change is the isDirty() function. Note that isDirty() will always return false unless you also specify \"Use Dirty Flag\".",
					gui: "TODO",
					indicate_changed: "Set this flag if you care about whether the user has changed the contents of the textarea. If you are creating an app that allows the user to create and save ABC strings, you can use this to prompt the user to save their changes. The class \"abc_textarea_dirty\" is put on the editor. Combined with the \"Callback On Change\" parameter, you have the tools to create a full editor.",
				},

				theEditor: null,
				isPaused: null,
				isReadOnly: null,
				isMidiPaused: null,

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
				highlightListenerOutput: "",
				onChangeOutput: "",
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
				if (this.editorParams.parser_options.print) {
					params += "\n        parser_options: {\n            print: true\n        },";
				}
				params += "\n        render_options: " + this.formatEngraverParams() + ",";
				if (this.editorParams.specifyDownloadMidiId || this.editorParams.specifyInlineMidiId) {
					params += "\n        generate_midi: true,";
					params += "\n        midi_options: {";
					if (this.editorParams.specifyDownloadMidiId) {
						params += "\n            generateDownload: true,";
						params += "\n            midi_download_id: \"midi-download\",";
					}
					if (this.editorParams.specifyInlineMidiId) {
						params += "\n            midi_id: \"midi-inline\",";
					} else {
						params += "\n            generateInline: false,";
					}
					params += "\n            // Add any other MIDI options from \"Audio\" page.";
					params += "\n        },";
				}
				if (params === "")
					params = "{ }";
				else
					params = `{${params}
    }`;
				return params;
			},
			constructEngraverParams() {
				this.editorParams.render_options.listener = {};
				if (this.editorParams.render_options.highlightListener)
					this.editorParams.render_options.listener.highlight = this.highlightListenerCallback;
				if (this.editorParams.render_options.modelChangedListener)
					this.editorParams.render_options.listener.modelChanged = this.modelChangedListenerCallback;
				this.editorParams.render_options.responsive = this.editorParams.render_options.responsiveResize ? "resize" : undefined;
				return this.editorParams.render_options;
			},
			formatEngraverParams() {
				let params = "";
				if (this.editorParams.render_options.scale !== "1")
					params += `\n            scale: ${this.editorParams.render_options.scale},`;
				if (this.editorParams.render_options.staffwidth !== "740")
					params += `\n            staffwidth: ${this.editorParams.render_options.staffwidth},`;
				if (this.editorParams.render_options.paddingtop !== "15")
					params += `\n            paddingtop: ${this.editorParams.render_options.paddingtop},`;
				if (this.editorParams.render_options.paddingbottom !== "30")
					params += `\n            paddingbottom: ${this.editorParams.render_options.paddingbottom},`;
				if (this.editorParams.render_options.paddingright !== "50")
					params += `\n            paddingright: ${this.editorParams.render_options.paddingright},`;
				if (this.editorParams.render_options.paddingleft !== "15")
					params += `\n            paddingleft: ${this.editorParams.render_options.paddingleft},`;
				if (this.editorParams.render_options.editable)
					params += "\n            editable: true,";
				if (this.editorParams.render_options.add_classes)
					params += "\n            add_classes: true,";
				if (this.editorParams.render_options.highlightListener || this.editorParams.render_options.modelChangedListener) {
					params += "\n            listener: { ";
					if (this.editorParams.render_options.highlightListener)
						params += "highlight: function(abcElem) { console.log(abcElem, tuneNumber); }, ";
					if (this.editorParams.render_options.modelChangedListener)
						params += "modelChanged: function(abcElem) { console.log(abcElem); }, ";
					params += "},";
				}
				if (this.editorParams.render_options.responsiveResize)
					params += "\n            responsive: \"resize\",";
				if (params === "")
					params = "{ }";
				else
					params = `{${params}
        }`;
				return params;
			},
			highlightListenerCallback(abcElem,tuneNumber) {
				this.highlightListenerOutput = `highlightListenerCallback(abcElem,tuneNumber)\n\nabcElem:\n`;
				Object.keys(abcElem).forEach((key) => {
					if (key === "abselem")
						this.highlightListenerOutput += "    abselem: [object]\n";
					else {
						const value = JSON.stringify(abcElem[key]);
						this.highlightListenerOutput += `    ${key}: ${value}\n`;
					}
				});
				this.highlightListenerOutput += `tuneNumber: ${tuneNumber}\n`;
			},
			modelChangedListenerCallback(abcElem) {
				console.log(abcElem);
			},
			onChangeCallback(editorInstance) {
				this.onChangeOutput = `onChangeCallback(editorInstance)\n\neditorInstance.isDirty() returns ${editorInstance.isDirty()}\n`;
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
				this.editorParams.onchange = this.editorParams.callbackOnChange ? this.onChangeCallback : undefined;

				this.editorParams.midi_download_id = this.editorParams.specifyDownloadMidiId ? "midi-download" : undefined;
				this.editorParams.midi_id = this.editorParams.specifyInlineMidiId ? "midi-inline" : undefined;
				this.editorParams.generate_midi = (this.editorParams.specifyDownloadMidiId || this.editorParams.specifyInlineMidiId);
				this.editorParams.midi_options.midi_id = this.editorParams.specifyInlineMidiId ? "midi-inline" : undefined;
				this.editorParams.midi_options.generateInline = this.editorParams.specifyInlineMidiId;
				this.editorParams.midi_options.generateDownload = this.editorParams.specifyDownloadMidiId;
				this.editorParams.midi_options.midi_download_id = this.editorParams.specifyDownloadMidiId ? "midi-download" : undefined;

				this.constructEngraverParams();

				this.resetDiv("warnings-id");
				this.resetDiv("midi-download");
				this.resetDiv("midi-inline");

				this.theEditor = new abcjs.Editor("textarea-id",
					this.editorParams);
			},
			setNotDirty() {
				if (this.theEditor)
					this.theEditor.setNotDirty();
			},
			setReadOnly() {
				if (this.theEditor) {
					this.theEditor.setReadOnly(this.isReadOnly !== 'writable');
				}
			},
			pause() {
				if (this.theEditor) {
					this.theEditor.pause(this.isPaused !== 'running');
				}
			},
			pauseMidi() {
				if (this.theEditor) {
					this.theEditor.pauseMidi(this.isMidiPaused !== 'running');
				}
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
	.interactive-page .indented {
		margin-left: 30px;
		margin-bottom: 10px;
	}
	.abc_textarea_readonly {
		background: linear-gradient(to right, rgba(230,150,150,0) 0%,rgba(230,150,150,1) 100%);
	}
</style>