'use strict';

// Angular
angular.module('optionsApp', [])
    .controller('OptionsController', ['$scope', function ($scope) {

        $scope.options = [
            {
                name: 'mapsAutocomplete',
                type: 'checkbox',
                value: true,
                label: 'Address autocomplete',
                description: 'Add autocomplete to address fields',
                disabled: false
        },
            {
                name: 'mapsDirections',
                type: 'checkbox',
                value: true,
                label: 'Directions',
                description: 'Add directions button next to the Extra stop button. Directions can include parking lot and extra stops',
                disabled: false
        },
            {
                name: 'mapsParkingLot',
                type: 'checkbox',
                value: true,
                label: 'Parking lot',
                description: 'Add Parkin Lot address to the directions',
                disabled: '!(options[1].value)'
        },
            {
                name: 'mapsParkingLotAddress',
                type: 'text',
                value: '',
                placeholder: 'Enter the parking lot address',
                class: 'form-control',
                label: 'Parking lot address',
                labelClass: 'sr-only',
                description: 'The address of the parking lot',
                disabled: '!(options[2].value && options[1].value)'
        },
            {
                name: 'mapsExtraStops',
                type: 'checkbox',
                value: false,
                label: 'Extra stops',
                description: 'Add extra stops to the directions. Up to six extrastops can be added.',
                disabled: '!(options[1].value)'
        },
            {
                name: 'emailSearch',
                type: 'checkbox',
                value: false,
                label: 'Search in email',
                description: 'Search for coversations in email.',
                disabled: false
        }
    ];
        
        $scope.saveOptions = function() {
            saveOptions($scope.options);
        }


        /************************
         *  ALL FUNCTIONS HERE
         ************************/

        // Get option list
        function getOptions(modelOptions) {
            var opt = modelOptions;
            var options = {};
            for (var i = 0; i < opt.length; i++) {
                //create options object for saving and restorig options    
                options[opt[i].name] = opt[i].value;
            };
            return options;
        }

        // Update option values
        function setOptionValues(options, modelOptions) {
            for (var option in options) {
                modelOptions.filter(function (modelOption) {
                    if (modelOption.name == option) {
                        modelOption.value = options[option];
                    };
                });
            };
        }

        function saveOptions(modelOptions) {
            var options = getOptions(modelOptions);

            chrome.storage.sync.set(options, function () {
                console.log('saveOptions() options: ', options);

                updateStatus('Options saved')
            });
        }

        function restoreOptions(modelOptions) {
            var options = getOptions(modelOptions);

            chrome.storage.sync.get(options, function (storedOptions) {
                setOptionValues(storedOptions, modelOptions);
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
//document.addEventListener('DOMContentLoaded', restore_options);


// restoreOptions();
//angular.element(document).ready($scope.restoreOptions);