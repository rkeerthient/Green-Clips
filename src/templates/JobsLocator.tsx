// locator.tsx

import * as React from "react";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  Template,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { FilterSearch } from "@yext/search-ui-react";
import PageLayout from "../components/page-layout";
import JobLocator from "../components/JobLocator";

export const getPath: GetPath<TemplateProps> = () => {
  return `jobs`;
};

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = () => {
  return {
    title: "Turtlehead Tacos Locations",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const Locator: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <PageLayout _site={_site}>
      <div className="mx-auto max-w-7xl px-4">
        <JobLocator />
      </div>
    </PageLayout>
  );
};

export default Locator;
