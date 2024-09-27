import { View,Text } from '@tarojs/components'
import { useRouter } from '@tarojs/taro'
import { CATEGORY } from '@/data/config'
import Study from './Study'
import Housework from './Housework'
import Sport from './Sport'
import Other from './Other'
import "./index.css"
export default function TaskDetail() {
  const router = useRouter()
  const category = router.params.category || ""
  const categoryTitle = CATEGORY[CATEGORY.findIndex(item => item.key === category)].label

  const createPage = (key:string) => {
    switch (key){
      case "study":
        return <Study />
      case "housework":
        return <Housework />
      case "sport":
        return <Sport />
      default:
        return <Other/>
    }
  }
  return (
    <View>
      <Text className="task-title-head">{categoryTitle}</Text>
      <View>
        {createPage(category)}
      </View>
      </View>
  )
}
