const initialState = {
    table: [],
    data: [],
    loader: false,
    page: 1,
    limit: 5
}

export default function table(state = initialState, action) {
    switch(action.type) {
        case 'CHANGE_PAGE':
            return {...state, page: action.payload}
        case 'GETTING_TABLE_DATA':
            return {...state, loader: true}
        case 'GETED_TABLE_DATA':
            return {...state, loader: false, table: action.payload, data: action.payload.slice(0, state.limit)}
        case 'SLICE_TABLE_DATA':
            return {...state, data: action.payload}
        default:
            return state
    }
}
