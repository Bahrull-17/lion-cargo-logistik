import { JsonLd } from "@/lib/seo/json-ld";
import { createOrganizationSchema } from "@/lib/schema/organization";
import { createWebsiteSchema } from "@/lib/schema/website";

export default function SchemaMarkup() {
  return <JsonLd data={[createOrganizationSchema(), createWebsiteSchema()]} />;
}
