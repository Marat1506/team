import { useState } from "react";
import "./App.css";
import Form from "./components/Form/Form";
import ShortUrl from "./components/ShortUrl/ShortUrl";

function App() {

  const [shortUrl, setShortUrl] = useState<string>("");
  const [error, setError] = useState<string>(""); // Состояние для ошибки





  return (
    <div className="container">
      <h2>Сокращатель ссылок</h2>
      <Form
        error={error}
        setError={setError}
        setShortUrl={setShortUrl}
      />


      <ShortUrl 
      shortUrl={shortUrl}
      setError={setError}
      setShortUrl={setShortUrl}
      />

    </div>
  );
}

export default App;