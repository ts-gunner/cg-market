import { View, Text, Button, Input, Image, Form } from "@tarojs/components"
import { useSelector,useDispatch } from "react-redux"
import { RootState, Dispatch } from "@/store"
import { uploadFile,navigateBack } from "@tarojs/taro"
import { routes } from "@/data/api"
import storage from "@/utils/storage"
import { IMAGE_URL } from "@/data/config"
import Taro from '@tarojs/taro'
import { useState } from "react"
import { AtMessage } from 'taro-ui'
import "./index.css"

export default function UserProfilePage() {
    const profile = useSelector((state: RootState) => state.authModel.profile)
    const [avatarURL, setAvatarURL] = useState(IMAGE_URL["not_auth"])
    const dispatch = useDispatch<Dispatch>()
    const changeAvatar = (event: any) => {
        const { avatarUrl } = event.detail
        setAvatarURL(avatarUrl)
    }

    const saveProfile = async (event:any) => {
        if (avatarURL === IMAGE_URL["not_auth"]){
            Taro.atMessage({
                'message': '请选择头像',
                'type': "error",
                "duration": 2000
            })
            return 
        }
        uploadFile({
            url: routes.saveProfile,
            filePath: avatarURL,
            name: "avatar_blob",
            formData: {
                openid: await storage.getItem("openid"),
                nickname: event.detail.value.nickname
            },
            success: (res) => {
                let data:any = JSON.parse(res.data)
                if (data.code === 200){
                    dispatch.authModel.setNickName(data.data["nickname"])
                    dispatch.authModel.setAvator(data.data["avatar_url"])
                    navigateBack()
                }
            }
        })
    }
    return (
        <Form onSubmit={saveProfile}>
            <AtMessage />
            <View className="user-profile-container">
                <View>
                    <View className="user-profile-item user-item-border-top user-item-border-bottom">
                        <View>
                            <Text className="user-profile-item-text">用户头像</Text>
                        </View>
                        <View>
                            <Button className="user-profile-item-img-btn" openType="chooseAvatar" onChooseAvatar={changeAvatar}>
                                <Image src={avatarURL} mode='aspectFill' className="user-profile-item-img"></Image>
                            </Button>
                        </View>

                    </View>
                    <View className="user-profile-item user-item-border-bottom">
                        <View>
                            <Text className="user-profile-item-text">用户昵称</Text>
                        </View>
                        <View>
                            <Input name="nickname" type="nickname" className="user-profile-item-input" value={profile.nickName}/>
                        </View>
                    </View>
                </View>

                <View className="user-profile-save">
                    <Button formType="submit">保存</Button>
                </View>

            </View>

        </Form>
    )
}
