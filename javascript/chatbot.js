// Minimal ELIZA-style chatbot + link suggestion
(function () {
  const INDEX_URL = "/scripts/link_index.json";
  let linkIndex = [];

  function normalize(text) {
    return text
      .toLowerCase()
      .replace(/[\W_]+/g, " ")
      .trim();
  }

  function tokenize(text) {
    return normalize(text).split(/\s+/).filter(Boolean);
  }

  // Simple ELIZA-like reflections
  const reflections = {
    i: "you",
    me: "you",
    my: "your",
    am: "are",
    you: "I",
    your: "my",
  };

  function reflect(fragment) {
    return fragment
      .split(/\s+/)
      .map((w) => reflections[w] || w)
      .join(" ");
  }

  const patterns = [
    [
      /^\s*hello|hi|hey\b/i,
      [
        "Hello! How can I help you find pages on this site?",
        "Hi — ask me about topics or pages.",
      ],
    ],
    [
      /^\s*i need (.*)/i,
      ["Why do you need %1?", "What would finding %1 help you do?"],
    ],
    [/^\s*why (.*)/i, ["Why do you ask why %1?", "What do you think? %1"]],
    [
      /^\s*how (.*)/i,
      ["How do you imagine %1?", "What would you like to achieve with %1?"],
    ],
    [
      /^\s*do you know (.*)/i,
      ["I can look for pages about %1.", "I can suggest pages related to %1."],
    ],
    [
      /^\s*can you (.*)/i,
      [
        "I can try to help with %1.",
        "I may be able to point to pages about %1.",
      ],
    ],
  ];

  function elizaReply(text) {
    for (let [rx, replies] of patterns) {
      const m = text.match(rx);
      if (m) {
        let reply = replies[Math.floor(Math.random() * replies.length)];
        for (let i = 1; i < m.length; i++)
          reply = reply.replace("%" + i, reflect(m[i].toLowerCase()));
        return reply;
      }
    }
    // fallback
    return (
      "I can suggest pages about " +
      (tokenize(text).slice(0, 5).join(" ") || "that") +
      "."
    );
  }

  function scorePage(tokens, page) {
    let score = 0;
    const title = (page.title || "").toLowerCase();
    const desc = (page.description || "").toLowerCase();
    const tset = new Set(page.tokens || []);
    for (let tk of tokens) {
      if (tset.has(tk)) score += 3;
      if (title.includes(tk)) score += 4;
      if (desc.includes(tk)) score += 2;
      if ((page.url || "").toLowerCase().includes(tk)) score += 1;
    }
    return score;
  }

  function suggestLinks(query, limit = 5) {
    const tokens = tokenize(query).filter((t) => t.length > 1);
    if (!tokens.length) return [];
    const scored = linkIndex
      .map((p) => ({ p, score: scorePage(tokens, p) }))
      .filter((x) => x.score > 0);
    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map((x) => x.p);
  }

  function makeBubble(text, who = "bot") {
    const el = document.createElement("div");
    el.className = "msg " + (who === "bot" ? "bot" : "user");
    el.textContent = text;
    return el;
  }

  function renderSuggestions(list) {
    if (!list || !list.length) return null;
    const ul = document.createElement("ul");
    ul.className = "suggestion-list";
    list.forEach((item) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = item.url;
      a.textContent = item.title || item.url;
      a.addEventListener("click", (e) => {});
      li.appendChild(a);
      if (item.description) {
        const d = document.createElement("div");
        d.className = "small-desc";
        d.textContent = item.description;
        li.appendChild(d);
      }
      ul.appendChild(li);
    });
    return ul;
  }

  function appendMessage(container, node) {
    const messages = container.querySelector(".chatbot-messages");
    messages.appendChild(node);
    messages.scrollTop = messages.scrollHeight;
  }

  // Build UI. If a container element with id `chatbot-root` exists, attach UI there
  function createUI() {
    const existingRoot = document.getElementById("chatbot-root");

    const useFloating = !existingRoot;

    let win;
    let input;

    if (useFloating) {
      const toggle = document.createElement("button");
      toggle.className = "chatbot-toggle";
      toggle.innerText = "💬";

      win = document.createElement("div");
      win.className = "chatbot-window";
      win.style.display = "none";

      document.body.appendChild(toggle);
      document.body.appendChild(win);

      toggle.addEventListener("click", () => {
        win.style.display = win.style.display === "none" ? "flex" : "none";
        if (win.style.display === "flex" && input) input.focus();
      });
    } else {
      // attach inside provided root
      win = existingRoot;
      win.classList.add("chatbot-window");
      win.style.display = "flex";
    }

    const header = document.createElement("div");
    header.className = "chatbot-header";
    header.textContent = "Site Assistant";
    const messages = document.createElement("div");
    messages.className = "chatbot-messages";
    const inputRow = document.createElement("div");
    inputRow.className = "chatbot-input";
    input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Ask about topics or pages...";
    const send = document.createElement("button");
    send.textContent = "Send";
    inputRow.appendChild(input);
    inputRow.appendChild(send);

    // clear existing root contents if any
    while (win.firstChild) win.removeChild(win.firstChild);
    win.appendChild(header);
    win.appendChild(messages);
    win.appendChild(inputRow);

    function userSend() {
      const text = input.value.trim();
      if (!text) return;
      appendMessage(win, makeBubble(text, "user"));
      input.value = "";
      const reply = elizaReply(text);
      appendMessage(win, makeBubble(reply, "bot"));
      const suggestions = suggestLinks(text, 3);
      if (suggestions.length) {
        const box = document.createElement("div");
        box.className = "msg bot";
        const head = document.createElement("div");
        head.textContent = "Suggested pages:";
        box.appendChild(head);
        const list = renderSuggestions(suggestions);
        if (list) box.appendChild(list);
        appendMessage(win, box);
      }
    }

    send.addEventListener("click", userSend);
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") userSend();
    });

    // initial greeting
    appendMessage(
      win,
      makeBubble(
        "Hi — I can help you find pages on this site. Try asking about a topic.",
        "bot",
      ),
    );
  }

  function loadIndex() {
    return fetch(INDEX_URL)
      .then((r) => {
        if (!r.ok) throw new Error("no index");
        return r.json();
      })
      .then((j) => {
        linkIndex = j;
      })
      .catch(() => {
        linkIndex = [];
      });
  }

  // initialize when DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    createUI();
    loadIndex();
  });
})();
