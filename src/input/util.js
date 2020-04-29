/**
 *
 * @param {参数} value
 * @param {默认数组} validList
 */
export function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
        if (value === validList[i]) {
            return true
        }
    }
    return false
}

export function propsInit(params) {
    const propsInitObj = {}
    for (const val of params.props) {
        propsInitObj[val] = params.config
    }
    return propsInitObj
}

export function findComponentUpward(context, componentName, componentNames) {
    if (typeof componentName === 'string') {
        componentNames = [componentName]
    } else {
        componentNames = componentName
    }
    let parent = context.$parent
    let name = parent.$options.name
    while (parent && (!name || componentNames.indexOf(name) < 0)) {
        parent = parent.$parent
        if (parent) name = parent.$options.name
    }
    return parent
}