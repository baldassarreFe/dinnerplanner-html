//NumberOfGuestsView Object constructor
var NumberOfGuestsView = function (container) {

	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)
	this.numberOfGuests = container.find(".number-of-guests");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
}
