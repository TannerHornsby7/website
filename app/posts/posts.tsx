import Image from "next/image";
import Link from "next/link";

export default function PostsPage() {
  return (
      <div className="text-left">
        <h1 className="text-4xl font-bold text-gray-900">My Posts</h1>
        <ul className="mt-8 list-disc list-inside">
          <li>
            <h3 className="font-bold">Post Title 1</h3>
            <p>First few lines of the post...</p>
          </li>
          <li>
            <h3 className="font-bold">Post Title 2</h3>
            <p>First few lines of the post...</p>
          </li>
          <li>
            <h3 className="font-bold">Post Title 3</h3>
            <p>First few lines of the post...</p>
          </li>
        </ul>
    </div>
  );
} 