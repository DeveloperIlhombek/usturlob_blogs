'use client'
import { constactSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

function ContactFroms() {
	const [isloading, setIsLoading] = useState(false)
	const form = useForm<z.infer<typeof constactSchema>>({
		resolver: zodResolver(constactSchema),
		defaultValues: {
			message: '',
			email: '',
			name: '',
		},
	})

	function onSubmit(values: z.infer<typeof constactSchema>) {
		setIsLoading(true)
		const telegramBotId = process.env.NEXT_PUBLIC_TELEGRAM_BOT_API!
		const telegramchatId = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID!

		const promise = fetch(
			`https://api.telegram.org/bot${telegramBotId}/sendMessage`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'cache-control': 'no-cache',
				},
				body: JSON.stringify({
					chat_id: telegramchatId,
					text: `Name:${values.name}:
				Email:${values.email}:
				Message:${values.message}`,
				}),
			}
		)
			.then(() => form.reset())
			.finally(() => setIsLoading(false))
		toast.promise(promise, {
			loading: 'Loading ...',
			success: 'Successfully sent!',
			error: 'Something went wrong ',
		})
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Textarea
									disabled={isloading}
									{...field}
									className='resize-none h-32'
									placeholder='Ask question or just say Hi'
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder='Email address'
									disabled={isloading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									{...field}
									placeholder='Your name here'
									disabled={isloading}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button className='w-fit' size={'lg'} type='submit'>
					<span>Send</span>
					<Send className='w-4 h-4 ml-2' />
				</Button>
			</form>
		</Form>
	)
}

export default ContactFroms
