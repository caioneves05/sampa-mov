"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Mail, Instagram, Twitter, ChevronDown, Award, Users, Zap, Eye, ArrowRight, Linkedin, Radio, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SampaVerticalLanding() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const [playingHorizontalVideo, setPlayingHorizontalVideo] = useState<number | null>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const horizontalVideoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Vertical videos
  const verticalVideos = [
    {
      id: 1,
      thumbnail: "/verticais/CAPA_01.jpg",
      videoUrl: "/videos/VIDEO_04.mp4",
      title: "Campanha AVON",
      brand: "AVON",
    },
    {
      id: 2,
      thumbnail: "/verticais/CAPA_02.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      title: "Lifestyle Content",
      brand: "",
    },
    {
      id: 3,
      thumbnail: "/verticais/CAPA_03.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      title: "Fashion Campaign",
      brand: "",
    },
    {
      id: 4,
      thumbnail: "/verticais/CAPA_04.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      title: "Beauty Products",
      brand: "AVON",
    },
    {
      id: 5,
      thumbnail: "/verticais/CAPA_05.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      title: "Campanha Natura",
      brand: "Natura",
    },
    {
      id: 6,
      thumbnail: "/verticais/CAPA_06.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      title: "Creative Showcase",
      brand: "",
    },
  ]

  // Horizontal videos for showcases
  const horizontalVideos = [
    {
      id: 1,
      thumbnail: "/horizontais/CAPA_01.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      title: "Desafio X2 Podpah",
      description: "Aftermovie dos melhores momentos do evento de futebol do maior podcast do Brasil.",
      metrics: "2.5M visualizações",
    },
    {
      id: 2,
      thumbnail: "/horizontais/CAPA_02.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      title: "ACM Run 2025",
      description: "Aftermovie da 1° Meia Maratona de Guarulhos.",
      metrics: "Making of exclusivo",
    },
    {
      id: 3,
      thumbnail: "/horizontais/CAPA_03.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      title: "Pesca Trade Show",
      description: "Cobertura audiovisual completa da maior feira de pesca do Brasil.",
      metrics: "1.8M visualizações",
    },
    {
      id: 4,
      thumbnail: "/horizontais/CAPA_04.jpg",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      title: "Detons - Trace Brasil",
      description: "Evento Trace Brasil, que é um canal de TV voltado à cultura Afro Urbana.",
      metrics: "500K visualizações",
    },
  ]

  const services = [
    {
      icon: <Radio className="w-8 h-8" />,
      title: "Entrega Real Time",
      description: "Conteúdo entregue em tempo real no seu evento",
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Conteúdo Estratégico",
      description: "Vídeos que vendem, posicionam e contam sua história com verdade.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Produção Completa",
      description: "Desde pré-produção, produção e pós-produção. Tudo alinhado com o briefing perfeito.",
    },
  ]

  const clients = [
    { name: "AVON", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Brand 2", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Brand 3", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Brand 4", logo: "/placeholder.svg?height=60&width=120" },
  ]

  const handleVideoPlay = async (index: number) => {
    const video = videoRefs.current[index]
    if (!video) return

    // Pause all other vertical videos first
    await Promise.all(
      videoRefs.current.map((v, i) => {
        if (v && i !== index && !v.paused) {
          return v.pause()
        }
        return Promise.resolve()
      })
    )

    // Pause all horizontal videos
    await Promise.all(
      horizontalVideoRefs.current.map((v) => {
        if (v && !v.paused) {
          return v.pause()
        }
        return Promise.resolve()
      })
    )

    if (playingVideo === index) {
      video.pause()
      setPlayingVideo(null)
    } else {
      video.play().catch(console.error)
      setPlayingVideo(index)
    }
  }

  const handleHorizontalVideoPlay = (index: number) => {
    const video = horizontalVideoRefs.current[index]
    if (!video) return

    // Pause all other horizontal videos first
    horizontalVideoRefs.current.forEach((v, i) => {
      if (v && i !== index && !v.paused) {
        v.pause()
      }
    })

    // Pause all vertical videos
    videoRefs.current.forEach((v) => {
      if (v && !v.paused) {
        v.pause()
      }
    })

    if (playingHorizontalVideo === index) {
      video.pause()
      setPlayingHorizontalVideo(null)
    } else {
      video.play().catch(console.error)
      setPlayingHorizontalVideo(index)
    }
  }

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up")
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll(".animate-on-scroll")
    animatedElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/sampa-logo.png" alt="Sampa Mov" className="h-12 w-auto" />
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#trabalhos"
              className="text-[#D32D54] hover:text-[#B02346] transition-colors duration-300 font-medium text-lg"
            >
              Trabalhos
            </a>
            <a
              href="#servicos"
              className="text-white hover:text-[#D32D54] transition-colors duration-300 font-medium text-lg"
            >
              Serviços
            </a>
            {/* <a
              href="#sobre"
              className="text-white hover:text-[#D32D54] transition-colors duration-300 font-medium text-lg"
            >
              Sobre
            </a> */}
            <a
              href="#contato"
              className="text-white hover:text-[#D32D54] transition-colors duration-300 font-medium text-lg flex items-center"
            >
              Contato
              <ChevronDown className="w-4 h-4 ml-1" />
            </a>
          </nav>

          <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <div
                className={`w-full h-0.5 bg-white transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`}
              ></div>
              <div className={`w-full h-0.5 bg-white transition-opacity ${mobileMenuOpen ? "opacity-0" : ""}`}></div>
              <div
                className={`w-full h-0.5 bg-white transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
              ></div>
            </div>
          </button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-gray-800">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <a
              href="#trabalhos"
              className="block text-[#D32D54] hover:text-[#B02346] transition-colors duration-300 font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trabalhos
            </a>
            <a
              href="#servicos"
              className="block text-white hover:text-[#D32D54] transition-colors duration-300 font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Serviços
            </a>
            <a
              href="#sobre"
              className="block text-white hover:text-[#D32D54] transition-colors duration-300 font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre
            </a>
            <a
              href="#contato"
              className="block text-white hover:text-[#D32D54] transition-colors duration-300 font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contato
            </a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 px-4">
        <div className="container mx-auto text-center animate-on-scroll">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 hero-gradient leading-tight">
            Comunicar, atrair e converter.<br />
            <span className="text-[#D32D54]">Este é o nosso propósito.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Criamos experiências visuais impactantes que conectam marcas ao seu público através de storytelling
            autêntico e produção de alta qualidade
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <Button
              size="lg"
              className="bg-[#D32D54] hover:bg-[#B02346] text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold w-full sm:w-auto"
            >
              Ver Nossos Trabalhos
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-white hover:bg-gray-800 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-transparent w-full sm:w-auto"
            >
              Falar Conosco
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {/* <section className="py-12 md:py-16 px-4 border-y border-gray-800">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="animate-on-scroll">
              <div className="text-2xl md:text-4xl font-bold text-[#D32D54] mb-1 md:mb-2">50+</div>
              <div className="text-sm md:text-base text-gray-400">Projetos Entregues</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-2xl md:text-4xl font-bold text-[#D32D54] mb-1 md:mb-2">15M+</div>
              <div className="text-sm md:text-base text-gray-400">Visualizações</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-2xl md:text-4xl font-bold text-[#D32D54] mb-1 md:mb-2">25+</div>
              <div className="text-sm md:text-base text-gray-400">Marcas Atendidas</div>
            </div>
            <div className="animate-on-scroll">
              <div className="text-2xl md:text-4xl font-bold text-[#D32D54] mb-1 md:mb-2">3</div>
              <div className="text-sm md:text-base text-gray-400">Anos de Experiência</div>
            </div>
          </div>
        </div>
      </section> */}

    

      {/* Horizontal Videos - Case Studies */}
      <section className="py-12 md:py-10 px-4" id="trabalhos">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Cases de Sucesso</h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Conheça os resultados que alcançamos para nossos clientes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {horizontalVideos.map((video, index) => (
              <Card
                key={video.id}
                className="bg-[#d32d5412] border-[#d32d5412] overflow-hidden animate-on-scroll group hover:border-[#D32D54] transition-colors duration-300"
              >
                <div className="relative aspect-video">
                  <video
                    ref={(el) => {
                      horizontalVideoRefs.current[index] = el
                    }}
                    className="w-full h-full object-cover"
                    poster={video.thumbnail}
                    muted
                    loop
                    playsInline
                    onEnded={() => setPlayingHorizontalVideo(null)}
                  >
                    <source src={video.videoUrl} type="video/mp4" />
                  </video>

                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleHorizontalVideoPlay(index)}
                      className="w-16 h-16 bg-[#D32D54] rounded-full flex items-center justify-center hover:bg-[#B02346] transition-colors duration-300"
                    >
                      {playingHorizontalVideo === index ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{video.title}</h3>
                  <p className="text-gray-400 mb-4">{video.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[#D32D54] font-semibold">{video.metrics}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-[#D32D54] transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        {/* Vertical Videos Gallery */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Criativos Verticais</h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Criação inteligente, no formato que vende.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 mb-12">
            {verticalVideos.map((video, index) => (
              <div
                key={video.id}
                className="animate-on-scroll group relative aspect-[9/16] bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#D32D54]/20 z-10"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el
                  }}
                  className="w-full h-full object-cover cursor-pointer z-20"
                  poster={video.thumbnail}
                  muted
                  loop
                  playsInline
                  onClick={() => handleVideoPlay(index)}
                  onEnded={() => setPlayingVideo(null)}
                >
                  <source src={video.videoUrl} type="video/mp4" />
                </video>

                {/* {video.brand && (
                  <div className="absolute top-2 md:top-4 right-2 md:right-4 bg-[#D32D54] text-white px-2 md:px-3 py-1 text-xs md:text-sm font-bold rounded z-30">
                    {video.brand}
                  </div>
                )} */}

                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleVideoPlay(index)
                    }}
                    className="w-12 h-12 md:w-16 md:h-16 bg-[#D32D54] rounded-full flex items-center justify-center hover:bg-[#B02346] transition-colors duration-300 hover:scale-110 z-40"
                  >
                    {playingVideo === index ? (
                      <Pause className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    ) : (
                      <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
                    )}
                  </button>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2 md:p-4 z-30">
                  <h3 className="text-white font-semibold text-xs md:text-sm">{video.title}</h3>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D32D54] rounded-lg transition-colors duration-300 z-20"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 md:mb-16 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Nossos Serviços</h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Soluções completas para sua estratégia de conteúdo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-[#d32d5412] border-[#d32d5412] p-8 text-center animate-on-scroll hover:border-[#D32D54] transition-colors duration-300 group"
              >
                <div className="text-[#D32D54] mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      {/* <section className="py-12 md:py-16 px-4 bg-[#d32d5412]">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4">Marcas que Confiam</h2>
            <p className="text-gray-400">Parceiros que escolheram a Sampa Mov</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {clients.map((client, index) => (
              <div
                key={index}
                className="animate-on-scroll flex justify-center opacity-60 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  className="h-12 w-auto filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* About Section */}
      {/* <section id="sobre" className="py-12 md:py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Sobre a Sampa Mov</h2>
              <p className="text-xl text-gray-400 mb-6">
                Somos especialistas em criar conteúdo que conecta marcas ao seu público de forma autêntica e
                impactante.
              </p>
              <p className="text-gray-400 mb-8">
                Nossa equipe combina criatividade, estratégia e tecnologia para entregar resultados excepcionais em cada
                projeto. Acreditamos que cada marca tem uma história única para contar, e nosso papel é dar vida a essa
                narrativa através de conteúdo visual de alta qualidade.
              </p>
              <div className="flex items-center space-x-4">
                <Award className="w-8 h-8 text-[#D32D54]" />
                <span className="text-lg">Premiados pela excelência em produção de conteúdo</span>
              </div>
            </div>
            <div className="animate-on-scroll">
              <div className="relative">
                <img src="/placeholder.svg?height=500&width=600" alt="Equipe Sampa Mov" className="rounded-lg" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section> */}


        <div className="w-full mx-auto flex items-center justify-between animate-on-scroll relative">
          <img 
            src="/logos/lead.png" 
            alt="Logo" 
            className="h-auto w-[40%] md:w-[370px] lg:w-[600px]"
          />
          {/* <div className="mr-44">
          <Button
            size="lg"
            className="bg-[#d32d5429] text-[#D32D54] hover:text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold"
          >
            Vamos Conversar
          </Button>
          </div> */}
        </div>
      

      {/* Footer */}
      <footer id="contato" className="bg-[#d32d5412] border-[#D32D54]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-8 mb-8 text-center">
            <div className="animate-on-scroll">
              <img src="/sampa-logo.png" alt="Sampa Mov" className="h-8 w-auto mb-4 mx-auto" />
              {/* <p className="text-gray-400">Criando conteúdo inovador e envolvente para o mundo digital.</p> */}
            </div>

            <div className="animate-on-scroll">
              <h3 className="text-lg font-semibold mb-4 text-[#D32D54]">Contato</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <Mail className="w-4 h-4 text-[#D32D54]" />
                  <span className="text-gray-400">producao@sampamov.com</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4 text-[#D32D54]" />
                  <span className="text-gray-400">(11) 91429-3961</span>
                </div>
              </div>
            </div>

            <div className="animate-on-scroll">
              <h3 className="text-lg font-semibold mb-4 text-[#D32D54]">Redes Sociais</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.linkedin.com/company/sampa-mov-produtora-audiovisual/"
                  className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-[#D32D54] transition-colors duration-300"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="http://instagram.com/sampa.mov"
                  className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-[#D32D54] transition-colors duration-300"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href="https://www.behance.net/sampamovprodutora/appreciated"
                  className="w-10 h-10 bg-gray-800/50 rounded-lg flex items-center justify-center hover:bg-[#D32D54] transition-colors duration-300"
                  target="_blank" rel="noopener noreferrer"
                >
                  <img src="/logos/Behance-Logo.png" alt="Behance Logo" className="w-20" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-[#d32d5421] pt-8 text-center">
            <p className="text-gray-400">© 2025 Sampa Mov. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
