import { View, Image, Text } from "@tarojs/components"
import { AtCard } from "taro-ui"
import { IMAGE_URL, ACHIEVEMENT_AVALIABLE_COUNT } from "@/data/config"
import "./achieve.css"

const achieveList = [
    {
        key: "1",
        label: "学习累计5天",
        icon: IMAGE_URL["study_badge"],
    },
    {
        key: "2",
        label: "家务累计5天",
        icon: IMAGE_URL["housework_badge"],
    },
    {
        key: "3",
        label: "运动累计5天",
        icon: IMAGE_URL["sport_badge"],
    },
    {
        key: "4",
        label: "学习累计10天",
        icon: IMAGE_URL["study_badge"],
    },
    {
        key: "5",
        label: "学习累计20天",
        icon: IMAGE_URL["study_badge"],
    },
    {
        key: "6",
        label: "学习累计30天",
        icon: IMAGE_URL["study_badge"],
    },
    {
        key: "7",
        label: "学习累计40天",
        icon: IMAGE_URL["study_badge"],
    },
    {
        key: "8",
        label: "学习累计50天",
        icon: IMAGE_URL["study_badge"],
    },
]

export default function Achievement() {
    return (
        <View className="mine-achieve-view">
            <AtCard
                className="mine-achieve-card"
                title='成就'
                thumb={IMAGE_URL["achieve_icon"]}
            >
                <View className="mine-achieve-box">
                    {
                        achieveList.slice(0, ACHIEVEMENT_AVALIABLE_COUNT).map((item) => {

                            return (
                                <View className="mine-achieve-box-item" key={item.key}>
                                    <View className="mine-achieve-item-container">
                                        <Image className="mine-achieve-item-img" src={item.icon} ></Image>
                                        <Text className="mine-achieve-item-text">{item.label}</Text>
                                    </View>

                                </View>
                            )
                        })
                    }
                    {
                        achieveList.length > ACHIEVEMENT_AVALIABLE_COUNT ? (
                            <View className="mine-achieve-omission">
                                <Image className="mine-achieve-omission-img" src={IMAGE_URL["omission"]}></Image>
                            </View>
                        ) : null
                    }
                </View>

            </AtCard>
        </View>
    )
}
