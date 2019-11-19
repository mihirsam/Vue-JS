Vue.component('cat-list', {
    props: ['cats'],
    template: `
        <ul>
            <li v-for="cat in cats">{{cat.name}}</li>
        </ul>
    `
})

var app = new Vue({
	el: '#root',
	data: {
        newCat: '',
		count: 2,
        email: 'mihir@gmail.com',
        cats: [
            {name: 'kitkat'},
            {name: 'fish'},
            {name: 'henry'}
        ]
    },
    
    methods: {
        addKitty: function() {
            this.cats.push({name: this.newCat});
            this.newCat = '';
        }        
    },

    filters: {
        captalize: function(value) {
            return value.toUpperCase();
        }
    },

    computed: {
        kittifyName: function () {
            if (this.newCat.length > 1) {
                return this.newCat + 'y'
            }
        }
    },

    created: function () {
        console.log("\ncreated!")
    },

    mounted: function() {
        console.log("\nMounted!")
    },

    updated: function() {
        console.log("\nUpdated!")
    },

    destroyed: function() {
        console.log("\nDestroyed!")
    }
});

app.count = 2;
