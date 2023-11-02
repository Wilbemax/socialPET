import React from "react";
import { useParams } from "react-router-dom";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import axios from "../axios";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);

  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        debugger
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при Получении статьи");
      });
  }, []);

  // React.useEffect(() => {
  //   setLoading(true);
  //   debugger
  //   axios
  //     .get(`post/${id}/coment`)
  //     .then((res) => {
  //       setData((prevData) => ({ ...prevData, comment: res.data }));
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("Ошибка при получении комментариев");
  //     });
  // }, [data.comment]);

  debugger

  console.log(data);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  console.log(data);
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:8887${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewCount}
        commentsCount={data.comment.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />{" "}
      </Post>
      <CommentsBlock comment={data.comment} isLoading={false}>
        <Index id={data._id} user={data.user} />
      </CommentsBlock>
    </>
  );
};
