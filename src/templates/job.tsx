/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import * as React from "react";
import PageLayout from "../components/page-layout";
import "../index.css";
import RTF from "../components/RTF";
import JobSchema from "../components/JobSchema";
import { useEffect } from "react";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-2",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "c_richDescription",
      "slug",
      "c_jobAddress",
      "landingPageUrl",
      "c_locationName",
      "c_qualification",
      "c_wageMin",
      "c_wageMax",
      "c_jobToLocation.slug",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["job"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug ? document.slug : `${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Job: Template<TemplateRenderProps> = ({ document }) => {
  const {
    _site,
    name,
    c_locationName,
    c_richDescription,
    c_jobAddress,
    landingPageUrl,
    c_qualification,
    c_wageMin,
    c_wageMax,
    c_jobToLocation,
  } = document;
  console.log(c_jobToLocation);

  return (
    <>
      <JobSchema document={document}></JobSchema>
      <PageLayout _site={_site}>
        <div className="centered-container">
          <div className="section flex flex-col gap-y-6">
            <div className="flex flex-col   text-[#089f45] text-3xl ">
              <div className="font-bold">{name}</div>
              <div className="font-light">
                {c_jobAddress.city}, {c_jobAddress.region}
              </div>
            </div>
            <div className="flex flex-row justify-start gap-x-4">
              <a
                href={landingPageUrl}
                className="px-8 py-4 w-fit group  relative   bg-green-800 text-white font-bold hover:bg-orange-500 text-xl"
              >
                Apply
              </a>
              <a
                href={landingPageUrl}
                className="px-8 py-4 w-fit group  relative text-lg  bg-[#99cb39] text-[#083b3a] font-bold "
              >
                Save Job
                <div className="h-1 bg-teal-900 absolute bottom-0 left-0 transition-width duration-75 group-hover:w-full"></div>
              </a>
              <a
                href={`/${c_jobToLocation[0].slug}`}
                className="px-8 py-4 w-fit group  relative   bg-green-800 text-white font-bold hover:bg-orange-500 text-xl"
              >
                Explore this Location
              </a>
            </div>
            <div className="flex flex-col">
              <div className="text-2xl font-bold text-[#089f45]">
                Job Location
              </div>
              <div>{c_locationName}</div>
              <div>{c_jobAddress.line1}</div>
              <div>
                {c_jobAddress.city}, {c_jobAddress.region}
              </div>
            </div>
            <div className="flex flex-row gap-2 items-baseline">
              <div className="text-lg font-bold text-[#089f45]">Pay range:</div>
              {/* <div className="text-base">$22-$25</div> */}
              <div className="text-base">
                {c_wageMin.value && c_wageMax.value && parseInt(c_wageMax) >= 1
                  ? `$${c_wageMin.value} - $${c_wageMax.value}`
                  : `${
                      c_wageMin.value >= 1
                        ? `$${c_wageMin.value}+`
                        : `Competetive`
                    }`}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-[#089f45]">
                Opportunity
              </div>
              <RTF>{c_richDescription}</RTF>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Job;
