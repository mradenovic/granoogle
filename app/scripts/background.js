'use strict';

chrome.runtime.onInstalled.addListener(function (details) {
  chrome.runtime.openOptionsPage();
  console.log('previousVersion', details.previousVersion);
});

console.log('\'Allo \'Allo! Event Page');
