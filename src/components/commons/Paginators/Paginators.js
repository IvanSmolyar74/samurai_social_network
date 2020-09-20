import styles from "./Paginator.module.css";
import React, {useState} from "react";

const Paginator = ({onPageClick, currentPage, pageSize, totalItemsCount, portionSize = 10}) => {
    const handlePageClick = (page) => {
        onPageClick(page);
    };

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const countPortion = Math.ceil(pagesCount / portionSize);
    const [portionNumber, setPortionNumber] = useState(1);
    const leftPortionPage = (portionNumber - 1) * portionSize + 1;
    const rightPortionPage = portionNumber * portionSize;

    return (
        <div>
            <ul className={styles.list}>
                {portionNumber > 1 && <button onClick={() => setPortionNumber(portionNumber -1)}>Prev</button>}
                {pages
                    .filter(page => leftPortionPage <= page && page <= rightPortionPage)
                    .map(page => <li className={currentPage === page ? styles.currentPage : ''}
                                     onClick={() => handlePageClick(page)} key={page}>{page}</li>)}
                {countPortion > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber +1)}>Next</button>}
            </ul>
        </div>
    )
}

export default Paginator;