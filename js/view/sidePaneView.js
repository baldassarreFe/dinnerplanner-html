var SidePaneView = function (container) {
	this.numberOfGuests = container.find(".number-of-guests");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");

	this.list = container.find('#selectedDishesList');
	this.totalPrice = container.find('.totalPrice');
	this.confirmButton = container.find('> button');
}
