import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  keywords?: string;
  author?: string;
}

const DEFAULTS = {
  title: 'Rohit Birdawade — Premium AI & IoT Engineer Portfolio',
  description: 'Elite-tier AI/ML and IoT Engineer specializing in neural architectures and real-time edge intelligence. Explore high-accuracy models and IoT dashboard solutions.',
  image: 'https://rohitbirdawade007.vercel.app/og-image.png',
  url: 'https://rohitbirdawade007.vercel.app',
  type: 'website' as const,
  keywords: 'AI Engineer Portfolio, IoT Developer, Machine Learning Expert, Deep Learning Solutions, Rohit Birdawade, National Prize Winner, NLPC-2025, ESP32 AI, Neural Networks',
  author: 'Rohit Birdawade'
};

const SEO = ({
  title,
  description,
  image,
  url,
  type = 'website',
  keywords,
  author
}: SEOProps) => {
  const seoTitle = title ? `${title} | Rohit Birdawade` : DEFAULTS.title;
  const seoDesc  = description || DEFAULTS.description;
  const seoImage = image || DEFAULTS.image;
  const seoUrl   = url || DEFAULTS.url;

  return (
    <Helmet>
      {/* Basic */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDesc} />
      <meta name="keywords" content={keywords || DEFAULTS.keywords} />
      <meta name="author" content={author || DEFAULTS.author} />

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDesc} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Rohit Birdawade Portfolio" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDesc} />
      <meta name="twitter:image" content={seoImage} />

      {/* Canonical */}
      <link rel="canonical" href={seoUrl} />
    </Helmet>
  );
};

export default SEO;
