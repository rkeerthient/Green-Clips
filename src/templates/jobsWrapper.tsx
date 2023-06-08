/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateConfig,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import JobsPage from "../components/pages/JobsPage";

export const config: TemplateConfig = {
  name: "jobs",
};
export const getPath: GetPath<TemplateRenderProps> = () => {
  return `jobs`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Great Clips | Jobs",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

const FAQsWrapper: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <JobsPage></JobsPage>
        </div>
      </PageLayout>
    </>
  );
};

export default FAQsWrapper;
