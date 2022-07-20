import Typography from "@mui/material/Typography";
import NavBar from "./NavBar";

export const PageLayout = (props) => {
    return (
        <>
            <NavBar />
            <br/>
            <br/>
            {props.children}
        </>
    );
};
