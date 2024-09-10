import Head from 'next/head';

interface SEOProps {
    title: string;
    description: string;
    imageUrl: string;
    url: string;
}

export default function SEO({ title, description, imageUrl, url }: SEOProps) {
    return (
      <Head>
          {/* Standard SEO Meta Tags */}
          <title>{title}</title>
          <meta name="description" content={description} />

          {/* Open Graph Meta Tags */}
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={imageUrl} />
          <meta property="og:url" content={url} />
          <meta property="og:site_name" content="Your Blog Site" />

          {/* Twitter Card Meta Tags */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={imageUrl} />
          <meta name="twitter:site" content="@YourTwitterHandle" />

          {/* Other SEO Tags */}
          <link rel="canonical" href={url} />
      </Head>
    );
}
