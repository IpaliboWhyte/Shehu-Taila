/*
* Extends the Crux Server request, so that we can directly send status codes in stead of {type: "error/success"}
* */
var Request = crux.Server.Request;

/*
* Override the request's success(data) function, to just return the 200 OK and the JSON
* */
Request.prototype.success = function SendSuccess(data) {
  this.res.status(200);
  if(typeof data === 'undefined' || data == null) data = {};
  this.json(data);
};
