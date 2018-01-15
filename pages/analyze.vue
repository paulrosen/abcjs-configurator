<template>
	<v-layout class="analyze-page">
		<v-flex xs12 sm12 md10 lg8>
			<h1>Analysis Functions</h1>
			<p>These functions are provided as a convenience, in case the app should do something different depending on what tunes have been input.
			</p>
			<p>Result of
				<v-chip label>abcjs.numberOfTunes(abcString)</v-chip>
				is
				<v-chip label>{{numberOfTunes()}}</v-chip>
			</p>
			<template v-for="title,i in titles()">
				<v-card class="tune-card" :key="i" raised>
					<v-card-title>abcjs.TuneBook(abcString).getTuneByTitle("{{title}}")</v-card-title>
					<v-card-text>
						<p>Start Character: {{tuneByTitle()(title).startPos}}</p>
						<code label>{{tuneByTitle()(title).abc}}</code>
					</v-card-text>
				</v-card>
			</template>
			<template v-for="id,i in ids()">
				<v-card class="tune-card" :key="i" raised>
					<v-card-title>abcjs.TuneBook(abcString).getTuneById("{{id}}")</v-card-title>
					<v-card-text>
						<p>Start Character: {{tuneById()(id).startPos}}</p>
						<code label>{{tuneById()(id).abc}}</code>
					</v-card-text>
				</v-card>
			</template>
		</v-flex>
	</v-layout>
</template>

<script>
	import {mapGetters} from 'vuex';

	export default {

		methods: {
			...mapGetters(['numberOfTunes', 'titles', 'ids', 'tuneByTitle', 'tuneById']),
		}
	}
</script>

<style>
	.tune-card {
		margin-bottom: 10px;
	}
</style>