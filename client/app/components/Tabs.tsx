"use client";
import { createContext, useContext, useRef, useState, Children, useLayoutEffect} from "react";
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
    <button onClick={() => setActiveTab(value)} className={cx("relative text-sm px-4 py-2.5 cursor-pointer",
      {
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
  children: React.ReactElement<TabTriggerProps>[];
  className?: string;
}

export const TabList = ({ children, className }: TabListProps) => {
  const { activeTab } = useContext(TabContext);
  const tabTriggerRefs = useRef<{ [key: string]: HTMLDivElement }>({});
  const [lineLeft, setLineLeft] = useState(0);
  const [lineWidth, setLineWidth] = useState(0);
  const handleRef = (value: string) => (el: HTMLDivElement | null) => {
    if (el) {
      tabTriggerRefs.current[value] = el;
    }
  };


  useLayoutEffect(() => {
    if (activeTab && tabTriggerRefs.current?.[activeTab]) {
      const node = tabTriggerRefs.current?.[activeTab];
      if (!node) return;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLineLeft(node.offsetLeft);
      setLineWidth(node.offsetWidth);
    }
  }, [activeTab]);

  return (
    <div className={cx("flex relative before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-px before:bg-neutral-alpha-6 mb-6", className)}>
      {Children.map(children, (child: React.ReactElement<TabTriggerProps>) => {
        return (
          <div ref={(el) => handleRef(child.props.value)(el)} key={child.props.value}>{child}</div>
        )
      })}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-px bg-purple-9 origin-bottom-left transition-transform duration-150"
        style={{
          transform: `translateX(${lineLeft}px) scaleX(${lineWidth})`,
        }}
      />
    </div>
  );
};