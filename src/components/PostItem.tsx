import { Post } from "../types/posts";
import styles from "../styles.module.css";
import cn from "classnames";
import { ChangeEventHandler, MouseEventHandler, useState } from "react";

type Props = {
  post: Post;
  update: (post: Post) => void;
  remove: (post: Post) => void;
};

export function PostItem({ post, update, remove }: Props) {
  // const [newPostTitle, setNewPostTitle] = useState("");
  // const [isEdit, setIsEdit] = useState(false);

  const removeHandler: MouseEventHandler<HTMLButtonElement> = () => {
    remove(post);
  };

  const updateHandler = () => {
    const title = prompt() || "";
    update({ ...post, title });
  };

  // const updateHandler = () => {
  //   setIsEdit(true);
  //   update({ ...post, title: newPostTitle });
  // };

  // const newTitleHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
  //   setNewPostTitle(e.target.value);
  //   setIsEdit(false);
  // };

  // return (
  //   <li className={styles.posts__item}>
  //     {isEdit ? (
  //       <div className={styles.posts__item_title}>
  //         {post.id}. {post.title}
  //       </div>
  //     ) : (
  //       <input onChange={newTitleHandler} />
  //     )}
  //     <button
  //       onClick={updateHandler}
  //       className={cn(styles.posts__btn_edit, styles.btn)}
  //     >
  //       Редактировать
  //     </button>
  //     <button
  //       onClick={removeHandler}
  //       className={cn(styles.posts__btn_delete, styles.btn)}
  //     >
  //       Удалить пост
  //     </button>
  //   </li>
  // );

  return (
    <li className={styles.posts__item}>
      <div className={styles.posts__item_title}>
        {post.id}. {post.title}
      </div>
      <button
        onClick={updateHandler}
        className={cn(styles.posts__btn_edit, styles.btn)}
      >
        Редактировать
      </button>
      <button
        onClick={removeHandler}
        className={cn(styles.posts__btn_delete, styles.btn)}
      >
        Удалить пост
      </button>
    </li>
  );
}

export default PostItem;
