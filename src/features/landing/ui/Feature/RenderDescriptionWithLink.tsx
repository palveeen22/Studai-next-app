export function renderDescriptionWithLink(
  description: string,
  linkText: string,
  linkHref: string,
  linkColor: string
) {
  const parts = description.split(linkText);
  if (parts.length < 2) return description;

  return (
    <>
      {parts[0]}
      <a
        href={linkHref}
        className="font-bold underline decoration-2 underline-offset-2 hover:opacity-80 transition-opacity"
        style={{ color: linkColor }}
      >
        {linkText}
      </a>
      {parts[1]}
    </>
  );
}