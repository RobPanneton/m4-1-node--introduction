"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))

  // Any requests for static files will go into the public folder
  .use(express.static("public"))
  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  .get("/cat-message", (req, res) => {
    const message = { author: "cat", text: "Meow" };
    const randomTime = Math.floor(Math.random() * 3000);
    setTimeout(() => {
      res.status(200).json({
        status: 200,
        message,
      });
    }, randomTime);
  })

  .get("/monkey-message", (req, res) => {
    const messages = [
      "Don’t monkey around with me.",
      "If you pay peanuts, you get monkeys.",
      "I fling 💩 at you!",
      "🙊",
      "🙈",
      "🙉",
    ];

    const message = { author: "monkey", text: "does it work" };
    message.text = messages[Math.floor(Math.random() * 5.99)];
    const randomDelay = Math.floor(Math.random() * 2000);
    setTimeout(() => {
      res.status(200).json({
        status: 200,
        message,
      });
    }, randomDelay);
  })

  .get("/parrot-message", (req, res) => {
    const message = { author: "parrot", text: req.query.parrotMessage };
    const randomDelay = Math.floor(Math.random() * 2000);
    setTimeout(() => {
      res.status(200).json({
        status: 200,
        message,
      });
    }, randomDelay);
  })

  .get("/bot-message", (req, res) => {
    const jokesArray = [
      "What do you call cheese that’s not yours? Nacho cheese!",
      "If you need help building an ark, I Noah guy",
      "A sandwich tried to get a reservation at a restaurant, but the waiter said they don’t serve food there.",
      "I wanted to be a doctor but I didn’t have the patients.",
      "A man walked into a bar. Ouch.",
      "I was going to tell a pizza joke but it was too cheesy.",
      "Velcro is the ultimate rip-off.",
      "I’ve had amnesia for as long as I can",
      "There was a kidnapping on a school bus but it’s fine. He woke up.",
    ];
    const commonGreetings = ["hi", "hello", "howdy"];
    const commonSalutations = ["bye", "see you later", "farewell"];
    const lowerMsg = req.query.userMessage.toLowerCase();
    const message = { author: "bot", text: `Bzzt ${req.query.userMessage}` };
    commonGreetings.forEach((greeting) => {
      if (lowerMsg.includes(greeting)) message.text = "Bzzt Hello.";
    });
    commonSalutations.forEach((salutation) => {
      if (lowerMsg.includes(salutation)) message.text = "Bzzt Goodbye.";
    });
    if (lowerMsg.includes("something funny")) {
      message.text =
        "Bzzt Would you like to hear a joke? (Bzzt I only understand 'Yes' and 'No')";
    }

    if (lowerMsg.includes("yes")) {
      message.text = jokesArray[Math.floor(Math.random() * 8)];
    }
    if (lowerMsg.includes("no")) {
      message.text = "Bzzt Goodbye.";
    }

    const randomDelay = Math.floor(Math.random() * 500);
    setTimeout(() => {
      res.status(200).json({
        status: 200,
        message,
      });
    }, randomDelay);
  })
  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this serves up the homepage
  .get("/", (req, res) => {
    res.status(200).json({
      status: 200,
      message: "This is the homepage... it's empty :(",
    });
  })

  // this is our catch all endpoint. If a user navigates to any endpoint that is not
  // defined above, they get to see our 404 page.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not the page you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
