//ExampleViewController Object constructor
var NumberOfGuestsViewController = function(view, model ) {

	// REMOVE
	view.numberOfGuests.textContent = model.getNumberOfGuests();
	
	view.plusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() + 1);
	});
	
	view.minusButton.click(function(){
		model.setNumberOfGuests(model.getNumberOfGuests() - 1);
	});
}
