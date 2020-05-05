class Router {

    constructor(routes) {
        this.routes = routes;
        this._loadInitialRoute();
    }

    loadRoute(...urlSegm) {
        let matchedRoute = this._mathUrlToRoute(urlSegm);

        
        // console.log(matchedRoute);

        const url = `/${urlSegm.join('/')}`;
        history.pushState({}, 'this works', url);

        const routerOutElm = document.querySelectorAll('[data-router]')[0];
        routerOutElm.innerHTML = matchedRoute.template;
    }

    _mathUrlToRoute(urlSegm) {
        const matchedRoute = this.routes.find(route => {
            const routePathSegs = route.path.split('/').slice(1);

            if (routePathSegs.length !== urlSegm.length) {
                return false;
            }

            return routePathSegs.every((routePathSeg, i) => routePathSeg === urlSegm[i]);

        });

        return matchedRoute;

    }

    _loadInitialRoute() {
        const pathNameSplit = window.location.pathname.split('/');
        const pathSegs = pathNameSplit.length > 1 ? pathNameSplit.slice(4) : '';

        console.log(pathNameSplit);

        this.loadRoute(...pathSegs);
    }
}
