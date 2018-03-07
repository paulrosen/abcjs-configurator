<template>
	<v-layout class="visual-page">
		<v-flex xs12 sm12 md12 lg12>
			<v-card>
				<v-card-title>Standard Notation</v-card-title>
				<v-card-text>
					<p>The primary mission of <span class="blue--text text--lighten-1">abcjs</span> is to display standard sheet music. This page demonstrates all of the options available for doing that. This uses only the functionality in the basic library (the one without MIDI).</p>
					<p>All of these options have a default value, so they are all optional.</p>
				</v-card-text>
			</v-card>
			<div class="combine-cards">
			<v-card class="narrow">
				<v-card-title>
					<v-btn flat icon @click="optionsOpen = !optionsOpen">
						<v-icon>{{optionsOpen ? "keyboard_arrow_down" : "keyboard_arrow_right"}}</v-icon>
					</v-btn>
					Options</v-card-title>
				<v-card-text :class="optionsOpen ? 'opened' : 'closed'">
					<h2>Elements</h2>
					<TextInputItem label="Number of Tunes To Show" :help="helpText.numberOfTunes" v-model="numberOfTunes"></TextInputItem>

					<h2>Parser Parameters</h2>
					<v-layout wrap justify-start align-center>
						<TextInputItem label="Transpose" :help="helpText.visualTranspose" v-model="abcjsParams.visualTranspose"></TextInputItem>
						<CheckboxItem label="Format For Printing" :help="helpText.print" v-model="abcjsParams.print"></CheckboxItem>
						<CheckboxItem label="Parse Header Only" :help="helpText.header_only" v-model="abcjsParams.header_only"></CheckboxItem>
						<CheckboxItem label="Stop Parsing on Warning" :help="helpText.stop_on_warning" v-model="abcjsParams.stop_on_warning"></CheckboxItem>
						<CheckboxItem label="Insert Hint Measures" :help="helpText.hint_measures" v-model="abcjsParams.hint_measures"></CheckboxItem>
					</v-layout>

					<h2>Engraver Parameters</h2>
					<v-layout wrap justify-start align-center>
						<TextInputItem label="Scale" :help="helpText.scale" v-model="abcjsParams.scale"></TextInputItem>
						<TextInputItem label="Staff Width" :help="helpText.staffwidth" v-model="abcjsParams.staffwidth"></TextInputItem>
						<TextInputItem label="Padding Left" :help="helpText.paddingleft" v-model="abcjsParams.paddingleft"></TextInputItem>
						<TextInputItem label="Padding Top" :help="helpText.paddingtop" v-model="abcjsParams.paddingtop"></TextInputItem>
						<TextInputItem label="Padding Right" :help="helpText.paddingright" v-model="abcjsParams.paddingright"></TextInputItem>
						<TextInputItem label="Padding Bottom" :help="helpText.paddingbottom" v-model="abcjsParams.paddingbottom"></TextInputItem>
						<CheckboxItem label="Responsive Sizing" :help="helpText.responsiveResize" v-model="abcjsParams.responsiveResize"></CheckboxItem>
						<CheckboxItem label="Add Classes" :help="helpText.add_classes" v-model="abcjsParams.add_classes"></CheckboxItem>
						<CheckboxItem label="User Click Listener" :help="helpText.highlightListener" v-model="abcjsParams.highlightListener"></CheckboxItem>
						<CheckboxItem label="Music Changed Listener" :help="helpText.modelChangedListener" v-model="abcjsParams.modelChangedListener"></CheckboxItem>
						<CheckboxItem label="Editable" :help="helpText.editable" v-model="abcjsParams.editable"></CheckboxItem>
					</v-layout>

					<h2>Renderer Params</h2>
					<v-layout wrap justify-start align-center>
						<TextInputItem label="Starting Tune" :help="helpText.startingTune" v-model="abcjsParams.startingTune"></TextInputItem>
						<CheckboxItem label="viewportVertical" :help="helpText.viewportVertical" v-model="abcjsParams.viewportVertical"></CheckboxItem>
						<CheckboxItem label="viewportHorizontal" :help="helpText.viewportHorizontal" v-model="abcjsParams.viewportHorizontal"></CheckboxItem>
						<CheckboxItem label="scrollHorizontal" :help="helpText.scrollHorizontal" v-model="abcjsParams.scrollHorizontal"></CheckboxItem>
						<CheckboxItem label="Separate SVG Per Line" :help="helpText.oneSvgPerLine" v-model="abcjsParams.oneSvgPerLine"></CheckboxItem>
					</v-layout>
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
						<div v-if="abcjsParams.responsive === 'resize'">
							<div class="footnote"><span>When using resize, do not place the </span><code class="subtle-code">&lt;div id="paper"&gt;</code><span> as a flex element: the flex functionality will interfere. Just wrap in another </span><code class="subtle-code">&lt;div&gt;</code></div>
						</div>
						<div id="paper1" class="paper"></div>
						<div id="paper2" class="paper"></div>
						<div id="paper3" class="paper"></div>
						<div id="paper4" class="paper"></div>
						<div id="paper5" class="paper"></div>
						<div id="paper6" class="paper"></div>
						<div id="paper7" class="paper"></div>
						<div id="paper8" class="paper"></div>
						<div id="paper9" class="paper"></div>
						<div id="paper10" class="paper"></div>
						<div id="paper11" class="paper"></div>
						<div id="paper12" class="paper"></div>
						<div id="paper13" class="paper"></div>
						<div id="paper14" class="paper"></div>
						<div id="paper15" class="paper"></div>
						<div id="paper16" class="paper"></div>
						<div id="paper17" class="paper"></div>
						<div id="paper18" class="paper"></div>
						<div id="paper19" class="paper"></div>
						<div id="paper20" class="paper"></div>
						<div id="paper21" class="paper"></div>
						<div id="paper22" class="paper"></div>
						<div id="paper23" class="paper"></div>
						<div id="paper24" class="paper"></div>
						<div v-if="abcjsParams.highlightListener">
							<div class="footnote">Click on the displayed music to see the output of the callback function.</div>
							<code class="indented">{{highlightListenerOutput}}</code>
						</div>
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
					<code class="code-full">import abcjs from 'abcjs';
