import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import Taro from '@tarojs/taro'


type GlobalType = {
    isRefresh: boolean,
    pageLoading: boolean
}
const initState: GlobalType = {
    isRefresh: false,
    pageLoading: false
}

export const globalModel = createModel<RootModel>()({
    state: initState,
    reducers: {
        setIsRefresh: (state: GlobalType) => {
            Taro.atMessage({
                'message': "刷新成功！！",
                'type': "success",
                "duration": 2000
            })
            return {
                ...state,
                isRefresh: !state.isRefresh
            }
        },
        setPageLoading: (state: GlobalType, payload:boolean) => {
            return {
                ...state,
                pageLoading: payload
            }
        }
    },
    effects: (dispatch) => ({

    })
})