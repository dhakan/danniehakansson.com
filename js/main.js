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

        location.href = url;
      }, 2000);
    },
  });
}

function handleCommand(command) {
  const text = messages[command];

  if (!text) {
    const helpText = messages.help;

    startTyping({
      text: `Unknown command: ${command}
            
${helpText}`,
      callback: typingDone,
    });
    return;
  }

  switch (command) {
    case "help":
      startTyping({
        text,
        preformatted: true,
        callback: typingDone,
      });
      break;
    case "tubestamps":
      typeAndOpenNewTab(text, command, "https://tubestamps.app/");
      break;
    case "hilda":
      typeAndOpenNewTab(text, command, "https://hildadennyvocalcoach.com/");
      break;
    case "midi":
      typeAndOpenNewTab(
        text,
        command,
        "https://miditostaff.danniehakansson.com"
      );
      break;
    case "css":
      typeAndOpenNewTab(
        text,
        command,
        "https://cssbattle-solutions.danniehakansson.com"
      );
      break;
    case "tobias":
      typeAndOpenNewTab(text, command, "https://tobias.danniehakansson.com");
      break;
    case "alive":
      typeAndOpenNewTab(text, command, "https://alive.danniehakansson.com");
      break;
    case "github":
      typeAndOpenNewTab(text, command, "https://github.com/dhakan");
      break;
    case "cv":
      typeAndOpenNewTab(text, command, "assets/cv-en.pdf");
      break;
    case "music":
      typeAndOpenNewTab(text, command, "https://soundcloud.com/dhakan93");
      break;
    case "list":
      typeAndOpenNewTab(text, command, "https://list.danniehakansson.com");
      break;
    default:
      startTyping({
        text,
        callback: typingDone,
      });
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!input.value.trim().length) {
    return;
  }

  if (isTyping) {
    return;
  }

  const command = input.value.trim().toLowerCase();
  input.value = "";

  window.scroll({ top: 0 });

  isTyping = true;

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("command", command);
  history.pushState({}, "", `${window.location.pathname}?${searchParams}`);

  handleCommand(command);
});

isTyping = true;

const searchParams = new URLSearchParams(window.location.search);
const storedCommand = searchParams.get("command");

if (storedCommand) {
  handleCommand(storedCommand);
} else {
  const helpText = messages.help;

  startTyping({
    text: `${messages.intro}
    
    ${helpText}
    `,
    callback: typingDone,
  });
}
