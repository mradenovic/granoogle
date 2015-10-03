var parkinglotAddress;
var extraStops;

/**
 * Appends "Search in Gmail" link to email address.
 *
 */
function addGmailSearch() {
  var emailAnchor = document.querySelector('a[href="javascript: sendemail()"]');
  var email = emailAnchor.textContent;

  var gmailAnchor = document.createElement('a');
  gmailAnchor.innerHTML = ' <i class="material-icons md-12">search</i> in Gmail';
  gmailAnchor.href = 'https://mail.google.com/mail/u/0/#search/' + email;
  gmailAnchor.target = '_search_in_gmail'

  emailAnchor.appendChild(gmailAnchor);
}

/**
 * Appends "Search in Gmail" link to email address.
 *
 */
function addDirections() {
  $('[value="Extra Stop/Notes"]')
    .parent().after($('<td>')
      .attr('width','10%')
      .attr('align','center')
      .append($('<a>')
        .attr('href','#')
        .click(getDirections)
        .append($('<i>')
          .text('directions')
          .addClass('material-icons md-18')
      )
      )
    );
}

function getDirectionsLink() {
  var mapsLink = 'https://google.com/maps/dir/';

  // add parkinglot address
  if (parkinglotAddress != '') {
    mapsLink += parkinglotAddress + '/';
  }
  origin = $('.fromto:contains([o])').text().replace(/\[.\] /,'')
         + $('.fromto[width="63%"]').text() + ' '
         + $('.fromto[width="16%"]').text() + ' '
         + $('.fromto[width="21%"]').text() + '/';
  if (origin != '') {
    mapsLink += origin;
  }

  //Add exra stops
  if (extraStops) {
    for (i in extraStops) {
      var bracket = /[\[|\]]/g;
      mapsLink += extraStops[i].replace(bracket, '') + '/';
    }
  }

  // Add destination
  destination = $('.fromto:contains([d])').text().replace(/\[.\] /,'')
              + $('.fromto[width="60%"]').text() + ' '
              + $('.fromto[width="15%"]').text() + ' '
              + $('.fromto[width="25%"]').text() + '/';
  if (destination != '') {
    mapsLink += destination;
  }

  // Open link
  window.open(mapsLink, '_directions');
}

function getDirections() {
  var extraStopURL = document.URL.replace('mpcharge~chargeswc', 'mpest~extstopwc');
  extraStopWindow = window.open(extraStopURL,'_directions'); //, 'toolbar=no, directories=no, status=no, menubar=no, resizable=no, scrollbars=no,width=550,height=550');
  var int = setInterval(wait, 100);
  function wait() {
    if (extraStopWindow.getExtraStops) {
      clearInterval(int);
      extraStops = extraStopWindow.getExtraStops();
      extraStopWindow.close();
      getDirectionsLink();
    }
  }
}

/**
 * Appends style necessary for use of google material-icons font.
 *
 */
function appendStyle() {
  var link = document.createElement('link');
  link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  link.rel = 'stylesheet';
  document.body.appendChild(link);
}

/**
 * Initializes pages that match criteria.
 *
 */
function init() {
  chrome.storage.sync.get({
    mapsAutocomplete: 'true',
    mapsDirections: 'true',
    mapsParkinglotAddress: '',
    gmailSearch: 'true',
  }, function(items) {
    if (items.gmailSearch) {
      parkinglotAddress = items.mapsParkinglotAddress
      appendStyle();
      addGmailSearch();
      addDirections();
    }
  });
}

init();