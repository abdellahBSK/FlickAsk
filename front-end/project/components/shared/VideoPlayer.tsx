"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward, Settings } from "lucide-react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export default function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };

    const onLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };

    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("waiting", onWaiting);
    video.addEventListener("canplay", onCanPlay);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("waiting", onWaiting);
      video.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = (parseFloat(e.target.value) / 100) * video.duration;
    video.currentTime = newTime;
    setProgress(parseFloat(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const newVolume = parseFloat(e.target.value) / 100;
    
    if (video) {
      video.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = volume;
      video.muted = false;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    
    video.currentTime += seconds;
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const showControls = () => {
    setIsControlsVisible(true);
    
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying && !isHovered) {
        setIsControlsVisible(false);
      }
    }, 3000);
  };

  return (
    <div 
      className={`relative group rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-black shadow-2xl ${className}`}
      onMouseMove={showControls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowVolumeSlider(false);
        if (isPlaying) setIsControlsVisible(false);
      }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 via-transparent to-purple-500/10 pointer-events-none" />
      
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onClick={handlePlayPause}
      />
      
      {/* Loading spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Play button overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            className="group/play relative transform transition-all duration-500 hover:scale-110 active:scale-95"
          >
            {/* Animated background rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20 animate-ping"></div>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-600/30 animate-pulse"></div>
            
            {/* Main play button */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl backdrop-blur-xl border border-white/20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover/play:opacity-100 transition-opacity duration-300"></div>
              <Play className="h-8 w-8 text-white ml-1 relative z-10" />
            </div>
          </button>
        </div>
      )}
      
      {/* Enhanced Controls */}
      <div 
        className={`absolute bottom-0 left-0 right-0 transition-all duration-500 ${
          isControlsVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* Background blur effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent backdrop-blur-md"></div>
        
        {/* Progress bar container */}
        <div className="relative px-6 pt-4">
          <div className="relative w-full h-2 bg-white/20 rounded-full overflow-hidden mb-4 group/progress">
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            ></div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {/* Hover indicator */}
            <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200 pointer-events-none"
                 style={{ left: `calc(${progress}% - 8px)` }}></div>
          </div>
        </div>
        
        {/* Control buttons */}
        <div className="relative flex items-center justify-between px-6 pb-4 text-white">
          <div className="flex items-center space-x-2">
            {/* Play/Pause */}
            <button 
              onClick={handlePlayPause}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5 ml-0.5" />
              )}
            </button>
            
            {/* Skip buttons */}
            <button
              onClick={() => skip(-10)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <SkipBack className="h-4 w-4" />
            </button>
            
            <button
              onClick={() => skip(10)}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <SkipForward className="h-4 w-4" />
            </button>
            
            {/* Volume controls */}
            <div className="relative flex items-center">
              <button
                onClick={toggleMute}
                onMouseEnter={() => setShowVolumeSlider(true)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>
              
              {/* Volume slider */}
              <div 
                className={`absolute left-full ml-2 transition-all duration-300 ${
                  showVolumeSlider ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'
                }`}
                onMouseEnter={() => setShowVolumeSlider(true)}
                onMouseLeave={() => setShowVolumeSlider(false)}
              >
                <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 flex items-center">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume * 100}
                    onChange={handleVolumeChange}
                    className="w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-blue-500 [&::-webkit-slider-thumb]:to-purple-600"
                  />
                </div>
              </div>
            </div>
            
            {/* Time display */}
            <div className="text-sm font-mono bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Settings */}
            <button className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110">
              <Settings className="h-4 w-4" />
            </button>
            
            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none"></div>
      <div className="absolute inset-0 shadow-inner pointer-events-none"></div>
    </div>
  );
}