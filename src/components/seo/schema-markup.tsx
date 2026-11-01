import { JsonLd } from "@/lib/seo/json-ld";
import { createOrganizationSchema } from "@/lib/schema/organization";
import { createWebsiteSchema } from "@/lib/schema/website";

/** Schema global (satu kali per halaman): bisnis + situs web. Schema khusus halaman dipasang di halamannya masing-masing. */
export default function SchemaMarkup() {
  return <JsonLd data={[createOrganizationSchema(), createWebsiteSchema()]} />;
}
