import React from 'react';
import styles from './style.module.styl';

const errorImage = require('./imgs/empty@2x.png');

interface ComponentProps {
    text: string;
}

const Template = type => {
    function Component(props: ComponentProps) {
        return (
            <div className={styles.wrapper}>
                <section>
                    <p className={styles.img_container}>
                        <img src={type} alt="" className={styles.img} />
                    </p>
                    <p className={styles.text}>{props.text}</p>
                </section>
            </div>
        );
    }
    return Component;
};

const Error = Template(errorImage);
const List = Template(errorImage);

export default {
    Error,
    List
};
