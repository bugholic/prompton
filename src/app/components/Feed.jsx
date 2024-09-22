"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]); //posts in array
  const [searchText, setSearchText] = useState("");
  const [searchedPosts, setSearchedPosts] = useState([]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchText(searchValue);
    setSearchedPosts(
      posts.filter(
        (item) =>
          (item.prompt && item.prompt.toLowerCase().includes(searchValue.toLowerCase())) ||
          (item.tag && item.tag.toLowerCase().includes(searchValue.toLowerCase())) ||
          (item.creator.username && item.creator.username.toLowerCase().includes(searchValue.toLowerCase()))
      )
    );
  };


  const handleTagClick = (tag) => {
    setSearchText(tag);
    setSearchedPosts(
      posts.filter(
        (item) =>
          (item.tag && item.tag.toLowerCase().includes(tag.toLowerCase()))
      )
    );
  };


  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
    setSearchedPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>
      <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
