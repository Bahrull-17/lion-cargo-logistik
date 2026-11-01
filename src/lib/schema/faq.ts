type FAQItem = {
  question: string;
  answer: string;
};

export function createFAQSchema(items: FAQItem[], language: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: language,

    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
