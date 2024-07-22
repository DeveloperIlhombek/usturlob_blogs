import { IBlog, ICatagoryandTags } from '@/types'
import request, { gql } from 'graphql-request'
import { cache } from 'react'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getCategories = async () => {
	const query = gql`
		query MyQuery {
			catagories {
				name
				slug
			}
		}
	`

	const { catagories } = await request<{ catagories: ICatagoryandTags[] }>(
		graphqlAPI,
		query
	)
	return catagories
}

export const getBlogByCategory = cache(async (slug: string) => {
	const query = gql`
		query MyQuery($slug: String!) {
			catagory(where: { slug: $slug }) {
				name
				blogs {
					author {
						name
						image {
							url
						}
						bio
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
		}
	`

	const { catagory } = await request<{
		catagory: { blogs: IBlog[]; name: string }
	}>(graphqlAPI, query, { slug })
	return catagory
})
