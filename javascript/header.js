let head = [
  `

    <!-- PWA -->

    <meta name="theme-color" content="#7d68f9" />
    <link rel="manifest" href="manifest.json" />
    <link rel="apple-touch-icon" href="/img/favicon.png" />
    <script src="/pwa/index.js"></script>

    <!-- PWA iOS -->

    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="luxformel" />
    
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

   <!-- Favicon -->

    <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
    
    <!-- Google Fonts -->

    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap"
      rel="stylesheet"
    />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />


    `,
];

document.head.insertAdjacentHTML("beforeend", head);
