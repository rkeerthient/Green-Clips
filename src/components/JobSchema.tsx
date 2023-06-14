import * as React from "react";
import { JsonLd } from "react-schemaorg";
import { JobPosting } from "schema-dts";

const JobSchema = (props: any) => {
  const { document } = props;
  const title = document.name;
  const address = document.c_jobAddress;
  const datePosted = document.datePosted;
  const description = document.c_richDescription;
  const qualifications = document.c_qualification;
  const url = document.landingPageUrl;
  return (
    <>
      <JsonLd<JobPosting>
        item={{
          "@context": "https://schema.org",
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
          description,
          employmentType: "cba01f96-f6ad-dd11-a667-000c290d3d0d",
          identifier: "98046b53-256f-4097-aad0-dcbb6d8af5a1",
          industry: "Service",
          qualifications,
          title,
          url,
          workHours: "0505",
          hiringOrganization: {
            "@type": "Organization",
            name: "Great Clips",
          },
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: address?.city,
              addressRegion: address?.region,
              addressCountry: "",
              streetAddress: address?.line1,
              postalCode: address?.postalCode,
            },
          },
        }}
      />
    </>
  );
};

export default JobSchema;
