<template>
	<v-layout>
		<v-flex xs12 sm12 md12 lg12>
			<h1>Understanding the <span class="blue--text text--lighten-1 abcjs-text">abcjs</span> configuration options</h1>
			<p>This app is a companion to <a href="https://abcjs.net" class="blue--text text--lighten-1 abcjs-text">abcjs</a>. It is intended to help the programmer who plans
				to incorporate <span class="blue--text text--lighten-1 abcjs-text">abcjs</span> into their website understand the large number of options available.
			</p>
			<p>All of the public entry points and parameters that <span class="blue--text text--lighten-1 abcjs-text">abcjs</span> provides are represented in one of the pages of this app.</p>
			<p>There are different configuration options for the <nuxt-link to="/visual">standard music engraver</nuxt-link>, the <nuxt-link to="/audio">MIDI generator</nuxt-link>, and the <nuxt-link to="/interactive">interactive textarea</nuxt-link> version.
				In addition, there is some limited <nuxt-link to="/animation">animation</nuxt-link> available that is not part of the audio playback.
				The sheet music is rendered as an SVG and is marked up with certain <nuxt-link to="/classes">classes</nuxt-link> to give the programmer more control, after the music is generated, to manipulate it.
				There are also some <nuxt-link to="/analyze">convenience functions</nuxt-link> that break apart a multi-tune ABC string.
			</p>
			<p>The examples depend on some input text in ABC format. You may enter the text you wish to test below, or just use the sample tunebook that is already entered.</p>
			<v-text-field
					:value="inputAbc()"
					@input="updateInput"
					multi-line
					textarea
					label="abcString"
			></v-text-field>
			<v-card>
				<v-card-title>Loading the Library</v-card-title>
				<v-card-text>
					<p>The library can be loaded in two ways: with npm package manager or by directly including a script in your file.</p>
					<v-card>
						<v-card-title>Package Manager (small, no MIDI)</v-card-title>
						<v-card-text>
							<code class="code-full">import abcjs from 'abcjs';</code>
						</v-card-text>
					</v-card>
					<v-card>
						<v-card-title>Package Manager (with MIDI)</v-card-title>
						<v-card-text>
							<code class="code-full">import 'font-awesome/css/font-awesome.min.css';
import 'abcjs/abcjs-midi.css';
import abcjs from 'abcjs/midi';</code>
						</v-card-text>
					</v-card>
					<v-card>
						<v-card-title>Script Tag (small, no MIDI)</v-card-title>
						<v-card-text>
							<code class="code-full">&lt;script src="/abcjs_basic_{{abcjsVersion()}}-min.js" type="text/javascript"&gt;&lt;/script&gt;</code>
						</v-card-text>
					</v-card>
					<v-card>
						<v-card-title>Script Tag (with MIDI)</v-card-title>
						<v-card-text>
							<code class="code-full">&lt;link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"&gt;
&lt;link rel="stylesheet" type="text/css" href="../abcjs-midi.css"&gt;
&lt;script src="/abcjs_midi_{{abcjsVersion()}}-min.js" type="text/javascript"&gt;&lt;/script&gt;</code>
						</v-card-text>
					</v-card>
				</v-card-text>
			</v-card>
			<v-card>
				<v-card-title>Version</v-card-title>
				<v-card-text>
					<p>The version of the loaded <span class="blue--text text--lighten-1 abcjs-text">abcjs</span> library can be obtained like this:</p>
					<code class="code-full">import abcjs from 'abcjs/midi';
console.log(abcjs.signature); // prints --> "{{signature()}}"</code>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
	import {mapGetters, mapMutations} from 'vuex';

	export default {

		head() {
			return {
				title: this.appTitle()
			};
		},

		methods: {
			...mapGetters(['appTitle', 'inputAbc', 'signature', 'abcjsVersion']),
			...mapMutations(['updateInput']),
		}
	}
</script>

<style>
	textarea {
		height: 350px;
	}
</style>