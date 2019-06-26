var Choices = ["baseball", "hockey", "bowling", "tennis", "curling"];

function getGif() {

  $("#buttons").empty();

  for (i = 0; i < Choices.length; i++) {
    var a = $("<button>");
    a.addClass("answer1 text-center m-2 h5 rounded mycolor w-25 center");
    a.attr("data-name", Choices[i]);
    a.text(Choices[i]);
    $("#buttons").append(a);

  };
};
  $("#buttons").on("click", ".answer1", ajax);

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
        var gifDiv = $("<div class='float-left size w-25 m-3'>");
        var p = $("<p>");
        p.text(gifs[i].rating);
        var p = $("<p class='text-center'>").text("Rating: " + gifs[i].rating);
        var gifImage = $("<img>")

        gifImage.attr("src", gifs[i].images.fixed_height_still.url);
        gifImage.attr("data-still", gifs[i].images.fixed_height_still.url);
        gifImage.attr("data-animate", gifs[i].images.fixed_height.url)
        gifImage.attr("data-state", "still")
        gifImage.addClass("gif size");
        gifDiv.append(gifImage);
        gifDiv.append(p);
        $("#images").prepend(gifDiv);

      };
    
      $(".gif").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });
    });
  };
    

  $("#add").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var sport = $("#added-sport").val().trim();

    // Adding movie from the textbox to our array
    Choices.push(sport);
    getGif();
  });


getGif();
