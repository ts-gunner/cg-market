import { createModel } from "@rematch/core";
import type { RootModel } from '@/models'


const initState = {
    progressData: []
}

export const achieveModel = createModel<RootModel>()({
    state: initState,
    reducers: {
        
    },
    effects: (dispatch) => ({

    })
})