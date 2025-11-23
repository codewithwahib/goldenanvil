import { client } from '@/sanity/lib/client'
import { PortableText } from '@portabletext/react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { PortableTextBlock } from '@portabletext/types'
import Header from '@/app/Components/header'
import Footer from '@/app/Components/footer'
import ProductImageGallery from '@/app/Components/productimagegallery'
import ProductInquiryForm from './ProductInquiryForm'
import { DM_Sans } from 'next/font/google'
// import ContactBar from '@/app/Components/topbar'

const dmsans = DM_Sans({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

interface ProductImage {
  asset: {
    _id: string
    url: string
    metadata?: {
      dimensions?: {
        width: number
        height: number
      }
      lqip?: string
    }
  }
}

export type Product = {
  _id: string
  name: string
  slug: {
    current: string
  }
  description?: PortableTextBlock[] | any // Made optional and added any type
  images: ProductImage[]
}

const productQuery = `*[_type == "products" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  description,
  images[] {
    asset-> {
      _id,
      url,
      metadata {
        dimensions,
        lqip
      }
    }
  }
}`

type PageParams = { slug: string }

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const product: Product | null = await client.fetch(productQuery, { slug: params.slug })

  if (!product) {
    return {
      title: 'Product Not Found',
      description: 'The product you are looking for does not exist',
    }
  }

  // Safe description for metadata
  const descriptionText = product.description 
    ? (typeof product.description === 'string' 
        ? product.description 
        : 'Explore more about ' + product.name)
    : 'Detailed product page'

  return {
    title: product.name,
    description: descriptionText,
    openGraph: product.images?.[0]?.asset?.url
      ? {
          images: [
            {
              url: product.images[0].asset.url,
              width: 1200,
              height: 630,
              alt: product.name,
            },
          ],
        }
      : undefined,
  }
}

interface PageProps {
  params: PageParams
}

// Helper function to render description safely
function ProductDescription({ description }: { description: Product['description'] }) {
  if (!description) {
    return <p className="text-gray-600">No description available.</p>
  }

  // If it's a PortableText array
  if (Array.isArray(description)) {
    return <PortableText value={description} />
  }

  // If it's a plain string
  if (typeof description === 'string') {
    return <p className="text-gray-600">{description}</p>
  }

  // Fallback
  return <p className="text-gray-600">Description not available in expected format.</p>
}

export default async function Page({ params }: PageProps) {
  const product: Product | null = await client.fetch(productQuery, {
    slug: params.slug,
  })

  if (!product) return notFound()

  // Debug log to check what description contains
  console.log('Product description:', product.description)
  console.log('Description type:', typeof product.description)

  return (
    <>
      {/* <ContactBar/> */}
      <Header />

      <main className={`min-h-screen bg-gray-100 px-4 md:px-6 py-16 ${dmsans.className}`}>
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <ProductImageGallery images={product.images} productName={product.name} />

            <div className="bg-white border border-gray-200 shadow-lg p-6 md:p-8 space-y-6">
              <h1 className={`text-4xl font-bold text-black ${dmsans.className}`}>
                {product.name}
              </h1>
              <div className="border-t pt-4">
                <h2 className={`text-2xl font-semibold text-black mb-2 ${dmsans.className}`}>
                  Description:
                </h2>
                <div className={`prose prose-lg max-w-none text-black ${dmsans.className}`}>
                  <ProductDescription description={product.description} />
                </div>
              </div>
            </div>
          </div>

          <ProductInquiryForm productName={product.name} />
        </div>
      </main>

      <Footer />
    </>
  )
}