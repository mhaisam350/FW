import React, { useState, useEffect } from 'react';

import fs from 'fs';
import path from 'path'
import matter from 'gray-matter';

import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Post from '../../components/Post';
import Footer from '../../components/Footer'

import { sortByDate } from '../../utils'

import styles from '../../styles/Journal.module.css';

export default function Journal({ posts }) {

    // const [postsShown, setPostsShown] = useState(3);
    // const [postsToShow, setPostsToShow] = useState(false);
    // const [numOfPosts, setNumOfPosts] = useState(posts.length);

    // console.log(numOfPosts);

        // const showMorePosts = async () => {
    //     // setPostsShown(postsShown + 1);
    //     if (postsShown <= numOfPosts) { setPostsShown(postsShown + 3) };
    // };

    // useEffect(() => {

        

    // })
    return (

        <>

            <Head>
                <title>Journal - Frontwheel</title>
            </Head>

            <Navbar />

            <div className={styles['banner-container']}>
                <h1 className={styles['banner-title']}>Journal</h1>
                <div className={styles['banner-mask']}>
                
                </div>
            </div>

            <section className={styles.posts} >
                

                    {posts.map((post, index) => (

                        <article className={styles['post-article']}>
                            
                            <Post key={index} post={post} />

                        </article> 

                    ))}
   
            </section>

            <Footer />

        </>
    )
}

export async function getStaticProps() {

    // use nodejs file system to get array of files in the Posts directory
    // use path.join to target Posts directory
    
    const files = fs.readdirSync(path.join('posts'));

    // map and read through each file to retrieve metadata by concatenating posts dir with filename

    const posts = files.map(filename => {

        const slug = filename.replace('.md', '');

        const meta = fs.readFileSync(path.join('posts', filename), 'utf-8');

        const {data: frontmatter} = matter(meta)

        return {
            slug,
            frontmatter,
        }
    });

    // console.log(posts);

    return {
        props: {
            posts: posts.sort(sortByDate),
        },
    }

}
