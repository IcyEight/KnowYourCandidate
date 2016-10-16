var index = 0;
var questions = [];
var correct = 0;
var incorrect = 0;
var party_affiliation = 999;
var user_answers = []; //1 is right, 0 is incorrect

var candidate = "Hillary Clinton";
function load_quotes(){
    $(function() {
        $.getJSON('quotes.json', function(data) {
            $.each(data.questions, function(i,f){
                questions.push(f);
            });
            document.getElementById("quote").innerHTML = questions[index].quote;
        });
    });
}


function true_chosen(){
    user_answers[index] = 1;
    if(questions[index].answer == party_affiliation){
        //CORRECT
         //document.getElementById("answer").innerHTML = "CORRECT!";
        correct = correct +1;
    }
    else{
        //INCORRECT
        // document.getElementById("answer").innerHTML = "WRONG!";
    }
    index++;
    if(index == questions.length){
        //END OF LIST
        display_results();
    }
    else{
        document.getElementById("quote").innerHTML = questions[index].quote;
    }
}
function false_chosen(){
    user_answers[index] = 0;
    if(questions[index].answer != party_affiliation){
        //CORRECT
        //document.getElementById("answer").innerHTML = "CORRECT!";
        correct = correct +1;
    }
    else{
        //INCORRECT
        //document.getElementById("answer").innerHTML = "WRONG!";
    }
    
    index++;
    if(index == questions.length){
        //END OF LIST
        display_results();
    }
    else{
        document.getElementById("quote").innerHTML = questions[index].quote;
    }
}
function display_results(){
   $("body").empty(); //Empty body
    $("body").append("<h1>" + "RESULTS" +"</h1>");
    
    //Show each question and player answer
    for(i = 0; i < questions.length; i++){
        var answer;
        if(user_answers[i] == 1){
            answer = "TRUE";
        }
        else{
            answer = "FALSE";
        }
        
        var real_answer;
        if(questions[i].answer == party_affiliation){
            real_answer = "TRUE";
        }
        else{
            real_answer = "FALSE";
        }
        var question_block = "<div class=\"q_block\"><ul class = \"q_list\"><li>" + questions[i].quote + "<\li>" + "<li>" + "YOUR ANSWER: " + answer + "<\li>" + "<li>" + "REAL ANSWER: " + real_answer +"</li>" + "</ul></div>";
        $("body").append(question_block);
    }
    
    
    $("body").append("<p>You got " + correct + " out of " + questions.length + " questions correct!");
}
function trump_picked(){
    party_affiliation = 1;
    candidate = "Donald Trump";
    //Load page with quiz
    $("body").empty();
    $("body").append("<h1>TRUE OR FALSE?</h1>\n<h2 id=\"candidate_said\">"+candidate + " said...</h2><p id=\"quote\">ENTER QUOTE HERE</p>\n <div id=\"buttons\"> <button onclick=\"true_chosen()\" type=\"button\">TRUE</button>\n<button onclick=\"false_chosen()\" type=\"button\">FALSE</button></div>\n<p id=\"answer\"></p>");
    
    load_quotes();
}
function clinton_picked(){
    party_affiliation = 0;
    
    //Load page with quiz
    $("body").empty();
    $("body").append("<h1>TRUE OR FALSE?</h1>\n<h2 id=\"candidate_said\">"+candidate + " said...</h2><p id=\"quote\">ENTER QUOTE HERE</p>\n <div id=\"buttons\"> <button onclick=\"true_chosen()\" type=\"button\">TRUE</button>\n<button onclick=\"false_chosen()\" type=\"button\">FALSE</button></div>\n<p id=\"answer\"></p>");
    
    load_quotes();
}