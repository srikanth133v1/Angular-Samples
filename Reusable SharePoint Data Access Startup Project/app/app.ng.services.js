(function () {
    'use strict';

    snApp.factory('svc', ['$http', '$q', function ($http, $q) {
        var _siteUrl = _spPageContextInfo.siteServerRelativeUrl;
        var _webUrl = _spPageContextInfo.webServerRelativeUrl;
        var _getConfig = {
            headers: { 'accept': 'application/json;odata=verbose' }
        }

        function _getSPItems(endpoint) {
            return $http.get(endpoint, _getConfig).then(function (d) {
                return d.data.d.results;
            });
        }
        function _getSPNav(endpoint) {
            return $http.get(endpoint, _getConfig).then(function (d) {
                return d.data.d.MenuState.Nodes.results;
            });
        }

        function _getSPRefinerResults(endpoint) {
            return $http.get(endpoint, _getConfig).then(function (d) {
                var results = d.data.d.query.PrimaryQueryResult.RefinementResults.Refiners.results;
                return results;
            });
        }

        function _getSPRelevantResults(endpoint) {
            return $http.get(endpoint, _getConfig).then(function (d) {
                var results = d.data.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results;
                var col = [];
                results.forEach(function (rItem) {
                    var item = {};
                    rItem.Cells.results.forEach(function (cell) {
                        item[cell.Key] = cell.Value;
                    });
                    col.push(item);
                });
                return col;
            });
        }

        function _getHmImageUrl(endPoint) {
            return $http.get(endPoint, _getConfig).then(function (d) {
                var imgTag = d.data.d.hmImage;
                return _getImgSrcValue(imgTag);
            });
        }
        function _getModifiedBy(endPoint) {
            var regex = /ID=.*>(.*)<\/a/;
            return $http.get(endPoint, _getConfig).then(function (d) {
                var match = regex.exec(d.data.d.Editor);
                return (match != null) ? match[1] : "";;
            });
        }
        function _getFormattedDate(dateTime) {
            return SP.DateTimeUtil.SPRelativeDateTime.getRelativeDateTimeString(new Date(dateTime),
                            true, SP.DateTimeUtil.SPCalendarType.none, false);
        }

        function _getImgSrcValue(imgTag) {
            var src = '';
            if (imgTag) {
                var regex = /<img.*?src="(.*?)"/;
                src = (regex.exec(imgTag) !== null) ? regex.exec(imgTag)[1] : '';
                src = (src.indexOf("?") > 0) ? src.substring(0, src.indexOf("?")) : src;
            }
            return src;
        }

        function _isEditMode() {
            var inDesignMode = (document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode) ? document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value : '';
            if (inDesignMode == "1") {
                return true;
            }
            var wikiInEditMode = (document.forms[MSOWebPartPageFormName]._wikiPageMode) ? document.forms[MSOWebPartPageFormName]._wikiPageMode.value : '';            if (wikiInEditMode == "Edit") {
                return true;
            }
            return false;

        }


        return {
            getSiteUrl: function () {
                return _siteUrl;
            },
            getTemplateUrl: function (templateName) {
                return _siteUrl + "/style library/kanth/app/templates/" + templateName;
            },
            getImagesDirUrl: function () {
                return _siteUrl + "/style library/kanth/design/images/";
            },
            getTopNavigation: function () {
                return _getSPNav(_siteUrl + "/_api/navigation/menustate?mapprovidername='GlobalNavigationSwitchableProvider'");
            },
            isEditMode: function () {
                return _isEditMode();
            }

        }

    }]);//ends svc function

})();//main anonymous function