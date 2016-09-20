/* jshint latedef: false */
/* globals $ */

// Do not use markers in address field
// TODO move useMarker to options window and remove hardcoded one
var useMarker = false;

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
  gmailAnchor.target = '_search_in_gmail';

  emailAnchor.appendChild(gmailAnchor);
}

/**
 * Appends "Search in Gmail" link to email address.
 *
 */
function addDirections(options) {
  $('[value="Extra Stop/Notes"]')
    .parent().after($('<td>')
      .attr('width', '10%')
      .attr('align', 'center')
      .append($('<a>')
        .attr('href', '#')
        .click(function () {
          getDirections(options);
        })
        .append($('<i>')
          .text('directions')
          .addClass('material-icons md-18')
        )
      )
    );
}

function getOrigin() {
  var origin;
  if (useMarker) {
    origin = $('.fromto:contains([o])').text().replace(/\[.\] /, '');
  } else {
    origin = $('td:not([height])[width="100%"][ colspan="3"][class!="FROMTO"]').parent().next().children()[0].textContent;
    if (!origin.match(/^\d/)) {
      origin = '';
    }
  }
  origin += ', ' +
    $('.fromto[width="63%"]').text() + ' ' +
    $('.fromto[width="16%"]').text() + ' ' +
    $('.fromto[width="21%"]').text() + '/';
  return origin;
}

function getDestination() {
  var destination;
  if (useMarker) {
    destination = $('.fromto:contains([d])').text().replace(/\[.\] /, '');
  } else {
    destination = $('td:not([height])[width="100%"][ colspan="3"][class!="FROMTO"]').parent().next().children()[1].textContent;
    if (!destination.match(/^\d/)) {
      destination = '';
    }
  }
  destination += ', ' +
    $('.fromto[width="60%"]').text() + ' ' +
    $('.fromto[width="15%"]').text() + ' ' +
    $('.fromto[width="25%"]').text() + '/';
  return destination;
}

function getDirectionsLink(options) {
  var mapsLink = 'https://google.com/maps/dir/';

  if (options.mapsParkingLot && options.mapsParkingLotAddress !== '') {
    mapsLink += parkinglotAddress + '/';
  }

  mapsLink += getOrigin();

  if (options.mapsExtraStops && extraStops) {
    for (var i in extraStops) {
      var bracket = /[\[|\]]/g;
      mapsLink += extraStops[i].replace(bracket, '') + '/';
    }
  }

  mapsLink += getDestination();

  window.open(mapsLink, '_directions');
}

function getDirections(options) {
  // Load extra stops only if option is selected
  // TODO check if extra stops checkmark exist
  var hasExtraStop = false;
  if (options.mapsExtraStops) {
    hasExtraStop = true;
  }
  if (options.mapsExtraStops && hasExtraStop) {
    var extraStopURL = document.URL.replace('mpcharge~chargeswc', 'mpest~extstopwc');
    var extraStopWindow = window.open(extraStopURL, '_directions'); //, 'toolbar=no, directories=no, status=no, menubar=no, resizable=no, scrollbars=no,width=550,height=550');

    function wait() {
      if (extraStopWindow.getExtraStops) {
        clearInterval(int);
        extraStops = extraStopWindow.getExtraStops();
        extraStopWindow.close();
        getDirectionsLink(options);
      }
    }
    var int = setInterval(wait, 100);
  } else {
    getDirectionsLink(options);
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
  chrome.storage.sync.get(null, function (items) {
    if (items.emailSearch || items.mapsDirections) {
      appendStyle();
    }
    if (items.emailSearch) {
      addGmailSearch();
    }
    if (items.mapsDirections) {
      parkinglotAddress = items.mapsParkingLotAddress;
      addDirections(items);
    }
  });
}

init();
