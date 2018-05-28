/**
 * 异步加载组件，用于codesplit
 * @date 2017-9-6
 */

import React, { Component } from 'react';
import { getNavigationOptions, setHybridHeader } from '../components/Header';

export default loader => {
    return class Async extends Component {
        mounted = true;

        state = {
            component: null
        };

        componentDidMount() {
            loader()
                .then(({ default: component }) => {
                    if (!this.mounted) return;

                    this.setState({ component });

                    const opts = getNavigationOptions(
                        component.navigationOptions,
                        this.props
                    );
                    setHybridHeader(opts);
                })
                .catch(() => {
                    if (!this.mounted) return;
                });
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        render() {
            const C = this.state.component;
            return C ? <C {...this.props} /> : null;
        }
    };
};
