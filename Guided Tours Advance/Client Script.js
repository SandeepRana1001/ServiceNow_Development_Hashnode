// On Load Client Script

function onLoad() {
  //create a callback function to handle the result of the API call

  // navigate to sys_guided_tour_user_overrides_list table to check if tour is already played for user, if played, skip this script, else play this script
  var tourId = "236e7190c30d6a50c9cebe1d05013149";

  var isTourAlreadyPlayed = false;

  var gax = new GlideAjax("global.guided_tour_helper");
  gax.addParam("sysparm_name", "check_tours_auto_launch_status");
  gax.addParam("tour_id", tourId);
  gax.getXMLAnswer(function (answer) {
    isTourAlreadyPlayed = answer;
    if (isTourAlreadyPlayed == "false") {
      try {
        var cbFunction = function (err) {
          if (err) {
            // console.log('Error Occurred');
          } else {
            // console.log('The tour with tourid=%s was successfully launched', tourId);
          }
        };

        // Loading the player to play tour
        NOW.guided_tours.api.loadPlayer();

        //calling the startTour method
        top.NOW.guided_tours.api.startTour(tourId, 0, cbFunction);
      } catch (err) {
        // console.clear();
        // console.log(err);
      }
    } else {
      // alert('Tour was already Played');
      return false;
    }
  });
}
