
import Sidebar from "@/components/layout/Sidebar"
import Header from "@/components/layout/Header";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import Chart from "@/components/dashboard/Chart";
import AIAssistant from "@/components/dashboard/AIAssistant";
import SummaryCards from "@/components/dashboard/SummaryCard";
import ExpenseCategoryChart from "@/components/dashboard/ExpenseCategoryChart";


export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Header />
       <div className='p-4'>
        <SummaryCards />
       </div>
       <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
  <Chart />
  <ExpenseCategoryChart />
</div>
<div className="mt-6">
  <RecentTransactions />
</div>
<AIAssistant/>
      </main>
    </div>
  );
}
