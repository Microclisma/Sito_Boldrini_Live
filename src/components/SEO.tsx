import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function SEO({
  title = "Dr. Nazzareno Boldrini - Biologo Nutrizionista Brescia",
  description = "Biologo Nutrizionista a Brescia specializzato in ricomposizione corporea e performance sportiva. Alimento il tuo potenziale con la scienza.",
  image = "/favicon.ico", // This should ideally be an absolute path to a generic image
  url = "https://nazzarenoboldrini.it",
  type = "website",
}: SEOProps) {
  const pageTitle = title.includes('Nazzareno Boldrini') ? title : `${title} | Dr. Nazzareno Boldrini`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
