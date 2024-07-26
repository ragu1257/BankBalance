import BankCard from "@/components/BankCard";
import HeaderBox from "@/components/HeaderBox";
import { getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from "react";

const MyBanksPage = async () => {
    const loggedIn = await getLoggedInUser()
    let accounts;
    if (loggedIn) {
         accounts = await getAccounts({ userId: loggedIn.$id })
        if(!accounts) return;
    }
    return (
       <section className="flex">
        <div className="my-banks">
            <HeaderBox title="My Banks" subtext="View your connected banks" />
            <div className="space-y-4">
<h2 className="header-2">
        Your cards
</h2>
<div className="flex flex-wrap gap-6">
        {accounts && accounts.data.map((a: Account) => (
            <BankCard key={accounts.id} account={a} userName={loggedIn?.firstName}/>
        ))}

</div>
            </div>
        </div>
       </section>
    );
    }

export default MyBanksPage;