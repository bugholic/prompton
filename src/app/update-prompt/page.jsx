"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Form from "../components/Form";

const EditPrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);

  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
      setLoading(false);
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const EditPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading Prompts...</div>}>
      {!loading && (
        <Form
          type="Edit "
          post={post}
          setPost={setPost}
          submitting={submitting}
          handleSubmit={EditPrompt}
        />
      )}
    </Suspense>
  );
};

export default EditPrompt;