<div v-html="javascriptString"></div></code>
					<p></p>
					<div class="footnote">
						<p>The <span class="subtle-code">tuneObjectArray</span> contains the processed instance for each of the tunes. This is not normally needed,
							unless you need to pass it to the animation function or the MIDI "bouncing ball". Note that the structure of the individual objects returned are <em class="red--text"><b>not</b></em> guaranteed to be the same from one version of <span class="blue--text text--lighten-1 abcjs-text">abcjs</span> to the next.</p>
					</div>
					<div class="footnote">
						<p>The <span class="subtle-code">abcString</span> is whatever is in the textarea on the <nuxt-link to="/">main page</nuxt-link>.</p>
					</div>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import {mapGetters} from 'vuex';
	import CheckboxItem from "../components/CheckboxItem";
	import TextInputItem from "../components/TextInputItem";

	export default {
		components: {CheckboxItem, TextInputItem},
		head() {
			return {
				title: this.appTitle()
			};
		},
		data() {
			return {
				numberOfTunes: "1",
				abcjsParams: {
					print: false,
					header_only: false,
					stop_on_warning: false,
					hint_measures: false,
					visualTranspose: "",
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
					startingTune: "0",
					viewportHorizontal: false,
					viewportVertical: false,
					scrollHorizontal: false,
					oneSvgPerLine: false,
				},
				javascriptString: "",
				javascriptOpen: true,
				optionsOpen: true,
				outputOpen: true,
				highlightListenerOutput: "",

				helpText: {
					visualTranspose: "Transpose the input by this number of half-steps. The number can be negative to visualTranspose down in pitch.",
					print: "Make the size of the SVG appropriate for a letter-sized area.",
					editable: "Warning: This feature is currently broken and has no effect!\n\nThis enables drag and drop on the SVG elements. It can be paired with \"gui\" to modify the textarea automatically, or \"modelChangedListener\" to trigger a callback when the user has finished a change.\n\nWarning: This feature is currently broken and has no effect!",
					add_classes: "This adds many classes to the elements in the SVG. That allows the various parts of the music to be found and manipulated after being drawn.",
					responsiveResize: "This changes the styles on both the encompassing element and the SVG element that causes the SVG to grow and shrink in response to changes of the width of the parent element.",
					header_only: "Only parse the header of each tune instead of the whole tune. This is useful to create an index.",
					stop_on_warning: "Only parse a tune until a warning is encountered.",
					hint_measures: "At the end of each line, put a copy of the first measure of the next line. This measure has the class \"abcjs-hint\" and should be styled in a unique way so that it is clear.",
					highlightListener: "This is a callback whenever the user clicks on an element of the SVG. The parameters passed are \"abcElem\" and \"tuneNumber\". The \"abcElem\" contains many properties that are useful for determining what was clicked on. Those properties are subject to change in a future version of abcjs, though, so use with caution. If there are multiple tunes in the source ABC string, then \"tuneNumber\" is the tune that was clicked on.",
					modelChangedListener: "Warning: This feature is currently broken and has no effect!\n\nThis will provide a callback when an element on the SVG is dragged. This requires the variable \"editable\" to be set.\n\nWarning: This feature is currently broken and has no effect!",
					viewportVertical: "viewportVertical, viewportHorizontal, and scrollHorizontal change some of the styles of the target element and the SVG element. They also add an extra DIV with the class \"abcjs-inner\" to wrap the SVG. Depending on your layout, one or more combinations of these may help your formatting.",
					viewportHorizontal: "viewportVertical, viewportHorizontal, and scrollHorizontal change some of the styles of the target element and the SVG element. They also add an extra DIV with the class \"abcjs-inner\" to wrap the SVG. Depending on your layout, one or more combinations of these may help your formatting.",
					scrollHorizontal: "viewportVertical, viewportHorizontal, and scrollHorizontal change some of the styles of the target element and the SVG element. They also add an extra DIV with the class \"abcjs-inner\" to wrap the SVG. Depending on your layout, one or more combinations of these may help your formatting.",
					oneSvgPerLine: "Each line of music is rendered in its own SVG. They all appear as children of the original element that the music is drawn to, and each SVG is also wrapped in a DIV. The heading is attached to the first line of music and the footer is attached to the last line of music.",
					scale: "Sets the size of the music. Full size is \"1\". \"2\" is twice as large. \"0.5\" is half as large. Note that this doesn't change the staff width, so it will change the layout. If you just want to make the SVG bigger, use the css transform() functionality. Experiment with this in conjunction with \"Staff Width\".",
					staffwidth: "This is the width of the staff line in pixels. This is not the total width, because there are margins.",
					paddingleft: "The padding numbers are how much padding to put in the SVG around the edges. This differs from CSS padding because it is inside the SVG. Note that the right and bottom padding is ignored if the \"Print\" option is selected.",
					paddingtop: "",
					paddingright: "",
					paddingbottom: "",
					numberOfTunes: "The input ABC string can have multiple tunes in it, separated by \"X:\" lines. Each tune goes in its own SVG and requires markup. This sample app has 24 DIVs declared in the form &lt;div id=\"paper1\"&gt;, so up to 24 tunes can be displayed. If you don't specify anything here, only the first tune is displayed. To cherry pick a tune, you can either preprocess the ABC string (see the Analyze page for details), or use this in conjunction with the \"Starting Tune\" parameter.",
					startingTune: "If there are multiple tunes in the input string, then this chooses which tune to display. For control over what is displayed, use with the \"Number of Tunes\" parameter. This is zero-based. If this is greater than the number of tunes in the input string, then nothing is displayed.",
				}
			};
		},
		watch: {
			'numberOfTunes': function() {
				this.redraw();
			},
			'abcjsParams': {
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
			...mapGetters(['appTitle', 'renderAbc', 'inputAbc', 'tuneByPosition']),
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

			constructEngraverParams() {
				this.abcjsParams.listener = {};
				if (this.abcjsParams.highlightListener)
					this.abcjsParams.listener.highlight = this.highlightListenerCallback;
				if (this.abcjsParams.modelChangedListener)
					this.abcjsParams.listener.modelChanged = this.modelChangedListenerCallback;
				this.abcjsParams.responsive = this.abcjsParams.responsiveResize ? "resize" : undefined;
				return this.abcjsParams;
			},
			formatEngraverParams() {
				let params = "";
				if (this.abcjsParams.visualTranspose)
					params += `\n        visualTranspose: ${this.abcjsParams.visualTranspose},`;
				if (this.abcjsParams.print)
					params += "\n        print: true,";
				if (this.abcjsParams.header_only)
					params += "\n        header_only: true,";
				if (this.abcjsParams.stop_on_warning)
					params += "\n        stop_on_warning: true,";
				if (this.abcjsParams.hint_measures)
					params += "\n        hint_measures: true,";

				if (this.abcjsParams.scale !== "1")
					params += `\n        scale: ${this.abcjsParams.scale},`;
				if (this.abcjsParams.staffwidth !== "740")
					params += `\n        staffwidth: ${this.abcjsParams.staffwidth},`;
				if (this.abcjsParams.paddingtop !== "15")
					params += `\n        paddingtop: ${this.abcjsParams.paddingtop},`;
				if (this.abcjsParams.paddingbottom !== "30")
					params += `\n        paddingbottom: ${this.abcjsParams.paddingbottom},`;
				if (this.abcjsParams.paddingright !== "50")
					params += `\n        paddingright: ${this.abcjsParams.paddingright},`;
				if (this.abcjsParams.paddingleft !== "15")
					params += `\n        paddingleft: ${this.abcjsParams.paddingleft},`;
				if (this.abcjsParams.editable)
					params += "\n        editable: true,";
				if (this.abcjsParams.add_classes)
					params += "\n        add_classes: true,";
				if (this.abcjsParams.highlightListener || this.abcjsParams.modelChangedListener) {
					params += "\n        listener: { ";
					if (this.abcjsParams.highlightListener)
						params += "highlight: function(abcElem) { console.log(abcElem, tuneNumber, classes); }, ";
					if (this.abcjsParams.modelChangedListener)
						params += "modelChanged: function(abcElem) { console.log(abcElem); }, ";
					params += "},";
				}
				if (this.abcjsParams.responsiveResize)
					params += "\n        responsive: \"resize\",";

				if (this.abcjsParams.startingTune !== "0")
					params += `\n        startingTune: ${this.abcjsParams.startingTune},`;
				if (this.abcjsParams.viewportHorizontal)
					params += "\n        viewportHorizontal: true,";
				if (this.abcjsParams.scrollHorizontal)
					params += "\n        scrollHorizontal: true,";
				if (this.abcjsParams.oneSvgPerLine)
					params += "\n        oneSvgPerLine: true,";

				if (params === "")
					params = "{ }";
				else
					params = `{${params}
    }`;
				return params;
			},

			highlightListenerCallback(abcElem,tuneNumber,classes) {
				const tune = this.tuneByPosition()(tuneNumber).abc;
				this.highlightListenerOutput = `highlightListenerCallback(abcElem,tuneNumber,classes)\n\n`;
				if (abcElem.startChar && abcElem.endChar) {
					this.highlightListenerOutput += `abcString.slice(abcElem.startChar, abcElem.endChar) = ${tune.slice(abcElem.startChar, abcElem.endChar)}`;
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
			redraw() {
				const output = this.formatOutput();
				const abcjsParams = this.formatEngraverParams();

				this.javascriptString = `const tuneObjectArray<span class="red--text">*</span> = ABCJS.renderAbc(
    ${output},
    abcString<span class="red--text">*</span>,
    ${abcjsParams});`;
				if (this.abcjsParams.hint_measures) {
					this.javascriptString += `

<style>
    .abcjs-hint {
        fill: #aaaaaa;
    }
</style>`;
				}

				for (let i = 1; i < 24; i++) {
					const paper = document.getElementById("paper" + i);
					paper.innerText = "";
					paper.setAttribute("style", "");
				}
				this.renderAbc()(this.constructOutput(), this.inputAbc(), this.constructEngraverParams());
},
		},
	}
</script>

<style>
	.visual-page .input-group {
		min-width: 240px;
		max-width: 240px;
		margin-right: 10px;
	}
	.visual-page .abcjs-hint {
		fill: #aaaaaa;
	}
	.visual-page .paper svg {
		background-color: #ffecb3 !important;
	}
	.visual-page .paper > div {
		margin-bottom: 3px;
	}
</style>
