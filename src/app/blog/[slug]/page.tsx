import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchApi } from "@/helpers/fetch-api";
import { Post } from "@/interfaces/post";
import { formatDate } from "@/helpers/format-date-helper";
import PageHeader from "@/components/PageHeader";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: {
    slug: string;
  };
}

const getPost = async (slug: string) => {
  const path = `/posts`;
  const urlParamsObject = {
    filters: {
      slug: slug,
    },
    populate: "image",
  };

  const { data } = await fetchApi(path, urlParamsObject);

  return data[0];
};

const Slug = async ({ params }: Props) => {
  const post: Post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const { title, body, description, publishedAt, image } = post.attributes;
  const { url, width, height } = image.data.attributes.formats.medium;

  return (
    <div className="space-y-8">
      <PageHeader text={title} />
      <p className="text-gray-500 mb-2">{formatDate(publishedAt)}</p>
      <Image
        className="h-auto rounded-lg"
        src={url}
        alt={`imagen de ${title}`}
        width={width}
        height={height}
      />
      <p className="mb-3 text-gray-500 dark:text-gray-400 first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-gray-900 dark:first-letter:text-gray-100 first-letter:mr-3 first-letter:float-left">
        {description}
      </p>
      <div className="prose">
        <MDXRemote source={body} />
      </div>
    </div>
  );
};
export default Slug;
