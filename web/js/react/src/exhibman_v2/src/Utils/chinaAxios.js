import axios from "axios";
import React from "react";

const baseURL = "https://foamexpochina.expotec.tech/exhibitor/Api/Home/QuerySysExhibitors";

export default function App() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios.get(`${baseURL}`).then((response) => {
      setPost(response.data);
      console.log(response.data)
    });
  }, []);

  // function createPost() {
  //   axios
  //     .post(baseURL, {
  //       title: "Hello World!",
  //       body: "This is a new post."
  //     })
  //     .then((response) => {
  //       setPost(response.data);
  //     });
  // }

  if (!post) return "No post!"

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      <button onClick={""}>Create Post</button>
    </div>
  );
}