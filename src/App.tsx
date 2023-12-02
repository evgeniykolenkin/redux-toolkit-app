import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { fetchUsersThunk } from "./store/reducers/ActionCreators";

function App() {
  const { users, isLoading, error } = useAppSelector((state) => state.users);

  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, []);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, []);

  if (isLoading) {
    return (
      <h1 style={{ fontSize: 22, color: "blue", padding: 10 }}>
        Идёт загрузка...
      </h1>
    );
  }

  if (error) {
    return (
      <>
        <h1 style={{ fontSize: 22, color: "red", padding: 10 }}>
          Ошибка загрузки пользователей
        </h1>
        <h2 style={{ fontSize: 18, color: "pink", padding: 10 }}>{error}</h2>
      </>
    );
  }

  return (
    <div>
      <h1 style={{ padding: 10, fontSize: 22 }}>Cписок пользователей:</h1>
      <ul
        style={{
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {users.map((user) => (
          <li key={user.id}>
            <h2>
              {user.id}. {user.name}
            </h2>
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
