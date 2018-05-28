import React from 'react';
import { BrowserRouter, Route, RouteProps, Switch } from 'react-router-dom';
import NotFound from '../components/NotFound';
import { RouteWithSubRoutes } from './mixin';
import { platform } from '../utils';

const basename = process.env.PUBLIC_URL;

interface RouteFace {
    path: string;
    component: RouteProps['component'];
    [propName: string]: any;
}

const supportsHistory = 'pushState' in window.history;

const Router = (routers: Array<RouteFace>): any => (
    <BrowserRouter
        forceRefresh={!supportsHistory || platform.wechat}
        basename={basename}
    >
        <Switch>
            {routers.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
            <Route component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;
