let isTyping = false;

const typingElement = document.querySelector(".typing");

function startTyping({
  element = typingElement,
  text,
  preformatted = false,
  callback,
} = {}) {
  function type(element, text, doneCallback) {
    if (!text.length) {
      doneCallback();
      return;
    }

    const characters = text.split("");
    const symbol = characters.shift();
    element.append(symbol);

    setTimeout(() => {
      type(element, characters.join(""), doneCallback);
    }, 10);
  }

  function typeLines(element, lines, doneCallback, firstLine = false) {
    if (!lines.length) {
      doneCallback();
      return;
    }

    window.scroll({ top: document.body.scrollHeight });

    if (!firstLine) {
      element.append(document.createElement("br"));
    }

    const line = lines.shift();
    type(element, line, () => {
      typeLines(element, lines, doneCallback);
    });
  }

  if (preformatted) {
    element.classList.add("pre");
  } else {
    element.classList.remove("pre");
  }

  element.textContent = "";

  isTyping = true;
  const lines = text.split("\n");
  console.log(lines);
  typeLines(
    element,
    lines,
    () => {
      isTyping = false;
      callback();
    },
    true
  );
}

export { startTyping };
