import asyncComponent from './async';
import getWebRoute from './web';
const Login = asyncComponent(() => import('../pages/Login'));

const routes = [
    {
        path: '/login',
        component: Login
    }
];

interface RouterProps {
    platform?: 'web' | 'native';
}

const Router = (props: RouterProps) => {
    return getWebRoute(routes);
};

export default Router;
