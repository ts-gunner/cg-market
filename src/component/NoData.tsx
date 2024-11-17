import { View, Image, Text } from "@tarojs/components"
import { IMAGE_URL } from "@/data/config"
export default function NoData() {
    return (
        <View style={{
            display: "flex",
            height: "90vh",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "2rem"
        }}>

            <Image src={IMAGE_URL["un-login"]}></Image>
            <Text>没有数据</Text>
        </View>
    )
}
