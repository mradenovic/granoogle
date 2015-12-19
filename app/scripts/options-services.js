'use strict';

/* globals angular */

angular.module('optionsApp')
  .service('optionsService', function () {

      var options = {
        mapsAutocomplete: {
          type: 'checkbox',
          value: true,
          label: 'Address autocomplete',
          description: 'Add autocomplete to address fields. It will also add a text field in the Extra Stop page.',
          disabled: false
        },
        mapsDirections: {
          type: 'checkbox',
          value: true,
          label: 'Directions',
          description: 'Add a Directions button in the Charges page. Directions can include a parking lot address and extra stops.',
          disabled: false
        },
        mapsParkingLot: {
          type: 'checkbox',
          value: true,
          label: 'Parking lot',
          description: 'Include the parking lot address as a starting point in directions.',
          disabled: '!options.mapsDirections.value'
        },
        mapsParkingLotAddress: {
          type: 'text',
          value: 'E 133rd St and Wiloow Ave, The Bronx',
          placeholder: 'Enter the parking lot address',
          class: 'form-control',
          label: 'Parking lot address',
          labelClass: 'sr-only',
          description: 'The address of the parking lot. It will be included as the starting point in directions.',
          disabled: '!(options.mapsDirections.value && options.mapsParkingLot.value)'
        },
        mapsExtraStops: {
          type: 'checkbox',
          value: true,
          label: 'Extra stops',
          description: 'Include extra stops between the origin and the destination in directions. Up to six extrastops can be added. Each extra stop address has to be enclosed in brackets (i.e. [Times Square, Manhattan, New York, NY 10036]).',
          disabled: '!options.mapsDirections.value'
        },
        emailSearch: {
          type: 'checkbox',
          value: true,
          label: 'Search in email',
          description: 'Add link to search for coversations in email on Charges page. Currently only Gmail is supported.',
          disabled: false
        }
      };
  
      this.getOptions = function() {
        return options;
      }
      
      this.getOption = function(optionName) {
        return options[optionName];
      }
      
    });
