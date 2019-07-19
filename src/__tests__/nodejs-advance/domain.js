var util = require("util");
var events = require("events");
var domain = require("domain");
var d = domain.create();
function EventDrivenClass() {
  events.EventEmitter.call(this);
}
util.inherits(EventDrivenClass, events.EventEmitter);
d.on("error", function(err) {
  console.log(err.errorMessage);
});
d.run(function() {
  var eventDriven = new EventDrivenClass();
  eventDriven.emit("error", { errorMessage: "error message" });
});
