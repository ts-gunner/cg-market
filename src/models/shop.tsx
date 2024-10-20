import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'

type ShopModelType = {
    searchValue: string
}
const initState:ShopModelType = {
    searchValue: ""
}

export const shopModel = createModel<RootModel>()({
    state: initState,
    reducers: {
        setSearchValue: (state: ShopModelType, payload: string) => {
            return {
                ...state,
                searchValue: payload
            }
        },
    },
    effects: (dispatch) => ({

    })
})