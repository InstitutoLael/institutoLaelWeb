// src/components/HeadTags.jsx
import { Helmet } from "react-helmet";

export default function HeadTags({
  title = "Instituto Lael — Educación online, pero humana",
  description = "PAES, Idiomas y LSCh con clases en vivo + cápsulas y seguimiento real.",
  url = "https://tu-dominio.cl/",
  image = "https://tu-dominio.cl/og-image.jpg",
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Instituto Lael",
    url,
    logo: "https://tu-dominio.cl/logo.png",
  };
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <link rel="canonical" href={url}/>
      {/* Open Graph */}
      <meta property="og:type" content="website"/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:url" content={url}/>
      <meta property="og:image" content={image}/>
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:image" content={image}/>
      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}