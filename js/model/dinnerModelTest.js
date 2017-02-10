var model = new DinnerModel()

model.getNumberOfGuests()

model.addDishToMenu(101)
model.addDishToMenu(203)

model.getAllIngredients()
model.getTotalMenuPrice()

model.setNumberOfGuests(2)

model.getAllIngredients()
model.getTotalMenuPrice()


model.search(null, null).length == 12
model.search(null, '').length == 12
model.search('', null).length == 12
model.search('','').length == 12

model.search('eggs').length == 1
model.search('eggs','starter').length == 1
model.search(null, 'main dish').length == 5
model.search(['eggs','sugar']).length == 1
model.search(['eggs','sugar'], 'starter').length == 1
model.search(['eggs','ice'], 'starter').length == 0
model.search(['eggs','sugar'], 'main dish').length == 0
