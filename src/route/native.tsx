import React from 'react';
import { NativeRouter, Route } from 'react-router-native';

export const RouteWithSubRoutes = (route: any) => (
    <Route
        path={route.path}
        render={props => <route.component {...props} routes={route.routes} />}
    />
);

interface RouteFace {
    path: string;
    component: React.ComponentType<any>;
    [propName: string]: any;
}

const Router = (routers: Array<RouteFace>): any => (
    <NativeRouter>
        {routers.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
    </NativeRouter>
);

export default Router;
