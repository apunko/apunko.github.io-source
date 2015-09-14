$(function() {
    var searchAdditionalInformationItems = [];
    var nextItemPositionToShow = 0;
    var searchType = "users";
    var READY_STATE = 4;
    var PAGINATION_VALUE = 10;
    var DOUBLE_PAGINATION_VALUE = 20;
    var OK_RESPONSE = 200;
    var ENTER = 13;
    $("#nextLink").css("visibility", "hidden");
    $("#backLink").css("visibility", "hidden");


    $("#nextLink").click(function () {
        displayNewPage();
        if (nextItemPositionToShow > PAGINATION_VALUE) 
            $("#backLink").css("visibility", "visible");
        if (nextItemPositionToShow >= searchAdditionalInformationItems.length) 
            $("#nextLink").css("visibility", "hidden");
    });

    $("#backLink").click(function () {
        nextItemPositionToShow = nextItemPositionToShow - DOUBLE_PAGINATION_VALUE;
        displayNewPage();
        if (nextItemPositionToShow <= PAGINATION_VALUE) 
            $("#backLink").css("visibility", "hidden");
        if (nextItemPositionToShow < searchAdditionalInformationItems.length) 
            $("#nextLink").css("visibility", "visible");
    });

    $("#search").keyup(function (event) {
        if (event.keyCode == ENTER) {
            $("#search").blur();
            searchInformation();
        }
    });

    $("button").click(function () {
       searchInformation();
    });

    function displayNewPage() {
        $("#SearchResult").html("");
        showTen(PAGINATION_VALUE);
        initClickEvents();
        nextItemPositionToShow = nextItemPositionToShow + PAGINATION_VALUE;
    }

    function searchInformation() {
        var keyword = $("#search").val();
        $("#SearchResult").html("");
        if ($("#UsersRadio").prop("checked")) {
            searchUsers(keyword);   
        } else {
            searchRepositories(keyword);
        }
    }

    function makeHttpCall(url, login, followType) {
        var request = new XMLHttpRequest();
        request.open('GET', url + addKeys(), true);
        request.send();
        request.onreadystatechange = function() {
            if (request.readyState != READY_STATE) return;
            if (request.status != OK_RESPONSE) {
                showFailSignal(login, followType);
            } else {
                showHttpResponse(JSON.parse(request.responseText), login, followType);
            }
        }
    }

    function beforeSearchInitialization(type) {
        searchType = type;
        searchAdditionalInformationItems = [];
        nextItemPositionToShow = 0;
        $("#nextLink").css("visibility", "hidden");
        $("#backLink").css("visibility", "hidden");

    }

    function searchRepositories(keyword) {
        beforeSearchInitialization("repositories");
        var i = 0;
        Gh3.Repositories.search(keyword, {start_page : 1}, function (err, res) {
            if(!err) { 
                Gh3.Repositories.each(function (repository) {
                  if (repository != null) {
                      searchAdditionalInformationItems[i] = makeInformationRepoObject(repository);
                      showItemIfNeed(showRepoItem, ".repo", i);
                      i++;
                  }
              });
            }
        });
    }

    function searchUsers(keyword) {
        beforeSearchInitialization("users");
        var i = 0;
        Gh3.Users.search(keyword, {start_page : 1}, function (error, response) {
            if(!error) {    
                response.each(function (user) {
                  if (user != null) {
                      var currentUser = new Gh3.User(user.login);
                      currentUser.fetch(function (error, information){
                          if(!error) {
                              searchAdditionalInformationItems[i] = makeInformationObject(information);
                              showItemIfNeed(showUserItem, ".user", i);
                              i++;                            
                          }
                      });
                  }
              });
            }
        });
    }

    function showItemIfNeed(showItem, itemClass, i) {
      if (nextItemPositionToShow < PAGINATION_VALUE) {
          showItem(searchAdditionalInformationItems[i], i);
          $(itemClass).last().click(showInformation);
          nextItemPositionToShow++;
      } else if (nextItemPositionToShow == PAGINATION_VALUE && i == PAGINATION_VALUE) {
          $("#nextLink").css("visibility", "visible");
      } 
    }

    function showHttpResponse(response, login, follow_type) {
        var ulContainer = $("ul." + login + "." + follow_type);
        for (var item in response) {
            ulContainer.append($("<li>").text(response[item].login));
        }
    }

    function showFailSignal(login, followType) {
        var ulContainer = $("ul." + login + "." + followType).text("can't load");
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
        } else {
            $(this).append($('<div class="additionalInformation">').
                append(showAdditionalInformation(searchAdditionalInformationItems[i])));
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
        if (searchType == "users") {
            showTenUsers(offset);
        } else {
            showTenRepositories(offset);
        }
    }

    function showTenUsers(offset){
        var endPosition = (nextItemPositionToShow + offset > searchAdditionalInformationItems.length) ? 
            searchAdditionalInformationItems.length : nextItemPositionToShow + offset;
        for (var i = nextItemPositionToShow; i < endPosition; i++) {
            showUserItem(searchAdditionalInformationItems[i], i);
        }
    }

    function showTenRepositories(offset){
        var endPosition = (nextItemPositionToShow + offset > searchAdditionalInformationItems.length) ?
            searchAdditionalInformationItems.length : nextItemPositionToShow + offset;
        for (var i = nextItemPositionToShow; i < endPosition; i++) {
            showRepoItem(searchAdditionalInformationItems[i], i);
        }
    }

    function showUserItem(item, nextItemPositionToShow){
        $("#SearchResult").append($("<li>").append(
            $('<span class="user">').attr("id", nextItemPositionToShow).
                text(item.login)
        ));
    }

    function showRepoItem(item, nextItemPositionToShow){
        $("#SearchResult").append($("<li>").append(
          $('<span class="repo">').attr("id", nextItemPositionToShow).
              text(item.name)
        ));
    }

    function showUserInformation(information) {
        var informationContainer = $("<div>");
        informationContainer.append($("<div>").text("login : " + information.login)).
            append($("<div>").text("name : " + information.name)).
            append($("<div>").text("followers : " + information.followers_amount)).
            append(makeFollowTypeList(information.followers_url, information.login, "followes")).
            append($("<div>").text("following : " + information.following_amount)).
            append(makeFollowTypeList(information.following_url, information.login, "following"));
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

