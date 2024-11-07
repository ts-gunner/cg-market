import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import Taro from '@tarojs/taro'


type GlobalType = {
    isRefresh: boolean
}
const initState: GlobalType = {
    isRefresh: false
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
        }
    },
    effects: (dispatch) => ({

    })
})