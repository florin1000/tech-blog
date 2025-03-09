import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const BlogCard = ({ post, wdth }) => {
  const image = getImage(post.frontmatter.heroImage)

  return (
    <a href={post.fields.slug} key={post.fields.slug} className={`group flex box-shadow-custom border-gray-300 hover:border-blue-500 rounded-md overflow-hidden w-${wdth}`}>
      <div
        key={post.fields.slug}
      >
        {/* Fixed height for images */}
        {image && (
          <div className="relative h-[200px] w-full overflow-hidden transition-transform duration-600 ease-in-out group-hover:scale-110">
            <GatsbyImage
              image={image}
              alt={post.frontmatter.title}
              className="object-cover h-full w-full"
            />
            <div className="absolute top-0 left-0 right-0 botton-0 w-full h-full bg-blue-400/30 z-100 group-hover:hidden"></div>
          </div>
        )}

        <div className="p-3">
          <h5 className="text-lg font-semibold mb-1">
            {post.frontmatter.title}
          </h5>
          <p className="text-sm text-gray-600 mb-2 h-[95px]">{post.excerpt}</p>
          {post.frontmatter?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {post.frontmatter.tags.map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-200 text-sm rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <span className="text-blue-500 hover:underline">Read More</span>
        </div>
      </div>
    </a>
  )
}

export default BlogCard
