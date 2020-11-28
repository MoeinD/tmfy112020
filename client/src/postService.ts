import axios from 'axios';
const url = 'api/posts/';

class PostService {
    //Get post
    static getPosts(){
        return new Promise(async (resolve , reject)=>{
            try{
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post=>({
                        ...post,createAt : new Date(post.createAt)
                    }))
                )
            }
            catch(err){
                reject(err);
            }
        })
    }
    //Create Post
    static insertPost(text){
        return axios.post(url , {text});
    }
    //delete post
    static deletePost(id){
        return axios.delete(`${url}${id}`)
    }
}

export default PostService;