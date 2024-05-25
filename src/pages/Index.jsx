import React, { useState } from "react";
import { Container, VStack, HStack, Text, Box, Heading, Input, Textarea, Button, IconButton, Divider } from "@chakra-ui/react";
import { FaComment, FaThumbsUp } from "react-icons/fa";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState({});

  const handlePostSubmit = () => {
    if (newPost.trim()) {
      setPosts([...posts, { id: Date.now(), content: newPost, comments: [], likes: 0 }]);
      setNewPost("");
    }
  };

  const handleCommentSubmit = (postId) => {
    if (newComment[postId]?.trim()) {
      setPosts(posts.map((post) => (post.id === postId ? { ...post, comments: [...post.comments, newComment[postId]] } : post)));
      setNewComment({ ...newComment, [postId]: "" });
    }
  };

  const handleLike = (postId) => {
    setPosts(posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post)));
  };

  return (
    <Container centerContent maxW="container.md" py={8}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">
          Blog Posts
        </Heading>
        <Textarea placeholder="Write a new post..." value={newPost} onChange={(e) => setNewPost(e.target.value)} />
        <Button colorScheme="teal" onClick={handlePostSubmit}>
          Post
        </Button>
        <Divider />
        {posts.map((post) => (
          <Box key={post.id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text mb={4}>{post.content}</Text>
            <HStack spacing={4}>
              <IconButton aria-label="Like" icon={<FaThumbsUp />} onClick={() => handleLike(post.id)} />
              <Text>{post.likes} Likes</Text>
            </HStack>
            <Divider my={4} />
            <VStack spacing={2} align="start">
              {post.comments.map((comment, index) => (
                <Text key={index} pl={4} borderLeft="2px" borderColor="gray.200">
                  {comment}
                </Text>
              ))}
              <HStack width="100%">
                <Input placeholder="Write a comment..." value={newComment[post.id] || ""} onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })} />
                <IconButton aria-label="Comment" icon={<FaComment />} onClick={() => handleCommentSubmit(post.id)} />
              </HStack>
            </VStack>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Index;
