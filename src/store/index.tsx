import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { models, RootModel } from '@/models'
import persistPlugin from "@rematch/persist";
import { getStorageSync,setStorageSync,removeStorageSync } from '@tarojs/taro';
const storage = {  
    getItem: (key:string) => {  
      try {  
        return getStorageSync(key);  
      } catch (e) {  
        console.error(e);  
      }  
    },  
    setItem: (key:string, value:string) => {  
      try {  
        setStorageSync(key, value);  
      } catch (e) {  
        console.error(e);  
      }  
    },  
    removeItem: (key:string) => {  
      try {  
        removeStorageSync(key);  
      } catch (e) {  
        console.error(e);  
      }  
    },  
  };  
  
const persist_plugin = persistPlugin<RootModel, RootModel>({
    whitelist: [
    ],
    key: "store",
    storage,
  })

export const store = init({
    name:"global-redux-store",
	models,
    plugins:[persist_plugin]
})
 
export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>