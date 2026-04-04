import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '../../mdx-components.js'

export const generateStaticParams = generateStaticParamsFor('slug')

export async function generateMetadata(props) {
  const params = await props.params
  const { metadata } = await importPage(params.slug)
  return metadata
}

const Wrapper = useMDXComponents().wrapper

export default async function Page(props) {
  const params = await props.params
  const result = await importPage(params.slug)
  const { default: MDXContent, toc, metadata } = result

  return (
    <Wrapper toc={toc} metadata={metadata}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  )
}
