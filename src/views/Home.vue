<template>
	<main>
		<section>
			<div class="container">

				<h1 class="timer">{{ minutes }}:{{ seconds }}</h1>

				<h4 class="status">{{ state.status }}</h4>

				<h4 class="text-light mt-4">Your Pomodoro Session</h4>
				<hr class="bg-light">
				<div class="row">
					<div class="col-lg-3" v-bind:key="session.num" v-for="session in sessions">
						<Session v-on:start-countdown="countDown" v-on:start-break="countDown" v-bind:session="session" v-bind:state="state" />
					</div>
				</div>

			</div>
		</section>
	</main>
</template>

<script>
	
	import Session from '@/components/Session.vue'

	export default {
		name: 'Home',
		components: {
			Session
		},
		data() {
			return {
				minutes: '25',
				seconds: '00',
				alarm: new Audio(require('../assets/audio/alarm.mp3')),
				state: {
					isReset: false,
					isPaused: false,
					currentTodo: 1,
					status: 'Waiting for a todo...'
				},
				sessions: [
					{
						num: 1,
						todo: '',
						isRunning: false,
						current: true,
						isDone: false,
						breaktime: false
					},
					{
						num: 2,
						todo: '',
						isRunning: false,
						current: false,
						isDone: false,
						breaktime: false
					},
					{
						num: 3,
						todo: '',
						isRunning: false,
						current: false,
						isDone: false,
						breaktime: false
					},
					{
						num: 4,
						todo: '',
						isRunning: false,
						current: false,
						isDone: false,
						breaktime: false
					}
				]
			}
		},
		methods: {

			countDown: function(time) {
				this.alarm.pause();
				this.alarm.currentTime = 0;
				this.state.isReset = false;
				this.state.isPaused = false;
				var target = Date.now() + time;
				var diff = target - Date.now();
				var totalSec = 0;

				var clock = setInterval(() => {
					totalSec += 10;

					var remaining = this.getRemainingtime(diff);

					if(!this.state.isPaused || totalSec === 1000) {

						diff = target - Date.now();

						if(remaining.minutes < 10) {
							this.minutes = '0' + remaining.minutes;
						} else {
							this.minutes = remaining.minutes;
						}

						if(remaining.seconds < 10) {
							this.seconds = '0' + remaining.seconds;
						} else {
							this.seconds = remaining.seconds;
						}

					} else {
						target = Date.now() + remaining.total;
					}

					if(remaining.total <= 0 || this.state.isReset) {
						this.minutes = '25';
						this.seconds = '00';
						clearInterval(clock);
						if(remaining.total <= 0) {
							this.playAlarm();
							this.doneTodo();
						}
					}

					if(totalSec === 1000) {
						totalSec = 0;
					}

				}, 10);
			},

			getRemainingtime: function(diff) {
				var seconds = Math.floor((diff / 1000) % 60);
				var minutes = Math.floor((diff / 1000 / 60) % 60);
				return {
					total: diff,
					minutes: minutes,
					seconds: seconds
				}
			},

			doneTodo: function() {
				this.state.status = 'You\'re done!';
				this.sessions[this.state.currentTodo - 1].current = false;
				this.sessions[this.state.currentTodo - 1].isDone = true;
				this.sessions[this.state.currentTodo - 1].isRunning = false;
				this.sessions[this.state.currentTodo - 1].breaktime = !this.sessions[this.state.currentTodo - 1].breaktime;
				if(this.sessions[this.state.currentTodo - 1].breaktime) {
					if(this.state.currentTodo === 4) {
						this.minutes = '15';
					} else {
						this.minutes = '05';
					}
				} else {
					this.newTodo();
				}
			},

			newTodo: function() {
				if(this.state.currentTodo === 4) {
					this.resetApp();
				} else {
					this.state.currentTodo++;
				}
				this.minutes = '25';
				this.state.status = 'Waiting for a todo...';
				this.sessions[this.state.currentTodo - 1].current = true;
			},

			resetApp: function() {
				this.state.currentTodo = 1;
				this.state.isReset = false;
				this.state.isPaused = false;
				this.state.status = 'Waiting for a todo...';
				this.minutes = '25';
				this.sessions.forEach((session) => {
					session.todo = '';
					session.isRunning = false;
					if(session.num === 1) {
						session.current = true;
					} else {
						session.current = false;
					}
					session.isDone = false;
				});
			},

			playAlarm: function() {
				this.alarm.play();
			}
		}
	}

</script>

<style scoped>
	.container {
		max-width: 1600px;
	}

	h1, h4 {
		text-shadow: 0px 0px 30px rgba(0, 0, 0, 0.3);
	}
</style>