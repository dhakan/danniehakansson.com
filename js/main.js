import messages from "./messages.js";
import { startTyping } from "./typing.js";
import { isDesktop } from "./viewport.js";

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

        // handleBlockedPopup(command);
      }, 2000);
    },
  });
}

// function handleBlockedPopup(command) {
//   startTyping({
//     text: `Your browser prevented the link from opening in a new tab. Enable popups from this website and type '${command}' again.`,
//     callback: () => {
//       typingDone();
//     },
//   });
// }

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

  const text = messages[command];

  if (!text) {
    startTyping({
      text: `Unknown command: ${command}
            
      Type 'help' to see available commands...`,
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
    case "youtube":
      typeAndOpenNewTab(
        text,
        command,
        "https://chrome.google.com/webstore/detail/youtube-timestamp-list-pl/bhaebpnlhphfjffkchdccafakpeimnpd"
      );
      break;
    case "midi":
      typeAndOpenNewTab(
        text,
        command,
        "https://miditostaff.danniehakansson.com"
      );
      break;
    case "yatzy":
      typeAndOpenNewTab(text, command, "http://yatzy.danniehakansson.com");
      break;
    case "snake":
      typeAndOpenNewTab(text, command, "https://snake.danniehakansson.com");
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
    case "onykter":
      typeAndOpenNewTab(text, command, "https://onykter.nu");
      break;
    default:
      startTyping({
        text,
        callback: typingDone,
      });
  }
});

isTyping = true;

startTyping({
  text: `...BOOTING UP SYSTEM`,
  preformatted: true,
  callback: () => {
    setTimeout(() => {
      startTyping({
        text: messages.intro,
        preformatted: true,
        callback: typingDone,
      });
    }, 2000);
  },
});
