import React, {useEffect, useState} from "react";

const Status = (props) => {

    const [editMode, setEditMode] = useState(false),
        [status, setStatus] = useState(props.status);

    function activatedEditMode() {
        setEditMode(true)
    }

    function deactivatedEditMode() {
        setEditMode(false)
        props.updateUserStatus(status);
    }

    function changeStatus(e) {
        setStatus( e.currentTarget.value )
    }

    useEffect(() => {
        setStatus(props.status)
    }, [props.status])


    return (
        <div>
            {!editMode &&
            <div>
                <span onDoubleClick={activatedEditMode}>{props.status}</span>
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