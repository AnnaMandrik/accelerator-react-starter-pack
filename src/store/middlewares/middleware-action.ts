import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../../const';
import { MiddlewareAction } from '../../types/middleware-action';


export const redirectToRoute = createAction(
  MiddlewareAction.RedirectToRoute,
  (url: AppRoute) => ({ payload: url }));
