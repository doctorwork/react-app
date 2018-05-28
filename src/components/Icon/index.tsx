/*
 * File: index.jsx
 * Author: insane (luojie@doctorwork.com)
 * Last: insane (luojie@doctorwork.com>)
 * Date: 2018-04-Mo 05:25:06
 * Copyright 2018 - 2018 © Doctorwork
 */
import React from 'react';
import classnames from 'classnames';
import './style';
// const { iconfont } = style;

interface IconProps {
    type: string;
    /**
     * class
     */
    className?: string;
}

const Icon = (props: IconProps) => {
    return (
        <i
            className={classnames(
                'iconfont',
                `icon-${props.type}`,
                props.className
            )}
        >
            {/* <svg aria-hidden="true" className="iconfontsvg">
                <use xlinkHref={'#icon-' + props.type} />
            </svg> */}
        </i>
    );
};

export const Sym = (props: IconProps) => {
    return (
        <span
            className={classnames(`sym-${props.type} sym`, props.className)}
        />
    );
};

export default Icon;
