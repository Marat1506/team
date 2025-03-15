import { useState } from "react";
import { shortenUrl } from "../api/api";


interface Type {
    setError: (value: string) => void;
    setShortUrl: (value: string) => void;
}

export default function useForm({
    setError,
    setShortUrl,
}: Type) {
    const [link, setLink] = useState<string>("");
    const [alias, setAlias] = useState<string>("");
    const [expiresAt, setExpiresAt] = useState<string>("");
    const handleShorten = async (): Promise<void> => {
        if (!link.trim()) return;


        if (expiresAt) {
            const selectedDate = new Date(expiresAt);
            const currentDate = new Date();

            if (selectedDate < currentDate) {
                setError("Указана прошедшая дата. Пожалуйста, выберите будущую дату.");
                return;
            }
        }

        setError(""); 

        try {
            const response = await shortenUrl(link, alias, expiresAt || undefined);
            setShortUrl(`http://localhost:4000/${response.short_url}`);
            setLink("");
            setAlias("");
            setExpiresAt("");
        } catch (error) {
            console.error("Ошибка при создании короткой ссылки:", error);
            setError("Ошибка при создании короткой ссылки. Пожалуйста, попробуйте снова.");
        }
    };

    return {
        link,
        alias,
        expiresAt,

        setLink,
        setAlias,
        setExpiresAt,

        handleShorten,
    }
}
