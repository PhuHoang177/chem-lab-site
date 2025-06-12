import Image from "next/image";
import { client } from "@/sanity/client";
import { PortableText } from "next-sanity";
import { HeaderType, HEADER_QUERY, MemberType, MEMBER_QUERY } from "@/data";

const options = { next: { revalidate: 30 } };

export default async function Members() {
  const header: HeaderType = await client.fetch(HEADER_QUERY, {
    page: "members",
  });
  const members: MemberType[] = await client.fetch(
    MEMBER_QUERY,
    { page: "members" },
    options
  );

  return (
    <main className="relative w-full min-h-screen bg-white overflow-visible">
      {/* Header Section */}
      <section className="relative w-full h-[420px] md:h-[520px] flex items-center justify-center">
        {header?.image?.asset?.url && (
          <div>
            <Image
              src={header.image.asset.url}
              alt={header.title}
              fill
              style={{ objectFit: "cover" }}
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-center drop-shadow-lg">
            {header.title}
          </h1>
          {Array.isArray(header?.content) && (
            <div className="mt-4 text-lg md:text-2xl text-white text-center font-medium drop-shadow prose prose-invert max-w-2xl">
              <PortableText value={header.content} />
            </div>
          )}
        </div>
      </section>

      {/* Members Section */}
      <section className="relative w-full max-w-screen-xl mx-auto py-0 text-center overflow-visible">
        <ul className="flex flex-wrap justify-center gap-8 pb-8 overflow-visible">
          {members.map((member: MemberType) => (
            <li
              key={member.order}
              className="group relative w-64 min-h-[28rem] flex flex-col items-center bg-white shadow-xl border border-gray-200 transform -skew-x-6 overflow-hidden rounded-lg transition-transform duration-400 hover:-translate-y-3 hover:shadow-[0_10px_20px_rgba(0,0,0,0.25)]"
            >
              {member?.image?.asset?.url && (
                <div className="relative w-64 h-96 skew-x-6">
                  <Image
                    src={member.image.asset.url}
                    alt={member.title}
                    fill
                    className="object-cover skew-x-[-6deg]"
                  />
                </div>
              )}

              <div className="pt-4 text-center">
                <h2 className="text-lg font-semibold">{member.title}</h2>
                <h2 className="text-lg text-green-600 font-semibold">
                  {member.role}
                </h2>
              </div>
              <div
                style={{ borderColor: "rgba(38,168,44,1.00)" }}
                className="absolute top-1/2 -translate-y-1/2 left-full ml-4 w-72 p-4 bg-white text-black border rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50"
              >
                <h3 className="text-md font-semibold mb-2">
                  About {member.title}
                </h3>
                {Array.isArray(member.content) && (
                  <PortableText value={member.content} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
