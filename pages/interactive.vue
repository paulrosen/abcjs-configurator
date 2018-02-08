<template>
	<v-layout class="interactive-page">
		<v-flex xs12 sm12 md12 lg12>
			<div class="combine-cards">
				<v-card class="narrow">
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
						<CheckboxItem label="Format For Printing" :help="helpText.print" v-model="editorParams.parser_options.print"></CheckboxItem>
					</v-layout>

					<h2>Engraver Parameters</h2>
					<v-layout wrap justify-start align-center>
						<TextInputItem label="Scale" :help="helpText.scale" v-model="editorParams.render_options.scale"></TextInputItem>
						<TextInputItem label="Staff Width" :help="helpText.staffwidth" v-model="editorParams.render_options.staffwidth"></TextInputItem>
						<TextInputItem label="Padding Left" :help="helpText.paddingleft" v-model="editorParams.render_options.paddingleft"></TextInputItem>
						<TextInputItem label="Padding Top" :help="helpText.paddingtop" v-model="editorParams.render_options.paddingtop"></TextInputItem>
						<TextInputItem label="Padding Right" :help="helpText.paddingright" v-model="editorParams.render_options.paddingright"></TextInputItem>
						<TextInputItem label="Padding Bottom" :help="helpText.paddingbottom" v-model="editorParams.render_options.paddingbottom"></TextInputItem>
						<CheckboxItem label="Responsive Sizing" :help="helpText.responsiveResize" v-model="editorParams.render_options.responsiveResize"></CheckboxItem>
						<CheckboxItem label="Add Classes" :help="helpText.add_classes" v-model="editorParams.render_options.add_classes"></CheckboxItem>
						<CheckboxItem label="User Click Listener" :help="helpText.highlightListener" v-model="editorParams.render_options.highlightListener"></CheckboxItem>
						<CheckboxItem label="Music Changed Listener" :help="helpText.modelChangedListener" v-model="editorParams.render_options.modelChangedListener"></CheckboxItem>
						<CheckboxItem label="Editable" :help="helpText.editable" v-model="editorParams.render_options.editable"></CheckboxItem>
					</v-layout>

					<h2>MIDI Parameters</h2>
					<p>See the <nuxt-link to="/audio">audio page</nuxt-link>: all of the same parameters apply. Put the parameters in the property <code class="subtle-code">midi_options</code>.</p>

					<h2>Commands</h2>
					<div class="button-row">
						<v-btn outline color="primary" @click="setNotDirty">Set Not Dirty</v-btn>
						<div><InfoDialog label="Set Not Dirty" :help="helpText.setNotDirty"></InfoDialog></div>
						<v-btn-toggle v-model="isReadOnly">
							<v-btn outline color="primary" value="writable" @click="setReadOnly">Set Read Only</v-btn>
						</v-btn-toggle>
						<InfoDialog label="Set Read Only" :help="helpText.setReadOnly"></InfoDialog>
						<v-btn-toggle v-model="isPaused">
							<v-btn outline color="primary" value="running" @click="pause">Pause Drawing</v-btn>
						</v-btn-toggle>
						<InfoDialog label="Pause Drawing" :help="helpText.pauseDrawing"></InfoDialog>
						<v-btn-toggle v-model="isMidiPaused">
							<v-btn outline color="primary" value="running" @click="pauseMidi">Pause MIDI</v-btn>
						</v-btn-toggle>
						<InfoDialog label="Pause MIDI" :help="helpText.pauseMidi"></InfoDialog>
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
			</div>
			<v-card>
				<v-card-title>
					<v-btn flat icon @click="javascriptOpen = !javascriptOpen">
						<v-icon>{{javascriptOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					JavaScript</v-card-title>
				<v-card-text :class="javascriptOpen ? 'opened' : 'closed'">
					<code class="code-full">{{importStatements}}

{{javascriptString}}</code>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex';
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
					gui: "Warning: This feature is currently broken and has no effect!\n\nThis will enable drag and drop on the SVG elements and send a callback to the Editor to modify the string that is in the textarea automatically.\n\nWarning: This feature is currently broken and has no effect!",
					indicate_changed: "Set this flag if you care about whether the user has changed the contents of the textarea. If you are creating an app that allows the user to create and save ABC strings, you can use this to prompt the user to save their changes. The class \"abc_textarea_dirty\" is put on the editor. Combined with the \"Callback On Change\" parameter, you have the tools to create a full editor.",
					print: "Make the size of the SVG appropriate for a letter-sized area.",
					editable: "Warning: This feature is currently broken and has no effect!\n\nThis enables drag and drop on the SVG elements. It can be paired with \"gui\" to modify the textarea automatically, or \"modelChangedListener\" to trigger a callback when the user has finished a change.\n\nWarning: This feature is currently broken and has no effect!",
					add_classes: "This adds many classes to the elements in the SVG. That allows the various parts of the music to be found and manipulated after being drawn.",
					highlightListener: "This is a callback whenever the user clicks on an element of the SVG. The parameters passed are \"abcElem\" and \"tuneNumber\". The \"abcElem\" contains many properties that are useful for determining what was clicked on. Those properties are subject to change in a future version of abcjs, though, so use with caution. If there are multiple tunes in the source ABC string, then \"tuneNumber\" is the tune that was clicked on.",
					modelChangedListener: "Warning: This feature is currently broken and has no effect!\n\nThis will provide a callback when an element on the SVG is dragged. This requires the variable \"editable\" to be set.\n\nWarning: This feature is currently broken and has no effect!",
					responsiveResize: "This changes the styles on both the encompassing element and the SVG element that causes the SVG to grow and shrink in response to changes of the width of the parent element.",
					scale: "Sets the size of the music. Full size is \"1\". \"2\" is twice as large. \"0.5\" is half as large. Note that this doesn't change the staff width, so it will change the layout. If you just want to make the SVG bigger, use the css transform() functionality. Experiment with this in conjunction with \"Staff Width\".",
					staffwidth: "This is the width of the staff line in pixels. This is not the total width, because there are margins.",
					paddingleft: "The padding numbers are how much padding to put in the SVG around the edges. This differs from CSS padding because it is inside the SVG. Note that the right and bottom padding is ignored if the \"Print\" option is selected.",
					paddingtop: "",
					paddingright: "",
					paddingbottom: "",
					setNotDirty: "If the user saves their work, you can tell the textarea that there is no unsaved data. The class \"abc_textarea_dirty\" is removed from the textarea, and will not be put back on until the textarea changes. This only has an effect if the flag \"indicate_changed\" is set.",
					setReadOnly: "This sets the control to be read only and adds the class \"abc_textarea_readonly\".",
					pauseDrawing: "If the drawing is hogging the system's resources, you can call this to stop the instantaneous redrawing of the sheet music. If you call this a second time, the visual sheet music will catch up.",
					pauseMidi: "If creating the audio is hogging the system's resources, you can call this to stop the instantaneous recreating of the audio. If you call this a second time, the audio will catch up.",
				},

				theEditor: null,
				isPaused: null,
				isReadOnly: null,
				isMidiPaused: null,

				abcInput: `X: 24
T:Clouds Thicken
C:Paul Rosen
S:Copyright 2005, Paul Rosen
M:6/8
L:1/8
Q:3/8=116
R:Creepy Jig
K:Em
|:"Em"EEE E2G|"C7"_B2A G2F|"Em"EEE E2G|"C7"_B2A "B7"=B3|"Em"EEE E2G|
"C7"_B2A G2F|"Em (Am7)"GFE "D (Bm7)"F2D|1"Em"E3-E3:|2"Em"E3-E2B|:"Em"e2e gfe|
"G"g2ab3|"Em"gfeg2e|"D"fedB2A|"Em"e2e gfe|"G"g2ab3|"Em"gfe"D"f2d|"Em"e3-e3:|
`,

				importStatements: "",
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
			highlightListenerCallback(abcElem,tuneNumber,classes) {
				this.highlightListenerOutput = `highlightListenerCallback(abcElem,tuneNumber,classes)\n\n`;
				if (abcElem.startChar && abcElem.endChar) {
					this.highlightListenerOutput += `abcString.slice(abcElem.startChar, abcElem.endChar) = ${this.abcInput.slice(abcElem.startChar, abcElem.endChar)}`;
				}
				this.highlightListenerOutput += `\n\nabcElem:\n`;
				Object.keys(abcElem).forEach((key) => {
					if (key === "abselem")
						this.highlightListenerOutput += "    abselem: [object]\n";
					else {
						const value = JSON.stringify(abcElem[key]);
						this.highlightListenerOutput += `    ${key}: ${value}\n`;
					}
				});
				this.highlightListenerOutput += `tuneNumber: ${tuneNumber}\n`;
				this.highlightListenerOutput += `classes:\n    ${classes.join("\n    ")}\n`;
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
    ${editorParams});

abcEditor.setNotDirty();

abcEditor.setReadOnly(true || false);

abcEditor.pause(true || false);

abcEditor.pauseMidi(true || false);`;
				this.importStatements = this.editorParams.specifyInlineMidiId || this.editorParams.specifyDownloadMidiId ? `import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';
import abcjs from 'abcjs/midi;` : "import abcjs from 'abcjs;";

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

	.abc_textarea_readonly {
		background: linear-gradient(to right, rgba(230,150,150,0) 0%,rgba(230,150,150,1) 100%);
	}
</style>