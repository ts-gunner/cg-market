import { View,Image, Text } from "@tarojs/components"
import { IMAGE_URL } from "@/data/config"
import "./unlogin.css"

export default function UnLogin() {
  return (
    <View className="un-login-container">
        
        <Image src={IMAGE_URL["un-login"]}></Image>
        <Text>你还未登录！！</Text>
        <View className="login-btn">立即登录</View>
    </View>
  )
}
