'use client'
import { Anime, fetchAnime } from '@/app/action'
import AnimeCard from '@/components/AnimeCard'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createSignal } from 'not-signal'
import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

export const pageSignal = createSignal(2)
let page = 2

function LoadMore() {
  const { ref, inView } = useInView()
  const [data, setData] = useState<Anime[][]>([])
  console.log('inView:', inView)

  useEffect(() => {
    if (inView) {
      fetchAnime(pageSignal.peek()).then((res) => {
        console.log('res:', res)
        setData([...data, res])
      })
      pageSignal.setValue((page) => page + 1)
    }
  }, [inView])

  return (
    <>
      page: {pageSignal}
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((page) =>
          page.map((item: Anime, index) => (
            <motion.div
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
              }}
              initial="hidden"
              animate="visible"
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeInOut',
              }}
              key={item.id}
            >
              <AnimeCard anime={item} index={index} />
            </motion.div>
          ))
        )}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  )
}

export default LoadMore
