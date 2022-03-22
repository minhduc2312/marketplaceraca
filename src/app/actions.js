
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


