import { View, Image } from "@tarojs/components"
import { useRouter } from "@tarojs/taro"
import CookBook from "./menu/CookBook"
import { IMAGE_URL } from "@/data/config"

const ToolComponent = ({toolKey}: {toolKey:string}) => {
    switch (toolKey) {
        case "cookbook":
            return <CookBook />
        default:
            return (
                <View>
                    <Image src={IMAGE_URL["coming_soon"]}></Image>
                </View>
            )
    }
    
}
export default function ToolPage() {
    const router = useRouter()
    const toolKey = router.params.toolKey || ""
    

    
    return (
        <View>
            <ToolComponent toolKey={toolKey}/>
        </View>
    )
}
