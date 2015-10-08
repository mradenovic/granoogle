// Do not use markers in address field
var useMarker = false;

var originAutocomplete, destAutocomplete;
var componentForm = {
  //street_number: 'short_name',
  //route: 'short_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  postal_code: 'short_name'
};

/**
 * Map input fields to address types.
 *
 * Prefix 'o_' is used for origin and prefix 'd_' is used for destination.
 *
 */
var inputFields = {
    o_name: 'SADD1',
    o_locality: 'SCITY',
    o_postal_code: 'SZIP',
    o_administrative_area_level_1: 'SSTATE',
    d_name: 'RADD1',
    d_locality: 'RCITY',
    d_postal_code: 'RZIP',
    d_administrative_area_level_1: 'RSTATE'
}

setIDs();

/**
 * Sets IDs for input fields that are used for autocomplete.
 *
 */
 function setIDs() {
  for (var field in inputFields) {
    var name = inputFields[field];
    document.querySelector('[name="' + name + '"]').id = field;
  }
}

/**
 * Initializes autocomplete objects for origin and destination fields.
 *
 */
function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  originAutocomplete = new google.maps.places.Autocomplete(
      /** @type {!HTMLInputElement} */(document.querySelector('[name="SADD1"]')),
      {types: ['address']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  originAutocomplete.addListener('place_changed', (function (inputPrefix) {
    return function(){ updateAddressFields(inputPrefix) }
    })('o_'));

  destAutocomplete = new google.maps.places.Autocomplete(
      (document.querySelector('[name="RADD1"]')),
      {types: ['address']});
  destAutocomplete.addListener('place_changed', (function (inputPrefix) {
    return function(){ updateAddressFields(inputPrefix) }
    })('d_'));
}

/**
 * Updates address input fields.
 *
 * @param {String} inputPrefix - prefix of input fields to be updated ('o_' for origin, 'd_' for destination)
 */
 function updateAddressFields(inputPrefix) {
  // Get the place details from the autocomplete object.
  var prefix = inputPrefix;
  var name = '';
  var place;
  if (prefix == 'o_') { place = originAutocomplete.getPlace() };
  if (prefix == 'd_') { place = destAutocomplete.getPlace() };
  if (useMarker) {
    name += '[' + prefix[0] + '] ';
  }
  name += place.name;
  document.getElementById(prefix + 'name').value = name;

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(prefix + addressType).value = val;
    }
  }
}