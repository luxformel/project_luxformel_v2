#!/usr/bin/env python3
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'sitemap.html'

html_files = []
for dirpath, dirnames, filenames in os.walk(ROOT):
    # skip hidden directories like .git
    parts = Path(dirpath).parts
    if any(p.startswith('.') for p in parts):
        continue
    for f in filenames:
        if f.lower().endswith('.html'):
            full = Path(dirpath) / f
            # skip generated sitemap (if rerun)
            # skip generated sitemap (if rerun) and any other sitemap.html files
            if full.resolve() == OUT.resolve():
                continue
            if f.lower() == 'sitemap.html' and Path(dirpath).resolve() == ROOT.resolve():
                continue
            html_files.append(full.relative_to(ROOT))

html_files.sort()

TITLE_RE = re.compile(r'<title>(.*?)</title>', re.IGNORECASE | re.DOTALL)

def extract_title(p: Path):
    try:
        text = p.read_text(encoding='utf-8')
    except Exception:
        try:
            text = p.read_text(encoding='latin-1')
        except Exception:
            return None
    m = TITLE_RE.search(text)
    if m:
        title = m.group(1).strip()
        # remove newlines and extra whitespace
        title = re.sub(r"\s+", " ", title)
        return title
    return None


def pretty_name(p: Path):
    # fallback: filename without extension, replace -, _ and multiple spaces
    name = p.stem
    name = name.replace('-', ' ').replace('_', ' ')
    name = re.sub(r"\s+", ' ', name)
    return name.title()

# group by directory
from collections import defaultdict
groups = defaultdict(list)
for p in html_files:
    groups[str(p.parent)].append(p)

# Build HTML using the new sitemap layout: a visible `#generated-sitemap`
# placeholder and a hidden `#sitemap-source` that contains the raw
# section markup (the client script will consume these and render
# a nested, collapsible view).
lines = []
lines.append('<!DOCTYPE html>')
lines.append('<html lang="en">')
lines.append('  <head>')
lines.append('    <meta charset="utf-8" />')
lines.append('    <meta name="viewport" content="width=device-width,initial-scale=1" />')
lines.append('    <script src="/javascript/header.js"></script>')
lines.append('    <script defer src="/themes/themes.js"></script>')
lines.append('    <link rel="stylesheet" id="theme-set" href="/themes/default.css" />')
lines.append('    <link rel="stylesheet" href="/css/reset.css" />')
if (ROOT / 'css' / 'main.css').exists():
    lines.append('    <link rel="stylesheet" href="/css/main.css" />')
if (ROOT / 'css' / 'sitemap.css').exists():
    lines.append('    <link rel="stylesheet" href="/css/sitemap.css" />')
else:
    lines.append('    <style>body{font-family:system-ui, -apple-system, Roboto, Arial; margin:24px; color:#111} h1{font-size:28px} h2{font-size:18px; margin-top:18px} ul{list-style:none; padding-left:0} li{margin:4px 0} .collapsible{cursor:pointer; display:flex; align-items:center; justify-content:space-between; width:100%; border:0; background:transparent; padding:8px 0} .content{display:none; padding-left:12px} .topic-item{margin-bottom:6px} .caret{width:18px;height:18px}</style>')
lines.append('    <script defer src="/javascript/footer.js"></script>')
lines.append('    <script defer src="/javascript/navigator.js"></script>')
lines.append('    <script defer src="/settings/settings.js"></script>')
lines.append('    <title>Sitemap</title>')
lines.append('  </head>')
lines.append('  <body>')
lines.append('    <header>')
lines.append('      <h1>Sitemap</h1>')
lines.append('    </header>')
lines.append('    <button id="sitemap-toggle-all" class="sitemap-toggle">All Op</button>')
lines.append('    <main class="sitemap-tree">')
lines.append('      <div class="exercise-section" id="generated-sitemap">')
lines.append('        <p></p>')
lines.append('        <!-- The script below will generate a nested, collapsible sitemap')
lines.append('             based on all <a> elements found inside the original sitemap')
lines.append('             content. Existing section markup is consumed and replaced. -->')
lines.append('      </div>')
lines.append('      <!-- Keep original link markup present in DOM so script can read it. -->')
lines.append('      <div id="sitemap-source" style="display: none">')

