const myStorage = window.localStorage;

const listToken = [
  {
    tokenName: 'BNB',
    address: '0xB8c77482e45F1F44dE1745F52C74426C631bDD52'
  },
]
const initState = {
  filters: {
    minScore:
      myStorage.getItem("metamon") === undefined
        ? 315 : JSON.parse(myStorage.getItem("metamon"))?.score,
    level:
      myStorage.getItem("metamon") === undefined
        ? 20 : JSON.parse(myStorage.getItem("metamon"))?.levelMetamon,
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
    tokenId: "",
    rarity: [],
    purity: [],
    aura: [],
    price: "",
    min: "",
    max: "",
  },
  tab: 0,
  currentAccount: '',
  listToken,
  db: {},
};

const rootReducer = (state = initState, action) => {
  switch (action.type) {
    case "handleFilters":
      return {
        ...state,
        filters: {
          ...state.filters,
          minScore: action.payload.minScore,
          level: action.payload.level,
        },
      };
    case "handleArrange":
      return {
        ...state,
        filters: {
          ...state.filters,
          arrange: action.payload,
        },
      };
    case "handlePower":
      return {
        ...state,
        filtersElemon: {
          ...state.filtersElemon,
          min: action.payload.min,
          max: action.payload.max,
        },
      };
    case "handleSort":
      return {
        ...state,
        filtersElemon: {
          ...state.filtersElemon,
          sort: action.payload,
        },
      };
    case "handleName":
      return {
        ...state,
        filtersElemon: {
          ...state.filtersElemon,
          name: action.payload,
        },
      };
    case "handleTokenId":
      return {
        ...state,
        filtersElemon: {
          ...state.filtersElemon,
          tokenId: action.payload,
        },
      };
    case "updatePrice":
      return {
        ...state,
        price: action.payload,
      };
    case "elemon/addRarity":
      return {
        ...state,
        filtersElemon: {
          ...state.filtersElemon,
          rarity: [...state.filtersElemon.rarity, action.payload],
        },
      };
    case "elemon/removeRarity":
      const listRarity = [...state.filtersElemon.rarity];
      const positionRarity = listRarity.indexOf(action.payload);
      return {
        ...state,
        filtersElemon: {
          ...state.filtersElemon,
          rarity: listRarity
            .slice(0, positionRarity)
            .concat(listRarity.slice(positionRarity + 1)),
        },
      };
    case "elemon/addAura":
      return {
        ...state,
        filtersElemon: {
          ...state.filtersElemon,
          aura: [...state.filtersElemon.aura, action.payload],
        },
      };
    case "elemon/removeAura":
      const listAura = state.filtersElemon.aura;
      const positionAura = listAura.indexOf(action.payload);
      return {
        ...state,
        filtersElemon: {
          ...state.filtersElemon,
          aura: listAura
            .slice(0, positionAura)
            .concat(listAura.slice(positionAura + 1)),
        },
      };
    case 'changeCurrentAccount':
      return {
        ...state,
        currentAccount: action.payload,
      }
    case 'tokens/add':
      return {
        ...state,
        listToken: [
          ...state.listToken,
          {
            tokenName: action.payload.symbol,
            address: action.payload.token,
            price: action.payload.price,
            id:action.payload?.id
          },
        ],
        prevLength: state.listToken.length
      }
    case 'tokens/remove':
      const newList = state.listToken.filter(token => token.address !== action.payload);
      return {
        ...state,
        prevLength: state.listToken.length,
        listToken: [
          ...newList
        ]
      }
    case 'initTokens':
      // console.log(action.payload)
      return {
        ...state,
        listToken: [
          ...state.listToken,
          ...action.payload
        ]
      }
    case 'clearListToken':
      // console.log(action.payload)
      return {
        ...state,
        listToken: [
          state.listToken[0]
        ]
      }
    case 'initApp':
      return {
        ...state,
        db: action.payload
      }
    default:
      return state;
  }
};
export default rootReducer;
