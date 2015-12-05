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
                description: 'Add autocomplete to address fields. It will also add a text field in the Extra Stop page.',
                disabled: false
        },
            {
                name: 'mapsDirections',
                type: 'checkbox',
                value: true,
                label: 'Directions',
                description: 'Add a Directions button in the Charges page. Directions can include a parking lot address and extra stops.',
                disabled: false
        },
            {
                name: 'mapsParkingLot',
                type: 'checkbox',
                value: true,
                label: 'Parking lot',
                description: 'Include the parking lot address as a starting point in directions.',
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
                description: 'The address of the parking lot. It will be included as the starting point in directions.',
                disabled: '!(options[2].value && options[1].value)'
        },
            {
                name: 'mapsExtraStops',
                type: 'checkbox',
                value: false,
                label: 'Extra stops',
                description: 'Include extra stops between the origin and the destination in directions. Up to six extrastops can be added. Each extra stop addrees has to be enclosed in brackets (i.e. [Times Square, Manhattan, New York, NY 10036]).',
                disabled: '!(options[1].value)'
        },
            {
                name: 'emailSearch',
                type: 'checkbox',
                value: false,
                label: 'Search in email',
                description: 'Add link to search for coversations in email on Charges page. Currently only Gmail is supported.',
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