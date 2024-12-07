import { Fragment, useEffect, useState } from "react"
import Loading from "./loading"
import { initializeDataService } from "../services/tableServices"
import configData from "../config.json"
import { Alert } from "@mui/material"
import AlertBanner from "./AlertBanner"

export default function DataInitialize() {
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)   
    const [alertMessage, setAlertMessage] = useState('')
    useEffect(() => {
       const DataInitialize = async () => {
              setLoading(true)
              const response = await initializeDataService(setAlert, setAlertMessage)
              if(response.status === 'success') 
                window.location.assign(configData.HOME_URL)
              setLoading(false)
       }
         DataInitialize()
    }  , [])

    return (
        <Fragment>
            {loading ? <Loading />: 
            <AlertBanner showAlert={alert} alertMessage={alertMessage} />
            }
        </Fragment>)
}