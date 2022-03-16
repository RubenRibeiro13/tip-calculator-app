// Variables

var bill = "";
var tipPercentage = "";
var numberOfPeople = "";

// Functions

function printOutputs() {
  if (bill !== "" && tipPercentage !== "" && numberOfPeople !== "") {
    var tipPerPerson = Math.round(bill * tipPercentage / numberOfPeople * 100) / 100;
    obtainOutput("tip", tipPerPerson);

    var totalPerPerson = Math.round(bill * (1 + tipPercentage) / numberOfPeople * 100) / 100;
    obtainOutput("total", totalPerPerson);
  }
}

function obtainOutput(price, pricePerPerson) {
  if (/^([0-9]|[1-9][0-9]+)$/.test(pricePerPerson)) {
    $("." + price + "-per-person-value").text("$" + pricePerPerson + ".00");
  }
  else if (/^([0-9]|[1-9][0-9]+)[.][1-9]$/.test(pricePerPerson)) {
    $("." + price + "-per-person-value").text("$" + pricePerPerson + "0");
  }
  else {
    $("." + price + "-per-person-value").text("$" + pricePerPerson);
  }
}

// Bill input

$(".bill-input").on("input", function() {
  var wrongDecimalPlaces = new RegExp("^(" + "([0-9]|[1-9][0-9]+)" + "|" + "([0-9]|[1-9][0-9]+)[.,]" + "|" +
  "([0-9]|[1-9][0-9]+)[.,][0-9]" + "|" + "([0-9]|[1-9][0-9]+)[.,][0-9]{3,}" + ")$");

  if (wrongDecimalPlaces.test($(this).val())) {
    $(".error-message-bill").html("Wrong &#8470 of decimal places");
    $(this).removeClass("cyan-outline").addClass("red-outline");
  }
  else if ($(this).is(":invalid")) {
    $(".error-message-bill").text("Invalid input");
    $(this).removeClass("cyan-outline").addClass("red-outline");
  }
  else if ($(this).val() === "") {
    $(".error-message-bill").text("Empty input");
    $(this).removeClass("cyan-outline").addClass("red-outline");
  }
  else if ($(this).val() === "0.00" || $(this).val() === "0,00") {
    $(".error-message-bill").text("Can't be zero");
    $(this).removeClass("cyan-outline").addClass("red-outline");
  }
  else {
    $(".error-message-bill").text("");
    $(this).removeClass("red-outline").addClass("cyan-outline");
    bill = $(this).val().replace(/,/g, ".");
  }

  printOutputs();
  $("#reset-button").removeClass("reset-button").addClass("active-reset-button");
});

// Percentage buttons

$(".percentage-button").click(function() {
  $(".pressed-percentage-button").removeClass("pressed-percentage-button").addClass("percentage-button");
  $(this).removeClass("percentage-button").addClass("pressed-percentage-button");
  tipPercentage = $(this).val().replace(/%/, "") / 100;

  $("#custom-button").attr({type:"button", value:"Custom"}).removeClass("pressed-custom-button cyan-outline red-outline").addClass("custom-button");
  $(".error-message-tip").text("");

  printOutputs();
  $("#reset-button").removeClass("reset-button").addClass("active-reset-button");
});

// Custom button

$("#custom-button").click(function() {
  $(this).attr({type:"text", value:""}).removeClass("custom-button").addClass("pressed-custom-button");
});

$("#custom-button").on("input", function() {
  $(".pressed-percentage-button").removeClass("pressed-percentage-button").addClass("percentage-button");

  if ($(this).is(":invalid")) {
    $(".error-message-tip").text("Invalid input");
    $(this).removeClass("cyan-outline").addClass("red-outline");
  }
  else if ($(this).val() === "") {
    $(".error-message-tip").text("Empty input");
    $(this).removeClass("cyan-outline").addClass("red-outline");
  }
  else if ($(this).val() / 1 > 100) {
    $(".error-message-tip").text("Can't be > 100%");
    $(this).removeClass("cyan-outline").addClass("red-outline");
  }
  else {
    $(".error-message-tip").text("");
    $(this).removeClass("red-outline").addClass("cyan-outline");
    tipPercentage = $(this).val() / 100;
  }

  printOutputs();
  $("#reset-button").removeClass("reset-button").addClass("active-reset-button");
});

$("#custom-button").blur(function() {
    if ($(this).val() === "" && $(".error-message-tip").text() === "") {
      $(this).attr({type:"button", value:"Custom"}).removeClass("pressed-custom-button").addClass("custom-button");
    }
});

// People input

$(".people-input").on("input", function() {
  if ($(this).is(":invalid")) {
    $(".error-message-people").text("Invalid input");
    $(this).removeClass("cyan-outline").addClass("red-outline");
  }
  else if ($(this).val() === "") {
    $(".error-message-people").text("Empty input");
    $(this).removeClass("cyan-outline").addClass("red-outline");
  }
  else if ($(this).val() === "0") {
    $(".error-message-people").text("Can't be zero");
    $(this).removeClass("cyan-outline").addClass("red-outline");
  }
  else {
    $(".error-message-people").text("");
    $(this).removeClass("red-outline").addClass("cyan-outline");
    numberOfPeople = $(this).val();
  }

  printOutputs();
  $("#reset-button").removeClass("reset-button").addClass("active-reset-button");
});

// Reset button

$("#reset-button").click(function() {
  bill = "";
  tipPercentage = "";
  numberOfPeople = "";

  $(".error-message").text("");
  $(".number-input, #custom-button").removeClass("cyan-outline red-outline");
  $(".pressed-percentage-button").removeClass("pressed-percentage-button").addClass("percentage-button");
  $("#custom-button").attr({type:"button", value:"Custom"}).removeClass("pressed-custom-button").addClass("custom-button");

  $(".price-per-person-value").text("$0.00");
  $(this).removeClass("active-reset-button").addClass("reset-button");
});
