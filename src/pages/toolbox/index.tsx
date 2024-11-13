import { View, Image,Text } from "@tarojs/components"
import { IMAGE_URL } from "@/data/config"
import { AtCard } from "taro-ui"
import { navigateTo } from "@tarojs/taro"
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
        key: "cookbook",
        label: "食谱",
        icon: IMAGE_URL["cookbook"]
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

const enterToolBoxPage = (key:string) => {
    navigateTo({url: `/pages/toolPage/index?toolKey=${key}`})
}
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
                                    <View className="toolbox-tool-item-box" onClick={()=>enterToolBoxPage(item.key)}>
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
