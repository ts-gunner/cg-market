import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'


const initState = {
    
}

export const globalModel = createModel<RootModel>()({
    state: initState,
    reducers: {
        
    },
    effects: (dispatch) => ({

    })
})