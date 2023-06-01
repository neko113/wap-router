import type { RouteConfig, RouteObject } from '../types';

const ROUTE_PARAMETER_REGEXP = /:(\w+)/g; // ":"로 시작하는 문자열을 의미
const URL_REGEXP = '([^\\/]+)'; // URL에서 "/"를 제외한 문자열을 의미

const parseUrlRoutes = (routeObjects: RouteObject[]): RouteConfig[] => {
  const routes: RouteConfig[] = [];
  routeObjects.forEach((route) => {
    const params: string[] = [];
    const parsedFragment = route.path
      // ":"로 시작하는 문자열을 찾아서 params에 저장하고, URL_REGEXP로 치환
      .replace(ROUTE_PARAMETER_REGEXP, (_match, paramName) => {
        params.push(paramName);
        return URL_REGEXP;
      })
      // 정규식으로 사용하기 위해 "/"를 "\/"로 치환
      .replace(/\//g, '\\/');

    routes.push({
      // 정규식으로 사용하기 위해 "^"와 "$"를 추가
      fragmentRegExp: new RegExp(`^${parsedFragment}$`),
      element: route.element,
      params,
    });
  });

  return routes;
};

export default parseUrlRoutes;
