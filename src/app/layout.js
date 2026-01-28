import './globals.css';
import Navbar from '@/components/Navbar';
import Script from 'next/script';

export const metadata = {
  title: 'MealMaster - Daily Meal Ideas',
  description: 'Get delicious meal ideas and recipes for every day',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5G8PGEQDYV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5G8PGEQDYV');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Optional Footer */}
        <footer className="bg-gradient-to-r from-amber-900 to-orange-900 text-white pt-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-lg font-semibold">MealMaster - Your Personal Meal Planner</p>
            <p className="text-amber-200 mt-2">Get daily meal ideas, recipes, and cooking tips</p>
            <div className="mt-6 flex justify-center flex-col sm:flex-row space-x-6">
              <a href="#" className="hover:text-amber-300 transition-colors">About Us</a>
              <a href="#" className="hover:text-amber-300 transition-colors">Contact</a>
              <a href="#" className="hover:text-amber-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-amber-300 transition-colors">Terms of Service</a>
            </div>

            <p className='mt-10 py-5 border-t-1 flex items-center justify-center gap-1'>
              © 2025 MealMaster. Made With 🧡 By G. Murtaza
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
