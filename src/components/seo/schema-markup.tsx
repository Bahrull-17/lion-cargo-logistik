import { createOrganizationSchema } from "@/lib/schema/organization";
import { createLocalBusinessSchema } from "@/lib/schema/local-business";
import { createServiceSchema } from "@/lib/schema/service";
import { createWebsiteSchema } from "@/lib/schema/website";

export default function SchemaMarkup() {
  const schemas = [createOrganizationSchema(), createLocalBusinessSchema(), createServiceSchema(), createWebsiteSchema()];

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
