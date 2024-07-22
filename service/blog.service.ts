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
					bio
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
				content {
					html
				}
				slug
			}
		}
	`

	const { blogs } = await request<{ blogs: IBlog[] }>(graphqlAPI, query)
	return blogs
}

export const getDetailedBlogs = async (slug: string) => {
	const query = gql`
		query MyQuery($slug: String!) {
			blog(where: { slug: $slug }) {
				author {
					name
					image {
						url
					}
					bio
					id
				}
				content {
					html
				}
				createdAt
				image {
					url
				}
				slug
				title
				tag {
					name
					slug
				}
				catagory {
					name
					slug
				}
			}
		}
	`
	const { blog } = await request<{ blog: IBlog[] }>(graphqlAPI, query, { slug })
	return blog
}

export const getSearchBlogs = async (title: string) => {
	const query = gql`
		query MyQuery($title: String!) {
			blogs(where: { title_contains: $title }) {
				image {
					url
				}
				slug
				title
				createdAt
			}
		}
	`

	const { blogs } = await request<{ blogs: IBlog[] }>(graphqlAPI, query, {
		title,
	})
	return blogs
}
