import Button from "../Button/Button";
import TextField from "../TextField/TextField";
import useForm from "../../hooks/useForm";

interface FormType {
    error: string;
    setShortUrl: (value: string) => void;
    setError: (value: string) => void;
}
export default function Form({
    error,
    setError,
    setShortUrl
}: FormType) {
    const {
        alias,
        link,
        expiresAt,

        setAlias,
        setLink,
        setExpiresAt,

        handleShorten

    } = useForm({setError, setShortUrl})

    return (
        <div className="input-container">
           
            <TextField
                type="text"
                placeholder="Введите ссылку..."
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="input"
            />
           
            <TextField
                type="text"
                placeholder="Алиас (опционально)"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="input"
            />
           
            <TextField
                type="datetime-local"
                placeholder="Срок действия (опционально)"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="input"
            />
            {error && <p className="error">{error}</p>} 
            <Button
                text="Сократить"
                callback={handleShorten}
            />


        </div>
    )
}
