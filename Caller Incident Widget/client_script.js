api.controller = function ($scope) {
  /* widget controller */
  var c = this;

  $scope.caller = null;

  $scope.getIncidentRecords = function () {
    c.data.sys_id = $scope.caller;
    c.server.update();
  };
};
