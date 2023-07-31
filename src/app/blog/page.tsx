import Image from "next/image";
import Link from "next/link";

interface RouteParams {
    id: string
}

async function getBlogsData() {
    const queryData = {
        page: 1,
        perPage: 10
    }
    const res = await fetch("https://api.felicity.care/guest/blog/get-all", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(queryData)
    })
    if (!res.ok) {
        return console.error("Failed to fetch blog data")
    }

    return res.json();
}

export default async function BlogPage({ params }: { params: RouteParams }) {
    const data = await getBlogsData();
    return (
        <div className="w-3/4 mx-auto">
            <div className="w-full text-center py-12">
                <h2 className="text-2xl">Blogs Page</h2>
            </div>
            <div className="w-full">
                {data && data.result && data.result.length > 0 && <ul className="flex flex-wrap">
                    {data.result.map((blog: any) =>
                    
                        <li className="w-1/2" key={blog._id}>
                            <Link href={`/blog/${blog.slug}`}>
                            <div>
                                <div className="flex-col w-64 h-64 relative text-center mx-auto">
                                    <Image src={blog.imageURL} alt={blog.title} fill objectFit="contain" />
                                </div>
                            </div>
                            <p className="text-center">{blog.title}</p>
                            </Link>
                        </li>
                    )}
                </ul>}
            </div>
        </div>
    )
}