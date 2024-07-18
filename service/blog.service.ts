import { IBlog } from '@/types'
import request, { gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getBlogs = async () => {
	const query = gql`
		query MyQuery {
			blogs {
				title
				createdAt
				author {
					name
					image {
						url
					}
				}
				catagory {
					name
					slug
				}
				description
				tag {
					name
					slug
				}
				image {
					url
				}
			}
		}
	`
	try {
		const { blogs } = await request<{ blogs: IBlog[] }>(graphqlAPI, query)
		return blogs
	} catch (error) {
		console.error('Error fetching blogs:', error)
		return []
	}
}
