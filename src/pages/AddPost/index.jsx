import React from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector } from "react-redux";
import axios from "../../axios";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { useNavigate, Navigate, useParams } from "react-router-dom";

export const AddPost = () => {
  const {id}  = useParams()
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const [text, setText] = React.useState("");
  const [isloading, setLoading] = React.useState(false);
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [title, setTitle] = React.useState("");
  const imputFileRef = React.useRef(null);

  const isEditing = Boolean(id)

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);
      const { data } = await axios.post("/upload", formData);
      console.log(data);
      setImageUrl(data.url);
    } catch (err) {
      console.log(err);
      alert("Ошибка при загрузке файла");
    }
  };

  const onChange = React.useCallback((value) => {
    setText(value);
    console.log(value);
  }, []);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const fields = {
        title,
        imageUrl,
        tags,
        text,
      };
      console.log(fields);

      const { data } = isEditing ? await axios.patch(`/posts/${id}`, fields) :await axios.post("/posts", fields);

      console.log(data);
      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn(err);
      alert("Ошибка при загрузке статьи");
    }
  };

  React.useEffect(() =>{
    if(id){
      axios.get(`/posts/${id}`).then(
        ({data})=>{
        setTitle(data.title)
        setText(data.text)
        setImageUrl(data.imageUrl)
        setTags(data.tags.split(","))
      })
    }
  })

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!window.localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Paper elevation={0} style={{ padding: 30 }}>
      <div></div>
      <Button
        onClick={() => imputFileRef.current.click()}
        variant="outlined"
        size="large"
        elevation={0}
        sx={{mr: 2}}
      >
        Загрузить превью
      </Button>
      <input
        elevation={0}
        ref={imputFileRef}
        type="file"
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            elevation={0}
            className="margin"
            onClick={onClickRemoveImage}
            variant="contained"
            color="error"
            size="large"
            sx={{mr: 2}}
          >
            Удалить
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:8887${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}

      <br />
      <br />
      <TextField
        elevation={0}
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        elevation={0}
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        elevation={0}
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button
          elevation={0}
          type="submit"
          onClick={onSubmit}
          size="large"
          variant="contained"
        >
          {isEditing ? 'Сохранить':"Отправить"}
        </Button>
        <Button elevation={0} size="large">
          Отмена
        </Button>
      </div>
    </Paper>
  );
};
