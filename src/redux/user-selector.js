import {createSelector} from "reselect";

export const getUsersSelector = (state) => state.usersPage.users;
export const getUsers = createSelector(getUsersSelector, (users) => users.filter(s => true))
export const getPageSize = (state) => state.usersPage.pageSize;
export const getTotalUsersCount = (state) => state.usersPage.totalUsersCount;
export const getCurrentPage = (state) => state.usersPage.currentPage;
export const getIsFetching = (state) => state.usersPage.isFetching;
export const getIsFollowingProgress = (state) => state.usersPage.isFollowingProgress;