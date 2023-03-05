function getAuthorizationCookie() {
    const cookieValue = document.cookie.split("; ").find((row) => row.startsWith("Authorization="));
    return cookieValue ? `Bearer ${cookieValue?.split("=")[1]}` : ""
  }
  
  function removeAuthorizationCookie() {
    document.cookie = 'Authorization' + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';;
  }
  
  const getDataFromApi = async function (requestOpts = {}) {
    if(requestOpts.opts.headers["Authorization"]) {
      delete requestOpts.opts.headers.Authorization
    }
    let optionsResponse
    try {
      optionsResponse = await fetch(requestOpts.url, {
      method: "OPTIONS",
  })
    } catch(e) {
      console.log(e)
    }
    let response = {};
    try {
      if(getAuthorizationCookie()) {
        requestOpts.opts.headers["Authorization"] = getAuthorizationCookie()
      }
      response = await fetch(requestOpts.url, { ...requestOpts.opts });
      const status = response.status;
      if (response.ok) {
        try {
          response.data = await response.json();
        } catch (e) {
          console.log(e);
          response.data = {};
        }
        response.isSuccess = true;
        response["status"] = status;
      } else {
        response.data = await response.json();
        // response.isSuccess = false;
        response["status"] = status;
        throw new Error(response.status)
      }
    } catch (error) {
      console.log(error);
      response.data = {};
      response.data["IsSuccess"] = false;
      response.data.status = error.message;
      // hideSpinner();
    } finally {
      hideSpinner();
    }
    return response;
  };
  
  function logout() {
    removeAuthorizationCookie()
    renderSignInPage();
  }

  function handleApiErrors(response, toNotification = false) {
    if (response.status === 401) {
      logout();
    } else if (response.status === 500) {
        document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderErrorPageLayout(response.status);
    } 
    // else {
    //   //renderServerErrorPage();
    //   document.getElementById(CONTENT_CONTAINER_ID).innerHTML = renderErrorPageLayout(response.status);
    // }
  }

  