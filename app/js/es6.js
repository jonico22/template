(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $ = window.jQuery;

var MarvelApi = function () {
  function MarvelApi(key) {
    _classCallCheck(this, MarvelApi);

    // constructor se llama cuando instanciamos nuestra clase con new MarvelApi()
    this.key = key;
    this.baseUrl = 'http://gateway.marvel.com/v1/public/';
    // asignar propiedades a this
  }

  _createClass(MarvelApi, [{
    key: 'findSeries',
    value: function findSeries(title) {
      var url = this.baseUrl + 'series?title=' + title + '&apikey=' + this.key;
      // construimos la url que se necesita para obtener datos de los avengers

      // siempre pide datos a la API de marvel
      if (localStorage[url]) {
        var datos = localStorage[url];
        datos = JSON.parse(datos);
        console.log('Hola desde el cache');
        return Promise.resolve(datos);
      } else {
        return Promise.resolve($.get(url))
        // hace que la peticion de jQuery se vuelva una Promise
        .then(function (res) {
          var datos = res.data.results[0];
          datos = JSON.stringify(datos);
          localStorage[url] = datos;
          // regresamos una nueva promesa con el
          // primer resultado de acuerdo a lo que nos regresa marvel
          return Promise.resolve(datos);
        });
      }
    }
  }, {
    key: 'getResourceURI',
    value: function getResourceURI(resourceURI) {
      // este metodo es muy similar al de arriba.
      // ¿Podrías crear un método interno al que llamen estos dos?
      var url = resourceURI + '?apikey=' + this.key;
      if (localStorage[url]) {
        var datos = localStorage[url];
        datos = JSON.parse(datos);
        console.log('Hola desde el cache');
        return Promise.resolve(datos);
      }

      return Promise.resolve($.get(url)).then(function (res) {
        var datos = res.data.results[0];
        datos = JSON.stringify(datos);
        localStorage[url] = datos;
        return Promise.resolve(datos);
      });
    }
  }, {
    key: 'searchCharacter',
    value: function searchCharacter(name) {
      // 'http://gateway.marvel.com/v1/public/'
      // /characters?name=man&apikey=a548aee0bde874ea460773884934a865
      var url = this.baseUrl + '/characters?name=' + name + '&apikey=' + this.key;
      return new Promise(function (done) {
        $.get(url).done(function (data) {
          done(data);
        });
      }).then(function (res) {
        // falsy -> 0, '', null, undefined, NaN
        // !0, !'', !null, !undefined, !NaN -> true
        if (!res.data.total) {
          return Promise.reject('no se encontro el personaje');
        }
        return res.data.results[0];
      });
    }
  }]);

  return MarvelApi;
}();

window.MarvelApi = MarvelApi;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvanMvZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FDQUEsSUFBSSxJQUFJLE9BQU8sTUFBZjs7SUFFTSxTO0FBQ0oscUJBQWEsR0FBYixFQUFrQjtBQUFBOztBQUNoQjtBQUNBLFNBQUssR0FBTCxHQUFXLEdBQVg7QUFDQSxTQUFLLE9BQUwsR0FBZSxzQ0FBZjtBQUNBO0FBQ0Q7Ozs7K0JBRVcsSyxFQUFPO0FBQ2pCLFVBQUksTUFBUyxLQUFLLE9BQWQscUJBQXFDLEtBQXJDLGdCQUFxRCxLQUFLLEdBQTlEO0FBQ0E7O0FBRUE7QUFDQSxVQUFJLGFBQWEsR0FBYixDQUFKLEVBQXVCO0FBQ3JCLFlBQUksUUFBUSxhQUFhLEdBQWIsQ0FBWjtBQUNBLGdCQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBUjtBQUNBLGdCQUFRLEdBQVIsQ0FBWSxxQkFBWjtBQUNBLGVBQU8sUUFBUSxPQUFSLENBQWdCLEtBQWhCLENBQVA7QUFDRCxPQUxELE1BS087QUFDTCxlQUFPLFFBQVEsT0FBUixDQUFnQixFQUFFLEdBQUYsQ0FBTSxHQUFOLENBQWhCO0FBQ1A7QUFETyxTQUVOLElBRk0sQ0FFRCxVQUFDLEdBQUQsRUFBUztBQUNiLGNBQUksUUFBUSxJQUFJLElBQUosQ0FBUyxPQUFULENBQWlCLENBQWpCLENBQVo7QUFDQSxrQkFBUSxLQUFLLFNBQUwsQ0FBZSxLQUFmLENBQVI7QUFDQSx1QkFBYSxHQUFiLElBQW9CLEtBQXBCO0FBQ0E7QUFDQTtBQUNBLGlCQUFPLFFBQVEsT0FBUixDQUFnQixLQUFoQixDQUFQO0FBQ0QsU0FUTSxDQUFQO0FBVUQ7QUFDRjs7O21DQUVlLFcsRUFBYTtBQUMzQjtBQUNBO0FBQ0EsVUFBSSxNQUFTLFdBQVQsZ0JBQStCLEtBQUssR0FBeEM7QUFDQSxVQUFJLGFBQWEsR0FBYixDQUFKLEVBQXVCO0FBQ3JCLFlBQUksUUFBUSxhQUFhLEdBQWIsQ0FBWjtBQUNBLGdCQUFRLEtBQUssS0FBTCxDQUFXLEtBQVgsQ0FBUjtBQUNBLGdCQUFRLEdBQVIsQ0FBWSxxQkFBWjtBQUNBLGVBQU8sUUFBUSxPQUFSLENBQWdCLEtBQWhCLENBQVA7QUFDRDs7QUFFRCxhQUFPLFFBQVEsT0FBUixDQUFnQixFQUFFLEdBQUYsQ0FBTSxHQUFOLENBQWhCLEVBQ04sSUFETSxDQUNELFVBQUMsR0FBRCxFQUFTO0FBQ2IsWUFBSSxRQUFRLElBQUksSUFBSixDQUFTLE9BQVQsQ0FBaUIsQ0FBakIsQ0FBWjtBQUNBLGdCQUFRLEtBQUssU0FBTCxDQUFlLEtBQWYsQ0FBUjtBQUNBLHFCQUFhLEdBQWIsSUFBb0IsS0FBcEI7QUFDQSxlQUFPLFFBQVEsT0FBUixDQUFnQixLQUFoQixDQUFQO0FBQ0QsT0FOTSxDQUFQO0FBT0Q7OztvQ0FFZ0IsSSxFQUFNO0FBQ3JCO0FBQ0E7QUFDQSxVQUFJLE1BQVMsS0FBSyxPQUFkLHlCQUF5QyxJQUF6QyxnQkFBd0QsS0FBSyxHQUFqRTtBQUNBLGFBQU8sSUFBSSxPQUFKLENBQVksVUFBVSxJQUFWLEVBQWdCO0FBQ2pDLFVBQUUsR0FBRixDQUFNLEdBQU4sRUFBVyxJQUFYLENBQWdCLFVBQVUsSUFBVixFQUFnQjtBQUM5QixlQUFLLElBQUw7QUFDRCxTQUZEO0FBR0QsT0FKTSxFQUtOLElBTE0sQ0FLRCxVQUFVLEdBQVYsRUFBZTtBQUNuQjtBQUNBO0FBQ0EsWUFBSSxDQUFDLElBQUksSUFBSixDQUFTLEtBQWQsRUFBcUI7QUFDbkIsaUJBQU8sUUFBUSxNQUFSLENBQWUsNkJBQWYsQ0FBUDtBQUNEO0FBQ0QsZUFBTyxJQUFJLElBQUosQ0FBUyxPQUFULENBQWlCLENBQWpCLENBQVA7QUFDRCxPQVpNLENBQVA7QUFhRDs7Ozs7O0FBR0gsT0FBTyxTQUFQLEdBQW1CLFNBQW5CIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciAkID0gd2luZG93LmpRdWVyeVxuXG5jbGFzcyBNYXJ2ZWxBcGkge1xuICBjb25zdHJ1Y3RvciAoa2V5KSB7XG4gICAgLy8gY29uc3RydWN0b3Igc2UgbGxhbWEgY3VhbmRvIGluc3RhbmNpYW1vcyBudWVzdHJhIGNsYXNlIGNvbiBuZXcgTWFydmVsQXBpKClcbiAgICB0aGlzLmtleSA9IGtleVxuICAgIHRoaXMuYmFzZVVybCA9ICdodHRwOi8vZ2F0ZXdheS5tYXJ2ZWwuY29tL3YxL3B1YmxpYy8nXG4gICAgLy8gYXNpZ25hciBwcm9waWVkYWRlcyBhIHRoaXNcbiAgfVxuXG4gIGZpbmRTZXJpZXMgKHRpdGxlKSB7XG4gICAgbGV0IHVybCA9IGAke3RoaXMuYmFzZVVybH1zZXJpZXM/dGl0bGU9JHt0aXRsZX0mYXBpa2V5PSR7dGhpcy5rZXl9YFxuICAgIC8vIGNvbnN0cnVpbW9zIGxhIHVybCBxdWUgc2UgbmVjZXNpdGEgcGFyYSBvYnRlbmVyIGRhdG9zIGRlIGxvcyBhdmVuZ2Vyc1xuXG4gICAgLy8gc2llbXByZSBwaWRlIGRhdG9zIGEgbGEgQVBJIGRlIG1hcnZlbFxuICAgIGlmIChsb2NhbFN0b3JhZ2VbdXJsXSkge1xuICAgICAgbGV0IGRhdG9zID0gbG9jYWxTdG9yYWdlW3VybF1cbiAgICAgIGRhdG9zID0gSlNPTi5wYXJzZShkYXRvcylcbiAgICAgIGNvbnNvbGUubG9nKCdIb2xhIGRlc2RlIGVsIGNhY2hlJylcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0b3MpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoJC5nZXQodXJsKSlcbiAgICAgIC8vIGhhY2UgcXVlIGxhIHBldGljaW9uIGRlIGpRdWVyeSBzZSB2dWVsdmEgdW5hIFByb21pc2VcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgbGV0IGRhdG9zID0gcmVzLmRhdGEucmVzdWx0c1swXVxuICAgICAgICBkYXRvcyA9IEpTT04uc3RyaW5naWZ5KGRhdG9zKVxuICAgICAgICBsb2NhbFN0b3JhZ2VbdXJsXSA9IGRhdG9zXG4gICAgICAgIC8vIHJlZ3Jlc2Ftb3MgdW5hIG51ZXZhIHByb21lc2EgY29uIGVsXG4gICAgICAgIC8vIHByaW1lciByZXN1bHRhZG8gZGUgYWN1ZXJkbyBhIGxvIHF1ZSBub3MgcmVncmVzYSBtYXJ2ZWxcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShkYXRvcylcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZ2V0UmVzb3VyY2VVUkkgKHJlc291cmNlVVJJKSB7XG4gICAgLy8gZXN0ZSBtZXRvZG8gZXMgbXV5IHNpbWlsYXIgYWwgZGUgYXJyaWJhLlxuICAgIC8vIMK/UG9kcsOtYXMgY3JlYXIgdW4gbcOpdG9kbyBpbnRlcm5vIGFsIHF1ZSBsbGFtZW4gZXN0b3MgZG9zP1xuICAgIGxldCB1cmwgPSBgJHtyZXNvdXJjZVVSSX0/YXBpa2V5PSR7dGhpcy5rZXl9YFxuICAgIGlmIChsb2NhbFN0b3JhZ2VbdXJsXSkge1xuICAgICAgbGV0IGRhdG9zID0gbG9jYWxTdG9yYWdlW3VybF1cbiAgICAgIGRhdG9zID0gSlNPTi5wYXJzZShkYXRvcylcbiAgICAgIGNvbnNvbGUubG9nKCdIb2xhIGRlc2RlIGVsIGNhY2hlJylcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZGF0b3MpXG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgkLmdldCh1cmwpKVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGxldCBkYXRvcyA9IHJlcy5kYXRhLnJlc3VsdHNbMF1cbiAgICAgIGRhdG9zID0gSlNPTi5zdHJpbmdpZnkoZGF0b3MpXG4gICAgICBsb2NhbFN0b3JhZ2VbdXJsXSA9IGRhdG9zXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGRhdG9zKVxuICAgIH0pXG4gIH1cblxuICBzZWFyY2hDaGFyYWN0ZXIgKG5hbWUpIHtcbiAgICAvLyAnaHR0cDovL2dhdGV3YXkubWFydmVsLmNvbS92MS9wdWJsaWMvJ1xuICAgIC8vIC9jaGFyYWN0ZXJzP25hbWU9bWFuJmFwaWtleT1hNTQ4YWVlMGJkZTg3NGVhNDYwNzczODg0OTM0YTg2NVxuICAgIGxldCB1cmwgPSBgJHt0aGlzLmJhc2VVcmx9L2NoYXJhY3RlcnM/bmFtZT0ke25hbWV9JmFwaWtleT0ke3RoaXMua2V5fWBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGRvbmUpIHtcbiAgICAgICQuZ2V0KHVybCkuZG9uZShmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBkb25lKGRhdGEpXG4gICAgICB9KVxuICAgIH0pXG4gICAgLnRoZW4oZnVuY3Rpb24gKHJlcykge1xuICAgICAgLy8gZmFsc3kgLT4gMCwgJycsIG51bGwsIHVuZGVmaW5lZCwgTmFOXG4gICAgICAvLyAhMCwgIScnLCAhbnVsbCwgIXVuZGVmaW5lZCwgIU5hTiAtPiB0cnVlXG4gICAgICBpZiAoIXJlcy5kYXRhLnRvdGFsKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgnbm8gc2UgZW5jb250cm8gZWwgcGVyc29uYWplJylcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXMuZGF0YS5yZXN1bHRzWzBdXG4gICAgfSlcbiAgfVxufVxuXG53aW5kb3cuTWFydmVsQXBpID0gTWFydmVsQXBpIl19
