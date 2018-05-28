/*
 * File: App.tsx
 * Author: insane (luojie@doctorwork.com)
 * Last: insane (luojie@doctorwork.com>) 
 * Date: 2018-04-Sa 10:31:11
 * Copyright 2018 - 2018 © Doctorwork
 */
import React, { Component } from 'react';

import Router from './route';
import './styles/main';
export interface ProviderContext {
    actions: Object;
}

import hybrid from './api/hybrid';

class App extends Component {
    componentWillMount() {
        hybrid('loading', { name: 'end' });
    }

    render(): Object {
        return <Router platform="web" />;
    }
}

export default App;
