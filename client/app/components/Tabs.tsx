"use client";
import { createContext, useContext, useState } from "react";
import cx from "classnames";

type TabContextType = {
  activeTab: string | null;
  setActiveTab: (value: string) => void;
}

const TabContext = createContext<TabContextType>({
  activeTab: null,
  setActiveTab: () => {},
}); 

export type Tab = {
  label: string;
  value: string;
  Component: React.ComponentType;
}

interface TabsProps {
  tabs: Tab[];
  children: React.ReactNode;
  className?: string;
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

export const Tabs = ({ tabs, children, activeTab: initialActiveTab, onTabChange }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<string>(initialActiveTab ?? tabs[0].value);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    onTabChange?.(value);
  }

  return (
    <TabContext.Provider value={{ activeTab, setActiveTab: handleTabChange }}>
      {children}
    </TabContext.Provider>
  );
};

interface TabTriggerProps {
  label: string;
  value: string;
  className?: string;
}

export const TabTrigger = ({ label, value, className }: TabTriggerProps) => {
  const { activeTab, setActiveTab } = useContext(TabContext);
  const isActive = activeTab === value;

  return (
    <button onClick={() => setActiveTab(value)} className={cx("relative text-sm px-4 py-2.5 cursor-pointer before:transition-all before:duration-150",
      "before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5", {
      "text-muted before:bg-transparent": !isActive,
      "text-foreground font-medium before:bg-purple-9": isActive,
    }, className)}>
      {label}
    </button>
  );
};

interface TabContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabContent = ({ value, children, className }: TabContentProps) => {
  const { activeTab } = useContext(TabContext);
  if (activeTab !== value) return null;

  return (
    <div className={cx("", className)}>
      {children}
    </div>
  );
};

interface TabListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabList = ({ children, className }: TabListProps) => {
  return (
    <div className={cx("flex relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-px before:bg-neutral-alpha-6 mb-6", className)}>
      {children}
    </div>
  );
};