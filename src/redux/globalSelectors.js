export const selectIsGlobalLoading = (state) =>
  Boolean(
    state.auth?.isLoading ||
    state.news?.isLoading ||
    state.notices?.isLoading ||
    state.friends?.isLoading
  );

