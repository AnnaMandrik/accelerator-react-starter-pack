import { Middleware } from 'redux';
import { State } from '../../types/state';
import { MiddlewareAction } from '../../types/middleware-action';
import browserHistory from '../../browser-history';


export const redirect: Middleware<unknown, State> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === MiddlewareAction.RedirectToRoute) {
          browserHistory.push(action.payload);
        }
        return next(action);
      };
