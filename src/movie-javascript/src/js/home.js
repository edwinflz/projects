const API = 'https://yts.mx/api/v2/list_movies.json?';
const FRIENDS = 'https://randomuser.me/api/?';


(async function load() {

    // Encargado de llamar a la API
    const getData = async (url, path) => {
        try {
            const response = await fetch(`${url}${path}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log('Error inesperado' + error);
        }
    }

    // Formulario de busqueda

    const $form = document.getElementById('form');
    const $home = document.getElementById('home');
    const $featuringContainer = document.getElementById('featuring');

    const setAttributes = ($element, attributes) => {
        for (const attribute in attributes) {
            $element.setAttribute(attribute, attributes[attribute]);
        }
    }

    const createElementLoader = () => {
        const $loader = document.createElement('img');
        setAttributes($loader, { src: 'src/images/loader.gif', height: 50, width: 50 });
        $featuringContainer.append($loader);
    }

    const featuringTemplate = (peli) => {
        return (
            `
          <div class="featuring">
            <div class="featuring-image">
              <img src="${peli.medium_cover_image}" width="70" height="100" alt="peli">
            </div>
            <div class="featuring-content">
              <p class="featuring-title">Pelicula encontrada</p>
              <p class="featuring-album">${peli.title}</p>
            </div>
          </div>
          `
        )
    }

    const validarData = peli => {
        if (peli.movie_count !== 0) {
            const HTMLString = featuringTemplate(peli.movies[0]);
            $featuringContainer.innerHTML = HTMLString;
        } else {
            $featuringContainer.innerHTML = '';
            $home.classList.remove('search-active');
            alert('Lo sentimos no se encontraron resultados');
        }
    }

    const sendPeticionSearch = async () => {
        const data = new FormData($form);
        // obj.data.movies[0];
        const { data: peli } = await getData(API, `limit=1&query_term=${data.get('name')}`);
        validarData(peli)
    }


    $form.addEventListener('submit', (event) => {
        event.preventDefault();
        $home.classList.add('search-active');
        $featuringContainer.innerHTML = '';
        createElementLoader();
        sendPeticionSearch();
    });


    // Renderiza cada pelicula en su respectivo contenedor
    const renderMovieList = (list, $container, category) => {
        // Remuevo el primer element (GIF, Img Default)
        $container.children[0].remove();

        for (const movie of list) {

            const HTMLString = videoItemTemplate(movie, category);
            const movieElement = createTemplate(HTMLString);
            // Finalmente añado el Elemento a su contenedor
            $container.append(movieElement);
            animationImg(movieElement);
            addEventClick(movieElement);
        }

    }

    const renderRamdonList = (list, $container) => {
        // Remuevo el primer element (GIF, Img Default)
        $container.children[0].remove();

        for (const movie of list) {
            const HTMLString = ramdonItemTemplate(movie);
            const movieElement = createTemplate(HTMLString);
            // Finalmente añado el Elemento a su contenedor
            $container.append(movieElement);
        }

    }

    const renderFriendsList = (list, $container) => {
        $container.children[0].remove();

        for (const friends of list) {

            const HTMLString = friendItemTemplate(friends);
            const friendsElement = createTemplate(HTMLString);
            // Finalmente añado el Elemento a su contenedor
            $container.append(friendsElement);
            animationImg(friendsElement);
        }
    }

    const animationImg = (element) => {
        const image = element.querySelector('img');
        image.addEventListener('load', (event) => {
            event.srcElement.classList.add('fadeIn');
        })
    }

    const friendItemTemplate = (friends) => {
        return (
            `<li class="playlist-friends-item">
            <a href="javascript:void(0)">
              <img src="${friends.picture.thumbnail}" alt="img-cover">
              <span>${friends.name.first} ${friends.name.last}</span>
            </a>
          </li>`
        );
    }

    const ramdonItemTemplate = (movie) => {
        return (
            `<li class="my-playlist-items">
            <a href="javascript:void(0)">
              <span>
              ${movie.title}
              </span>
            </a>
          </li>`
        );
    }



    // HTML DE CADA MOVIE
    const videoItemTemplate = (movie, category) => {
        return (
            `<article class="primary-playlist-listitem" 
            data-id="${movie.id}" 
            data-category=${category}>
            <div class="primary-playlist-listitem-image">
            <img src="${movie.medium_cover_image}">
            </div>
            <h4 class="primary-playlist-listitem-title">
            ${movie.title}
            </h4>
            </article>`
        );
    }

    const createTemplate = (HTMLString) => {
        // Creo un obj HTML
        const html = document.implementation.createHTMLDocument();
        // Agrego HTML al body del obj
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
    }


    const addEventClick = $element => {
        $element.addEventListener('click', () => {
            showModal($element);
        })
    }

    // Consumo de la API
    // INVOCO LAS ACCIONES DE REDERIZAR LAS MOVIES
    const { results: friendsList } = await getData(FRIENDS, 'results=10');
    const $friendsContainer = document.querySelector('#playlistFriends');
    renderFriendsList(friendsList, $friendsContainer);

    const { data: { movies: ramdon } } = await getData(API, `limit=10`);
    const $randomContainer = document.querySelector('#myPlaylist');
    renderRamdonList(ramdon, $randomContainer);

    const { data: { movies: actionList } } = await getData(API, 'genre=action');
    window.localStorage.setItem('actionList', JSON.stringify(actionList));
    const $actionContainer = document.querySelector('#action');
    renderMovieList(actionList, $actionContainer, 'action');

    const { data: { movies: dramaList } } = await getData(API, 'genre=drama');
    window.localStorage.setItem('dramaList', JSON.stringify(dramaList));
    const $dramaContainer = document.getElementById('drama');
    renderMovieList(dramaList, $dramaContainer, 'drama');

    const { data: { movies: animationList } } = await getData(API, 'genre=animation');
    window.localStorage.setItem('animationList', JSON.stringify(animationList));
    const $animationContainer = document.getElementById('animation');
    renderMovieList(animationList, $animationContainer, 'animation');


    // const $home = $('.home .list #item');
    const $modal = document.getElementById('modal');
    const $overlay = document.getElementById('overlay');
    const $hideModal = document.getElementById('hide-modal');

    const $modalTitle = $modal.querySelector('h1');
    const $modalImage = $modal.querySelector('img');
    const $modalDescription = $modal.querySelector('p');

    const findById = (list, id) => {
        // parseInt (variable, base {10 (Decimal)})
        return list.find(movie => movie.id === parseInt(id, 10));
    }

    const findMovie = (id, category) => {
        switch (category) {
            case 'action': {
                return findById(actionList, id);
            }
            case 'drama': {
                return findById(dramaList, id);
            }
            default: {
                return findById(animationList, id);
            }
        }
    }

    const showModal = ($element) => {
        $overlay.classList.add('active');
        $modal.style.animation = 'modalIn .8s forwards';
        const id = $element.dataset.id;
        const category = $element.dataset.category;

        const data = findMovie(id, category);

        $modalTitle.textContent = data.title;
        $modalImage.setAttribute('src', data.medium_cover_image);
        $modalDescription.textContent = data.description_full
    }

    const hideModal = () => {
        $overlay.classList.remove('active');
        $modal.style.animation = 'modalOut .8s forwards';
    }
    $hideModal.addEventListener('click', hideModal);


})()