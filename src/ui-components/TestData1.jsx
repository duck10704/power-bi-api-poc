import React from "react";

export const TestData1 = ({data}) => {
    return (
        <div>
            {data.value.map(v =>
                <ul>
                    <li>
                        <div>
                            <div>Name: {v.name}</div>
                            <div>Web URL: <a href={v.webUrl} target="_blank">{v.webUrl}</a></div>
                        </div>
                    </li>
                </ul>
            )}
        </div>
    );
};
