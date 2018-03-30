<template>
	<v-layout class="visual-page">
		<v-flex xs12 sm12 md12 lg12>
			<v-card>
				<v-card-title>Default Formatting</v-card-title>
				<v-card-text>
					<p>Each tune can contain formatting parameters, and that is certainly needed for specific purposes. However, if you
					have a number of tunes, there's a good chance that you will want the same formatting styles for all of them.</p>
					<p>You may specify the standard <code class="subtle-code">%%</code> formatting commands in the string you pass to <code class="subtle-code">renderAbc()</code>.</p>
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
						<TextInputItem label="Starting Tune" :help="helpText.startingTune" v-model="abcjsParams.startingTune"></TextInputItem>

						<h2>Formatting Parameters</h2>
						<v-layout wrap justify-start align-center>
							<TextInputItem label="titlefont" :help="helpText.titlefont" v-model="abcjsParams.format.titlefont"></TextInputItem>
							<TextInputItem label="composerfont" :help="helpText.composerfont" v-model="abcjsParams.format.composerfont"></TextInputItem>
							<TextInputItem label="gchordfont" :help="helpText.gchordfont" v-model="abcjsParams.format.gchordfont"></TextInputItem>
							<TextInputItem label="partsfont" :help="helpText.partsfont" v-model="abcjsParams.format.partsfont"></TextInputItem>
							<TextInputItem label="annotationfont" :help="helpText.annotationfont" v-model="abcjsParams.format.annotationfont"></TextInputItem>
							<TextInputItem label="footerfont" :help="helpText.footerfont" v-model="abcjsParams.format.footerfont"></TextInputItem>
							<TextInputItem label="headerfont" :help="helpText.headerfont" v-model="abcjsParams.format.headerfont"></TextInputItem>
							<TextInputItem label="historyfont" :help="helpText.historyfont" v-model="abcjsParams.format.historyfont"></TextInputItem>
							<TextInputItem label="infofont" :help="helpText.infofont" v-model="abcjsParams.format.infofont"></TextInputItem>
							<TextInputItem label="measurefont" :help="helpText.measurefont" v-model="abcjsParams.format.measurefont"></TextInputItem>
							<TextInputItem label="repeatfont" :help="helpText.repeatfont" v-model="abcjsParams.format.repeatfont"></TextInputItem>
							<TextInputItem label="subtitlefont" :help="helpText.subtitlefont" v-model="abcjsParams.format.subtitlefont"></TextInputItem>
							<TextInputItem label="tempofont" :help="helpText.tempofont" v-model="abcjsParams.format.tempofont"></TextInputItem>
							<TextInputItem label="textfont" :help="helpText.textfont" v-model="abcjsParams.format.textfont"></TextInputItem>
							<TextInputItem label="voicefont" :help="helpText.voicefont" v-model="abcjsParams.format.voicefont"></TextInputItem>
							<TextInputItem label="vocalfont" :help="helpText.vocalfont" v-model="abcjsParams.format.vocalfont"></TextInputItem>
							<TextInputItem label="wordsfont" :help="helpText.wordsfont" v-model="abcjsParams.format.wordsfont"></TextInputItem>
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
					startingTune: "0",
					scale: "1",
					format: {
						gchordfont: "",
						annotationfont: "",
						composerfont: "",
						footerfont: "",
						headerfont: "",
						historyfont: "",
						infofont: "",
						measurefont: "",
						partsfont: "",
						repeatfont: "",
						subtitlefont: "",
						tempofont: "",
						textfont: "",
						titlefont: "",
						voicefont: "",
						vocalfont: "",
						wordsfont: "",
					}
				},
				javascriptString: "",
				javascriptOpen: true,
				optionsOpen: true,
				outputOpen: true,
				highlightListenerOutput: "",

				helpText: {
					numberOfTunes: "The input ABC string can have multiple tunes in it, separated by \"X:\" lines. Each tune goes in its own SVG and requires markup. This sample app has 24 DIVs declared in the form &lt;div id=\"paper1\"&gt;, so up to 24 tunes can be displayed. If you don't specify anything here, only the first tune is displayed. To cherry pick a tune, you can either preprocess the ABC string (see the Analyze page for details), or use this in conjunction with the \"Starting Tune\" parameter.",
					startingTune: "If there are multiple tunes in the input string, then this chooses which tune to display. For control over what is displayed, use with the \"Number of Tunes\" parameter. This is zero-based. If this is greater than the number of tunes in the input string, then nothing is displayed.",
					gchordfont: "The font used for the accompaniment chord names. Sample format: \"Verdana 16 italic bold box\"",
					annotationfont: "The font used for the annotations. Sample format: \"Verdana 16 italic bold\"",
					composerfont: "The font used for the composer. Sample format: \"Verdana 16 italic bold\"",
					footerfont: "The font used for the footer. Sample format: \"Verdana 16 italic bold\"",
					headerfont: "The font used for the header. Sample format: \"Verdana 16 italic bold\"",
					historyfont: "The font used for the history. Sample format: \"Verdana 16 italic bold\"",
					infofont: "The font used for the info fields. Sample format: \"Verdana 16 italic bold\"",
					measurefont: "The font used for the meaure numbers. Sample format: \"Verdana 16 italic bold box\"",
					partsfont: "The font used for the part labels. Sample format: \"Verdana 16 italic bold box\"",
					repeatfont: "The font used for the 1st & 2nd repeat numbers. Sample format: \"Verdana 16 italic bold\"",
					subtitlefont: "The font used for the subtitle. Sample format: \"Verdana 16 italic bold\"",
					tempofont: "The font used for the tempo. Sample format: \"Verdana 16 italic bold\"",
					textfont: "The font used for the extra text. Sample format: \"Verdana 16 italic bold\"",
					titlefont: "The font used for the title. Sample format: \"Verdana 16 italic bold\"",
					voicefont: "The font used for the voice labels. Sample format: \"Verdana 16 italic bold\"",
					vocalfont: "The font used for the interspersed lyrics. Sample format: \"Verdana 16 italic bold\"",
					wordsfont: "The font used for the extra verses at the bottom. Sample format: \"Verdana 16 italic bold\"",
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

			formatFormattingParams() {
				let params = "";
				if (this.abcjsParams.startingTune !== "0")
					params += `\n        startingTune: ${this.abcjsParams.startingTune},`;
				if (this.abcjsParams.scale !== "1")
					params += `\n        scale: ${this.abcjsParams.scale},`;

				let format = [];
				Object.keys(this.abcjsParams.format).forEach(key  => {
					if (this.abcjsParams.format[key])
						format.push(`\n            ${key}: "${this.abcjsParams.format[key]}",`);
				});
				if (format.length > 0) {
					params += `\n        format: {`;
					params += format.join("");
					params += "\n        }";
				}

				if (params === "")
					params = "{ }";
				else
					params = `{${params}
    }`;
				return params;
			},

			redraw() {
				const output = this.formatOutput();
				const abcjsParams = this.formatFormattingParams();

				this.javascriptString = `ABCJS.renderAbc(
    ${output},
    abcString,
    ${abcjsParams});`;

				for (let i = 1; i < 24; i++) {
					const paper = document.getElementById("paper" + i);
					paper.innerText = "";
					paper.setAttribute("style", "");
				}
				this.renderAbc()(this.constructOutput(), this.inputAbc(), this.abcjsParams);
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
