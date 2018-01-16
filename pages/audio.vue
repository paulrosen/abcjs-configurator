<template>
	<v-layout class="audio-page">
		<v-flex xs12 sm12 md10 lg8>
			<h1>Playing Generated Music</h1>
			<pre>
| `tuneObjectArray = ABCJS.renderMidi(output, tunebookString, parserParams, midiParams, renderParams)` | Completely creates midi for the tunebook. |


| `parserParams` | Default | Description |
| ------------- | ----------- | ----------- |
| `print` | false | pay attention to margins and other formatting commands that don't make sense in a web page |
| `header_only` | false | only parse the header |
| `stop_on_warning` | false | only parse until the first warning is encountered |
| `hint_measures` | false | repeat the next measure at the end of the previous line, with a unique css class. |

| `midiParams` | Default | Description |
| ------------- | ----------- | ----------- |
| `qpm` | 180 | The tempo, if not specified in abcString. |
| `program` | 0 | The midi program (aka "instrument") to use, if not specified in abcString. |
| `transpose` | 0 | The number of half-steps to transpose the everything, if not specified in abcString. |
| `generateDownload` | false | Whether to generate a download MIDI link. |
| `generateInline` | true | Whether to generate the inline MIDI controls. |
| `downloadLabel` | "download midi" | The text for the MIDI download. If it contains `%T` then that is replaced with the first title. If this is a function, then the result of that function is called. The function takes two parameters: the parsed tune and the zero-based index of the tune in the tunebook. |
| `preTextDownload` | "" | Text that appears right before the download link (can contain HTML markup). |
| `postTextDownload` | "" | Text that appears right after the download link (can contain HTML markup). |
| `preTextInline` | "" | Text that appears right before the MIDI controls (can contain HTML markup). If it contains `%T` then that is replaced with the first title. |
| `postTextInline` | "" | Text that appears right after the MIDI controls (can contain HTML markup). If it contains `%T` then that is replaced with the first title. |
| `listener` | null | Function that is called for each midi event. The parameters are the current abcjs element and the current MIDI event. |
| `animate` | null | Whether to do a "bouncing ball" effect on the visual music. `{ listener: callback, target: output of ABCJS.renderAbc, qpm: tempo }` This calls the listener whenever the current note has changed. It is called with both the last selected note and the newly selected note. The callback parameters are arrays of svg elements. |
| `context` | null | A string that is passed back to both the listener and animate callbacks. |
| `inlineControls` | { selectionToggle: false, loopToggle: false, standard: true, tempo: false, startPlaying: false } | These are the options for which buttons and functionality appear in the inline controls. This is a hash, and is defined below. |
| `drum` | "" | A string formatted like the `%%MIDI drum` specification. Using this parameter also implies `%%MIDI drumon` |
| `drumBars` | 1 |  How many bars to spread the drum pattern over. |
| `drumIntro` | 0 | How many bars of drum should precede the music. |

**Note on the drum parameter:**
See the ABC documentation for the correct way to format the string that is passed as the drum parameter. Here is a table that provides a fairly reasonable default for drum, drumIntro, and drumBars when used as a metronome:
```
const drumBeats = {
// the array is [0]=drum [1]=drumIntro
"2/4": ["dd 92 90 60 30", 2],
"3/4": ["ddd 92 90 90 60 30 30", 1],
"4/4": ["dddd 92 90 90 90 60 30 30 30", 1],
"5/4": ["ddddd 92 90 90 92 90 60 30 30 60 30", 1],
"Cut Time": ["dd 92 90 60 30", 2],
"6/8": ["dd 92 90 60 30", 2],
"9/8": ["ddd 92 90 90 60 30 30", 1],
"12/8": ["dddd 92 90 90 90 60 30 30 30", 1]
};
```
A more complicated example that has the drum pattern fall over two measures of 2/4 time (This is a typical Bulgar pattern):
```
{ drum: "d2dd2ddz", drumBars: 2, drumIntro: 2 }
```

| `inlineControls` | Default | Description |
| ------------- | ----------- | ----------- |
| `selectionToggle` | false | Show a latched push button to play only the current selection. **Not yet implemented** |
| `loopToggle` | false | Show a a latched push button to start playing again when the end is reached. |
| `standard` | true | Show the start, pause, reset, and progress controls. |
| `hide` | false | Whether to show the control at all. |
| `startPlaying` | false | Whether to start the MIDI as soon as it is available. (Not available in the Editor. Only available when calling `ABCJS.renderMidi` ) |
| `tempo` | false | Show the tempo change controls. This is a spinner that starts at 100%. There is an absolute tempo printed next to it.  **Not yet implemented** |
| `tooltipSelection` | "Click to toggle play selection/play all." | The text of the tooltip.  **Not yet implemented** |
| `tooltipLoop` | "Click to toggle play once/repeat." | The text of the tooltip. |
| `tooltipReset` | "Click to go to beginning." | The text of the tooltip. |
| `tooltipPlay` | "Click to play/pause." | The text of the tooltip. |
| `tooltipProgress` | "Click to change the playback position." | The text of the tooltip. |
| `tooltipTempo` | "Change the playback speed." | The text of the tooltip.  **Not yet implemented** |

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
