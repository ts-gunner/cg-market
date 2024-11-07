import { View, Image, Text } from '@tarojs/components';
import { theme } from '@/data/config';
import { navigateTo } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@/store';
import { AtTag } from 'taro-ui'
import "./profile.css"
import { useEffect } from 'react';
export default function Profile() {
    const isAuth = useSelector((state: RootState) => state.authModel.isAuth)
    const isRefresh = useSelector((state: RootState) => state.globalModel.isRefresh)
    const profile = useSelector((state: RootState) => state.authModel.profile)
    const roles = useSelector((state: RootState) => state.authModel.roles || [])
    const total_points = useSelector((state: RootState) => state.shopModel.total_points)
    const dispatch = useDispatch<Dispatch>()
    useEffect(() => {
        if (isAuth) {
            dispatch.authModel.setupUserInfo()
            dispatch.shopModel.get_user_balances()
        }
    }, [isAuth, isRefresh])
    const changeUserProfile = () => navigateTo({ url: "/pages/userPage/index" })
    return (

        <View className='mine-info-container' style={{ backgroundColor: theme.primary1 }}>

            {isAuth ? (
                <>
                    <View className='mine-info-grid-left' style={{ backgroundColor: theme.primary1 }}>
                        <View onClick={changeUserProfile}>
                            <Image src={profile.avatar} mode='aspectFill' showMenuByLongpress className='mine-avator'></Image>
                        </View>
                        <View>
                            <View>
                                <Text className='mine-name-text'>昵称：{profile.nickName}</Text>
                            </View>
                            <View className='mine-role-container'>
                                <Text className="mine-role-text">角色：</Text>
                                {
                                    roles.length > 0 ? (
                                        <View className='mine-role-tag'>
                                            {
                                                roles.map((item) => {
                                                    return <AtTag
                                                        key={item.role_id}
                                                        type='primary'
                                                        size="small"
                                                        circle >{item.role_name}</AtTag>
                                                })
                                            }

                                        </View>
                                    ) : <AtTag
                                        type='primary'
                                        size='small'
                                        circle >未知</AtTag>
                                }
                            </View>
                        </View>
                    </View>
                    <View className='mine-info-grid-right'>
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Text className='mine-point-string-text'>我的积分</Text>
                        </View>
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Text className='mine-point-score-text'>{total_points}</Text>
                        </View>
                    </View>
                </>
            ) : (
                <View className='mine-info-grid-left' style={{ backgroundColor: theme.primary1 }}>
                    <View>
                        <Image src={profile.avatar} mode='aspectFill' showMenuByLongpress className='mine-avator'></Image>
                    </View>
                    <View>
                        <View>
                            <Text className='mine-name-text'>未登录</Text>
                        </View>
                        <View>
                            <Text className="mine-role-text">角色：-</Text>
                        </View>
                    </View>
                </View>
            )}



        </View>
    )
}
