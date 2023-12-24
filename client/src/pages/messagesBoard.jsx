import React, { useMemo, useEffect } from 'react';
import Stack from '@mui/joy/Stack';
import "../styles/messagesBoard.css";
import Posts from '../comps/postsComps/posts';
import axios from 'axios';
import { url } from '../config/server';
import { getPosts } from '../functions/server';
import PostForm from '../comps/postsComps/postForm';
import {toggleLike} from '../functions/server';
import SelectIndicator from '../comps/postsComps/select';
import { Card } from '@mui/joy';


export default function MessagesBoard(params) {
    const [posts, setPosts] = React.useState([]);
    const handleSubmit = async (input) => {
        try {
            //todo: get only the new message
            const { data } = await axios.post(`${url}/posts`, input, { withCredentials: true });
            console.log(data);
            setPosts([data, ...posts]);
        } catch (error) {
            console.log(error);
        }
    }

    const handlePosts = useMemo(() =>
    ({
        toggleLike: async post_id => {
            try{
                await toggleLike(post_id);
                setPosts(prev => {
                    const post = prev.find(p => p.post_id === post_id);
                    post.liked = !post.liked;
                    post.liked ? post.likes++ : post.likes--; 
                    return [...prev]
                })
            }catch(e){
                console.log(e)
            }
        }
    }),[])

    useEffect(() => {
        getPosts().then((data) => {
            console.log(data);
            setPosts(data);
        })
    }, [])

    return <>
        <Stack m="auto" maxWidth={600} alignItems="center" spacing={2}>
            <h1>לוח המודעות הקהילתי</h1>
            <PostForm handleSubmit={handleSubmit} />
            <Card variant='soft' sx={{width: "100%", m: 0}} orientation='horizontal'  >
                <SelectIndicator />
                <SelectIndicator />                
                <SelectIndicator />                
            </Card>
            <Posts posts={posts} handlePosts={handlePosts} />
        </Stack>
    </>
        ;
}
