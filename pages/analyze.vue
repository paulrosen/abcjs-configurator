<template>
	<v-layout class="analyze-page">
		<v-flex xs12 sm12 md12 lg12>
			<h1>Analysis Functions</h1>
			<p>These functions are provided as a convenience, in case the app should do something different depending on what tunes have been input.
			</p>
			<p>Result of
				<code>abcjs.numberOfTunes(abcString)</code>
				is
				<pre class="amber lighten-4 string chip">{{numberOfTunes()}}</pre>
			</p>
			<template v-for="title,i in titles()">
				<v-card :key="i" raised>
					<v-card-title><code>abcjs.TuneBook(abcString).getTuneByTitle("{{title}}")</code></v-card-title>
					<v-card-text>
						<p>Start Character: <pre class="amber lighten-4 string chip">{{tuneByTitle()(title).startPos}}</pre></p>
						<pre class="amber lighten-4 string">{{tuneByTitle()(title).abc}}</pre>
					</v-card-text>
				</v-card>
			</template>
			<template v-for="id,i in ids()">
				<v-card :key="i" raised>
					<v-card-title><code>abcjs.TuneBook(abcString).getTuneById("{{id}}")</code></v-card-title>
					<v-card-text>
						<p>Start Character: <pre class="amber lighten-4 string chip">{{tuneById()(id).startPos}}</pre></p>
						<pre class="amber lighten-4 string">{{tuneById()(id).abc}}</pre>
					</v-card-text>
				</v-card>
			</template>
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
			...mapGetters(['numberOfTunes', 'titles', 'ids', 'tuneByTitle', 'tuneById', 'appTitle']),
		}
	}
</script>

<style>
	.analyze-page .card__title code {
		width: 100%;
	}
	.analyze-page .card__text pre.chip {
		display: inline;
	}
</style>