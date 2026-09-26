export interface DashboardStats {
  servicesCount: number;
  portfolioCount: number;
  blogPostsCount: number;
  pendingTestimonialsCount: number;
  unreadMessagesCount: number;
  quotesByStatus: Record<string, number>;
  totalQuotes: number;
}
