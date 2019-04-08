<template>
	<b-card class="mb-3" bg-variant="dark" text-variant="white">
		
		<h6 class="text-muted">Pomodoro {{ session.num }}</h6>

		<b-form-checkbox
			v-if="session.isRunning || session.isDone"
			v-bind:checked="session.isDone"
			disabled>
			<b-card-title class="text-light">{{ session.todo }}</b-card-title>
		</b-form-checkbox>

		<b-card-title v-if="!session.current && !session.isDone" class="text-muted">You must complete the previous session.</b-card-title>

		<div v-if="session.isDone">
			<b-card-title class="text-success">
				You're done, congratulations!
			</b-card-title>
			<b-button
				v-if="session.breaktime && !breaktimeDone"
				variant="success"
				@click="startBreak"
				block
			>Take a break</b-button>
		</div>

		<b-form v-if="session.current">

			<b-form-group v-if="!session.isRunning" label="Enter a todo before you begin" for="input-todo">
				<b-form-input
					id="input-todo"
					required
					placeholder="To do"
					v-model="session.todo"
				></b-form-input>
			</b-form-group>

			<b-button block @click="formSubmit" type="submit" variant="primary" v-if="!session.isRunning">Begin</b-button>

			<span v-if="session.isRunning">
				<b-button @click="togglePause" block variant="warning">{{ playPause }}</b-button>
				<b-button @click="reset" block variant="danger">Reset</b-button>
			</span>

		</b-form>
	</b-card>
</template>

<script>
	export default {
		name: 'Session',
		props: ['session', 'state'],
		data() {
			return {
				pomodoroTime: this.getMsec(25),
				shortBreak: this.getMsec(5),
				longBreak: this.getMsec(15),
				breaktimeDone: false,
				playPause: 'Pause'
			}
		},
		methods: {
			formSubmit: function() {
				if(this.session.todo === '') {
					return false;
				}
				this.session.isRunning = !this.session.isRunning;
				this.state.status = 'Working...'
				this.$emit('start-countdown', this.pomodoroTime);
			},

			reset: function() {
				this.session.isRunning = !this.session.isRunning;
				this.session.todo = '';
				this.state.isPaused = false;
				this.playPause = 'Pause'
				this.state.isReset = !this.state.isReset;
				this.state.status = 'Waiting for a todo...';
			},

			togglePause: function() {
				this.state.isPaused = !this.state.isPaused;

				if(this.state.isPaused === true) {
					this.playPause = 'Play';
					this.state.status = 'Paused.';
				} else {
					this.playPause = 'Pause';
					this.state.status = 'Working...';
				}
			},

			startBreak: function() {
				this.breaktimeDone = true;
				if(this.state.currentTodo === 4) {
					this.$emit('start-break', this.longBreak);
					this.state.status = 'Taking a long break...'
				} else {
					this.$emit('start-break', this.shortBreak);
					this.state.status = 'Taking a break...'
				}
			},

			getMsec: function(minutes) {
				return minutes * 60000;
			}
		}
	}
</script>