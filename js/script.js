console.log('hello world')
console.log($)

var genParamString = function(paramObject) {
    var outputString = '?'
    for (var key in paramObject) {
        outputString += key + '=' + paramObject[key] + '&'
    }
    return outputString.substr(0,outputString.length - 1)
}

var name

try {
    var token = GLOBAL_TOKEN
}
catch (e) {
    var token = ''
}

//console.log(name)
//console.log('toke>>> ' + token)

var rootUrl ='https://api.github.com'
var usernameUrl = '/users/cflatts'
var reposUrl = '/users/cflatts/repos'

var params = {
 access_token: token
}

// var promise = $.getJSON(url + getParamString(params))
var userPromise = $.getJSON(rootUrl + usernameUrl + genParamString(params))
var reposPromise = $.getJSON(rootUrl + reposUrl + genParamString(params))






var profileDataHandler = function (apiResponseData) {
    console.log(apiResponseData)
}



profilePromise.then(profileDataHandler)



