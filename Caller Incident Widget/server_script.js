(function () {
  /* populate the 'data' object */
  /* e.g., data.table = $sp.getValue('table'); */
  data.incident_nums = [];
  data.callers = [];

  var obj = {};

  var glide = new GlideAggregate("incident");
  glide.groupBy("caller_id");
  glide.addAggregate("Count");
  glide.query();

  var arr = [];
  while (glide.next()) {
    obj = {};
    var caller = glide.getDisplayValue("caller_id");
    var count = glide.getAggregate("Count");
    var caller_sys_id = glide.caller_id.toString();

    var str = caller + "(" + count + ")";
    obj.sys_id = caller_sys_id;
    obj.name = str;
    arr.push(obj);
  }

  data.callers = arr;

  if (input.sys_id) {
    var glides = new GlideRecord("incident");
    glides.addEncodedQuery("caller_id=" + input.sys_id);
    glides.query();

    while (glides.next()) {
      obj = {
        number: glides.number.toString(),
      };
      data.incident_nums.push(obj);
    }
  }
})();
