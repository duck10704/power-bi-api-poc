import { useEffect, useState } from "react";

// Msal imports
import { MsalAuthenticationTemplate, useMsal } from "@azure/msal-react";
import { InteractionType, InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
import { loginRequest } from "../authConfig";

// Sample app imports
import { TestData3 } from "../ui-components/TestData3";
import { Loading } from "../ui-components/Loading";
import { ErrorComponent } from "../ui-components/ErrorComponent";
import { postMsGraph } from "../utils/MsGraphApiCall";
import jsonData from "../data/pushRow.json";

// Material-ui imports
import Paper from "@mui/material/Paper";


const ProfileContent = () => {
    const endPoint = "https://api.powerbi.com/v1.0/myorg/datasets/1a3a0799-f97a-4f65-884e-5f4c7551f2a2/tables/Offline IUR Chart/rows";
    const { instance, inProgress } = useMsal();
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!data && inProgress === InteractionStatus.None) {
            postMsGraph(endPoint, jsonData).then(response => setData(response)).catch((e) => {
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
            { data ? <TestData3 data={data} /> : null }
        </Paper>
    );
}

export function Test3() {
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
