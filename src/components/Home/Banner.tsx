import mysql from "../../images/mysql.svg";

const Banner = () => {
    return (
        <div className="flex items-center justify-center w-full flex-col font-poppins text-center px-8">
            <div className="flex flex-row items-center gap-4">
                <h1 className="text-3xl lg:text-4xl font-bold text-zinc-800">mySql Parser</h1>
                <img src={mysql}></img>
            </div>

            <div>
                <p>A sql tool to perform queries within the web.</p>
            </div>
        </div>
    )
}
export default Banner;