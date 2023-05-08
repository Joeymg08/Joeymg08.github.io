$(document).ready(function () {
    var currentClothingIndex = 0;
    var currentFoodIndex = 0;
    var cx = "61b43edfbc1b744f5";
    var apiKey = "AIzaSyDnhhhtBqj2ywQ5FXOZt8uQd7tcOR6hvK4";
    var url;
    var selectedDate = new Date().toLocaleDateString();


    $('#heading').text("Plan for " + selectedDate)

    $('.settings-btn').click(function () {
        $('.settings-menu').toggleClass('show');
    });

    $('.close-btn').click(function () {
        $('.settings-menu').toggleClass('show');
    });

    $("#clothing-search-input").keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#clothing-search-button").click();
        }
    });

    $("#clothing-search-button").click(function () {
        var searchTerm = $("#clothing-search-input").val();
        $("#clothing-search-input").val("");
        var url = "https://www.googleapis.com/customsearch/v1?key=" + apiKey + "&cx=" + cx + "&q=" + searchTerm + "&searchType=image";
        $.getJSON(url, function (data) {
            if (data.items.length > 0) {
                var img = $("<img>").attr("src", data.items[0].link).addClass("clothing-image");
                var description = $("<p>").text(searchTerm).addClass("description");
                var container = $("<div>").addClass("clothing-container").append(img, description);
                var row;

                var closeButton = $("<div>").addClass("close-button");
                var icon = $("<i>").addClass("fa fa-times");
                closeButton.append(icon);

                closeButton.click(function () {
                    // Remove the container when the button is clicked
                    container.remove();
                });

                var closeButtonContainer = $("<div>").addClass("close-button-container").append(closeButton);
                container.append(closeButtonContainer);

                if (currentClothingIndex === 0) {
                    $("#clothing-row").empty();
                    row = $("<div>").addClass("clothing-row").append(container);
                    $("#clothing-container").append(row);
                } else {
                    row = $(".clothing-row:last");
                    if (row.children().length === 3) {
                        row = $("<div>").addClass("clothing-row").append(container);
                        $("#clothing-container").append(row);
                    } else {
                        row.append(container);
                    }
                }
                currentClothingIndex++;
            } else {
                alert("No images found for '" + searchTerm + "'.");
            }
        });
    });

    $("#food-search-input").keypress(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#food-search-button").click();
        }
    });

    $("#food-search-button").click(function () {
        var searchTerm = $("#food-search-input").val();
        $("#food-search-input").val("");
        var url = "https://www.googleapis.com/customsearch/v1?key=" + apiKey + "&cx=" + cx + "&q=" + "single " + searchTerm + "&searchType=image";
        $.getJSON(url, function (data) {
            if (data.items.length > 0) {
                var img = $("<img>").attr("src", data.items[0].link).addClass("food-image");
                var description = $("<p>").text(searchTerm).addClass("description");
                var container = $("<div>").addClass("food-container").append(img, description);
                var row;

                if (currentFoodIndex === 0) {
                    $("#food-row").empty();
                    row = $("<div>").addClass("food-row").append(container);
                    $("#food-container").append(row);
                } else {
                    row = $(".food-row:last");
                    if (row.children().length === 3) {
                        row = $("<div>").addClass("food-row").append(container);
                        $("#food-container").append(row);
                    } else {
                        row.append(container);
                    }
                }
                currentFoodIndex++;
            } else {
                alert("No images found for '" + searchTerm + "'.");
            }
        });
    });

});
