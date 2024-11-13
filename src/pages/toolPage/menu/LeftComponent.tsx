import { View, Text } from "@tarojs/components"
import { useState } from "react"


const cookType = [
    {
        key: "seafood",
        label: "海鲜类"
    },
    {
        key: "vegetable",
        label: "蔬菜类"
    },
    {
        key: "coldDish",
        label: "凉拌类"
    },
]
export default function LeftComponent() {
    const [activeKey, setActiveKey] = useState("")
    const chooseCookType = (key: string) => {
        setActiveKey(key)
    }
    return (
        <View className="cook-book-left-container">
            {
                cookType.map((item) => {
                    return (
                        <View
                            className={activeKey == item.key ? "cook-book-type-item cook-book-type-item-active" : "cook-book-type-item"}
                            key={item.key}
                            onClick={() => chooseCookType(item.key)}
                        >
                            <Text>{item.label}</Text>
                        </View>
                    )
                })
            }
        </View>
    )
}
