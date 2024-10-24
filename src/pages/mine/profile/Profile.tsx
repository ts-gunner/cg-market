import { View, Image, Text, Button } from '@tarojs/components';
import { theme } from '@/data/config';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, Dispatch } from '@/store';
import "./profile.css"
import { useEffect } from 'react';
export default function Profile() {
    const isAuth = useSelector((state: RootState) => state.authModel.isAuth)
    const profile = useSelector((state: RootState) => state.authModel.profile)
    const dispatch = useDispatch<Dispatch>()
    useEffect(() => {
        if (isAuth) {
            dispatch.authModel.setupUserInfo(null)
        }
    }, [isAuth])

    const changeAvatar = (event: any) => {
        const { avatarUrl } = event.detail
        dispatch.authModel.setAvator(avatarUrl)
    }
    return (

        <View className='mine-info-container' style={{ backgroundColor: theme.primary1 }}>
            {isAuth ? (
                <>
                    <View className='mine-info-grid-left' style={{ backgroundColor: theme.primary1 }}>
                        <Button openType='chooseAvatar' onChooseAvatar={changeAvatar} className='mine-info-auth-avatar'>
                            <Image src={profile.avatar} showMenuByLongpress className='mine-avator'></Image>
                        </Button>
                        <View>
                            <View>
                                <Text className='mine-name-text'>{profile.nickName}</Text>
                            </View>
                            <View>
                                <Text className="mine-role-text">角色：小马喽</Text>
                            </View>
                        </View>
                    </View>
                    <View className='mine-info-grid-right'>
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <Text className='mine-point-string-text'>我的积分</Text>
                        </View>
                        <Text className='mine-point-score-text'>995223</Text>
                    </View>
                </>
            ) : (
                <View className='mine-info-grid-left' style={{ backgroundColor: theme.primary1 }}>
                    <Button openType='chooseAvatar' onChooseAvatar={changeAvatar} className='mine-info-auth-avatar'>
                        <Image src={profile.avatar} mode='aspectFill' showMenuByLongpress className='mine-avator'></Image>
                    </Button>
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
