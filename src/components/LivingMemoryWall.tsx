'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, MapPin, Calendar, Camera, ChevronLeft, ChevronRight, ArrowRight, Heart } from 'lucide-react';

type FloatingPhoto = {
  id: number;
  src: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  speed: number;
  opacity: number;
  direction: number;
  size: number;
};

type Photo = {
  id: number;
  src: string;
  title: string;
  location: string;
  category: string;
  story: string;
}

type Trip = {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  dateRange: string;
  location: string;
  heroImage: string;
  color: string;
  gradient: string;
  story: string;
  highlights: string[];
  photoCount: number;
  photos: Photo[];
}

const LivingMemoryWall = () => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingPhotos, setFloatingPhotos] = useState<FloatingPhoto[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  // Trip data with enhanced storytelling
  const trips = [
    {
      id: 'iceland-2023',
      title: 'Iceland Adventure',
      subtitle: 'Fire & Ice',
      date: '2023-09-15',
      dateRange: 'Sept 15-30, 2023',
      location: 'Iceland',
      heroImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&q=80',
      color: '#3B82F6',
      gradient: 'from-blue-900 via-purple-900 to-indigo-900',
      story: 'Chasing the Northern Lights across the land of fire and ice',
      highlights: ['Aurora Borealis', 'Glacial Lagoons', 'Volcanic Landscapes'],
      photoCount: 47,
      photos: [
        {
          id: 1,
          src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
          title: "Dancing Aurora",
          location: "Jökulsárlón Glacier Lagoon",
          category: "aurora",
          story: "After waiting 6 hours in -15°C weather, the sky finally exploded in green fire."
        },
        {
          id: 2,
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
          title: "Frozen Waterfall",
          location: "Seljalandsfoss",
          category: "landscape",
          story: "The waterfall had partially frozen, creating natural ice sculptures."
        },
        {
          id: 3,
          src: "https://images.unsplash.com/photo-1544963380-91fe7e87c846?w=800&q=80",
          title: "Diamond Beach",
          location: "Breiðamerkursandur",
          category: "seascape",
          story: "Icebergs scattered like diamonds on volcanic black sand."
        }
      ]
    },
    {
      id: 'japan-2023',
      title: 'Japan Journey',
      subtitle: 'Neon & Zen',
      date: '2023-03-10',
      dateRange: 'March 10-25, 2023',
      location: 'Japan',
      heroImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80',
      color: '#EF4444',
      gradient: 'from-red-900 via-pink-900 to-purple-900',
      story: 'From neon-lit streets to peaceful temples',
      highlights: ['Cherry Blossoms', 'Neon Nights', 'Ancient Temples'],
      photoCount: 89,
      photos: [
        {
          id: 4,
          src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
          title: "Shibuya Crossing",
          location: "Tokyo",
          category: "street",
          story: "The heartbeat of Tokyo captured in motion blur and neon."
        },
        {
          id: 5,
          src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80",
          title: "Sakura Season",
          location: "Kyoto",
          category: "nature",
          story: "Pink petals falling like snow in ancient temple grounds."
        },
        {
          id: 6,
          src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&q=80",
          title: "Temple Meditation",
          location: "Kiyomizu-dera",
          category: "architecture",
          story: "Morning prayers echoing through wooden halls."
        }
      ]
    },
    {
      id: 'morocco-2023',
      title: 'Morocco Magic',
      subtitle: 'Desert Dreams',
      date: '2023-12-01',
      dateRange: 'Dec 1-18, 2023',
      location: 'Morocco',
      heroImage: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200&q=80',
      color: '#F59E0B',
      gradient: 'from-orange-900 via-red-900 to-yellow-900',
      story: 'Lost in the golden dunes and ancient medinas',
      highlights: ['Sahara Desert', 'Berber Culture', 'Atlas Mountains'],
      photoCount: 63,
      photos: [
        {
          id: 7,
          src: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=800&q=80",
          title: "Sahara Sunset",
          location: "Erg Chebbi",
          category: "desert",
          story: "Camel shadows stretching across endless golden dunes."
        },
        {
          id: 8,
          src: "https://images.unsplash.com/photo-1539650116574-75c0c6d73100?w=800&q=80",
          title: "Marrakech Medina",
          location: "Jemaa el-Fnaa",
          category: "culture",
          story: "The maze of souks where every corner tells a story."
        }
      ]
    }
  ];

  // Generate floating photos for background
  useEffect(() => {
    const allPhotos = trips.flatMap(trip => trip.photos);
    const floating = [];
    
    for (let i = 0; i < 25; i++) {
      const photo = allPhotos[Math.floor(Math.random() * allPhotos.length)];
      floating.push({
        id: i,
        src: photo.src,
        x: Math.random() * 100,
        y: Math.random() * 100,
        scale: 0.3 + Math.random() * 0.4,
        rotation: Math.random() * 360,
        speed: 0.2 + Math.random() * 0.5,
        opacity: 0.1 + Math.random() * 0.3,
        direction: Math.random() * Math.PI * 2,
        size: 80 + Math.random() * 120
      });
    }
    
    setFloatingPhotos(floating);
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  // Animate floating photos
  useEffect(() => {
    const interval = setInterval(() => {
      setFloatingPhotos(prev => prev.map(photo => ({
        ...photo,
        x: (photo.x + Math.cos(photo.direction) * photo.speed) % 100,
        y: (photo.y + Math.sin(photo.direction) * photo.speed) % 100,
        rotation: photo.rotation + 0.1,
        direction: photo.direction + 0.001
      })));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking for interactive effects
  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);



  const openTrip = (trip: Trip) => {
    console.log('Opening trip:', trip.title);
    setSelectedTrip(trip);
    console.log('Selected trip state updated');
  };

  const openPhoto = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const closePhoto = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (!selectedTrip || !selectedPhoto) return;
    
    const currentIndex = selectedTrip.photos.findIndex(p => p.id === selectedPhoto.id);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : selectedTrip.photos.length - 1;
    } else {
      newIndex = currentIndex < selectedTrip.photos.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedPhoto(selectedTrip.photos[newIndex]);
  };

  if (selectedTrip) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${selectedTrip.gradient} transition-all duration-1000`}>
        {/* Trip Header */}
        <div className="relative h-screen overflow-hidden">
          {/* Floating Background Photos */}
          {floatingPhotos.slice(0, 15).map((photo) => (
            <div
              key={photo.id}
              className="absolute pointer-events-none transition-all duration-1000 ease-out"
              style={{
                left: `${photo.x}%`,
                top: `${photo.y}%`,
                transform: `translate(-50%, -50%) rotate(${photo.rotation}deg) scale(${photo.scale})`,
                opacity: photo.opacity * 0.3,
                width: `${photo.size}px`,
                height: `${photo.size}px`,
              }}
            >
              <img
                src={photo.src}
                alt=""
                className="w-full h-full object-cover rounded-2xl shadow-2xl blur-[1px]"
              />
            </div>
          ))}

          <button
              onClick={() => console.log('TEST BUTTON')}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-60"
            >
              <ChevronLeft className="w-10 h-10" />
          </button>
          <button onClick={() => {console.log('temp')}}>HERE</button>

          {/* <div className="absolute inset-0 bg-black/50 z-10"></div> */}
          
          {/* Back Button */}
          {/* <button
            onClick={() => {
              console.log('Back to trips');
             setSelectedTrip(null);
            }}

            className="absolute top-8 left-8 z-20 text-white hover:text-gray-300 hover:bg-white/10 transition-all duration-200 p-2 rounded-full hover:scale-110 active:scale-95 pointer-events-auto"
          >
            BACK
            <ChevronLeft className="w-8 h-8" />
          </button> */}

          {/* Trip Title */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-8">
              <h1 className="text-7xl md:text-9xl font-thin tracking-widest mb-4 opacity-100 animate-fade-in">
                {selectedTrip.title.toUpperCase()}
              </h1>
              <p className="text-2xl md:text-3xl font-light mb-6 opacity-100 animate-fade-in delay-300">
                {selectedTrip.story}
              </p>
              <div className="flex items-center justify-center space-x-8 text-lg opacity-100 animate-fade-in delay-500">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>{selectedTrip.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{selectedTrip.dateRange}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Camera className="w-5 h-5" />
                  <span>{selectedTrip.photoCount} photos</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Gallery */}
        <div className="relative z-30 bg-black/80 backdrop-blur-sm min-h-screen py-16">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {selectedTrip.photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className="group cursor-pointer transform transition-all duration-700 hover:scale-105 opacity-100 animate-fade-in"
                  onClick={() => openPhoto(photo)}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-light mb-2">{photo.title}</h3>
                        <p className="text-sm opacity-80 mb-2">{photo.location}</p>
                        <p className="text-sm leading-relaxed">{photo.story}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Photo Lightbox */}
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
            <button
              onClick={closePhoto}
              className="absolute top-8 right-8 text-white hover:text-gray-300 transition-colors z-60"
            >
              <X className="w-10 h-10" />
            </button>

            <button
              onClick={() => navigatePhoto('prev')}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-60"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              onClick={() => navigatePhoto('next')}
              className="absolute right-8 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-60"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <div className="flex flex-col lg:flex-row items-center justify-center max-w-7xl w-full">
              <div className="lg:w-2/3 flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
                />
              </div>
              
              <div className="lg:w-1/3 lg:pl-12 mt-8 lg:mt-0 text-white">
                <h2 className="text-4xl font-light mb-6">{selectedPhoto.title}</h2>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5" style={{ color: selectedTrip.color }} />
                    <span className="text-xl">{selectedPhoto.location}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed">{selectedPhoto.story}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Floating Background Photos */}
      {floatingPhotos.map((photo) => {
        const distanceFromMouse = Math.sqrt(
          Math.pow(photo.x - mousePosition.x, 2) + Math.pow(photo.y - mousePosition.y, 2)
        );
        const repelForce = Math.max(0, 20 - distanceFromMouse);
        
        return (
          <div
            key={photo.id}
            className="absolute pointer-events-none transition-all duration-1000 ease-out"
            style={{
              left: `${photo.x + (repelForce * 0.1)}%`,
              top: `${photo.y + (repelForce * 0.1)}%`,
              transform: `translate(-50%, -50%) rotate(${photo.rotation}deg) scale(${photo.scale})`,
              opacity: photo.opacity,
              width: `${photo.size}px`,
              height: `${photo.size}px`,
              filter: 'blur(0.5px)',
            }}
          >
            <img
              src={photo.src}
              alt=""
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
            />
          </div>
        );
      })}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="text-center text-white max-w-6xl px-8">
          {/* Hero Title */}
          <div className={`transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-8xl md:text-9xl font-thin tracking-widest mb-8 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
              WANDERLUST
            </h1>
            <p className="text-3xl md:text-4xl font-light mb-4 tracking-wide">
              Living Memory Wall
            </p>
            <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">
              Journey through my adventures, one story at a time
            </p>
          </div>

          {/* Trip Cards */}
          <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-2000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {trips.map((trip, index) => (
              <div
                key={trip.id}
                className="group cursor-pointer transform transition-all duration-700 hover:scale-105 hover:-translate-y-2"
                onClick={() => openTrip(trip)}
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-20" style={{ background: `linear-gradient(135deg, ${trip.color}22, ${trip.color}44)` }}></div>
                  
                  <div className="relative p-8">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: trip.color }}></div>
                      <span className="text-sm text-gray-400 uppercase tracking-wide">{trip.dateRange}</span>
                    </div>
                    
                    <h3 className="text-3xl font-light mb-2">{trip.title}</h3>
                    <p className="text-lg text-gray-300 mb-4">{trip.subtitle}</p>
                    <p className="text-sm text-gray-400 mb-6 leading-relaxed">{trip.story}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Camera className="w-4 h-4" />
                          <span>{trip.photoCount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{trip.highlights.length}</span>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-4">
                      {trip.highlights.map((highlight, i) => (
                        <span key={i} className="text-xs px-3 py-1 rounded-full bg-white/10 text-gray-300">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default LivingMemoryWall;