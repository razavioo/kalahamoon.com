"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Root redirection page for static export.
 * Performs a robust 3-layer redirection to /fa/ by default, as requested.
 */
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/fa/");
  }, [router]);

  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta httpEquiv="refresh" content="0; url=/fa/" />
        <title>کالاهامون</title>
      </head>
      <body className="bg-[#151413]">
        <script
          dangerouslySetInnerHTML={{
            __html: 'window.location.replace("/fa/");',
          }}
        />
      </body>
    </html>
  );
}
