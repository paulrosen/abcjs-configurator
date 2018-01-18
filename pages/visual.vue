<template>
	<v-layout class="visual-page">
		<v-flex xs12 sm12 md12 lg12>
			<v-card>
				<v-card-title>JavaScript</v-card-title>
				<v-card-text>
					<p>(The <code>abcString</code> is whatever is in the textarea on the <nuxt-link to="/">main page</nuxt-link>.)</p>
					<code>import abcjs from 'abcjs';
{{javascriptString}}</code>
					<p></p>
					<p>(The <code>tuneObjectArray</code> contains each of the tunes that was processed. This is not normally needed,
						unless you need to pass it to the animation function or the MIDI "bouncing ball".</p>
				</v-card-text>
			</v-card>
			<v-card>
				<v-card-title>Options</v-card-title>
				<v-card-text>
					<p>All of these options have a default value, so they are all optional.</p>
					<h2>Elements</h2>
					<v-text-field
							class="numeric"
							v-model="numberOfTunes"
							label="Number of Tunes To Show"
					></v-text-field>

					<h2>Parser Parameters</h2>
					<v-layout wrap justify-start>
					<v-checkbox label="Format For Printing" v-model="parserParams.print"></v-checkbox>
					<v-checkbox label="Parse Header Only" v-model="parserParams.header_only"></v-checkbox>
					<v-checkbox label="Stop Parsing on Warning" v-model="parserParams.stop_on_warning"></v-checkbox>
					<v-checkbox label="Insert Hint Measures" v-model="parserParams.hint_measures"></v-checkbox>
					</v-layout>

					<h2>Engraver Parameters</h2>
					<v-layout wrap justify-start>
					<v-text-field
							class="numeric"
							v-model="engraverParams.scale"
							label="Scale"
					></v-text-field>
					<v-text-field
							class="numeric"
							v-model="engraverParams.staffwidth"
							label="Staff Width"
					></v-text-field>
					<v-text-field
							class="numeric"
							v-model="engraverParams.paddingtop"
							label="Padding Top"
					></v-text-field>
					<v-text-field
							class="numeric"
							v-model="engraverParams.paddingbottom"
							label="Padding Bottom"
					></v-text-field>
					<v-text-field
							class="numeric"
							v-model="engraverParams.paddingright"
							label="Padding Right"
					></v-text-field>
					<v-text-field
							class="numeric"
							v-model="engraverParams.paddingleft"
							label="Padding Left"
					></v-text-field>
					<v-checkbox label="Editable" v-model="engraverParams.editable"></v-checkbox>
					<v-checkbox label="Add Classes" v-model="engraverParams.add_classes"></v-checkbox>
					<v-checkbox label="User Click Listener" v-model="engraverParams.highlightListener"></v-checkbox>
					<v-checkbox label="Music Changed Listener" v-model="engraverParams.modelChangedListener"></v-checkbox>
					<v-checkbox label="Responsive Sizing" v-model="engraverParams.responsive"></v-checkbox>
					</v-layout>

					<h2>Renderer Params</h2>
					<v-layout wrap justify-start>
					<v-text-field
							class="numeric"
							v-model="renderParams.startingTune"
							label="Starting Tune"
					></v-text-field>
					<v-checkbox label="viewportHorizontal" v-model="renderParams.viewportHorizontal"></v-checkbox>
					<v-checkbox label="scrollHorizontal" v-model="renderParams.scrollHorizontal"></v-checkbox>
					<v-checkbox label="oneSvgPerLine" v-model="renderParams.oneSvgPerLine"></v-checkbox>
					</v-layout>
				</v-card-text>
			</v-card>
			<v-card>
				<v-card-title>Output</v-card-title>
				<v-card-text>
					<div id="paper1"></div>
					<div id="paper2"></div>
					<div id="paper3"></div>
					<div id="paper4"></div>
					<div id="paper5"></div>
					<div id="paper6"></div>
					<div id="paper7"></div>
					<div id="paper8"></div>
					<div id="paper9"></div>
					<div id="paper10"></div>
					<div id="paper11"></div>
					<div id="paper12"></div>
					<div id="paper13"></div>
					<div id="paper14"></div>
					<div id="paper15"></div>
					<div id="paper16"></div>
					<div id="paper17"></div>
					<div id="paper18"></div>
					<div id="paper19"></div>
					<div id="paper20"></div>
					<div id="paper21"></div>
					<div id="paper22"></div>
					<div id="paper23"></div>
					<div id="paper24"></div>
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
				numberOfTunes: "1",
				parserParams: {
					print: false,
					header_only: false,
					stop_on_warning: false,
					hint_measures: false,
				},
				engraverParams: {
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
					responsive: false,
				},
				renderParams: {
					startingTune: "1",
					viewportHorizontal: false,
					scrollHorizontal: false,
					oneSvgPerLine: false,
				},
				javascriptString: "",
			};
		},
		watch: {
			'numberOfTunes': function() {
				this.redraw();
			},
			'parserParams': {
				handler: function () {
					this.redraw();
				},
				deep: true
			},
			'engraverParams': {
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
			...mapGetters(['appTitle', 'renderAbc', 'inputAbc']),
			constructOutput() {
				if (this.numberOfTunes === "1")
					return "paper1";
				let papers = [];
				for (let i = 0; i < this.numberOfTunes; i++) {
					papers.push("paper" + (i+1));
				}
				return papers;
			},
			formatOutput() {
				const papers = this.constructOutput();
				if (typeof papers === "string")
					return '"' + papers + '"';
				return '[ "' + papers.join('", "') + '" ]';
			},
			formatParserParams() {
				let params = "";
				if (this.parserParams.print)
					params += "\n        print: true,";
				if (this.parserParams.header_only)
					params += "\n        header_only: true,";
				if (this.parserParams.stop_on_warning)
					params += "\n        stop_on_warning: true,";
				if (this.parserParams.hint_measures)
					params += "\n        hint_measures: true,";
				if (params === "")
					params = "{ }";
				else
					params = `{${params}
    }`;
				return params;
			},
			formatEngraverParams() {
				let params = "";
				if (this.engraverParams.scale !== "1")
					params += `\n        scale: ${this.engraverParams.scale},`;
				if (this.engraverParams.staffwidth !== "740")
					params += `\n        staffwidth: ${this.engraverParams.staffwidth},`;
				if (this.engraverParams.paddingtop !== "15")
					params += `\n        paddingtop: ${this.engraverParams.paddingtop},`;
				if (this.engraverParams.paddingbottom !== "30")
					params += `\n        paddingbottom: ${this.engraverParams.paddingbottom},`;
				if (this.engraverParams.paddingright !== "50")
					params += `\n        paddingright: ${this.engraverParams.paddingright},`;
				if (this.engraverParams.paddingleft !== "15")
					params += `\n        paddingleft: ${this.engraverParams.paddingleft},`;
				if (this.engraverParams.editable)
					params += "\n        editable: true,";
				if (this.engraverParams.add_classes)
					params += "\n        add_classes: true,";
				if (this.engraverParams.highlightListener || this.engraverParams.modelChangedListener) {
					params += "\n        listener: { ";
					if (this.engraverParams.highlightListener)
						params += "highlight: function(abcElem) { console.log(abcElem); }, ";
					if (this.engraverParams.modelChangedListener)
						params += "modelChanged: function(abcElem) { console.log(abcElem); }, ";
					params += "},";
				}
				if (this.engraverParams.responsive)
					params += "\n        responsive: \"resize\",";
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
				if (this.renderParams.viewportHorizontal)
					params += "\n        viewportHorizontal: true,";
				if (this.renderParams.scrollHorizontal)
					params += "\n        scrollHorizontal: true,";
				if (this.renderParams.oneSvgPerLine)
					params += "\n        oneSvgPerLine: true,";
				if (params === "")
					params = "{ }";
				else
					params = `{${params}
    }`;
				return params;
			},
			redraw() {
				const output = this.formatOutput();
				const parserParams = this.formatParserParams();
				const engraverParams = this.formatEngraverParams();
				const renderParams = this.formatRenderParams();

				this.javascriptString = `const tuneObjectArray = ABCJS.renderAbc(
    ${output},
    abcString,
    ${parserParams},
    ${engraverParams},
    ${renderParams});`;

				for (let i = 1; i < 24; i++)
					document.getElementById("paper"+i).innerText = "";
				this.renderAbc()(this.constructOutput(), this.inputAbc(), { add_classes: true });
},
		},
	// 	| Parameters | Description |
	// 	| ------------- | ----------- |
	// 	| `output` | If this is a string, it is the ID of an element on the DOM. Or it could be the DOM element itself. Or it could be an array of strings or DOM elements. In the case of `renderMidi()`, when both MIDI types are created, they are both created in the same element. |
	//
	// | `parserParams` | Default | Description |
	// | ------------- | ----------- | ----------- |
	// | `print` | false | pay attention to margins and other formatting commands that don't make sense in a web page |
	// | `header_only` | false | only parse the header |
	// | `stop_on_warning` | false | only parse until the first warning is encountered |
	// | `hint_measures` | false | repeat the next measure at the end of the previous line, with a unique css class. |
	//
	// | `engraverParams` | Default | Description |
	// | ------------- | ----------- | ----------- |
	// | `scale` | 1 | If the number passed is between zero and one, then the music is printed smaller, if above one, then it is printed bigger. |
	// | `staffwidth` | 740 | The width of the music, in pixels. |
	// | `paddingtop` | 15 | The spacing that the music should have on the web page. |
	// | `paddingbottom` | 30 | The spacing that the music should have on the web page. |
	// | `paddingright` | 50 | The spacing that the music should have on the web page. |
	// | `paddingleft` | 15 | The spacing that the music should have on the web page. |
	// | `editable` | false | If true, then when a note is clicked, it is highlighted and a callback allows the editor to move the cursor. |
	// | `add_classes` | false | If true, then each element that is drawn on the SVG will have an identifying class with it that you can use to style, move, or hide the element. |
	// | `listener` | null | This is an object containing up to two functions. The format is: `{ highlight: function(abcElem) {}, modelChanged: function(abcElem) {} }` The highlight function is called whenever the user clicks on a note or selects a series of notes. The modelChanged function is called whenever the user has changed the music visually. |
	// | `responsive` | undefined | The strategy for responsiveness. `"resize"` will make the svg take up whatever width is available for the container.
	//
	//
	// | `renderParams` | Default | Description |
	// | ------------- | ----------- | ----------- |
	// | `startingTune` | 0 | The index of the tune in the tunebook to render (starting at zero for the first tune). |
	// | `viewportHorizontal` | false | Should the horizontal width be limited by the device's width? |
	// | `scrollHorizontal` | false | Should there be a horizontal scrollbar if the music is wider than the viewport? (requires viewportHorizontal to be true.) |
	// | `oneSvgPerLine` | false | Should each system of staves be rendered to a different SVG? This makes controlling with CSS easier, and makes it possible to paginate cleanly.
	}
</script>

<style>
	.visual-page .input-group {
		min-width: 200px;
		margin-right: 10px;
	}
</style>