for group in sorted(groups.keys(), key=lambda s: (s == '.', s.lower())):
    display_group = 'Root' if group == '.' else group.replace('\\\\', '/').lstrip('./')
    lines.append('        <section>')
    lines.append(f'          <h2>{display_group}</h2>')
    lines.append('          <ul>')
    for p in sorted(groups[group]):
        title = extract_title(ROOT / p) or pretty_name(p)
        href = str(p).replace('\\\\', '/')
        lines.append(f'            <li><a href="{href}">{title}</a></li>')
    lines.append('          </ul>')
    lines.append('        </section>')

lines.append('      </div>')
lines.append('    </main>')

lines.append('    <script>')
lines.append('      // Build a hierarchical sitemap from <section> headings (split on \'/\')')
lines.append('      document.addEventListener("DOMContentLoaded", function () {')
lines.append('        const container = document.querySelector(".sitemap-tree");')
lines.append('        if (!container) return;')

lines.append('        const sections = Array.from(container.querySelectorAll("section"));')
lines.append('        // Node structure: { children: Map<name,node>, content: string }')
lines.append('        function makeNode() {')
lines.append('          return { children: Object.create(null), content: null };')
lines.append('        }')
lines.append('        const root = makeNode();')

lines.append('        sections.forEach((sec) => {')
lines.append('          const h2 = sec.querySelector("h2");')
lines.append('          if (!h2) return;')
lines.append('          const title = h2.textContent.trim();')
lines.append('          const ul = sec.querySelector("ul");')
lines.append('          const contentHTML = ul ? ul.innerHTML : "";')
lines.append('          const segments = title')
lines.append('            .split("/")')
lines.append('            .map((s) => s.trim())')
lines.append('            .filter(Boolean);')
lines.append('          if (segments.length === 0) return;')

lines.append('          let current = root;')
lines.append('          for (let i = 0; i < segments.length; i++) {')
lines.append('            const seg = segments[i];')
lines.append('            if (!current.children[seg]) current.children[seg] = makeNode();')
lines.append('            if (i === segments.length - 1) {')
lines.append('              // leaf: attach content (if multiple sections with same leaf, concatenate)')
lines.append('              if (current.children[seg].content) {')
lines.append('                current.children[seg].content += contentHTML;')
lines.append('              } else {')
lines.append('                current.children[seg].content = contentHTML;')
lines.append('              }')
lines.append('            }')
lines.append('            current = current.children[seg];')
lines.append('          }')
lines.append('        });')

lines.append('        // Render nodes recursively into DOM topic-items')
lines.append('        function createCaret() {')
lines.append('          const caret = document.createElementNS(')
lines.append('            "http://www.w3.org/2000/svg",')
lines.append('            "svg"')
lines.append('          );')
lines.append('          caret.setAttribute("class", "caret");')
lines.append('          caret.setAttribute("viewBox", "0 0 24 24");')
lines.append('          caret.innerHTML = "<path d=\\"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z\\"/>";')
lines.append('          return caret;')
lines.append('        }')

lines.append('        function renderNode(name, node) {')
lines.append('          const wrapper = document.createElement("div");')
lines.append('          wrapper.className = "topic-item";')

lines.append('          const btn = document.createElement("button");')
lines.append('          btn.className = "collapsible";')
lines.append('          const p = document.createElement("p");')
lines.append('          p.textContent = name;')
lines.append('          btn.appendChild(p);')
lines.append('          btn.appendChild(createCaret());')

lines.append('          const content = document.createElement("div");')
lines.append('          content.className = "content";')

