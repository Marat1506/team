import { useState } from "react";
import useShortUrl from "../../hooks/useShortUrl";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

interface ShortUrlType {
  shortUrl: string;
  setShortUrl: (value: string) => void;
  setError: (value: string) => void;
}

export default function ShortUrl({ shortUrl, setShortUrl, setError }: ShortUrlType) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [urlInfo, setUrlInfo] = useState<{ originalUrl: string; createdAt: string; clickCount: number } | null>(null);

  const { handleDelete, handleInfo } = useShortUrl({ setError, setShortUrl });

  const handleInfoClick = async (shortUrl: string) => {
    try {
      const response = await handleInfo(shortUrl);
      setUrlInfo(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Ошибка при получении информации:", error);
      setError("Ошибка при получении информации. Пожалуйста, попробуйте снова.");
    }
  };

  if (!shortUrl) {
    return null;
  }

  return (
    <div className="result">
      <p>Ваша короткая ссылка:</p>
      <a href={shortUrl} target="_blank" rel="noopener noreferrer">
        {shortUrl}
      </a>
      <Button
        text="Удалить"
        callback={() => {
          const urlPart = shortUrl.split("/").pop();
          if (urlPart) handleDelete(urlPart);
        }}
      />
      <Button
        text="Информация"
        callback={() => {
          const urlPart = shortUrl.split("/").pop();
          if (urlPart) handleInfoClick(urlPart);
        }}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {urlInfo && (
          <div>
            <h3>Информация о ссылке</h3>
            <p>Оригинальная ссылка: {urlInfo.originalUrl}</p>
            <p>Дата создания: {new Date(urlInfo.createdAt).toLocaleString()}</p>
            <p>Количество переходов: {urlInfo.clickCount}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}