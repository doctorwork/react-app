/**
 * @file ListView.jsx
 * @author lihuanji
 *
 * list列表
 *
 * 1. 支持下拉刷新
 * 2. 支持瀑布流加载
 *
 */

import React, { PureComponent } from 'react';
import Jroll from 'jroll';
import Empty from '../Empty';
import './style';

class ListView extends PureComponent<ListViewProps, ListViewState> {
    static defaultProps = {
        hasMore: false
    };

    page = 1;

    pullDownTips = {
        // 下拉状态
        0: '下拉发起刷新',
        1: '继续下拉刷新',
        2: '松手即可刷新',
        3: '正在刷新',
        4: '刷新成功'
    };

    pullUpTips = {
        // 上拉状态
        0: '上拉加载更多',
        1: '松手即可加载',
        2: '正在加载',
        3: '加载成功'
    };

    // 是否正在触发touch事件
    isTouching = false;

    // 定时器
    timer: any = undefined;

    // 滑动实例
    scrollInstance: any = undefined;

    // 下拉刷新高度
    pullDownHeight = 0;

    // 是否重新刷新 计算高度
    isRefresh = false;

    // scroll 容器
    scrollWap: any = undefined;

    // 下拉容器
    PullDown: any = undefined;

    // 上拉容器
    PullUp: any = undefined;

    constructor(props: ListViewProps) {
        super(props);

        this.state = {
            pullDownStatus: 0,
            pullUpStatus: 2
        };

        this.onScroll = this.onScroll.bind(this);
        this.onScrollEnd = this.onScrollEnd.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
    }

    componentDidMount() {
        this.scrollInstance = new Jroll(this.scrollWap);
        this.scrollInstance.on('scroll', this.onScroll);
        this.scrollInstance.on('scrollEnd', this.onScrollEnd);

        this.pullDownHeight = 25;

        this.scrollInstance.minScrollY = this.pullDownHeight;

        this.props.onEndReached(this.page);
    }

    /**
     * 用于清空当前数据
     */
    clearCache() {
        this.page = 1;
        this.props.onEndReached(this.page);
        this.scrollInstance.scrollTo(0, 0, 0);
    }

    onItemClick(e: React.MouseEvent<any>) {
        const { data, onClick } = this.props;
        const key = e.currentTarget.getAttribute('data-key');
        onClick && onClick(data[key], key);
    }

    onTouchStart() {
        this.isTouching = true;
    }

    onTouchEnd() {
        this.isTouching = false;
    }

    onPullDown() {
        if (!this.isTouching) return;

        if (this.scrollInstance.y > this.pullDownHeight) {
            this.state.pullDownStatus != 2 &&
                this.setState({ pullDownStatus: 2 });
        } else {
            this.state.pullDownStatus != 1 &&
                this.setState({ pullDownStatus: 1 });
        }
    }

    onPullUp() {
        if (!this.isTouching) return;

        if (this.scrollInstance.y <= this.scrollInstance.maxScrollY - 5) {
            this.state.pullUpStatus != 1 && this.setState({ pullUpStatus: 1 });
        } else {
            this.state.pullUpStatus != 0 && this.setState({ pullUpStatus: 0 });
        }
    }

    onScroll() {
        // 上拉区域
        if (
            this.props.onRefresh &&
            this.scrollInstance.y > -1 * this.pullDownHeight
        ) {
            this.onPullDown();
        } else {
            // this.state.pullDownStatus != 0 &&
            //     this.setState({ pullDownStatus: 0 });
        }

        // 下拉区域
        if (
            this.props.hasMore &&
            this.scrollInstance.y <= this.scrollInstance.maxScrollY + 5
        ) {
            this.onPullUp();
        }
    }

    onScrollEnd() {
        if (this.props.onRefresh) {
            // 滑动结束后，停在刷新区域
            if (this.scrollInstance.y > -1 * this.pullDownHeight) {
                if (this.state.pullDownStatus <= 1) {
                    // 没有发起刷新,弹回去
                    this.scrollInstance.scrollTo(0, 0, 200);
                } else if (this.state.pullDownStatus == 2) {
                    // 发起了刷新,更新状态
                    this.scrollInstance.scrollTo(
                        0,
                        this.pullDownHeight,
                        0,
                        true,
                        this.props.onRefresh
                    );
                    this.setState({ pullDownStatus: 3 });
                }
            }
        }

        // 滑动结束后，停在加载区域
        if (this.scrollInstance.y <= this.scrollInstance.maxScrollY) {
            if (this.state.pullUpStatus == 1) {
                // 发起了加载，更新状态
                this.setState({ pullUpStatus: 2 });
                this.props.onEndReached(++this.page);
            }
        }
    }

    componentWillReceiveProps() {
        if (this.state.pullUpStatus !== 0) {
            this.setState({
                pullUpStatus: 0
            });
            this.isRefresh = true;
        }

        if (this.state.pullDownStatus === 3) {
            this.isRefresh = true;
            this.setState({
                pullDownStatus: 4
            });

            this.timer = setTimeout(() => {
                this.setState({
                    pullDownStatus: 0
                });
                this.scrollInstance.scrollTo(0, 0, 200);
            }, 500);
        }
    }

    componentDidUpdate() {
        // 重新计算高度
        if (this.isRefresh) {
            this.isRefresh = false;
            this.scrollInstance.refresh();
            this.props.onRefresh &&
                (this.scrollInstance.minScrollY = this.pullDownHeight);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        const {
            renderItem,
            data,
            hasMore,
            onRefresh,
            height,
            noDataText = '没有数据',
            clsName
        } = this.props;
        const { pullUpStatus } = this.state;

        // 外层容器要固定高度，才能使用滚动条
        return (
            <div
                className={`ListView ${clsName}`}
                style={{
                    height
                }}
                ref={ref => (this.scrollWap = ref)}
                onTouchStart={this.onTouchStart}
                onTouchEnd={this.onTouchEnd}
            >
                <ul>
                    {onRefresh && (
                        <p
                            className="ListView-PullDown"
                            ref={ref => (this.PullDown = ref)}
                        >
                            {this.pullDownTips[this.state.pullDownStatus]}
                        </p>
                    )}
                    {pullUpStatus === 0 && data.length === 0 ? (
                        <Empty.List text={noDataText} />
                    ) : (
                        data.map((item, key) => (
                            <li
                                key={key}
                                data-key={key}
                                onClick={this.onItemClick}
                            >
                                {renderItem(item, key)}
                            </li>
                        ))
                    )}
                    {hasMore && (
                        <p
                            className="ListView-PullUp"
                            ref={ref => (this.PullUp = ref)}
                        >
                            {this.pullUpTips[this.state.pullUpStatus]}
                        </p>
                    )}
                </ul>
            </div>
        );
    }
}

export default ListView;
