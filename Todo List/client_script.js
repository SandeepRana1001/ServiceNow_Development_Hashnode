api.controller = function ($scope, spUtil) {
  /* widget controller */
  var c = this;

  c.data = [];

  c.addItem = function () {
    var item = $scope.item;
    c.data.push(item);
    $scope.item = "";
  };

  c.deleteItem = function (indexToRemove, value) {
    if (indexToRemove > -1) {
      c.data.splice(indexToRemove, 1);
      spUtil.addInfoMessage(value + " Removed from the list");
    }
  };
};
