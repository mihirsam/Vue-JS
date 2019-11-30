var app = new Vue({
  el: '#app',
  data: {
    place: '',
    latitude: '',
    longitude: '',
    active: true
  },
  watch: {
    place: function () {
      this.latitude = '';
      this.longitude = '';
      this.active = true;
      if (this.place.length >= 3) {
        this.active = false;
        this.lookupCoordinates();
      }
    }
  },
  methods: {
    lookupCoordinates: _.debounce(function () {
      var app = this;
      app.latitude = "Searching...";
      app.longitude = "Searching...";
      axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + app.place)
        .then(function (response) {
          app.latitude = response.data.results[0].geometry.location.lat;
          app.longitude = response.data.results[0].geometry.location.lng;
        })
        .catch(function (error) {
          app.latitude = "Invalid place";
          app.longitude = "Invalid place";
        })
    }, 500)
  }
})