import { View } from "@tarojs/components"
import { AtCard } from "taro-ui"
import { IMAGE_URL } from "@/data/config"
import "./achieve.css"


export default function Achievement() {
    return (
        <View className="mine-achieve-view">
            <AtCard
                className="mine-achieve-card"
                title='成就'
                thumb={IMAGE_URL["achieve_icon"]}
            >
                <View>
                </View>

            </AtCard>
        </View>
    )
}
