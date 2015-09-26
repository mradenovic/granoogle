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
        .attr('href','https://google.com/maps/dir/')
        .attr('target','_directions')
        .append($('<i>')
          .text('directions')
          .addClass('material-icons md-18')
      )
      )
    );
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
  chrome.storage.sync.get('gmailSearch', function(items) {
    if (items.gmailSearch) {
      addDirections();
      appendStyle();
      addGmailSearch();
    }
  });
}

init();