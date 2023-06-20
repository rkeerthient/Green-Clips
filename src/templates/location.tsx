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
  } = document;

  return (
    <>
      <PageLayout _site={_site}>
        <div className="flex flex-row  bg-[#eeeeee]">
          <div className="w-1/2 text-center py-44 px-12 bg-white">
            <h1 className="text-4xl font-bold">Great Clips</h1>
            <h2 className="text-4xl font-light">Great Clips</h2>
            <p>Open Today: 9:00am to 7:00pm</p>
          </div>
          <div className="w-1/2 text-center py-44  ">
            <div className=" w-3/4 mx-auto bg-white py-14 px-8 flex flex-col gap-y-5 space-y-5">
              <div className="flex flex-col text-center justify-center gap-y-2 ">
                <div className="flex flex-row items-center justify-center">
                  <FiMapPin size={60} color="#048554" />
                  <div className="flex flex-col ">
                    <p className="text-4xl font-light uppercase">Online</p>
                    <p className="text-2xl font-bold">Check-in</p>
                  </div>
                </div>
                <div className="w-fit px-8 py-4 border text-xl bg-[#048554] mx-auto">
                  Check In Now
                </div>
              </div>
              <div className="flex flex-row justify-center px-24">
                <div className="flex flex-col text-left">
                  <div className="font-bold">Estimated wait:</div>
                  <div className="w-3/4 text-sm">
                    Check in online to add your name to the wait list before you
                    arrive!
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="text-3xl font-bold">17</div>
                  <div className="text-2xl font-bold">MIN</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="centered-container">
          <div className="section">
            <div className="grid grid-cols-3 gap-x-10 gap-y-10">
              <div>
                <div className="text-xl font-semibold mb-4">
                  Hair Salon Info
                </div>
                <div className="mt-6 flex-flex-col gap-2">
                  {address.line1} <br />
                  {address.city}, {address.region} {address.postalCode}
                </div>
                <div className="italic">In Safeway Center</div>
                <div>Get Directions</div>
                <div className="flex justify-center md:justify-start leading-loose items-center text-base md:text-xl">
                  <FiPhone />
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
                {hours && <Hours title={"Restaurant Hours"} hours={hours} />}
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
          </div>
        </div>
      </PageLayout>
    </>
  );
};
{
  /* <div className="bg-gray-100 p-5 space-y-12">
<Contact address={address} phone={mainPhone}></Contact>
{services && <List list={services}></List>}
</div>
<div className="col-span-2 pt-5 space-y-10">
<div>
  {hours && <Hours title={"Restaurant Hours"} hours={hours} />}
</div>
{geocodedCoordinate && (
  <StaticMap
    latitude={geocodedCoordinate.latitude}
    longitude={geocodedCoordinate.longitude}
  ></StaticMap>
)}
</div> */
}
export default Location;
