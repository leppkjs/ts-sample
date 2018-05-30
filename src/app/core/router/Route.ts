import {IRouteConfig} from './IRouteConfig';
import {IRouteExecute} from './IRouteExecute';
import {IRouteValues} from './IRouteValues';

/**
 * route class (this class represent a route in the router)
 * heavily based on: http://www.codeproject.com/Articles/495826/Roll-your-own-A-JavaScript-router
 */
export class Route {
    private routeConfig: IRouteConfig;
    private routeParts: Array<string>;
    private routeArguments: Array<string>;
    private routeOptional: Array<string>;

    /**
     * creates a route
     *
     * @param {string} path Path for the Route use {id} to indicate id is required, :id: to indicate id is optional
     * @param {IRouteExecute} onRouteTo Function to Execute to start the Route
     */
    constructor(path: string, onRouteTo: IRouteExecute) {
        this.routeConfig = { path: path, onRouteTo: onRouteTo };
        this.routeParts = path.split("/");
        this.routeArguments = [];
        this.routeOptional = [];
        // find all Mandatory Parts (delimited with { and })
        this.routeParts.forEach((part: string): void=> {
            if (part.charAt(0) === "{" && part.charAt(part.length - 1) === "}") {
                this.routeArguments.push(part.substr(1, part.length - 2));
            }
        }, this);
        // find all Options Parts (delimited with : and 🙂
        this.routeParts.forEach((part: string) : void => {
            if (part.charAt(0) === ":" && part.charAt(part.length - 1) === ":") {
                this.routeOptional.push(part.substr(1, part.length - 2));
            }
        }, this);
    }

    /**
     * checks to see if this Route matches the provided path
     *
     * @param {string} path Path to Validate for a match
     * @returns {boolean}
     */
    matches(path: string): boolean {
        try {
            var incomingParts: Array<string> = path.split("/");
            if (incomingParts.length < this.routeParts.length - this.routeOptional.length) {
                return false;
            }
            for (var i:number = 0; i < incomingParts.length; i++) {
                var incoming:string = incomingParts[i];
                var part: string = this.routeParts[i];
                if (typeof part === "undefined") {
                    // route is too long (exceeded array)
                    return false;
                }
                if (part.charAt(0) !== "{" && part.charAt(0) !== ":" &&
                    part.charAt(part.length - 1) !== "}" && part.charAt(part.length - 1) !== ":") {
                    // this is not a parameter, the route must match
                    if (part.substr(1, part.length - 2) !== incoming.substr(1, incoming.length - 2)) {
                        return false;
                    }
                }
            }
            return true;
        } catch (ex) {
            if (console.error) {
                console.error(ex);
            }
            return false;
        }
    }

    /**
     * returns an IRouteValues of the parameters which were found in the path
     * may return nothing if no paramters are in the route
     *
     * @param {string} path
     * @returns {IRouteValues}
     */
    getArguments(path: string): IRouteValues {
        var args: IRouteValues = {};
        var incomingParts:Array<string> = path.split("/");
        for (var i:number = 0; i < incomingParts.length; i++) {
            var incoming:string = incomingParts[i];
            var part:string = this.routeParts[i];
            if ((part.charAt(0) === "{" || part.charAt(0) === ":") &&
                (part.charAt(part.length - 1) === "}" || part.charAt(part.length - 1) === ":")) {
                // this is not a parameter, the route must match
                args[part.substr(1, part.length - 2)] = incoming;
            }
        }
        return args;
    }

    /**
     * 경로가 일치 할 때 호출 할 콜백 함수
     *
     * @param {IRouteValues} values
     */
    fn: IRouteExecute = (values: IRouteValues):void => {
        this.routeConfig.onRouteTo(values);
    };
}