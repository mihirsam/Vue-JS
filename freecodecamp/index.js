Vue.component('todo-item', {
	props: [ 'todo' ],
	template: '<li>{{todo.text}}<li>'
});

var app = new Vue({
	el: '#app',
	data: {
		message: 'Hello, Vue!',
		final: 'final message!',
		seen: true,

		todos: [
			{ id: 0, text: 'I want to learn java script!' },
			{ id: 1, text: 'I want to learn React-JS!' },
			{ id: 2, text: 'I want to learn Vue-JS!' }
		]
	},

	methods: {
		reverseMessage: function() {
			this.message = this.message.split(' ').reverse().join(' ');
		},

		setFinal: function() {
			this.final = this.message;
		}
	}
});

app.message = 'I have changed the data!';
app.seen = true;
app.todos.push({ text: 'New pushed line!' });
