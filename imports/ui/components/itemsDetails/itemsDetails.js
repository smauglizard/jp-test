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
    //this.sound = null;
   // this.perPage = 3;
   // this.page = 1;
   // this.searchText = '';

   // this.subscribe('items', function() {
   //   return [{
   //     limit: parseInt(this.getReactively('perPage')),
   //     skip: ((parseInt(this.getReactively('page'))) - 1) * (parseInt(this.getReactively('perPage'))),
   //     feedId: this.feedId
   //   }, this.getReactively('searchText') ];
   // });
 
    this.helpers({
      items() {
        return Items.find({
          feedId: $stateParams.feedId
        });
      }
      //,
      //itemsCount() {
      //  return Counts.get('numberOfItems');
      //}

    });
  }

  //pageChanged(newPage) {
  //  this.page = newPage;
  //}
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
