let head = [
  `
    <!-- Meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#7d68f9" />

    <!-- PWA -->
    <link rel="manifest" href="/manifest.json" />
    <script src="/pwa/index.js" defer></script>

    <!-- PWA iOS -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="luxformel" />
  
    <!-- Favicons -->
    <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-chrome-192x192.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/favicons/android-chrome-512x512.png" />
    <link rel="shortcut icon" href="/favicons/favicon.ico" />

    <!-- Open Graph (for Facebook, WhatsApp, Discord, LinkedIn, etc.) -->
    <meta property="og:title" content="Luxformel – STEM Resources" />
    <meta property="og:description" content="Wëllkomm op luxformel.info! Léiert Formele wei nach ni!" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://luxformel.info/" />
    <meta property="og:image" content="https://luxformel.info/favicons/og-image.png" />
    <meta property="og:site_name" content="Luxformel" />

    <!-- Open Graph refinements -->
    <meta property="og:locale" content="lb_LU" /> <!-- or de_DE, fr_FR if multilingual -->
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:type" content="website" />
    <meta property="og:updated_time" content="2025-01-01T12:00:00+00:00" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Luxformel – STEM Resources" />
    <meta name="twitter:description" content="STEM Formulas, Exercises, and Resources – All in one place." />
    <meta name="twitter:image" content="https://luxformel.info/favicons/og-image.png" />

    <!-- Google Fonts & Material Icons -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />

    <!-- Canonical link -->
    <link rel="canonical" href="https://luxformel.info/" />
  `,
];

document.head.insertAdjacentHTML("beforeend", head);
