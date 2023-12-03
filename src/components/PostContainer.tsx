import { postsApi } from "../services/PostsService";
import PostItem from "./PostItem";
import styles from "../styles.module.css";
import cn from "classnames";
import loadImg from "../assets/preloader.gif";
import { ChangeEventHandler, useState } from "react";
import { Post } from "../types/posts";

export function PostContainer() {
  const [postTitle, setPostTitle] = useState("");
  const { data: posts, isError, isLoading } = postsApi.useFetchPostsQuery(20);
  const [createPost, {}] = postsApi.useCreatePostMutation();
  const [removePost, {}] = postsApi.useRemovePostMutation();
  const [updatePost, {}] = postsApi.useUpdatePostMutation();

  const onChangePostTitleHandler: ChangeEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    setPostTitle(e.target.value);
  };

  const onAddPostHandler = async () => {
    await createPost({ title: postTitle, body: postTitle } as Post);
    setPostTitle("");
  };

  const onRemovePostHandler = async (post: Post) => {
    await removePost(post);
  };

  const onUpdatePostHandler = async (post: Post) => {
    await updatePost(post);
  };

  return (
    <div>
      <div className={styles.posts__add}>
        <textarea
          rows={2}
          placeholder={"Введите название поста"}
          onChange={onChangePostTitleHandler}
          value={postTitle}
        />
        <button
          onClick={onAddPostHandler}
          className={cn(styles.posts__btn_add, styles.btn)}
        >
          Добавить пост
        </button>
      </div>
      {isLoading && (
        <div className={styles.load__header}>
          <h1 className={styles.isLoading}>Идёт загрузка...</h1>
          <img className={styles.load__img} src={loadImg} />
        </div>
      )}
      {isError ? (
        <h1 className={styles.isError}>Ошибка загрузки постов</h1>
      ) : (
        <h1 className={styles.list__title}>Cписок постов:</h1>
      )}
      <ul className={styles.list}>
        {posts?.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            remove={onRemovePostHandler}
            update={onUpdatePostHandler}
          />
        ))}
      </ul>
    </div>
  );
}

export default PostContainer;
