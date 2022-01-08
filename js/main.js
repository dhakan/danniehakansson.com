import messages from "./messages.js";
import { startTyping } from "./typing.js";

const form = document.querySelector("form");
const input = document.querySelector("input");

document.addEventListener("keypress", () => {
  input.focus();
});

let isTyping = false;

function typingDone() {
  isTyping = false;
}

function typeAndOpenNewTab(text, command, url) {
  startTyping({
    text,
    callback: () => {
      typingDone();
      setTimeout(() => {
        const result = window.open(url);

        if (result) {
          return;
        }

        handleBlockedPopup(command);
      }, 2000);
    },
  });
}

function handleBlockedPopup(command) {
  startTyping({
    text: `Your browser prevented the link from opening in a new tab. Enable popups from this website and type '${command}' again.`,
    callback: () => {
      typingDone();
    },
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!input.value.trim().length) {
    return;
  }

  if (isTyping) {
    return;
  }

  const command = input.value.trim();
  input.value = "";

  isTyping = true;

  const text = messages[command];

  if (!text) {
    startTyping({
      text: `Unknown command: ${command}
            
      Type 'help' to see available commands...`,
      callback: typingDone,
    });
    return;
  }

  if (command === "youtube") {
    typeAndOpenNewTab(
      text,
      command,
      "https://chrome.google.com/webstore/detail/youtube-timestamp-list-pl/bhaebpnlhphfjffkchdccafakpeimnpd"
    );
  } else if (command === "yatzy") {
    typeAndOpenNewTab(text, command, "http://yatzy.danniehakansson.com");
  } else if (command === "snake") {
    typeAndOpenNewTab(text, command, "https://snake.danniehakansson.com");
  } else if (command === "midi") {
    typeAndOpenNewTab(text, command, "https://miditostaff.danniehakansson.com");
  } else if (command === "css") {
    typeAndOpenNewTab(
      text,
      command,
      "https://cssbattle-solutions.danniehakansson.com"
    );
  } else if (command === "tobias") {
    typeAndOpenNewTab(text, command, "https://tobias.danniehakansson.com");
  } else if (command === "alive") {
    typeAndOpenNewTab(text, command, "https://alive.danniehakansson.com");
  } else if (command === "github") {
    typeAndOpenNewTab(text, command, "https://github.com/dhakan");
  } else if (command === "cv") {
    typeAndOpenNewTab(
      text,
      command,
      "https://danniehakansson.com/static/cv-en-853e8962b6081b26ed371a2856a0cb0c.pdf"
    );
  } else if (command === "help") {
    startTyping({
      text,
      preformatted: true,
      callback: typingDone,
    });
  } else if (command === "music") {
    typeAndOpenNewTab(text, command, "https://soundcloud.com/dhakan93");
  } else {
    startTyping({
      text,
      callback: typingDone,
    });
  }
});

isTyping = true;

startTyping({
  text: messages.INTRO,
  preformatted: true,
  callback: typingDone,
});
