import * as React from "react";
import Cta from "../components/cta";
import Ce_site from "../types/site";
import { SearchBar, onSearchFunc } from "@yext/search-ui-react";
import { useSearchActions, useSearchState } from "@yext/search-headless-react";

type Link = {
  label: string;
  url: string;
};

const links: Link[] = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Jobs",
    url: "/jobs",
  },
  {
    label: "FAQs",
    url: "/faqs",
  },
];

const Header = ({ _site }: any) => {
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url}>{link.label}</a>
    </div>
  ));

  const [path, setPath] = React.useState("");

  React.useEffect(() => {
    const currentPath = window.location.pathname;
    setPath(currentPath);
    return () => {};
  }, []);
  const state = useSearchState((state) => state.vertical.verticalKey);
  const searchActions = useSearchActions();
  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    searchActions.setQuery(query!);
    const path = window.location.pathname;
    const queryParams = new URLSearchParams(window.location.search);
    !state && path.includes("jobs")
      ? (window.location.href = `/index.html?query=${query!.toString()}`)
      : state
      ? (searchActions.setVertical(state), searchActions.executeVerticalQuery())
      : (searchActions.setUniversal(), searchActions.executeUniversalQuery());
  };

  return (
    <>
      <div className="centered-container">
        <div className="flex justify-between items-center gap-12">
          <nav className="py-6 flex items-center justify-start gap-4">
            <img
              src="//tbcdn.talentbrew.com/company/4594/v2_0/img/gc-logo-white.png"
              alt="Great Clips Logo"
            />
            <div className="border border-[#089f45] h-16 "></div>
            <div className="flex gap-x-10 text-lg font-semibold text-white">
              {linkDoms}
            </div>
          </nav>
          <SearchBar
            onSearch={handleSearch}
            customCssClasses={{ searchBarContainer: "-mb-2 flex-1" }}
            hideRecentSearches={true}
          ></SearchBar>
        </div>
      </div>
    </>
  );
};

export default Header;
