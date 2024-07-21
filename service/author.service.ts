import { IAuthor } from '@/types'
import request, { gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT!

export const getAuthors = async () => {
	const query = gql`
		query MyQuery {
			authors {
				bio
				id
				name
				image {
					url
				}
				blogs {
					id
				}
			}
		}
	`
	const { authors } = await request<{ authors: IAuthor[] }>(graphqlAPI, query)
	return authors
}

export const getDetailedAuthor = async (id: string) => {
	const query = gql`
		query MyQuery($id: ID) {
			author(where: { id: $id }) {
				bio
				name
				image {
					url
				}
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
		}
	`

	const { author } = await request<{ author: IAuthor }>(graphqlAPI, query, {
		id,
	})
	return author
}
