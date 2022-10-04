function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Searches for the node by it's innerText and returns its index
 * @param {string} selector - selector of the node collection
 * @param {string} value - text to find node by
 * @returns the index of node in node collection
 */
function findNodeIndexByInnerText(selector, value) {
    const nodes = document.querySelectorAll(selector)
    const values = []
    nodes.forEach(el => {values.push(el.innerText.trim())})
    return values.findIndex(el => el === value)
}

Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}