/**
 * Structured data, emitted as a `<script type="application/ld+json">`.
 *
 * `JSON.stringify` is the escaping here: the payload is always an object built
 * in this codebase, never a string from a user, and `<` is escaped so a value
 * containing `</script>` cannot close the tag early.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
