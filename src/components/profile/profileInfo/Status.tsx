import React, {ChangeEvent, useEffect, useState} from "react";

type PropsType = {
    newStatus: string
    updateUserStatus: (newStatus: string) => void
}

const Status: React.FC<PropsType> = ({newStatus, updateUserStatus}) => {

    const [editMode, setEditMode] = useState(false),
        [status, setStatus] = useState(newStatus);

    function activatedEditMode() {
        setEditMode(true)
    }

    function deactivatedEditMode() {
        setEditMode(false)
        updateUserStatus(status);
    }

    function changeStatus(e: ChangeEvent<HTMLInputElement>) {
        setStatus( e.currentTarget.value )
    }

    useEffect(() => {
        setStatus(newStatus)
    }, [newStatus])


    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activatedEditMode}>{newStatus}</span>
            </div>
            }
            {editMode &&
            <div>
                <input onChange={changeStatus} autoFocus={true} onBlur={deactivatedEditMode} type="text"
                       placeholder={status}/>
            </div>
            }
        </div>
    )
}

export default Status;