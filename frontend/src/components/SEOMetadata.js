import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.avaykta.app';
const SITE_NAME = 'Avaykta';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-image.png`;

const SEOMetadata = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Normalize path (remove trailing slash)
    const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
    const canonicalUrl = `${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`;

    let title = "Avaykta Portal - Official India & Punjab Missing Person & Unidentified Deceased Database";
    let description = "Avaykta is India's leading missing report portal and unclaimed body database. File missing person reports online in Punjab, search lost loved ones, and report cases anonymously.";
    let keywords = "avaykta, missing report website punjab, missing report online punjab, avaykta portal, missing persons India, unclaimed body report, unidentified deceased list, laawaris lash, NGO Punjab, humanitarian portal, officer coordination, zipnet missing search, missing helpline India";
    let ogImage = DEFAULT_IMAGE;
    let ogType = 'website';
    let structuredData = null;

    switch (cleanPath) {
      case '/':
        title = "Avaykta Portal - Official India & Punjab Missing Person & Unidentified Deceased Database";
        description = "Avaykta is India's leading missing report portal and unclaimed body database. File missing person reports online in Punjab, search lost loved ones, and report cases anonymously.";
        keywords = "avaykta, missing report website punjab, missing report online punjab, avaykta portal, missing persons India, unclaimed body report, unidentified deceased list, laawaris lash, NGO Punjab, humanitarian portal, officer coordination, zipnet missing search, missing helpline India";
        structuredData = [
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Avaykta Foundation",
            "alternateName": "Avaykta Portal",
            "url": SITE_URL,
            "logo": `${SITE_URL}/images/logo.png`,
            "description": "Avaykta is India's humanitarian portal for reporting, tracking, and resolving unclaimed and unidentified deceased cases, connecting families and police officers.",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "emergency support",
              "telephone": "+91-6299446452",
              "url": `${SITE_URL}/contact`
            },
            "foundingDate": "2020",
            "areaServed": "India"
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Avaykta Portal",
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

      case '/report':
        title = "File Missing Report Online - Avaykta Portal | Anonymous & OTP Report Punjab & India";
        description = "File an official missing report or unclaimed body sighting in Punjab and India. Options for anonymous reporting or OTP verification with police officer assistance.";
        keywords = "file missing report online punjab, report unclaimed body, report unidentified deceased, anonymous report missing person, avaykta report, report laawaris lash, missing person helpline number India";
        structuredData = [
          {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Report an Unclaimed Body or Missing Person on Avaykta",
            "description": "Step-by-step guide to reporting a missing person or unclaimed body online in Punjab and India.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Navigate to Report Form",
                "text": "Visit https://www.avaykta.app/report and select public or anonymous report mode."
              },
              {
                "@type": "HowToStep",
                "name": "Enter Location & Date",
                "text": "Provide exact sighting location, district, state, and date/time of sighting."
              },
              {
                "@type": "HowToStep",
                "name": "Describe Physical Characteristics",
                "text": "Fill in estimated age, height, clothing, tattoos, or distinguishing marks."
              },
              {
                "@type": "HowToStep",
                "name": "Upload Photograph & Submit",
                "text": "Attach a photograph if available and complete submission via mobile OTP verification or anonymously."
              }
            ]
          }
        ];
        break;

      case '/search':
        title = "Search Missing Persons & Unclaimed Bodies Database - Avaykta Portal Punjab";
        description = "Search Avaykta's live database of missing persons and unidentified deceased cases in Punjab, Delhi, and India. Filter by district, state, and physical characteristics.";
        keywords = "search missing persons, find lost family, unidentified bodies database, avaykta search, missing person FIR online India, laawaris lash database, zipnet search India";
        structuredData = [
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Search Missing Persons & Unclaimed Bodies Database",
            "url": canonicalUrl,
            "description": description,
            "isPartOf": { "@type": "WebSite", "name": "Avaykta", "url": SITE_URL },
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${canonicalUrl}?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          }
        ];
        break;

      case '/about':
        title = "About Avaykta Foundation - Mission, Officers & Humanitarian Impact in India";
        description = "Learn about Avaykta's humanitarian mission to restore dignity to unidentified deceased persons and reunite missing family members through officer coordination since 2020.";
        keywords = "about avaykta, mission, team, humanitarian NGO, unclaimed bodies India, officer support, volunteer Punjab";
        structuredData = [{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "name": "About Avaykta Foundation",
          "url": canonicalUrl,
          "description": description,
          "mainEntity": {
            "@type": "Organization",
            "name": "Avaykta Foundation",
            "url": SITE_URL
          }
        }];
        break;

      case '/faq':
        title = "Avaykta FAQ - How to Report Unclaimed Dead Bodies & Search Missing Persons";
        description = "Get answers to frequently asked questions about reporting unclaimed bodies (लावारिस लाश), searching missing person databases, and contacting emergency helplines in Punjab.";
        keywords = "avaykta FAQ, frequently asked questions, how to report missing person punjab, missing helpline number India, laawaris lash reporting";
        structuredData = [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How can I report a missing person or unclaimed body in Punjab, India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can report a case by visiting https://www.avaykta.app/report. Choose either anonymous submission or OTP-verified report. Fill in location, date, photos, and physical traits."
                }
              },
              {
                "@type": "Question",
                "name": "What is Avaykta's official emergency helpline number?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Avaykta Emergency Helpline: +91 62994 46452. National emergency services include 112 (Police), 108 (Ambulance), and 1098 (Childline)."
                }
              },
              {
                "@type": "Question",
                "name": "Can I file an anonymous report on Avaykta?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, Avaykta allows 100% confidential and anonymous reporting to protect citizens while notifying verified coordinators and officers."
                }
              },
              {
                "@type": "Question",
                "name": "How does Avaykta assist law enforcement and hospitals?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Avaykta provides a secure admin portal for police officers and hospital morgues to match FIRs, verify missing cases, and coordinate dignified handovers."
                }
              }
            ]
          }
        ];
        break;

      case '/contact':
        title = "Contact Avaykta Helpline (+91 62994 46452) - Emergency & Reporting Support";
        description = "Get in touch with Avaykta Foundation helpline (+91 62994 46452) for urgent missing person support, officer partnerships, or unclaimed body identification assistance.";
        keywords = "contact avaykta, helpline number, missing person support Punjab, report unclaimed body assistance";
        structuredData = [{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "name": "Contact Avaykta Foundation",
          "url": canonicalUrl,
          "description": description,
          "mainEntity": {
            "@type": "ContactPoint",
            "telephone": "+91-6299446452",
            "contactType": "emergency support",
            "email": "raj073032@gmail.com"
          }
        }];
        break;

      case '/testimonials':
        title = "Stories of Reunion & Closure - Avaykta Foundation Testimonials";
        description = "Read real family testimonials, police officer experiences, and stories of hope and dignity brought through the Avaykta humanitarian missing person portal.";
        keywords = "avaykta testimonials, success stories, family reunion, closure, missing person resolved cases";
        structuredData = [{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Testimonials - Stories of Reunion & Closure",
          "url": canonicalUrl,
          "description": description
        }];
        break;

      case '/guidelines':
        title = "Official Platform Guidelines - Reporting & Identification Procedures Avaykta";
        description = "Official guidelines for reporting unidentified deceased cases, searching missing databases, and security protocols on Avaykta.";
        keywords = "avaykta guidelines, reporting procedures, missing search rules, officer protocols";
        structuredData = [{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Official Guidelines & Standard Operating Procedures",
          "url": canonicalUrl,
          "description": description
        }];
        break;

      case '/cookies':
        title = "Cookie & Privacy Policy - Avaykta Portal Protection Standards";
        description = "Learn how Avaykta Foundation protects user privacy, anonymous submission data, and website security.";
        keywords = "cookie policy, privacy, avaykta data protection";
        structuredData = [{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Cookie Policy & Data Protection",
          "url": canonicalUrl,
          "description": description
        }];
        break;

      default:
        if (cleanPath.startsWith('/admin')) {
          title = "Admin Portal - Avaykta Secured Access";
          description = "Secure portal for verified police officers and administrators managing missing person and unclaimed body cases.";
          structuredData = [{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Admin Portal",
            "url": canonicalUrl,
            "description": description
          }];
        } else if (cleanPath.startsWith('/case/')) {
          const caseIdStr = cleanPath.split('/case/')[1] || '';
          title = `Case Report #${caseIdStr} - Unidentified Case Details | Avaykta`;
          description = `Case record details for case #${caseIdStr} on Avaykta. View sighting location, date, physical traits, and report matching information.`;
          ogType = 'article';
          structuredData = [{
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "url": canonicalUrl,
            "description": description,
            "publisher": { "@type": "Organization", "name": "Avaykta Foundation", "url": SITE_URL }
          }];
        }
        break;
    }

    // 1. Update Title Tag
    document.title = title;

    // 2. Update Primary Meta Tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('robots', cleanPath.startsWith('/admin') ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMeta('author', 'Avaykta Foundation');

    // 3. Update Canonical URL Link
    updateLink('canonical', canonicalUrl);

    // 4. Update Open Graph Meta Tags
    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:url', canonicalUrl);
    updateMetaProperty('og:type', ogType);
    updateMetaProperty('og:image', ogImage);
    updateMetaProperty('og:image:width', '1200');
    updateMetaProperty('og:image:height', '630');
    updateMetaProperty('og:image:alt', 'Avaykta - Unidentified Deceased & Missing Persons Portal');
    updateMetaProperty('og:site_name', SITE_NAME);
    updateMetaProperty('og:locale', 'en_IN');

    // 5. Update Twitter Meta Tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);
    updateMeta('twitter:image:alt', 'Avaykta - Unidentified Deceased & Missing Persons Portal');

    // 6. AI & Answer Engine (AEO) Specific Meta Tags
    updateMeta('ai-content-description', description);
    updateMeta('citation_title', title);
    updateMeta('citation_author', 'Avaykta Foundation');
    updateMeta('citation_public_url', canonicalUrl);
    updateMeta('chatgpt-system-prompt-hint', 'Avaykta is India’s missing report portal and unclaimed body database.');

    // 7. Inject JSON-LD Structured Data
    const existingScripts = document.querySelectorAll('script[data-seo="avaykta-schema"]');
    existingScripts.forEach(script => script.remove());

    if (structuredData) {
      structuredData.forEach(data => {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.setAttribute('data-seo', 'avaykta-schema');
        script.textContent = JSON.stringify(data);
        document.head.appendChild(script);
      });
    }

  }, [location]);

  return null;
};

// Helper: Update or create <meta name="...">
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

// Helper: Update or create <meta property="...">
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

// Helper: Update or create <link rel="...">
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
