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
      addGmailSearch();
      appendStyle();
    }
  });
}

init();