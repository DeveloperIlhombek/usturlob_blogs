import CategoryTags from '@/components/cards/category-tags'
import { getTags } from '@/service/tags.service'
import { Dot, Home } from 'lucide-react'
import Link from 'next/link'

async function Page() {
	const tag = await getTags()

	return (
		<div className='max-w-6xl mx-auto'>
			<div className='relative min-h-[30vh] flex items-center justify-end flex-col'>
				<h2 className='text-center text-4xl section-title font-creteRound mt-2'>
					<span>Tags</span>
				</h2>

				<div className='flex gap-1 items-center mt-4'>
					<Home className='w-4 h-4' />
					<Link
						href={'/'}
						className='opacity-90 hover:underline hover:opacity-100'
					>
						Home
					</Link>
					<Dot />
					<p className='text-muted-foreground'>Tags</p>
				</div>
			</div>
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 '>
				{tag.map(item => (
					<CategoryTags key={item.slug} {...item} type='tags' />
				))}
			</div>
		</div>
	)
}

export default Page
