console.log('hello world')
console.log($)



//JQUERY AND CREATING PROMISES



var genParamString = function(paramObject) {
    var outputString = '?'
    for (var key in paramObject) {
        outputString += key + '=' + paramObject[key] + '&'
    }
    return outputString.substr(0,outputString.length - 1)
}

console.log(genParamString(params))

try {
    var token = GLOBAL_TOKEN
}
catch (e) {
    var token = ''
}

// console.log('toke>>> ' + token)

var rootUrl ='https://api.github.com'
var usernameUrl = '/users/cflatts'
var reposUrl = '/users/cflatts/repos'

var params = {
 access_token: token
}


var userPromise = $.getJSON(rootUrl + usernameUrl + genParamString(params))
//console.log(userPromise)
var reposPromise = $.getJSON(rootUrl + reposUrl + genParamString(params))
// console.log(reposPromise)



// SETTING UP LEFT COLUMN



var leftCol = document.querySelector('#left-col')

var userDataHandler = function (apiResponseData) {
    console.log('yeah, this works')
    // console.log(apiResponseData)
    var userDataArray = apiResponseData
    // console.log(userDataArray)
    var userDataString =''
    for(var i = 0; i < userDataArray.length; i++) {
        var userPic = userDataArray[i].avatar_url,
            name = userDataArray[i].name,
            username = userDataArray[i].login,
            bio = userDataArray[i].bio,
            joinDate = userDataArray[i].created_at,
            followers = userDataArray[i].followers,
            following =userDataArray[i].following
        userDataString += '<div id = "picture"><img src=' + '"' + userPic + '"></div>'
        userDataString += '<div id = "name"><h4>' + name + '</h4></div>'
        userDataString += '<div id = "username"><p>' + username + '</p></div>'
        userDataString += '<div id = "bio"><p>' + bio + '</p></div>'
        userDataString += '<hr>'
        userDataString += '<div id = "joinDate">Joined on ' + joinDate + '<div>'
        userDataString += '<hr>'
        userDataString += '<div class ="bottom" id = "followers">' + followers + '</div>'
        userDataString += '<div class = "bottom" id = "following">' + following + '</div>'

    }
    leftCol.innerHTML = userDataString
}

userPromise.then(userDataHandler)



