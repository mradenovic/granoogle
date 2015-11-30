// Saves options to chrome.storage
function save_options() {
  var mapsAutocomplete = document.getElementById('mapsAutocomplete').checked;
  var mapsDirections = document.getElementById('mapsDirections').checked;
  var mapsParkinglotAddress = document.getElementById('mapsParkinglotAddress').value;
  var gmailSearch = document.getElementById('gmailSearch').checked;
  chrome.storage.sync.set({
    mapsAutocomplete: mapsAutocomplete,
    mapsDirections: mapsDirections,
    mapsParkinglotAddress: mapsParkinglotAddress,
    gmailSearch: gmailSearch
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {

  // Use default value color = 'red' and likesColor = true
  chrome.storage.sync.get('gmailSearch', function(items) {
    console.log('items: ',items);
    console.log('gmailSearch: ',items.gmailSearch);
  });
  // Use default value color = 'red' and likesColor = true
  chrome.storage.sync.get(null, function(items) {
    console.log(items);
  });

  chrome.storage.sync.get({
    mapsAutocomplete: 'true',
    mapsDirections: 'true',
    mapsParkinglotAddress: '',
    gmailSearch: 'true',
  }, function(items) {
    document.getElementById('mapsAutocomplete').checked = items.mapsAutocomplete;
    document.getElementById('mapsDirections').checked = items.mapsDirections;
    document.getElementById('mapsParkinglotAddress').value = items.mapsParkinglotAddress;
    document.getElementById('gmailSearch').checked = items.gmailSearch;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
