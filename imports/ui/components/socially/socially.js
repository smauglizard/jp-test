import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';

import template from './socially.html';
import { name as FeedsList } from '../feedsList/feedsList';
import { name as ItemsDetails } from '../itemsDetails/itemsDetails';
import { name as Navigation } from '../navigation/navigation';
import { name as PlayItem } from '../playItem/playItem';
class Socially {}

const name = 'socially';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  FeedsList,
  ItemsDetails,
  Navigation,
  PlayItem,
  'accounts.ui'
]).component(name, {
  template,
  controllerAs: name,
  controller: Socially
})
  .config(config);

function config($locationProvider, $urlRouterProvider) {
  'ngInject';

  $locationProvider.html5Mode(true);

  $urlRouterProvider.otherwise('/feeds');
}
