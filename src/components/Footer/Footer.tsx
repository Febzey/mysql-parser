const Footer = () => {
    return (
        <div className="min-h-[20vh] w-full flex items-center justify-center mx-auto font-poppins flex-col px-14 py-6 text-center text-neutral-500">
            <p>No data is saved during this process. Your session will be lost and reset when you refresh or close the page</p>
            <p>Total session time is <span className="font-bold">5</span> minutes, then your database connection be destroyed.</p>
            <p>You can fact check this by viewing the source code <a href="https://github.com/febzey/sql-parser" className="text-sky-500 hover:text-sky-800">here.</a></p>
            <p className="text-sm">Made by: <a href="https://brayden.tech" className="text-sky-500 hover:text-sky-800 pt-8">brayden.tech</a></p>

      </div>
    )
}
export default Footer;
