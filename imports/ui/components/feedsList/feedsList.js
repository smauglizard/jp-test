import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './feedsList.html';
import { Feeds } from '../../../api/feeds';
import { name as PartyAdd } from '../partyAdd/partyAdd';
import { name as PartyRemove } from '../partyRemove/partyRemove';

class FeedsList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);
    
    this.subscribe('feeds', function() {
      return [{
      //sort: this.getReactively('sort'),
        limit: parseInt(this.getReactively('perPage')),
        skip: ((parseInt(this.getReactively('page'))) - 1) * (parseInt(this.getReactively('perPage')))
      }, this.getReactively('searchText')];
    });

    this.helpers({
      feeds() {
        return Feeds.find({});
      }
      //,
      //feedsCount() {
      //  return Counts.get('numberOfFeeds');
      //}
    });
  }
}

const name = 'feedsList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  PartyAdd,
  PartyRemove
]).component(name, {
  template,
  controllerAs: name,
  controller: FeedsList
})
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('feeds', {
      url: '/feeds',
      template: '<feeds-list></feeds-list>'
    });
}
