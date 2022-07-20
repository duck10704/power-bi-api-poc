import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

export function Home() {
  return (
      <>
          <AuthenticatedTemplate>
            <ButtonGroup orientation="vertical">
              <Button component={RouterLink} to="/test1" variant="contained" color="primary">Datasets - Get Datasets</Button>
              <Button component={RouterLink} to="/test2" variant="contained" color="primary">Push Dataset - Datasets PostDataset</Button>
              <Button component={RouterLink} to="/test3" variant="contained" color="primary">Push Dataset - Datasets PostRows</Button>
            </ButtonGroup>
          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>
            <Typography variant="h6">
              <center>Please sign-in to see your profile information.</center>
            </Typography>
          </UnauthenticatedTemplate>
      </>
  );
}
