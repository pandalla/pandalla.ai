import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Providers } from "../providers";

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <Providers>
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </Providers>
    </NextIntlClientProvider>
  );
}