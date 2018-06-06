import { IRouteValues } from './IRouteValues';

/* defines execution method for a route */
export interface IRouteExecute {
    (values: IRouteValues): void;
}
