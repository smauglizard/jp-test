import angular from 'angular';
import angularMeteor from 'angular-meteor';
import { Meteor } from 'meteor/meteor';
//import uiRouter from 'angular-ui-router';
import { soundManager } from 'soundmanager2';
//import { Items } from '../../../api/items';


//class Player {
//  constructor($reactive, $timeout) {
//    'ngInject';
export default angular.module('player', [])
.factory('player', function() {
  //return {
  var current, data, direction, events, filter, lastPod, lastSound, pods, volume;
  console.log("soundManager status: soundManager is", soundManager);
  soundManager.setup({
    //flashVersion: 9,
    useHTML5Audio: true,
    preferFlash: false,
    debugMode: false,
    //url: 'node_modules/Soundmanager2/swf/'
  });
  pods = [];
  lastPod = {};
  lastSound = null;
  volume = 66;
  data = {
    feedSlug: ''
  };
  soundManager.setVolume(volume);
  events = {
    play: function() {
      return $timeout(function() {
        lastPod.paused = false;
        return lastPod.playing = true;
      });
    },
    stop: function() {
      return $timeout(function() {
        lastPod.paused = false;
        return lastPod.playing = false;
      });
    },
    pause: function() {
      return $timeout(function() {
        return lastPod.paused = true;
      });
    },
    resume: function() {
      return $timeout(function() {
        lastPod.paused = false;
        return lastPod.playing = true;
      });
    },
    finish: function() {
      return $timeout(function() {
        lastPod.paused = false;
        lastPod.playing = false;
        lastPod.position = '';
        return skip(lastPod);
      });
    },
    whileplaying: function() {
      return $timeout(function() {
        lastPod.playPercent = lastSound.position / getDurationEstimate(lastSound) * 100;
        lastPod.position = getTime(lastSound.position) + ' / ' + getTime(getDurationEstimate(lastSound));
       // if (lastPod.playPercent > 10 && !lastPod.reportedListen) {
       //   //lastPod.reportedListen = true;
       //   //return $http.post('/api/report-listen', {
       //   //  podId: lastPod._id
       //   self.addItem();
       //   //});
       // }
      });
    },
    whileloading: function() {
      return $timeout(function() {
        return lastPod.loadPercent = lastSound.bytesLoaded / lastSound.bytesTotal * 100;
      });
    },
    error: function(err) {
      return console.log(err);
    }
  };

  getTime = function(nMSec) {
    var min, nSec, sec;
    nSec = Math.floor(nMSec / 1000);
    min = Math.floor(nSec / 60);
    sec = nSec - (min * 60);
    return min + ':' + (sec < 10 ? '0' + sec : sec);
  };
  getDurationEstimate = function(oSound) {
    if (oSound.instanceOptions.isMovieStar) {
      return oSound.duration;
    } else {
      return oSound.durationEstimate || 0;
    }
  };
  skip = function(pod) {
    console.log("pod in skip is", pod);
    var foundPod, j, len, mpod;
    foundPod = false;
    if (!pod) {
      foundPod = true;
      pod = {
        url: ''
      };
    }
    for (j = 0, len = pods.length; j < len; j++) {
      mpod = pods[j];
      if (mpod.url === pod.url) {
        foundPod = true;
      } else {
        if (foundPod && mpod.displayed) {
          return togglePlay(mpod);
        }
      }
    }
  };
  togglePlay = function(item) {
    if (lastSound && lastSound.id === item.url) {
      if (lastSound.readyState !== 2) {
        if (lastSound.playState !== 1) {
          return lastSound.play();
        } else {
          return lastSound.togglePause();
        }
      }
    } else {
      if (lastSound) {
        soundManager.stop(lastSound.id);
        soundManager.unload(lastSound.id);
      }
      if (lastPod) {
        lastPod.playing = false;
        lastPod.position = '';
      }
      console.log('creating sound', item);
      lastSound = soundManager.createSound({
        id: item.url,
        url: decodeURI(item.url),
        onplay: events.play,
        onstop: events.stop,
        onpause: events.pause,
        onresume: events.resume,
        onfinish: events.finish,
        whileplaying: events.whileplaying,
        whileloading: events.whileloading,
        onerror: events.error
      });
      lastPod = item;
      lastSound.play();
      return soundManager.setVolume(volume);
    }
  };
  sortPods = function() {
    if (direction && direction.value === 'ASC') {
      return pods.sort(function(a, b) {
        return a.pubDate - b.pubDate;
      });
    } else {
      return pods.sort(function(a, b) {
        return b.pubDate - a.pubDate;
      });
    }
  };
  scrollABit = function() {
    return $timeout(function() {
      return $window.scrollTo($window.scrollX, $window.scrollY + 1);
    });
  };

  getPods = function() {
    return pods;
  };
  getPod = function() {
      return lastPod;
  };
  podClick = function(item) {
      console.log('podClick');
    if (!item) {
        return skip(null);
    } else {
        return togglePlay(item);
    }
  };
  setVolume = function(vol) {
      volume = vol;
      return soundManager.setVolume(volume);
  };
  getVolume = function() {
      return volume;
  };
  setPosition = function(pos) {
      var nMsecOffset;
      nMsecOffset = Math.floor(pos * getDurationEstimate(lastSound));
      if (!isNaN(nMsecOffset)) {
        nMsecOffset = Math.min(nMsecOffset, lastSound.duration);
      }
      if (!isNaN(nMsecOffset)) {
        lastSound.setPosition(nMsecOffset);
      }
      return lastSound.resume();
   };
    setFeedSlug = function(slug) {
      return data.feedSlug = slug;
    };

   getDirection = function() {
      if (direction && direction.value) {
        return direction.value;
      }
      return 'DESC';
    };

  getFilter = function() {
      if (filter && filter.value) {
        return filter.value;
      }
      return 'unlistened';
    };
    scrollABit = function() {
      return scrollABit();
    };
 //}
});
 // } // constructor close  
//}

//const name = 'player';
 
// create a module
//export default angular.module(name, [
//  angularMeteor,
  //uiRouter
//]).service("Player", Player);

