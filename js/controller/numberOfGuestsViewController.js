//ExampleViewController Object constructor
var NumberOfGuestsViewController = function(view, model ) {

	// REMOVE
	view.numberOfGuests.val(model.getNumberOfGuests());
	view.numberOfGuests.text(model.getNumberOfGuests());

	view.plusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});

	view.minusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() - 1);
	});
}
