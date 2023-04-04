import React, { ReactNode, useMemo } from "react";
import { classNames } from "../../utils";

export interface TabProps {
  value: string;
  label: ReactNode;
  content: JSX.Element;
}

export interface TabsProps {
  tabs: TabProps[];
  current: string;
  onChange: (tab: string) => void;
  className?: string;
}
const Tabs = ({ tabs = [], current, onChange, className }: TabsProps) => {
  const currentTab = useMemo(() => {
    return tabs.find((tab) => tab.value === current);
  }, [tabs, current]);

  const onChangeTab = (value: string) => {
    onChange(value);
  };
  return (
    <div className={className || ""}>
      <div className="sm:hidden ">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-300 focus:border-black"
          defaultValue={currentTab?.value}
        >
          {tabs.map((tab) => (
            <option key={tab.value} className="cursor-pointer">
              {tab.value}
            </option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block mb-4 w-full">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex justify-between" aria-label="Tabs">
            {tabs.map((tab) => (
              <a
                key={tab.value}
                onClick={(e) => {
                  e.preventDefault();
                  onChangeTab(tab.value);
                }}
                className={classNames(
                  currentTab?.value === tab.value
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                  "hover:no-underline max-w-[200px] py-4 px-2 flex justify-center border-b-2 font-medium text-sm"
                )}
                aria-current={
                  currentTab?.value === tab.value ? "page" : undefined
                }
              >
                <span className="truncate cursor-pointer">{tab.label}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
      {currentTab && currentTab.content}
    </div>
  );
};

export default Tabs;
