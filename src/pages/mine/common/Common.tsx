import { View,Image,Text } from "@tarojs/components"
import { IMAGE_URL } from "@/data/config"
import "./common.css"

const Card = ({title, icon}: {title:string, icon:string}) => {
    return (
        <View className="mine-common-card2">
            <View>
                <Image src={icon} className="mine-common-card2-img"></Image>
            </View>
            <View>
                <Text className="mine-common-card2-text">{title}</Text>
            </View>
        </View>
    )
}

export default function Common() {
    return (
        <View className="mine-common-view">
            <View className="mine-common-card">
                <Card title="兑换记录" icon={IMAGE_URL["exchange_record_icon"]}></Card>
                <Card title="任务记录" icon={IMAGE_URL["task_record_icon"]}></Card>
                <Card title="兑换记录" icon={IMAGE_URL["exchange_record_icon"]}></Card>
                <Card title="兑换记录" icon={IMAGE_URL["exchange_record_icon"]}></Card>
            </View>

        </View>
    )
}
