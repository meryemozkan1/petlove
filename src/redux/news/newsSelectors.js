export const selectNews = (state) => state.news.items;
export const selectNewsPage = (state) => state.news.page;
export const selectNewsPerPage = (state) => state.news.perPage;
export const selectNewsTotalPages = (state) => state.news.totalPages;
export const selectNewsTotalItems = (state) => state.news.totalItems;
export const selectNewsKeyword = (state) => state.news.keyword;
export const selectNewsLoading = (state) => state.news.isLoading;
export const selectNewsError = (state) => state.news.error;

