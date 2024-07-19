export interface ChildProps {
	children: React.ReactNode
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
}
export interface IAuthor {
	name: string
	image: {
		url: string
	}
}

export interface ICatagoryandTags {
	name: string
	slug: string
}
