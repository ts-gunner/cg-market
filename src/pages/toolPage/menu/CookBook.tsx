import { View,Text } from "@tarojs/components"
import LeftComponent from "./LeftComponent"
import RightComponent from "./RightComponent"
import "./index.css"
export default function CookBook() {
    return (
        <View className="cook-book-box">
            <View className="cook-book-title-box">
                <Text className="cook-book-title">菜单</Text>
            </View>
            <View className="cook-book-container">
                <LeftComponent></LeftComponent>
                <RightComponent></RightComponent>
            </View>

        </View>
    )
}
