import { View, Image } from "@tarojs/components"
import { useRouter } from "@tarojs/taro"
import { IMAGE_URL } from "@/data/config"
import GameRule from "./game_rule/GameRule"
import ShopManage from "./shop_manage/ShopManage"
import "./index.css"

const CommonComponent = ({ pageKey }: { pageKey: string }) => {
    switch (pageKey) {
        case "game_rule":
            return <GameRule />
        case "shop_manage":
            return <ShopManage />
        default:
            return (
                <View  className="common-coming">
                    <Image src={IMAGE_URL["coming_soon"]}></Image>
                </View>
            )
    }
}
export default function CommonPage() {
    const router = useRouter()
    const pageKey = router.params.pageKey || ""
    return (
        <View><CommonComponent pageKey={pageKey}/></View>
    )
}
