export default function changeRouteAction(route) {
  return {
    type: 'SET_ROUTE',
    payload: route,
  };
}
