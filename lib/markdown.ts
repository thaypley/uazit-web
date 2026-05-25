export function markdownToHtml(md: string): string {
  return md
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      // headings
      if (trimmed.startsWith("### ")) return `<h3>${inline(trimmed.slice(4))}</h3>`;
      if (trimmed.startsWith("## ")) return `<h2>${inline(trimmed.slice(3))}</h2>`;
      if (trimmed.startsWith("# ")) return `<h1>${inline(trimmed.slice(2))}</h1>`;

      // blockquote
      if (trimmed.startsWith("> ")) {
        const content = trimmed.replace(/^> /gm, "");
        return `<blockquote>${inline(content)}</blockquote>`;
      }

      // unordered list
      if (/^[-*] /m.test(trimmed)) {
        const items = trimmed
          .split(/\n/)
          .filter((l) => l.match(/^[-*] /))
          .map((l) => `<li>${inline(l.replace(/^[-*] /, ""))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }

      // ordered list
      if (/^\d+\. /m.test(trimmed)) {
        const items = trimmed
          .split(/\n/)
          .filter((l) => l.match(/^\d+\. /))
          .map((l) => `<li>${inline(l.replace(/^\d+\. /, ""))}</li>`)
          .join("");
        return `<ol>${items}</ol>`;
      }

      // paragraph
      return `<p>${inline(trimmed.replace(/\n/g, " "))}</p>`;
    })
    .join("\n");
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}
