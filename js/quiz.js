var allQuestions = [
  {question: "Who is Prime Minister of the United Kingdom?", choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"], correctAnswer:0},
  {question: "Who is current NBA MVP?", choices: ["Russel Westbrook", "LeBron James", "Stephen Curry", "Kevin Durant"], correctAnswer:2},
  {question: "Who is current leading scorer in NBA?", choices: ["Russel Westbrook", "LeBron James", "Stephen Curry", "Kevin Durant"], correctAnswer:0},
];


$(document).ready(function(){

  $("#new").toggle();
  $(".answers").hide();

  currentQuestion = 0;
  correctAnswers = 0;
  userAnswers = [];

  showQuestion(currentQuestion);


  $("#next").on("click", function(){
    if( $(".answers > input:checked").length ){

      userAnswers[currentQuestion] = $(".answers > input:checked").attr("id");
      console.log(userAnswers);

      if( $(".answers > #"+allQuestions[currentQuestion].correctAnswer).is(":checked") ) {
        correctAnswers += 1;
      }

      if (currentQuestion < allQuestions.length-1){
        currentQuestion += 1;
        $(".answers").fadeOut("fast", function(){
          showQuestion(currentQuestion);
          if (userAnswers[currentQuestion] !== undefined){
            $(".answers > #"+userAnswers[currentQuestion]).prop("checked", true);
          }
        });
      } else{
        clearQuestion();
        $("#next, #prev").toggle();
        $("#new").toggle();
        showResult();
      }

    } else{
      alert("You must choose something");
    }

  });

  $("#prev").on("click", function(){
    if (currentQuestion  > 0){
      currentQuestion -= 1;
      $(".answers").fadeOut("fast", function(){
        showQuestion(currentQuestion);
        $(".answers > #"+userAnswers[currentQuestion]).prop("checked", true);
      });
    }
  });

  $("#new").on("click", function(){
    currentQuestion = 0;
    correctAnswers = 0;
    userAnswers = [];
    showQuestion(currentQuestion);
    $("#next, #prev").toggle();
    $("#new").toggle();
  });

});




function clearQuestion(){
  $(".answers").empty();
}

function showQuestion(id){
  var result = "";
  result += "<h3>Question #"+(id+1)+"</h3>";
  result += "<p>"+allQuestions[id].question+"</p>";
  allQuestions[id].choices.forEach(function(choice, index){
    result += "<input type='radio' name='answers' id="+index+">"+choice+"<br>";
  });
  $(".answers").html(result);
  $(".answers").fadeIn("slow");
}

function showResult(){
  $(".answers").html("Your score is "+correctAnswers+" points");
}
