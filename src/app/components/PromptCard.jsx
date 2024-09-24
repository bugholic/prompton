import { useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import tick from "../assets/icons/tick.svg";
import copy from "../assets/icons/copy.svg";
import Link from "next/link";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState("");
  const pathName = usePathname();
  const router = useRouter();


  
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied("");
    }, 3000);
  };

  return (
    <section className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator?.image}
            alt="user-profile"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <Link href={session?.user.id === post.creator?._id ?`/profile` : `/profile/${post.creator?._id}` }>
              <h3 className="font-semibold text-gray-900 cursor-pointer">
                {post.creator?.username}
              </h3>
            </Link>
              <p className="text-sm text-gray-500">{post.creator?.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? tick : copy}
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my4 text-sm text-gray-700">
        {" "}
        {post.prompt}
        <p
          className="text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </section>
  );
};

export default PromptCard;
