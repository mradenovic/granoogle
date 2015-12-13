/* jshint latedef: nofunc*/
/* exported getExtraStops */
/* globals $*/

/**
 * Initializes extra_stop content scrip
 *
 */
function initExtraStop() {
  // append address input field
  $('textarea')
    .attr('id', 'textarea')
    .attr('title', 'Enclose the address in square brackets, i.e. [NY 11101]')
    .parent().parent().before($(document.createElement('tr'))
      .append($(document.createElement('td'))
        .attr('width', '100%')
        .attr('align', 'center')
        .append($(document.createElement('input'))
          .attr('id', 'address-input')
          .attr('type', 'text')
          .attr('size', '60')
          .attr('placeholder', 'Enter an extra stop location and press enter')
        )
      )
    );

  // Suppress submit on enter
  $('form').on('keyup keypress', function (e) {
    var code = e.keyCode || e.which;
    if (code === 13) {
      e.preventDefault();
      return false;
    }
  });

  // Load extra_stop.js into script tag
  $('head')
    .append($('<script>')
      .load(chrome.extension.getURL('scripts/extra_stop_maps.js'), initMapsAPI())
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

function getExtraStops() {
  var re = /\[.*\]/g;
  var extraStops = $('textarea').val().match(re);
  return extraStops;
}

function init() {
  chrome.storage.sync.get(null, function (items) {
    if (items.mapsAutocomplete) {
      initExtraStop();
    }
  });
}

init();
