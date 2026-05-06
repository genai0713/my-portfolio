import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "portfolioPage",
  title: "Portfolio Page",
  type: "document",
  groups: [
    { name: "seo", title: "SEO" },
    { name: "site", title: "Site" },
    { name: "sections", title: "Sections" }
  ],
  fields: [
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "brandName",
      title: "Brand or Person Name",
      type: "string",
      group: "site",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "brandTagline",
      title: "Short Brand Tagline",
      type: "string",
      group: "site",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "navItems",
      title: "Navigation Items",
      type: "array",
      group: "site",
      of: [defineArrayMember({ type: "navItem" })]
    }),
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "headline", title: "Headline", type: "text", rows: 3 }),
        defineField({
          name: "subheadline",
          title: "Subheadline",
          type: "text",
          rows: 4
        }),
        defineField({ name: "primaryCta", title: "Primary Button", type: "editableLink" }),
        defineField({ name: "secondaryCta", title: "Secondary Button", type: "editableLink" }),
        defineField({ name: "image", title: "Hero Image", type: "editableImage" }),
        defineField({
          name: "stats",
          title: "Hero Stats",
          type: "array",
          of: [defineArrayMember({ type: "stat" })]
        }),
        defineField({
          name: "marquee",
          title: "Moving Shelf Labels",
          type: "array",
          of: [defineArrayMember({ type: "string" })]
        })
      ]
    }),
    defineField({
      name: "about",
      title: "About",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "text", rows: 2 }),
        defineField({ name: "body", title: "Body", type: "text", rows: 5 }),
        defineField({ name: "image", title: "About Image", type: "editableImage" }),
        defineField({
          name: "callouts",
          title: "Callouts",
          type: "array",
          of: [defineArrayMember({ type: "stat" })]
        })
      ]
    }),
    defineField({
      name: "services",
      title: "Services and Skills",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "text", rows: 2 }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({
          name: "items",
          title: "Services",
          type: "array",
          of: [defineArrayMember({ type: "serviceItem" })]
        })
      ]
    }),
    defineField({
      name: "projects",
      title: "Featured Projects",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "text", rows: 2 }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({
          name: "items",
          title: "Manual Project List",
          description:
            "Leave empty to show every project where the featured toggle is on.",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "project" }]
            })
          ]
        })
      ]
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "text", rows: 2 }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({
          name: "items",
          title: "Manual Experience List",
          description: "Leave empty to show all experience entries by sort order.",
          type: "array",
          of: [
            defineArrayMember({
              type: "reference",
              to: [{ type: "experience" }]
            })
          ]
        })
      ]
    }),
    defineField({
      name: "contact",
      title: "Contact",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "eyebrow", title: "Small Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "text", rows: 2 }),
        defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
        defineField({
          name: "availabilityLabel",
          title: "Availability Label",
          type: "string"
        }),
        defineField({
          name: "availabilityText",
          title: "Availability Text",
          type: "string"
        }),
        defineField({
          name: "channels",
          title: "Contact Channels",
          type: "array",
          of: [defineArrayMember({ type: "contactChannel" })]
        }),
        defineField({ name: "primaryCta", title: "Primary Button", type: "editableLink" })
      ]
    }),
    defineField({
      name: "footer",
      title: "Footer",
      type: "object",
      group: "sections",
      fields: [
        defineField({ name: "note", title: "Footer Note", type: "text", rows: 2 }),
        defineField({
          name: "links",
          title: "Footer Links",
          type: "array",
          of: [defineArrayMember({ type: "editableLink" })]
        })
      ]
    })
  ],
  preview: {
    select: {
      title: "brandName",
      subtitle: "brandTagline"
    }
  }
});
