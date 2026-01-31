#!/usr/bin/env python3
"""
Generate a simple JSON index of HTML pages for the chatbot.
Run from the repository root: python3 scripts/generate_link_index.py
"""
import os, re, json
from html import unescape
from html.parser import HTMLParser
import unicodedata

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
OUT = os.path.join(os.path.dirname(__file__), 'link_index.json')
# directories we don't want to scan
EXCLUDE_DIRS = set(['.git', 'node_modules', 'scripts', 'css', 'javascript', 'img', 'favicons', 'fonts', 'pwa', 'temp', 'Error'])
# Expanded stopwords: English + some common German words and filler tokens
STOPWORDS = set([
    "the", "and", "or", "of", "in", "on", "a", "an", "to", "for", "with", "by", "is", "are", "this", "that",
    "der", "die", "das", "ein", "eine", "und", "oder", "von", "im", "in", "zu", "mit", "auf", "ist", "sind",
    "index", "html", "www", "com", "de"
])

# Manual excludes by relative path (relative to repo root). Example: 'Error/index.html' or 'Divers/alphabet.html'
EXCLUDE_PATHS = set(["changelog.html"])
# Regex patterns to match against the relative path. Example: r'^Error/'
EXCLUDE_PATTERNS = []
# Optional excludes file (one path or pattern per line). Lines starting with '#' are ignored.
EXCLUDE_FILE = os.path.join(os.path.dirname(__file__), 'exclude_paths.txt')
if os.path.exists(EXCLUDE_FILE):
    try:
        with open(EXCLUDE_FILE, 'r', encoding='utf-8') as ef:
            for ln in ef:
                ln = ln.strip()
                if not ln or ln.startswith('#'):
                    continue
                # treat lines that look like regex (start with re:) as patterns
                if ln.startswith('re:'):
                    EXCLUDE_PATTERNS.append(ln[3:])
                else:
                    EXCLUDE_PATHS.add(ln.lstrip('/'))
    except Exception:
        pass

def find_html_files():
    for dirpath, dirnames, filenames in os.walk(ROOT):
        # skip excluded dirs
        parts = set(dirpath.replace(ROOT, '').split(os.sep))
        if parts & EXCLUDE_DIRS:
            continue
        for fn in filenames:
            if fn.lower().endswith('.html'):
                yield os.path.join(dirpath, fn)

def extract_title(html):
    m = re.search(r'<title>(.*?)</title>', html, re.I | re.S)
    if m:
        return re.sub(r'\s+', ' ', unescape(m.group(1))).strip()
    return ''

def extract_meta_description(html):
    m = re.search(r'<meta\s+[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', html, re.I | re.S)
    if m:
        return unescape(m.group(1).strip())
    return ''

def extract_meta_keywords(html):
    m = re.search(r'<meta\s+[^>]*name=["\']keywords["\'][^>]*content=["\'](.*?)["\']', html, re.I | re.S)
    if m:
        return unescape(m.group(1).strip())
    return ''


def extract_meta_robots(html):
    m = re.search(r'<meta\s+[^>]*name=["\']robots["\'][^>]*content=["\'](.*?)["\']', html, re.I | re.S)
    if m:
        return m.group(1).lower()
    return ''


def should_exclude_path(relpath, html_text=None):
    # exact match
    if relpath in EXCLUDE_PATHS:
        return True
    # prefix match for convenience
    for p in EXCLUDE_PATHS:
        if p.endswith('/') and relpath.startswith(p):
            return True
        if relpath.startswith(p + '/'):
            return True
    for pat in EXCLUDE_PATTERNS:
        try:
            if re.search(pat, relpath, re.I):
                return True
        except re.error:
            continue
    if html_text:
        robots = extract_meta_robots(html_text)
        if 'noindex' in robots:
            return True
    return False


# Language-specific stopwords (small, extendable lists)
STOPWORDS_EN = set([
    'the','and','or','of','in','on','a','an','to','for','with','by','is','are','this','that','it','from','as','at','be','was','were'
])
STOPWORDS_DE = set([
    'der','die','das','ein','eine','und','oder','von','im','in','zu','mit','auf','ist','sind','nicht','den','des','dem','einige'
])
STOPWORDS_FR = set([
    'le','la','les','un','une','et','ou','de','des','du','en','dans','pour','avec','par','est','sont','ce','cette','qui'
])


def extract_headings(html):
    hs = re.findall(r'<h[1-3][^>]*>(.*?)</h[1-3]>', html, re.I | re.S)
    cleaned = []
    for h in hs:
        t = re.sub(r'<[^>]+>', ' ', h)
        t = re.sub(r'\s+', ' ', unescape(t)).strip()
        if t:
            cleaned.append(t)
    return cleaned


