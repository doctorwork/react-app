/*
 * File: connect.js
 * Author: insane (luojie@doctorwork.com)
 * Last: insane (luojie@doctorwork.com>) 
 * Date: 2018-05-Sa 11:50:47
 * Copyright 2018 - 2018 © Doctorwork
 */

import * as api from './index';
import hybrid from './hybrid';
import React from 'react';
import { back } from '../route/mixin';
import { withRouter } from 'react-router';
import { forwardFactory } from '../route/mixin';

const connect = (Component: any) => {
    function ConnectComponent(props: any): any {
        return (
            <Component
                {...{
                    api,
                    hybrid,
                    back,
                    forward: forwardFactory(props.history)
                }}
                {...props}
            />
        );
    }

    return withRouter(ConnectComponent);
};

export default connect;
