import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
// Material-UI imports
import Grid from "@mui/material/Grid";

// MSAL imports
import { MsalProvider } from "@azure/msal-react";
import { CustomNavigationClient } from "./utils/NavigationClient";

// Sample app imports
import { PageLayout } from "./ui-components/PageLayout";
import { Home } from "./pages/Home";
import { Test1 } from "./pages/Test1";
import { Test2 } from "./pages/Test2";
import { Test3 } from "./pages/Test3";
import { Logout } from "./pages/Logout";

function App({ pca }) {
  return (
    <ClientSideNavigation pca={pca}>
      <MsalProvider instance={pca}>
        <PageLayout>
          <Grid container justifyContent="center">
            <Pages />
          </Grid>
        </PageLayout>
      </MsalProvider>
    </ClientSideNavigation>
  );
}

/**
 *  This component is optional. This is how you configure MSAL to take advantage of the router's navigate functions when MSAL redirects between pages in your app
 */
function ClientSideNavigation({ pca, children }) {
  const navigate = useNavigate();
  const navigationClient = new CustomNavigationClient(navigate);
  pca.setNavigationClient(navigationClient);

  // react-router-dom v6 doesn't allow navigation on the first render - delay rendering of MsalProvider to get around this limitation
  const [firstRender, setFirstRender] = useState(true);
  useEffect(() => {
    setFirstRender(false);
  }, []);

  if (firstRender) {
    return null;
  }

  return children;
}

function Pages() {
  return (
    <Routes>
      <Route path="/test1" element={<Test1 />} />
      <Route path="/test2" element={<Test2 />} />
      <Route path="/test3" element={<Test3 />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App;
