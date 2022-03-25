import { useEffect, useState } from "react";

const Panel = (props: any) => {
    let { destroySession, executeQuery, queryData, setQueryData, sessionTime } = props.PanelProps;

    const mtoseconds = (millis: number) => {
        let minutes = Math.floor(millis / 60000);
        let seconds = ((millis % 60000) / 1000).toFixed(0);
        return `${minutes}:${(parseInt(seconds) < 10 ? "0" : "")}${seconds}`;
    }

    let [timer, setTimer] = useState<number|undefined>();

    useEffect(() => {
        let localTimer = sessionTime.current.time;
        setTimer(sessionTime.current.time);
        let intrvl = setInterval(() => {
            setTimer((timer) => timer as number - 1000);
            localTimer = localTimer - 1000;
            if (localTimer <= 0) {
                clearInterval(intrvl);
                destroySession();
            }
        }, 1000)
        return () => {
            clearInterval(intrvl);
        }
    }, [])

    return (
        <div className="flex flex-col font-poppins w-[90%] lg:w-[60%] bg-neutral-50 gap-8 py-8 px-8 min-h-[90vh] mx-auto rounded shadow-2xl">
            <div className="flex flex-row justify-between items-center text-xl">
                <h1>Sql Query Panel</h1>
                <button onClick={() => destroySession()} className="text-white font-bold py-2 px-4 bg-red-500 rounded shadow-xl duration-200 hover:bg-red-700">Destroy</button>
            </div>
            <p>Session time: <span className="font-bold">{mtoseconds(timer as any)}</span> minutes left</p>

            <form className="flex flex-col lg:flex-row gap-2 mt-12" onSubmit={executeQuery}>
                <input className="border-2 font-mono border-zinc-500 rounded py-2 px-4 w-full" type="text" placeholder="Query" required />
                <button type="submit" className="py-2 px-4 bg-sky-500 duration-200 hover:bg-sky-700 rounded font-semibold text-white ">Execute</button>
            </form>

            <div className="flex flex-col items-center">
                <button onClick={() => setQueryData([])} className="m-2 bg-zinc-600 text-white font-semibold py-2 px-6 rounded mr-auto hover:bg-zinc-900 duration-300">Clear</button>
                <div className="w-full h-[55vh] mx-auto my-auto rounded-md shadow-lg bg-zinc-800 text-zinc-200 font-mono p-7 overflow-auto">
                    <div>
                        <pre>{queryData && JSON.stringify(queryData, undefined, 2)}</pre>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Panel;