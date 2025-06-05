import Image from "next/image";
import { client } from "@/sanity/client";

type GalleryImage = {
  _id: string;
  title?: string;
  image?: {
    asset?: {
      url: string;
    };
  };
  altText?: string;
};

type Post = {
  _id: string;
  title: string;
  body: string; // Adjust type if you use Portable Text
};

type HomepageContent = {
  contentType: "post" | "galleryImage";
  post?: Post;
  galleryImages?: GalleryImage[];
};

const HOMEPAGE_QUERY = `
*[_type == "homepageContent"][0]{
  contentType,
  post->{_id, title, body},
}
`;

const IMAGES_QUERY = `*[_type == "galleryImage"]|order(_createdAt desc)[0...12]{
  _id,
  title,
  image{
    asset->{url}
  },
  altText
}`;

const options = { next: { revalidate: 30 } };

export default async function Members() {
  const homepageContent: HomepageContent = await client.fetch(
    HOMEPAGE_QUERY,
    {},
    options
  );

  if (homepageContent?.contentType === "post" && homepageContent.post) {
    return (
      <section className="container mx-auto max-w-3xl px-4 py-16 min-h-screen bg-blue-50">
        <h1 className="text-3xl font-bold mb-4">
          {homepageContent.post.title}
        </h1>
        <div className="prose">
          {/* Replace with PortableText if needed */}
          {homepageContent.post.body}
        </div>
      </section>
    );
  }

  // Default: show gallery images
  const images: GalleryImage[] = await client.fetch(IMAGES_QUERY, {}, options);

  return (
    <section className="container mx-auto max-w-7xl px-4 pb-16 min-h-screen bg-red-100">
      <h1 className="text-6xl font-extrabold text-center tracking-tight mb-4 text-black py-16 ">
        {"LAB'S MEMBERS"}
      </h1>
      <ul className="grid gap-8 md:grid-cols-3">
        {images.map((img: GalleryImage) => (
          <li
            key={img._id}
            className="bg-gray-50 rounded-lg shadow hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col w-full"
          >
            {img.image?.asset?.url && (
              <div className="relative w-full h-64">
                <Image
                  src={img.image.asset.url}
                  alt={img.altText || img.title || "Gallery image"}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold">{img.title}</h2>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
