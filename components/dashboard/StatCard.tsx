type statCardProps = {
    title:string;
    amount:number;
    change:string;
}
export default  function StatCard({ title,
    amount,
    change}:statCardProps
){
    return(
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2 text-2xl font-bold text-slate-900">{amount}</p>
            <span className={`mt-2 inline-block text-sm font-medium ${change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {change}
            </span>
        </div>
    )
}
