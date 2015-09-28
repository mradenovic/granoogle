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
function addDirections(parkinglotAddress) {
  $('[value="Extra Stop/Notes"]')
    .parent().after($('<td>')
      .attr('width','10%')
      .attr('align','center')
      .append($('<a>')
        .attr('href',getDirectionsLink(parkinglotAddress))
        .attr('target','_directions')
        .append($('<i>')
          .text('directions')
          .addClass('material-icons md-18')
      )
      )
    );
}

function getDirectionsLink(parkinglotAddress) {
  var mapsLink = 'https://google.com/maps/dir/';
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
  destination = $('.fromto:contains([d])').text().replace(/\[.\] /,'')
              + $('.fromto[width="60%"]').text() + ' '
              + $('.fromto[width="15%"]').text() + ' '
              + $('.fromto[width="25%"]').text() + '/';
  if (destination != '') {
    mapsLink += destination;
  }
  console.log(mapsLink.replace(' ', '+'));
  return mapsLink;
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
      appendStyle();
      addGmailSearch();
      addDirections(items.mapsParkinglotAddress);
    }
  });
}

init();