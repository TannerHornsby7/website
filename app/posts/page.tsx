'use client';
import { usePosts } from '@/hooks/blog';
import Loader from '@/app/components/Loader';

export default function PostsPage() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) return <Loader />;
  if (error) return <div>Error loading posts</div>;
  if (!posts?.data) return <div>No posts found</div>;

  // Sort posts by date and group them by month+year
  const sortedPosts = [...posts.data].sort((a, b) => {
    // Handle cases where createdAt might be null/undefined
    if (!a || !b) return 0;
    if (!a.createdAt && !b.createdAt) return 0;
    if (!a.createdAt) return 1;
    if (!b.createdAt) return -1;
    
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const groupedPosts = sortedPosts.reduce((groups: Record<string, any[]>, post) => {
    if (!post) return groups;
    const monthYear = post.createdAt 
      ? new Date(post.createdAt).toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })
      : 'No Date';
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(post);
    return groups;
  }, {});

  return (
    <div className="text-left">
      <h1 className="text-4xl font-bold text-gray-900 sticky top-0 z-10">My Posts</h1>
      <div className="mt-8">
        {Object.entries(groupedPosts).map(([monthYear, posts]) => (
          <section key={monthYear} className="mb-12">
            <h2 className="sticky top-16 text-sm text-gray-500 mb-6 w-full backdrop-blur">{monthYear}</h2>
            <ul className="space-y-8">
              {posts.map((post, index) => (
                <li key={index} className="flex-grow">
                  <h3 className="font-bold text-xl">{post.title}</h3>
                  <div className="mt-2 line-clamp-3 text-gray-600">{post.content}</div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}