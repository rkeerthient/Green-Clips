/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  GetHeadConfig,
  HeadConfig,
  TemplateConfig,
  TemplateRenderProps,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import HomePage from "../components/pages/HomePage";

export const config: TemplateConfig = {
  name: "index",
};

export const getPath: GetPath<TemplateRenderProps> = () => {
  return `index.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Great Clips | Home",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `transformProps`.
 */
const Static: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site } = document;
  return (
    <>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <div className="section space-y-14 px-10">
            <HomePage _site={_site}></HomePage>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Static;
