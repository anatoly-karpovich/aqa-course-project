// import {renderSpinner} from '../components/spinner.js'
function renderLandingPageLayout(options) {
    return `
    ${getIconSvgHTML()}
    <div id="sidemenu">
    ${renderSpinner()} 
        <div class="contentWrapper">
                ${generateSidebar(options)}
                <div id="root">
                    <div id="title">
                        <h2 class="pageTitle">Home Page</h2>
                    </div>
                    <div id="contentInner">
                        <div class="aaa">
                            <div>
                                <h4>Home Content</h4>
                            </div>
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