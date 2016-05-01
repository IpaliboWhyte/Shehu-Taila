module.exports = function (Route) {

  Route
    .namespace('styles')
    .checkpoint('security:user')

  Route
    .post('/','create a style')
    .body({
      name: Route.type.STRING.invalid('INVALID_NAME','The name provided is invalid'),
      description: Route.type.STRING.default(null),
      display_url_1: Route.type.STRING.default(null),
      display_url_2: Route.type.STRING.default(null),
      display_url_3: Route.type.STRING.default(null),
      display_url_4: Route.type.STRING.default(null),
    })
    .then(function(){
      return this.success();
    })

  Route
    .get('/', 'return all styles')
    .query({
      category: Route.type.ENUM('a', 'popular', 'favourites')
    })
    .then(function(userObj){
      return this.success();
    })

  Route
    .get('/list', 'return all styles by search query')
    .query({
      search: Route.type.STRING.invalid('INVALID_SEARCH','The search query provided is invalid'),
    })
    .then(function(){
      return this.success();
    })

  Route
    .get('/:id', 'get style by id')
    .then(function(){

    })

}