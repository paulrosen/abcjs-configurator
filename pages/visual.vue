<template>
	<v-layout class="visual-page">
		<v-flex xs12 sm12 md10 lg8>
			<h1>Displaying Sheet Music</h1>
			<v-card class="section-card">
				<v-card-title>Options</v-card-title>
			</v-card>
			<v-card class="section-card">
				<v-card-title>JavaScript</v-card-title>
				<v-card-text>
					<p>(The <em>tunebookString</em> is whatever is in the textarea on the <nuxt-link to="/">main page</nuxt-link>.)</p>
					<pre>tuneObjectArray = ABCJS.renderAbc(
						output,
						tunebookString,
						parserParams,
						engraverParams,
						renderParams)</pre>
					<p>(The <em>tuneObjectArray</em> contains each of the tunes that was processed. This is not normally needed,
						unless you need to pass it to the animation function or the MIDI "bouncing ball".</p>
				</v-card-text>
			</v-card>
			<v-card class="section-card">
				<v-card-title>Output</v-card-title>
			</v-card>
			<pre>
| Parameters | Description |
| ------------- | ----------- |
| `output` | If this is a string, it is the ID of an element on the DOM. Or it could be the DOM element itself. Or it could be an array of strings or DOM elements. In the case of `renderMidi()`, when both MIDI types are created, they are both created in the same element. |

| `parserParams` | Default | Description |
| ------------- | ----------- | ----------- |
| `print` | false | pay attention to margins and other formatting commands that don't make sense in a web page |
| `header_only` | false | only parse the header |
| `stop_on_warning` | false | only parse until the first warning is encountered |
| `hint_measures` | false | repeat the next measure at the end of the previous line, with a unique css class. |

| `engraverParams` | Default | Description |
| ------------- | ----------- | ----------- |
| `scale` | 1 | If the number passed is between zero and one, then the music is printed smaller, if above one, then it is printed bigger. |
| `staffwidth` | 740 | The width of the music, in pixels. |
| `paddingtop` | 15 | The spacing that the music should have on the web page. |
| `paddingbottom` | 30 | The spacing that the music should have on the web page. |
| `paddingright` | 50 | The spacing that the music should have on the web page. |
| `paddingleft` | 15 | The spacing that the music should have on the web page. |
| `editable` | false | If true, then when a note is clicked, it is highlighted and a callback allows the editor to move the cursor. |
| `add_classes` | false | If true, then each element that is drawn on the SVG will have an identifying class with it that you can use to style, move, or hide the element. |
| `listener` | null | This is an object containing up to two functions. The format is: `{ highlight: function(abcElem) {}, modelChanged: function(abcElem) {} }` The highlight function is called whenever the user clicks on a note or selects a series of notes. The modelChanged function is called whenever the user has changed the music visually. |
| `responsive` | undefined | The strategy for responsiveness. `"resize"` will make the svg take up whatever width is available for the container.


| `renderParams` | Default | Description |
| ------------- | ----------- | ----------- |
| `startingTune` | 0 | The index of the tune in the tunebook to render (starting at zero for the first tune). |
| `viewportHorizontal` | false | Should the horizontal width be limited by the device's width? |
| `scrollHorizontal` | false | Should there be a horizontal scrollbar if the music is wider than the viewport? (requires viewportHorizontal to be true.) |
| `oneSvgPerLine` | false | Should each system of staves be rendered to a different SVG? This makes controlling with CSS easier, and makes it possible to paginate cleanly.
			</pre>
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

		methods: {
			...mapGetters(['appTitle']),
		}
	}
</script>

<style>
</style>
