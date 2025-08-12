import { useEffect } from "react";

type SEOProps = {
  title?: string;
  description?: string;
  canonical?: string;
  keywords?: string[];
  jsonLd?: Record<string, unknown> | null;
  jsonLdId?: string; 
};

function upsertMeta(name: string, content: string) {
  if (!content) return;
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  if (!href) return;
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SEO({
  title,
  description,
  canonical,
  keywords,
  jsonLd,
  jsonLdId = "jsonld-primary",
}: SEOProps) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMeta("description", description);
    if (keywords?.length) upsertMeta("keywords", keywords.join(", "));
    if (canonical) upsertLink("canonical", canonical);

    // JSON‑LD
    const existing = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (jsonLd) {
      const script = existing ?? document.createElement("script");
      script.type = "application/ld+json";
      script.id = jsonLdId;
      script.text = JSON.stringify(jsonLd);
      if (!existing) document.head.appendChild(script);
    } else if (existing) {
      existing.remove();
    }
  }, [title, description, canonical, keywords, jsonLd, jsonLdId]);

  return null;
}