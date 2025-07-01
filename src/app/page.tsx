import Head from 'next/head'
import Image from 'next/image'

const photos = [
  { src: '/photos/photo1.jpg', alt: 'Mountain View' },
  { src: '/photos/photo3.jpg', alt: 'Ocean Breeze' },
  { src: '/photos/photo2.jpg', alt: 'City Lights' },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>My Photography Portfolio</title>
        <meta name="description" content="A showcase of my favorite photos." />
      </Head>
      <main className="min-h-screen bg-gray-100 p-8">
        <h1 className="text-4xl font-bold text-center mb-12">My Photography</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.map((photo, idx) => (
            <div key={idx} className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={photo.src}
                alt={photo.alt}
                width={800}
                height={600}
                className="object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
              />
            </div>
          ))}
        </div>
      </main>
    </>
  )
}