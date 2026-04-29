import OpenAI from "openai";

export const NVIDIA_MODEL = "meta/llama-3.1-70b-instruct";

export const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY ?? "missing-nvidia-api-key",
  baseURL: "https://integrate.api.nvidia.com/v1"
});
