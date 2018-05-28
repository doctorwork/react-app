import React, { Component, ReactNode } from 'react';
import Empty from '../Empty';

const logErrorToMyService = () => {};

interface SceneProps {
    renderChild(showError: Function): ReactNode;
}

class Scene extends Component<SceneProps> {
    constructor(props: SceneProps) {
        super(props);
        this.state = { hasError: false, message: '' };
    }

    componentDidCatch(message, info) {
        // Display fallback UI
        this.setState({ hasError: true, message });
        // You can also log the error to an error reporting service
        logErrorToMyService(message, info);
    }

    showError(message, type) {
        this.setState({ message, type, hasError: true });
    }

    render() {
        if (this.state.hasError) {
            let { message } = this.state;
            // You can render any custom fallback UI
            return <Empty.List text={message} />;
        }

        const renderChild = this.props.renderChild;
        return (
            <React.Fragment>
                {this.props.renderHeader()}
                {renderChild(this.showError.bind(this))}
            </React.Fragment>
        );
    }
}

export default Scene;
