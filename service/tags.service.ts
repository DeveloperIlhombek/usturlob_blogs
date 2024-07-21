import { IBlog } from '@/types'
import request, { gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getBlogByTag = async (slug: string) => {
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
}
