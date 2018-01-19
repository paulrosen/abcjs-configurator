<template>
	<v-layout>
		<v-flex xs12 sm12 md10 lg8>
			<h1>Understanding the <span class="blue--text text--lighten-1">abcjs</span> configuration options</h1>
			<p>This app is a companion to <a href="https://abcjs.net" class="blue--text text--lighten-1">abcjs</a>. It is intended to help the programmer who plans
				to incorporate <span class="blue--text text--lighten-1">abcjs</span> into their website understand the large number of options available.
			</p>
			<p>There are different configuration options for the standard music engraver, the midi generator, and the interactive textarea version.</p>
			<p>All of the public entry points that <span class="blue--text text--lighten-1">abcjs</span> provides are represented here.</p>
			<p>The version of <span class="blue--text text--lighten-1">abcjs</span> that is loaded is revealed by <code>abcjs.signature</code> and is <pre class="amber lighten-4 string chip">{{signature()}}</pre> in this case.</p>
			<p>Click on each of the items in the sidebar to see what <span class="blue--text text--lighten-1">abcjs</span> has to offer.</p>
			<p>The examples depend on some input text in ABC format. You may enter the text you wish to test below, or just use the sample tunebook that is already entered.</p>
			<v-text-field
					:value="inputAbc()"
					@input="updateInput"
					multi-line
					textarea
					label="abcString"
			></v-text-field>
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
			...mapGetters(['appTitle', 'inputAbc', 'signature']),
			...mapMutations(['updateInput']),
		}
	}
</script>

<style>
	textarea {
		height: 350px;
	}
</style>