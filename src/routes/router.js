// function route(event) {
//     event = event || window.event
//     event.preventDefault()
//     window.history.pushState({}, "", event.target.href);
//     handleLocation()
// }

// const routes = {
//     "/dashboard" : '/pages/dashboard.html',
//     "/home" : '/pages/index.html',
//     404: "/pages/404.html"
// }

// async function handleLocation() {
//     const path = window.location.pathname
//     const route = routes[path] || routes[404]
//     const html = await fetch(route).then(data => data.text())
//     document.querySelector('#contentInner').innerHTML = html
// }

// window.onpopstate = handleLocation
// window.route = route
// handleLocation()