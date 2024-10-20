import { View } from "@tarojs/components"
import { AtSearchBar } from 'taro-ui'
import "./index.css"

interface SearchBoxType {
    searchValue: string,
    onChange: (value:string, event:Object) => void,
    onActionClick: (event:Object) => void,
}

export default function SearchBox({ searchValue, onChange, onActionClick }: SearchBoxType) {
    return (
        <View className="shop-search-container">
            <AtSearchBar
            className="shop-search-bar"
                value={searchValue}
                onChange={onChange}
                onActionClick={onActionClick}
                fixed
                // showActionButton
            />
        </View>
    )
}
