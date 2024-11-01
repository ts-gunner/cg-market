import { View, Image,Text } from "@tarojs/components"
import { IMAGE_URL } from "@/data/config"
import { AtCard } from "taro-ui"
import "./index.css"
const boxList = [
    {
        key: "chatbot",
        label: "AI聊天",
        icon: IMAGE_URL["AI_brain"]
    },
    {
        key: "calculator",
        label: "计算器",
        icon: IMAGE_URL["calculator"]
    },
    {
        key: "translation",
        label: "翻译",
        icon: IMAGE_URL["translation"]
    },
    {
        key: "calculator2",
        label: "计算器",
        icon: IMAGE_URL["calculator"]
    },
    {
        key: "clearCache",
        label: "清理缓存",
        icon: IMAGE_URL["calculator"]
    }
]
export default function ToolBox() {
    return (
        <View>
            <AtCard
                className="toolbox-common-tool"
                title='常用工具'
                thumb={IMAGE_URL["common_tool"]}
            >
                <View className="toolbox-container">
                    {
                        boxList.map((item) => {
                            return (
                                <View className="toolbox-tool-item" key={item.key}>
                                    <View className="toolbox-tool-item-box">
                                        <Image className="toolbox-tool-item-img" src={item.icon}></Image>
                                        <Text className="toolbox-tool-item-text">{item.label}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>


            </AtCard>
        </View>
    )
}
