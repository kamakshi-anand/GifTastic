
var birds = ["Peacock", "Humming bird", "Crow", "Penguin", "Sparrow", "Ostrich", "Eagle", "Vulture", "Woodpecker", "Parrot"];


$(document).ready(function () {

    var imagesDiv = $("#buttons");

    function createButtons() {
        $("#buttons").empty();
        for (i = 0; i < birds.length; i++) {

            var button = $("<button>");
            button.attr("data-birds", birds[i]);
            // str = str.replace(/\s+/g, '');
            button.addClass(birds[i].replace(/\s+/g, ''));
            button.addClass("bird-button");
            button.text(birds[i]);
            imagesDiv.append(button);

        }
    }

    

    $("#add-button").on("click", function () {
        event.preventDefault();
        var bird = $("#bird-input").val().replace(/\s+/g, '');
        alert(bird);
        birds.push(bird);
        createButtons();
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


                $("#gifs-appear-here").prepend(gifDiv);
                //  debugger;
            }

        });
        //    alert($(".g1").text);
    }

    function changeState() {
        // alert("gif");
        var state = $(this).attr("data-state");
        //   alert(state);
        if (state === "still") {
            //    alert("inside still");
            $(this).attr("src", $(this).attr("data-animate"));

            $(this).attr("data-state", "animate");
        } else {
            //   alert("inside animate");
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }


    $(document).on("click", ".bird-button", createImages);
    $(document).on("click", ".image", changeState);
    //   createButtons;
});