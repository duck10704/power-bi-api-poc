import React from "react";

export const TestData2 = ({data}) => {
    return (
        <div>
            ID: {data.id}
            Name: {data.name}
            DefaultRetentionPolicy: {data.defaultRetentionPolicy}
        </div>
    );
};
