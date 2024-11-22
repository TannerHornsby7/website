'use client';

import { useQuery } from "@tanstack/react-query";

const mockPosts = [
  {
    title: "Building a Personal Website with Next.js",
    content: "In this post, I'll walk through how I built my personal website using Next.js, TailwindCSS, and other modern web technologies. We'll cover the key design decisions, component architecture, and deployment process.",
    createdAt: "2024-01-15T12:00:00Z",
    updatedAt: "2024-01-15T12:00:00Z",
    images: {
      "hero": "https://mybucket.s3.amazonaws.com/posts/nextjs-website.jpg"
    }
  },
  {
    title: "Understanding React Server Components",
    content: "React Server Components represent a paradigm shift in how we build React applications. This post explores what RSCs are, their benefits, and how to effectively use them in your Next.js applications.",
    createdAt: "2024-01-10T12:00:00Z",
    updatedAt: "2024-01-10T12:00:00Z",
    images: {
      "diagram": "https://mybucket.s3.amazonaws.com/posts/rsc-diagram.jpg"
    }
  },
  {
    title: "The Power of TanStack Query",
    content: "TanStack Query (formerly React Query) has revolutionized how we handle server state in React applications. Let's dive into its key features and see how it can simplify your data fetching logic.",
    createdAt: "2024-01-05T12:00:00Z",
    updatedAt: "2024-01-05T12:00:00Z",
    images: {
      "cover": "https://mybucket.s3.amazonaws.com/posts/tanstack-query.jpg"
    }
  }
];

export default function PostsPage() {
  const { data: posts, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      // In production, this would be a real API call
      return mockPosts;
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="text-left">
      <h1 className="text-4xl font-bold text-gray-900">My Posts</h1>
      <ul className="mt-8 space-y-6">
        {posts.map((post, index) => (
          <li key={index} className="border-b pb-4">
            <h3 className="font-bold text-xl">{post.title}</h3>
            <p className="text-sm text-gray-600 mt-1">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
            <p className="mt-2">
              {post.content.split(' ').slice(0, 30).join(' ')}...
            </p>
            {/* {Object.entries(post.images)[0] && (
              <div className="mt-4 relative h-48 w-full">
                <Image
                  src={Object.entries(post.images)[0][1]}
                  alt={`Image for ${post.title}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
}