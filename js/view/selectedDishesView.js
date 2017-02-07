var SelectedDishesView = function (container) {
	this.list = container.find('#selectedDishesList');
	this.totalPrice = container.find('#totalPrice');
	this.confirmButton = container.find('> button');
}
