import React from 'react'

const Sorting = ({onClick}) => {
    return (
        <button class="classExtraBtn" onClick={() => onClick()}>Sort{Sorting ? ' (Descend)' : ' (Ascend)'}</button>
    );
};

export default Sorting;