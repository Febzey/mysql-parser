import Banner from "../components/Home/Banner";
import type { dbArgs } from '../../index';
import { useState, useEffect, useRef } from 'react';
import { v4 as uuid } from 'uuid';
import { apiurl } from '../main';
import Form from "../components/Form/Form";
import Footer from "../components/Footer/Footer";
import Panel from "../components/Panel/Panel";
import axios from "axios";

const Index = () => {
    const [host, setHost]                 = useState("");
    const [username, setUsername]         = useState("");
    const [password, setPassword]         = useState("");
    const [database, setDatabase]         = useState("");
    const [port, setPort]                 = useState(3306);
    const [queryData, setQueryData]       = useState([]);
    const [connectError, setConnectError] = useState(false);
    const [isConnected, setConnected]     = useState(false);

    const ID = useRef({
        uniqueID: ""
    });

    const sessionTime = useRef({
        time: 5 * 60000
    })

    const destroySession = async () => {
        setConnected(false);
        await axios.post(`${apiurl}/destroy`, {
            ID: ID.current.uniqueID
        });
    }

    const executeQuery = async (event: any) => {
        event.preventDefault()
        const response = await axios.post(`${apiurl}/query`, {
            query: event.target[0].value,
            ID: ID.current.uniqueID
        });
        setQueryData(response.data.result);
    }

    const connect = async (databaseArgs: dbArgs) => {
        const { host, username, password, database, port } = databaseArgs;
        try {
            const uniqueID = uuid();
            ID.current.uniqueID = uniqueID
            const post = await axios.post(`${apiurl}/connect`, {
                host:     host,
                username: username,
                password: password,
                database: database,
                port:     port,
                ID:       uniqueID
            })

            if (post.data.connected) {
                setConnected(true);
            } else {
                setConnectError(true);
            }
        } catch (Err) {
            setConnectError(true);
        }
    }
    
    const FormProps = {
        setHost,
        setUsername,
        setPassword,
        setDatabase,
        setPort, 
        connect, 
        connectError
    }
    const PanelProps = {
        destroySession, 
        executeQuery, 
        queryData, 
        setQueryData, 
        sessionTime,
    }

    return (
        <div className="bg-slate-200">
            <div className="min-h-[100vh] w-full flex flex-col gap-16">
                <div className="w-full mx-auto flex items-center justify-center h-[20vh] mt-11">
                    <Banner />
                </div>
                {!isConnected && <Form FormProps={FormProps} />}
                {isConnected && <Panel PanelProps={PanelProps}/>}
            </div>
            <Footer/>
        </div>

    );
}

export default Index;