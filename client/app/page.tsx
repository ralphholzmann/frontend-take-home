'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, Tab, TabTrigger, TabContent, TabList } from './components/Tabs';
import RolesList from './features/RolesList';
import UsersList from './features/UsersList';

const tabs: Tab[] = [
  {
    label: 'Users',
    value: 'users',
    Component: UsersList,
  },
  {
    label: 'Roles',
    value: 'roles',
    Component: RolesList,
  },
];

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') ?? 'users';

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', value);
    params.delete('page');
    params.delete('search');
    router.push(`/?${params.toString()}`);
  };

  return (
    <main className="mx-auto my-10 max-w-[850px]">
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={handleTabChange}>
        <TabList>
          {tabs.map((tab) => (
            <TabTrigger key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </TabList>
        {tabs.map(({ value, Component }) => (
          <TabContent key={value} value={value} className="reveal-enter">
            <Component />
          </TabContent>
        ))}
      </Tabs>
    </main>
  );
}
