var model = new DinnerModel()

model.getNumberOfGuests()

model.addDishToMenu(101)
model.addDishToMenu(203)

model.getAllIngredients()
model.getTotalMenuPrice()

model.setNumberOfGuests(2)

model.getAllIngredients()
model.getTotalMenuPrice()


model.localSearch(null, null).length == 12
model.localSearch(null, '').length == 12
model.localSearch('', null).length == 12
model.localSearch('','').length == 12

model.localSearch('eggs').length == 1
model.localSearch('eggs','starter').length == 1
model.localSearch(null, 'main dish').length == 5
model.localSearch(['eggs','sugar']).length == 1
model.localSearch(['eggs','sugar'], 'starter').length == 1
model.localSearch(['eggs','ice'], 'starter').length == 0
model.localSearch(['eggs','sugar'], 'main dish').length == 0
