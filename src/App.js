import "./styles.css";
import { useState } from "react";
import personData from "./data";

export default function App() {
  const [instalment, setInstalment] = useState(false);
  const [count, setCount] = useState(false);
  const [sortBy, setSortBy] = useState("");
  const [direction, setDirection] = useState("asending");
  const colorLine = 6;

  const renderData = personData

    .filter((row) => {
      if (instalment) {
        return row.instalment;
      } else {
        return true;
      }
    })

    .filter((row) => {
      if (count) {
        return row.count;
      } else {
        return true;
      }
    })

    .sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy) {
        if (direction === "asending") {
          return a[sortBy] - b[sortBy];
        } else {
          return b[sortBy] - a[sortBy];
        }
      }
      return 0;
    });

  const sortDirection = (sorted) => {
    setDirection(direction === "asending" ? "disending" : "asending");
    setSortBy(sorted);
  };
  return (
    <div className="App">
      <h1>Таблица</h1>

      <label htmlFor="instalment">
        <input
          type="checkbox"
          id="instalment"
          checked={instalment}
          onChange={(e) => {
            setInstalment(e.target.checked);
          }}
        />
        В рассрочку
      </label>

      <label htmlFor="count">
        <input
          type="checkbox"
          id="count"
          checked={count}
          onChange={(e) => {
            setCount(e.target.checked);
          }}
        />
        Есть в наличии
      </label>

      <table border="1">
        <thead>
          <tr>
            <th onClick={() => sortDirection("id")}>№</th>
            <th onClick={() => sortDirection("name")}>Название</th>
            <th onClick={() => sortDirection("price")}>Цена</th>
            <th onClick={() => sortDirection("count")}>Количество</th>
            <th>Рассрочка</th>
          </tr>
        </thead>
        <tbody>
          {renderData.map((row) => (
            <tr
              style={{
                backgroundColor: colorLine > row.count ? "#FFDDBD" : true
              }}
              key={row.id}
            >
              <td>{row.id}</td>
              <td class="overflow">{row.name}</td>
              <td>{row.price}</td>
              <td>
                {row.count === 0 ? <text>Нет в наличии</text> : row.count}
              </td>
              <td>{row.instalment && "✅"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
