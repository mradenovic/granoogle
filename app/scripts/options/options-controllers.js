'use strict';

/* globals angular */

// Angular
angular.module('optionsApp')
  .controller('OptionsController', ['$scope', 'optionsService', function ($scope, optionsService) {

    $scope.options = optionsService.getOptions();

    $scope.saveOptions = function () {
      saveOptions($scope.options);
    };

    /************************
     *  ALL FUNCTIONS HERE
     ************************/

    // Get option list
    function getOptions(modelOptions) {
      var options = {};
      for (var option in modelOptions) {
        //create options object for saving and restorig options    
        options[option] = modelOptions[option].value;
      }
      return options;
    }

    // Update option values
    function setOptionValues(options, modelOptions) {
      for (var option in options) {
        modelOptions[option].value = options[option];
      }
    }

    function saveOptions(modelOptions) {
      var options = getOptions(modelOptions);

      chrome.storage.sync.set(options, function () {
        updateStatus('Options saved');
      });
    }

    function restoreOptions(modelOptions) {
      var options = getOptions(modelOptions);

      chrome.storage.sync.get(options, function (storedOptions) {
        setOptionValues(storedOptions, modelOptions);
        saveOptions(modelOptions);
        $scope.$apply();

        updateStatus('Options retrived');
      });
    }

    function updateStatus(message) {
      var status = document.getElementById('status');
      status.textContent = message;
      setTimeout(function () {
        status.textContent = '';
      }, 750);
    }

    angular.element(document).ready(restoreOptions($scope.options));
  }]);
