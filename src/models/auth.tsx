import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import { request, authorize } from '@tarojs/taro'
import { IMAGE_URL, load_mode } from "@/data/config";
import { routes } from "@/data/api";
import Taro from '@tarojs/taro'
import storage from "@/utils/storage";
type ProfileBase = {
    avatar: string,
    nickName: string
}

type AuthModelType = {
    isAuth: boolean,
    profile: ProfileBase
}
const initProfile: ProfileBase = {
    avatar: IMAGE_URL["not_auth"],
    nickName: ""
}
const initState: AuthModelType = {
    isAuth: false,
    profile: initProfile
}

export const authModel = createModel<RootModel>()({
    state: initState,
    reducers: {
        setAuthState: (state: AuthModelType, payload: boolean) => {
            return {
                ...state,
                isAuth: payload
            }
        },
        setAvator: (state: AuthModelType, payload: string) => {
            let newProfile: ProfileBase = {
                ...state.profile,
                avatar: payload
            }
            return {
                ...state,
                profile: newProfile
            }
        },
        setNickName: (state: AuthModelType, payload: string) => {
            let newProfile: ProfileBase = {
                ...state.profile,
                nickName: payload
            }
            return {
                ...state,
                profile: newProfile
            }
        },
        setInitProfile: (state: AuthModelType) => {
            return {
                ...state,
                profile: initProfile
            }
        },
    },
    effects: (dispatch) => ({
        login: (payload: string) => {
            if (load_mode === "online") {
                request({
                    method: "GET",
                    url: `${routes.login}?code=${payload}`,
                    success: (res) => {
                        console.log("login....", res)
                        let response = res.data
                        if (response.code === 200) {
                            storage.setItem("openid", response.data.openid)
                            storage.setItem("session_key", response.data.session_key)
                            dispatch.authModel.setAuthState(true)
                            // 用户授权
                            authorize({ scope: "scope.camera" })
                            authorize({ scope: "scope.userInfo" })
                            Taro.atMessage({
                                'message': '登录成功！！',
                                'type': "success",
                                "duration": 2000
                            })
                        } else {
                            Taro.atMessage({
                                'message': `登录失败: ${response.msg}`,
                                'type': "error",
                                "duration": 2000
                            })
                        }
                    },
                    fail: (res) => {
                        console.log("fail response: ", res)
                        Taro.atMessage({
                            'message': '登录失败！！',
                            'type': "error",
                            "duration": 2000
                        })
                    },
                })
            } else if (load_mode === "offline") {
                dispatch.authModel.setAuthState(true)
                storage.setItem("openid", "openid-" + payload)
                storage.setItem("session_key", "session_key-" + payload)
                // 用户授权
                authorize({ scope: "scope.camera" })
                authorize({ scope: "scope.userInfo" })
            }
        },
        logout: () => {
            storage.removeItem("openid")
            storage.removeItem("session_key")
            dispatch.authModel.setInitProfile()
            dispatch.authModel.setAuthState(false)
            Taro.atMessage({
                'message': '退出登录！！',
                'type': "success",
                "duration": 2000
            })
        },
        setupUserInfo: async () => {
            let openid = await storage.getItem("openid")
            request({
                url: `${routes.getUserProfile}?openid=${openid}`,
                success: (res) => {
                    let data:any = res.data
                    if (data.code === 200){
                        dispatch.authModel.setNickName(data.data["nickname"] || "")
                        dispatch.authModel.setAvator(data.data["avatar_url"] || IMAGE_URL["not_auth"])
                    }
                }
            })
        }

    })
})