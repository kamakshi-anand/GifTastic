
var birds = ["Peacock", "Humming bird", "Crow", "Penguin", "Sparrow", "Ostrich", "Eagle", "Vulture", "Woodpecker", "Parrot"];


$(document).ready(function () {
    var imagesDiv = $("#buttons");
    function createButtons() {
        $("#buttons").empty();
        for (i = 0; i < birds.length; i++) {
            var button = $("<button>");
            button.attr("data-birds", birds[i]);
            button.addClass(birds[i].replace(/\s+/g, ''));
            button.addClass("bird-button");
            button.text(birds[i]);
            imagesDiv.append(button);
        }
    }


    $("#add-button").on("click", function () {
        //     event.preventDefault();
        var bird = $("#bird-input").val().replace(/\s+/g, '');
        //   alert( birds.indexOf(bird));
        //added to the array and create button only if what the user entered is not empty and its not present in the birds array------
        isPresent = false;

        for (x in birds) {
           // debugger;
            if (bird.toLowerCase() == birds[x].toLowerCase()) {
                isPresent=true;
                break;               
            }
        }
        if (bird != "" && !isPresent) {
            birds.push(bird);
            createButtons();
        } else {
            alert("You have to enter the name of the bird that you havent added yet");
        }
    });

    // $(document).on("click", ".bird-button", createButtons);
    createButtons();


    function createImages() {
        //    alert("test");
        var bird = $(this).attr("data-birds");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            bird + "&api_key=XifUBUIQkx5pgBGsIFO7IwEnldMoqJgW&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                console.log(response);


                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);

                    var birdImage = $("<img>");
                    birdImage.attr("src", results[i].images.fixed_height_still.url);
                    birdImage.addClass("image");
                    birdImage.attr("data-state", "still");
                    birdImage.attr("data-still", results[i].images.fixed_height_still.url);
                    birdImage.attr("data-animate", results[i].images.fixed_height.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(birdImage);

                    var fav = $("<button>");
                    fav.attr("data-still", results[i].images.fixed_height_still.url);
                    fav.attr("data-animate", results[i].images.fixed_height.url);
                    fav.attr("rating", rating);
                    //        fav.addClass(birds[i].replace(/\s+/g, ''));
                    fav.addClass("fav-button");
                    fav.text("Add to Favorites");
                    gifDiv.prepend(fav);

                    $("#gifs-appear-here").prepend(gifDiv);
                    //  debugger;
                }

            });
        //    alert($(".g1").text);
    }

    function changeState() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }
    var urls = [];
    function addToFav() {

        var url = [];
        // alert($(this).attr("data-still"));
        url.push($(this).attr("data-still"));
        url.push($(this).attr("data-animate"));
        url.push($(this).attr("rating"));
        urls.push(url);
        localStorage.setItem("favs", JSON.stringify(urls));
    }

    function showFav() {
        $("#gifs-appear-here").text("");
        var favs = [];
        favs = JSON.parse(localStorage.getItem("favs"));
        //if the localstorage is not empty
        if (favs != null) {
            for (i = 0; i < favs.length; i++) {
                var gifDiv = $("<div class='item'>");
                var rating = favs[i][2];
                var p = $("<p>").text("Rating: " + rating);
                var birdImage = $("<img>");
                birdImage.attr("src", favs[i][0]);
                birdImage.addClass("image");
                birdImage.attr("data-state", "still");
                birdImage.attr("data-still", favs[i][0]);
                birdImage.attr("data-animate", favs[i][1]);
                gifDiv.prepend(p);
                gifDiv.prepend(birdImage);
                $("#gifs-appear-here").prepend(gifDiv);
                //  debugger;
            }
        }

    }
    $(document).on("click", ".bird-button", createImages);
    $(document).on("click", ".image", changeState);
    //_________________________________________________________________________
    $(document).on("click", ".fav-button", addToFav);
    $(document).on("click", ".fa", showFav);
    //   createButtons;
});