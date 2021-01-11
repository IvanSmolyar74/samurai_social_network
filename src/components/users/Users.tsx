import React from "react";
import { UsersType } from "../../types/types";
import Paginator from "../commons/Paginators/Paginators";
import User from "./User";

type PropsType = {
    onPageClick: (pageNumber: number) => void
    totalUsersCount: number 
    pageSize: number 
    currentPage: number 
    users: Array<UsersType> 
    unfollow: (id: number) => void 
    follow: (id: number) => void
    isFollowingProgress: Array<number | boolean> 
    isFetching: boolean
}

const Users: React.FC<PropsType> = ({onPageClick, totalUsersCount, pageSize, currentPage, users, unfollow, follow, isFollowingProgress, isFetching}) => {


    return (
        <div>
            <Paginator
                onPageClick={onPageClick}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize}
                currentPage={currentPage}
            />
            {  users.map(user => <User
                    key={user.id}
                    follow={follow}
                    unfollow={unfollow}
                    user={user}
                    isFollowingProgress={isFollowingProgress}
                />)
            }
        </div>
    )
}

export default Users;