import { getRequestConfig } from 'next-intl/server';

export const locales = ['en', 'zh', 'ja'] as const;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    // Return default locale instead of notFound() to avoid layout issues
    locale = 'en';
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});