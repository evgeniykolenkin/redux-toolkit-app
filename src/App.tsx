import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsersThunk } from "./store/reducers/ActionCreators";
import PostContainer from "./components/PostContainer";
import styles from "./styles.module.css";
import loadImg from "./assets/preloader.gif";

function App() {
  const { users, isLoading, error } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  // *это для случая с обычным асинхронным запросом без createAsyncThunk
  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  // *это c createAsyncThunk
  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, []);

  return (
    <>
      {isLoading && (
        <div className={styles.load__header}>
          <h1 className={styles.isLoading}>Идёт загрузка...</h1>
          <img className={styles.load__img} src={loadImg} />
        </div>
      )}
      {error ? (
        <h1 className={styles.isError}>Ошибка загрузки пользователей</h1>
      ) : (
        <h1 className={styles.list__title}>Cписок пользователей:</h1>
      )}
      <ul className={styles.list}>
        {users.map((user) => (
          <li key={user.id}>
            <h2>
              {user.id}. {user.name}
            </h2>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
      <PostContainer />
    </>
  );
}

export default App;
