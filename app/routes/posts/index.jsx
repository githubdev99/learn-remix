import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

export const loader = async () => {
  const data = {
    posts: await db.post.findMany({
      take: 20,
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  };

  return data;
};

const PostItems = () => {
  const { posts } = useLoaderData();

  return (
    <div>
      <div className="page-header"></div>
      <h1>Posts</h1>
      <Link to="/posts/new" className="btn">
        New Post
      </Link>
      <ul className="posts-lists">
        {posts.map((item) => (
          <li key={item.id}>
            <Link to={item.id}>
              <h3>{item.title}</h3>
              {new Date(item.createdAt).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostItems;
