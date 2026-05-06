import { defineArrayMember, defineField, defineType } from "sanity";

export const editableLink = defineType({
  name: "editableLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button or Link Label",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "href",
      title: "URL, Page Anchor, Email, or Phone Link",
      description: "Examples: #projects, /work, https://example.com, mailto:hello@example.com.",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "isExternal",
      title: "Open as External Link",
      type: "boolean",
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "href"
    }
  }
});

export const navItem = defineType({
  name: "navItem",
  title: "Navigation Item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "anchor",
      title: "Page Anchor",
      description: "Use a section anchor like #about, #services, or #contact.",
      type: "string",
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "anchor"
    }
  }
});

export const editableImage = defineType({
  name: "editableImage",
  title: "Image",
  type: "image",
  options: {
    hotspot: true
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      description: "Describe the image for accessibility.",
      type: "string",
      validation: (Rule) => Rule.required()
    })
  ]
});

export const stat = defineType({
  name: "stat",
  title: "Stat or Callout",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: "value",
      subtitle: "label"
    }
  }
});

export const serviceItem = defineType({
  name: "serviceItem",
  title: "Service or Skill",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      title: "Small Label",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "eyebrow"
    }
  }
});

export const contactChannel = defineType({
  name: "contactChannel",
  title: "Contact Channel",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "href",
      title: "URL, Email, or Phone Link",
      description: "Examples: https://example.com, mailto:hello@example.com, tel:+15551234567.",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "detail",
      title: "Short Detail",
      type: "string",
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "detail"
    }
  }
});
