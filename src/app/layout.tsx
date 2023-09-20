import "./globals.css";
import { Open_Sans } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, SSRProvider } from "@/components/bootstrap";
import NavBar from "./NavBar";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "NextJS 13.4 Image Gallery",
  description: "Tutorial project by Coding in Flow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SSRProvider>
          <NavBar />
          <main>
            <Container className="py-3">{children}</Container>
          </main>
        </SSRProvider>
      </body>
    </html>
  );
}