def detect_language(html, sample_text=''):
    # 1) check html lang attribute
    m = re.search(r'<html[^>]*lang=["\']?([a-zA-Z-]+)', html, re.I)
    if m:
        lang = m.group(1).lower()
        if lang.startswith('de'):
            return 'de'
        if lang.startswith('fr'):
            return 'fr'
        if lang.startswith('en'):
            return 'en'
    # 2) check meta http-equiv / name language
    m2 = re.search(r'<meta[^>]*(?:http-equiv|name)=["\']?(?:content-language|language)["\']?[^>]*content=["\'](.*?)["\']', html, re.I)
    if m2:
        v = m2.group(1).lower()
        if v.startswith('de'):
            return 'de'
        if v.startswith('fr'):
            return 'fr'
        if v.startswith('en'):
            return 'en'
    # 3) simple stopword scoring on sample_text
    s = normalize_text(sample_text)
    toks = set(re.findall(r"[a-z0-9\-]+", s))
    scores = {'en': 0, 'de': 0, 'fr': 0}
    scores['en'] = len(toks & STOPWORDS_EN)
    scores['de'] = len(toks & STOPWORDS_DE)
    scores['fr'] = len(toks & STOPWORDS_FR)
    best = max(scores, key=lambda k: scores[k])
    # if no hits, default to english
    if scores[best] == 0:
        return 'en'
    return best


class VisibleTextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self._texts = []
        self._skip = False

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self._skip = True

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self._skip = False

    def handle_data(self, data):
        if not self._skip:
            txt = data.strip()
            if txt:
                self._texts.append(txt)

    def handle_comment(self, data):
        pass

    def get_text(self):
        return ' '.join(self._texts)

def normalize_text(s):
    s = unescape(s or '')
    # Normalize unicode and remove diacritics
    s = unicodedata.normalize('NFKD', s)
    s = ''.join(ch for ch in s if not unicodedata.combining(ch))
    return s.lower()


def tokenize_text(s, lang=None):
    s = normalize_text(s)
    # choose stopwords: base + language specific
    lang_sw = set()
    if lang == 'de':
        lang_sw = STOPWORDS_DE
    elif lang == 'fr':
        lang_sw = STOPWORDS_FR
    else:
        lang_sw = STOPWORDS_EN
    sw = STOPWORDS.union(lang_sw)

    toks = re.findall(r"[a-z0-9\-]+", s)
    toks = [t.strip('-') for t in toks if t and len(t) > 1]
    filtered = [t for t in toks if t not in sw]

    out = []
    # unigrams
    out.extend(filtered)
    # bigrams
    for a, b in zip(filtered, filtered[1:]):
        out.append(a + ' ' + b)
    # trigrams
    for a, b, c in zip(filtered, filtered[1:], filtered[2:]):
        out.append(a + ' ' + b + ' ' + c)
    return out

def build_index():
    out = []
    for path in find_html_files():
        try:
            with open(path, 'r', encoding='utf-8') as f:
                html = f.read()
        except Exception:
            continue
        # relative path used for excludes and URL construction
        rel = os.path.relpath(path, ROOT).replace('\\', '/')
        if should_exclude_path(rel, html):
            continue

        title = extract_title(html)
        desc = extract_meta_description(html)
        keywords = extract_meta_keywords(html)
        extractor = VisibleTextExtractor()
        try:
            extractor.feed(html)
            body_text = extractor.get_text()
        except Exception:
            body_text = ''

        # include headings for language detection and weighting
        headings = extract_headings(html)
        rel = os.path.relpath(path, ROOT).replace('\\', '/')
        name = os.path.basename(rel)
        if name == 'index.html':
            dirp = os.path.dirname(rel)
            url = '/' + (dirp + '/' if dirp else '')
        else:
            url = '/' + rel

        # detect language using html attribute and sample text (title+headings+desc+body prefix)
        sample = ' '.join([title, ' '.join(headings), desc, body_text[:8000]])
        lang = detect_language(html, sample)

        path_tokens = rel.replace('/', ' ')
        combined = ' '.join([title, desc, keywords, ' '.join(headings), body_text, path_tokens])
        raw_tokens = tokenize_text(combined, lang=lang)
        tokens = sorted(set(raw_tokens))
        out.append({'url': url, 'title': title, 'description': desc, 'lang': lang, 'tokens': tokens})
    return out

def main():
    idx = build_index()
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(idx, f, ensure_ascii=False, indent=2)
    print('Wrote', OUT, 'entries=', len(idx))

if __name__ == '__main__':
    main()
