(function () {
    'use strict';
    snApp.component('snHeader', {
        controllerAs: 'vm',
        controller: function (svc) {
            var ctrl = this;
            ctrl.tempUrl = svc.getTemplateUrl('glb-header.html');
        },
        template: "<div ng-include='vm.tempUrl'></div>",
        bindings: {
            title: '@'
        }
    });
    snApp.component('snTopNav', {
        controllerAs: 'vm',
        controller: function (svc) {
            var ctrl = this;
            ctrl.tempUrl = svc.getTemplateUrl('glb-top-nav.html');
            ctrl.$onInit = function () {
                svc.getTopNavigation().then(function (p) {
                    ctrl.navItems = p;
                });
            }
        },
        template: "<div ng-include='vm.tempUrl'></div>",
        bindings: {
            title: '@'
        }
    });
    snApp.component('snSearchBox', {
        controllerAs: 'vm',
        controller: function (svc) {
            var ctrl = this;
            ctrl.tempUrl = svc.getTemplateUrl('glb-search-box.html');
        },
        template: "<div ng-include='vm.tempUrl'></div>",
        bindings: {
            title: '@'
        }
    });
   
})();