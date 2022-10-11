async function renderCustomerDetailsLyaout(options = {}) {
    const data = await getDataFromApi({url: ENDPOINTS["Get Customer By Id"](options.id)})
    options.data = await data
    return `
    <div id="${PAGE_TITLE_ID}">
    <h2 class="pageTitle">${options.data.name}'s Details</h2>
</div>
<div id="${CONTENT_ID}">
<section class="pb-4 center">
<div class="bg-white border rounded-5">
  
  <section class="w-100 p-4 mb-4">
    <p class="note note-primary details">
      <strong>Email:</strong> 
      ${options.data.email ? options.data.email : '-'}
    </p>

    <p class="note note-secondary details">
      <strong>Name:</strong> 
      ${options.data.name ? options.data.name : '-'}
    </p>

    <p class="note note-success details">
      <strong>Country:</strong> 
      ${options.data.country ? options.data.country : '-'}
    </p>

    <p class="note note-danger details">
      <strong>City:</strong> 
      ${options.data.city ? options.data.city : '-'}      
    </p>

    <p class="note note-warning details">
      <strong>Address:</strong>
      ${options.data.address ? options.data.address : '-'}      
    </p>

    <p class="note note-info details">
      <strong>Phone:</strong> 
      ${options.data.phone ? options.data.phone : '-'}      
    </p>

    <p class="note note-light details">
      <strong>Registation date:</strong> 
      ${options.data.date_create ? moment(options.data.date_create).format('LLL') : '-'}
    </p>

    <p class="note note-light details">
    <strong>Notes:</strong> 
      ${options.data.note ? options.data.note : '-'}
    </p>

  </section>
  </div>
</section>
</div>
    <div class="col-12" style="margin-top: 20px; margin-left:20px; display: flex; justify-content: space-between;">
        <div>
            <button class="btn btn-primary form-buttons" id="edit-customer-btn">Edit Customer</button>
            <button type="submit" class="btn btn-danger" form-buttons" id="delete-customers-btn" onClick="deleteCustomer('${options.id}','${await options.data.name}');">Delete</button>
        </div>
        <div>
            <button class="btn btn-secondary form-buttons" id="back-to-customers-page" onClick="renderCustomersPage(CustomerProps);">Back</button>
        </div>      
    </div>
    `
}


async function deleteCustomer(id, name) {
    const spinner = document.querySelector(`.overlay`);
    spinner.style.display = "block";

    document.getElementById("edit-customer-btn").setAttribute('disabled', "")
    document.getElementById("delete-customers-btn").setAttribute('disabled', "")
    document.getElementById("back-to-customers-page").setAttribute('disabled', "")

    const requestOpts = {
        url: ENDPOINTS["Get Customer By Id"](id),
        opts: {
            method: 'DELETE'
        }
    }

    const data = await getDataFromApi(requestOpts)

    if(await data.isSuccess && await data.status === 204) {
        await renderCustomersPage(CustomerProps)
        renderNotification({ message: SUCCESS_MESSAGES['Customer Successfully Deleted'](name) });
    }
}


/*
<p class="note note-secondary">
      <strong>Note secondary:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit.
      Cum doloremque officia laboriosam. Itaque ex obcaecati architecto! Qui necessitatibus
      delectus placeat illo rem id nisi consequatur esse, sint perspiciatis soluta porro?
    </p>

    <p class="note note-success">
      <strong>Note success:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
      doloremque officia laboriosam. Itaque ex obcaecati architecto! Qui necessitatibus delectus
      placeat illo rem id nisi consequatur esse, sint perspiciatis soluta porro?
    </p>

    <p class="note note-danger">
      <strong>Note danger:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
      doloremque officia laboriosam. Itaque ex obcaecati architecto! Qui necessitatibus delectus
      placeat illo rem id nisi consequatur esse, sint perspiciatis soluta porro?
    </p>

    <p class="note note-warning">
      <strong>Note warning:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
      doloremque officia laboriosam. Itaque ex obcaecati architecto! Qui necessitatibus delectus
      placeat illo rem id nisi consequatur esse, sint perspiciatis soluta porro?
    </p>

    <p class="note note-info">
      <strong>Note info:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
      doloremque officia laboriosam. Itaque ex obcaecati architecto! Qui necessitatibus delectus
      placeat illo rem id nisi consequatur esse, sint perspiciatis soluta porro?
    </p>

    <p class="note note-light">
      <strong>Note light:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
      doloremque officia laboriosam. Itaque ex obcaecati architecto! Qui necessitatibus delectus
      placeat illo rem id nisi consequatur esse, sint perspiciatis soluta porro?
    </p>

    <p class="note note-dark text-secondary mb-0">
      <strong>Note light:</strong> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum
      doloremque officia laboriosam. Itaque ex obcaecati architecto! Qui necessitatibus delectus
      placeat illo rem id nisi consequatur esse, sint perspiciatis soluta porro?
    </p>

    <div class="p-4 text-center border-top mobile-hidden">
    <a class="btn btn-link px-3" data-mdb-toggle="collapse" href="#example8" role="button" aria-expanded="false" aria-controls="example8" data-ripple-color="hsl(0, 0%, 67%)">
      <i class="fas fa-code me-md-2"></i>
      <span class="d-none d-md-inline-block">
        Show code
      </span>
    </a>
    
    
      <a class="btn btn-link px-3 " data-ripple-color="hsl(0, 0%, 67%)">
        <i class="fas fa-file-code me-md-2 pe-none"></i>
        <span class="d-none d-md-inline-block export-to-snippet pe-none">
          Edit in sandbox
        </span>
      </a>
    
  </div>
  
  
</div>
</section>
</div>
    */