"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Profile from "../components/Profile";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Do you want to delete this prompt?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPost = posts.filter((p) => p._id !== post.id);
        
        setPosts(filteredPost);
      } catch (error) {}
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
