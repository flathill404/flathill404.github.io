import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.kdkw.jp' },
      { protocol: 'https', hostname: 'books.google.co.jp' },
      { protocol: 'https', hostname: 'bookplus.nikkei.com' },
      { protocol: 'https', hostname: 'www.ohmsha.co.jp' },
      { protocol: 'https', hostname: 'm.media-amazon.com' },
      { protocol: 'https', hostname: 'www.seshop.com' },
      { protocol: 'https', hostname: 'www.oreilly.co.jp' },
      { protocol: 'https', hostname: 'gihyo.jp' },
      { protocol: 'https', hostname: 'book.mynavi.jp' },
      { protocol: 'https', hostname: 'img.ips.co.jp' },
      { protocol: 'https', hostname: 'www.njg.co.jp' },
      { protocol: 'https', hostname: 'dvs-cover.kodansha.co.jp' },
      { protocol: 'https', hostname: 'tatsu-zine.com' },
      { protocol: 'https', hostname: 'www.kinokuniya.co.jp' },
      { protocol: 'https', hostname: 'www.oreilly.com' },
      { protocol: 'https', hostname: 'www.php.co.jp' },
      { protocol: 'https', hostname: 'hondana-image.s3.amazonaws.com' },
      { protocol: 'https', hostname: 'eijipress.co.jp' },
      { protocol: 'https', hostname: 'nextpublishing.jp' },
      { protocol: 'https', hostname: 'd2sofvawe08yqg.cloudfront.net' },
      { protocol: 'https', hostname: 'www.sbcr.jp' },
      { protocol: 'https', hostname: 'www.ric.co.jp' },
      { protocol: 'https', hostname: 'www.lambdanote.com' },
      { protocol: 'https', hostname: 'www.shuwasystem.co.jp' },
      { protocol: 'https', hostname: 'www.kspub.co.jp' },
      { protocol: 'https', hostname: 'techbookfest.org' },
      { protocol: 'https', hostname: 'www.borndigital.co.jp' },
      { protocol: 'https', hostname: 'b-bunshun.ismcdn.jp' },
      { protocol: 'https', hostname: 'www.diamond.co.jp' },
      { protocol: 'https', hostname: 'publications.asahi.com' },
      { protocol: 'https', hostname: 'www.igaku-shoin.co.jp' },
      { protocol: 'https', hostname: 'www.c-r.com' },
    ],
  },
  experimental: {
    optimizePackageImports: [
      'react-icons',
    ],
  },
};

export default nextConfig;