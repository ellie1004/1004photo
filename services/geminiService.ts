
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this environment, we assume it's always present.
  console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const PROMPT_VARIATIONS = [
  "Transform this photo into a cool and stylish professional profile picture. The person should be wearing a modern, well-fitted dark navy business suit. The background should be a clean, slightly out-of-focus modern office. Ensure the lighting is flattering, like a professional headshot. Maintain the person's likeness.",
  "Generate a professional headshot from this image. Dress the person in a sharp charcoal grey suit with a subtle texture. The background should be a neutral studio backdrop with soft, professional lighting. The overall mood should be confident and approachable. Keep the facial features identical.",
  "Create a powerful profile picture. The person should be wearing a modern black suit with a crisp white shirt, no tie. The background should be a dynamic urban environment at dusk, with city lights blurred in the distance. The lighting should be slightly dramatic but professional. Do not change the person's face.",
  "Produce a high-end corporate headshot. The person is wearing a designer suit and looks directly at the camera with a confident expression. The background is a minimalist, high-end office interior. The lighting is bright and clean. Faithfully reproduce the person's facial characteristics.",
  "Re-imagine this photo as a creative professional's profile picture. They are wearing a stylish, tailored suit (not black) that reflects a creative personality. The background is an artistic studio space with interesting textures. The lighting is natural and warm. It is crucial to maintain the original person's likeness.",
];

const generateSingleImage = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                {
                    inlineData: {
                        data: base64Image,
                        mimeType: mimeType,
                    },
                },
                {
                    text: prompt,
                },
            ],
        },
        config: {
            responseModalities: [Modality.IMAGE],
        },
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            return part.inlineData.data;
        }
    }
    throw new Error("No image data found in the API response.");
};


export const generateProfilePictures = async (base64Image: string, mimeType: string): Promise<string[]> => {
  const imagePromises = PROMPT_VARIATIONS.map(prompt => 
    generateSingleImage(base64Image, mimeType, prompt)
  );
  
  const results = await Promise.all(imagePromises);
  return results;
};


export const editProfilePicture = async (base64Image: string, mimeType: string, prompt: string): Promise<string> => {
    return generateSingleImage(base64Image, mimeType, prompt);
};
