"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Heart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button-custom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

// Blocked words configuration - moderators can edit this array
const blockedWordsConfig = {
  words: [
    'spam', 'scam', 'fake', 'stupid', 'dumb', 'hate', 'sucks', 'terrible', 'awful',
    'shit', 'fuck', 'damn', 'crap', 'bullshit', 'asshole', 'bitch', 'wtf', 'stfu'
  ]
};

interface Review {
  id: string;
  name: string;
  location?: string;
  rating: number;
  text: string;
  timestamp: string;
  donationAmount?: number;
}

interface ReviewFormData {
  name: string;
  location: string;
  rating: number;
  text: string;
  isAnonymous: boolean;
  attachDonation: boolean;
  donationAmount: string;
}

export default function ReviewSystem() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState<ReviewFormData>({
    name: '',
    location: '',
    rating: 0,
    text: '',
    isAnonymous: false,
    attachDonation: false,
    donationAmount: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);
  const { toast } = useToast();

  // Load reviews from localStorage on component mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('nngtw-reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save reviews to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem('nngtw-reviews', JSON.stringify(reviews));
  }, [reviews]);

  const containsBlockedWords = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return blockedWordsConfig.words.some(word => 
      lowerText.includes(word.toLowerCase())
    );
  };

  const validateForm = (): string | null => {
    if (formData.rating < 1 || formData.rating > 10) {
      return "Please select a rating between 1 and 10 stars.";
    }
    if (!formData.text.trim()) {
      return "Please write a review.";
    }
    if (formData.text.trim().length < 10) {
      return "Review must be at least 10 characters long.";
    }
    if (containsBlockedWords(formData.text) || 
        (!formData.isAnonymous && containsBlockedWords(formData.name))) {
      return "Your review contains inappropriate language. Please keep it friendly and professional.";
    }
    if (formData.attachDonation && formData.donationAmount && 
        (isNaN(Number(formData.donationAmount)) || Number(formData.donationAmount) <= 0)) {
      return "Please enter a valid donation amount.";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      toast({
        title: "Validation Error",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call for review submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newReview: Review = {
        id: Date.now().toString(),
        name: formData.isAnonymous ? 'Anonymous' : formData.name.trim() || 'Anonymous',
        location: formData.location.trim() || undefined,
        rating: formData.rating,
        text: formData.text.trim(),
        timestamp: new Date().toISOString(),
        donationAmount: formData.attachDonation && formData.donationAmount 
          ? Number(formData.donationAmount) 
          : undefined
      };

      setReviews(prev => [newReview, ...prev]);

      // Handle donation if attached
      if (formData.attachDonation && formData.donationAmount) {
        // TODO: Integrate with payment provider
        console.log('Donation payload:', {
          amount: Number(formData.donationAmount),
          reviewId: newReview.id,
          timestamp: newReview.timestamp
        });
      }

      toast({
        title: "Review submitted!",
        description: formData.attachDonation 
          ? "Thank you for your review and generous donation!" 
          : "Thank you for your review!",
      });

      // Reset form
      setFormData({
        name: '',
        location: '',
        rating: 0,
        text: '',
        isAnonymous: false,
        attachDonation: false,
        donationAmount: ''
      });

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDonateOnly = () => {
    // TODO: Integrate with payment provider
    // For now, open a placeholder donation page
    window.open('https://donate.nngtw.com', '_blank');
    
    toast({
      title: "Donation",
      description: "Redirecting to donation page...",
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="reviews-section space-y-12">
      {/* Review Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-xl bg-gradient-to-br from-card via-card/90 to-card/80 p-8 shadow-lg backdrop-blur-sm border border-primary/20"
      >
        <h3 className="mb-6 font-montserrat text-2xl font-bold text-primary text-center">
          Share Your Experience
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Star Rating */}
          <div className="text-center">
            <label className="block mb-3 text-sm font-medium text-foreground">
              Rate your experience (1-10 stars)
            </label>
            <div className="flex justify-center gap-1 mb-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-all duration-200 hover:scale-110"
                  aria-label={`Rate ${star} out of 10 stars`}
                >
                  <Star
                    className={`w-6 h-6 transition-colors ${
                      star <= (hoveredRating || formData.rating)
                        ? 'fill-primary text-primary'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              {formData.rating > 0 && `${formData.rating}/10 stars`}
            </p>
          </div>

          {/* Anonymous Option */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="anonymous"
              checked={formData.isAnonymous}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, isAnonymous: !!checked }))
              }
            />
            <label htmlFor="anonymous" className="text-sm font-medium">
              Post anonymously
            </label>
          </div>

          {/* Name and Location (optional, hidden if anonymous) */}
          {!formData.isAnonymous && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium">
                  Name (optional)
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                  className="border-muted bg-background focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="location" className="block mb-2 text-sm font-medium">
                  Location (optional)
                </label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="City, Country"
                  className="border-muted bg-background focus:border-primary"
                />
              </div>
            </div>
          )}

          {/* Review Text */}
          <div>
            <label htmlFor="review-text" className="block mb-2 text-sm font-medium">
              Your Review *
            </label>
            <Textarea
              id="review-text"
              value={formData.text}
              onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
              placeholder="Share your thoughts about Nngtw Studio..."
              rows={4}
              className="border-muted bg-background focus:border-primary"
              required
            />
          </div>

          {/* Donation Section */}
          <div className="border-t border-muted pt-6">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-5 h-5 text-secondary" />
              <h4 className="font-medium text-foreground">Support the Studio</h4>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="attach-donation"
                  checked={formData.attachDonation}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, attachDonation: !!checked }))
                  }
                />
                <label htmlFor="attach-donation" className="text-sm">
                  Attach a tip to this review
                </label>
              </div>

              {formData.attachDonation && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2"
                >
                  <span className="text-sm">$</span>
                  <Input
                    type="number"
                    min="1"
                    step="0.01"
                    value={formData.donationAmount}
                    onChange={(e) => setFormData(prev => ({ ...prev, donationAmount: e.target.value }))}
                    placeholder="5.00"
                    className="w-24 border-muted bg-background focus:border-primary"
                  />
                  <span className="text-sm text-muted-foreground">USD</span>
                </motion.div>
              )}

              <div className="flex gap-3">
                <Button   variant="outline" size="lg" className="btn-primary"

                  type="submit"
                  disabled={isSubmitting || formData.rating === 0}
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </Button>
                
                <Button variant="outline" size="lg" className="btn-primary"
                type="button"
                  onClick={handleDonateOnly}>
                  <Heart className="w-4 h-4 mr-2" />
                  Tip Studio
                </Button>
              </div>
            </div>
          </div>
        </form>
      </motion.div>

      {/* Reviews Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="mb-8 font-montserrat text-2xl font-bold text-primary text-center">
          Community Reviews
        </h3>

        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-card/50 rounded-xl border border-muted/50">
            <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Be the first to share your experience with Nngtw Studio!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card/50 backdrop-blur-sm p-6 rounded-xl border border-muted/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-foreground">
                        {review.name}
                      </h4>
                      {review.location && (
                        <span className="text-sm text-muted-foreground">
                          from {review.location}
                        </span>
                      )}
                      {review.donationAmount && (
                        <span className="inline-flex items-center gap-1 bg-secondary/20 text-secondary px-2 py-1 rounded-full text-xs">
                          <Heart className="w-3 h-3" />
                          Supporter
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'fill-primary text-primary'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {review.rating}/10
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(review.timestamp)}
                  </span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {review.text}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function formatDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}