lines.append('          // If node has content (links), append them first')
lines.append('          if (node.content) {')
lines.append('            // contentHTML already contains <li> entries inside a <ul>')
lines.append('            // ensure it is wrapped in a UL')
lines.append('            const ul = document.createElement("ul");')
lines.append('            ul.innerHTML = node.content;')
lines.append('            content.appendChild(ul);')
lines.append('          }')

lines.append('          // Then render child nodes')
lines.append('          Object.keys(node.children).forEach((childName) => {')
lines.append('            const childNode = node.children[childName];')
lines.append('            const childWrapper = renderNode(childName, childNode);')
lines.append('            content.appendChild(childWrapper);')
lines.append('          });')

lines.append('          wrapper.appendChild(btn);')
lines.append('          wrapper.appendChild(content);')
lines.append('          return wrapper;')
lines.append('        }')

lines.append('        // Remove all original sections')
lines.append('        sections.forEach((s) => s.remove());')

lines.append('        // Render top-level nodes in the container')
lines.append('        Object.keys(root.children).forEach((topName) => {')
lines.append('          const node = root.children[topName];')
lines.append('          const el = renderNode(topName, node);')
lines.append('          container.appendChild(el);')
lines.append('        });')

lines.append('        // Attach toggle behaviour and add global expand/collapse + responsive auto-open')
lines.append('        const collapsibles = Array.from(')
lines.append('          container.querySelectorAll(".collapsible")')
lines.append('        );')

lines.append('        function setPanelState(btn, expanded) {')
lines.append('          btn.classList.toggle("active", expanded);')
lines.append('          const p = btn.nextElementSibling;')
lines.append('          if (p) p.style.display = expanded ? "block" : "none";')
lines.append('        }')

lines.append('        function updateToggleAllText(expanded) {')
lines.append('          const t = document.getElementById("sitemap-toggle-all");')
lines.append('          if (!t) return;')
lines.append('          t.textContent = expanded ? "All Zou" : "All Op";')
lines.append('        }')

lines.append('        function setAll(expanded) {')
lines.append('          collapsibles.forEach((b) => setPanelState(b, expanded));')
lines.append('          updateToggleAllText(expanded);')
lines.append('        }')

lines.append('        // click handler for individual items')
lines.append('        collapsibles.forEach((btn) => {')
lines.append('          const panel = btn.nextElementSibling;')
lines.append('          // keep initial state handled by setAll')
lines.append('          btn.addEventListener("click", function () {')
lines.append('            const isActive = btn.classList.toggle("active");')
lines.append('            if (panel) panel.style.display = isActive ? "block" : "none";')
lines.append('            const allExpanded = collapsibles.every((b) =>')
lines.append('              b.classList.contains("active")')
lines.append('            );')
lines.append('            updateToggleAllText(allExpanded);')
lines.append('          });')
lines.append('        });')

lines.append('        // global toggle button')
lines.append('        const headerEl = document.querySelector("header");')
lines.append('        const globalBtn = document.getElementById("sitemap-toggle-all");')
lines.append('        if (globalBtn) {')
lines.append('          globalBtn.addEventListener("click", () => {')
lines.append('            const anyCollapsed = collapsibles.some(')
lines.append('              (b) => !b.classList.contains("active")')
lines.append('            );')
lines.append('            setAll(anyCollapsed);')
lines.append('          });')
lines.append('        }')

lines.append('        // Auto-expand on wide screens and respond to changes')
lines.append('        const mq = window.matchMedia("(min-width: 900px)");')
lines.append('        setAll(mq.matches);')
lines.append('        if (mq.addEventListener) {')
lines.append('          mq.addEventListener("change", (e) => setAll(e.matches));')
lines.append('        } else if (mq.addListener) {')
lines.append('          mq.addListener((e) => setAll(e.matches));')
lines.append('        }')
lines.append('      });')
lines.append('    </script>')

lines.append('    <footer></footer>')
lines.append('  </body>')
lines.append('</html>')

OUT.write_text('\n'.join(lines), encoding='utf-8')
print(f'Wrote {OUT} with {len(html_files)} entries')
