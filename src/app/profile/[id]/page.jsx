"use client";

import React, { useEffect, useState } from "react";
import Profile from "../../components/Profile";
import { useRouter, useSearchParams } from "next/navigation";

const userProfile = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setUser(data);
    };

    fetchPosts();
  }, []);

  return (
    <Profile name={"user"} desc={`Welcome to your User's page`} data={user} />
  );
};

export default userProfile;
