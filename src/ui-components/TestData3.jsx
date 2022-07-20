import React from "react";

export const TestData3 = ({data}) => {
    return (
        <div>
            ID: {data.id}
            Name: {data.name}
            DefaultRetentionPolicy: {data.defaultRetentionPolicy}
        </div>
    );
};
