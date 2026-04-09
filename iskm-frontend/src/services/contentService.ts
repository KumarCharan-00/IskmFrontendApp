export interface ImageDTO {
    id: number;
    imageData: string; // Base64 string from backend? Backend returns byte[], usually Jackson converts to base64 string
    expiresAt: string;
    createdAt: string;
}

export interface ContentDTO {
    id: string;
    type: string;
    title: string;
    quote?: string;
    previewText?: string;
    fullText?: string;
    status: string;
    location?: string;
    showDonation: boolean;
    showFromDate?: string;
    showToDate?: string;
    createdAt: string;
    images: ImageDTO[];
}

export interface FetchContentResponse {
    content: ContentDTO[];
    count: number;
}

export const fetchPublicContent = async (
    types?: string[],
    limit?: number
): Promise<ContentDTO[]> => {
    try {
        const baseUrl =
            (window as any).ENV?.VITE_API_BASE_URL ||
            import.meta.env.VITE_API_BASE_URL ||
            "http://localhost:8080";
        const url = new URL(`${baseUrl}/public/content`);

        if (types && types.length > 0) {
            // Append each type parameter. Spring Boot accepts ?type=seva&type=festival
            types.forEach((t) => url.searchParams.append("type", t));
        }

        if (limit) {
            url.searchParams.append("k", limit.toString());
        }

        const response = await fetch(url.toString(), {
            headers: {
                Accept: "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching content: ${response.statusText}`);
        }

        const data: FetchContentResponse = await response.json();
        return data.content;
    } catch (error) {
        console.error("Failed to fetch content", error);
        return [];
    }
};

export const getImageSrc = (image?: ImageDTO): string | undefined => {
    if (!image || !image.imageData) return undefined;
    return `data:image/jpeg;base64,${image.imageData}`;
};
