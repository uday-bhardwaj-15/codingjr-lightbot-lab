import "./globals.css";

export const metadata = {
  title: "CodingJr Bot Lab",
  description: "CodingJr Bot Lab is an educational game about programming designed for introductory courses to logical thinking.",
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="codingjr" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
              try {
                var theme = localStorage.getItem("theme") || "codingjr";
                document.documentElement.setAttribute("data-theme", theme);
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-base-200 text-base-content flex items-center justify-center">
        {children}
      </body>
    </html>
  );
}
