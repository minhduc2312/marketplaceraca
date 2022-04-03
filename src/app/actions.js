
export const handleFilters = ({ minScore, level }) => {
    return {
        type: 'handleFilters',
        payload: {
            minScore,
            level
        }
    }
}

export const handleArrange = (arrange) => {
    return {
        type: 'handleArrange',
        payload: arrange
    }
}

export const updatePriceAuto = (price) => {
    return {
        type: 'updatePrice',
        payload: price,
    }
}

export const handlePower = ({ minPower, maxPower }) => {
    return {
        type: 'handlePower',
        payload: {
            min: minPower,
            max: maxPower
        }
    }
}

export const handleSort = (sort) => {
    return {
        type: 'handleSort',
        payload: sort,
    }
}

export const handleFilterName = (name) => {
    return {
        type: 'handleName',
        payload: name,
    }
}
export const handleTokenId = (id) => {
    return {
        type: 'handleTokenId',
        payload: id,
    }
}
export const addRarity = (id) => {
    return {
        type: 'elemon/addRarity',
        payload: Number(id),
    }
}
export const removeRarity = (id) => {
    return {
        type: 'elemon/removeRarity',
        payload: Number(id),
    }
}
export const addAura = (id) => {
    return {
        type: 'elemon/addAura',
        payload: Number(id),
    }
}
export const removeAura = (id) => {
    return {
        type: 'elemon/removeAura',
        payload: Number(id),
    }
}
export const changeCurrentAccount = (address) => {
    return {
        type: 'changeCurrentAccount',
        payload: address,
    }
}


