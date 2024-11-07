import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import { request } from "@tarojs/taro";
import { routes } from "@/data/api";
import storage from "@/utils/storage";
type ShopModelType = {
    searchValue: string,
    total_points: number,
}
const initState: ShopModelType = {
    searchValue: "",
    total_points: -1
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
        setTotalPoints: (state: ShopModelType, payload: number) => {
            return {
                ...state,
                total_points: payload
            }
        },
    },
    effects: (dispatch) => ({
        get_user_balances: async () => {
            request({
                url: routes.getShopProfile + `?user_id=${await storage.getItem("openid")}`,
                header: {
                    "Auth-Token": await storage.getItem("token")
                },
                success: (res) => {
                    let response = res.data
                    if (response.code === 200) {
                        let data = response.data
                        dispatch.shopModel.setTotalPoints(data["total_points"])
                    }
                }
            })
        }
    })
})