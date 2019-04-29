import { NavigationActions } from 'react-navigation';
import type { NavigationParams, NavigationRoute } from 'react-navigation';
import { find } from 'lodash'
let _container; // eslint-disable-line
let _initialized;
export const  setContainer = (container: Object) => {
  _container = container;
  _initialized = true;
}

export const getContainer = () => _container
export const reset = (routeName: string, params?: NavigationParams) => {
  _container.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  );
}
export const navigate = (routeName: string, params?: NavigationParams) => {
  _container.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

export const navigateDeep = (actions: { routeName: string, params?: NavigationParams }[])  => {
  _container.dispatch(
    actions.reduceRight(
      (prevAction, action): any =>
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName: action.routeName,
          params: action.params,
          action: prevAction,
        }),
      undefined,
    ),
  );
}

export const getCurrentRoute = () => {
  if (!_container || !_container.state.nav) {
    _initialized = false;
    return null;
  }
  _initialized = true;
  return _container.state.nav.routes[_container.state.nav.index] || null;
}
export const getPreviousRoute = () => {
  if (!_container || !_container.state.nav || _container.state.nav.index < 0) {
    return null;
  }
  return _container.state.nav.routes[_container.state.nav.index - 1] || null;

}
export const getParam = name => {
  if (_initialized) {
    const { routeName, routes } = getCurrentRoute();

    const route =  find(routes, route => {
      if (route.routeName == routeName && route.params) {
        return route.params[name];
      }
    })
    if (route) {
      return route.params[name]
    }
  }

  return null;
}

