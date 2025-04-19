// Client Callable Script Include

var guided_tour_helper = Class.create();
guided_tour_helper.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  // check if tour is already played

  check_tours_auto_launch_record: function (tourID, user) {
    var glideman = new GlideRecord("sys_guided_tour_user_overrides");
    glideman.addEncodedQuery("tour=" + tourID + "^user=" + user);
    glideman.query();

    if (glideman.next()) {
      // there exists a record
      return true;
    }

    return false;
  },

  change_tours_auto_launch_status: function (tourID, status) {
    var glideman = new GlideRecord("sys_guided_tour_user_overrides");
    glideman.addEncodedQuery("tour=" + tourID + "^user=" + gs.getUserID());
    glideman.query();

    if (glideman.next()) {
      // there exists a record
      glideman.disable_autolaunch = status; // set status
      glideman.update(); // update status
    }
  },

  create_tours_auto_launch_status: function (tourID, status, user) {
    // create new record

    var glideman = new GlideRecord("sys_guided_tour_user_overrides");

    glideman.initialize();
    glideman.user = user;
    glideman.tour = tourID;
    glideman.disable_autolaunch = status;
    glideman.insert();
  },

  check_tours_auto_launch_status: function () {
    var tour_id = this.getParameter("tour_id");

    var glideman = new GlideRecord("sys_guided_tour_user_overrides");
    glideman.addEncodedQuery(
      "tour=" + tour_id + "^user=" + gs.getUserID() + "^disable_autolaunch=true"
    );
    glideman.query();

    if (glideman.next()) {
      // if tour is already played
      return true;
    } else {
      // if tour is not yet played or record doesn't exists

      var recordExists = this.check_tours_auto_launch_record(
        tour_id,
        gs.getUserID()
      );

      if (recordExists) {
        this.change_tours_auto_launch_status(tour_id, true);
      } else {
        this.create_tours_auto_launch_status(tour_id, true, gs.getUserID());
      }
    }

    return false;
  },
  type: "guided_tour_helper",
});
