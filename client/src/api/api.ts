

interface ShortenResponse {
    short_url: string;
}

interface UrlInfo {
    originalUrl: string;
    createdAt: string;
    clickCount: number;
}

interface AnalyticsResponse {
    clickCount: number;
    lastFiveIps: string[];
}

const API_BASE_URL = "http://localhost:4000/api";

export const shortenUrl = async (
    originalUrl: string,
    alias?: string,
    expiresAt?: string
): Promise<ShortenResponse> => {
    const response = await fetch(`${API_BASE_URL}/shorten`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl, alias, expiresAt }),
    });

    const data = await response.json()
    console.log("data = ", data)
    if (!response.ok) {
        throw new Error("Ошибка при создании короткой ссылки");
    }


    return data
};


export const deleteUrl = async (shortUrl: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/delete/${shortUrl}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Ошибка при удалении ссылки");
    }
};


export const getUrlInfo = async (shortUrl: string): Promise<UrlInfo> => {
    const response = await fetch(`${API_BASE_URL}/info/${shortUrl}`);

    if (!response.ok) {
        throw new Error("Ошибка при получении информации о ссылке");
    }
    const data = await response.json()
    return data
};


export const getUrlAnalytics = async (shortUrl: string): Promise<AnalyticsResponse> => {
    const response = await fetch(`${API_BASE_URL}/analytics/${shortUrl}`);

    if (!response.ok) {
        throw new Error("Ошибка при получении аналитики");
    }
    const data = await response.json()

    return data
};

export const getAllUrls = async (): Promise<{ short_url: string; url: string }[]> => {
    const response = await fetch(`${API_BASE_URL}/urls`);
    if (!response.ok) {
        throw new Error("Ошибка при загрузке ссылок");
    }
    return response.json();
};