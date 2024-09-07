/* eslint-disable @typescript-eslint/no-explicit-any */
// ./src/components/Posts.tsx

export function Posts({ posts }: { posts: any }) {
  return (
    <ul className='container mx-auto grid grid-cols-1 divide-y divide-blue-100'>
      {posts.map((post: any) => (
        <li key={post._id}>
          <a
            className='block p-4 hover:bg-blue-50'
            href={`/posts/${post?.slug?.current}`}
          >
            {post?.title}
          </a>
        </li>
      ))}
    </ul>
  );
}
