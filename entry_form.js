/**
 * Loads Script from file and calls initialization function.
 *
 */
function loadScriptFromFile() {
  var fileURL = chrome.extension.getURL('entry_form_maps.js');
  var request = new XMLHttpRequest();
  request.open('GET', fileURL);
  request.onloadend = function() {
    initMapsAPI(request.responseText)
  }
  request.send();

}

/**
 * Initializes Google Maps API by loading scripts into current page.
 *
 */
function initMapsAPI(js) {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.textContent = js;
  document.body.appendChild(script);

  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = "https://maps.googleapis.com/maps/api/js?signed_in=true&libraries=places&callback=initAutocomplete";
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

function init() {
  // Load script if option si checked
  chrome.storage.sync.get('mapsAutocomplete', function(items) {
    console.log('mapsAutocomplete: ',items.mapsAutocomplete)
    if (items.mapsAutocomplete) {
      loadScriptFromFile();
    }
  });
}

init();


