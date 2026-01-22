import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogType?: string;
  jsonLd?: object;
}

export const useSEO = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = "website",
  jsonLd,
}: SEOProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Helper to update or create meta tag
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Helper to update or create link tag
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement;
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Standard meta tags
    setMetaTag("description", description);
    setMetaTag("robots", "index, follow");
    
    if (keywords) {
      setMetaTag("keywords", keywords);
    }

    // Open Graph tags
    setMetaTag("og:title", title, true);
    setMetaTag("og:description", description, true);
    setMetaTag("og:type", ogType, true);
    setMetaTag("og:site_name", "SRH CARS LTD", true);
    
    if (canonicalUrl) {
      setMetaTag("og:url", canonicalUrl, true);
      setLinkTag("canonical", canonicalUrl);
    }

    // Twitter Card tags
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", title);
    setMetaTag("twitter:description", description);

    // JSON-LD structured data
    if (jsonLd) {
      const scriptId = "json-ld-seo";
      let script = document.getElementById(scriptId) as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    }

    // Cleanup function
    return () => {
      // We don't remove tags on cleanup as they should persist until replaced
    };
  }, [title, description, keywords, canonicalUrl, ogType, jsonLd]);
};
