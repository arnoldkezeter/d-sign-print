import { ServiceModel } from "@/models/Service.model.js";
import { PortfolioModel } from "@/models/Portfolio.model.js";
import { TestimonialModel } from "@/models/Testimonial.model.js";
import { BlogPostModel } from "@/models/BlogPost.model.js";
import { QuoteRepository } from "@/repositories/quote.repository.js";
import { ContactRepository } from "@/repositories/contact.repository.js";

const quoteRepository = new QuoteRepository();
const contactRepository = new ContactRepository();

export interface DashboardStats {
  servicesCount: number;
  portfolioCount: number;
  blogPostsCount: number;
  pendingTestimonialsCount: number;
  unreadMessagesCount: number;
  quotesByStatus: Record<string, number>;
  totalQuotes: number;
}

export class DashboardService {
  async getStats(): Promise<DashboardStats> {
    const [
      servicesCount,
      portfolioCount,
      blogPostsCount,
      pendingTestimonialsCount,
      unreadMessagesCount,
      quotesByStatus,
      totalQuotes,
    ] = await Promise.all([
      ServiceModel.countDocuments().exec(),
      PortfolioModel.countDocuments().exec(),
      BlogPostModel.countDocuments().exec(),
      TestimonialModel.countDocuments({ isPublished: false }).exec(),
      contactRepository.countUnread(),
      quoteRepository.countByStatus(),
      quoteRepository.countAll(),
    ]);

    return {
      servicesCount,
      portfolioCount,
      blogPostsCount,
      pendingTestimonialsCount,
      unreadMessagesCount,
      quotesByStatus,
      totalQuotes,
    };
  }
}
