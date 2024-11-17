import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'
import { request, authorize } from '@tarojs/taro'
import { IMAGE_URL } from "@/data/config";
import { routes } from "@/data/api";
import Taro from '@tarojs/taro'
import storage from "@/utils/storage";
type ProfileBase = {
    avatar: string,
    nickName: string
}
type RoleBase = {
    role_id: string,
    role_name: string,
}
type AuthModelType = {
    isAuth: boolean,
    profile: ProfileBase,
    roles: RoleBase[],
    loading: boolean,
}
const initProfile: ProfileBase = {
    avatar: IMAGE_URL["not_auth"],
    nickName: ""
}
const initState: AuthModelType = {
    isAuth: false,
    profile: initProfile,
    roles: [],
    loading: false,
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
        setRoles: (state: AuthModelType, payload: RoleBase[]) => {
            return {
                ...state,
                roles: payload
            }
        },
        setLoading: (state: AuthModelType, payload: boolean) => {
            return {
                ...state,
                loading: payload
            }
        }
    },
    effects: (dispatch) => ({
        login: (payload: string) => {
            dispatch.authModel.setLoading(true)
            request({
                method: "GET",
                url: `${routes.login}?code=${payload}`,
                success: (res) => {
                    console.log("login....", res)
                    dispatch.authModel.setLoading(false)
                    let response = res.data
                    if (response.code === 200) {
                        storage.setItem("openid", response.data.openid)
                        storage.setItem("session_key", response.data.session_key)
                        storage.setItem("token", response.data.token)
                        storage.setItem("roles", response.data.roles.map((item:any) => item.role_id))
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
                header: {
                    "Auth-Token": await storage.getItem("token")
                },
                success: (res) => {
                    let data: any = res.data
                    console.log(data)
                    let profile = data.data["profile"]
                    console.log("profile", profile)
                    let roles = data.data["roles"]
                    dispatch.authModel.setRoles(roles)
                    if (data.code === 200) {
                        dispatch.authModel.setNickName(profile["nickname"] || "")
                        dispatch.authModel.setAvator(profile["avatar_url"] || IMAGE_URL["not_auth"])
                    }
                },
                fail: () => {
                    Taro.atMessage({
                        'message': '网络异常',
                        'type': "error",
                        "duration": 2000
                    })
                }
            })
        }

    })
})