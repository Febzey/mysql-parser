const Form = (props: any) => {
    const { setHost, setUsername, setPassword, setDatabase, setPort, connect, connectError } = props.FormProps;

    const handleSubmit = (event:any) => {
        event.preventDefault();
        const host     = event.target[0].value;
        const username = event.target[1].value;
        const password = event.target[2].value;
        const database = event.target[3].value;
        const port     = event.target[4].value;
        
        setHost(host);
        setUsername(username);
        setPassword(password);
        setDatabase(database);
        setPort(port);

        const databaseArgs = {
            host, username, password, database, port
        }

        connect(databaseArgs);

    }

    return (
        <div className="lg:w-96 w-[80%] mx-auto justify-center items-start flex flex-col gap-2 rounded-lg shadow-xl bg-neutral-50 p-8 font-poppins">
            <form className="flex flex-col gap-1 mx-auto text-neutral-600" onSubmit={handleSubmit}>
                <h3>Host</h3>
                <input className="p-2 w-64 border-[1.4px] border-neutral-400 shadow rounded" type="text" placeholder="Host name" required/>
                <h3>Username</h3>
                <input className="p-2 w-64 border-[1.4px] border-neutral-400 shadow rounded" type="text" placeholder="username" required/>
                <h3>Password</h3>
                <input className="p-2 w-64 border-[1.4px] border-neutral-400 shadow rounded" type="text" placeholder="password" required/>
                <h3>Database</h3>
                <input className="p-2 w-64 border-[1.4px] border-neutral-400 shadow rounded" type="text" placeholder="database" required/>
                <h3>Port</h3>
                <input className="p-2 w-64 border-[1.4px] border-neutral-400 shadow rounded" type="text" placeholder="port" required/>
                <div className="flex items-center justify-center gap-3 mt-3">
                    <button type="submit" className="bg-emerald-500 mr-auto text-white font-semibold rounded px-4 py-2 text-center w-32 duration-300 hover:motion-safe:scale-110">Connect</button>
                   { connectError && <p className="text-sm text-red-500">Error connecting.</p>}
                </div>

            </form>
        </div>
    )
}

export default Form;