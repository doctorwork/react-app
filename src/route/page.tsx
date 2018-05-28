import { Switch } from 'react-router';
import React from 'react';
import { RouteWithSubRoutes } from './mixin';

export default function Page(route: any): any {
    return (
        <Switch>
            {route.routes.map((route: any, i: number) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    );
}
