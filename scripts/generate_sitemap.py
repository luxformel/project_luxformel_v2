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
        # --- MODIFICATIONS START HERE ---
        # Remove soft hyphens
        title = title.replace('&shy;', '').replace('\u00ad', '')
        # Replace dashes with spaces
        title = title.replace('-', ' ')
        # remove newlines and extra whitespace
        title = re.sub(r"\s+", " ", title)
        # --- MODIFICATIONS END HERE ---
        return title
    return None


def pretty_name(p: Path):
    # fallback: filename without extension
    name = p.stem
    # Replace dashes and underscores with spaces, remove soft hyphens
    name = name.replace('&shy;', '').replace('\u00ad', '')
    name = name.replace('-', ' ').replace('_', ' ')
    name = re.sub(r"\s+", ' ', name)
    return name.title()

# group by directory
from collections import defaultdict
groups = defaultdict(list)
for p in html_files:
    groups[str(p.parent)].append(p)

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
lines.append('      </div>')
lines.append('      <div id="sitemap-source" style="display: none">')

for group in sorted(groups.keys(), key=lambda s: (s == '.', s.lower())):
    # Also clean up the group (directory) names for dashes and soft hyphens
    display_group = 'Root' if group == '.' else group.replace('\\\\', '/').lstrip('./')
    display_group = display_group.replace('-', ' ').replace('&shy;', '').replace('\u00ad', '')
    
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

# ... (rest of the JavaScript lines remain unchanged)
lines.append('    <script>')
lines.append('      document.addEventListener("DOMContentLoaded", function () {')
lines.append('        const container = document.querySelector(".sitemap-tree");')
lines.append('        if (!container) return;')
lines.append('        const sections = Array.from(container.querySelectorAll("section"));')
lines.append('        function makeNode() { return { children: Object.create(null), content: null }; }')
lines.append('        const root = makeNode();')
lines.append('        sections.forEach((sec) => {')
lines.append('          const h2 = sec.querySelector("h2");')
lines.append('          if (!h2) return;')
lines.append('          const title = h2.textContent.trim();')
lines.append('          const ul = sec.querySelector("ul");')
lines.append('          const contentHTML = ul ? ul.innerHTML : "";')
lines.append('          const segments = title.split("/").map((s) => s.trim()).filter(Boolean);')
lines.append('          if (segments.length === 0) return;')
lines.append('          let current = root;')
lines.append('          for (let i = 0; i < segments.length; i++) {')
lines.append('            const seg = segments[i];')
lines.append('            if (!current.children[seg]) current.children[seg] = makeNode();')
lines.append('            if (i === segments.length - 1) {')
lines.append('              if (current.children[seg].content) { current.children[seg].content += contentHTML; }')
lines.append('              else { current.children[seg].content = contentHTML; }')
lines.append('            }')
lines.append('            current = current.children[seg];')
lines.append('          }')
lines.append('        });')
lines.append('        function createCaret() {')
lines.append('          const caret = document.createElementNS("http://www.w3.org/2000/svg", "svg");')
lines.append('          caret.setAttribute("class", "caret"); caret.setAttribute("viewBox", "0 0 24 24");')
lines.append('          caret.innerHTML = "<path d=\\"M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z\\"/>";')
lines.append('          return caret;')
lines.append('        }')
lines.append('        function renderNode(name, node) {')
lines.append('          const wrapper = document.createElement("div"); wrapper.className = "topic-item";')
lines.append('          const btn = document.createElement("button"); btn.className = "collapsible";')
lines.append('          const p = document.createElement("p"); p.textContent = name; btn.appendChild(p); btn.appendChild(createCaret());')
lines.append('          const content = document.createElement("div"); content.className = "content";')
lines.append('          if (node.content) { const ul = document.createElement("ul"); ul.innerHTML = node.content; content.appendChild(ul); }')
lines.append('          Object.keys(node.children).forEach((childName) => {')
lines.append('            const childNode = node.children[childName];')
lines.append('            const childWrapper = renderNode(childName, childNode); content.appendChild(childWrapper);')
lines.append('          });')
lines.append('          wrapper.appendChild(btn); wrapper.appendChild(content); return wrapper;')
lines.append('        }')
lines.append('        sections.forEach((s) => s.remove());')
lines.append('        Object.keys(root.children).forEach((topName) => {')
lines.append('          const node = root.children[topName];')
lines.append('          const el = renderNode(topName, node); container.appendChild(el);')
lines.append('        });')
lines.append('        const collapsibles = Array.from(container.querySelectorAll(".collapsible"));')
lines.append('        function setPanelState(btn, expanded) {')
lines.append('          btn.classList.toggle("active", expanded);')
lines.append('          const p = btn.nextElementSibling; if (p) p.style.display = expanded ? "block" : "none";')
lines.append('        }')
lines.append('        function updateToggleAllText(expanded) {')
lines.append('          const t = document.getElementById("sitemap-toggle-all");')
lines.append('          if (t) t.textContent = expanded ? "All Zou" : "All Op";')
lines.append('        }')
lines.append('        function setAll(expanded) {')
lines.append('          collapsibles.forEach((b) => setPanelState(b, expanded)); updateToggleAllText(expanded);')
lines.append('        }')
lines.append('        collapsibles.forEach((btn) => {')
lines.append('          const panel = btn.nextElementSibling;')
lines.append('          btn.addEventListener("click", function () {')
lines.append('            const isActive = btn.classList.toggle("active");')
lines.append('            if (panel) panel.style.display = isActive ? "block" : "none";')
lines.append('            const allExpanded = collapsibles.every((b) => b.classList.contains("active"));')
lines.append('            updateToggleAllText(allExpanded);')
lines.append('          });')
lines.append('        });')
lines.append('        const globalBtn = document.getElementById("sitemap-toggle-all");')
lines.append('        if (globalBtn) {')
lines.append('          globalBtn.addEventListener("click", () => {')
lines.append('            const anyCollapsed = collapsibles.some((b) => !b.classList.contains("active"));')
lines.append('            setAll(anyCollapsed);')
lines.append('          });')
lines.append('        }')
lines.append('        const mq = window.matchMedia("(min-width: 900px)");')
lines.append('        setAll(mq.matches);')
lines.append('        if (mq.addEventListener) { mq.addEventListener("change", (e) => setAll(e.matches)); }')
lines.append('      });')
lines.append('    </script>')
lines.append('    <footer></footer>')
lines.append('  </body>')
lines.append('</html>')

OUT.write_text('\n'.join(lines), encoding='utf-8')
print(f'Wrote {OUT} with {len(html_files)} entries')