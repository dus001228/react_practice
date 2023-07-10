import "./App.css";
import DiaryList from "./DiaryList";
import DiaryEditor from "./DiraryEditor";
import { useState, useEffect } from "react";

//https://jsonplaceholder.typicode.com/comments

function App() {
  const [data, setData] = useState([]);
  // const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch("http://127.0.0.1:8000/posts/").then((res) =>
      res.json()
    );

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.writer,
        content: it.content,
        emotion: it.view_count,
        id: it.id,
      };
    });

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (author, content, emotion) => {
    fetch("http://localhost:8000/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        writer: author,
        content: content,
        view_count: emotion,
      }),
    }).then((response) => response.json());

    // const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id: dataId.current,
    // };
    // dataId.current += 1;
    // setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다.`);
    const newDiaryList = data.filter((it) => it.id !== targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onRemove={onRemove} diaryList={data} onEdit={onEdit} />
    </div>
  );
}

export default App;
