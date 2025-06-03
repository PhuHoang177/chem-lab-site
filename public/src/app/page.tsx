import Image from "next/image";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";

const POSTS_QUERY = `*[
  _type == "post" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  image{
    asset->{url, altText}
  },
  excerpt
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);

  console.log(posts);

  return (
    <section className="container mx-auto max-w-7xl px-4 pb-16 min-h-screen bg-red-100">
      <ul className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <li
            key={post._id}
            className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden"
          >
            <Link href={`/${post.slug.current}`} className="block h-full">
              <div className="relative w-full h-56">
                <Image
                  src={post.image.asset.url}
                  alt={post.image.asset.altText || post.title}
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-black">{post.title}</h2>
                <p className="text-gray-500 text-sm mb-4">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
                {post.excerpt && (
                  <p className="text-gray-700 mb-2">{post.excerpt}</p>
                )}
                <span className="inline-block mt-2 text-blue-600 hover:underline">
                  Read more &rarr;
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}