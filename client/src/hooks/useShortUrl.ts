import { deleteUrl, getUrlInfo } from "../api/api";

interface Type {
  setShortUrl: (value: string) => void;
  setError: (value: string) => void;
}

export default function useShortUrl({ setShortUrl, setError }: Type) {
  const handleDelete = async (shortUrl: string): Promise<void> => {
    try {
      await deleteUrl(shortUrl);
      setShortUrl("");
    } catch (error) {
      console.error("Ошибка при удалении ссылки:", error);
      setError("Ошибка при удалении ссылки. Пожалуйста, попробуйте снова.");
    }
  };

  const handleInfo = async (shortUrl: string) => {
    try {
      const response = await getUrlInfo(shortUrl);
      return response; 
    } catch (error) {
      console.error("Ошибка при получении информации:", error);
      setError("Ошибка при получении информации. Пожалуйста, попробуйте снова.");
      throw error;
    }
  };

  return {
    handleDelete,
    handleInfo,
  };
}