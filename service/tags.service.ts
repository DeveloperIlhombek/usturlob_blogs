import { IBlog, ICatagoryandTags } from '@/types'
import request, { gql } from 'graphql-request'
import { cache } from 'react'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getTags = async () => {
	const query = gql`
		query MyQuery {
			tags {
				name
				slug
			}
		}
	`
	const { tags } = await request<{ tags: ICatagoryandTags[] }>(
		graphqlAPI,
		query
	)
	return tags
}

export const getBlogByTag = cache(async (slug: string) => {
	const query = gql`
		query MyQuery {
			tag(where: { slug: "react-js" }) {
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

	const { tag } = await request<{ tag: { blogs: IBlog[]; name: string } }>(
		graphqlAPI,
		query,
		{ slug }
	)
	return tag
})
