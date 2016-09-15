/* jshint camelcase: false */
/* exported initAutocomplete */
/* globals google*/

/**
 * Initializes autocomplete object
 */
function initAutocomplete() {
  console.log('initAutocomplete executed!');
  var addressInput = document.getElementById('address-input');
  var autocomplete = new google.maps.places.Autocomplete(
    addressInput, {
      types: ['address']
    });
  autocomplete.addListener('place_changed', function () {
    var textArea = document.getElementById('textarea');
    textArea.value += '\n[' + autocomplete.getPlace().formatted_address + ']\n';
    addressInput.value = '';
  });
}
