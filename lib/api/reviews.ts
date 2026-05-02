// lib/api/reviews.ts
// API contract and configuration for review system

/**
 * Blocked words configuration
 * Moderators can edit this array to add/remove blocked words
 * Server must enforce the same list for security
 */
export const blockedWordsConfig = {
  words: [
    'spam', 'scam', 'fake', 'stupid', 'dumb', 'hate', 'sucks', 'terrible', 'awful',
    'shit', 'fuck', 'damn', 'crap', 'bullshit', 'asshole', 'bitch', 'wtf', 'stfu'
  ]
};

/**
 * Review data structure
 */
export interface ReviewData {
  id: string;
  name: string;
  location?: string;
  rating: number; // 1-10
  text: string;
  timestamp: string; // ISO string
  donationAmount?: number;
  isAnonymous: boolean;
}

/**
 * Review submission payload
 */
export interface ReviewSubmissionPayload {
  name?: string;
  location?: string;
  rating: number;
  text: string;
  isAnonymous: boolean;
  donationAmount?: number;
}

/**
 * Donation payload (when donating separately)
 */
export interface DonationPayload {
  amount: number;
  reviewId?: string; // Optional: if attached to a review
  timestamp: string;
  donorName?: string;
}

/**
 * API endpoints configuration
 * Change these URLs to match your backend
 */
export const apiConfig = {
  reviewsEndpoint: '/api/reviews',
  donationEndpoint: '/api/donate',
  // Fallback donation page URL (used when payment provider not integrated)
  donationPageUrl: 'https://donate.nngtw.com'
};

/**
 * Client-side validation functions
 */
export const validateReview = (data: ReviewSubmissionPayload): string | null => {
  if (data.rating < 1 || data.rating > 10) {
    return "Please select a rating between 1 and 10 stars.";
  }
  if (!data.text.trim()) {
    return "Please write a review.";
  }
  if (data.text.trim().length < 10) {
    return "Review must be at least 10 characters long.";
  }
  if (containsBlockedWords(data.text) || 
      (!data.isAnonymous && data.name && containsBlockedWords(data.name))) {
    return "Your review contains inappropriate language. Please keep it friendly and professional.";
  }
  if (data.donationAmount && (isNaN(data.donationAmount) || data.donationAmount <= 0)) {
    return "Please enter a valid donation amount.";
  }
  return null;
};

export const containsBlockedWords = (text: string): boolean => {
  const lowerText = text.toLowerCase();
  return blockedWordsConfig.words.some(word => 
    lowerText.includes(word.toLowerCase())
  );
};

/**
 * Example server-side implementation (Node.js/Express)
 * 
 * POST /api/reviews
 * Body: ReviewSubmissionPayload
 * Response: { success: boolean, review?: ReviewData, error?: string }
 * 
 * Example implementation:
 * 
 * app.post('/api/reviews', async (req, res) => {
 *   const { name, location, rating, text, isAnonymous, donationAmount } = req.body;
 *   
 *   // Server-side validation
 *   const validationError = validateReview(req.body);
 *   if (validationError) {
 *     return res.status(400).json({ success: false, error: validationError });
 *   }
 *   
 *   // Create review object
 *   const review = {
 *     id: generateId(),
 *     name: isAnonymous ? 'Anonymous' : (name || 'Anonymous'),
 *     location: location || undefined,
 *     rating,
 *     text: text.trim(),
 *     timestamp: new Date().toISOString(),
 *     donationAmount: donationAmount || undefined,
 *     isAnonymous
 *   };
 *   
 *   // Save to database
 *   await saveReview(review);
 *   
 *   // Handle donation if attached
 *   if (donationAmount) {
 *     await processDonation({
 *       amount: donationAmount,
 *       reviewId: review.id,
 *       timestamp: review.timestamp
 *     });
 *   }
 *   
 *   res.json({ success: true, review });
 * });
 */