import Frame from "@/component/Frame"
import { View } from "@tarojs/components"
import SearchBox from "./search/SearchBox"
import Good from "./good/Good"
import { RootState, Dispatch } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import goodData from "./data"


export default function Shop() {
    const searchValue = useSelector((rootState: RootState) => rootState.shopModel.searchValue)
    const dispatch = useDispatch<Dispatch>()

    const searchGoods = () => {
        console.log("search...", searchValue)
    }
    return (
        <Frame>
            <SearchBox
                searchValue={searchValue}
                onChange={(val: string) => dispatch.shopModel.setSearchValue(val)}
                onActionClick={searchGoods}
            />
            <View>
                {goodData.map((item) => {
                    return <Good {...item} />
                })}
            </View>
        </Frame>
    )
}
