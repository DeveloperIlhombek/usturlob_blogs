export interface ChildProps {
	children: React.ReactNode
}

export interface IArchivedBlogs {
	year: string
	blogs: IBlog[]
}
export interface IBlog {
	title: string
	description: string
	author: IAuthor
	catagory: ICatagoryandTags
	tag: ICatagoryandTags
	image: { url: string }
	createdAt: string
	content: { html: string }
	slug: string
}
export interface IAuthor {
	name: string
	bio: string
	id: string
	image: {
		url: string
	}
	blogs: IBlog[]
}

export interface ICatagoryandTags {
	name: string
	slug: string
}
