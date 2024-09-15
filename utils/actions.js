'use server'

import OpenAI from "openai";
import { revalidatePath } from "next/cache";
import { Tour } from '@/models/tourModel';
import { Token } from '@/models/tokenModel';
import connectDB from "./db";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generateChatResponse = async (chatMessages) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'you are a helpful assistant' },
        ...chatMessages,
      ],
      temperature: 0,
      max_tokens: 100
    });
    return {
      message: response.choices[0].message,
      tokens: response.usage.total_tokens,
    };
  } catch (error) {
    return null;
  }
}

export const generateTourResponse = async ({ city, country }) => {
  const query = `Find a ${city} city in this country: ${country}.
  If ${city} city in this country: ${country} exists, create a list of things families can do in this ${city},${country}. 
  Once you have a list, create a one-day tour. Response should be in the following JSON format: 
  {
    "tour": {
      "city": "${city}",
      "country": "${country}",
      "title": "title of the tour",
      "description": "description of the city and tour",
      "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
    }
  }
  If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'system', content: 'you are a tour guide' },
        { role: 'user', content: query }
      ],
      temperature: 0
    })

    const tourData = JSON.parse(response.choices[0].message.content);

    if (!tourData.tour) {
      return null;
    }

    return { tour: tourData.tour, tokens: response.usage.total_tokens };
  } catch (error) {
    console.log(error);
    return null;
  }

};

export const getExistingTour = async ({ city, country }) => {
  return await Tour.findOne({ city, country });
};

export const createNewTour = async (tour) => {
  const newTour = new Tour(tour);
  const savedTour = await newTour.save();
  
  return JSON.parse(JSON.stringify(savedTour));
};

export const getAllTours = async (searchTerm) => {
  if (!searchTerm) {
    const tours = await Tour.find().sort({ city: 1 }).lean();

    return JSON.parse(JSON.stringify(tours));
  }

  return await JSON.parse(JSON.stringify(Tour.find({
    $or: [
      { city: { $regex: searchTerm, $options: 'i' } },
      { country: { $regex: searchTerm, $options: 'i' } }
    ]
  }).sort({ city: 1 })));
};

export const getSingleTour = async (id) => {
  return await Tour.findById(id);
};

export const fetchUserTokensById = async (clerkId) => {
  await connectDB();

  const result = await Token.findOne({ clerkId });

  return result ? result.tokens : null;
};

export const generateUserTokensForId = async (clerkId) => {
  const token = new Token({ clerkId });
  const result = await token.save();

  return JSON.parse(JSON.stringify(result.tokens));
};

export const fetchOrGenerateTokens = async (clerkId) => {
  let tokens = await fetchUserTokensById(clerkId);

  if (tokens !== null) {
    return tokens;
  }

  return await generateUserTokensForId(clerkId);
};

export const subtractTokens = async (clerkId, tokens) => {
  const result = await Token.findOneAndUpdate(
    { clerkId },
    { $inc: { tokens: -tokens } },
    { new: true }
  );

  revalidatePath('/profile');
  
  return JSON.parse(JSON.stringify(result.tokens));
};
