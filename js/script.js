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

    // console.log(apiResponseData)
    var userDataObject = apiResponseData
    // console.log(userDataArray)
    var userDataString = ''
    // console.log(userDataObject)
        var userPic = userDataObject.avatar_url,
        // console.log(userPic)
            name = userDataObject.name,
            username = userDataObject.login,
            bio = userDataObject.bio,
            joinDate = userDataObject.created_at,
            followers = userDataObject.followers,
            following =userDataObject.following

        userDataString += '<img src=' + '"' + userPic + '">'
        userDataString += '<div id = "name"><h4>' + name + '</h4></div>'
        userDataString += '<div id = "username"><p>' + username + '</p></div>'
        userDataString += '<div id = "bio"><p>' + bio + '</p></div>'
        userDataString += '<hr>'
        userDataString += '<div id = "joinDate">Joined on ' + joinDate + '<div>'
        userDataString += '<hr>'
        userDataString += '<div class ="bottom" id = "followers">' + followers + '</div>'
        userDataString += '<div class = "bottom" id = "following">' + following + '</div>'


    leftCol.innerHTML = userDataString
}

userPromise.then(userDataHandler)


//SETTING UP RIGHT COLUMN


var rightCol = document.querySelector('#right-col')


var repoDataHandler = function(apiResponseData) {
    // console.log('this works too')
    // console.log(apiResponseData)
    var reposDataArray = apiResponseData
    console.log(reposDataArray)
    var reposDataString = ''
    for(var i = 0; i < reposDataArray.length; i++) {
            var repoName = reposDataArray[i].name,
                updateTime = reposDataArray[i].updated_at,
                language = reposDataArray[i].language,
                stars = reposDataArray[i].stargazers_count,
                forks = reposDataArray[i].forks_count
            reposDataString += '<hr>'
            reposDataString += '<div class = "repos">'
            reposDataString +=      '<p>' + updateTime + '</p>'
            reposDataString +=      '<p>' + language + '</p>'
            reposDataString +=      '<p>' + stars + '</p>'
            reposDataString +=      '<p>' + forks + '</p>'
            reposDataString += '</div>'
    }
    rightCol.innerHTML = reposDataString
}
reposPromise.then(repoDataHandler)



