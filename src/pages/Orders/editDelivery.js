function renderEditDeliveryLayout(options = edit_delivery_props) {
  const order = _.cloneDeep(state.order);
  options.title = "Edit Delivery";
  options.formId = "edit-delivery";
  edit_delivery_props.formId = "edit-delivery";

  const customerAddress = {
    country: state.order.customer.country,
    city: state.order.customer.city,
    street: state.order.customer.street,
    house: state.order.customer.house,
    flat: state.order.customer.flat,
  };

  state.order.delivery.location = _.isEqual(customerAddress, state.order.delivery.address) ? "Home" : "Other";
  state.order.delivery.finalDate = convertToDate(state.order.delivery.finalDate);

  return `
    <div class="shadow-sm p-3 mb-5 bg-body rounded form-center">
        <div id="${PAGE_TITLE_ID}" class="page-header-title d-flex justify-content-around">
            <h2 class="fw-bold">${options.title}</h2>
        </div>
        <form class="row g-3 form-with-inputs modal-body" id="${options.formId}">
            <div class="d-flex justify-content-between">
                ${generateFormSelectInput({ ...options.inputs.type, defaultValue: state.order.delivery.condition })}
                ${generateDatePicker()}
            </div> 
            ${
              state.order.delivery.condition === "Delivery"
                ? generateFormSelectInput({
                    ...options.inputs.delivery_location,
                    defaultValue: state.order.delivery.location,
                  })
                : generateFormSelectInput({ ...options.inputs.delivery_location })
            }
            <section id="delivery-location-section" class="row g-2 d-flex justify-content-between s-loc-ml">
                ${generateInitialEditDeliverySectionBody()}
            </section>
            <div class="col-12  d-flex justify-content-around" style="margin-top: 50px;">
                <div>
                    ${saveButton(options.buttons.save.id, options.buttons.save.name)}
                    ${backButton(options.buttons.back.id, options.buttons.back.name)}
                </div>
            </div>
        </form>
    </div>
    `;
}

const edit_delivery_props = _.cloneDeep(delivery_props);

function addEventListelersToEditDeliveryPage() {
  enableDatePicker();
  const deliverySection = $("section#delivery-location-section");
  const deliveryTypeSelect = $("select#inputType");
  const deliveryLocationSelect = $("select#inputLocation");
  const deliveryLocationContainer = $("#div-inputLocation");
  const saveButton = $(`button#${delivery_props.buttons.save.id}`);
  const cancelButton = $(`button#${delivery_props.buttons.back.id}`);

  if (state.order.delivery.condition === "Pickup") {
    deliveryLocationContainer.hide();
  }

  if (state.order.delivery.condition === "Delivery" && state.order.delivery.location === "Other") {
    $("section#delivery-location-section input").each(function () {
      $(this).prop("readonly", false);
    });
  }
  setUpDateToDatePicker(state.order.delivery.finalDate);

  saveButton.on("click", async (e) => {
    e.preventDefault();
    const submit = document.querySelector(`button#${delivery_props.buttons.save.id}`);
    const deleteButton = document.getElementById(delivery_props.buttons.back.id);
    deleteButton.setAttribute("disabled", "");
    setSpinnerToButton(submit);
    await submitDelivery(state.order._id, createDeliveryRequestBody());
  });

  cancelButton.on("click", async (e) => {
    e.preventDefault();
    await renderOrderDetailsPage(state.order._id);
  });

  $(`#${edit_delivery_props.formId}`).on("change", (e) => {
    if (validateScheduleDeliveryForm() && !isNewDeliveryEqualToState()) {
      saveButton.prop("disabled", false);
    } else {
      saveButton.prop("disabled", true);
    }
  });

  $(`#${edit_delivery_props.formId}`).on("input", (e) => {
    setTimeout(() => {
      if (validateScheduleDeliveryForm() && !isNewDeliveryEqualToState()) {
        saveButton.prop("disabled", false);
      } else {
        saveButton.prop("disabled", true);
      }
    }, 0);

    switch (e.target.id) {
      case "inputLocation": {
        if (deliveryLocationSelect.val() === "Other" && deliveryTypeSelect.val() === "Delivery") {
          deliverySection.html(generateEditDeliverySectionBody("Other"));
          $("section#delivery-location-section input").each(function () {
            $(this).prop("readonly", false);
          });
        } else if (deliveryLocationSelect.val() === "Home" && deliveryTypeSelect.val() === "Delivery") {
          deliverySection.html(generateEditDeliverySectionBody("Home"));
        }
        break;
      }
      case "inputType": {
        if (deliveryTypeSelect.val() === "Delivery") {
          deliveryLocationContainer.show();
          deliverySection.html(generateEditDeliverySectionBody("Home"));
        } else {
          deliverySection.html(generateEditPickupSectionBody());
          deliveryLocationContainer.hide();
        }
        break;
      }
      case "selectCountry": {
        if (deliveryTypeSelect.val() === "Pickup") {
          setShopAddressByCountry($("select#selectCountry").val());
        }
        break;
      }

      case "inputCity": {
        if (!isValidInput("City", $(`#${delivery_props.inputs.city.id}`).val())) {
          showErrorMessage(delivery_props.inputs.city);
        } else {
          hideErrorMessage(delivery_props.inputs.city);
        }
        break;
      }

      case "inputStreet": {
        if (!isValidInput("Street", $(`#${delivery_props.inputs.street.id}`).val())) {
          showErrorMessage(delivery_props.inputs.street);
        } else {
          hideErrorMessage(delivery_props.inputs.street);
        }
        break;
      }

      case "inputHouse": {
        if (
          !isValidInput("House", +$(`#${delivery_props.inputs.house.id}`).val()) ||
          +$(`#${delivery_props.inputs.house.id}`).val() === 0
        ) {
          showErrorMessage(delivery_props.inputs.house);
        } else {
          hideErrorMessage(delivery_props.inputs.house);
        }
        break;
      }

      case "inputFlat": {
        if (
          !isValidInput("Flat", +$(`#${delivery_props.inputs.flat.id}`).val()) ||
          +$(`#${delivery_props.inputs.flat.id}`).val() === 0
        ) {
          showErrorMessage(delivery_props.inputs.flat);
        } else {
          hideErrorMessage(delivery_props.inputs.flat);
        }
        break;
      }
    }
  });
}

