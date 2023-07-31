import Head from 'next/head';
import React from 'react'

interface RouteParams {
    id: string
}

async function getBlogData(id: string) {
    const res = await fetch("https://api.felicity.care/guest/blog/get-blog-by-slug/" + id)
    if (!res.ok) {
        return console.error("Failed to fetch blog data")
    }

    return await res.json();
}

const BlogDetails = async ({ params }: { params: RouteParams }) => {
    const blogData = await getBlogData(params.id);
    return (
        <>
            <Head>
                <title>{blogData.title}</title>
                <meta property="og:title" content={blogData.title} key="title" />
                <meta property="og:image" content={blogData.imageURL} />
            </Head>
            <div className="py-6">
                <div className='w-3/4 mx-auto'>
                    <h2 className='text-center text-2xl'>{blogData.title}</h2>
                </div>
            </div>
        </>
    )
}

export default BlogDetails;


export async function generateMetadata({ params }: { params: RouteParams }) {
    const blogData = await getBlogData(params.id);

    return {
        title: blogData.title,
        openGraph: {
            title: blogData.title,
            images : blogData.imageURL,
            siteName : 'Haris NextJS Meta Testing'
        }
    }
}