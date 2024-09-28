import { init, RematchDispatch, RematchRootState } from '@rematch/core'
import { models, RootModel } from '@/models'
import persistPlugin from "@rematch/persist";
import { getStorageSync,setStorageSync,removeStorageSync } from '@tarojs/taro';
const storage = {  
    getItem: async (key:string) => {  
      try {  
        return getStorageSync(key)
      } catch (e) {  
          console.error(e);
          return null
      }  
    },  
    setItem: async (key:string, value:string) => {  
      try {  
        setStorageSync(key, value);  
      } catch (e) {  
          console.error(e);  
          return null
      }  
    },  
    removeItem: async (key:string) => {  
      try {  
        removeStorageSync(key);  
      } catch (e) {  
          console.error(e);  
          return null
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