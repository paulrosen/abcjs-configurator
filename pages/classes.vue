<template>
	<v-layout class="classes-page">
		<v-flex xs12 sm12 md10 lg8>
			<h1>Classes</h1>
			<pre>
| css classes (assuming the SVG element is `.paper`) | Description |
| `.paper path.note_selected, .paper text.note_selected` | The color that the selected note or other element is |

## classes

If you use, `{ add_classes: true }`, then the following classes are attached to various elements:

| class | description |
| ------------- | ----------- |
| meta-top | Everything that is printed before the first staff line. |
| title | The line specified by T: |
| text | Extra text that is not part of the music. |
| staff-extra | Clefs, key signatures, time signatures. |
| tempo | The tempo marking. |
| meta-bottom | Everything that is printed after all the music. |
| staff  | The horizontal lines that make up the staff; ledger lines. |
| l1, l2, etc. | (lower case L, followed by a number) The staff line number, starting at one. |
| m1, m2, etc. | The measure count from the START OF THE LINE. |
| top-line | The top horizontal line of a staff. |
| symbol | Any special symbol, like a trill. |
| chord | The chord symbols, specified in quotes. |
| note | Everything to do with a note. |
| bar | The bar lines. |
| slur | Slurs and ties. |
| abc-lyric | The lyric line. |

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
