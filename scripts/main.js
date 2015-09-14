$(function() {
  var searchAdditionalInformationItems = [];
  var position = 0;
  var search_type = "users";
  var READY_STATE = 4;
  var PAGINATION_VALUE = 10;
  var DOUBLE_PAGINATION_VALUE = 20;
  var OK_RESPONSE = 200;
  var ENTER = 13;
  $("#nextLink").css("visibility", "hidden");
  $("#backLink").css("visibility", "hidden");


  $("#nextLink").click(function () {
    displayNewPage();
    if (position > PAGINATION_VALUE) $("#backLink").css("visibility", "visible");
    if (position >= searchAdditionalInformationItems.length) $("#nextLink").css("visibility", "hidden");
  });

  $("#backLink").click(function () {
    position = position - DOUBLE_PAGINATION_VALUE;
    displayNewPage();
    if (position <= PAGINATION_VALUE) $("#backLink").css("visibility", "hidden");
    if (position < searchAdditionalInformationItems.length) $("#nextLink").css("visibility", "visible");
  });

  function displayNewPage() {
    $("#SearchResult").html("");
    showTen(PAGINATION_VALUE);
    initClickEvents();
    position = position + PAGINATION_VALUE;
  }

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

  $("#search").keyup(function (event) {
    if (event.keyCode == ENTER) {
      $("#search").blur();
      searchInformation();
    }
  });

  $("button").click(function () {
    searchInformation();
  });

  function makeHttpCall(url, login, follow_type) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url + addKeys(), true);
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState != READY_STATE) return;
      if (xhr.status != OK_RESPONSE) {
        showFailSignal(login, follow_type);
      } else {
        showHttpResponse(JSON.parse(xhr.responseText), login, follow_type);
      }
    }
  }

  function beforeSearchInit(type) {
    search_type = type;
    searchAdditionalInformationItems = [];
    position = 0;
  }

  function searchRepositories(keyword) {
    beforeSearchInit("repositories");
    var i = 0;
    Gh3.Repositories.search(keyword, {start_page : 1}, function (err, res) {
      if(!err) { 
        Gh3.Repositories.each(function (repository) {
          if (repository != null) {
            searchAdditionalInformationItems[i] = makeInformationRepoObject(repository);
            if (position < PAGINATION_VALUE) {
              showRepoItem(searchAdditionalInformationItems[i], i);
              $(".repo").last().click(showInformation);
              position++;
            }
            else if (position == PAGINATION_VALUE && i == PAGINATION_VALUE) {
              $("#nextLink").css("visibility", "visible");
            }
            i++;
          }
        });
      }
    });
  }

  function searchUsers(keyword) {
    beforeSearchInit("users");
    var i = 0;
    Gh3.Users.search(keyword, {start_page : 1}, function (error, response) {
      var userNumber = 0;
      if(!error) {    
        response.each(function (user) {
          if (user != null) {
            var currentUser = new Gh3.User(user.login);
            currentUser.fetch(function (error, information){
              if(!error) {
                searchAdditionalInformationItems[i] = makeInformationObject(information);
                if (position < PAGINATION_VALUE) {
                  showUserItem(searchAdditionalInformationItems[i], i);
                  $(".user").last().click(showInformation);
                  position++;
                }
                else if (position == PAGINATION_VALUE && i == PAGINATION_VALUE) {
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

  function showInformation() {
    var i = this.id;
    additionalInformation = searchAdditionalInformationItems[i];
    if ($(this).children().length > 0) {
      $(this).children().remove();
    }
    else {
      $(this).append($('<div class="additionalInformation">')
              .append(showAdditionalInformation(searchAdditionalInformationItems[i])));
    }
  }

  function initClickEvents() {
    $(".user").click(showInformation);
    $(".repo").click(showInformation);
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
    var endPosition = (position+offset > searchAdditionalInformationItems.length) ? searchAdditionalInformationItems.length : position+offset;
    for (var i = position; i<endPosition; i++) {
      showUserItem(searchAdditionalInformationItems[i], i);
    }
  }

  function showTenRepositories(offset){
    var endPosition = (position+offset > searchAdditionalInformationItems.length) ? searchAdditionalInformationItems.length : position+offset;
    for (var i = position; i<endPosition; i++) {
      showRepoItem(searchAdditionalInformationItems[i], i);
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

