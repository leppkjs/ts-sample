import { IRouteExecute } from './IRouteExecute';
/* basic structure of what a route needs */
export interface IRouteConfig {
    path: string;
    onRouteTo: IRouteExecute;
}
