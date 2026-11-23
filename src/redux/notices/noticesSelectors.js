export const selectNotices = (state) => state.notices.items;
export const selectSelectedNotice = (state) => state.notices.selectedNotice;
export const selectCategories = (state) => state.notices.categories;
export const selectSexList = (state) => state.notices.sexList;
export const selectSpeciesList = (state) => state.notices.speciesList;
export const selectCities = (state) => state.notices.cities;
export const selectNoticesPage = (state) => state.notices.page;
export const selectNoticesPerPage = (state) => state.notices.perPage;
export const selectNoticesTotalPages = (state) => state.notices.totalPages;
export const selectNoticesTotalItems = (state) => state.notices.totalItems;
export const selectNoticesFilters = (state) => state.notices.filters;
export const selectNoticesFavorites = (state) => state.notices.favorites;
export const selectNoticesLoading = (state) => state.notices.isLoading;
export const selectNoticesError = (state) => state.notices.error;


