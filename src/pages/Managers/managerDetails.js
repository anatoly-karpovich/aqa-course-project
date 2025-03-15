function generateManagerDetailsPageLayout(user, orders) {
  return `
<div class="card shadow-sm p-4 mb-5 bg-body rounded page-title-margin position-relative" id="manager-info-container">
    <div class="back-link" onclick="renderManagersPage();">
        <i class="bi bi-arrow-left me-2"></i> Managers
    </div>
    <div class="card-body" style="margin: 0 12px 0 12px;">
        <div class="card-title mb-4 d-flex justify-content-start align-items-center">
            <h3>Manager Details</h3>
            <button class="btn edit-pencil" id="edit-manager-pencil" title="Edit Manager" 
            onclick="renderEditManagerPage(event,'${user._id}')">
                <i class="bi bi-pencil-fill"></i>
            </button>
            ${
              user._id === JSON.parse(window.localStorage.getItem("user"))._id
                ? `<button class="btn btn-secondary ms-2 btn-sm" id="change-password-button" title="Change Password" onclick="renderChangePasswordPage(event,'${user._id}')">
                <i class="bi bi-key-fill"></i> Change Password
            </button>`
                : ""
            }

        </div>

        <div class="row g-4">
            <div class="col-md-6">
                <h5 class="d-flex align-items-center"><i class="bi bi-person-circle me-1"></i> Username</h5>
                <p id="manager-username">${user.username}</p>

                <h5 class="d-flex align-items-center"><i class="bi bi-person-square me-1"></i> First Name</h5>
                <p id="manager-firstname">${user.firstName}</p>

                <h5 class="d-flex align-items-center"><i class="bi bi-person-lines-fill me-1"></i> Last Name</h5>
                <p id="manager-lastname">${user.lastName}</p>

                <h5 class="d-flex align-items-center"><i class="bi bi-person-badge-fill me-1"></i> Roles</h5>
                <p id="manager-roles">${user.roles.length > 1 ? roles.join(", ") : user.roles[0]}</p>
            </div>
        </div>

        <div class="row g-4 mt-1">
            <div class="col-md-12">
                <h5 class="d-flex align-items-center"><i class="bi bi-calendar-check me-1"></i> Created On</h5>
                <p id="manager-created-on">${convertToFullDateAndTime(user.createdOn)}</p>
            </div>
        </div>
    </div>
</div>

<div class="card shadow-sm p-4 mb-5 bg-body rounded page-title-margin position-relative" id="manager-orders-container">
    <div class="card-body">
        <h3 class="card-title">Assigned Orders</h3>
        <div class="table-responsive">
            <table class="table table-striped tableWrapper" id="table-orders" style="table-layout: fixed; width: 100%;">
                <thead>
                    <tr>
                        <th scope="col" style="white-space: nowrap; text-align: left;">Order Number</th>
                        <th scope="col" style="white-space: nowrap; text-align: left;">Price</th>
                        <th scope="col" style="white-space: nowrap; text-align: left;">Status</th>
                        <th scope="col" style="white-space: nowrap; text-align: left;">Created On</th>
                        <th scope="col" style="white-space: nowrap; text-align: left;">Last Modified</th>
                    </tr>
                </thead>
                <tbody>
                  ${orders.length ? orders.map((o) => customerOrderRow(o)).join("") : emptyOrdersTableRow()}
                </tbody>
            </table>
        </div>
    </div>
</div>

    `;
}

function renderEditManagerPage(event, managerId) {
  event.preventDefault();
}

function renderChangePasswordPage(event, managerId) {
  event.preventDefault();
}
