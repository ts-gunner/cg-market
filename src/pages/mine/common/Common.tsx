import { View,Image,Text } from "@tarojs/components"
import { IMAGE_URL, COMMON_ROUTER } from "@/data/config"
import { navigateTo } from "@tarojs/taro"
import "./common.css"

const Card = ({title, icon, onClick}: {title:string, icon:string, onClick?:()=>void}) => {
    return (
        <View className="mine-common-card2" onClick={onClick}>
            <View>
                <Image src={icon} className="mine-common-card2-img"></Image>
            </View>
            <View>
                <Text className="mine-common-card2-text">{title}</Text>
            </View>
        </View>
    )
}
const goto_manage_page = (key:string) => {
    navigateTo({url: `/pages/commonPage/index?pageKey=${key}`})
}
export default function Common() {
    return (
        <View className="mine-common-view">
            <View className="mine-common-card">
                {
                    COMMON_ROUTER.map((item) => {
                        return <Card 
                        key={item.key}
                        title={item.label} icon={item.icon} onClick={()=> goto_manage_page(item.key)}></Card>
                    })
                }
            </View>

        </View>
    )
}
