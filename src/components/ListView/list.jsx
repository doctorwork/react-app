import React, { PureComponent } from 'react';
import { ListView } from 'antd-mobile';

const texts = {
    loading: '加载中',
    loaded: ''
};

class List extends PureComponent<any> {
    page = 1;

    constructor(props) {
        super(props);

        const datasource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            pullDownStatus: 0,
            pullUpStatus: 2,
            datasource
        };
    }

    componentDidMount() {
        this.props.onEndReached(this.page);
    }

    loadMore() {
        if (!this.props.hasMore) {
            return;
        }
        this.props.onEndReached(++this.page);
    }

    render() {
        let data = this.state.datasource.cloneWithRows(this.props.data);

        return (
            <ListView
                ref={el => (this.lv = el)}
                dataSource={data}
                renderFooter={() => (
                    <div style={{ padding: 10, textAlign: 'center' }}>
                        {this.state.isLoading ? texts.loading : texts.loaded}
                    </div>
                )}
                onClick={this.props.onClick}
                renderRow={this.props.renderItem}
                className="am-list"
                useBodyScroll
                scrollRenderAheadDistance={500}
                onEndReached={this.loadMore.bind(this)}
                onEndReachedThreshold={10}
            />
        );
    }
}

export default List;
