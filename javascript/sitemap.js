// Build a hierarchical "family tree" sitemap from the existing <section><h2>path</h2><ul>...</ul>
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");
  if (!main) return;
  main.classList.add("sitemap-tree");

  // gather sections and build a nested data structure
  const sections = Array.from(document.querySelectorAll("main section"));
  const root = { children: new Map(), items: [] };

  sections.forEach((section) => {
    const h2 = section.querySelector("h2");
    const ul = section.querySelector("ul");
    if (!h2 || !ul) return;

    const path = h2.textContent.trim();
    const parts = path
      .split("/")
      .map((p) => p.trim())
      .filter(Boolean);

    // collect link HTML from this section
    const items = Array.from(ul.querySelectorAll("a")).map((a) => ({
      href: a.getAttribute("href"),
      title: a.textContent.trim(),
    }));

    // insert into tree
    let node = root;
    parts.forEach((part) => {
      if (!node.children.has(part))
        node.children.set(part, { children: new Map(), items: [] });
      node = node.children.get(part);
    });
    // append items to the final node
    node.items.push(...items);
  });

  // remove original sections
  sections.forEach((s) => s.remove());

  // helper to create link list
  function createItemsList(items) {
    const ul = document.createElement("ul");
    ul.className = "node-items";
    items.forEach((it) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = it.href;
      a.textContent = it.title;
      li.appendChild(a);
      ul.appendChild(li);
    });
    return ul;
  }

  // recursive builder
  function buildNode(name, node, depth = 0) {
    const li = document.createElement("li");
    li.className = "tree-node";
    li.dataset.depth = String(depth);

    const header = document.createElement("div");
    header.className = "node-header";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "toggle-btn";
    btn.setAttribute("aria-expanded", "true");
    btn.innerHTML = `<span class="caret">▾</span><span class="node-title">${name}</span>`;
    header.appendChild(btn);
    li.appendChild(header);

    // children container
    const container = document.createElement("div");
    container.className = "node-children";

    // child nodes
    if (node.children.size) {
      const childUl = document.createElement("ul");
      childUl.className = "child-nodes";
      node.children.forEach((childNode, childName) => {
        childUl.appendChild(buildNode(childName, childNode, depth + 1));
      });
      container.appendChild(childUl);
    }

    // items (links)
    if (node.items && node.items.length) {
      container.appendChild(createItemsList(node.items));
    }

    li.appendChild(container);

    // toggle logic
    function setCollapsed(collapsed) {
      btn.setAttribute("aria-expanded", String(!collapsed));
      if (collapsed) container.style.display = "none";
      else container.style.display = "";
      li.classList.toggle("collapsed", collapsed);
      const caret = btn.querySelector(".caret");
      if (caret) caret.style.transform = collapsed ? "rotate(-90deg)" : "";
    }

    // collapse on small screens by default
    const small =
      window.matchMedia && window.matchMedia("(max-width:720px)").matches;
    if (small) setCollapsed(true);

    btn.addEventListener("click", () =>
      setCollapsed(!li.classList.contains("collapsed"))
    );
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setCollapsed(!li.classList.contains("collapsed"));
      }
    });

    return li;
  }

  // build top-level tree
  const treeWrap = document.createElement("div");
  treeWrap.className = "family-tree";
  const treeRootUl = document.createElement("ul");
  treeRootUl.className = "root-nodes";
  root.children.forEach((node, name) =>
    treeRootUl.appendChild(buildNode(name, node))
  );
  // if root had items (unlikely), append them under a "root" node
  if (root.items && root.items.length) {
    const rootNode = document.createElement("li");
    rootNode.className = "tree-node";
    const header = document.createElement("div");
    header.className = "node-header";
    header.innerHTML = `<span class="node-title">Root</span>`;
    rootNode.appendChild(header);
    rootNode.appendChild(createItemsList(root.items));
    treeRootUl.insertBefore(rootNode, treeRootUl.firstChild);
  }

  treeWrap.appendChild(treeRootUl);

  // insert tree after page intro (h1/p)
  const title = main.querySelector("h1");
  const intro = main.querySelector("p");
  if (intro) intro.insertAdjacentElement("afterend", treeWrap);
  else if (title) title.insertAdjacentElement("afterend", treeWrap);

  // add expand/collapse all control
  const controls = document.createElement("div");
  controls.className = "tree-controls";
  controls.innerHTML =
    '<button type="button" class="expand-all">Expand all</button> <button type="button" class="collapse-all">Collapse all</button>';
  if (title) title.insertAdjacentElement("beforebegin", controls);

  controls.querySelector(".expand-all").addEventListener("click", () => {
    treeWrap.querySelectorAll(".tree-node").forEach((n) => {
      n.classList.remove("collapsed");
      const c = n.querySelector(".node-children");
      if (c) c.style.display = "";
      const btn = n.querySelector(".toggle-btn");
      if (btn) btn.setAttribute("aria-expanded", "true");
      const caret = n.querySelector(".caret");
      if (caret) caret.style.transform = "";
    });
  });
  controls.querySelector(".collapse-all").addEventListener("click", () => {
    treeWrap.querySelectorAll(".tree-node").forEach((n) => {
      n.classList.add("collapsed");
      const c = n.querySelector(".node-children");
      if (c) c.style.display = "none";
      const btn = n.querySelector(".toggle-btn");
      if (btn) btn.setAttribute("aria-expanded", "false");
      const caret = n.querySelector(".caret");
      if (caret) caret.style.transform = "rotate(-90deg)";
    });
  });
});
