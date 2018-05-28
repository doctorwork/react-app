import React, { Component } from 'react';
import styles from './style.module.styl';

class Login extends Component<any> {
    render() {
        const user = {
            type: 'login'
        };
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <h4>{this.props.title || '登录'}</h4>
                    <p>
                        <input
                            type="text"
                            placeholder="输入手机号码"
                            onChange={evt => {
                                user.phone = evt.target.value;
                            }}
                            style={styles.input}
                        />
                    </p>

                    <p>
                        <input
                            type="text"
                            placeholder="短信验证码"
                            onChange={evt => {
                                user.captcha = evt.target.value;
                            }}
                            style={styles.input}
                        />
                        <button
                            onClick={() => {
                                this.props.global.api.get(
                                    '/user/get_captcha',
                                    user
                                );
                            }}
                            className={styles.sms}
                        >
                            获取验证码
                        </button>
                    </p>

                    <button
                        type="submit"
                        onClick={() => {
                            this.props.global.api.post(
                                '/user/login_phone',
                                user
                            );
                        }}
                        className={styles.login}
                    >
                        登录
                    </button>
                </div>
            </div>
        );
    }
}

export default Login;
