"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, Tab, TabTrigger, TabContent, TabList } from "./components/Tabs";
import Roles from "./features/roles";
import UsersList from "./features/UsersList";

const tabs: Tab[] = [
{
  label: "Users",
  value: "users",
  Component: UsersList,
},
{
  label: "Roles",
  value: "roles",
  Component: Roles,
}
]

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") ?? "users";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", value);
    router.push(`/?${params.toString()}`);
  }

  return (
    <main className="max-w-[850px] mx-auto mt-10">
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange}>
        <TabList>
          {tabs.map((tab) => (
            <TabTrigger key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </TabList>
        {tabs.map(({value, Component}) => (
          <TabContent key={value} value={value}>
            <Component />
          </TabContent>
        ))}
      </Tabs>
    </main>
  );
}
