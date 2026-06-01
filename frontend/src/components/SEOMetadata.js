import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEOMetadata = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    let title = "Avyakta - Unidentified Deceased & Missing Persons Portal";
    let description = "Avyakta Portal - Connecting families with unclaimed and unidentified deceased persons since 2020. Report a case anonymously or search the missing person database.";
    
    // Normalize path (remove trailing slash)
    const cleanPath = path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;

    switch (cleanPath) {
      case '/':
        title = "Avyakta - Unidentified Deceased & Missing Persons Portal";
        description = "Avyakta Portal - Connecting families with unclaimed and unidentified deceased persons since 2020. Report a case anonymously or search the missing person database.";
        break;
      case '/about':
        title = "About Us - Avyakta Portal";
        description = "Learn about Avyakta's mission to identify unclaimed deceased persons and reconnect them with their families, bringing closure and dignity.";
        break;
      case '/contact':
        title = "Contact Us - Avyakta Portal";
        description = "Get in touch with the Avyakta team. Reach out for support, partnerships, or general inquiries.";
        break;
      case '/faq':
        title = "Frequently Asked Questions - Avyakta Portal";
        description = "Find answers to common questions about reporting unidentified bodies, searching for missing persons, and how Avyakta operates.";
        break;
      case '/report':
        title = "Report a Case - Avyakta Portal";
        description = "Report details about an unclaimed or unidentified deceased person. You can choose to submit the report anonymously.";
        break;
      case '/search':
        title = "Search Missing Persons - Avyakta Portal";
        description = "Search the database of missing persons and unidentified deceased cases to find lost family members.";
        break;
      case '/testimonials':
        title = "Testimonials - Avyakta Portal";
        description = "Read stories of hope, reunification, and closure from families helped by the Avyakta portal.";
        break;
      case '/guidelines':
        title = "Guidelines - Avyakta Portal";
        description = "Official guidelines and procedures for reporting, searching, and handling missing persons cases on the Avyakta portal.";
        break;
      case '/cookies':
        title = "Cookie Policy - Avyakta Portal";
        description = "Avyakta Portal's cookie policy. Learn how we use cookies to improve your user experience.";
        break;
      default:
        // Keep default or handle admin/dynamic routes
        if (cleanPath.startsWith('/admin')) {
          title = "Admin Portal - Avyakta";
          description = "Secure administrator access for managing ratings, cases, and contact forms on Avyakta.";
        }
        break;
    }

    // 1. Update Title
    document.title = title;

    // 2. Update Meta Description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.name = 'description';
      metaDescription.content = description;
      document.head.appendChild(metaDescription);
    }

    // 3. Update Canonical Link
    // Ensure all canonical URLs point to the official 'https://www.avaykta.app' and are lowercase
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    const canonicalUrl = `https://www.avaykta.app${cleanPath === '/' ? '' : cleanPath}`;
    if (canonicalLink) {
      canonicalLink.setAttribute('href', canonicalUrl);
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = canonicalUrl;
      document.head.appendChild(canonicalLink);
    }
  }, [location]);

  return null;
};

export default SEOMetadata;
