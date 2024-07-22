import { ThemeProvider } from '@/components/provider/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { ChildProps } from '@/types'
import type { Metadata } from 'next'
import { Crete_Round, Work_Sans } from 'next/font/google'
import './globals.css'

const creteRound = Crete_Round({
	weight: '400',
	subsets: ['latin'],
	variable: '--font-creteRound',
})
const workSans = Work_Sans({
	weight: ['500', '600'],
	subsets: ['latin'],
	variable: '--font-workSans',
})

export const metadata: Metadata = {
	metadataBase: new URL('http://usturlob.uz'),
	title: 'Usturlob',
	description: 'Usturlob web-site about IT blogs, Created by Ilhom Toshqulov',
	authors: [{ name: 'Ilhom Toshqulov', url: 'http://usturlob.uz' }],
	icons: { icon: '/favicon.png' },
	keywords:
		'IT blogs, dasturlashga oid bloglar, Ilhom Toshqulov, Developer Ilhom,blogs, dasturlash, programming,text,articles',
	openGraph: {
		title: 'Usturlob dasturlashga oid maqolalar',
		description:
			'Dasturlash haqida yangiliklar, maslahatlar, va dasturlash sohasidagi eng soʻnggi xabarlar. Bizning blogda dasturlashni oʻrganish va rivojlantirish uchun qoʻllanma topishingiz mumkin.',
		type: 'website',
		url: 'http://usturlob.uz',
		locale: 'en_EN',
		images: 'https://media.graphassets.com/kXL006lyRnW46IKTHdHs',
		countryName: 'Uzbekistan',
		siteName: 'usturlob',
		emails: 'ilxomdeveloper@gmail.com',
	},
}

function RootLayout({ children }: ChildProps) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body
				className={`${creteRound.variable} ${workSans.variable} overflow-x-hidden`}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<Toaster position='top-center' />
				</ThemeProvider>
			</body>
		</html>
	)
}
export default RootLayout
