import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title"
      }
    }),
    defineField({
      name: "excerpt",
      title: "Project Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "year",
      title: "Year or Timeframe",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "image",
      title: "Project Image",
      type: "editableImage"
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "link",
      title: "Project Link",
      type: "editableLink"
    }),
    defineField({
      name: "accent",
      title: "Accent Color",
      description: "Use a hex color like #ef3e36.",
      type: "string"
    }),
    defineField({
      name: "featured",
      title: "Show When No Manual Project List Is Set",
      type: "boolean",
      initialValue: true
    }),
    defineField({
      name: "orderRank",
      title: "Sort Order",
      description: "Lower numbers appear first.",
      type: "number",
      initialValue: 10
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image"
    }
  }
});
