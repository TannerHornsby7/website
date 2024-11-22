'use client';

import { useCreatePost } from '@/hooks/blog';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreatePostPage() {
  const { mutate: createPost } = useCreatePost();
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    images: {} as Record<string, string>
  });
  const [imageTitle, setImageTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        images: JSON.stringify(formData.images)
      };
      const post = await createPost(postData);
      router.push('/posts');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleAddImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageTitle && imageUrl) {
      setFormData({
        ...formData,
        images: { ...formData.images, [imageTitle]: imageUrl }
      });
      setImageTitle('');
      setImageUrl('');
    }
  };

  return (
    <div className="text-left">
      <h1 className="text-4xl font-bold text-gray-900">Create New Post</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={10}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Images</h3>
          
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="imageTitle" className="block text-sm font-medium text-gray-700">
                Image Title
              </label>
              <input
                type="text"
                id="imageTitle"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <div className="flex-1">
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            
            <button
              onClick={handleAddImage}
              type="button"
              className="mt-6 inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Add Image
            </button>
          </div>

          {Object.entries(formData.images).length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Added Images:</h4>
              <ul className="space-y-2">
                {Object.entries(formData.images).map(([title, url]) => (
                  <li key={title} className="flex justify-between items-center text-sm text-gray-600">
                    <span>{title}: {url}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const newImages = { ...formData.images };
                        delete newImages[title];
                        setFormData({ ...formData, images: newImages });
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}