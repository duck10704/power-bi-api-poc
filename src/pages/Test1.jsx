import { useEffect, useState } from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionStatus, InteractionType, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

// Sample app imports
import { TestData1 } from "../ui-components/TestData1";
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import { getMsGraph } from "../utils/MsGraphApiCall";

// Material-ui imports
import Paper from "@mui/material/Paper";

const ProfileContent = () => {
    const endPoint = "https://api.powerbi.com/v1.0/myorg/datasets";
    const { instance, inProgress } = useMsal();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!data && inProgress === InteractionStatus.None) {
            getMsGraph(endPoint).then(response => setData(response)).catch((e) => {
                if (e instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenRedirect({
                        ...loginRequest,
                        account: instance.getActiveAccount()
                    });
                }
            });
        }
    }, [inProgress, instance, data]);
    console.log({data});
    return (
        <Paper>
            { data ? <TestData1 data={data} /> : null }
        </Paper>
    );
};

export function Test1() {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={authRequest}
            errorComponent={ErrorComponent}
            loadingComponent={Loading}
        >
            <ProfileContent />
        </MsalAuthenticationTemplate>
      )
};
