import { View, Image,Text } from "@tarojs/components"
import { AtCard,AtProgress } from "taro-ui"
import { IMAGE_URL } from "@/data/config"
import "./progress.css"

const ListItem = ({ title, icon, color, current, total }: {
    title: string,
    icon: string,
    color: string,
    current: number,
    total: number
}) => {
    const percent = Math.floor((current / total) * 100)
    return (
        <View className="progress-list-item">
            <View className="progress-list-item-left">
                <Image src={icon} className="progress-list-item-left-image"></Image>
                <Text className="progress-list-item-left-text">{title}</Text>
            </View>
            <View className="progress-list-item-center">
                <AtProgress className="progress-list-item-center-progress" percent={percent} color={color} isHidePercent />
            </View>
            <View className="progress-list-item-right">
                <Text className="progress-list-item-right-text">{current}/{total}</Text>
            </View>
        </View>
    )
}

export default function Progress() {
    return (
        <View className="mine-progress-view">
            <AtCard
                className="mine-progress-card"
                title='进度'
                thumb={IMAGE_URL["achieve_icon"]}
            >
                <View>
                    <ListItem
                        title='学习'
                        icon={IMAGE_URL["study_icon"]}
                        color="#71C7E2"
                        current={70}
                        total={160}
                    />
                    <ListItem
                        title='家务'
                        icon={IMAGE_URL["housework_icon"]}
                        color="#F19195"
                        current={95}
                        total={100}
                    />
                    <ListItem
                        title='运动'
                        icon={IMAGE_URL["sport_icon"]}
                        color="#FADE7D"
                        current={20}
                        total={100}
                    />
                </View>

            </AtCard>
        </View>
    )
}
