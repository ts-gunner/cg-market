import { View, Text } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import { AtMessage,AtToast } from 'taro-ui'
import { CATEGORY } from '@/data/config'
import { RootState } from '@/store'
import { useSelector } from 'react-redux'
import Study from './Study'
import Housework from './Housework'
import Sport from './Sport'
import Other from './Other'
import "./index.css"
export default function TaskDetail() {
  const router = useRouter()
  const category = router.params.category || ""
  const categoryObject = CATEGORY[CATEGORY.findIndex(item => item.key === category)]
  const categoryTitle = categoryObject.label
  const pageLoading = useSelector((state:RootState) => state.globalModel.pageLoading)
  
  const createPage = (key: string) => {
    switch (key) {
      case "study":
        return <Study/>
      case "housework":
        return <Housework/>
      case "sport":
        return <Sport/>
      default:
        return <Other/>
    }
  }
  return (
    <View>
      <AtMessage />
      <AtToast status="loading" isOpened={pageLoading} text='加载中...' duration={0}></AtToast>
      <Text className="task-title-head">{categoryTitle}</Text>
      <View>
        {createPage(category)}
      </View>
    </View>
  )
}
