import * as React from "react";
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  Direction,
  SortBy,
  SortType,
  useSearchActions,
} from "@yext/search-headless-react";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const SortDropdown = ({ sortConfig }: any) => {
  const [selected, setSelected] = useState(sortConfig["relevance"]);

  const searchActions = useSearchActions();

  const handleSortChange = (key: string) => {
    const sort = sortConfig[key];
    setSelected(sort);
    searchActions.setSortBys([sort.sortBy]);
    searchActions.executeVerticalQuery();
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-60 ">
      <div>
        <Menu.Button className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none dark:bg-dark_icon_colors dark:text-white">
          {selected.label}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className=" w-60 absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-dark_icon_colors dark:text-white">
          <div className="py-1">
            {Object.entries(sortConfig)
              .filter(([key, value]) => value.label !== selected.label)
              .map(([key, value]) => (
                <Menu.Item key={key}>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:text-white hover:dark:text-black"
                      )}
                      onClick={() => handleSortChange(key)}
                    >
                      {value.label}
                    </button>
                  )}
                </Menu.Item>
              ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export { SortDropdown };
