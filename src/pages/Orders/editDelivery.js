function renderEditDeliveryLayout(options = edit_delivery_props) {
    const order = _.cloneDeep(state.order);
    options.title = "Edit Delivery"

    const customerAddress = {
        country: { ...state.order.customer.country },
        city: { ...state.order.customer.city },
        street: { ...state.order.customer.street },
        house: { ...state.order.customer.house  },
        flat: { ...state.order.customer.flat },
      }
      state.order.delivery.location = _.isEqual(customerAddress, state.order.delivery.address) ? "Home" : "Other"

    return `
    <div class="shadow-sm p-3 mb-5 bg-body rounded form-center">
        <div id="${PAGE_TITLE_ID}" class="page-header d-flex justify-content-around">
            <h2 class="fw-bold">${options.title}</h2>
        </div>
        <form class="row g-3 form-with-inputs modal-body" id="${options.formId}">
        <div class="d-flex justify-content-between">
          ${generateFormSelectInput(options.inputs.type)}
          ${generateDatePicker()}
        </div>
         
         ${generateFormSelectInput(options.inputs.delivery_location)}
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
  
  const edit_delivery_props = _.cloneDeep(delivery_props)
  edit_delivery_props.formId = "edit-delivery"

  function addEventListelersToEditDeliveryPage() {
    enableDatePicker();
    const deliverySection = $("section#delivery-location-section");
    const deliveryTypeSelect = $("select#inputType");
    const deliveryLocationSelect = $("select#inputLocation");
    const deliveryLocationContainer = $("#div-inputLocation");

    $(`#${edit_delivery_props.formId}`).on("input", (e) => {
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
          setShopAddressByCountry($("select#selectCountry").val());
          break;
        }
      }
    });
  }

  function generateEditDeliverySectionBody(location, address) {
    $("select#inputLocation").val(location)
    const inputs = {
      country: location === 'Home' 
      ? { ...delivery_props.inputs.countryInput, value: address?.country || state.order.customer.country }
      : { ...delivery_props.inputs.country, value: address?.country || state.order.customer.country },
      city: { ...delivery_props.inputs.city, value: address?.city || state.order.customer.city },
      street: { ...delivery_props.inputs.street, value: address?.street || state.order.customer.street },
      house: { ...delivery_props.inputs.house, value: address?.house || state.order.customer.house  },
      flat: { ...delivery_props.inputs.flat, value: address?.flat || state.order.customer.flat },
    }
    console.log(inputs)
    return generateFormInputs(inputs)
  }

  function generateEditPickupSectionBody(address) {
    const inputs = {
      country: { ...delivery_props.inputs.country, value: address?.country || state.order.customer.country },
      city: { ...delivery_props.inputs.city, value: address?.city || shopAddressByCountry[state.order.customer.country].city },
      street: { ...delivery_props.inputs.street, value: address?.street || shopAddressByCountry[state.order.customer.country].street },
      house: { ...delivery_props.inputs.house, value: address?.house || shopAddressByCountry[state.order.customer.country].house  },
      flat: { ...delivery_props.inputs.flat, value: address?.flat || shopAddressByCountry[state.order.customer.country].flat },
    }
    return generateFormInputs(inputs)
  }

  function generateInitialEditDeliverySectionBody() {
      if(state.order.delivery.condition === "Delivery") {
        return generateEditDeliverySectionBody(state.order.delivery.location, state.order.delivery.address)
      } else {
        $("#div-inputLocation").hide();
        return generateEditPickupSectionBody(state.order.delivery.address)
      }
  }