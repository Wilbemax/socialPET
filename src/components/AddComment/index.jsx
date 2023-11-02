import React from "react";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

import styles from "./AddComment.module.scss";

import { TextField, Avatar, Button, Typography } from "@mui/material";

import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

export const Index = ({ user, id }) => {
  const isAuth = useSelector(selectIsAuth);
  const [commentText, setCommentText] = React.useState("");
  const [comment, setComment] = React.useState([]);
  const post = id;

  const onChange = React.useCallback((event) => {
    setCommentText(event.target.value);
  }, []);

  
  
    const getComments = async () => {
      try {
        
        const { data } = await axios.get(`/posts/${id}/coment`);
        setComment(data);
      } catch (err) {
        console.warn(err);
        alert('ошибка при получении комментариев:(')
      }
    };
    

    debugger
    const onSubmit = async () => {
      try {
        const fields = {
          post,
          user,
          commentText,
        };
        console.log(commentText)
        const { data } = await axios.post(`/posts/${id}/coment`, fields);
    
        const newComment = data;
        setComment([...comment, newComment]);
        console.log(newComment);
        setCommentText("");
        getComments(); // вызываем функцию, чтобы отобразить новый комментарий
      } catch (err) {
        console.warn(err);
        alert("Ошибка при загрузке статьи");
      }
    };


  return (
    <>
      <div className={styles.root}>
        {isAuth ? (
          <Avatar classes={{ root: styles.avatar }} src={user.avatarUrl} />
        ) : (
          ""
        )}
        <div className={styles.form}>
          {isAuth ? (
            <>
              <TextField
                label="Написать комментарий"
                variant="outlined"
                maxRows={10}
                multiline
                fullWidth
                value={commentText}
                onChange={onChange}
              />
              <Button variant="contained" onClick={onSubmit}>
                Отправить
              </Button>
            </>
          ) : (
            <Link className={styles.link} to="/login">
              <Typography align="center" color="error">
                Зарегистрируйтесь или войдие в аккаунт для того чтобы оставить
                коментрарий.
              </Typography>
            </Link>
          )}
        </div>
        
      </div>
    </>
  );
};
