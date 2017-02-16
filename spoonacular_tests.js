let key = ''

$.ajax( {
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search',
  dataType: 'json',
  accepts: {'json': 'application/json'},
  headers: {'X-Mashape-Key': key},
  data: {
      'instructionsRequired': 'true',
      'number': 15,
      'type': 'main course'
  },
  success: function(data) {
    console.log(data.results)
  },
  error: function(data) {
    console.log(data)
  }
})

$.ajax( {
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+324694+'/analyzedInstructions',
  dataType: 'json',
  accepts: {'json': 'application/json'},
  headers: {'X-Mashape-Key': key},
  data: {
      'stepBreakdown': 'true'
  },
  success: function(data) {
    data.forEach(d => {
      console.log(d.name)
      d.steps.forEach((s,i) => {
        console.log('Step ' + (i+1))
        if (s.equipment.length!=0)
          console.log('  Equipment: ' + s.equipment.map(e => e.name).join(', '))
        if (s.ingredients.length!=0)
          console.log('  Ingredients: ' + s.ingredients.map(i => i.name).join(', '))
        console.log('  Instructions: ' + s.step)
        console.log()
      })
    })
  },
  error: function(data) {
    console.log(data)
  }
})

$.ajax( {
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/'+324694+'/information',
  dataType: 'json',
  accepts: {'json': 'application/json'},
  headers: {'X-Mashape-Key': key},
  data: {
      'includeNutrition': 'false'
  },
  success: function(data) {
    console.log(data.title)
    console.log('  Preparation time: ' + data.readyInMinutes + ' min')
    console.log('  Ingredients:')
    data.extendedIngredients
      .forEach(i => console.log('    ' + i.amount + ' ' + i.unit + ' ' + i.name))
  },
  error: function(data) {
    console.log(data)
  }
})
