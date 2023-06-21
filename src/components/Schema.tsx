import * as React from "react";
import { JsonLd } from "react-schemaorg";
import { Store, Place, ItemList } from "schema-dts";
const Schema = (props: any) => {
  const { document } = props;
  const name = `${document.address.extraDescription}`;
  const address = document.address;
  const telephone = document.mainPhone;
  const description = document.decription;

  const itemListElement: any = [];
  if (document.c_jobToLocation) {
    document.c_jobToLocation.forEach((item: any, index: any) => {
      const {
        name,
        c_jobAddress,
        datePosted,
        c_richDescription,
        c_qualification,
        landingPageUrl,
      } = item;
      itemListElement.push({
        "@type": "ListItem",
        position: parseInt(index) + 1,
        item: {
          "@type": "JobPosting",
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "",
            value: {
              "@type": "QuantitativeValue",
              unitText: "",
            },
          },
          datePosted,
          description: c_richDescription,
          employmentType: "cba01f96-f6ad-dd11-a667-000c290d3d0d",
          identifier: "98046b53-256f-4097-aad0-dcbb6d8af5a1",
          industry: "Service",
          qualifications: c_qualification,
          title: name,
          url: landingPageUrl,
          workHours: "0505",
          hiringOrganization: {
            "@type": "Organization",
            name: "Great Clips",
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: c_jobAddress?.city,
              addressRegion: c_jobAddress?.region,
              addressCountry: "",
              streetAddress: c_jobAddress?.line1,
              postalCode: c_jobAddress?.postalCode,
            },
          },
        },
      });
    });
  }

  return (
    <>
      <JsonLd<Store>
        item={{
          "@context": "https://schema.org",
          "@type": "Store",
          name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          description,
          telephone: telephone,
          openingHours: buildHoursSchema(document.hours),
        }}
      />
      <JsonLd<ItemList>
        item={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: itemListElement,
        }}
      />

      {document.geocodedCoordinate && (
        <JsonLd<Place>
          item={{
            "@context": "https://schema.org",
            "@type": "Place",
            geo: {
              "@type": "GeoCoordinates",
              latitude: document.geocodedCoordinate.latitude,
              longitude: document.geocodedCoordinate.longitude,
            },
          }}
        />
      )}
    </>
  );
};

const buildHoursSchema = (hoursData: any) => {
  const nHrs: any = [];
  Object.keys(hoursData).forEach((item) =>
    nHrs.push(
      hoursData[item].openIntervals &&
        `${item.substring(0, 2).replace(/./, (c) => c.toUpperCase())} ${
          hoursData[item].openIntervals[0].start
        }-${hoursData[item].openIntervals[0].end}`
    )
  );
  return nHrs;
};

export default Schema;
