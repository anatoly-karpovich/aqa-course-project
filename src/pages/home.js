function renderHomePageLayout(options) {
    return `
    <div id="${PAGE_TITLE_ID}">
        <h2 class="pageTitle">${options.title}</h2>
        ${options.buttons ? options.buttons.map(el => `<button class="${el.classlist}">${el.text}</button>`) : ""}
    </div>
    <div id="${CONTENT_ID}">
        <div>
            <h4>${options.content}</h4>
        </div>
    </div>`
}

const homeProps = {
    path: 'Home',
    title: 'Home Page',
    content: 'Home Content'
}