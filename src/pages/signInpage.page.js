const layout = `
<div class="overlay">
<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  </div>
</div>

<section class="vh-100">
<div class="container-fluid h-custom">
  <div class="row d-flex justify-content-center align-items-center h-100">
    <div class="col-md-9 col-lg-6 col-xl-5">
      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
        class="img-fluid" alt="Sample image">
    </div>
    <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <form>
        <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
          <p class="lead fw-normal mb-0 me-3">Sign in with</p>
          <button type="button" class="btn btn-primary btn-floating mx-1">
            <i class="fab fa-facebook-f"></i>
          </button>

          <button type="button" class="btn btn-primary btn-floating mx-1">
            <i class="fab fa-twitter"></i>
          </button>

          <button type="button" class="btn btn-primary btn-floating mx-1">
            <i class="fab fa-linkedin-in"></i>
          </button>
        </div>

        <div class="divider d-flex align-items-center my-4">
          <p class="text-center fw-bold mx-3 mb-0">Or</p>
        </div>

        <!-- Email input -->
        <div class="form-outline mb-4">
          <input type="email" id="emailinput" class="form-control form-control-lg"
            placeholder="Enter a valid email address" />
          <label class="form-label" for="emailinput">Email address</label>
        </div>

        <!-- Password input -->
        <div class="form-outline mb-3">
          <input type="password" id="passwordinput" class="form-control form-control-lg"
            placeholder="Enter password" />
          <label class="form-label" for="passwordinput">Password</label>
          <h4 id="errorMessage">Credentials are required</h4>
        </div>

        <div class="d-flex justify-content-between align-items-center">
          <!-- Checkbox -->
          <div class="form-check mb-0">
            <input class="form-check-input me-2" type="checkbox" value="" id="remembermecheckbox" />
            <label class="form-check-label" for="remembermecheckbox">
              Remember me
            </label>
          </div>
          <a href="#!" class="text-body">Forgot password?</a>
        </div>

        <div class="text-center text-lg-start mt-4 pt-2">
          <button type="button" class="btn btn-primary btn-lg"
            style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
          <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
              class="link-danger">Register</a></p>
        </div>

      </form>
    </div>
  </div>
</div>
<div
  class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
  <!-- Copyright -->
  <div class="text-white mb-3 mb-md-0">
    Copyright © 2022. All rights reserved.
  </div>
  <!-- Copyright -->

  <!-- Right -->
  <div>
    <a href="#!" class="text-white me-4">
      <i class="fab fa-facebook-f"></i>
    </a>
    <a href="#!" class="text-white me-4">
      <i class="fab fa-twitter"></i>
    </a>
    <a href="#!" class="text-white me-4">
      <i class="fab fa-google"></i>
    </a>
    <a href="#!" class="text-white">
      <i class="fab fa-linkedin-in"></i>
    </a>
  </div>
  <!-- Right -->
</div>
</section>`


function renderSignInPage() {
    const signIn = document.createElement('div')
    signIn.insertAdjacentHTML(
      "afterbegin", layout)
      document.body.prepend(signIn)

      const email = signIn.querySelector('#emailinput')
      const password = signIn.querySelector('#passwordinput')

      const submit = signIn.querySelector(`.btn-lg`)
      submit.addEventListener('click', () => {
        if(validateSignIn(email.value, password.value)) {
            const spinner = document.querySelector(`.overlay`)
            signIn.classList.add('disabled')
            spinner.style.display = 'block'
            setTimeout(() => {
            spinner.style.display = 'none'
                
                const token = '4fb18062-435d-11ed-b878-0242ac120002'
                localStorage.setItem('token', token)
                signIn.parentNode.removeChild(signIn)
                renderLandingPage(landingProps)
            }, 1000)
           
        } else {
            const message = signIn.querySelector('#errorMessage')
            message.style.display = 'block'
            message.innerText = 'Credentials are required'
        }
    })
    email.addEventListener('input', onInput)
    password.addEventListener('input', onInput)
}

function validateSignIn(email, password) {
 
    return email === 'aqacourse@gmail.com' && password === 'password'
}

function onInput() {
    const errorMessage = document.querySelector('#errorMessage')
    errorMessage.style.display = 'none'
}