import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "company",
      title: "Company or Client",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "timeframe",
      title: "Timeframe",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "link",
      title: "Optional Link",
      type: "editableLink"
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
      title: "role",
      subtitle: "company"
    }
  }
});
