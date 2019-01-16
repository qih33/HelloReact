import Types from '../../action/type';

const defaultState = {
    theme: 'blue'
};

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.LOAD_POPULAR_SUCCESS://下拉刷新成功
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    items:action.items,
                    projectModels: action.projectModels,
                    isLoading: false,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex
                }
            };
        case Types.POPULAR_REFRESH: {
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: true,
                    hideLoadingMore: true,
                }
            }
        };
        case Types.LOAD_POPULAR_FAIL:
            return {
                ...state,
                [action.storeName]: {
                    ...state[action.storeName],
                    isLoading: false,
                }
            };
            
        case Types.POPULAR_LOAD_MORE_SUCCESS://上拉加载更多成功
            return {
                ...state,//Object.assign @http://www.devio.org/2018/09/09/ES6-ES7-ES8-Feature/
                [action.storeName]: {
                    ...state[action.storeName],
                    projectModels: action.projectModels,
                    hideLoadingMore: false,
                    pageIndex: action.pageIndex,
                }
            };
        
        case Types.POPULAR_LOAD_MORE_FAIL://上拉加载更多失败
            return {
                ...state,//Object.assign @http://www.devio.org/2018/09/09/ES6-ES7-ES8-Feature/
                [action.storeName]: {
                    ...state[action.storeName],
                    hideLoadingMore: true,
                    pageIndex: action.pageIndex,
                }
            };

        default:
            return state;
    }
}

