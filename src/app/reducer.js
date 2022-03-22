
const myStorage = window.localStorage;

const initState = {
    filters: {
        minScore: myStorage.getItem('metamon') === undefined ? 315 : JSON.parse(myStorage.getItem('metamon'))?.score,
        level: myStorage.getItem('metamon') === undefined ? 20 : JSON.parse(myStorage.getItem('metamon'))?.levelMetamon,
        arrange: 0,
    },
    price: {
        raca: 0,
        elmon: 0,
        elcoin: 0,
        btc: 0,
    },
    filtersElemon: {
        sort: 0,
        name: 0,
        tokenId: '',
        rarity: '',
        purity: '',
        price: '',
        min: '',
        max: '',
    },
    tab: 0,
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'handleFilters':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    minScore: action.payload.minScore,
                    level: action.payload.level
                }
            }
        case 'handleArrange':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    arrange: action.payload
                }
            }
        case 'handlePower':
            return {
                ...state,
                filtersElemon: {
                    ...state.filtersElemon,
                    min: action.payload.min,
                    max: action.payload.max,
                }
            }
        case 'handleSort':
            return {
                ...state,
                filtersElemon: {
                    ...state.filtersElemon,
                    sort: action.payload
                }
            }
        case 'handleName':
            return {
                ...state,
                filtersElemon: {
                    ...state.filtersElemon,
                    name: action.payload
                }
            }
        case 'handleTokenId':
            return {
                ...state,
                filtersElemon: {
                    ...state.filtersElemon,
                    tokenId: action.payload
                }
            }
        case 'updatePrice':
            return {
                ...state,
                price: action.payload
            }
        default:
            return state;
    }
}
export default rootReducer;

