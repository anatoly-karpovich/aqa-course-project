// import {renderSpinner} from '../components/spinner.js'
function renderLandingPageLayout(options) {
    return `
    ${renderSpinner()} 
        <div class="contentWrapper">
                ${generateSidebar(options)}
                <div id="root">
                    <div id="title">
                        <h2 class="pageTitle">Dashboard</h2>
                    </div>
                    <div id="contentInner">
                        <div class="zalupa">
                            <div>
                                <h2>Zalupa</h2>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    `
}

const landingProps = {
    navbar: {
        name: 'Sidebar',
        items: [
            {
                name: 'Home',
                xlink: "#home"
            },
            {
                name: 'Orders',
                xlink: "#table"
            },
            {
                name: 'Products',
                xlink: "#grid"
            },
            {
                name: 'Customers',
                xlink: "#people-circle"
            }
        ]
    }
    
}