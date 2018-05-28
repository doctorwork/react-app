interface ListViewProps {
    /**
     * 列表高度
     */
    height: number;
    /**
     * 渲染单个item
     */
    renderItem: (item: any, key: number) => React.ReactNode;
    /**
     * 滑动到底部加载数据，默认触发一次
     */
    onEndReached: (page: number) => void;
    /**
     * 需要渲染的数据
     */
    data: Array<any>;
    /**
     * 是否还有更多数据
     *
     * 默认 false
     */
    hasMore?: boolean;
    /**
     * 下拉刷新函数，如果不传则代表不启用下拉刷新
     */
    onRefresh?: Function;
    /**
     * 没有数据时显示文字
     */
    noDataText?: string;
    /**
     * className
     */
    clsName?: string;
    /**
     * 点击事件
     */
    onClick?: (item: object | Array<any>, index: number) => any;
}

interface ListViewState {
    pullDownStatus: number;
    pullUpStatus: number;
}

interface ListView {
    ref: Function;
    dataSoure: Object;
}
