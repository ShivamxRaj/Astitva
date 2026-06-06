import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.avaykta.app';
const SITE_NAME = 'Avyakta';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.png`;

const SEOMetadata = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Normalize path (remove trailing slash)
    const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
    const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;

    let title = "Avyakta - Unidentified Deceased & Missing Persons Portal";
    let description = "Avyakta Portal - Connecting families with unclaimed and unidentified deceased persons since 2020. Report a case anonymously or search the missing person database.";
    let keywords = "avyakta, missing persons database, report unclaimed body, report unidentified body, NGO India, Punjab, find lost family member";
    let ogImage = DEFAULT_IMAGE;
    let ogType = 'website';
    let structuredData = null;

    switch (cleanPath) {
      case '/':
        title = "Avyakta - Unidentified Deceased & Missing Persons Portal";
        description = "Avyakta Portal - India's humanitarian platform connecting families with unclaimed and unidentified deceased persons since 2020. Report unclaimed bodies, search missing persons, and support dignified identification with officer coordination.";
        keywords = "avyakta, missing persons India, unclaimed body report, unidentified deceased, NGO Punjab, humanitarian portal, officer coordination, dignity identification, family support";
        structuredData = [
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Avyakta",
            "url": SITE_URL,
            "logo": `${SITE_URL}/images/logo.png`,
            "description": "Avyakta is India's humanitarian portal for reporting, tracking, and resolving unclaimed and unidentified deceased cases, connecting families and officers for dignified identification.",
            "sameAs": [],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "url": `${SITE_URL}/contact`
            },
            "foundingDate": "2020",
            "areaServed": "India",
            "nonprofitStatus": "Nonprofit501c3"
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Avyakta",
            "url": SITE_URL,
            "description": description,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${SITE_URL}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          }
        ];
        break;
      case '/about':
        title = "About Us - Avyakta | Our Mission & Team";
        description = "Learn about Avyakta's mission to identify unclaimed deceased persons and reconnect them with their families. Our team of dedicated officers and volunteers brings closure, dignity, and support to families across India.";
        keywords = "about avyakta, mission, team, humanitarian NGO, unclaimed bodies India, officer support, volunteer";
        structuredData = [{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Avyakta",
          "url": canonicalUrl,
          "description": description,
          "mainEntity": {
            "@type": "Organization",
            "name": "Avyakta",
            "url": SITE_URL
          }
        }];
        break;
      case '/contact':
        title = "Contact Us - Avyakta Portal | Get Support";
        description = "Get in touch with the Avyakta team for support, partnerships, or inquiries about unclaimed body cases and missing persons identification in India.";
        keywords = "contact avyakta, support, partnerships, inquiries, missing persons help";
        structuredData = [{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Avyakta",
          "url": canonicalUrl,
          "description": description
        }];
        break;
      case '/faq':
        title = "FAQ - Avyakta Portal | Frequently Asked Questions";
        description = "Find answers to common questions about reporting unidentified bodies, searching for missing persons, officer coordination, and how Avyakta's humanitarian portal operates across India.";
        keywords = "avyakta FAQ, frequently asked questions, how to report, how to search, missing persons help";
        structuredData = [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "name": "Frequently Asked Questions",
          "url": canonicalUrl,
          "description": description
        }];
        break;
      case '/report':
        title = "Report a Case - Avyakta Portal | Report Unclaimed Body";
        description = "Report details about an unclaimed or unidentified deceased person. Submit anonymously to help officers identify bodies and support families seeking closure and dignity.";
        keywords = "report unclaimed body, report unidentified deceased, anonymous report, avyakta report, officer assistance";
        break;
      case '/search':
        title = "Search Missing Persons - Avyakta Portal | Find Lost Family";
        description = "Search the Avyakta database of missing persons and unidentified deceased cases. Help find lost family members with officer-coordinated support for dignified identification.";
        keywords = "search missing persons, find lost family, unidentified bodies database, avyakta search, officer coordination";
        break;
      case '/testimonials':
        title = "Testimonials - Avyakta Portal | Stories of Hope & Reunion";
        description = "Read real stories of hope, reunification, and closure from families helped by the Avyakta portal. Officers and citizens share their experiences of dignity in identification.";
        keywords = "avyakta testimonials, success stories, family reunion, hope, closure, officer testimonials";
        break;
      case '/guidelines':
        title = "Guidelines - Avyakta Portal | Reporting & Search Procedures";
        description = "Official guidelines and procedures for reporting unclaimed bodies, searching for missing persons, and officer coordination on the Avyakta humanitarian portal.";
        keywords = "avyakta guidelines, reporting procedures, search procedures, officer guidelines";
        break;
      case '/cookies':
        title = "Cookie Policy - Avyakta Portal";
        description = "Avyakta Portal's cookie policy. Learn how we use cookies to improve your user experience while maintaining privacy and security.";
        keywords = "cookie policy, privacy, avyakta cookies";
        break;
      default:
        if (cleanPath.startsWith('/admin')) {
          title = "Admin Portal - Avyakta";
          description = "Secure administrator access for managing ratings, cases, and contact forms on Avyakta.";
        } else if (cleanPath.startsWith('/case/')) {
          title = "Case Details - Avyakta Portal";
          description = "View detailed information about a reported case on the Avyakta humanitarian portal.";
          ogType = 'article';
        }
        break;
    }

    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    updateMeta('description', description);

    // 3. Update Meta Keywords
    updateMeta('keywords', keywords);

    // 4. Update Canonical Link
    updateLink('canonical', canonicalUrl);

    // 5. Open Graph Meta Tags
    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:url', canonicalUrl);
    updateMetaProperty('og:type', ogType);
    updateMetaProperty('og:image', ogImage);
    updateMetaProperty('og:image:width', '1200');
    updateMetaProperty('og:image:height', '630');
    updateMetaProperty('og:image:alt', 'Avyakta - Unidentified Deceased & Missing Persons Portal');
    updateMetaProperty('og:site_name', SITE_NAME);
    updateMetaProperty('og:locale', 'en_IN');

    // 6. Twitter Card Meta Tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);
    updateMeta('twitter:image:alt', 'Avyakta - Unidentified Deceased & Missing Persons Portal');

    // 7. Additional SEO meta tags
    updateMeta('robots', cleanPath.startsWith('/admin') ? 'noindex, nofollow' : 'index, follow');
    updateMeta('author', 'Avyakta Foundation');

    // 8. JSON-LD Structured Data
    // Remove old structured data
    const existingScripts = document.querySelectorAll('script[data-seo="avyakta-schema"]');
    existingScripts.forEach(script => script.remove());

    if (structuredData) {
      structuredData.forEach(data => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'avyakta-schema');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

  }, [location]);

  return null;
};

// Helper: Update or create a <meta name="..."> tag
function updateMeta(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = document.createElement('meta');
    meta.name = name;
    meta.content = content;
    document.head.appendChild(meta);
  }
}

// Helper: Update or create a <meta property="..."> tag (for OG)
function updateMetaProperty(property, content) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (meta) {
    meta.setAttribute('content', content);
  } else {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    meta.content = content;
    document.head.appendChild(meta);
  }
}

// Helper: Update or create a <link rel="..."> tag
function updateLink(rel, href) {
  let link = document.querySelector(`link[rel="${rel}"]`);
  if (link) {
    link.setAttribute('href', href);
  } else {
    link = document.createElement('link');
    link.rel = rel;
    link.href = href;
    document.head.appendChild(link);
  }
}

export default SEOMetadata;
