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

function renderButtons(buttons = []) {
    buttons.map(el => `<button class="${el.classlist}" ${el.type ? "type=" : ""}${el.type ? el.type : ""}>${el.text}</button>`)
}

const getDataFromApi = async function(requestOpts = {}) {
    let response 
        try{
            response = await fetch(requestOpts.url, {...requestOpts.opts})
            if(response.status < 300) {
            response = await response.json() //.then(data => data.json())
            response.isSuccess = true
            } else {
                response = await response.json()
                response.isSuccess = false
            }
        }
        catch(error) {
            console.log(error)
            console.log(response.status)
            const spinner = document.querySelector(`.overlay`);
            spinner.style.display = "none";
        }
        return response


}

function clearAllInputs(inputs) {
    for (const input in inputs) {
      inputs[input].type === "select"
        ? (document.getElementById(inputs[input].id).value = inputs[input].options.values[0]) //.toLowerCase()
        : (document.getElementById(inputs[input].id).value = "");
    }
  }

// function customerNameValidation(value = '') {
//     return REGULAR_EXPRESSIONS['Customer Name'].test(value.trim())
// }

function customerInputValidation(input, value = '') {
    return REGULAR_EXPRESSIONS[input].test(value.trim())
}

