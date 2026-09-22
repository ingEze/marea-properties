import { useEffect, useRef } from 'react'

interface Amenity {
  name: string
  image: string
}

const amenities: Amenity[] = [
  {
    name: 'Piscina',
    image:
      'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Gimnasio equipado',
    image:
      'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Solarium',
    image:
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Balcones amplios',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Seguridad 24 hs',
    image:
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Cocheras cubiertas',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=900&q=80',
  },
]

const loopItems = [...amenities, ...amenities, ...amenities]

const AUTOPLAY_SPEED = 0.8
const RESUME_DELAY = 600

export default function AmenitiesCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const isPaused = useRef(false)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartScroll = useRef(0)
  const resumeTimeout = useRef<number>()

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    track.scrollLeft = track.scrollWidth / 3

    let frame: number

    const step = () => {
      if (track) {
        if (!isPaused.current) {
          track.scrollLeft += AUTOPLAY_SPEED
        }
        if (!isDragging.current) {
          const copyWidth = track.scrollWidth / 3
          if (track.scrollLeft <= copyWidth * 0.5) {
            track.scrollLeft += copyWidth
          } else if (track.scrollLeft >= copyWidth * 1.5) {
            track.scrollLeft -= copyWidth
          }
        }
      }
      frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    return () => {
      if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current)
    }
  }, [])

  const scheduleResume = () => {
    if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current)
    resumeTimeout.current = window.setTimeout(() => {
      isPaused.current = false
    }, RESUME_DELAY)
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (!track) return

    isPaused.current = true
    if (resumeTimeout.current) window.clearTimeout(resumeTimeout.current)

    if (e.pointerType === 'mouse') {
      isDragging.current = true
      dragStartX.current = e.clientX
      dragStartScroll.current = track.scrollLeft
      track.setPointerCapture(e.pointerId)
      track.classList.add('cursor-grabbing')
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const track = trackRef.current
    if (!track) return

    const delta = e.clientX - dragStartX.current
    let target = dragStartScroll.current - delta
    const copyWidth = track.scrollWidth / 3

    if (target <= copyWidth * 0.5) {
      target += copyWidth
      dragStartScroll.current += copyWidth
    } else if (target >= copyWidth * 1.5) {
      target -= copyWidth
      dragStartScroll.current -= copyWidth
    }

    track.scrollLeft = target
  }

  const endInteraction = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current
    if (isDragging.current && track) {
      isDragging.current = false
      track.classList.remove('cursor-grabbing')
      try {
        track.releasePointerCapture(e.pointerId)
      } catch {}
    }
    scheduleResume()
  }

  const handleWheel = () => {
    isPaused.current = true
    scheduleResume()
  }

  return (
    <section className="overflow-hidden bg-base py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display text-3xl text-ink">Cada detalle importa</h2>
        <p className="mt-2 max-w-md text-ink-soft">
          Los amenities que acompañan cada desarrollo, pensados para el uso
          diario y no solo para la foto.
        </p>
      </div>

      <div className="amenities-fade-edges mt-10">
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endInteraction}
          onPointerLeave={endInteraction}
          onPointerCancel={endInteraction}
          onWheel={handleWheel}
          className="no-scrollbar flex w-full cursor-grab gap-10 overflow-x-auto px-6 [-webkit-overflow-scrolling:touch] lg:px-10"
        >
          {loopItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="w-60 shrink-0 select-none sm:w-64"
            >
              <div className="h-72 w-full overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  className="amenity-image h-full w-full object-cover"
                />
              </div>
              <p className="mt-4 text-center font-display text-lg text-ink">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
