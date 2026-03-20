'use client';
import type { Metadata } from 'next';
import { Manrope, Roboto } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Provider } from 'react-redux';
import { store } from '@/Redux/store';
import { Toaster } from 'sonner';

const geistSans = Manrope({
	variable: '--font-manrope',
	subsets: ['latin'],
});

const geistMono = Roboto({
	variable: '--font-roboto',
	subsets: ['latin'],
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<Provider store={store}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
					</ThemeProvider>
				</Provider>
				<Toaster />
			</body>
		</html>
	);
}
