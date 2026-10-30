/**
 * Rehype-plugin: zet het basispad voor interne links en afbeeldingen
 * in nieuwsberichten (bijv. /media/foto.jpg -> /repo/media/foto.jpg).
 */
export default function rehypeBase(base) {
  const prefix = (v) =>
    typeof v === 'string' && v.startsWith('/') && !v.startsWith('//') && !v.startsWith(base + '/')
      ? base + v
      : v;
  const walk = (node) => {
    // HTML uit de editor komt binnen als ruwe tekst
    if (node.type === 'raw' && typeof node.value === 'string') {
      node.value = node.value.replace(/\b(src|href)="\/(?!\/)/g, `$1="${base}/`);
    }
    if (node.type === 'element' && node.properties) {
      for (const key of ['src', 'href']) {
        if (key in node.properties) node.properties[key] = prefix(node.properties[key]);
      }
    }
    node.children?.forEach(walk);
  };
  return () => (tree) => {
    if (base) walk(tree);
  };
}
