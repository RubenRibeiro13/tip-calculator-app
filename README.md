# Frontend Mentor - Tip calculator app solution

This is a solution to the [Tip calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Calculate the correct tip and total cost of the bill per person

### Screenshots

![](screenshots/screenshot-desktop.jpg)
![](screenshots/screenshot-mobile.jpg)

### Links

- Solution URL: [https://github.com/RubenRibeiro13/tip-calculator-app](https://github.com/RubenRibeiro13/tip-calculator-app)
- Live Site URL: [https://rubenribeiro13.github.io/tip-calculator-app/](https://rubenribeiro13.github.io/tip-calculator-app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- [jQuery](https://jquery.com/) - JS library

### What I learned

While working through this project, I learned:
- The basics of regular expressions.
- What the placeholder and pattern attributes specify.
- What the focus and invalid pseudo-classes and the placeholder pseudo-element represent.
- What the cursor and outline properties and the test, val, is and replace methods do.
- When the input, blur, mouseup and mousedown events are fired.
- How to override a blur event.

```html

<input class="number-input bill-input" type="text" name="" value="" placeholder="0" pattern="([0-9]|[1-9][0-9]+)[.,][0-9]{2}">

```

```css

::placeholder {
  color: hsl(184, 14%, 56%);
}

.custom-button:hover {
  cursor: pointer;
}

.cyan-outline:focus {
  outline: 2px solid #4ea095;
}

```

```js

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

$("#custom-button").blur(function() {
    if ($(this).val() === "" && $(".error-message-tip").text() === "") {
      $(this).attr({type:"button", value:"Custom"}).removeClass("pressed-custom-button").addClass("custom-button");
    }
});

```

### Continued development

In future projects, I want to continue focusing on regular expressions. I also want my next project to contain a submittable form.

### Useful resources

- [W3Schools](https://www.w3schools.com) - This resource helped me understand the basics of regular expressions and is especially helpful for understanding JavaScript and jQuery methods and events.
- [MDN Web Docs](https://developer.mozilla.org) - This resource is especially helpful for understanding CSS properties.
- [Stack Overflow](https://stackoverflow.com) - This resource showed me how to override a blur event.

## Author

- Website - [Ruben Ribeiro](https://rubenribeiro13.github.io/my-site/)
- Frontend Mentor - [@RubenRibeiro13](https://www.frontendmentor.io/profile/RubenRibeiro13)
