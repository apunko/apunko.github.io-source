$(function() {
  var global = [];
  var position = 0;
  var search_type = "users";
  $("#nextLink").css("visibility", "hidden");
  $("#backLink").css("visibility", "hidden");


  $("#nextLink").click(function () {
    displayNewPage();
    if (position > 10) $("#backLink").css("visibility", "visible");
    if (position >= global.length) $("#nextLink").css("visibility", "hidden");
  });

  $("#backLink").click(function () {
    position = position-20;
    displayNewPage();
    if (position <= 10) $("#backLink").css("visibility", "hidden");
    if (position < global.length) $("#nextLink").css("visibility", "visible");
  });

  function displayNewPage() {
    $("#SearchResult").html("");
    showTen(10);
    init();
    position = position+10;
  }

  $("#search").keyup(function (event) {
    if (event.keyCode == 13) {
      $("#search").blur();
      searchInformation();
    }
  });

  $("button").click(function () {
    searchInformation();
  });

  function searchInformation() {
    var keyword = $("#search").val();
    $("#SearchResult").html("");
    if ($("#UsersRadio").prop("checked")) {
      searchUsers(keyword);   
    }
    else {
      searchRepositories(keyword);
    }
  }

  function makeHttpCall(url, login, follow_type) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + addKeys(), true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState != 4) return;
      if (xhr.status != 200) {
        showFailSignal(login, follow_type);
      } else {
        showHttpResponse(JSON.parse(xhr.responseText), login, follow_type);
      }
    }
  }

  function searchRepositories(keyword) {
    search_type = "repositories";
    global = [];
    position = 0;
    var i = 0;
    Gh3.Repositories.search(keyword, {start_page : 1}, function (err, res) {
      if(!err) { 
        Gh3.Repositories.each(function (repository) {
          if (repository != null) {
            global[i] = makeInformationRepoObject(repository);
            if (position < 10) {
              showRepoItem(global[i], i);
              $(".repo").last().click(reposHandler);
              position++;
            }
            else if (position == 10 && i == 10) {
              $("#nextLink").css("visibility", "visible");
            }
            i++;
          }
        });
      }
    });
  }

  function searchUsers(keyword) {
    search_type = "users";
    global = [];
    position = 0;
    var i = 0;
    Gh3.Users.search(keyword, {start_page : 1}, function (error, response) {
      var userNumber = 0;
      if(!error) {    
        response.each(function (user) {
          if (user != null) {
            var currentUser = new Gh3.User(user.login);
            currentUser.fetch(function (error, information){
              if(!error) {
                global[i] = makeInformationObject(information);
                if (position < 10) {
                  showUserItem(global[i], i);
                  $(".user").last().click(usersHandler);
                  position++;
                }
                else if (position == 10 && i == 10) {
                  $("#nextLink").css("visibility", "visible");
                }
                i++;
              }
            });
          }
        });
      }
    });
  }


  function showHttpResponse(response, login, follow_type) {
    var ulContainer = $("ul." + login + "." + follow_type);
    for (var item in response) {
      ulContainer.append($("<li>").text(response[item].login));
    }
  }

  function showFailSignal(login, follow_type) {
    var ulContainer = $("ul." + login + "." + follow_type).text("can't load");
  }

  function makeFollowTypeList(url, login, follow_type){
    var ulContainer = $("<ul>").addClass(login).addClass(follow_type);
    makeHttpCall(url, login, follow_type);
    return ulContainer;  
  }

  function showAdditionalInformation(information) {
    if ("login" in information) {
      return showUserInformation(information);
    }
    return showRepositoryInformation(information);
  }

  function usersHandler() {
    var i = this.id;
    additionalInformation = global[i];
    if ($(this).children().length > 0) {
      $(this).children().remove();
    }
    else {
      $(this).append($('<div class="additionalInformation">').append(showAdditionalInformation(global[i])));
    }
  }

  function reposHandler(){
    var i = this.id;
    additionalInformation = global[i];
    if ($(this).children().length > 0) {
      $(this).children().remove();
    }
    else {
      $(this).append($('<div class="additionalInformation">').append(showAdditionalInformation(global[i])));
    }
  }

  function init() {
    $(".user").click(usersHandler);
    $(".repo").click(reposHandler);
  }

  function makeInformationRepoObject(repository) {
    object = {};
    object["name"] = repository.name;
    object["description"] = repository.description;
    object["username"] = repository.username;
    object["language"] = repository.language;
    object["followers_amount"] = repository.followers;
    object["forks_amount"] = repository.forks;
    return object;
  }

  function makeInformationObject(user) {
    object = {};
    object["login"] = user.login;
    object["name"] = user.name;
    object["followers_amount"] = user.followers;
    object["following_amount"] = user.following;
    object["followers_url"] = user.followers_url;
    object["following_url"] = user.following_url.substring(0, user.following_url.length-13);
    return object;
  }

  function showTen(offset){
    if (search_type == "users") {
      showTenUsers(offset);
    }
    else {
      showTenRepositories(offset);
    }
  }

  function showTenUsers(offset){
    var endPosition = (position+offset > global.length) ? global.length : position+offset;
    for (var i = position; i<endPosition; i++) {
      showUserItem(global[i], i);
    }
  }

  function showTenRepositories(offset){
    var endPosition = (position+offset > global.length) ? global.length : position+offset;
    for (var i = position; i<endPosition; i++) {
      showRepoItem(global[i], i);
    }
  }

  function showUserItem(item, position){
    $("#SearchResult").append($("<li>").append(
      $('<span class="user">').attr("id", position)
        .text(item.login)
    ));
  }

  function showRepoItem(item, position){
    $("#SearchResult").append($("<li>").append(
      $('<span class="repo">').attr("id", position)
        .text(item.name)
    ));
  }

  function showUserInformation(information) {
    var informationContainer = $("<div>");
    informationContainer.append($("<div>").text("login : " + information.login))
                        .append($("<div>").text("name : " + information.name))
                        .append($("<div>").text("followers : " + information.followers_amount))
                        .append(makeFollowTypeList(information.followers_url, information.login, "followes"))
                        .append($("<div>").text("following :" + information.following_amount))
                        .append(makeFollowTypeList(information.following_url, information.login, "following"));
    return informationContainer;
  }

  function showRepositoryInformation(information) {
    var informationContainer = $("<div>");
    for (var prop in information) {
      informationContainer.append($("<div>").text(prop + " : " + information[prop]));
    }
    return informationContainer;
  }

  function addKeys() {
    return "?client_id=8e0949ccd9a302148c2f&client_secret=490ba27f02472d922802ae0b340e5a9c40a9fbd0";
  }
});

