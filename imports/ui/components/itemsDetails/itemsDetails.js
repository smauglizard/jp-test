import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './itemsDetails.html';
import { Items } from '../../../api/items';

class ItemsDetails {
  constructor($stateParams, $scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    this.feedId = $stateParams.feedId;
    this.sound = null;

    this.helpers({
      items() {
        return Items.find({
          feedId: $stateParams.feedId
        });
      }
    });
  }

//  save() {
//    Parties.update({
//      _id: this.party._id
//    }, {
//      $set: {
//        name: this.party.name,
//        description: this.party.description
//      }
//    }, (error) => {
//      if (error) {
//        console.log('Oops, unable to update the party...');
//      } else {
//        console.log('Done!');
//      }
//    });
//  }
//  play(url) {
//    this.sound = soundManager.createSound({
//      id: url,
//      url: url
//    });
//    this.sound.play();
//  }
//  stop() {
//    if(this.sound) {
//      this.sound.stop(); 
//    }
//  }
}

const name = 'itemsDetails';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter
]).component(name, {
  template,
  controllerAs: name,
  controller: ItemsDetails
})
  .config(config);

function config($stateProvider) {
  'ngInject';

  $stateProvider.state('itemsDetails', {
    url: '/feeds/:feedId',
    template: '<items-details></items-details>'
  });
}