function generateEditDeliverySectionBody(location) {
  const inputs = {};
  if (location === "Home") {
    inputs.country = { ...delivery_props.inputs.countryInput, value: state.order.customer.country };
    inputs.city = { ...delivery_props.inputs.city, value: state.order.customer.city };
    inputs.street = { ...delivery_props.inputs.street, value: state.order.customer.street };
    inputs.house = { ...delivery_props.inputs.house, value: state.order.customer.house };
    inputs.flat = { ...delivery_props.inputs.flat, value: state.order.customer.flat };
  } else {
    const isOther = state.order?.delivery?.location === "Other";
    inputs.country = {
      ...delivery_props.inputs.country,
      value: isOther ? state.order.delivery.address.country : state.order.customer.country,
    };
    inputs.city = {
      ...delivery_props.inputs.city,
      value: isOther ? state.order.delivery.address.city : state.order.customer.city,
    };
    inputs.street = {
      ...delivery_props.inputs.street,
      value: isOther ? state.order.delivery.address.street : state.order.customer.street,
    };
    inputs.house = {
      ...delivery_props.inputs.house,
      value: isOther ? state.order.delivery.address.house : state.order.customer.house,
    };
    inputs.flat = {
      ...delivery_props.inputs.flat,
      value: isOther ? state.order.delivery.address.flat : state.order.customer.flat,
    };
  }
  return generateFormInputs(inputs);
}

function generateEditPickupSectionBody() {
  const pickupCountry = state.order.delivery.condition === "Pickup" ? state.order.delivery.address.country : null;
  const inputs = {
    country: {
      ...delivery_props.inputs.country,
      value: pickupCountry ? state.order.delivery.address.country : state.order.customer.country,
    },
    city: {
      ...delivery_props.inputs.city,
      value: shopAddressByCountry[pickupCountry || state.order.customer.country].city,
    },
    street: {
      ...delivery_props.inputs.street,
      value: shopAddressByCountry[pickupCountry || state.order.customer.country].street,
    },
    house: {
      ...delivery_props.inputs.house,
      value: shopAddressByCountry[pickupCountry || state.order.customer.country].house,
    },
    flat: {
      ...delivery_props.inputs.flat,
      value: shopAddressByCountry[pickupCountry || state.order.customer.country].flat,
    },
  };
  return generateFormInputs(inputs);
}

function generateInitialEditDeliverySectionBody() {
  if (state.order.delivery.condition === "Delivery") {
    return generateEditDeliverySectionBody(state.order.delivery.location);
  } else {
    return generateEditPickupSectionBody();
  }
}

function isNewDeliveryEqualToState() {
  const delivery = _.omit(createDeliveryRequestBody(), "_id").delivery;
  return _.isEqual(delivery, _.omit(state.order.delivery, "location"));
}
