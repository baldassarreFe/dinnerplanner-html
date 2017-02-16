//DinnerModel Object constructor
var DinnerModel = function(apiKey) {

    var apiKey = apiKey

    var numberOfGuests = 0;
    var selected = [];
    var obserservers = {
      'numberOfGuestsChange' : [],
      'selectedDishesChange' : []
    };

    this.addListener = function(eventType, callback) {
      obserservers[eventType].push(callback);
    }

    var notifyNumberOfGuestsChange = function() {
      obserservers['numberOfGuestsChange'].forEach(cb => cb(numberOfGuests));
    }

    var notifySelectedDishesChange = function() {
      obserservers['selectedDishesChange'].forEach(cb => cb(selected));
    }

    this.setNumberOfGuests = function(num) {
        if (num >= 0) {
          numberOfGuests = num;
          notifyNumberOfGuestsChange();
        }
    }

    // Return the number of guests
    this.getNumberOfGuests = function() {
        return numberOfGuests
    }

    // Returns the dish that is on the menu for selected type
    this.getSelectedDish = function(type) {
        return selected.filter(function(dish) {
            return dish.type == type;
        })
    }

    // Returns all the dishes on the menu.
    this.getFullMenu = function() {
        return selected;
    }

    // Returns all ingredients for all the dishes on the menu.
    this.getAllIngredients = function() {
        var ingredientsDishByDish = selected
            .map(dish=>dish.ingredients)
            .reduce((arr1, arr2) => arr1.concat(arr2), []);

        var ingredientsGrouped = []

        ingredientsDishByDish.forEach(function(ingredient) {
            var ingr = ingredientsGrouped.find(i=>i.name == ingredient.name);
            if (ingr) {
                ingr.quantity += ingredient.quantity;
                ingr.price += ingredient.price;
            } else {
                ingredientsGrouped.push(JSON.parse(JSON.stringify(ingredient)))
            }
        })

        ingredientsGrouped.forEach(ing => {
            ing.quantity *= numberOfGuests;
            ing.price *= numberOfGuests;
        })

        return ingredientsGrouped;
    }

    //Returns the total price of the menu (all the ingredients multiplied by number of guests).
    this.getTotalMenuPrice = function() {
      if (selected.length==0)
        return 0;
      else
        return this.getAllIngredients().map(i => i.price).reduce((p1,p2) => p1+p2, 0);
    }

    //Adds the passed dish to the menu. If the dish of that type already exists on the menu
    //it is removed from the menu and the new one added.
    this.addDishToMenu = function(id) {
        var newDish = this.getDish(id);
        if (newDish) {
            selected = selected.filter(dish => dish.type!=newDish.type);
            selected.push(newDish);
            notifySelectedDishesChange();
        }
    }

    //Removes dish from menu
    this.removeDishFromMenu = function(id) {
        var toRemove = this.getDish(id);
        if (toRemove) {
            selected = selected.filter(dish => dish.name!=toRemove.name);
            notifySelectedDishesChange();
        }
    }

    this.removeAllDishes = function() {
        selected = [];
        notifySelectedDishesChange();
    }

    this.getMoreByType = function(type, res, err, howMany) {
      if (!howMany)
        howMany = 5
      $.ajax( {
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
        dataType: 'json',
        accepts: {'json': 'application/json'},
        headers: {'X-Mashape-Key': apiKey},
        data: {
            'instructionsRequired': 'true',
            'number': howMany,
            'type': type,
            'offset': allDishes.filter(d => d.type==type).length
        },
        error: err,
        success: function(dishes) {
          dishes.results.forEach(d => {
            let newDish = {}
            newDish.id = d.id
            newDish.name = d.title
            newDish.type = type
            newDish.image = 'https://spoonacular.com/recipeImages/' + d.image
            newDish.description = ""
            newDish.ingredients = []

            $.ajax( {
              url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+d.id+'/information',
              dataType: 'json',
              accepts: {'json': 'application/json'},
              headers: {'X-Mashape-Key': apiKey},
              data: {
                  'includeNutrition': 'false'
              },
              error: err,
              success: function(dishDetails) {
                newDish.image = dishDetails.image
                newDish.description = dishDetails.instructions.replace('  ', ' ')
                dishDetails.extendedIngredients
                  .forEach(i => {
                    newDish.ingredients.push({
                      name: i.name,
                      quantity: i.amount,
                      unit: i.unit,
                      price: 1
                    })
                  })
                allDishes.push(newDish)
                res(newDish)
              }
            })
          })
        }
      })
    }

    // Retrieves the dishes that match both the type and any of the keywords
    // specified as parameters. For both parameters, '' or null matches every dish.
    //
    // search('',null) -> all dishes
    // search(null, 'starter') -> all starters
    // search('eggs', '') -> all dishes having 'eggs' in either the name or ingredients list
    // search(['eggs','cream'], '') -> all dishes having 'eggs' or 'cream' in either the name or ingredients list
    // search('eggs', 'starter') -> 'starter' as type AND 'eggs' as a keyword
    // search(['eggs', 'cream'], 'starter') -> 'starter' as type AND ('eggs' OR 'cream' as a keywords)
    this.search = function(keywords, type) {
      if (keywords && !Array.isArray(keywords))
        keywords = [keywords];
      return allDishes.filter(d => {
          var checkType = !type || d.type == type;
          var checkKeyword = !keywords || keywords.some(kw => d.name.indexOf(kw) != -1) ||
            d.ingredients.map(i => i.name).some(name => keywords.some(kw => name.indexOf(kw) != -1))

          return checkType && checkKeyword;
        }
      )
    }

    this.makeSearch = function(keywords, type, res, err) {
      this.search(keywords, type).forEach(res)
      searchParam = {}
      if (keywords)
        searchParam.query = keywords
      if (type)
        searchParam.type = type
      $.ajax( {
        url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
        dataType: 'json',
        accepts: {'json': 'application/json'},
        headers: {'X-Mashape-Key': apiKey},
        data: Object.assign(searchParam, {
            'instructionsRequired': 'true',
            'number': 15,
        }),
        error: err,
        success: function(dishes) {
          dishes.results.forEach(d => {
            let newDish = {}
            newDish.id = d.id
            newDish.name = d.title
            newDish.type = type
            newDish.image = 'https://spoonacular.com/recipeImages/' + d.image
            newDish.description = ""
            newDish.ingredients = []
            if (!allDishes.some(dd => dd.id==newDish.id)) {
              $.ajax( {
                url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+d.id+'/information',
                dataType: 'json',
                accepts: {'json': 'application/json'},
                headers: {'X-Mashape-Key': apiKey},
                data: {
                    'includeNutrition': 'false'
                },
                error: err,
                success: function(dishDetails) {
                  newDish.image = dishDetails.image
                  newDish.description = dishDetails.instructions.replace('  ', ' ')
                  dishDetails.extendedIngredients
                    .forEach(i => {
                      newDish.ingredients.push({
                        name: i.name,
                        quantity: i.amount,
                        unit: i.unit,
                        price: 1
                      })
                    })
                  allDishes.push(newDish)
                  res(newDish)
                }
              })
            }
          })
        }
      })
    }

    //function that returns a dish of specific
    this.getDish = function(id) {
        for (key in allDishes) {
            if (allDishes[key].id == id) {
                return allDishes[key];
            }
        }
    }

    var allDishes = [];

    // the dishes variable contains an array of all the
    // dishes in the database. each dish has id, name, type,
    // image (name of the image file), description and
    // array of ingredients. Each ingredient has name,
    // quantity (a number), price (a number) and unit (string
    // defining the unit i.e. "g", "slices", "ml". Unit
    // can sometimes be empty like in the example of eggs where
    // you just say "5 eggs" and not "5 pieces of eggs" or anything else.
    /*
    var dishes = [{
        'id': 1,
        'name': 'French toast',
        'type': 'starter',
        'image': 'toast.jpg',
        'description': "In a large mixing bowl, beat the eggs. Add the milk, brown sugar and nutmeg; stir well to combine. Soak bread slices in the egg mixture until saturated. Heat a lightly oiled griddle or frying pan over medium high heat. Brown slices on both sides, sprinkle with cinnamon and serve hot.",
        'ingredients': [{
            'name': 'eggs',
            'quantity': 0.5,
            'unit': '',
            'price': 10
        }, {
            'name': 'milk',
            'quantity': 30,
            'unit': 'ml',
            'price': 6
        }, {
            'name': 'brown sugar',
            'quantity': 7,
            'unit': 'g',
            'price': 1
        }, {
            'name': 'ground nutmeg',
            'quantity': 0.5,
            'unit': 'g',
            'price': 12
        }, {
            'name': 'white bread',
            'quantity': 2,
            'unit': 'slices',
            'price': 2
        }]
    }, {
        'id': 2,
        'name': 'Sourdough Starter',
        'type': 'starter',
        'image': 'sourdough.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'active dry yeast',
            'quantity': 0.5,
            'unit': 'g',
            'price': 4
        }, {
            'name': 'warm water',
            'quantity': 30,
            'unit': 'ml',
            'price': 0
        }, {
            'name': 'all-purpose flour',
            'quantity': 15,
            'unit': 'g',
            'price': 2
        }]
    }, {
        'id': 3,
        'name': 'Brie with Peaches',
        'type': 'starter',
        'image': 'bakedbrie.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'round Brie cheese',
            'quantity': 10,
            'unit': 'g',
            'price': 8
        }, {
            'name': 'raspberry preserves',
            'quantity': 15,
            'unit': 'g',
            'price': 10
        }, {
            'name': 'peaches',
            'quantity': 1,
            'unit': '',
            'price': 4
        }]
    }, {
        'id': 100,
        'name': 'Meat balls',
        'type': 'main dish',
        'image': 'meatballs.jpg',
        'description': "Preheat an oven to 400 degrees F (200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
        'ingredients': [{
            'name': 'extra lean ground beef',
            'quantity': 115,
            'unit': 'g',
            'price': 20
        }, {
            'name': 'sea salt',
            'quantity': 0.7,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'small onion, diced',
            'quantity': 0.25,
            'unit': '',
            'price': 2
        }, {
            'name': 'garlic salt',
            'quantity': 0.7,
            'unit': 'g',
            'price': 2
        }, {
            'name': 'Italian seasoning',
            'quantity': 0.6,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'dried oregano',
            'quantity': 0.3,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'crushed red pepper flakes',
            'quantity': 0.6,
            'unit': 'g',
            'price': 3
        }, {
            'name': 'Worcestershire sauce',
            'quantity': 6,
            'unit': 'ml',
            'price': 7
        }, {
            'name': 'milk',
            'quantity': 20,
            'unit': 'ml',
            'price': 4
        }, {
            'name': 'grated Parmesan cheese',
            'quantity': 5,
            'unit': 'g',
            'price': 8
        }, {
            'name': 'seasoned bread crumbs',
            'quantity': 15,
            'unit': 'g',
            'price': 4
        }]
    }, {
        'id': 104,
        'name': 'Meat balls PLUS',
        'type': 'main dish',
        'image': 'meatballs.jpg',
        'description': "Preheat an oven to 1400 degrees F (1200 degrees C). Place the beef into a mixing bowl, and season with salt, onion, garlic salt, Italian seasoning, oregano, red pepper flakes, hot pepper sauce, and Worcestershire sauce; mix well. Add the milk, Parmesan cheese, and bread crumbs. Mix until evenly blended, then form into 1 1/2-inch meatballs, and place onto a baking sheet. Bake in the preheated oven until no longer pink in the center, 20 to 25 minutes.",
        'ingredients': [{
            'name': 'extra lean ground beef',
            'quantity': 500,
            'unit': 'g',
            'price': 220
        }, {
            'name': 'sea salt',
            'quantity': 13.7,
            'unit': 'g',
            'price': 33
        }, {
            'name': 'small onion, diced',
            'quantity': 4.25,
            'unit': '',
            'price': 7
        }, {
            'name': 'garlic salt',
            'quantity': 1.7,
            'unit': 'g',
            'price': 4
        }, {
            'name': 'Italian seasoning',
            'quantity': 6,
            'unit': 'g',
            'price': 9
        }, {
            'name': 'dried oregano',
            'quantity': 3,
            'unit': 'g',
            'price': 30
        }, {
            'name': 'crushed red pepper flakes',
            'quantity': 6,
            'unit': 'g',
            'price': 32
        }, {
            'name': 'Worcestershire sauce',
            'quantity': 63,
            'unit': 'ml',
            'price': 70
        }, {
            'name': 'milk',
            'quantity': 200,
            'unit': 'ml',
            'price': 40
        }, {
            'name': 'grated Parmesan cheese',
            'quantity': 50,
            'unit': 'g',
            'price': 80
        }, {
            'name': 'seasoned bread crumbs',
            'quantity': 105,
            'unit': 'g',
            'price': 40
        }]
    }, {
        'id': 101,
        'name': 'MD 2',
        'type': 'main dish',
        'image': 'bakedbrie.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ingredient 1',
            'quantity': 1,
            'unit': 'pieces',
            'price': 8
        }, {
            'name': 'ingredient 2',
            'quantity': 15,
            'unit': 'g',
            'price': 7
        }, {
            'name': 'ingredient 3',
            'quantity': 10,
            'unit': 'ml',
            'price': 4
        }]
    }, {
        'id': 102,
        'name': 'MD 3',
        'type': 'main dish',
        'image': 'meatballs.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ingredient 1',
            'quantity': 2,
            'unit': 'pieces',
            'price': 8
        }, {
            'name': 'ingredient 2',
            'quantity': 10,
            'unit': 'g',
            'price': 7
        }, {
            'name': 'ingredient 3',
            'quantity': 5,
            'unit': 'ml',
            'price': 4
        }]
    }, {
        'id': 103,
        'name': 'MD 4',
        'type': 'main dish',
        'image': 'meatballs.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ingredient 1',
            'quantity': 1,
            'unit': 'pieces',
            'price': 4
        }, {
            'name': 'ingredient 2',
            'quantity': 12,
            'unit': 'g',
            'price': 7
        }, {
            'name': 'ingredient 3',
            'quantity': 6,
            'unit': 'ml',
            'price': 4
        }]
    }, {
        'id': 200,
        'name': 'Chocolat Ice cream',
        'type': 'dessert',
        'image': 'icecream.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ice cream',
            'quantity': 100,
            'unit': 'ml',
            'price': 6
        }]
    }, {
        'id': 201,
        'name': 'Vanilla Ice cream',
        'type': 'dessert',
        'image': 'icecream.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ice cream',
            'quantity': 100,
            'unit': 'ml',
            'price': 6
        }]
    }, {
        'id': 202,
        'name': 'Strawberry',
        'type': 'dessert',
        'image': 'icecream.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ice cream',
            'quantity': 100,
            'unit': 'ml',
            'price': 6
        }]
    }, {
        'id': 203,
        'name': 'Gourmet Dessert',
        'type': 'dessert',
        'image': 'icecream.jpg',
        'description': "Here is how you make it... Lore ipsum...",
        'ingredients': [{
            'name': 'ingredient 1',
            'quantity': 2,
            'unit': 'pieces',
            'price': 8
        }]
    }];*/

}
