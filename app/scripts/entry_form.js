/* jshint latedef: nofunc */
/* globals $ */

/**
 * Initializes entry_form content scrip
 *
 */
function initEntryForm() {
  // Load entry_form_maps.js into script tag
  $('head')
    .append($('<script>')
      .load(chrome.extension.getURL('scripts/entry_form_maps.js'), initMapsAPI())
    );
}

/**
 * Initializes Google Maps API
 *
 */
function initMapsAPI() {
  // append Google Maps API script tag
  $('head')
    .append($('<script>')
      .attr('type', 'text/javascript')
      .attr('src', 'https://maps.googleapis.com/maps/api/js?signed_in=true&libraries=places&callback=initAutocomplete')
    );
}


function init() {
  // Load script if option si checked
  chrome.storage.sync.get(null, function (items) {
    console.log('mapsAutocomplete: ', items.mapsAutocomplete);
    if (items.mapsAutocomplete) {
      initEntryForm();
    }
  });
}

init();
