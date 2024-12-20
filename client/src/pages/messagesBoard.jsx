import React, { useMemo, useEffect, useContext } from 'react';
import Stack from '@mui/joy/Stack';
import "../styles/messagesBoard.css";
import Posts from '../comps/postsComps/posts';
import axios from 'axios';
import { url } from '../config/server';
import PostForm from '../comps/postsComps/postForm';
import { toggleLike, getPosts } from '../server/posts';
import PostsFilters from '../comps/postsComps/PostsFilters';
import { Card, Typography } from '@mui/joy';
import { UserContext } from '../App';


export default function MessagesBoard(params) {
    const [posts, setPosts] = React.useState([]);
    const [filters, setFilters] = React.useState({ category: [], username: [], content: '' });
    const [user, setUser] = useContext(UserContext);

    const handleFilters = (key, value) => {
        if (key === "content") return setFilters({ ...filters, [key]: value.target.value })
        setFilters({ ...filters, [key]: value })
    }
    const handleSubmit = async (input) => {
        try {
            //todo: get only the new message
            const { data } = await axios.post(`${url}/posts`, input, { withCredentials: true });
            setPosts([data, ...posts]);
        } catch (error) {
            console.log(error);
        }
    }

    const filteredPosts = useMemo(() => {
        let filtered = [...posts];
        if (filters.category.length > 0) filtered = filtered.filter(p => Object.values(filters.category).includes(p.category));
        if (filters.username.length > 0) filtered = filtered.filter(p => Object.values(filters.username).includes(p.username));
        if (filters.content) filtered = filtered.filter(p => p.content.includes(filters.content) || p.title.includes(filters.content));
        return filtered;
    }, [filters, posts])

    const handlePosts = useMemo(() => ({
        toggleLike: post_id => {
            toggleLike(post_id).then((data) => {
                if (!data) return;
                setPosts(prev => prev.map(p => {
                    if (p.post_id === post_id)
                        return { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked }
                    return p;
                }));
            })
        }
    }), [])

    useEffect(() => {
        getPosts().then((data) => {
            setPosts(data);
        })
    }, [])

    return <>
        <Stack m="auto" maxWidth={600} alignItems="center" spacing={0}>
            <h1>לוח המודעות הקהילתי</h1>
            <Card variant='soft' sx={{maxWidth: "500px"}}>
                <PostForm disabled={!user?.user_id} handleSubmit={handleSubmit} />
                <PostsFilters posts={posts} handleFilters={handleFilters} />
            </Card>
            <Posts posts={filteredPosts} handlePosts={handlePosts} />
        </Stack>
    </>
    ;
}
