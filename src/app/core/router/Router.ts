import * as $ from 'jquery';
import {Route} from './Route';

/* router Class - Tracks, manages and executes Routes */
export class Router {
    private siteBase: string;
    private appBase: string;
    private routes: Array<Route>;
    /* creates a Router
     * siteBase Base URL for everything (eg. /)
     * appBase URL for where the application runs inside an MVC Route (eg. /App)
     */
    constructor(siteBase: string, appBase: string) {
        this.siteBase = siteBase;
        this.appBase = appBase;
        this.routes = [];
    }
    /* registers a Route with the Router */
    registerRoute(route: Route): Router {
        this.routes.push(route);
        return this;
    }
    /* gets a Consistent Route Path
     * provides Original Route for HTML4 browsers
     */
    getCurrentPath(): string {
        // html4 - honor Navigation if Provided before redirect
        var originalRoute: string = window.sessionStorage.getItem("html4.route");
        if (originalRoute) {
            window.sessionStorage.setItem("html4.route", null);
            return originalRoute;
        }
        return window.location.pathname;
    }
    /* starts the Router (the application does this itself, not intended to be called)
     * if True is Returned, The application should navigate to the getCurrentPath() value
     * if False is returned, we will be redirecting HTML4 browsers, so omit
     */
    start(): boolean {
        console.log("start.....");
        var currentURL: string = window.location.pathname;
        console.log(currentURL);
        // if Not supported, note the path, then redirect to base
        if (!(window.history && 'pushState' in window.history) && currentURL !== this.appBase) {
            console.log(111);
            window.sessionStorage.setItem("html4.route", this.getCurrentPath());
            window.location.href = this.appBase;
            return false;
        }

        // setup HTML5 Navigation Event
        if (window.history && 'pushState' in window.history) {
            console.log(222);
            var router: Router = this;
            window.addEventListener("popstate", (ev: PopStateEvent): void=> {
                console.log("popstate...");
                var appRoute: string = window.location.pathname.substr(router.appBase.length);
                for (var i: number = 0; i < router.routes.length; i++) {
                    var route: Route = router.routes[i];
                    if (route.matches(appRoute)) {
                        route.fn(route.getArguments(appRoute));
                        break;
                    }
                }
            });

            $("a").on("click",function (event: JQuery.Event): void {
                console.log("a click...");
                var url: string = $(this).attr("href");
                console.log("url :", url);
                if (url.substr(0, router.appBase.length) === router.appBase) {
                    event.preventDefault();
                    router.navigateTo(url);
                }
            });
        }
        return true;
    }
    /* builds a Url from a Relative URL string (eg. api controller calls) */
    buildURL(relativeUrl: string): string {
        console.log("buildURL.....")
        if (relativeUrl.charAt(0) === "/") {
            return this.siteBase + relativeUrl.substr(1);
        }
        return this.siteBase + relativeUrl;
    }

    /* navigates to a Route based on the string Provided */
    navigateTo(fullPath: string): boolean {
        console.log("fullPath", fullPath);
        // make sure it's an app URL
        if (fullPath.substr(0, this.appBase.length) === this.appBase) {
            var appRoute: string = fullPath.substr(this.appBase.length);
            console.log("appRoute", appRoute);
            // find the Route
            for (var i: number = 0; i < this.routes.length; i++) {
                var route: Route = this.routes[i];
                if (route.matches(appRoute)) {
                    // execute this Matching Route
                    route.fn(route.getArguments(appRoute));
                    if (window.history && 'pushState' in window.history) {
                        console.log("history", fullPath);
                        window.history.pushState(null, null, fullPath);
                    }
                    return true;
                }
            }
        }
        // no route was found - force user to backup
        if (console.error) {
            console.error("Invalid Route Detected trying to get to: " + fullPath);
        }
        return false;
    }
}