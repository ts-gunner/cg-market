import { View, Text } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import { AtMessage } from 'taro-ui'
import { CATEGORY } from '@/data/config'
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

  
  const createPage = (key: string) => {
    switch (key) {
      case "study":
        return <Study point={categoryObject.point}/>
      case "housework":
        return <Housework point={categoryObject.point}/>
      case "sport":
        return <Sport point={categoryObject.point}/>
      default:
        return <Other point={categoryObject.point}/>
    }
  }
  return (
    <View>
      <AtMessage />
      <Text className="task-title-head">{categoryTitle}</Text>
      <View>
        {createPage(category)}
      </View>
    </View>
  )
}
