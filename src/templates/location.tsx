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
import Banner from "../components/banner";
import Contact from "../components/contact";
import Cta from "../components/cta";
import Hours from "../components/hours";
import List from "../components/list";
import PageLayout from "../components/page-layout";
import StaticMap from "../components/static-map";
import "../index.css";
import { FiClock, FiMapPin, FiPhone } from "react-icons/fi";
import { BsCheck2 } from "react-icons/bs";
import { Image } from "@yext/pages/components";
import HoursText from "../components/HoursText";
import IsOpen from "../components/IsOpen";
import Carousel from "../components/Carousel";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "geocodedCoordinate",
      "services",
      "c_jobToLocation.name",
      "c_jobToLocation.c_wageMin",
      "c_jobToLocation.c_wageMax",
      "c_jobToLocation.c_qualification",
      "c_jobToLocation.slug",
      "c_jobToLocation.landingPageUrl",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["location"],
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
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
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
  relativePrefixToRoot,
  path,
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
const Location: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    _site,
    name,
    address,
    openTime,
    hours,
    mainPhone,
    geocodedCoordinate,
    services,
    c_jobToLocation,
  } = document;
  const { photoGallery } = _site;
  console.log(JSON.stringify(c_jobToLocation));

  return (
    <>
      <PageLayout _site={_site}>
        <div className="flex flex-row  bg-[#eeeeee]">
          <div className="w-1/2 flex items-center justify-center  bg-white">
            <div className="text-left py-20 px-12 space-y-4 text-[#2d2e2d]">
              <h1 className="text-6xl font-extrabold">Great Clips</h1>
              <h2 className="text-6xl font-light  ">
                {address.extraDescription}
              </h2>
              <p className="text-2xl">
                <HoursText document={document} />
              </p>
            </div>
          </div>
          <div className="w-1/2 text-center py-20  ">
            <IsOpen document={document}></IsOpen>
          </div>
        </div>
        <div className="centered-container mt-16">
          <div className="section">
            <div className="grid grid-cols-3 gap-x-10  ">
              <div className="space-y-5 text-base ">
                <div className="text-xl font-semibold mb-4">
                  Hair Salon Info
                </div>
                <div className="mt-6 flex-flex-col gap-2">
                  {address.line1} <br />
                  {address.city}, {address.region} {address.postalCode}
                </div>
                <div className="italic ">In Safeway Center</div>
                <div>
                  <a href="" className="text-[#048554] font-bold underline">
                    Get Directions
                  </a>
                </div>
                <div className="flex justify-center md:justify-start leading-loose items-center text-base">
                  <FiPhone className="text-[#048554]" size={20} />
                  {mainPhone && (
                    <span className="ml-2">
                      {mainPhone
                        .replace("+1", "")
                        .replace(/\D+/g, "")
                        .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
                    </span>
                  )}
                </div>
              </div>
              <div>
                {hours && <Hours title={"Restaurant Hours"} hours={hours} />}
              </div>
              <div>
                <Image image={photoGallery[6]} className="h-4/5"></Image>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-10 gap-y-10 mt-12">
              <div className=" text-xl font-light">
                <div className="text-xl font-semibold mb-4">
                  Haircuts for Everyone
                </div>
                <div className="flex flex-col space-y-2  text-lg">
                  <div className="flex gap-2 items-center">
                    <BsCheck2 color="#048554" />
                    <div>Haircuts for Men and Women</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BsCheck2 color="#048554" />
                    <div>Haircuts for Kids</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BsCheck2 color="#048554" />
                    <div>Haircuts for Seniors</div>
                  </div>
                </div>
              </div>
              <div className=" text-xl font-light">
                <div className=" font-semibold mb-4">Haircuts for Everyone</div>
                <div className="flex flex-col space-y-2 text-lg">
                  <div className="flex gap-2 items-center">
                    <BsCheck2 color="#048554" />
                    <div>Short Style</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BsCheck2 color="#048554" />
                    <div>Long Style</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BsCheck2 color="#048554" />
                    <div>Formal Style</div>
                  </div>
                </div>
              </div>
              <div className=" text-xl font-light">
                <div className="text-xl font-semibold mb-4">Hair Services</div>
                <div className="flex flex-col space-y-2 text-lg">
                  <div className="flex gap-2 items-center">
                    <BsCheck2 color="#048554" />
                    <div>Neck Trim</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BsCheck2 color="#048554" />
                    <div>Beard Trim</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BsCheck2 color="#048554" />
                    <div>Bang Trim</div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <BsCheck2 color="#048554" />
                    <div>Hair Shampoo</div>
                  </div>
                </div>
              </div>
            </div>
            {c_jobToLocation && <Carousel data={c_jobToLocation} />}
          </div>
        </div>
      </PageLayout>
    </>
  );
};
export default Location;
