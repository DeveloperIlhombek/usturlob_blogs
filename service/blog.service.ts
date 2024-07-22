import { IBlog } from '@/types'
import request, { gql } from 'graphql-request'
import { cache } from 'react'
import { IArchivedBlogs } from './../types/index'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!
//Get Blog
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

// GEt Archive
export const getArchiveBlogs = async () => {
	const query = gql`
		query MyQuery {
			blogs(where: { archive: true }) {
				title
				createdAt
				slug
			}
		}
	`

	const { blogs } = await request<{ blogs: IBlog[] }>(graphqlAPI, query)
	const filteredBlogs = blogs.reduce(
		(acc: { [year: string]: IArchivedBlogs }, blog: IBlog) => {
			const year = blog.createdAt.substring(0, 4)
			if (!acc[year]) {
				acc[year] = { year, blogs: [] }
			}
			acc[year].blogs.push(blog)
			return acc
		},
		{}
	)
	const results: IArchivedBlogs[] = Object.values(filteredBlogs)
	return results
}

export const getDetailedBlogs = cache(async (slug: string) => {
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
	const { blog } = await request<{ blog: IBlog }>(graphqlAPI, query, { slug })
	return blog
})
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
