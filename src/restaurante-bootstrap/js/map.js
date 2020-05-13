$(function () {

    class UserLocation {
        static get(callback) {

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((location) => {
                    callback({
                        lat: location.coords.latitude,
                        lng: location.coords.longitude
                    });
                });
            } else {
                alert('No se pudo detectar el lugar en el que te encuentras!');
            }
        }
    }

    const myLocation = {
        lat: 9.311664,
        lng: -75.379927
    };

    google.maps.event.addDomListener(window, 'load', () => {
        const map = new google.maps.Map(
            document.getElementById('map'),
            {
                center: myLocation,
                zoom: 15
            }
        );

        const marker = new google.maps.Marker({
            map: map,
            position: myLocation,
            title: 'Restaurante Bellaquin',
            visible: true
        });

        UserLocation.get((coords) => {
            let origen = new google.maps.LatLng(coords.lat, coords.lng);
            let destino = new google.maps.LatLng(myLocation.lat, myLocation.lng);

            let service = new google.maps.DistanceMatrixService();

            service.getDistanceMatrix({
                origins: [origen],
                destinations: [destino],
                travelMode: google.maps.TravelMode.DRIVING
            }, (response, status) => {
                if (status === google.maps.DistanceMatrixStatus.OK) {
                    const duration = response.rows[0].elements[0];
                    const viaje = duration.duration.text;

                    document.querySelector('#message')
                        .innerHTML = `Estás a ${viaje} de una noche inolvidable en
                   <span class="place-time">Restauante Bellaquin</span>
                   `;
                }
            });
        });
    });

});