var Choices = ["baseball", "hockey", "bowling", "tennis", "curling"];
function getGif() {
    for (i = 0; i < Choices.length; i++) {
        var a = $("<button>");
        a.addClass("answer1 text-center m-2 h5 rounded mycolor w-25 center");
        a.attr("data-name", Choices[i]);
        a.text(Choices[i]);
        $("#button-choices").append(a);

    };
    $("#button-choices").on("click", ".answer1", ajax);
};
function ajax() {
    $("#images").empty();
    var userSearch = $(this).attr("data-name");
    var key = "Nw1A45YOy3toCl9PIaEKtCT6863Knc9m";
    console.log(userSearch);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=Nw1A45YOy3toCl9PIaEKtCT6863Knc9m&q=" + userSearch + "&limit=10&rating=g";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var gifs = response.data;

        for (var i = 0; i < gifs.length; i++) {
            var topicDiv = $("<div class='float-left size w-25 m-3'>");
            var p = $("<p>");
            p.text(gifs[i].rating);
            var p = $("<p class='text-center'>").text("Rating: " + gifs[i].rating);
            var topicImage = $("<img>")

            // add states of animate and still which will be toggled 
            topicImage.attr("src", gifs[i].images.fixed_height_still.url);
            topicImage.attr("data-still", gifs[i].images.fixed_height_still.url);
            topicImage.attr("data-animate", gifs[i].images.fixed_height.url)
            topicImage.attr("data-state", "still")
            topicImage.addClass("gif size");
            topicDiv.append(topicImage);
	 			// rating is appended to the div below the gif
	 		topicDiv.append(p); 			
	 			// new images will be placed at the beginning (top) of the containing gif area
	 		$("#images").prepend(topicDiv);

        };
    });
};
getGif();
