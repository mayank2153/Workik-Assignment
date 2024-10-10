import { GoogleGenerativeAI } from "@google/generative-ai";

const generateAIReview = async (title,body,diff) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
    You are reviewing a pull request titled "${title}". The description of the PR is: "${body}". 
    Below are the code changes (diff):
        ${diff}

    Your task is to:
        1. Analyze the code changes.
        2. Ensure the changes align with the title and description of the PR.
        3. Provide feedback on code quality, best practices, and structure.
        4. Suggest improvements or point out issues if necessary.

    Provide a detailed review based on these criteria.
    `;

    const result = await model.generateContent([prompt]);
    console.log(result.response.text());
};
export default generateAIReview