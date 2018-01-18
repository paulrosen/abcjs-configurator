<template>
	<v-layout>
		<v-flex xs12 sm12 md10 lg8>
			<h1>Understanding the <em>abcjs</em> configuration options</h1>
			<p>This app is a companion to <a href="https://abcjs.net">abcjs</a>. It is intended to help the programmer who plans
				to incorporate abcjs into their website get the options correct.
			</p>
			<p>There are different configuration options for the standard music engraver, the midi generator, and the interactive version where a textarea is presented to the user
				and the user can create the music.</p>
			<p>All of the public entry points that abcjs provides are represented here.</p>
			<p>The signature of abcjs that is being used for this app is: <code>{{signature()}}</code></p>
			<p>Click on each of the items in the sidebar to see what abcjs has to offer.</p>
			<p>The examples depend on some input text in ABC format. You may enter the text you wish to test here:</p>
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