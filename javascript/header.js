let head = [
  `
    <!-- Meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#7d68f9" />
    <meta name="description" content="Luxformel: STEM Resources" />

    <!-- PWA -->
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" href="/img/favicon.png" />
    <script src="/pwa/index.js" defer></script>

    <!-- PWA iOS -->
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="luxformel" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/img/favicon.png" />
    <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />

    <!-- Google Fonts & Material Icons -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap" rel="stylesheet" />
  `,
];

document.head.insertAdjacentHTML("beforeend", head);
