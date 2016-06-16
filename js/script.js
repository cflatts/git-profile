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
    var userDataString = ''
    console.log(userDataObject)
        var userPic = userDataObject.avatar_url,
        // console.log(userPic)
            name = userDataObject.name,
            username = userDataObject.login,
            bio = userDataObject.bio,
            joinDate = userDataObject.created_at,
            followers = userDataObject.followers,
            following =userDataObject.following

         if(bio === null) {
                bio = 'Add a bio'
            }

        userDataString += '<img id= "profilePic" src=' + '"' + userPic + '">'
        userDataString += '<h3 id = "name">' + name + '</h3>'
        userDataString += '<p id = "username">' + username + '</p>'
        userDataString += '<div id = "bio"><p>' + bio + '</p></div>'
        userDataString += '<hr align = "left">'
        userDataString += '<div id = "joinDate">Joined on ' + joinDate + '<div>'
        userDataString += '<hr align = "left">'
        userDataString += '<div class ="bottom" id = "followers">' + followers + '<p>Followers</p></div>'
        userDataString += '<div class = "bottom" id ="star">0<p>Starred</p></div>'
        userDataString += '<div class = "bottom" id = "following">' + following + '<p>Following</p></div>'


    leftCol.innerHTML = userDataString
}

userPromise.then(userDataHandler)


//SETTING UP RIGHT COLUMN


var rightCol = document.querySelector('#right-col')


var repoDataHandler = function(apiResponseData) {
    // console.log('this works too')
    // console.log(apiResponseData)
    var reposDataArray = apiResponseData
    // console.log(reposDataArray)
    var reposDataString = ''
    for(var i = 0; i < reposDataArray.length; i++) {
            var repoName = reposDataArray[i].name,
                updateTime = reposDataArray[i].updated_at,
                language = reposDataArray[i].language,
                stars = reposDataArray[i].stargazers_count,
                forks = reposDataArray[i].forks_count


            reposDataString += '<hr>'
            reposDataString += '<div class = "repos">'
            reposDataString +=      '<div class = "left">'
            reposDataString +=          '<h1>' + repoName + '</h1>'
            reposDataString +=          '<p>' + updateTime + '</p>'
            reposDataString +=      '</div>'
            reposDataString +=      '<p class = "right">' + language + '</p>'
            reposDataString +=      '<p class = "right">' + stars + '</p>'
            reposDataString +=      '<p class = "right">' + forks + '</p>'
            reposDataString += '</div>'
    }
    rightCol.innerHTML = reposDataString
}
reposPromise.then(repoDataHandler)



