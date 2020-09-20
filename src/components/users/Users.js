import React from "react";
import Paginator from "../commons/Paginators/Paginators";
import User from "./User";

const Users = ({onPageClick, totalUsersCount, pageSize, currentPage, users, unfollow, follow, isFollowingProgress, isFetching}) => {


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