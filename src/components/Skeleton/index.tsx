/**
 * @file Skeleton.tsx
 * @author lihuanji
 *
 * react 骨架渲染 占位图
 */
import React from 'react';
import styles from './style.module';

// 所有属性都非必传
type Props = {
    // 宽度
    width?: number;
    // 高度
    height?: number;
    // 宽度随机基数
    widthRandomness?: number;
    // 高度随机基数
    heightRandomness?: number;
    // 圆角值
    borderRadius?: string;
    // 颜色
    color?: string;
    // 几列 循环多次
    count?: number;
    // 是否启用动画
    animated?: boolean;
};

const Skeleton: React.StatelessComponent<Props> = props => {
    const {
        borderRadius,
        color,
        width,
        height,
        count = 0,
        widthRandomness = 0,
        heightRandomness = 0
    } = props;
    const elements = [];

    for (let i = 0; i < count; i++) {
        let setWidth = '100%';
        let setHeight = '100%';
        if (width) {
            setWidth = rem(width - Math.random() * width * widthRandomness);
        }
        if (height) {
            setHeight = rem(height - Math.random() * height * heightRandomness);
        }
        elements.push(
            <span
                className={`${styles.Skeleton} ${
                    props.animated ? styles.animated : ''
                }`}
                key={i}
                style={{
                    width: setWidth,
                    height: setHeight,
                    borderRadius,
                    backgroundColor: color
                }}
            >
                &zwnj;
            </span>
        );
        if (i !== count - 1) {
            elements.push(<br />);
        }
    }

    return <React.Fragment>{elements}</React.Fragment>;
};

Skeleton.defaultProps = {
    widthRandomness: 0,
    heightRandomness: 0,
    borderRadius: '8PX',
    color: '#EFF1F6',
    count: 1,
    animated: true
};

export default Skeleton;
